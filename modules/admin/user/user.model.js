import pool from "../../../config/db.js";

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
