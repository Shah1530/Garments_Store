import pool from "../../../config/db.js";

export const FindUserByEmailModel = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

export const ValidateUserActivationModel = async (email) => {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ? AND is_active = ?",
    [email, 1]
  );
  return rows[0];
};

export const CreateNewUserModel = async (name, email, password) => {
  const [rows] = await pool.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );

  return rows;
};

export const LoginNewUserModel = async (email, password) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  return rows[0];
};
