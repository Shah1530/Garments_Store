import pool from "../../../config/db.js";

export const FetchAllOrdersModel = async () => {
  const [rows] = await pool.query(
    `SELECT orders.*, users.name AS user_name
     FROM orders
     JOIN users ON orders.user_id = users.id
     ORDER BY orders.createdAt DESC`
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

export const UpdateOrderStatusModel = async (orderId, status) => {
  await pool.query("UPDATE orders SET status = ? WHERE id = ?", [
    status,
    orderId,
  ]);
};
