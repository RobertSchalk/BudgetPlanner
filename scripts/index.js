const path = require('path');
const Data = require('../data');
const jsonfile = require('jsonfile');
const Clear = require('./clear');
const Info = require('../info');


var monthlyBills = document.getElementById('monthlyBills');
var extraExpenses = document.getElementById('extraExpenses');
//var income = document.getElementById('income');
var navItem = document.getElementsByClassName('navItem');
var view = document.getElementsByClassName('view');
var incomeList = document.getElementById('incomeList');
//var incomeSubmit = document.getElementById('incomeSubmit');
var incomeType = document.getElementById('incomeType');
var incomeCompany = document.getElementById('incomeCompany');
var incomePay = document.getElementById('incomePay');
var totalIncome = document.getElementById('totalIncome');
var totalSourcesI = document.getElementById('totalSourcesI');

var billList = document.getElementById('billList');
var billType = document.getElementById('billType');
var billCompany = document.getElementById('billCompany');
var billPay = document.getElementById('billPay');
var totalBill = document.getElementById('totalBill');
var totalSourcesB = document.getElementById('totalSourcesB');

var billPercentageInput = document.getElementById('billPercentageInput');
var remainingPercentageInput = document.getElementById('remainingPercentageInput');
var totalRemainingInput = document.getElementById('totalRemainingInput');

var totalIncomeValue = 0;
var totalIncomeInput = 0;
var totalBillValue = 0;
var totalBillInput = 0;


function UpdateIncomeList(){
    incomeList.innerHTML = '';
    jsonfile.readFile(Info.Income, function(err, obj){
        totalIncomeValue = 0;
        if(obj.length !== 0){
            for(var i = 0; i < obj.length; i++){
                let type = obj[i].type;
                let company = obj[i].company;
                let pay = obj[i].pay;
                let newIncome = new Data.Income(type, company, pay);
                let el = newIncome.Print();
                incomeList.appendChild(el);
                totalIncomeValue += parseFloat(obj[i].pay);
            }
        }
        totalIncomeInput = obj.length;
        UpdateTotalIncome();
    });
}

function UpdateBillList(){
    billList.innerHTML = '';
    jsonfile.readFile(Info.Bill, function(err, obj){
        totalBillValue = 0;
        if(obj.length !== 0){
            for(var i=0; i< obj.length; i++){
                let type = obj[i].type;
                let company = obj[i].company;
                let pay = obj[i].pay.toLocaleString();
                let details = obj[i].details;
                let newBill = new Data.Bill(type, company, pay, details);
                let el = newBill.Print();
                billList.appendChild(el);
                totalBillValue += parseFloat(obj[i].pay);
            }
        }
        totalBillInput = obj.length;
        UpdateTotalBill();

    });
}


function UpdateTotalIncome(){
    totalIncome.textContent = totalIncomeValue.toLocaleString();
    totalSourcesI.textContent = totalIncomeInput.toLocaleString();
    UpdatePercentages();
}
function UpdateTotalBill(){
    totalBill.textContent = totalBillValue.toLocaleString();
    totalSourcesB.textContent = totalBillInput.toLocaleString();
    UpdatePercentages();
}
function UpdatePercentages(){
    var totalRemaining = totalIncomeValue - totalBillValue;
    var billPercentage = (totalBillValue / totalIncomeValue) * 100;
    var remainingPercentage = (totalRemaining / totalIncomeValue) * 100;
    
    billPercentageInput.textContent = billPercentage.toFixed(2)+ '%';
    remainingPercentageInput.textContent = remainingPercentage.toFixed(2) + '%';
    totalRemainingInput.textContent = totalRemaining.toLocaleString();
}

function OpenDefaultView(){
    view[0].style.display = 'block';
}

function ChangeView(dataState){
    for(var x = 0; x < view.length; x++){
        if( view[x].getAttribute('data-state') == dataState){
            view[x].style.display = 'block';
        } else{
            view[x].style.display = 'none';
        }
    }
}



function CreateIncome(type, company, pay){
    if(type == '' || company == null || pay == ''){
        alert('Please fill out all boxes before you can submit.')
    }else{
        if(Info.Income == undefined){
            jsonfile.writeFile(Info.Income, '[]', 2);
        }
        let incomeItem = new Data.Income(type, company, pay);
        jsonfile.readFile(Info.Income, function(err, curr){
            curr.push(incomeItem);
            jsonfile.writeFile(Info.Income, curr, function(err){

             },2);
            /* let type = curr[curr.length-1].type;
            let company = curr[curr.length-1].company;
            let pay = curr[curr.length-1].pay;
             
            let newIncome = new Data.Income(type, company, pay);
            let el = newIncome.Print();
            incomeList.appendChild(el);*/
            UpdateIncomeList();
        })
        Clear.Inputs('incomeInput');
    }
}

function CreateBill(type, company, pay, details){
    if(type = '' || company == '' || pay == '' || details == ''){
        alert('Please fill out all boxes before you can submit.');
    } else{
        
        let billItem = new Data.Bill(type, company, pay, details);
        jsonfile.readFile(Info.Bill, function(err, curr){
            curr.push(billItem);
            jsonfile.writeFile(Info.Bill, curr, function(err){
                
            }, 2);
            UpdateBillList();
        });
        Clear.Inputs('billInput');
    }
}



for(var i = 0; i < view.length; i++){
    view[i].setAttribute('data-state', i)
}

for(var i = 0; i < navItem.length; i++){
    navItem[i].setAttribute('data-state', i);
    var dataState = navItem[i].getAttribute('data-state');
    navItem[i].addEventListener('click', function(){
        var dataState = this.getAttribute('data-state');
        ChangeView(dataState);
    }, false);
}



UpdateIncomeList()
UpdateBillList();
OpenDefaultView();




//incomeSubmit.addEventListener('click', CreateIncome, false);

incomeType.addEventListener('keydown', function(e){
    if(e.keyCode == 13){
        incomeCompany.focus();
    }
}, false);
incomeCompany.addEventListener('keydown', function(e){
    if(e.keyCode == 13){
        incomePay.focus();
    }
}, false);
incomePay.addEventListener('keydown', function(e){
    if(e.keyCode == 13){
        CreateIncome(incomeType.value, incomeCompany.value, incomePay.value);
    }
}, false);

billType.addEventListener('keydown', function(e){
    if(e.keyCode == 13){
        billCompany.focus();
    }
}, false);
billCompany.addEventListener('keydown', function(e){
    if(e.keyCode == 13){
        billPay.focus();
    }
}, false);
billPay.addEventListener('keydown', function(e){
    if(e.keyCode == 13){
        billDetails.focus();
    }
}, false);
billDetails.addEventListener('keydown', function(e){
    if(e.keyCode == 13){
        CreateBill(billType.value, billCompany.value, billPay.value, billDetails.value);
    }
}, false);
