'use strict';

// array to store all products
Product.allProducts = [];
// total clicks
Product.totalClicks = 0;
// track previously displayed products
Product.lastDisplayed = [];

// access elements from DOM
var sectionEl = document.getElementById('products-section');
var img1El = document.getElementById('img1');
var img2El = document.getElementById('img2');
var img3El = document.getElementById('img3');

var productNames = [];
var productVotes = [];
var productShown = [];
var productPercent = [];

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
    votes();
    totalProductShown();
    votePercent();
    localStorage.setItem('products', JSON.stringify(Product.allProducts));
    localStorage.setItem('productNames', JSON.stringify(productNames));
    showResultsTable();
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

function totalProductShown() {
  for (var i in Product.allProducts) {
    productShown[i] = Product.allProducts[i].timesProductShown;
  }
}

//percentage of times that an item was clicked when it was shown
function votePercent() {
  for (var i in Product.allProducts) {
    if (Product.allProducts[i].timesProductShown === 0) {
      productPercent[i] = 'N/A';
    } else {
      productPercent[i] = Math.floor((productVotes[i] / productShown[i]) * 100);
    }
  }
}

function showResultsTable() {
  sectionEl.innerHTML = '';
  document.getElementById('h3').innerHTML = 'Results';

  var tableEl = document.getElementById('results-table');
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'Product';
  trEl.appendChild(thEl);
  thEl = document.createElement('th');
  thEl.textContent = 'Views';
  trEl.appendChild(thEl);
  thEl = document.createElement('th');
  thEl.textContent = 'Clicks';
  trEl.appendChild(thEl);
  thEl = document.createElement('th');
  thEl.textContent = 'Percent (%)';
  trEl.appendChild(thEl);
  tableEl.appendChild(trEl);

  for (var i in productNames) {
    trEl = document.createElement('tr');
    var tdEl = document.createElement('td');
    tdEl.textContent = productNames[i];
    trEl.appendChild(tdEl);
    tdEl = document.createElement('td');
    tdEl.textContent = productShown[i];
    trEl.appendChild(tdEl);
    tdEl = document.createElement('td');
    tdEl.textContent = productVotes[i];
    trEl.appendChild(tdEl);
    tdEl = document.createElement('td');
    tdEl.textContent = productPercent[i];
    trEl.appendChild(tdEl);
    tableEl.appendChild(trEl);
  }
}

// make chart from results
function renderChart() {
  var ctx = document.getElementById('chart').getContext('2d');
  //make variables for 2 bars
  var votesData = {
    label: 'Votes',
    data: productVotes,
    backgroundColor: '#E9B000',
  };

  var shownData = {
    label: 'Times Shown',
    data: productShown,
    backgroundColor: '#E24E42',
  };

  var productData = {
    labels: productNames,
    datasets: [votesData, shownData]
  };

  var productChart = new Chart(ctx, { //eslint-disable-line
    type: 'horizontalBar',
    data: productData,
    // responsive: false,
    options: {
      scales: {
        xAxes: [{
          barPercentage: 1,
          categoryPercentage: .6
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

// create instances of Products
function newInstances() {
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
}

function checkStorage() {
  // check if data already in local storage
  if (localStorage.products) {
    Product.allProducts = JSON.parse(localStorage.products);
    productNames = JSON.parse(localStorage.productNames);
    randomProduct();
  } else {
    newInstances();
    randomProduct();
    console.log('first');
  }
}

sectionEl.addEventListener('click', handleClick);

checkStorage();