let addTransactionEl = document.getElementById("addTransaction");
let tableBodyEl = document.getElementById("tableBody");
let descriptionEl = document.getElementById("description");
let amountEl = document.getElementById("amount");
let incomeEl = document.getElementById("income");
let balanceEl = document.getElementById("balance");
let expenseMoneyEl = document.getElementById("expenseMoney")



function saveValues() {
    localStorage.setItem("income", incomeEl.textContent)
    localStorage.setItem("expense", expenseMoneyEl.textContent)
    localStorage.setItem("balance", balanceEl.textContent)
}

incomeEl.textContent = localStorage.getItem("income") || "$0.00";
expenseMoneyEl.textContent = localStorage.getItem("expense") || "$0.00";
balanceEl.textContent = localStorage.getItem("balance") || "$0.00";

function incomeCardUpdate() {

    let incomeValue = parseInt(incomeEl.textContent.replace("$", "")) || 0
    let expenseValue = parseInt(expenseMoneyEl.textContent.replace("$", "")) || 0
    let amount = parseInt(amountEl.value)

    if (descriptionEl.value === "Salary") {
        incomeValue += amount;
        incomeEl.textContent = `$${incomeValue}.00`

    }
    else {
        expenseValue += amount;
        expenseMoneyEl.textContent = `$${expenseValue}.00`

    }
    let currentValue = incomeValue - expenseValue
    balanceEl.textContent = `$${currentValue}.00`
    saveValues()
}

function createLocalExpenses() {
    let newExpenses = {
        date: new Date().toLocaleDateString(),
        description: descriptionEl.value,
        amount: parseInt(amountEl.value),
        uniqueNo: Date.now()
    }
    expense.push(newExpenses)
    localStorage.setItem("data", JSON.stringify(expense))
    descriptionEl.value = "";
    amountEl.value = "";
    return newExpenses
}
let jsonObject = localStorage.getItem("data")
let paraseObject = JSON.parse(jsonObject)
let expense = paraseObject || []

function createTableBody(eachExpense) {
    tableBodyEl.innerHTML += `
    <tr>
    <td>${eachExpense.date}</td>
    <td>${eachExpense.description}</td>
    <td>${eachExpense.amount}</td>
    <td><button  class="deleteButton" onclick="deleteExpenses(${eachExpense.uniqueNo})">Clear</button></td>
    </tr>
    `


}

for (let eachExpense of expense) {
    createTableBody(eachExpense)
}




addTransactionEl.addEventListener("submit", function (event) {
    event.preventDefault()
    incomeCardUpdate()
    let newExpenses = createLocalExpenses()
    createTableBody(newExpenses)

})

function deleteExpenses(id) {
    let filterExpenses = expense.filter(function (each) {
        return each.uniqueNo !== id
    })
    expense = filterExpenses
    localStorage.setItem("data", JSON.stringify(expense))
    tableBodyEl.innerHTML = ""

    let incomeTotal = 0
    let expenseTotal = 0

    for (let eachExpense of expense) {

        createTableBody(eachExpense)

        if (eachExpense.description === "Salary") {
            incomeTotal += eachExpense.amount
        } else {
            expenseTotal += eachExpense.amount
        }
    }

    incomeEl.textContent = `$${incomeTotal}.00`
    expenseMoneyEl.textContent = `$${expenseTotal}.00`

    balanceEl.textContent = `$${incomeTotal - expenseTotal}.00`


}

