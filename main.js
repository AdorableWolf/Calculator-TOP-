const displayText = document.querySelector('.display p');
displayText.textContent = '0';
const btns = document.querySelectorAll('button');
let currentText = '0';


//functions to do the calculations.
function add(a, b){
    return a - (-b);
}

function sub(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return (a / b) == Infinity? 'Seriously!' : a / b;
}

function percentage(a){
    return a / 100;
}

function clearDisplay(){
    displayText.textContent = '0';
    currentText = '0';
}

//The logic necessary to process the input in the display box and then call 
//one or more of the above calculation functions. 

function operate(str){
    let index = str.indexOf('+');
    if(index >= 0)
    str = add( operate(str.slice(0, index)), operate(str.slice(index + 1)) );
    else{
        index = str.indexOf('-');
        if(index >= 0)
        str = sub( operate(str.slice(0, index)), operate(str.slice(index + 1)) );
        else{
            index = str.indexOf('x');
            if(index >= 0)
            str = multiply( operate(str.slice(0, index)), operate(str.slice(index + 1)) );
            else{
                index = str.indexOf('%');
                if(index >= 0)
                str = percentage( operate(str.slice(0, index)), operate(str.slice(index + 1)) );
                else{
                    index = str.indexOf('/');
                    if(index >= 0)
                    str = divide( operate(str.slice(0, index)), operate(str.slice(index + 1)) );
                }
            }
        }
    }
    if((1 * str) != NaN) return '' + str;
}

function addText(a){

    if(a == 'Clear') {
    clearDisplay();
    return;
    }

    if(displayText.textContent == 'Not defined')
    clearDisplay();

    if(a == '='){ 
        currentText = displayText.textContent = Math.round(operate(currentText)*1000) / 1000;

        if(displayText.textContent == 'NaN')
            displayText.textContent = 'Seriously!';

        return;
    }else if(a == 'CE'){
              
        if(displayText.textContent.length == 1){
            clearDisplay();
            return;
        }
        else if(displayText.textContent[displayText.textContent.length-1] == ' '){
            displayText.textContent = displayText.textContent.slice(0, displayText.textContent.length -3 );
        }else{
            displayText.textContent = displayText.textContent.slice(0, displayText.textContent.length -1 );
        }
        currentText = currentText.slice(0,currentText.length-1);

        return;
    }else if(['x','÷','+','-'].includes(a))
        displayText.textContent += ' ' + a + ' ';
    else if(currentText == '0'){
        displayText.textContent = a;
    }else{
        displayText.textContent += a;
    }

    if(displayText.textContent != '0')
    currentText += a;

} 

function entry (t){
    let checkIndex = currentText.length -1;
    if(['x','/','+','-','='].includes(t)  && ['x','/','+','-'].includes(currentText[checkIndex]) )
    return;

    if(t == '%' && ['x','/','+','-'].includes(currentText[checkIndex]))
    addText('CE');

    while(['x','/','+','-','.'].includes(currentText[checkIndex]) == false && checkIndex > 0) {
        checkIndex--;
    }
    console.log(currentText);
    if (currentText[checkIndex] == '.' && t == '.')
    return;

    addText(t);
}

btns.forEach( button => {
    button.addEventListener('click', (e) => {
        if(e.screenX != 0)
        entry(e.target.textContent);
    });

});

window.addEventListener('keydown', (e) => {

    if( ['/','+','-','=','%','1','2','3','4','5','6','7','8','9','0','.'].includes(e.key) ){
        entry(e.key);
        console.log(e);
    }

    switch(e.key){
        case '*': entry('x');
        break;

        case 'Enter': entry('=');
        break;

        case 'Escape': entry('Clear');
        break;

        case 'Backspace': entry('CE');
        break;
    }
});