//Globals//
'use strict';
let expenseForm = document.getElementById('expenseForm');

let table = document.getElementById('meza');

let expenseArr = [];

// ***Constructor Function****//

function Expense(name, date, amount) {
  this.name = name;
  this.date = date;
  this.amount = amount;

  expenseArr.push(this);
}

function store(){
  let stringifiedExpenses = JSON.stringify(expenseArr);
  localStorage.setItem('Expenses', stringifiedExpenses);
}

function storeParsed(){
  let retrievedExpense = localStorage.getItem('Expenses');
  let parsedExpenses = JSON.parse(retrievedExpense);
}

function renderHeader() {
  let row1 = document.createElement('tr');
  table.appendChild(row1);

  let th1Elem = document.createElement('th');
  th1Elem.textContent = 'Name';
  row1.appendChild(th1Elem);

  let th2Elem = document.createElement('th');
  th2Elem.textContent = 'Date';
  row1.appendChild(th2Elem);

  let th3Elem = document.createElement('th');
  th3Elem.textContent = 'Amount';
  row1.appendChild(th3Elem);

  let th4Elem = document.createElement('th');
  th4Elem.textContent = ' ';
  row1.appendChild(th3Elem);



}


function renderTable() {

  for (let i = 0; i < expenseArr.length; i++) {
    let row2 = document.createElement('tr');
    table.appendChild(row2);

    let td1Elem = document.createElement('td');
    td1Elem.textContent = expenseArr[i].name;
    row2.appendChild(td1Elem);


    let td2Elem = document.createElement('td');
    td2Elem.textContent = expenseArr[i].date;
    row2.appendChild(td2Elem);

    let td3Elem = document.createElement('td');
    td3Elem.textContent = expenseArr[i].amount;
    row2.appendChild(td3Elem);

    let td4Elem = document.createElement('td');
    td4Elem.textContent = 'X';
    td4Elem.id = i;
    row2.appendChild(td4Elem);


  }
}



function handleSubmit(event) {
  event.preventDefault();

  let name = document.getElementById('name').value;
  let date = document.getElementById('date').value;
  let amount = document.getElementById('amount').value;

  new Expense(name, date, amount);
  store();
  table.innerHTML = '';
  renderHeader();

  renderTable();
  expenseForm.reset();

}

expenseForm.addEventListener('submit', handleSubmit);


function deleteRow(event) {

  if (event.target.textContent === 'X') {
    expenseArr.splice(event.target.id, 1);
    table.innerHTML = '';
    renderHeader();
    renderTable();

  }

}

table.addEventListener('click', deleteRow);



