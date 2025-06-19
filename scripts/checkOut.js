import { modifyViewPage } from "./checkOut/deliveryOrder.js";
import { paymentOrder } from "./checkOut/paymentOrder.js";
import "../data/cart-class.js";

/* import "../data/backend-prac.js"; */
import { generateProducts, generateProductsFetch } from "../data/products.js";

async function renderPages() {
  await generateProductsFetch();

  const pages = new Promise((resolve) => {
    generateProducts(() => {
      resolve("carts");
    });
  });
  modifyViewPage();
  paymentOrder();
}
renderPages();
/* Promise.all([generateProductsFetch]);

generateProducts(() => {
  modifyViewPage();
  paymentOrder();
}); */
