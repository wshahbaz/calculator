//initialize containers
let btn1 = document.querySelector("#one");
let btn2 = document.querySelector("#two");
let btn3 = document.querySelector("#three");
let btn4 = document.querySelector("#four");
let btn5 = document.querySelector("#five");
let btn6 = document.querySelector("#six");
let btn7 = document.querySelector("#seven");
let btn8 = document.querySelector("#eight");
let btn9 = document.querySelector("#nine");

let btnPlus = document.querySelector("#plus");
let btnMinus = document.querySelector("#minus");
let btnMult = document.querySelector("#mult");
let btnDiv = document.querySelector("#div");

let btnCLR = document.querySelector("#CLR");
let btnDec = document.querySelector("#dec");
let btnDEL = document.querySelector("#DEL");

let btnEquate = document.querySelector("#equate");

const display = document.querySelector("#display");

//event listeners
btn1.addEventListener("click", include("1"));
btn2.addEventListener("click", include("2"));
btn3.addEventListener("click", include("3"));
btn4.addEventListener("click", include("4"));
btn5.addEventListener("click", include("5"));
btn6.addEventListener("click", include("6"));
btn7.addEventListener("click", include("7"));
btn8.addEventListener("click", include("8"));
btn9.addEventListener("click", include("9"));

btnPlus.addEventListener("click", include(' + '));
btnMinus.addEventListener("click", include(" - "));
btnMult.addEventListener("click", include(" x "));
btnDiv.addEventListener("click", include(" / "));

btnCLR.addEventListener("click", clearDisp());
btnDec.addEventListener("click", include("."));
btnDEL.addEventListener("click", deleteItem());

btnEquate.addEventListener("click", equate());


//variables
var equation = "";

//add equation to display
var eqnDisp = document.createElement("p");
eqnDisp.classList.add("eqnDisp");
eqnDisp.textContent = "PLEASE DISPLAY";
display.appendChild(eqnDisp);


//functions
function include(value) {
    equation.concat(value);
    updateDisplay();
}

function updateDisplay() {
    eqnDisp.textContent = equation;
}

function clearDisp() {
    equation = "";
    updateDisplay();
}

function deleteItem() {
    equation.pop();
    updateDisplay();
}

function equate() {
    //keep shortening equation string until a single element (ans)
    let terms = equation.split(" ");
    let opIndex = 0;
    let opVal = 0;

    //consider if equation begins with minus sign for negativity
    if (terms[0] == "-") {
        opVal = parseFloat(terms[1]) * -1;
        terms.splice(0,2, String(opVal));
    }

    while (isEquationDone(terms)) {
        //look for multiply
        opIndex = equation.indexOf("x");
        terms = updateEquation(terms, opIndex, "x"); 
        //look for division
        opIndex = equation.indexOf("/");
        terms = updateEquation(terms, opIndex, "/"); 
        //look for subtraction
        opIndex = equation.indexOf("-");
        terms = updateEquation(terms, opIndex, "-"); 
        //look for addition
        opIndex = equation.indexOf("+");
        terms = updateEquation(terms, opIndex, "+"); 
    }
}

function isEquationDone(terms) {
    const leftOverTerms = terms.filter(term => typeof(term) == Number);

    if (leftOverTerms.length == 1)
    {
        equation = leftOverTerms;
        updateDisplay();
        return true;
    }
}

function updateEquation(terms, opIndex, operator)
{
    let resultTerm = 0;
    if (opIndex > 0 && opIndex < terms.length-1) {
        if (operator == "x") {
            resultTerm = parseFloat(terms[opIndex-1]) * parseFloat(terms[opIndex+1]);
        } else if (operator == "/") {
            resultTerm = parseFloat(terms[opIndex-1]) / parseFloat(terms[opIndex+1]);
        } else if (operator == "-") {
            resultTerm = parseFloat(terms[opIndex-1]) - parseFloat(terms[opIndex+1]);
        } else if (operator == "+") {
            resultTerm = parseFloat(terms[opIndex-1]) + parseFloat(terms[opIndex+1])
        }
        terms.splice(opIndex-1, 3, String(resultTerm));
    }
}