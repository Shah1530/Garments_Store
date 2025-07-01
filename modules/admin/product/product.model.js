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
  const [rows] = await pool.query(
    `SELECT
       p.*,
       c.id AS category_id,
       c.name AS category_name
     FROM
       products p
     LEFT JOIN
       categories c ON p.category_id = c.id`
  );

  return rows;
};

export const FetchSingleProductModel = async (id) => {
  const [rows] = await pool.query(
    `SELECT
       p.*,
       c.id AS category_id,
       c.name AS category_name,
     FROM
       products p
     LEFT JOIN
       categories c ON p.category_id = c.id
     WHERE
       p.id = ?`,
    [id]
  );

  const row = rows[0];

  return row;
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
