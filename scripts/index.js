const path = require('path');
const Data = require('../data');
const jsonfile = require('jsonfile');
const Clear = require('./clear');
const Info = require('../info');


var navItem = document.getElementsByClassName('navItem');
var view = document.getElementsByClassName('view');
var deleteConfirmation = document.getElementById('deleteConfirmation');
var deleteOKButton = document.getElementById('deleteOKButton');

//Income section variables
var incomeList = document.getElementById('incomeList');
var incomeType = document.getElementById('incomeType');
var incomeCompany = document.getElementById('incomeCompany');
var incomePay = document.getElementById('incomePay');
var totalIncome = document.getElementById('totalIncome');
var totalSourcesI = document.getElementById('totalSourcesI');

//Bill section variables
var billList = document.getElementById('billList');
var billType = document.getElementById('billType');
var billCompany = document.getElementById('billCompany');
var billPay = document.getElementById('billPay');
var totalBill = document.getElementById('totalBill');
var totalSourcesB = document.getElementById('totalSourcesB');

//Percentages
var billPercentageInput = document.getElementById('billPercentageInput');
var remainingPercentageInput = document.getElementById('remainingPercentageInput');
var totalRemainingInput = document.getElementById('totalRemainingInput');

//global variables
var totalIncomeValue = 0;
var totalIncomeInput = 0;
var totalBillValue = 0;
var totalBillInput = 0;





//This is to update the income list.
function UpdateIncomeList(){
    incomeList.innerHTML = '';
    jsonfile.readFile(Info.Income, function(err, obj){
        totalIncomeValue = 0;
       // if(obj.length !== 0){
            for(var i = 0; i < obj.length; i++){
                let type = obj[i].type;
                let company = obj[i].company;
                let pay = obj[i].pay;
                let newIncome = new Data.Income(type, company, pay);
                let el = newIncome.Print(i);
                incomeList.appendChild(el);
                totalIncomeValue += parseFloat(obj[i].pay);
            }
      //  }
        totalIncomeInput = obj.length;
    });
}
//This is to update the bill list.
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
                let el = newBill.Print(i);
                billList.appendChild(el);
                totalBillValue += parseFloat(obj[i].pay);
            }
        }
        totalBillInput = obj.length;

    });
}

//For updating information on the Dashboard.
function UpdateInformation(){
    UpdateIncomeList()
    UpdateBillList()
    totalIncome.textContent = totalIncomeValue.toLocaleString();
    totalSourcesI.textContent = totalIncomeInput.toLocaleString();
    totalBill.textContent = totalBillValue.toLocaleString();
    totalSourcesB.textContent = totalBillInput.toLocaleString();
    var totalRemaining = totalIncomeValue - totalBillValue;
    if(totalIncomeValue != 0){
    var billPercentage = (totalBillValue / totalIncomeValue) * 100;
    var remainingPercentage = (totalRemaining / totalIncomeValue) * 100;
    billPercentageInput.textContent = billPercentage.toFixed(2)+ '%';
    remainingPercentageInput.textContent = remainingPercentage.toFixed(2) + '%';
    } else{
        billPercentageInput.textContent = 0;
        remainingPercentageInput.textContent = 0;
    }
    totalRemainingInput.textContent = totalRemaining.toLocaleString();
}
//Opens the default view - The dashboard. This is only ran once.
function OpenDefaultView(){
    view[0].style.display = 'block';
}

//This allows you to move through the views with the navigation bar.
//Using custom data-state attribute to help sync views and navItems.
function ChangeView(dataState){
    for(var x = 0; x < view.length; x++){
        if( view[x].getAttribute('data-state') == dataState){
            view[x].style.display = 'block';
        } else{
            view[x].style.display = 'none';
        }
    }
}


//This accepts input from the income form and puts it in the income.JSON file.
//It will then call on the appropriate update function.
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
            UpdateInformation();
        })
        Clear.Inputs('incomeInput');
    }
}
//This function does the same as the previous function, but with bills.
function CreateBill(type, company, pay, details){
    if(type = '' || company == '' || pay == '' || details == ''){
        alert('Please fill out all boxes before you can submit.');
    } else{
        
        let billItem = new Data.Bill(type, company, pay, details);
        jsonfile.readFile(Info.Bill, function(err, curr){
            curr.push(billItem);
            jsonfile.writeFile(Info.Bill, curr, function(err){
                
            }, 2);
            UpdateInformation();
        });
        Clear.Inputs('billInput');
    }
}





function DeleteItem(e, index){
    console.log(index);
    if(e.includes('IncomeValue')){
        var deleteIncomeButton = document.getElementsByClassName('deleteIncomeButton');
        console.log('test pass for input');
        var tempArray = [];
        jsonfile.readFile(Info.Income, function(err, obj){
            
            if(obj.length !== 0){
                for(var i = 0; i < obj.length; i++){
                    if(i != index){
                    let type = obj[i].type;
                    let company = obj[i].company;
                    let pay = obj[i].pay;
                    tempArray.push(obj[i]);
                    console.log(i + ' ' + index);
                    }
                }
            }
            console.log(tempArray);
                    jsonfile.writeFileSync(Info.Income, tempArray, function(err){
        
                     },2);
        });

    }
    if(e.includes('BillsValue')){
        var deleteBillButton = document.getElementsByClassName('deleteBillButton');
        console.log('test pass for input');
        var tempArray = [];
        jsonfile.readFile(Info.Bill, function(err, obj){
            
            if(obj.length !== 0){
                for(var i = 0; i < obj.length; i++){
                    if(i != index){
                    let type = obj[i].type;
                    let company = obj[i].company;
                    let pay = obj[i].pay;
                    tempArray.push(obj[i]);
                    console.log(i + ' ' + index);
                    }
                }
            }
            console.log(tempArray);
                    jsonfile.writeFileSync(Info.Bill, tempArray, function(err){
        
                     },2);
        });

    }
    
    UpdateInformation();
    DisplayDeleteConfirmation();
}

function DisplayDeleteConfirmation(){
    
        deleteConfirmation.style.display = 'flex';
    
}
function HideDeleteConfirmation(){
    UpdateInformation();
    deleteConfirmation.style.display = 'none';
}


//Calling start-up functions.
UpdateInformation();
OpenDefaultView();




//incomeSubmit.addEventListener('click', CreateIncome, false);


//This assigns data-state numbers to the navigation and views. This is put in place to dynamically assign numbers
//instead of manually assigning numbers.
for(var i = 0; i < view.length; i++){
    view[i].setAttribute('data-state', i)
}

for(var i = 0; i < navItem.length; i++){
    navItem[i].setAttribute('data-state', i);
    var dataState = navItem[i].getAttribute('data-state');
    navItem[i].addEventListener('click', function(){
        var dataState = this.getAttribute('data-state');
        ChangeView(dataState);
        UpdateInformation();
    }, false);
}

window.onclick = function(e){
    var itemClass = e.srcElement.className;
    var index = e.srcElement.getAttribute('index');
    this.console.log(e.srcElement.getAttribute('index'))
  //  console.log(this.className);

    if(itemClass.includes('delete')){
        DeleteItem(itemClass, index);
    }
}

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

deleteOKButton.addEventListener('click', HideDeleteConfirmation);