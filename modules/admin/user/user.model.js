import pool from "../../../config/db.js";

export const FindAdminWithEmailModel = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

export const CreateNewAdminModel = async (name, email, password) => {
  const [rows] = await pool.query(
    "INSERT INTO users (name, email, password, is_admin, is_active) VALUES (?, ?, ?, ?, ?)",
    [name, email, password, 1, 1]
  );

  return true;
};

export const FetchAllUsersModel = async () => {
  const [rows] = await pool.query("SELECT * FROM users");

  return rows;
};

export const UpdateUserAccountStatusModel = async (id, is_active) => {
  const [result] = await pool.query(
    "UPDATE users SET is_active = ? WHERE id = ?",
    [is_active, id]
  );

  return result; // This is an object, not an array
};
