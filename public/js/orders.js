document.addEventListener("DOMContentLoaded", () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const ordersTable = document.querySelector("#ordersTable tbody");
  const logoutBtn = document.getElementById("logoutBtn");

  if (!token) window.location.href = "../signin.html";

  fetch("http://localhost:3000/api/orders", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((orders) => {
      orders.forEach((order) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${order.id}</td>
          <td>${order.user_id}</td>
          <td>$${order.total}</td>
          <td>
            <select class="form-select status-select" data-id="${order.id}">
              <option ${
                order.status === "Pending" ? "selected" : ""
              }>Pending</option>
              <option ${
                order.status === "Shipped" ? "selected" : ""
              }>Shipped</option>
              <option ${
                order.status === "Delivered" ? "selected" : ""
              }>Delivered</option>
              <option ${
                order.status === "Cancelled" ? "selected" : ""
              }>Cancelled</option>
            </select>
          </td>
          <td><button class="btn btn-danger btn-sm" onclick="deleteOrder(${
            order.id
          })">Delete</button></td>
        `;
        ordersTable.appendChild(row);
      });

      document.querySelectorAll(".status-select").forEach((select) => {
        select.addEventListener("change", (e) => {
          const id = e.target.getAttribute("data-id");
          fetch(`http://localhost:3000/api/orders/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status: e.target.value }),
          })
            .then((response) => response.json())
            .then(() => alert("Status updated!"))
            .catch((err) => console.error("Error updating status:", err));
        });
      });
    })
    .catch((err) => console.error("Error fetching orders:", err));

  window.deleteOrder = (id) => {
    if (confirm("Are you sure you want to delete this order?")) {
      fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() => {
          document
            .querySelector(`tr td:contains(${id})`)
            .closest("tr")
            .remove();
          alert("Order deleted!");
        })
        .catch((err) => console.error("Error deleting order:", err));
    }
  };

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    window.location.href = "../signin.html";
  });
});
