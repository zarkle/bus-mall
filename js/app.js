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
var productTable = document.getElementById('products-table');

var trEl = document.createElement('tr');
var thEl = document.createElement('th');
thEl.textContent = 'Which of the 3 products are you most likely to purchase?';
trEl.appendChild(thEl);
productTable.appendChild(trEl);

var i = 0; var j = 1; var k = 2; //index placeholders for testing
trEl = document.createElement('tr');
var tdEl = document.createElement('td');
var imgEl = document.createElement('img');
imgEl.setAttribute('id', Product.allProducts[i].htmlId);
imgEl.setAttribute('src', Product.allProducts[i].filepath);
imgEl.setAttribute('alt', Product.allProducts[i].productName);
var pEl = document.createElement('p');
pEl.textContent = Product.allProducts[i].productName;
tdEl.appendChild(imgEl);
tdEl.appendChild(pEl);
trEl.appendChild(tdEl);
tdEl = document.createElement('td');
imgEl = document.createElement('img');
imgEl.setAttribute('id', Product.allProducts[k].htmlId);
imgEl.setAttribute('src', Product.allProducts[k].filepath);
imgEl.setAttribute('alt', Product.allProducts[k].productName);
pEl = document.createElement('p');
pEl.textContent = Product.allProducts[k].productName;
tdEl.appendChild(imgEl);
tdEl.appendChild(pEl);
trEl.appendChild(tdEl);

tdEl = document.createElement('td');
imgEl = document.createElement('img');
imgEl.setAttribute('id', Product.allProducts[j].htmlId);
imgEl.setAttribute('src', Product.allProducts[j].filepath);
imgEl.setAttribute('alt', Product.allProducts[j].productName);
pEl = document.createElement('p');
pEl.textContent = Product.allProducts[j].productName;
tdEl.appendChild(imgEl);
tdEl.appendChild(pEl);
trEl.appendChild(tdEl);

productTable.appendChild(trEl);


// add event listener on the images

// callback function for the event listener to display 3 more items
// track number times image is displayed 
// track number of clicks on image

// invoke callback on page load to display first 3 images
// make sure images were not immediately previously displayed

// after 25 selections, turn off event listener and display products and votes received -- display on new page? display item or just name with results?