import pool from "../../../config/db.js";

export const CreateNewAdminModel = async (name, email, password) => {
  const [rows] = await pool.query(
    "INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, ?)",
    [name, email, password, 1]
  );

  return rows;
};

export const LoginAdminModel = async (email, password) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  return rows[0];
};
