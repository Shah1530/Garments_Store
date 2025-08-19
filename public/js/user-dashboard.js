document.addEventListener("DOMContentLoaded", () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const logoutBtn = document.getElementById("logoutBtn");
  const orderHistory = document.getElementById("orderHistory");
  const userProfile = document.getElementById("userProfile");
  const editProfileBtn = document.getElementById("editProfileBtn");

  if (!token) window.location.href = "../signin.html";

  // Fetch order history
  fetch("http://localhost:3000/api/user/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((data) => {
      data.orders.forEach((order) => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = `Order #${order.id} - ${order.status} ($${order.total})`;
        orderHistory.appendChild(li);
      });
    })
    .catch((err) => console.error("Error fetching orders:", err));

  // Fetch user profile
  fetch(
    "http://localhost:3000/api/user/users/" +
      JSON.parse(atob(token.split(".")[1])).id,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      userProfile.textContent = `Username: ${data.username}, Email: ${
        data.email || "N/A"
      }, Phone: ${data.phone || "N/A"}, Address: ${data.address || "N/A"}`;
    })
    .catch((err) => console.error("Error fetching profile:", err));

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
<<<<<<< HEAD
    localStorage.removeItem("u2yCwN4hBx");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("u2yCwN4hBx");
=======
    sessionStorage.removeItem("token");
>>>>>>> 2af84b33cbb9ac83a17904d7963d0a950bb6f726
    window.location.href = "../signin.html";
  });

  editProfileBtn.addEventListener("click", () => {
    window.location.href = "my-account.html";
  });
});
