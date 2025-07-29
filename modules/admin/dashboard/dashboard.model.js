import pool from "../../../config/db.js";

export const FetchEveryDataCountModel = async () => {
  const [rows] = await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM users) AS users_count,
      (SELECT COUNT(*) FROM products) AS products_count,
      (SELECT COUNT(*) FROM categories) AS categories_count,
      (SELECT COUNT(*) FROM orders) AS orders_count
  `);

  return rows[0];
};
