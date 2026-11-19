import { Request, Response } from 'express';
import mongoose from 'mongoose';
import FinanceProject, { FINANCE_PROJECT_STATUSES } from '../models/FinanceProject';
import Transaction, { TRANSACTION_TYPES } from '../models/Transaction';

const DAY_MS = 24 * 60 * 60 * 1000;

const isValidId = (id: unknown): id is string =>
  typeof id === 'string' && mongoose.Types.ObjectId.isValid(id);

const toDate = (value: unknown): Date | undefined | null => {
  if (value === undefined) return undefined;
  if (value === null || value === '') return null;
  const d = new Date(String(value));
  return Number.isNaN(d.getTime()) ? undefined : d;
};

const toAmount = (value: unknown): number | undefined => {
  if (value === undefined || value === null || value === '') return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
};

const str = (value: unknown): string | undefined =>
  typeof value === 'string' ? value : undefined;

/** Only copy the fields a client may set (no mass assignment). */
function pickProject(body: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  for (const key of ['name', 'client', 'description', 'notes'] as const) {
    if (str(body[key]) !== undefined) out[key] = str(body[key]);
  }
  if (typeof body.status === 'string' && (FINANCE_PROJECT_STATUSES as readonly string[]).includes(body.status)) {
    out.status = body.status;
  }
  for (const key of ['startDate', 'deadline', 'completedAt'] as const) {
    const d = toDate(body[key]);
    if (d !== undefined) out[key] = d;
  }
  const budget = toAmount(body.budget);
  if (budget !== undefined) out.budget = budget;
  return out;
}

function pickTransaction(body: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  if (typeof body.type === 'string' && (TRANSACTION_TYPES as readonly string[]).includes(body.type)) {
    out.type = body.type;
  }
  const amount = toAmount(body.amount);
  if (amount !== undefined) out.amount = amount;
  const date = toDate(body.date);
  if (date) out.date = date;
  for (const key of ['category', 'description', 'paymentMethod'] as const) {
    if (str(body[key]) !== undefined) out[key] = str(body[key]);
  }
  if (body.project === '' || body.project === null) out.project = null;
  else if (isValidId(body.project)) out.project = body.project;
  return out;
}

const fail = (res: Response, error: unknown, fallback: string): void => {
  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      success: false,
      error: Object.values(error.errors).map((e) => e.message).join(', '),
    });
    return;
  }
  res.status(500).json({ success: false, error: fallback });
};

interface ProjectTotals {
  income: number;
  expense: number;
  incomeCount: number;
  expenseCount: number;
}

async function totalsByProject(): Promise<Map<string, ProjectTotals>> {
  const rows = await Transaction.aggregate<{
    _id: { project: mongoose.Types.ObjectId | null; type: 'income' | 'expense' };
    total: number;
    count: number;
  }>([
    {
      $group: {
        _id: { project: '$project', type: '$type' },
        total: { $sum: '$amount' },
        count: { $sum: 1 },
      },
    },
  ]);

  const map = new Map<string, ProjectTotals>();
  for (const row of rows) {
    const key = row._id.project ? String(row._id.project) : 'none';
    const t = map.get(key) || { income: 0, expense: 0, incomeCount: 0, expenseCount: 0 };
    if (row._id.type === 'income') {
      t.income += row.total;
      t.incomeCount += row.count;
    } else {
      t.expense += row.total;
      t.expenseCount += row.count;
    }
    map.set(key, t);
  }
  return map;
}

function daysUntil(deadline?: Date | null): number | null {
  if (!deadline) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(deadline);
  d.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - today.getTime()) / DAY_MS);
}

async function projectsWithTotals() {
  const [projects, totals] = await Promise.all([
    FinanceProject.find().sort({ deadline: 1, createdAt: -1 }).lean(),
    totalsByProject(),
  ]);

  return projects.map((p) => {
    const t = totals.get(String(p._id)) || { income: 0, expense: 0, incomeCount: 0, expenseCount: 0 };
    return {
      ...p,
      income: t.income,
      expense: t.expense,
      profit: t.income - t.expense,
      outstanding: Math.max((p.budget || 0) - t.income, 0),
      transactionCount: t.incomeCount + t.expenseCount,
      daysLeft: daysUntil(p.deadline),
    };
  });
}

/* ------------------------------ Projects ------------------------------ */

export const getFinanceProjects = async (_req: Request, res: Response): Promise<void> => {
  try {
    const data = await projectsWithTotals();
    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    fail(res, error, 'Unable to load projects');
  }
};

export const createFinanceProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await FinanceProject.create(pickProject(req.body || {}));
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    fail(res, error, 'Unable to create project');
  }
};

export const updateFinanceProject = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!isValidId(req.params.id)) {
      res.status(400).json({ success: false, error: 'Invalid project id' });
      return;
    }
    const update = pickProject(req.body || {});
    const unset: Record<string, 1> = {};
    for (const [key, value] of Object.entries(update)) {
      if (value === null) {
        unset[key] = 1;
        delete update[key];
      }
    }
    if (update.status === 'Completed' && update.completedAt === undefined && !unset.completedAt) {
      const existing = await FinanceProject.findById(req.params.id).select('completedAt').lean();
      if (existing && !existing.completedAt) update.completedAt = new Date();
    }
    const project = await FinanceProject.findByIdAndUpdate(
      req.params.id,
      { $set: update, ...(Object.keys(unset).length ? { $unset: unset } : {}) },
      { new: true, runValidators: true }
    );
    if (!project) {
      res.status(404).json({ success: false, error: 'Project not found' });
      return;
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    fail(res, error, 'Unable to update project');
  }
};

export const deleteFinanceProject = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!isValidId(req.params.id)) {
      res.status(400).json({ success: false, error: 'Invalid project id' });
      return;
    }
    const project = await FinanceProject.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404).json({ success: false, error: 'Project not found' });
      return;
    }
    const { deletedCount } = await Transaction.deleteMany({ project: project._id });
    res.status(200).json({ success: true, data: { deletedTransactions: deletedCount } });
  } catch (error) {
    fail(res, error, 'Unable to delete project');
  }
};

/* ---------------------------- Transactions ---------------------------- */

export const getTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter: Record<string, unknown> = {};
    const { project, type, from, to } = req.query;

    if (project === 'none') filter.project = null;
    else if (isValidId(project)) filter.project = project;

    if (typeof type === 'string' && (TRANSACTION_TYPES as readonly string[]).includes(type)) {
      filter.type = type;
    }

    const fromDate = toDate(from);
    const toDateValue = toDate(to);
    if (fromDate || toDateValue) {
      const range: Record<string, Date> = {};
      if (fromDate) range.$gte = fromDate;
      if (toDateValue) {
        const end = new Date(toDateValue);
        end.setHours(23, 59, 59, 999);
        range.$lte = end;
      }
      filter.date = range;
    }

    const data = await Transaction.find(filter)
      .sort({ date: -1, createdAt: -1 })
      .limit(2000)
      .populate('project', 'name client')
      .lean();

    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    fail(res, error, 'Unable to load transactions');
  }
};

export const createTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = pickTransaction(req.body || {});
    if (body.project === null) delete body.project;
    if (body.project && !(await FinanceProject.exists({ _id: body.project }))) {
      res.status(400).json({ success: false, error: 'Selected project does not exist' });
      return;
    }
    const tx = await Transaction.create(body);
    res.status(201).json({ success: true, data: tx });
  } catch (error) {
    fail(res, error, 'Unable to save entry');
  }
};

export const updateTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!isValidId(req.params.id)) {
      res.status(400).json({ success: false, error: 'Invalid entry id' });
      return;
    }
    const body = pickTransaction(req.body || {});
    const unset: Record<string, 1> = {};
    if (body.project === null) {
      unset.project = 1;
      delete body.project;
    } else if (body.project && !(await FinanceProject.exists({ _id: body.project }))) {
      res.status(400).json({ success: false, error: 'Selected project does not exist' });
      return;
    }
    const tx = await Transaction.findByIdAndUpdate(
      req.params.id,
      { $set: body, ...(Object.keys(unset).length ? { $unset: unset } : {}) },
      { new: true, runValidators: true }
    );
    if (!tx) {
      res.status(404).json({ success: false, error: 'Entry not found' });
      return;
    }
    res.status(200).json({ success: true, data: tx });
  } catch (error) {
    fail(res, error, 'Unable to update entry');
  }
};

export const deleteTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!isValidId(req.params.id)) {
      res.status(400).json({ success: false, error: 'Invalid entry id' });
      return;
    }
    const tx = await Transaction.findByIdAndDelete(req.params.id);
    if (!tx) {
      res.status(404).json({ success: false, error: 'Entry not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    fail(res, error, 'Unable to delete entry');
  }
};

/* ------------------------------ Summary ------------------------------- */

export const getFinanceSummary = async (_req: Request, res: Response): Promise<void> => {
  try {
    const projects = await projectsWithTotals();
    const totals = await totalsByProject();

    let income = 0;
    let expense = 0;
    for (const t of totals.values()) {
      income += t.income;
      expense += t.expense;
    }
    const general = totals.get('none') || { income: 0, expense: 0, incomeCount: 0, expenseCount: 0 };

    const open = projects.filter((p) => p.status !== 'Completed' && p.status !== 'Cancelled');
    const overdue = open.filter((p) => p.daysLeft !== null && p.daysLeft < 0);
    const upcoming = open
      .filter((p) => p.daysLeft !== null && p.daysLeft >= 0 && p.daysLeft <= 30)
      .sort((a, b) => (a.daysLeft ?? 0) - (b.daysLeft ?? 0));

    // Last 12 months, oldest first, including empty months.
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    start.setMonth(start.getMonth() - 11);
    const monthlyRows = await Transaction.aggregate<{
      _id: { y: number; m: number; type: 'income' | 'expense' };
      total: number;
    }>([
      { $match: { date: { $gte: start } } },
      {
        $group: {
          _id: { y: { $year: '$date' }, m: { $month: '$date' }, type: '$type' },
          total: { $sum: '$amount' },
        },
      },
    ]);
    const monthly = Array.from({ length: 12 }, (_, i) => {
      const d = new Date(start);
      d.setMonth(start.getMonth() + i);
      const y = d.getFullYear();
      const m = d.getMonth() + 1;
      const find = (type: string) =>
        monthlyRows.find((r) => r._id.y === y && r._id.m === m && r._id.type === type)?.total || 0;
      const inc = find('income');
      const exp = find('expense');
      return { month: `${y}-${String(m).padStart(2, '0')}`, income: inc, expense: exp, profit: inc - exp };
    });

    res.status(200).json({
      success: true,
      data: {
        totals: {
          income,
          expense,
          profit: income - expense,
          budget: projects.reduce((s, p) => s + (p.budget || 0), 0),
          outstanding: open.reduce((s, p) => s + p.outstanding, 0),
          generalIncome: general.income,
          generalExpense: general.expense,
        },
        counts: {
          projects: projects.length,
          active: open.length,
          completed: projects.filter((p) => p.status === 'Completed').length,
          overdue: overdue.length,
          dueSoon: upcoming.length,
        },
        overdue,
        upcoming,
        monthly,
        projects,
      },
    });
  } catch (error) {
    fail(res, error, 'Unable to load finance summary');
  }
};
