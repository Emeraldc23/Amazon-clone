import { cart } from "../../data/cart-class.js";
import { deliveryOptionCost } from "../../data/deliveryOption.js";
import { getProductId } from "../../data/products.js";
import { priceInCent } from "../utility/price.js";

export function paymentOrder() {
  let html = "";
  let cost = 0;
  let shippingCost = 0;
  let beforeTaxCost = 0;

  cart.cartItem.forEach((cartItems) => {
    const matchingId = getProductId(cartItems.id);

    cost += cartItems.quantity * matchingId.priceCents;

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

          <button class="place-order-button button-primary">
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
}
paymentOrder();
