document.addEventListener("DOMContentLoaded", () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const usersTable = document.querySelector("#usersTable tbody");
  const logoutBtn = document.getElementById("logoutBtn");

  if (!token) window.location.href = "../signin.html";

  fetch("http://localhost:3000/api/users", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((users) => {
      users.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.username}</td>
          <td>${user.email || "N/A"}</td>
          <td>${user.role}</td>
          <td><button class="btn btn-danger btn-sm" onclick="deleteUser(${
            user.id
          })">Delete</button></td>
        `;
        usersTable.appendChild(row);
      });
    })
    .catch((err) => console.error("Error fetching users:", err));

  window.deleteUser = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() => {
          document
            .querySelector(`tr td:contains(${id})`)
            .closest("tr")
            .remove();
          alert("User deleted!");
        })
        .catch((err) => console.error("Error deleting user:", err));
    }
  };

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
});
