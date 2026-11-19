import { Router } from 'express';
import {
  getFinanceSummary,
  getFinanceProjects,
  createFinanceProject,
  updateFinanceProject,
  deleteFinanceProject,
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../controllers/financeController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

// Money data is admin-only (editors manage website content, not finances).
router.use(protect, authorize('admin'));

router.get('/summary', getFinanceSummary);

router.get('/projects', getFinanceProjects);
router.post('/projects', createFinanceProject);
router.put('/projects/:id', updateFinanceProject);
router.delete('/projects/:id', deleteFinanceProject);

router.get('/transactions', getTransactions);
router.post('/transactions', createTransaction);
router.put('/transactions/:id', updateTransaction);
router.delete('/transactions/:id', deleteTransaction);

export default router;
