document.addEventListener("DOMContentLoaded", () => {
  const signinForm = document.getElementById("signinForm");
  const errorMessage = document.getElementById("errorMessage");
  const registerLink = document.getElementById("registerLink");

  signinForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    if (!username || !password) {
      errorMessage.textContent = "Please fill all fields.";
      errorMessage.style.display = "block";
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();
      if (response.ok) {
        const token = data.token;
        localStorage.setItem("token", token);
        if (role === "admin") {
          window.location.href = "admin/dashboard.html";
        } else {
          window.location.href = "user-dashboard.html";
        }
      } else {
        errorMessage.textContent = data.message || "Sign-in failed.";
        errorMessage.style.display = "block";
      }
    } catch (err) {
      errorMessage.textContent = "An error occurred. Please try again.";
      errorMessage.style.display = "block";
      console.error("Sign-in Error:", err);
    }
  });

  registerLink.addEventListener("click", (e) => {
    e.preventDefault();
    alert(
      "Registration feature is not implemented yet. Please contact support."
    );
  });
});
