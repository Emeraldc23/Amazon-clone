class Cart {
  cartItem;
  cartStorage;

  constructor(storage) {
    this.cartStorage = storage;
    this.logFromStorage();
  }
  logFromStorage() {
    this.cartItem = JSON.parse(localStorage.getItem(this.cartStorage)) || [
      {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        prodName: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        priceCents: 1090,
        quantity: 2,
        deliveryId: "1",
      },
      {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        image: "images/products/intermediate-composite-basketball.jpg",
        prodName: "Intermediate Size Basketball",
        priceCents: 2095,
        quantity: 1,
        deliveryId: "2",
      },
      {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        image: "images/products/intermediate-composite-basketball.jpg",
        prodName: "Intermediate Size Basketball",
        priceCents: 2095,
        quantity: 1,
        deliveryId: "3",
      },
    ];
  }
  saveCartToStorage() {
    localStorage.setItem(this.cartStorage, JSON.stringify(cart));
  }
  loadCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItems) => {
      cartQuantity += cartItems.quantity;
    });

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
    this.saveCartToStorage();
  }
  addCartItems(prodId, prodPrice) {
    let isProductAval;
    cart.forEach((cartItems) => {
      if (prodId === cartItems.id) {
        isProductAval = cartItems;
      }
    });

    const selectQuantity = document.querySelector(`.js-selected-${prodId}`);
    let quantity = Number(selectQuantity.value);

    if (isProductAval) {
      isProductAval.quantity += quantity;
    } else {
      cart.push({
        id: prodId,
        price: `${(prodPrice / 100).toFixed(2)}`,
        quantity,
        deliveryId: "2",
      });
    }
    this.saveCartToStorage();
  }
  deleteFromCart(prodId) {
    let newCart = [];
    cart.forEach((cartItem) => {
      if (cartItem.id !== prodId) {
        newCart.push(cartItem);
      }
    });
    cart = newCart;
    this.saveCartToStorage();
  }
  updateCartQuantity(productId, newQuantity) {
    let matchingId;
    cart.forEach((cartItems) => {
      if (productId === cartItems.id) {
        matchingId = cartItems;
      }
    });
    matchingId.quantity = newQuantity;
    saveCartToStorage();
  }

  updateDeliveryOption(prodId, deliveryOptionId) {
    let matchingId;
    cart.forEach((cartItems) => {
      if (prodId === cartItems.id) {
        matchingId = cartItems;
      }
    });
    matchingId.deliveryId = deliveryOptionId;
    saveCartToStorage();
  }
}

let cart = new Cart("cart-object");

let Bizcart = new Cart("cart-biz");

cart.logFromStorage();

console.log(cart);
console.log(Bizcart);
