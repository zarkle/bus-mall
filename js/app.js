'use strict';

// array to store all products
Product.allProducts = [];

// constructor for Product objects
// properties: name of object, filepath, number of times shown, number of times clicked, HTML id string
function Product(productName, filepath, htmlId) {
  this.productName = productName;
  this.filepath = filepath;
  this.htmlId = htmlId;
  this.timesProductShown = 0;
  this.productSelectedTally = 0;
  Product.allProducts.push(this);
}

// create instances of Products
new Product('Star Wars Bag', 'img/bag.jpg', 'star-wars-bag');
new Product('Banana Slicer', 'img/banana.jpg', 'banana-slicer');
new Product('Bathroom Helper', 'img/bathroom.jpg', 'bathroom-helper');
new Product('Open-Toed Boots', 'img/boots.jpg', 'boots');
new Product('All-In-One Breakfast Oven', 'img/breakfast.jpg', 'breakfast-oven');
new Product('Meatball Bubble Gum', 'img/bubblegum.jpg', 'bubble-gum');
new Product('Red Funky Chair', 'img/chair.jpg', 'chair');
new Product('Cthulhu Figurine', 'img/cthulhu.jpg', 'cthulhu');
new Product('Dog Duck', 'img/dog-duck.jpg', 'dog-duck');
new Product('Dragon Meat', 'img/dragon.jpg', 'dragon-meat');
new Product('Utensil Pen Topper', 'img/pen.jpg', 'pen-topper');
new Product('Pet Sweep', 'img/pet-sweep.jpg', 'pet-sweep');
new Product('Pizza Scissors', 'img/scissors.jpg', 'pizza-scissors');
new Product('Shark Sleeping Bag', 'img/shark.jpg', 'shark');
new Product('Onesie Sweep', 'img/sweep.png', 'onesie-sweep');
new Product('Tauntaun Sleeping Bag', 'img/tauntaun.jpg', 'tauntaun');
new Product('Unicorn Meat', 'img/unicorn.jpg', 'unicorn-meat');
new Product('Tentacle USB', 'img/usb.gif', 'tentacle-usb');
new Product('Self Water Can', 'img/water-can.jpg', 'water-can');
new Product('Wine Glass', 'img/wine-glass.jpg', 'wine-glass');

// access image elements from DOM
function productTableRender() {
  var i = 0; var j = 1; var k = 2; //index placeholders for testing
  var productTable = document.getElementById('products-table');
  productTable.innerHTML = '';

  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.setAttribute('colspan', '3');
  thEl.textContent = 'Which of the 3 products are you most likely to purchase?';
  trEl.appendChild(thEl);
  productTable.appendChild(trEl);

  trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  var img1 = document.createElement('img');
  img1.setAttribute('id', Product.allProducts[i].htmlId);
  img1.setAttribute('src', Product.allProducts[i].filepath);
  img1.setAttribute('alt', Product.allProducts[i].productName);
  var pEl = document.createElement('p');
  pEl.textContent = Product.allProducts[i].productName;
  tdEl.appendChild(img1);
  tdEl.appendChild(pEl);
  trEl.appendChild(tdEl);

  //second product
  tdEl = document.createElement('td');
  var img2 = document.createElement('img');
  img2.setAttribute('id', Product.allProducts[k].htmlId);
  img2.setAttribute('src', Product.allProducts[k].filepath);
  img2.setAttribute('alt', Product.allProducts[k].productName);
  pEl = document.createElement('p');
  pEl.textContent = Product.allProducts[k].productName;
  tdEl.appendChild(img2);
  tdEl.appendChild(pEl);
  trEl.appendChild(tdEl);
  //third product
  tdEl = document.createElement('td');
  var img3 = document.createElement('img');
  img3.setAttribute('id', Product.allProducts[j].htmlId);
  img3.setAttribute('src', Product.allProducts[j].filepath);
  img3.setAttribute('alt', Product.allProducts[j].productName);
  pEl = document.createElement('p');
  pEl.textContent = Product.allProducts[j].productName;
  tdEl.appendChild(img3);
  tdEl.appendChild(pEl);
  trEl.appendChild(tdEl);
  // append row of 3 products to table
  productTable.appendChild(trEl);
}

// // access image element from DOM
// var img1El = document.getElementById(Product.allProducts[i].htmlId);
// console.log(img1El, Product.allProducts[i].htmlId);
// // add event listener on the images
// img1El.addEventListener('click', nextProductSet);

// // callback function for the event listener to display 3 more items
// // track number times image is displayed 
// // track number of clicks on image
// function nextProductSet() {
//   var i = 4; j = 5; k = 6;
//   productTableRender();
// }

// // invoke callback on page load to display first 3 images
// // make sure images were not immediately previously displayed

// // after 25 selections, turn off event listener and display products and votes received -- display on new page? display item or just name with results?

// function randomProduct() {
//   var randomIndex = Math.floor(Math.random() * Product.allProducts.length);
// }

productTableRender();