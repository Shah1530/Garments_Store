document.addEventListener("DOMContentLoaded", () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const productDetails = document.getElementById("productDetails");
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (!token) window.location.href = "../signin.html";

  fetch(`http://localhost:3000/api/products/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => response.json())
    .then((product) => {
      productDetails.innerHTML = `
        <div class="col-md-6">
          <img src="${
            product.image_url || "https://via.placeholder.com/400"
          }" class="img-fluid" alt="${product.name}">
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title">${product.name}</h2>
              <p class="card-text">Category: ${product.category}</p>
              <p class="card-text">Price: $${product.price}</p>
              <p class="card-text">Stock: ${product.stock}</p>
              <button class="btn btn-primary" onclick="addToCart(${JSON.stringify(
                product
              ).replace(/"/g, "&quot;")})">Add to Cart</button>
            </div>
          </div>
        </div>
      `;
    })
    .catch((err) => console.error("Error fetching product:", err));

  window.addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
    window.location.href = "cart.html";
  };
});
