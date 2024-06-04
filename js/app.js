document.addEventListener("DOMContentLoaded", function () {
  fetch("db.json")
    .then((response) => response.json())
    .then((data) => {
      window.products = data.products;
      window.currentPage = 1;
      window.productsPerPage = 8;
      displayProducts(getCurrentPageProducts());
    })
    .catch((error) => console.error("error", error));

  let allBtn = document.querySelector(".all-btn");
  let tShirtBtn = document.querySelector(".tShirt-btn");
  let hoodiesBtn = document.querySelector(".hoodies-btn");
  let jacketBtn = document.querySelector(".jacket-btn");
  let prevBtn = document.querySelector(".btn-secondary");
  let nextBtn = document.querySelector(".btn-success");

  allBtn.addEventListener("click", () => filterProducts("All Products"));
  tShirtBtn.addEventListener("click", () => filterProducts("T-shirts"));
  hoodiesBtn.addEventListener("click", () => filterProducts("Hoodies"));
  jacketBtn.addEventListener("click", () => filterProducts("Jackets"));

  prevBtn.addEventListener("click", () => changePage(-1));
  nextBtn.addEventListener("click", () => changePage(1));
});

function displayProducts(products) {
  const productGrid = document.getElementById("product-grid");
  productGrid.innerHTML = "";
  products.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.className = "col-md-3 mb-4";
    productItem.innerHTML = `
            <div class="product-item text-center">
                <img src="${product.photo}" alt="${
      product.name
    }" class="img-fluid" />
                <p>${product.name}</p>
                <span>${product.type}</span>
                <span class="price">$${product.price.toFixed(2)}</span>
            </div>
        `;
    productGrid.appendChild(productItem);
  });
}

function filterProducts(type) {
  window.currentPage = 1;
  if (type === "All Products") {
    window.filteredProducts = window.products;
  } else {
    window.filteredProducts = window.products.filter(
      (product) => product.type === type
    );
  }
  displayProducts(getCurrentPageProducts());
}

function changePage(direction) {
  const totalPages = Math.ceil(
    window.filteredProducts.length / window.productsPerPage
  );
  window.currentPage += direction;

  if (window.currentPage < 1) {
    window.currentPage = 1;
  } else if (window.currentPage > totalPages) {
    window.currentPage = totalPages;
  }

  displayProducts(getCurrentPageProducts());
}

function getCurrentPageProducts() {
  const startIndex = (window.currentPage - 1) * window.productsPerPage;
  const endIndex = startIndex + window.productsPerPage;
  return window.filteredProducts.slice(startIndex, endIndex);
}
