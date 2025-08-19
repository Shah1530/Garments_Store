import pool from "../../../config/db.js";

export const FetchAllOrdersModel = async () => {
  const [rows] = await pool.query(`
    SELECT
      orders.*,
      users.name AS user_name,
      order_items.id AS order_item_id,
      order_items.product_id,
      products.name AS product_name,
      order_items.quantity,
      order_items.price AS order_item_price
    FROM orders
    JOIN users ON orders.user_id = users.id
    LEFT JOIN order_items ON orders.id = order_items.order_id
    LEFT JOIN products ON order_items.product_id = products.id
    ORDER BY orders.createdAt DESC
  `);

  const orders = [];

  rows.forEach((row) => {
    let order = orders.find((o) => o.id === row.id);
    if (!order) {
      order = {
        id: row.id,
        user_id: row.user_id,
        user_name: row.user_name,
        status: row.status,
        payment_method: row.payment_method,
        phone: row.phone,
        address: row.address,
        trackingId: row.trackingId,
        totalPrice: row.totalPrice,
        createdAt: row.createdAt,
        items: [],
      };
      orders.push(order);
    }

    if (row.order_item_id) {
      order.items.push({
        id: row.order_item_id,
        product_id: row.product_id,
        product_name: row.product_name,
        quantity: row.quantity,
        price: row.order_item_price,
      });
    }
  });

  return orders;
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

  return true;
};
