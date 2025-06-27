document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const cartContent = document.getElementById('cartContent');
  const cartMessage = document.getElementById('cartMessage');
  const emptyCartMessage = document.getElementById('emptyCartMessage');
  const checkoutBtn = document.getElementById('checkoutBtn');

  // Fetch cart data
  async function fetchCart() {
    if (!token) {
      cartMessage.style.display = 'block';
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch cart');
      const cart = await response.json();

      if (cart.items && cart.items.length > 0) {
        cartContent.innerHTML = cart.items.map(item => `
          <div class="col-md-4 mb-3">
            <div class="card">
              <img src="${item.product.image_url || 'https://via.placeholder.com/220'}" class="card-img-top" alt="${item.product.name}">
              <div class="card-body">
                <h5 class="card-title">${item.product.name}</h5>
                <p class="card-text">$${item.product.price} x ${item.quantity}</p>
              </div>
            </div>
          </div>
        `).join('');
        checkoutBtn.style.display = 'block';
      } else {
        emptyCartMessage.style.display = 'block';
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      emptyCartMessage.style.display = 'block';
    }
  }

  // Checkout button logic
  checkoutBtn.addEventListener('click', () => {
    if (!token) {
      if (confirm('You need to log in to proceed with checkout. Do you want to log in now?')) {
        window.location.href = 'signin.html';
      }
    } else {
      alert('Proceeding to checkout... (Implement checkout logic here)');
      // Add checkout API call here
    }
  });

  fetchCart();
});