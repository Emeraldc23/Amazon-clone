export const cart = [{
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    prodName: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    priceCents: 1090,
    quantity: 2
}, {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "images/products/intermediate-composite-basketball.jpg",
    prodName: "Intermediate Size Basketball",
    priceCents: 2095,
    quantity: 1,
}];

export function addCartItems(prodId, prodPrice){
    let isProductAval;
    cart.forEach(cartItems=>{
        if(prodId === cartItems.id){
            isProductAval = cartItems
        } 
    })

    const selectQuantity = document.querySelector(`.js-selected-${prodId}`);
    let quantity = Number(selectQuantity.value);

    if(isProductAval){
        isProductAval.quantity += quantity;
    } else{
         cart.push(
        {
            id: prodId,
            price: `${(prodPrice / 100).toFixed(2)}`,
            quantity,
        })  
    }

}