import { modifyViewPage } from "./checkOut/deliveryOrder.js";
import { paymentOrder } from "./checkOut/paymentOrder.js";
//import "../data/cart-class.js";

/* import "../data/backend-prac.js"; */
import { generateProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";

async function renderPages() {
  try {
    await Promise.all([generateProductsFetch(), loadCartFetch()]);
  } catch (error) {
    console.log(`${error}`);
  }

  modifyViewPage();
  paymentOrder();
}
renderPages();
/* Promise.all([generateProductsFetch]);

generateProducts(() => {
  modifyViewPage();
  paymentOrder();
}); */
