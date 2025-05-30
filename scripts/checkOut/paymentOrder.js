import { cart } from "../../data/cart.js";
import { deliveryOptionCost } from "../../data/deliveryOption.js";
import { getProductId, products } from "../../data/products.js";
import { priceInCent } from "../utility/price.js";

export function paymentOrder() {
  let html = "";
  let cost = 0;
  let shippingCost = 0;
  let beforeTaxCost = 0;
  cart.forEach((cartItem) => {
    const matchingId = getProductId(cartItem.id);

    cost += cartItem.quantity * matchingId.priceCents;

    const options = deliveryOptionCost(cartItem.deliveryId);

    shippingCost += options.priceCents;
  });
  beforeTaxCost = cost + shippingCost;
  console.log(beforeTaxCost);
  const estimatedTaxCost = beforeTaxCost * 0.1;
  console.log(estimatedTaxCost.toFixed(2));
  const orderTotalCost = beforeTaxCost + estimatedTaxCost;
  console.log(orderTotalCost);

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
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    return `Items (${cartQuantity})`;
  }
}
paymentOrder();
