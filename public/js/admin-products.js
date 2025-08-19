document.addEventListener("DOMContentLoaded", () => {
  const productsTableBody = document.getElementById("productsTableBody");
  const productModal = document.getElementById("productModal");
  const productForm = document.getElementById("productForm");
  const modalTitle = document.getElementById("modalTitle");
  const btnAddProduct = document.getElementById("btnAddProduct");
  const btnCancel = document.getElementById("btnCancel");

  const inputId = document.getElementById("productId");
  const inputName = document.getElementById("productName");
  const inputCategory = document.getElementById("productCategory");
  const inputPrice = document.getElementById("productPrice");
  const inputStock = document.getElementById("productStock");

  let products = [];

  async function fetchProducts() {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      if (!token) throw new Error("No authentication token found");

      const response = await fetch("http://localhost:3000/api/admin/products", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch products");
      products = await response.json();
      renderProducts();
    } catch (err) {
      console.error("Error fetching products:", err);
      alert("Failed to load products. Please login again.");
    }
  }

  function renderProducts() {
    productsTableBody.innerHTML = "";
    products.forEach((product) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>$${product.price.toFixed(2)}</td>
        <td>${product.stock}</td>
        <td class="actions">
          <button class="btn-edit" data-id="${product.id}">Edit</button>
          <button class="btn-delete" data-id="${product.id}">Delete</button>
        </td>
      `;
      productsTableBody.appendChild(tr);
    });
  }

  function showModal(isEdit = false, product = null) {
    if (isEdit && product) {
      modalTitle.textContent = "Edit Product";
      inputId.value = product.id;
      inputName.value = product.name;
      inputCategory.value = product.category;
      inputPrice.value = product.price;
      inputStock.value = product.stock;
    } else {
      modalTitle.textContent = "Add Product";
      productForm.reset();
      inputId.value = "";
    }
    productModal.style.display = "flex";
  }

  function hideModal() {
    productModal.style.display = "none";
  }

  async function addProduct(product) {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const response = await fetch("http://localhost:3000/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error("Failed to add product");
      const newProduct = await response.json();
      products.push(newProduct);
      renderProducts();
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product.");
    }
  }

  async function updateProduct(product) {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const response = await fetch(
        `http://localhost:3000/api/admin/products/${product.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(product),
        }
      );
      if (!response.ok) throw new Error("Failed to update product");
      const updatedProduct = await response.json();
      products = products.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      );
      renderProducts();
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product.");
    }
  }

  async function deleteProduct(id) {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const response = await fetch(
        `http://localhost:3000/api/admin/products/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("Failed to delete product");
      products = products.filter((p) => p.id !== id);
      renderProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product.");
    }
  }

  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const productData = {
      id: inputId.value ? parseInt(inputId.value) : null,
      name: inputName.value.trim(),
      category: inputCategory.value.trim(),
      price: parseFloat(inputPrice.value),
      stock: parseInt(inputStock.value),
    };
    if (productData.id) {
      await updateProduct(productData);
    } else {
      await addProduct(productData);
    }
    hideModal();
  });

  btnAddProduct.addEventListener("click", () => showModal());
  btnCancel.addEventListener("click", hideModal);

  productsTableBody.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("btn-edit")) {
      const id = parseInt(target.dataset.id);
      const product = products.find((p) => p.id === id);
      if (product) showModal(true, product);
    } else if (target.classList.contains("btn-delete")) {
      const id = parseInt(target.dataset.id);
      if (confirm("Are you sure you want to delete this product?")) {
        deleteProduct(id);
      }
    }
  });

  fetchProducts();
});
