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

  if (Product.totalClicks > 4) {
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
  // add to local storage
  localStorage.votes = productVotes;
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
  var chartColors = '#264B44';
  var productChart = new Chart(ctx, { //eslint-disable-line
    type: 'horizontalBar',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Votes Per Product',
        data: productVotes,
        backgroundColor: chartColors,
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

sectionEl.addEventListener('click', handleClick);

voteAgain();
randomProduct();

// add persistence with local storage
//check if there is already local storage
//if (localStorage) {} else

// if local storage, then parse info to reuse
  // grab specific storage info
  // parse out into array using split method localStorage.students.split(',');
// else just run code fresh

// check if data already in local storage
function voteAgain() {
  if (localStorage.votes) {
    productVotes = localStorage.votes.split(',');
    console.log('votes', productVotes);
    randomProduct();
  } else {
    productVotes = [];
    // console.log('first');
  }
}


// add setter at end of voting
//localStorage.array = storageArray

// clear local storage, uncomment when running test again
// localStorage.clear();