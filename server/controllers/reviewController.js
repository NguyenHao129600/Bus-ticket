import ReviewModel from '../models/reviewModel';

export const getAll = async (req, res, next) => {
  try {
    const { page, limit, operator_id, user_id, min_rating, max_rating } = req.query;
    const result = await ReviewModel.getAll({ page, limit, operator_id, user_id, min_rating, max_rating });
    return res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const review = await ReviewModel.getById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    return res.json({ success: true, data: review });
  } catch (err) { next(err); }
};

export const getOperatorStats = async (req, res, next) => {
  try {
    const stats = await ReviewModel.getAvgRating(req.params.operator_id);
    return res.json({ success: true, data: stats });
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try {
    const { user_id, operator_id, rating, comment } = req.body;
    const existing = await ReviewModel.getByUserAndOperator(user_id, operator_id);
    if (existing) return res.status(409).json({ success: false, message: 'You have already reviewed this operator' });
    const id = await ReviewModel.create({ user_id, operator_id, rating, comment });
    const review = await ReviewModel.getById(id);
    return res.status(201).json({ success: true, data: review });
  } catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const existing = await ReviewModel.getById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: 'Review not found' });
    await ReviewModel.update(req.params.id, { rating, comment });
    const review = await ReviewModel.getById(req.params.id);
    return res.json({ success: true, data: review });
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    const affected = await ReviewModel.delete(req.params.id);
    if (!affected) return res.status(404).json({ success: false, message: 'Review not found' });
    return res.json({ success: true, message: 'Review deleted successfully' });
  } catch (err) { next(err); }
};