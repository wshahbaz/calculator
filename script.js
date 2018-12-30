//initialize containers
let btn1 = document.getElementById("one");
let btn2 = document.getElementById("two");
let btn3 = document.getElementById("three");
let btn4 = document.getElementById("four");
let btn5 = document.getElementById("five");
let btn6 = document.getElementById("six");
let btn7 = document.getElementById("seven");
let btn8 = document.getElementById("eight");
let btn9 = document.getElementById("nine");
let btn0 = document.getElementById("zero");

let btnPlus = document.getElementById("plus");
let btnMinus = document.getElementById("minus");
let btnMult = document.getElementById("mult");
let btnDiv = document.getElementById("div");

let btnCLR = document.getElementById("CLR");
let btnDec = document.getElementById("dec");
let btnDEL = document.getElementById("DEL");

let btnEquate = document.getElementById("equate");

const display = document.getElementById("display");

//event listeners
btn1.addEventListener("click", function() {
  include("1");
});
btn2.addEventListener("click", function() {
  include("2");
});
btn3.addEventListener("click", function() {
  include("3");
});
btn4.addEventListener("click", function() {
  include("4");
});
btn5.addEventListener("click", function() {
  include("5");
});
btn6.addEventListener("click", function() {
  include("6");
});
btn7.addEventListener("click", function() {
  include("7");
});
btn8.addEventListener("click", function() {
  include("8");
});
btn9.addEventListener("click", function() {
  include("9");
});
btn0.addEventListener("click", function() {
    include("0");
});

btnPlus.addEventListener("click", function() {
  include(' + ')
});
btnMinus.addEventListener("click", function() {
  include(" - ");
});
btnMult.addEventListener("click", function() {
  include(" x ");
});
btnDiv.addEventListener("click", function() {
  include(" / ");
});

btnCLR.addEventListener("click", clearDisp);
btnDec.addEventListener("click", function() {
    include(".")
  });
btnDEL.addEventListener("click", deleteItem);

btnEquate.addEventListener("click", equate);


//variables
var equation = "= ";

//add equation to display
var eqnDisp = document.createElement("p");
eqnDisp.classList.add("eqnDisp");
eqnDisp.textContent = "PLEASE DISPLAY";
display.appendChild(eqnDisp);


//functions
function include(value) {
    equation += value;
    updateDisplay();
}

function updateDisplay() {
    eqnDisp.textContent = equation;
}

function clearDisp() {
    equation = "= ";
    updateDisplay();
}

 function deleteItem() {
    if (equation.length > 1) {
        equation = equation.slice(0, equation.length-1);
    }
    updateDisplay();
}


function equate() {
    //keep shortening equation string until a single element (ans)
    let terms = equation.replace("  ", " ");
    terms = terms.split(" ");
    let opIndex = 0;
    let opVal = 0;

    //consider if equation begins with minus sign for negativity
    if (terms[1] == "-") {
        opVal = parseFloat(terms[2]) * -1;
        terms.splice(1,2, String(opVal));
    }

    while (!isEquationDone(terms)) {
        //look for multiply
        opIndex = terms.indexOf("x");
        terms = updateEquation(terms, opIndex, "x"); 
        //look for division
        opIndex = terms.indexOf("/");
        terms = updateEquation(terms, opIndex, "/"); 
        //look for subtraction
        opIndex = terms.indexOf("-");
        terms = updateEquation(terms, opIndex, "-"); 
        //look for addition
        opIndex = terms.indexOf("+");
        terms = updateEquation(terms, opIndex, "+"); 
    }
}

function isEquationDone(terms) {
    const leftOverTerms = terms.filter(isNumber);
   // leftOverTerms = terms.filter(isNotEmpty);

    if (leftOverTerms.length == 1)
    {
        equation = leftOverTerms;
        equation = Math.round(equation * 1E5) / 1E5;
        updateDisplay();
        return true;
    }
}

function isNumber(value) {

    if (parseFloat(value)) {
        return true;
    }
    return false;
}

/*
function isNotEmpty(value) {
    if (value == "") {
        return false;
    }
    return true;
}
*/

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
    return terms;
} 