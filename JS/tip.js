//Getting Inputs
let billInput = document.querySelector('[data-bill]'); //Get the Bill
let customTipInput = document.querySelector('[data-custom-tip]'); //Get The Custom Tip
let peopleInput = document.querySelector('[data-people]');  //Get The Number of People

//Buttons etc.
let tipButton = document.querySelectorAll('[data-tip-value]');
let resetButton = document.querySelector('[data-reset-button]');
let peopleError = document.querySelector('.people-error');

//Output
let bill = 0;
let tip = 0;
let people = 0;
let tipBtnSel = [];

// Resultsstrings
let tipAmount = document.querySelector('[data-tip-person]');
let totalAmount = document.querySelector('[data-total-person]');

//ResultsNumbers
let resultTipPerson;
let resultTotalPerson;

//Calculate the Tip
function Calculator(){
    if ((bill > 0) && (tip > 0) && (people > 0)){
        resetButton.disabled = false;
        resultTipPerson = ((bill*(tip/100)/people)).toFixed(2);
        resultTotalPerson = (((bill/people)+parseFloat(resultTipPerson))).toFixed(2);
        tipAmount.innerHTML = "$" + resultTipPerson;
        totalAmount.innerHTML = "$" + resultTotalPerson;
    }
}

//Like the name says :D
function removeSelectedClass(){
    tipBtnSel = document.querySelectorAll('.selected');
    tipBtnSel.forEach(function(el) {
        el.classList.remove("selected");
    });
}

//Resets everything
function reset(){
    removeSelectedClass();
    customTipInput.value="";
    billInput.value="";
    peopleInput.value="";
    tipAmount.innerHTML = "0.00";
    totalAmount.innerHTML = "0.00";
    bill = 0;
    tip = 0;
    people = 0;
    tipBtnSel = [];
    resetButton.disabled = true;
}

function main() {
    for (let i = 0; i < tipButton.length; i++) {
        tipButton[i].addEventListener("click", function() {
            removeSelectedClass();
            tipButton[i].classList.add("selected");
            tip = parseInt(tipButton[i].getAttribute("data-tip-value"));
            customTipInput.value="";
            Calculator()
        });
    }

    billInput.addEventListener("keyup", function()    
    {
        bill = parseFloat(billInput.value);
        if (billInput.value>0){
            billInput.classList.remove("invalid");
            billInput.classList.add("valid");
        }else{
            billInput.classList.remove("valid");
            billInput.classList.add("invalid");
        }
        Calculator()
    });

    customTipInput.addEventListener("keyup", function() 
    {
        if (customTipInput.value>0){
            customTipInput.classList.remove("invalid");
            customTipInput.classList.add("valid");
        }
        else
        {
            customTipInput.classList.remove("valid");
            customTipInput.classList.add("invalid");
        }
        
        tip = parseInt(customTipInput.value);
        if (tip > 0){
            removeSelectedClass();
            Calculator()
        }
    });

    peopleInput.addEventListener("keyup", function() 
    {
        people = parseInt(peopleInput.value);
        if (peopleInput.value>0){
            peopleInput.classList.remove("invalid");
            peopleInput.classList.add("valid");
            peopleError.style.display="none";
        }
        else
        {
            peopleInput.classList.remove("valid");
            peopleInput.classList.add("invalid");
            peopleError.style.display="inline-block";
        }
        Calculator()
    });
    
    
    resetButton.addEventListener("click", reset);
}

document.addEventListener("DOMContentLoaded", main);
