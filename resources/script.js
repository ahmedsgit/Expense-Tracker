const balance = document.getElementById('balance');
const incomeMoney = document.getElementById('inc-money');
const expenseMoney = document.getElementById('exp-money');
const list = document.getElementById('list');
const form = document.getElementById('form');
const expenseName = document.getElementById('exp-name');
const amount = document.getElementById('amount');

// dummy array
// const dummyTransaction = [{
//         id: 1,
//         expenseName: 'Monitor',
//         amount: -200
//     },
//     {
//         id: 2,
//         expenseName: 'Laptop',
//         amount: -500
//     },
//     {
//         id: 3,
//         expenseName: 'Mobile',
//         amount: 100
//     },
//     {
//         id: 4,
//         expenseName: 'Phone',
//         amount: 300
//     },
//     {
//         id: 5,
//         expenseName: 'Camera',
//         amount: 120
//     }
// ]

const localStorageTransaction = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ?
    localStorageTransaction : [];

// Add Transaction
function AddTransaction(e) {
    e.preventDefault();
    if (expenseName.value.trim() === '' || amount.value.trim() === '') {
        alert("Please add Expense name and amount first!");
    } else {
        const transaction = {
            id: generateID(),
            expenseName: expenseName.value,
            amount: amount.value
        }

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();

        expenseName.value = '';
        amount.value = '';

    }
}

function generateID() {
    return Math.floor(Math.random() * 10000000000);
}

// Remove Transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();
    init();
}


// Add Transaction in DOM
function addTransactionDOM(transaction) {
    //create li
    const item = document.createElement('li');
    //Add class based on Value
    item.classList.add(transaction.amount > 0 ? 'income' : 'expense');

    item.innerHTML = `
            ${transaction.expenseName}<span>${transaction.amount}</span>
            <button class="delete-btn" onclick="removeTransaction(${transaction.id})">
                <i class="fa fa-window-close" aria-hidden="true"></i>
            </button>
    `;
    list.appendChild(item);
}

// Update the balance,income and expense
function updateValues() {
    const amounts = transactions.map(item => parseInt(item.amount, 10));
    const total = amounts
        .reduce((acc, index) => (acc += index), 0)
        .toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((income, value) => (income += value), 0)
        .toFixed(2);

    const expense = amounts
        .filter(item => item < 0)
        .reduce((income, value) => (income += value), 0)
        .toFixed(2);

    const sign = total > 0 ? '' : '-';
    balance.innerHTML = `${sign}$${Math.abs(total).toFixed(2)}`;
    balance.setAttribute('class', total > 0 ? 'positiveBalance' : 'NegativeBalance');
    incomeMoney.innerHTML = `$${income}`;
    expenseMoney.innerHTML = `$${Math.abs(expense).toFixed(2)}`;
}
//Update localStorage Transaction
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


// init app
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);

    updateValues();
}

init();

form.addEventListener('submit', AddTransaction)