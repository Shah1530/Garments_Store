import pool from "../../../config/db.js";

export const CreateNewProductModel = async (
  name,
  description,
  image_1,
  image_2,
  image_3,
  price,
  category_id,
  stock
) => {
  const [rows] = await pool.query(
    "INSERT INTO products (name,description,image_1,image_2,image_3,price,category_id,stock) VALUES (?, ?, ?, ?, ?, ?, ? , ?)",
    [name, description, image_1, image_2, image_3, price, category_id, stock]
  );

  return rows;
};

export const FetchAllProductsModel = async () => {
  const [rows] = await pool.query("SELECT * FROM products");

  return rows;
};

export const FetchSingleProductModel = async (id) => {
  const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);

  return rows[0];
};

export const UpdateSingleProductModel = async (id, updates) => {
  const fields = [];
  const values = [];

  for (const key in updates) {
    // Skip undefined or null values
    if (updates[key] !== undefined && updates[key] !== null) {
      fields.push(`${key} = ?`);
      values.push(updates[key]);
    }
  }

  if (fields.length === 0) return null; // Nothing to update

  const query = `UPDATE products SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);

  const [result] = await pool.query(query, values);
  return result;
};

export const DeleteSingleProductModel = async (id) => {
  const [rows] = await pool.query("DELETE FROM products WHERE id = ?", [id]);

  return rows;
};
