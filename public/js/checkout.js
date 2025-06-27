document.addEventListener("DOMContentLoaded", () => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const logoutBtn = document.getElementById("logoutBtn");
  const checkoutItems = document.getElementById("checkoutItems");
  const checkoutTotal = document.getElementById("checkoutTotal");
  const checkoutForm = document.getElementById("checkoutForm");

  if (!token) window.location.href = "../signin.html";

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
    checkoutItems.appendChild(li);
    total += item.price * item.quantity;
  });
  checkoutTotal.textContent = total.toFixed(2);

  checkoutForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const paymentMethod = document.getElementById("paymentMethod").value;

    if (!address || !phone || !paymentMethod) {
      alert("Please fill all fields.");
      return;
    }

    const orderData = {
      total,
      status: "Pending",
      payment_method: paymentMethod,
      shipping_address: address,
      phone,
      items: cart.map((item) => ({
        product_id: item.id || 1, // Placeholder, replace with real product IDs
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem("cart");
        window.location.href = "order-confirmation.html?id=" + data.id;
      } else {
        throw new Error(data.message || "Checkout failed");
      }
    } catch (err) {
      console.error("Checkout Error:", err);
      alert(err.message || "Something went wrong.");
    }
  });

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    window.location.href = "../signin.html";
  });
});
