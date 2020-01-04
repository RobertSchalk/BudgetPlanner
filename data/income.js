const path = require('path'); // Used for book marks. Joins a path and file location
const jsonfile = require('jsonfile'); // To allow the communication between the .json files.
const uuid= require("uuid"); // Helps create ids for bookmarks.

//handles bookmarks
//creating the Bookmark class
var Income = function (type, company, pay) {
    this.type = type;
    this.company = company;
    this.pay = pay;
}

Income.prototype.Print = function () {
    var tr_tag = document.createElement('tr');
    tr_tag.className = 'incomeRow';
    var cell1 = document.createElement('td');
    cell1.className = 'typeCell';
    cell1.textContent = this.type;
    var cell2 = document.createElement('td');
    cell2.className = 'companyCell';
    cell2.textContent = this.company;
    var cell3 = document.createElement('td');
    cell3.className = 'payCell';
    cell3.textContent = this.pay.toLocaleString();
    tr_tag.appendChild(cell1);
    tr_tag.appendChild(cell2);
    tr_tag.appendChild(cell3);
    return tr_tag;
}



module.exports = Income;
