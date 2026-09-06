import slugify from 'slugify';

export const createSlug = (text: string): string => {
  return slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });
};

export const generateSlug = async (
  Model: { findOne: (filter: Record<string, unknown>) => { exec: () => Promise<{ _id: unknown } | null> } },
  text: string,
  field = 'slug'
): Promise<string> => {
  const base = createSlug(text);
  let slug = base;
  let counter = 1;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await Model.findOne({ [field]: slug }).exec();
    if (!existing) break;
    slug = `${base}-${counter}`;
    counter += 1;
  }

  return slug;
};

export const publicFields = {
  service: '-__v',
  product: '-__v -active',
  project: '-__v -active',
  blog: '-__v',
  testimonial: '-__v -active -published',
  job: '-__v -active',
};