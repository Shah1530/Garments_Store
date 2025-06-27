document.addEventListener("DOMContentLoaded", () => {
  const usersTableBody = document.getElementById("usersTableBody");
  const btnAddUser = document.getElementById("btnAddUser");

  let users = [];

  async function fetchUsers() {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      if (!token) throw new Error("No authentication token found");

      const response = await fetch("http://localhost:3000/api/admin/users", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch users");
      users = await response.json();
      renderUsers();
    } catch (err) {
      console.error("Error fetching users:", err);
      alert("Failed to load users. Please login again.");
    }
  }

  function renderUsers() {
    usersTableBody.innerHTML = "";
    users.forEach((user) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${user.id}</td>
        <td>${user.fullName}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>
          <button class="action-btn" onclick="editUser(${user.id})">Edit</button>
          <button class="action-btn delete" onclick="deleteUser(${user.id})">Delete</button>
        </td>
      `;
      usersTableBody.appendChild(tr);
    });
  }

  window.editUser = (id) => {
    alert("Edit user ID " + id);
    // TODO: Implement edit functionality
  };

  async function deleteUser(id) {
    if (confirm(`Are you sure you want to delete user ID ${id}?`)) {
      try {
        const token = JSON.parse(localStorage.getItem("user"))?.token;
        const response = await fetch(
          `http://localhost:3000/api/admin/users/${id}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) throw new Error("Failed to delete user");
        users = users.filter((u) => u.id !== id);
        renderUsers();
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Failed to delete user.");
      }
    }
  }

  btnAddUser.addEventListener("click", () => {
    alert("Add New User functionality coming soon!");
  });

  fetchUsers();
});
