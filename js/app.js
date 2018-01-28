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
var buttonEl = document.getElementById('refresh');

var productNames = [];
var productVotes = [];
var productShown = [];
var productPercent = [];

// constructor for Product objects
// properties: name of object, filepath, number of times shown, number of times clicked
function Product(productName, filepath) {
  this.productName = productName;
  this.filepath = filepath;
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

  if (Product.totalClicks > 2) {
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
      productPercent[i] = Math.round((productVotes[i] / productShown[i]) * 100);
    }
  }
}

function showResultsTable() {
  sectionEl.innerHTML = '';
  document.getElementsByTagName('h3')[0].innerHTML = 'Thank you for taking our survey!  Here are your results.';

  // header row
  var tableEl = document.getElementById('results-table');
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'Product';
  trEl.appendChild(thEl);
  thEl = document.createElement('th');
  thEl.textContent = 'Votes';
  trEl.appendChild(thEl);
  thEl = document.createElement('th');
  thEl.textContent = 'Times Shown';
  trEl.appendChild(thEl);
  thEl = document.createElement('th');
  thEl.textContent = 'Percent (%)';
  trEl.appendChild(thEl);
  tableEl.appendChild(trEl);

  // data
  for (var i in productNames) {
    trEl = document.createElement('tr');
    var tdEl = document.createElement('td');
    tdEl.textContent = productNames[i];
    trEl.appendChild(tdEl);
    tdEl = document.createElement('td');
    tdEl.textContent = productVotes[i];
    trEl.appendChild(tdEl);
    tdEl = document.createElement('td');
    tdEl.textContent = productShown[i];
    trEl.appendChild(tdEl);
    tdEl = document.createElement('td');
    tdEl.textContent = productPercent[i];
    trEl.appendChild(tdEl);
    tableEl.appendChild(trEl);
  }
  //display refresh button
  buttonEl.style.visibility = 'visible';
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

// check if data already in local storage
function checkStorage() {
  if (localStorage.products) {
    Product.allProducts = JSON.parse(localStorage.products);
    productNames = JSON.parse(localStorage.productNames);
    randomProduct();
  } else {
    newInstances();
    randomProduct();
  }
}

// create instances of Products
function newInstances() {
  new Product('Star Wars Bag', 'img/bag.jpg');
  new Product('Banana Slicer', 'img/banana.jpg');
  new Product('Bathroom Helper', 'img/bathroom.jpg');
  new Product('Open-Toed Boots', 'img/boots.jpg');
  new Product('All-In-One Breakfast Oven', 'img/breakfast.jpg');
  new Product('Meatball Bubble Gum', 'img/bubblegum.jpg');
  new Product('Red Funky Chair', 'img/chair.jpg');
  new Product('Cthulhu Figurine', 'img/cthulhu.jpg');
  new Product('Dog Duck', 'img/dog-duck.jpg');
  new Product('Dragon Meat', 'img/dragon.jpg');
  new Product('Utensil Pen Topper', 'img/pen.jpg');
  new Product('Pet Sweep', 'img/pet-sweep.jpg');
  new Product('Pizza Scissors', 'img/scissors.jpg');
  new Product('Shark Sleeping Bag', 'img/shark.jpg');
  new Product('Onesie Sweep', 'img/sweep.png');
  new Product('Tauntaun Sleeping Bag', 'img/tauntaun.jpg');
  new Product('Unicorn Meat', 'img/unicorn.jpg');
  new Product('Tentacle USB', 'img/usb.gif');
  new Product('Self Water Can', 'img/water-can.jpg');
  new Product('Wine Glass', 'img/wine-glass.jpg');
}

sectionEl.addEventListener('click', handleClick);
buttonEl.addEventListener('click', function() {window.location.reload(true);});

buttonEl.style.visibility = 'hidden';
checkStorage();