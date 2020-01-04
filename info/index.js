const path = require('path');
const Income = path.join(__dirname, 'income.json')
const Bill = path.join(__dirname, 'bills.json')

module.exports = {
    Income: Income,
    Bill: Bill
}