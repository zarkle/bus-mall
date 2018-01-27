'use strict';

//////////////////////////////
// data for test purposes
ItemsOrdered.allItems = [];

function newInstances() {
  new ItemsOrdered('Star Wars Bag', 'img/bag.jpg', 1);
  new ItemsOrdered('Banana Slicer', 'img/banana.jpg', 2);
  new ItemsOrdered('Bathroom Helper', 'img/bathroom.jpg', 3);
}

function ItemsOrdered(productName, filepath, quantity) {
  this.productName = productName;
  this.filepath = filepath;
  this.quantity = quantity;
  ItemsOrdered.allItems.push(this);
}
/////////////////////////

// get from local storage product and quantity
// var productArray = JSON.parse(localStorage.products);
// var quantityArray = parseInt(JSON.parse(localStorage.quantity));

var tableEl = document.getElementById('products-cart');
var formEl = document.getElementById('customer-form');

function renderCart() {
  makeHeaderRow();
  //display each ordered item
  for (var i in ItemsOrdered.allItems) {
    //display quantity
    var trEl = document.createElement('tr');
    var tdEl = document.createElement('td');
    tdEl.textContent = ItemsOrdered.allItems[i].quantity;
    trEl.appendChild(tdEl);

    //display product image and name
    tdEl = document.createElement('td');
    var imgEl = document.createElement('img');
    imgEl.src = ItemsOrdered.allItems[i].filepath; //insert image path
    imgEl.alt = ItemsOrdered.allItems[i].productName; //insert image name
    tdEl.appendChild(imgEl);
    var paragraphEl = document.createElement('p');
    paragraphEl.textContent = ItemsOrdered.allItems[i].productName; //insert image name
    tdEl.appendChild(paragraphEl);
    trEl.appendChild(tdEl);
    //delete item button
    tdEl = document.createElement('td');
    var buttonEl = document.createElement('button');
    //delete button function
    buttonEl.textContent = 'Delete';//make a function instead of just text
    tdEl.appendChild(buttonEl);
    trEl.appendChild(tdEl);
    tableEl.appendChild(trEl);
  }
}

function makeHeaderRow() {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'Quantity';
  trEl.appendChild(thEl);
  thEl = document.createElement('th');
  thEl.textContent = 'Item';
  trEl.appendChild(thEl);
  thEl = document.createElement('th');
  thEl.textContent = 'Remove?';
  trEl.appendChild(thEl);
  tableEl.appendChild(trEl);
}

// delete button function
function buttonHandler(e) {
  e.preventDefault();
  // if click on button only
  if (event.target.nodeName === 'BUTTON') {
    //which product correlates with the button click (its productName)
    var targetEl = event.target.parentNode.previousSibling.innerText;
    // find the product that correlates with the clicked button
    for (var i in ItemsOrdered.allItems) {
      if (targetEl.trim() === ItemsOrdered.allItems[i].productName) {
        // delete that product from the cart (ItemsOrdered.allItems) array
        ItemsOrdered.allItems.splice(i,1);
        tableEl.innerHTML = '';
        renderCart();
      }
    }
  }
}

// form data function
function formData(e) {
  e.preventDefault();

  formEl.reset();
}


tableEl.addEventListener('click', buttonHandler);
formEl.addEventListener('submit', formData);

newInstances();
renderCart();


