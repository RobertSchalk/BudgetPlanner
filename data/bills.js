const path = require('path'); // Used for book marks. Joins a path and file location
const jsonfile = require('jsonfile'); // To allow the communication between the .json files.
const uuid= require("uuid"); // Helps create ids for bookmarks.

//handles bookmarks
//creating the Bookmark class
var Bill = function (type, company, pay, details) {
    this.type = type;
    this.company = company;
    this.pay = pay;
    this.details = details;
}

Bill.prototype.Print = function () {
    var tr_tag = document.createElement('tr');
    tr_tag.className = 'billRow';
    var cell1 = document.createElement('td');
    cell1.className = 'typeCell';
    cell1.textContent = this.type;
    var cell2 = document.createElement('td');
    cell2.className = 'companyCell';
    cell2.textContent = this.company;
    var cell3 = document.createElement('td');
    cell3.className = 'payCell';
    cell3.textContent = this.pay.toLocaleString();
    var cell4 = document.createElement('td');
    cell4.className = 'detailsCell';
    tr_tag.appendChild(cell1);
    tr_tag.appendChild(cell2);
    tr_tag.appendChild(cell3);
    tr_tag.appendChild(cell4);
    return tr_tag;
}

module.exports = Bill;