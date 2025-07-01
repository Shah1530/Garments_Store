import pool from "../../../config/db.js";

export const CreateNewOrderModel = async (
  userId,
  totalPrice,
  paymentMethod,
  address,
  phone,
  trackingId
) => {
  const [result] = await pool.query(
    "INSERT INTO orders (user_id, payment_method, totalPrice,address, phone, trackingId) VALUES (?, ?, ?, ?, ?,?)",
    [userId, paymentMethod, totalPrice, address, phone, trackingId]
  );
  return result.insertId;
};

export const AddOrderItemsModel = async (orderId, items) => {
  const values = items.map((item) => [
    orderId,
    item.id,
    item.quantity,
    item.price,
  ]);
  await pool.query(
    "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?",
    [values]
  );

  return true;
};

export const GetUserOrdersModel = async (userId) => {
  const [rows] = await pool.query(
    "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
    [userId]
  );
  return rows;
};

export const GetOrderByIdModel = async (orderId) => {
  const [[order]] = await pool.query("SELECT * FROM orders WHERE id = ?", [
    orderId,
  ]);
  const [items] = await pool.query(
    "SELECT * FROM order_items WHERE order_id = ?",
    [orderId]
  );
  return { ...order, items };
};

export const TrackOrderModel = async (trackingId) => {
  const [rows] = await pool.query(
    "SELECT * FROM orders WHERE trackingId = ? ORDER BY createdAt DESC",
    [trackingId]
  );
  return rows;
};
