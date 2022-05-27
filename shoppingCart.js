// Exporting module
// console.log('Exporting module');

// Blocking code
// console.log('Start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finish fetching users');

const shippingCost = 10;
export const cart = [];

// shippingCost and   cart are scoped to current module, so we can only use them here.
// gdybym chciał użyć ich w script.js module, musiałbym użyć exports. W ES Modules są 2 typy exports: named exports and default exports.

// named export jest prostszy, wystarczy przed kodem, który chcę exportować, napisać export, jak poniżej:
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as qt }; // mogę exportować wiele rzeczy na raz, w taki sposób.

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
