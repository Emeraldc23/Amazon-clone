import { cart } from "../data/cart-class.js";
import { products, generateProducts } from "../data/products.js";

generateProducts(productPage);

function productPage() {
  let productHtml = " ";
  products.forEach((product) => {
    productHtml += `
    <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="${product.getRating()}"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">${product.getPrice()}</div>

          <div class="product-quantity-container">
            <select class="js-selected-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.getNewHtml()}
          <div class="product-spacer"></div>

          <div class="added-to-cart js-add-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <p class="added-msg"></p>
          <button class="add-to-cart-button button-primary js-add-to-cart" 
          data-prod-id = "${product.id}"
          data-prod-Price = "${product.priceCents}"
          >Add to Cart</button>
        </div>
    `;
  });
  document.querySelector(".js-products-section").innerHTML = productHtml;
  function loadCartQuantity() {
    let cartQuantity = 0;
    cart.cartItem.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  }
  loadCartQuantity();

  let checkTimeOut = {};

  document.querySelectorAll(".js-add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      let { prodId } = btn.dataset;
      let { prodPrice } = btn.dataset;

      cart.addCartItems(prodId, prodPrice);
      loadCartQuantity();

      const showAddedMsg = document.querySelector(`.js-add-${prodId}`);
      showAddedMsg.classList.add("display-added-msg");

      const checkPreviousTimeOut = checkTimeOut[prodId];

      if (checkPreviousTimeOut) {
        clearInterval(checkPreviousTimeOut);
      }

      const timeOutId = setTimeout(() => {
        showAddedMsg.classList.remove("display-added-msg");
      }, 2000);
      checkTimeOut[prodId] = timeOutId;
    });
  });
}
