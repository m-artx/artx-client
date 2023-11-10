// orderTotalPrice.js

function orderTotalPrice(cartItems, selectedItems) {
  let total = 0;
  for (const item of cartItems) {
    if (selectedItems.includes(item.productId)) {
      total += item.productPrice * item.cartProductQuantity;
    }
  }
  return total;
}

export default orderTotalPrice;
