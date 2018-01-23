'use strict';

// array to store all products
Product.allProducts = [];
// total clicks
Product.totalClicks = 0;
// track previously displayed products
Product.lastDisplayed = [];

// access elements from DOM
var sectionEl = document.getElementById('products-section');
var ulEl = document.getElementById('results');
var img1El = document.getElementById('img1');
var img2El = document.getElementById('img2');
var img3El = document.getElementById('img3');

var productNames = [];

var productVotes = [];

// constructor for Product objects
// properties: name of object, filepath, number of times shown, number of times clicked, HTML id string
function Product(productName, filepath, htmlId) {
  this.productName = productName;
  this.filepath = filepath;
  this.htmlId = htmlId;
  this.timesProductShown = 0;
  this.productSelectedTally = 0;
  Product.allProducts.push(this);
  productNames.push(this.productName);
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

function randomIndex() {
  var randomIndex = Math.floor(Math.random() * Product.allProducts.length);
  return randomIndex;
}

function randomProduct() {
  var i = randomIndex();
  var j = randomIndex();
  var k = randomIndex();

  while (i === j || j === k || i === k || Product.lastDisplayed.includes(i) || Product.lastDisplayed.includes(j) || Product.lastDisplayed.includes(k)) {
    i = randomIndex();
    j = randomIndex();
    k = randomIndex();
  }
  img1El.src = Product.allProducts[i].filepath;
  img1El.alt = Product.allProducts[i].productName;
  img2El.src = Product.allProducts[k].filepath;
  img2El.alt = Product.allProducts[k].productName;
  img3El.src = Product.allProducts[j].filepath;
  img3El.alt = Product.allProducts[j].productName;

  Product.allProducts[i].timesProductShown++;
  Product.allProducts[j].timesProductShown++;
  Product.allProducts[k].timesProductShown++;

  Product.lastDisplayed[0] = i;
  Product.lastDisplayed[1] = j;
  Product.lastDisplayed[2] = k;
}

function handleClick(e) {
  Product.totalClicks++;

  for (var i in Product.allProducts) {
    if (e.target.alt === Product.allProducts[i].productName) {
      Product.allProducts[i].productSelectedTally++;
    }
  }

  if (Product.totalClicks > 24) {
    sectionEl.removeEventListener('click', handleClick);
    img1El.src = '';
    img2El.src = '';
    img3El.src = '';
    img1El.alt = '';
    img2El.alt = '';
    img3El.alt = '';
    showResults();
    votes();
    renderChart();
  } else {
    randomProduct();
  }
}

function votes() {
  for (var i in Product.allProducts) {
    productVotes[i] = Product.allProducts[i].productSelectedTally;
  }
}

function showResults() {
  for (var i in Product.allProducts) {
    var liEl = document.createElement('li');
    liEl.textContent = Product.allProducts[i].productName + ' has ' + Product.allProducts[i].productSelectedTally + ' votes and was presented ' + Product.allProducts[i].timesProductShown + ' times.';
    ulEl.appendChild(liEl);
  }
}

// make chart from results
function renderChart() {
  var ctx = document.getElementById('chart').getContext('2d');
  var chartColors = ['#555555'];
  var productChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Votes Per Product',
        data: productVotes,
        backgroundColors: chartColors,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          tickets: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

sectionEl.addEventListener('click', handleClick);

randomProduct();


// function productTableRender() {
  
//   //first product
//   trEl = document.createElement('tr');
//   var tdEl = document.createElement('td');
//   var img1 = document.createElement('img');
//   img1.setAttribute('id', Product.allProducts[i].htmlId);
//   // event listener
//   img1.addEventListener('click', nextProductSet);
//   var pEl = document.createElement('p');
//   pEl.textContent = Product.allProducts[i].productName;
//   tdEl.appendChild(img1);
//   tdEl.appendChild(pEl);
//   trEl.appendChild(tdEl);

//   //second product
//   tdEl = document.createElement('td');
//   var img2 = document.createElement('img');
//   img2.setAttribute('id', Product.allProducts[k].htmlId);
//   img2.addEventListener('click', nextProductSet);
//   pEl = document.createElement('p');
//   pEl.textContent = Product.allProducts[k].productName;
//   tdEl.appendChild(img2);
//   tdEl.appendChild(pEl);
//   trEl.appendChild(tdEl);
//   //third product
//   tdEl = document.createElement('td');
//   var img3 = document.createElement('img');
//   img3.setAttribute('id', Product.allProducts[j].htmlId);
//   img3.addEventListener('click', nextProductSet);
//   pEl = document.createElement('p');
//   pEl.textContent = Product.allProducts[j].productName;
//   tdEl.appendChild(img3);
//   tdEl.appendChild(pEl);
//   trEl.appendChild(tdEl);
//   // append row of 3 products to table
//   productTable.appendChild(trEl);
// }


// // callback function for the event listener to display 3 more items
// // track number times image is displayed
// // track number of clicks on image
// function nextProductSet() {
//   Product.totalClicks++;
//   if (Product.totalClicks < 5) {//change to 25 before submit
//     i = randomProduct();
//     j = randomProduct();
//     k = randomProduct();
//     productTableRender();
//   }
//   else {
//     renderResultsTable();
//   }
// }

// function renderResultsTable() {
//   productTable.innerHTML = '';
//   resultsTable.innerHTML = '';

//   //header row
//   var trEl = document.createElement('tr');
//   var thEl = document.createElement('th');
//   thEl.setAttribute('colspan', '2');
//   thEl.textContent = 'Results';
//   trEl.appendChild(thEl);
//   resultsTable.appendChild(trEl);

//   trEl = document.createElement('tr');
//   thEl = document.createElement('th');
//   thEl.textContent = 'Product';
//   trEl.appendChild(thEl);
//   thEl = document.createElement('th');
//   thEl.textContent = 'Results';
//   trEl.appendChild(thEl);
//   resultsTable.appendChild(trEl);

//   //product row
//   for (var i in Product.allProducts.length) {
//     trEl = document.createElement('tr');
//     var tdEl = document.createElement('td');
//     tdEl.textContent = Product.allProducts[i].productName;
//     tdEl = document.createElement('td');
//     tdEl.textContent = Product.allProducts[i].timesProductShown;
//     tdEl.textContent = Product.allProducts[i].productSelectedTally;
//     trEl.appendChild(tdEl);
//     resultsTable.appendChild(trEl);
//   }
// }

// // invoke callback on page load to display first 3 images
// // make sure images were not immediately previously displayed

// // after 25 selections, turn off event listener and display products and votes received -- display on new page? display item or just name with results?

// productTableRender();

// // IndexArray = [];
// //get index1, add # to IndexArray
// //get index2
// // if index2 !== IndexArray, then render cell, add # to IndexArray
// // else get index2 again and repeat
// //get index3
// // if index3 !== IndexArray, then render cell, add # to IndexArray
// // else get index 3 again and repeat

// // after click (next 3 products)
// // get index1
// // if index1 !== IndexArray, then render cell & add index # into IndexArray
// // else get index1 again and repeat
// // repeat for index2 and index3, adding #s to IndexArray

// //after click
// //remove first 3 elements in IndexArray
// //repeat "after click" steps