document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const featuredProducts = document.getElementById("featuredProducts");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const signinLink = document.getElementById("signinLink");
  const dashboardLink = document.getElementById("dashboardLink");
  const logoutLink = document.getElementById("logoutLink");
  const navbar = document.getElementById("mainNavbar");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const newsletterForm = document.querySelector(".newsletter-form");

  // State Management
  let allProducts = [];
  let filteredProducts = [];
  let currentFilter = "all";

  // Initialize Application
  init();

  function init() {
    updateNavigation();
    setupEventListeners();
    setupScrollEffects();
    fetchProducts();
    animateOnScroll();
  }

  // Navigation Management
  function updateNavigation() {
    if (token) {
      signinLink.style.display = "none";
      dashboardLink.style.display = "block";
      logoutLink.style.display = "block";

      const logoutBtn = document.getElementById("logoutBtn");
      logoutBtn?.addEventListener("click", handleLogout);
    }
  }

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("u2yCwN4hBx");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("u2yCwN4hBx");

    // Update UI
    signinLink.style.display = "block";
    dashboardLink.style.display = "none";
    logoutLink.style.display = "none";

    showNotification("Logged out successfully!", "success");
    setTimeout(() => window.location.href = "index.html", 1000);
  }

  // Event Listeners Setup
  function setupEventListeners() {
    // Search functionality
    searchForm?.addEventListener("submit", handleSearch);
    searchInput?.addEventListener("input", debounce(handleLiveSearch, 300));

    // Filter buttons
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => handleFilter(btn.dataset.filter));
    });

    // Newsletter subscription
    newsletterForm?.addEventListener("submit", handleNewsletterSubscription);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", handleSmoothScroll);
    });
  }

  // Scroll Effects
  function setupScrollEffects() {
    let lastScrollTop = 0;

    window.addEventListener("scroll", throttle(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Navbar background change
      if (scrollTop > 100) {
        navbar?.classList.add("scrolled");
      } else {
        navbar?.classList.remove("scrolled");
      }

      // Navbar hide/show on scroll
      if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar?.style.transform = "translateY(-100%)";
      } else {
        navbar?.style.transform = "translateY(0)";
      }

      lastScrollTop = scrollTop;
    }, 100));
  }

  // Animate elements on scroll
  function animateOnScroll() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll(".feature-card, .product-card").forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.6s ease";
      observer.observe(el);
    });
  }

  // Product Management
  async function fetchProducts() {
    try {
      showLoading(true);

      const response = await fetch("http://localhost:3000/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          showNotification("Please sign in to view products.", "warning");
          setTimeout(() => window.location.href = "signin.html", 1000);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const products = await response.json();
      allProducts = products;
      filteredProducts = products;
      renderProducts(products.slice(0, 8));
      updateCartBadge();

    } catch (error) {
      console.error("Error fetching products:", error);
      showErrorState();
    } finally {
      showLoading(false);
    }
  }

  function renderProducts(products) {
    if (!featuredProducts) return;

    featuredProducts.innerHTML = "";

    if (products.length === 0) {
      showEmptyState();
      return;
    }

    products.forEach((product, index) => {
      const productCard = createProductCard(product, index);
      featuredProducts.appendChild(productCard);
    });
  }

  function createProductCard(product, index) {
    const col = document.createElement("div");
    col.className = "col-lg-3 col-md-6 mb-4";
    col.style.animationDelay = `${index * 0.1}s`;

    col.innerHTML = `
      <div class="product-card">
        <div class="product-image">
          <img src="${product.image_url || 'https://via.placeholder.com/300x250'}"
               alt="${product.name}"
               loading="lazy"
               onerror="this.src='https://via.placeholder.com/300x250'">
          <div class="product-overlay">
            <div class="product-actions">
              <a href="products-details.html?id=${product.id}" class="action-btn" title="View Details">
                <i class="fas fa-eye"></i>
              </a>
              <button class="action-btn" onclick="addToCart(${product.id})" title="Add to Cart">
                <i class="fas fa-shopping-cart"></i>
              </button>
              <button class="action-btn" onclick="addToWishlist(${product.id})" title="Add to Wishlist">
                <i class="fas fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="product-info">
          <h5 class="product-title">${truncateText(product.name, 50)}</h5>
          <div class="product-price">$${formatPrice(product.price)}</div>
          <div class="product-rating">
            ${generateStarRating(product.rating || 4.5)}
            <span class="rating-count">(${product.reviews || Math.floor(Math.random() * 100)})</span>
          </div>
        </div>
      </div>
    `;

    return col;
  }

  // Search Functionality
  function handleSearch(e) {
    e.preventDefault();
    const query = searchInput.value.toLowerCase().trim();

    if (!query) {
      renderProducts(allProducts.slice(0, 8));
      return;
    }

    const results = allProducts.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query))
    );

    filteredProducts = results;
    renderProducts(results.slice(0, 8));

    if (results.length === 0) {
      showNoResultsMessage(query);
    }
  }

  function handleLiveSearch() {
    const query = searchInput.value.toLowerCase().trim();

    if (query.length > 2) {
      handleSearch({ preventDefault: () => {} });
    } else if (query.length === 0) {
      renderProducts(allProducts.slice(0, 8));
    }
  }

  // Filter Functionality
  function handleFilter(filter) {
    currentFilter = filter;

    // Update active button
    filterButtons.forEach(btn => btn.classList.remove("active"));
    document.querySelector(`[data-filter="${filter}"]`)?.classList.add("active");

    // Filter products
    let filtered = allProducts;

    if (filter !== "all") {
      filtered = allProducts.filter(product =>
        product.category.toLowerCase().includes(filter.toLowerCase())
      );
    }

    filteredProducts = filtered;
    renderProducts(filtered.slice(0, 8));

    // Animate filter change
    featuredProducts.style.opacity = "0.5";
    setTimeout(() => {
      featuredProducts.style.opacity = "1";
    }, 300);
  }

  // Newsletter Subscription
  function handleNewsletterSubscription(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;

    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address", "error");
      return;
    }

    // Simulate API call (replace with actual endpoint later)
    setTimeout(() => {
      showNotification("Thank you for subscribing to our newsletter!", "success");
      e.target.reset();
    }, 1000);
  }

  // Smooth Scrolling
  function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  }

  // Utility Functions
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  }

  function formatPrice(price) {
    return Number(price).toFixed(2);
  }

  function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = "";

    for (let i = 0; i < fullStars; i++) {
      stars += '<i class="fas fa-star text-warning"></i>';
    }

    if (hasHalfStar) {
      stars += '<i class="fas fa-star-half-alt text-warning"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars += '<i class="far fa-star text-warning"></i>';
    }

    return stars;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // UI State Management
  function showLoading(show) {
    if (!featuredProducts) return;

    if (show) {
      featuredProducts.innerHTML = `
        <div class="col-12 text-center">
          <div class="loading-spinner">
            <i class="fas fa-spinner fa-spin fa-2x text-primary"></i>
            <p class="mt-2">Loading amazing products...</p>
          </div>
        </div>
      `;
    }
  }

  function showErrorState() {
    if (!featuredProducts) return;

    featuredProducts.innerHTML = `
      <div class="col-12 text-center">
        <div class="error-state py-5">
          <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
          <h4>Oops! Something went wrong</h4>
          <p class="text-muted">We couldn't load the products. Please try again later.</p>
          <button class="btn btn-primary" onclick="location.reload()">
            <i class="fas fa-redo me-2"></i>Try Again
          </button>
        </div>
      </div>
    `;
  }

  function showEmptyState() {
    featuredProducts.innerHTML = `
      <div class="col-12 text-center">
        <div class="empty-state py-5">
          <i class="fas fa-shopping-bag fa-3x text-muted mb-3"></i>
          <h4>No products found</h4>
          <p class="text-muted">Try adjusting your search or filter criteria.</p>
        </div>
      </div>
    `;
  }

  function showNoResultsMessage(query) {
    featuredProducts.innerHTML = `
      <div class="col-12 text-center">
        <div class="no-results py-5">
          <i class="fas fa-search fa-3x text-muted mb-3"></i>
          <h4>No results for "${query}"</h4>
          <p class="text-muted">Try different keywords or browse our categories.</p>
          <button class="btn btn-outline-primary" onclick="searchInput.value=''; handleSearch({preventDefault:()=>{}})">
            Clear Search
          </button>
        </div>
      </div>
    `;
  }

  function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `alert alert-${type === "error" ? "danger" : type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = "top: 100px; right: 20px; z-index: 9999; min-width: 300px;";
    notification.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 5000);
  }

  function updateCartBadge() {
    const cartBadge = document.querySelector(".cart-badge");
    if (cartBadge) {
      // Placeholder: Sync with backend cart count later
      const cartCount = localStorage.getItem("cartCount") || "0";
      cartBadge.textContent = cartCount;
    }
  }

  // Global functions for product interactions
  window.addToCart = function(productId) {
    if (!token) {
      showNotification("Please sign in to add items to cart.", "warning");
      setTimeout(() => window.location.href = "signin.html", 1000);
      return;
    }
    // Simulate adding to cart (replace with API call later)
    showNotification("Product added to cart!", "success");
    let cartCount = parseInt(localStorage.getItem("cartCount") || "0");
    cartCount++;
    localStorage.setItem("cartCount", cartCount.toString());
    updateCartBadge();
  };

  window.addToWishlist = function(productId) {
    if (!token) {
      showNotification("Please sign in to add items to wishlist.", "warning");
      setTimeout(() => window.location.href = "signin.html", 1000);
      return;
    }
    showNotification("Product added to wishlist!", "success");
    // Add wishlist logic here later
  };
});
