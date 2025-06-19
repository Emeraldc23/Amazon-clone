import { cart } from "../../data/cart-class.js";
import { deliveryOptionCost } from "../../data/deliveryOption.js";
import { getProductId } from "../../data/products.js";
import { priceInCent } from "../utility/price.js";
import { generateOrders } from "../../data/orders.js";

export function paymentOrder() {
  let html = "";
  let cost = 0;
  let shippingCost = 0;
  let beforeTaxCost = 0;

  cart.cartItem.forEach((cartItems) => {
    const product = cartItems.id;
    const matchingId = getProductId(product);

    cost += cartItems.quantity * matchingId.priceCents;
    console.log(cartItems);

    const options = deliveryOptionCost(cartItems.deliveryId);

    shippingCost += options.priceCents;
  });
  beforeTaxCost = cost + shippingCost;
  const estimatedTaxCost = beforeTaxCost * 0.1;
  const orderTotalCost = beforeTaxCost + estimatedTaxCost;

  shippingCost = html += `
            <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row ">
            <div class="js-payment-quantity"> ${updateProductQuantity()}:</div>
            <div class="payment-summary-money">${priceInCent(cost)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${priceInCent(
              shippingCost
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${priceInCent(
              beforeTaxCost
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${priceInCent(
              estimatedTaxCost
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${priceInCent(
              orderTotalCost
            )}</div>
          </div>

          <button class="place-order-button button-primary js-order-btn">
            Place your order
          </button>
    `;

  document.querySelector(".js-payment-order").innerHTML = html;

  function updateProductQuantity() {
    let cartQuantity = 0;
    cart.cartItem.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    return `Items (${cartQuantity})`;
  }
  const orderBtn = document.querySelector(".js-order-btn");

  orderBtn.addEventListener("click", async () => {
    try {
      const getResponse = await fetch("https://supersimplebackend.dev/orders", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cart,
        }),
      });
      const order = await getResponse.json();
      generateOrders(order);
      window.location.href = "orders.html";
    } catch (error) {
      console.log(error);
    }
  });
}

document.onload = () => {
  paymentOrder();
};
