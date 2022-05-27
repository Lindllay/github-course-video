// // Importing module
// import {
//   addToCart,
//   totalPrice as price,
//   totalQuantity,
// } from './shoppingCart.js';

// addToCart('bread', 5);
// console.log(price, qt);
// console.log('Importing module');

// import * as ShoppingCart from './shoppingCart.js'; // Importuje wszystko z shoppingCart.js. Konwencja zakłada nazywanie z dużej litery i camelCase. Utworzony zostaje obiekt, który przechowuje wszystko, co jest exportowane z podanego modułu (ShoppingCart).
// ShoppingCart.addToCart('bread', 5); // teraz te importowane metody i zmiene znajdują się w obiekcie ShoppingCart, który zawiera wszystkie exportowane z shoppingCart metody.
// console.log(ShoppingCart.totalPrice);
// console.log(shippingCost);

import add, { cart } from './shoppingCart.js';
add('bread', 5);
add('pizza', 10);
add('apples', 15);

console.log(cart);

// Top-level await

// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Something');
// // Umożliwia użycie async keyworda poza async funkcją, z pozionu top-level code. Problem w tym, że taki zewnętrzny await blokuje wykonanie całego modułu, dopóki się nie sfetchuje i wykona. Dlatego trzeba dobrze przemyśleć, czy korzystać z tej możliwości

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data);
  return { title: data.at(-1).title, text: data.at(-1).body };
};

// const lastPost = getLastPost(); // W takiej formie zwróci promise, a nie wartość. Bo w momencie, gdy return się wykona, to dane jeszcze nie zostały sfetchowane.
// console.log(lastPost);

// czyli muszę jeszcze to 'rozpakować'. W poprzednim rozdziale robiłem to za pomocą .then, czyli:
// lastPost.then(last => console.log(last));
// Ale jest to "not very clean"
// const lastPost2 = await getLastPost();
// console.log(lastPost2);

// Ważna implikacja używania top level-await. Jest nią fakt, że gdy jeden moduł importuje inny moduł, który posiada top-level await, to importujący moduł będzie czekał na importowany moduł, aż zakończy fetchowanie/blokowanie kodu.

// The module pattern
const ShoppingCart2 = (function () {
  // Przypisuję IIFE do zmiennej, bo z niej będę wywoływał zmienne i metody
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };
  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();
// Wszystkie powyższe dane są prywatne, bo są wewnątrz funkcji. Teraz po prostu muszę zwrocić niektóre dane, aby uzyskać public API. Czyli zwracam obiekt, z danymi, które chcę upublicznić.

// ShoppingCart2.addToCart('apple', 2);
// console.log(ShoppingCart2);
// console.log(ShoppingCart2.shippingCost); // Tego nie zwróciłem z ShoppingCart2, więc nie ma do tego dostępu z zewnątrz - jest to prywatna właściwość

// Czyli, IIFE wykonało się raz, zwróciło to co ma w returnie i przypisało to do ShoppingCart2. I teraz mogę niektórymi właściwościami zwróconego obiektu manipulować za pomocą ShoppingCart.something, ale to something ogranicza się jedynie do właściwości, które zwrócilem. Reszta jest niedostępna. To wszystko działa dzięki closures (muszę to powtórzyć). Closures, pozwalają funkcji na dostęp do wszystkich zmiennych, które były obecne podczas "ich narodzin", czyli w czasie ich utworzenia.

// Ten schemat jest sprawdzony i używany był przed ES6. Problemem jest, że gdyby chcieć jeden moduł na plik, to trzeba by było tworzyć różne skrypty i wszystkie linkować do pliku HTML, co rodzi problemy, jak np. konieczność zachowania odpowiedniej kolejności linkowania, a także posiadanie wszystkich zmiennych "living in the global scope". Oprócz tego nie można by było ich razem zbundlować. Te problemy rozwiązują moduły ES6

// // CommonJS Module
// // Poza ES Modules i module patternem, w przeszłości używane były jeszcze inne systemy modułów. Warto spojrzeć na CommonJS, bo był często używany w przeszłości w Node.js. Konsekwencją tego jest to, że praktycznie wszystkie moduły w npm repository, które moglibyśmy użyć w naszym kodzie, ciągle używają CommonJS module systemu. Powodem tego jest to, że npm był projektowany tak, aby był przeznaczony tylko dla node. Dopiero później npm zostało standardowym repozytorium, z którego może korzystać cały JS. Dlatego ten CommonJS będzie się pojawiał
// // Podobnie jak w ES6 Modules, w CommonJS 1 plik to 1 modul. Exportuje coś z modułu poprzez export.nazwaExportu, np. addToCart:

// // Export
// export.addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} added to cart`);
//   };
// // To nie zadziała w przeglądarce, tylko musiałoby to być w Node.js

// // Import
// const { addToCart } = require('./shoppingCart.js') // nie zadziała, bo require nie jest tu zadeklarowane, ale jest w Node.js, więc tam by zadziałało

// A brief introduction to the Command Line

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 3 },
  ],
  user: { loggedIn: true },
};

const assignClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
console.log(assignClone);
state.user.loggedIn = false;
console.log(stateDeepClone);

// Bundling with Parcel and NPM Scripts

if (module.hot) {
  module.hot.accept();
}

class Person {
  greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}
const jonas = new Person('Jonas');
console.log('Jonas' ?? null);

console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));

import 'core-js/stable';

//Polifilling async functions
import 'regenerator-runtime/runtime';
