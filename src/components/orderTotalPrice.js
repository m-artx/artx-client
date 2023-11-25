// orderTotalPrice.js

function orderTotalPrice(cartProductDetails, selectedItems) {
    let total = 0;
    for (const item of cartProductDetails) {
        if (selectedItems.includes(item.productId)) {
            total += item.productPrice * item.cartProductQuantity;
        }
    }
    return total;
}

export default orderTotalPrice;
