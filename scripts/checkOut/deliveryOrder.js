import { products } from "../../data/products.js";
import {
  cart,
  deleteFromCart,
  saveCartToStorage,
  updateCartQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { priceInCent } from "../utility/price.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOption } from "../../data/deliveryOption.js";

const todayDate = dayjs();
const addDate = todayDate.add(7, "days");
const deliveryDate = addDate.format("dddd, MMMM D");
console.log(deliveryDate);

export function modifyViewPage() {
  let checkOutHtml = " ";
  cart.forEach((checkOutItems) => {
    const product = checkOutItems.id;

    let matchingId;
    products.forEach((items) => {
      if (items.id === product) {
        matchingId = items;
      }
    });

    const deliveryOptionId = checkOutItems.deliveryId;
    let options;
    deliveryOption.forEach((deliveryItem) => {
      if (deliveryItem.id === deliveryOptionId) {
        options = deliveryItem;
      }
    });

    const todayDate = dayjs();
    const deliveryDate = todayDate.add(options.deliveryDays, "days");
    const currentDay = deliveryDate.format("dddd, MMMM D");

    checkOutHtml += `
        <div class="cart-item-container 
        js-cart-container-${matchingId.id}">
            <div class="delivery-date">Delivery date: ${currentDay}</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image" src="${matchingId.image}"
              />
              <div class="cart-item-details">
                <div class="product-name">${matchingId.prodName}</div>
                <div class="product-price">$${priceInCent(
                  matchingId.priceCents
                )}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label-${
                    matchingId.id
                  }">${checkOutItems.quantity}</span> </span>
                  <span class="update-quantity-link-${
                    matchingId.id
                  } link-primary js-update-link " data-product-id = ${
      matchingId.id
    }>
                    Update
                  </span>
                  <input class="input-quantity js-input-quality-${
                    matchingId.id
                  }" type="text"/>
                  <span class="save-quantity-link link-primary js-save-quality-${
                    matchingId.id
                  }" data-product-id = ${matchingId.id}>
                    Save
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-btn" data-product-id = ${
                    matchingId.id
                  }>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

                ${deliveryOptions(matchingId, checkOutItems)}
              </div>
            </div>
        </div>
        `;
  });

  function deliveryOptions(matchingId, checkOutItems) {
    let priceHTML = "";
    deliveryOption.forEach((deliveryItem) => {
      const todayDate = dayjs();
      const deliveryDate = todayDate.add(deliveryItem.deliveryDays, "days");
      const currentDay = deliveryDate.format("dddd, MMMM D");

      const costPrice =
        deliveryItem.priceCents === 0
          ? "FREE - "
          : `$${priceInCent(deliveryItem.priceCents)} - `;

      const isChecked = deliveryItem.id === checkOutItems.deliveryId;
      priceHTML += `
                <div class="delivery-option js-delivery-option" 
                data-product-id = "${matchingId.id}" 
                  data-delivery-id = "${deliveryItem.id}">
                  <input type="radio"
                  ${isChecked ? "checked" : ""}
                    class="delivery-option-input"
                    name="delivery-option-${matchingId.id}"
                  />
                  <div>
                    <div class="delivery-option-date">${currentDay}</div>
                    <div class="delivery-option-price">${costPrice}Shipping</div>
                  </div> 
                </div>
    `;
    });
    return priceHTML;
  }

  document.querySelector(".js-checkOut-products").innerHTML = checkOutHtml;

  document.querySelectorAll(".js-delete-btn").forEach((delItem) => {
    delItem.addEventListener("click", () => {
      let productId = delItem.dataset.productId;
      deleteFromCart(productId);

      let cartContainer = document.querySelector(
        `.js-cart-container-${productId}`
      );
      cartContainer.remove();
      checkOutBox();
    });
  });

  document.querySelectorAll(".js-update-link").forEach((updateItem) => {
    updateItem.addEventListener("click", () => {
      let productId = updateItem.dataset.productId;
      let cartContainer = document.querySelector(
        `.js-cart-container-${productId}`
      );
      cartContainer.classList.add("is-display-link");
      document
        .querySelector(`.update-quantity-link-${productId}`)
        .classList.add("remove-update-text");
      document
        .querySelector(`.quantity-label-${productId}`)
        .classList.add("remove-update-text");
    });
  });

  // Save Button
  document.querySelectorAll(".save-quantity-link").forEach((saveItems) => {
    let productId = saveItems.dataset.productId;
    let cartContainer = document.querySelector(
      `.js-cart-container-${productId}`
    );
    // click option
    saveItems.addEventListener("click", () => {
      cartContainer.classList.remove("is-display-link");
      document
        .querySelector(`.update-quantity-link-${productId}`)
        .classList.remove("remove-update-text");
      let quantityValue = document.querySelector(
        `.quantity-label-${productId}`
      );
      quantityValue.classList.remove("remove-update-text");

      const qualityInput = document.querySelector(
        `.js-input-quality-${productId}`
      );
      let getQualityInput = Number(qualityInput.value);
      quantityValue.innerHTML = getQualityInput;
      updateCartQuantity(productId, getQualityInput);
      saveCartToStorage();
      validateInput(getQualityInput);
    });
    // enter key option
    cartContainer.addEventListener("keydown", (event) => {
      let quantityValue = document.querySelector(
        `.quantity-label-${productId}`
      );
      const qualityInput = document.querySelector(
        `.js-input-quality-${productId}`
      );
      let getQualityInput = Number(qualityInput.value);
      quantityValue.innerHTML = getQualityInput;
      const removeUpdate = document.querySelector(
        `.update-quantity-link-${productId}`
      );
      if (event.key === "Enter") {
        cartContainer.classList.remove("is-display-link");
        removeUpdate.classList.remove("remove-update-text");
        quantityValue.classList.remove("remove-update-text");
        updateCartQuantity(productId, getQualityInput);
        saveCartToStorage();
        validateInput(getQualityInput);
      }
    });
  });

  // import function saving the input value as new quantity

  function checkOutBox() {
    let checkOutItem = 0;
    cart.forEach((cartItems) => {
      checkOutItem += cartItems.quantity;
    });
    document.querySelector(
      ".js-checkout-items"
    ).innerHTML = `${checkOutItem} items`;
  }
  checkOutBox();

  // validate page

  function validateInput(newQuantity) {
    if (newQuantity < 0 || newQuantity >= 1000) {
      alert("Quantity should be between 0 to 1000");
      return;
    }
  }

  document.querySelectorAll(".js-delivery-option").forEach((deliveryItem) => {
    deliveryItem.addEventListener("click", () => {
      const { productId, deliveryId } = deliveryItem.dataset;
      updateDeliveryOption(productId, deliveryId);
      modifyViewPage();
    });
  });
}
