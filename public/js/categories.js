document.addEventListener("DOMContentLoaded", () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const categoriesList = document.getElementById("categoriesList");

  if (!token) window.location.href = "../signin.html";

  const categories = ["Men", "Women", "Kids", "Accessories"];

  categories.forEach((category) => {
    const col = document.createElement("div");
    col.className = "col-md-3";
    col.innerHTML = `
      <div class="card">
        <img src="https://via.placeholder.com/220" class="card-img-top" alt="${category}">
        <div class="card-body">
          <h5 class="card-title">${category}</h5>
          <a href="products.html?category=${category}" class="btn btn-primary">Shop Now</a>
        </div>
      </div>
    `;
    categoriesList.appendChild(col);
  });
});
