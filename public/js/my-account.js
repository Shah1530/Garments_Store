document.addEventListener("DOMContentLoaded", () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const logoutBtn = document.getElementById("logoutBtn");
  const profileForm = document.getElementById("profileForm");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const address = document.getElementById("address");

  if (!token) window.location.href = "../signin.html";

  fetch(
    "http://localhost:3000/api/user/users/" +
      JSON.parse(atob(token.split(".")[1])).id,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then((response) => response.json())
    .then((user) => {
      username.value = user.username;
      email.value = user.email || "";
      phone.value = user.phone || "";
      address.value = user.address || "";
    })
    .catch((err) => console.error("Error fetching profile:", err));

  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const updatedData = {
      username: username.value,
      email: email.value,
      phone: phone.value,
      address: address.value,
    };

    fetch(
      `http://localhost:3000/api/user/users/${
        JSON.parse(atob(token.split(".")[1])).id
      }`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      }
    )
      .then((response) => response.json())
      .then(() => alert("Profile updated successfully!"))
      .catch((err) => console.error("Error updating profile:", err));
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("u2yCwN4hBx");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("u2yCwN4hBx");
    window.location.href = "../signin.html";
  });
});
