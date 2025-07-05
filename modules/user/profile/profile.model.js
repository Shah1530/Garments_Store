import pool from "../../../config/db.js";

export const FindUserProfileModel = async (userId) => {
  // 1️⃣ Get user basic info
  const [users] = await pool.query(
    "SELECT id, name, email FROM users WHERE id = ?",
    [userId]
  );

  if (users.length === 0) {
    return null; // User not found
  }

  const user = users[0];

  // 2️⃣ Get all orders for the user
  const [orders] = await pool.query(
    `SELECT id, status, payment_method, phone, address, trackingId, totalPrice, createdAt
     FROM orders
     WHERE user_id = ?
     ORDER BY createdAt DESC`,
    [userId]
  );

  // 3️⃣ For each order, get its items with product title
  for (const order of orders) {
    const [items] = await pool.query(
      `SELECT
         oi.id,
         oi.product_id,
         p.name AS product_title,
         oi.quantity,
         oi.price
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [order.id]
    );
    order.items = items;
  }

  // ✅ Combined result
  return {
    user,
    orders,
  };
};

export const UpdateUserProfileModel = async (userId, name) => {
  if (!name) {
    throw new Error("Name is required");
  }

  const [result] = await pool.query(`UPDATE users SET name = ? WHERE id = ?`, [
    name,
    userId,
  ]);

  return result.affectedRows > 0;
};
