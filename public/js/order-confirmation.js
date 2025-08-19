document.addEventListener("DOMContentLoaded", () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const logoutBtn = document.getElementById("logoutBtn");
  const orderId = document.getElementById("orderId");
  const orderDetails = document.getElementById("orderDetails");
  const urlParams = new URLSearchParams(window.location.search);
  const orderIdValue = urlParams.get("id");

  if (!token) window.location.href = "../signin.html";

  orderId.textContent = `Order #${orderIdValue}`;
  fetch(`http://localhost:3000/api/orders/${orderIdValue}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((order) => {
      orderDetails.textContent = `Total: $${order.total}, Status: ${
        order.status
      }, Payment: ${order.payment_method || "N/A"}, Shipping: ${
        order.shipping_address || "N/A"
      }`;
    })
    .catch((err) => console.error("Error fetching order:", err));

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("u2yCwN4hBx");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("u2yCwN4hBx");
    window.location.href = "../signin.html";
  });
});
