import { modifyViewPage } from "./checkOut/deliveryOrder.js";
import { paymentOrder } from "./checkOut/paymentOrder.js";
import "../data/cart-class.js";

/* import "../data/backend-prac.js"; */
import { generateProducts } from "../data/products.js";

generateProducts(() => {
  modifyViewPage();
  paymentOrder();
});
