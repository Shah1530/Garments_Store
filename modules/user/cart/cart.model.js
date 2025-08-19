import pool from "../../../config/db.js";

export const AddNewItemToTheCartModel = async (
  user_id,
  product_id,
  quantity
) => {
  const [rows] = await pool.query(
    "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
    [user_id, product_id, quantity]
  );

  return rows;
};

export const RemoveItemFromTheCartModel = async (id) => {
  const [rows] = await pool.query("DELETE FROM cart WHERE id = ?", [id]);

  return rows;
};

export const EmptyTheCartModel = async (user_id) => {
  const [rows] = await pool.query("DELETE FROM cart WHERE user_id = ?", [
    user_id,
  ]);

  return rows[0];
};

export const UpdateCartQuantityModel = async (id, quantity) => {
  const [rows] = await pool.query("UPDATE cart SET quantity = ? WHERE id = ?", [
    quantity,
    id,
  ]);

  return rows[0];
};

export const GetCartItemsModel = async (user_id) => {
  const [rows] = await pool.query("SELECT * FROM cart WHERE user_id = ?", [
    user_id,
  ]);

  return rows;
};
