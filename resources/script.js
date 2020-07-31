const balance = document.getElementById('balance');
const incomeMoney = document.getElementById('inc-money');
const expenseMoney = document.getElementById('exp-money');
const list = document.getElementById('list');
const form = document.getElementById('form');
const expenseName = document.getElementById('exp-name');
const amount = document.getElementById('amount');

const dummyTransaction = [{
        id: 1,
        expenseName: 'Monitor',
        amount: -200
    },
    {
        id: 2,
        expenseName: 'Laptop',
        amount: -500
    },
    {
        id: 3,
        expenseName: 'Mobile',
        amount: 100
    },
    {
        id: 4,
        expenseName: 'Phone',
        amount: 300
    },
    {
        id: 5,
        expenseName: 'Camera',
        amount: 120
    }
]

let transactions = dummyTransaction;

function addTransactionDOM(transaction) {
    // get Sign 
    const sign = transaction.amount > 0 ? '+' : '-';

    const item = document.createElement('li');
    //Add class based on Value
    item.classList.add(transaction.amount > 0 ? 'income' : 'expense');

    item.innerHTML = `
            ${transaction.expenseName}<span>${transaction.amount}</span>
            <button class="delete-btn">
                <i class="fa fa-window-close" aria-hidden="true"></i>
            </button>
    `;
    list.appendChild(item);
}

// Update the balance,income and expense
function updateValues() {
    const amounts = transactions.map(item => item.amount);
    const total = amounts.reduce((acc, index) => (acc += index), 0).toFixed(2);
    const income = amounts
        .filter(item => item > 0)
        .reduce((income, value) => (income += value), 0).toFixed(2);
    const expense = amounts
        .filter(item => item < 0)
        .reduce((income, value) => (income += value), 0).toFixed(2);

    const sign = total > 0 ? '' : '-';
    balance.innerHTML = `${sign}$${Math.abs(total).toFixed(2)}`;
    balance.setAttribute('class', total > 0 ? 'positiveBalance' : 'NegativeBalance');
    incomeMoney.innerHTML = `$${income}`;
    expenseMoney.innerHTML = `$${Math.abs(expense).toFixed(2)}`;
}


// init app
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);

    updateValues();
}

init();