const orders = JSON.parse(localStorage.getItem("order")) || [];

export function generateOrders(order) {
  orders.unshift(order);
  console.log(saveCartToStorage);

  saveCartToStorage();
}

function saveCartToStorage() {
  localStorage.setItem("order", JSON.stringify(orders));
}
