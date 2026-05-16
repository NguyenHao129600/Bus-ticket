import db from '../config/db';

const ReviewModel = {
  getAll: async ({ page = 1, limit = 10, operator_id, user_id, min_rating, max_rating } = {}) => {
    const offset = (page - 1) * limit;
    const params = [];
    let where = 'WHERE 1=1';
    if (operator_id) { where += ' AND r.operator_id = ?'; params.push(operator_id); }
    if (user_id)     { where += ' AND r.user_id = ?';     params.push(user_id); }
    if (min_rating)  { where += ' AND r.rating >= ?';     params.push(min_rating); }
    if (max_rating)  { where += ' AND r.rating <= ?';     params.push(max_rating); }
    const [countRows] = await db.query(`SELECT COUNT(*) AS total FROM reviews r ${where}`, params);
    const total = countRows[0].total;
    const [rows] = await db.query(
      `SELECT r.id, r.rating, r.comment, r.created_at,
              r.user_id, u.full_name AS user_name,
              r.operator_id, o.name AS operator_name
       FROM reviews r
       JOIN users u ON u.id = r.user_id AND u.deleted_at IS NULL
       JOIN operators o ON o.id = r.operator_id AND o.deleted_at IS NULL
       ${where} ORDER BY r.created_at DESC LIMIT ? OFFSET ?`,
      [...params, Number(limit), offset]
    );
    return { data: rows, total, page: Number(page), limit: Number(limit) };
  },

  getById: async (id) => {
    const [rows] = await db.query(
      `SELECT r.id, r.rating, r.comment, r.created_at,
              r.user_id, u.full_name AS user_name,
              r.operator_id, o.name AS operator_name
       FROM reviews r
       JOIN users u ON u.id = r.user_id AND u.deleted_at IS NULL
       JOIN operators o ON o.id = r.operator_id AND o.deleted_at IS NULL
       WHERE r.id = ?`, [id]
    );
    return rows[0] || null;
  },

  getByUserAndOperator: async (user_id, operator_id) => {
    const [rows] = await db.query('SELECT * FROM reviews WHERE user_id = ? AND operator_id = ?', [user_id, operator_id]);
    return rows[0] || null;
  },

  getAvgRating: async (operator_id) => {
    const [rows] = await db.query(
      'SELECT AVG(rating) AS avg_rating, COUNT(*) AS total_reviews FROM reviews WHERE operator_id = ?', [operator_id]
    );
    return rows[0];
  },

  create: async ({ user_id, operator_id, rating, comment }) => {
    const [result] = await db.query(
      'INSERT INTO reviews (user_id, operator_id, rating, comment, created_at) VALUES (?, ?, ?, ?, ?)',
      [user_id, operator_id, rating, comment || null, new Date()]
    );
    return result.insertId;
  },

  update: async (id, { rating, comment }) => {
    const fields = [], params = [];
    if (rating !== undefined)  { fields.push('rating = ?');  params.push(rating); }
    if (comment !== undefined) { fields.push('comment = ?'); params.push(comment); }
    if (!fields.length) return 0;
    params.push(id);
    const [result] = await db.query(`UPDATE reviews SET ${fields.join(', ')} WHERE id = ?`, params);
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM reviews WHERE id = ?', [id]);
    return result.affectedRows;
  },
};

export default ReviewModel;