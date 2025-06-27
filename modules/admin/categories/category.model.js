import pool from "../../../config/db.js";

export const CreateNewCategoryModel = async (name) => {
  const [rows] = await pool.query("INSERT INTO categories (name) VALUES (?)", [
    name,
  ]);

  return rows;
};

export const FetchAllCategoriesModel = async () => {
  const [rows] = await pool.query("SELECT * FROM categories");

  return rows;
};

export const FetchSingleCategoryModel = async (id) => {
  const [rows] = await pool.query("SELECT * FROM categories WHERE id = ?", [
    id,
  ]);

  return rows[0];
};

export const UpdateSingleCategoryModel = async (id, name) => {
  const [result] = await pool.query(
    "UPDATE categories SET name = ? WHERE id = ?",
    [name, id]
  );
  return result;
};

export const DeleteSingleCategoryModel = async (id) => {
  const [rows] = await pool.query("DELETE FROM categories WHERE id = ?", [id]);

  return rows;
};
