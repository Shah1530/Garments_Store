document.addEventListener("DOMContentLoaded", () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const logoutBtn = document.getElementById("logoutBtn");
  const totalProducts = document.getElementById("totalProducts");
  const totalOrders = document.getElementById("totalOrders");
  const totalUsers = document.getElementById("totalUsers");

  // if (!token) window.location.href = "../signin.html";

  // Fetch dashboard stats
  fetch("http://localhost:3000/api/admin/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((data) => {
      totalProducts.textContent = data.totalProducts;
      totalOrders.textContent = data.totalOrders;
      totalUsers.textContent = data.totalUsers;
    })
    .catch((err) => console.error("Error fetching stats:", err));

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("u2yCwN4hBx");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("u2yCwN4hBx");
    // window.location.href = "../signin.html";
  });
});
