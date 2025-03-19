// Cart array to hold the added items
let cart = [];

// Product data (Example Products)
const products = [
  { name: 'Product 1', price: 49.99, category: 'electronics', img: 'https://picsum.photos/200/300' },
  { name: 'Product 2', price: 39.99, category: 'fashion', img: 'https://picsum.photos/200/300?random=1' },
  { name: 'Product 3', price: 29.99, category: 'home', img: 'https://picsum.photos/200/300?random=2' },
  { name: 'Product 4', price: 59.99, category: 'electronics', img: 'https://picsum.photos/200/300?random=3' },
  // More products here...
];

// Dynamically load products
function loadProducts(filter = 'all') {
  const productGrid = document.getElementById('product-grid');
  productGrid.innerHTML = ''; // Clear existing products
  products.forEach(product => {
    if (filter === 'all' || product.category === filter) {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      productDiv.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
      `;
      productGrid.appendChild(productDiv);
    }
  });
}

// Add item to the cart
function addToCart(productName, productPrice) {
  cart.push({ name: productName, price: productPrice });
  updateCart();
}

// Update the cart display
function updateCart() {
  const cartLink = document.getElementById('cart-link');
  cartLink.textContent = `Cart (${cart.length})`;

  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  cartItems.innerHTML = '';
  let total = 0;
  
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartItems.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = total.toFixed(2);
}

// Open Cart Modal
function openCartModal() {
  document.getElementById('cart-modal').style.display = 'flex';
}

// Close Cart Modal
function closeCartModal() {
  document.getElementById('cart-modal').style.display = 'none';
}

// Checkout function
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert("Thank you for your purchase!");
    cart = [];
    updateCart();
    closeCartModal();
  }
}

// Filter products by category
document.getElementById('category-filter').addEventListener('change', (e) => {
  loadProducts(e.target.value);
});

// Update price filter
document.getElementById('price-filter').addEventListener('input', (e) => {
  document.getElementById('price-range').textContent = e.target.value;
  loadProducts();
});

// Initially load all products
loadProducts();
