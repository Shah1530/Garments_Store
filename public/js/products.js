document.addEventListener("DOMContentLoaded", () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const productList = document.getElementById("productList");
  const categoryFilter = document.getElementById("categoryFilter");

  if (!token) window.location.href = "../signin.html";

  function renderProducts(products) {
    productList.innerHTML = "";
    products.forEach((product) => {
      const col = document.createElement("div");
      col.className = "col-md-3";
      col.innerHTML = `
        <div class="card">
          <img src="${
            product.image_url || "https://via.placeholder.com/220"
          }" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">$${product.price}</p>
            <a href="products-details.html?id=${
              product.id
            }" class="btn btn-primary">View Details</a>
          </div>
        </div>
      `;
      productList.appendChild(col);
    });
  }

  fetch("http://localhost:3000/api/products", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((products) => {
      renderProducts(products);
      categoryFilter.addEventListener("change", () => {
        const filtered = products.filter(
          (p) => !categoryFilter.value || p.category === categoryFilter.value
        );
        renderProducts(filtered);
      });
    })
    .catch((err) => console.error("Error fetching products:", err));
});
