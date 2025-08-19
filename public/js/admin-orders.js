document.addEventListener("DOMContentLoaded", () => {
  const ordersTableBody = document.getElementById("ordersTableBody");
  const btnAddOrder = document.getElementById("btnAddOrder");

  let orders = [];

  async function fetchOrders() {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      if (!token) throw new Error("No authentication token found");

      const response = await fetch("http://localhost:3000/api/admin/orders", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch orders");
      orders = await response.json();
      renderOrders();
    } catch (err) {
      console.error("Error fetching orders:", err);
      alert("Failed to load orders. Please login again.");
    }
  }

  function renderOrders() {
    ordersTableBody.innerHTML = "";
    orders.forEach((order) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${order.id}</td>
        <td>${order.customer}</td>
        <td>${order.date}</td>
        <td>${order.status}</td>
        <td>$${order.total.toFixed(2)}</td>
        <td>
          <button class="action-btn" onclick="viewOrder(${
            order.id
          })">View</button>
          <button class="action-btn delete" onclick="deleteOrder(${
            order.id
          })">Delete</button>
        </td>
      `;
      ordersTableBody.appendChild(tr);
    });
  }

  window.viewOrder = (id) => {
    alert("View details for order #" + id);
    // TODO: Implement detailed view
  };

  async function deleteOrder(id) {
    if (confirm(`Are you sure you want to delete order #${id}?`)) {
      try {
        const token = JSON.parse(localStorage.getItem("user"))?.token;
        const response = await fetch(
          `http://localhost:3000/api/admin/orders/${id}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) throw new Error("Failed to delete order");
        orders = orders.filter((o) => o.id !== id);
        renderOrders();
      } catch (err) {
        console.error("Error deleting order:", err);
        alert("Failed to delete order.");
      }
    }
  }

  btnAddOrder.addEventListener("click", () => {
    alert("Add New Order functionality coming soon!");
  });

  fetchOrders();
});
