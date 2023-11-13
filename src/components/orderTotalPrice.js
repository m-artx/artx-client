// orderTotalPrice.js

function orderTotalPrice(cartItemDetails, selectedItems) {
   let total = 0;
   for (const item of cartItemDetails) {
      if (selectedItems.includes(item.productId)) {
         total += item.productPrice * item.cartProductQuantity;
      }
   }
   return total;
}

export default orderTotalPrice;
