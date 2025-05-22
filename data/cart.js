export const cart = [];

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