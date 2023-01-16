//Important convention:
//ids of text/paragraphs in the illustration of card = id of form + "InCard"
//ids of the errors message (<p> elements) = id of form + "Err"
//(this is used along the code to, given the id in the form, find the id in card 
//or the id of the error message)

// some global constants and objects

let defaultValues = {}; // store defult values
const cardNumberSpaces = [4,9,14]; // space effect in card number

// initial set up, add event listeners and collect default values (from HTML)

window.addEventListener('DOMContentLoaded', (event)=> {


    const entryInputs = document.getElementsByClassName('entry-input');
    for (const entryInput of entryInputs) {
        entryInput.addEventListener('focus', entryFocus);
        entryInput.addEventListener('blur', entryBlur);
        entryInput.addEventListener('keydown', blockSpecialChars);
        entryInput.addEventListener('input', updateCard);
        defaultValues[entryInput.id + "InCard"] = findInCardEl(entryInput.id, "InCard").textContent;
        defaultValues[entryInput.id] = entryInput.value;
    }

    const confirmBtn = document.getElementById('confirm-btn');
    confirmBtn.addEventListener('click', toggleDisplay);

    const continueBtn = document.getElementById('continue-btn');
    continueBtn.addEventListener('click', toggleDisplay);

})

/* Event Related Functions */

function toggleDisplay(e) {
    e.preventDefault();
    const idBtn = e.target.id;
    if (idBtn === 'confirm-btn') {
        // make form disappear
        if (!validateInputs()) return; // if fields not valid igonre click
        document.getElementsByClassName('inputForm')[0].style.display = "none";

        // make thank you appear
        const thankYouDiv = document.getElementsByClassName('thankYou')[0];
        thankYouDiv.style.display = "flex";
        thankYouDiv.style.flexDirection = "column";
        thankYouDiv.style.alignItems = "center";
    } else {
        // make thank you disappear
        const thankYouDiv = document.getElementsByClassName('thankYou')[0];
        thankYouDiv.style.display = "none";

        // reset default value
        resetPage();

        // make form appear again
        document.getElementsByClassName('inputForm')[0].style.display = "flex";
    }
}

function blockSpecialChars(e) {

    if (/[^a-zA-Z0-9 ]/g.test(e.key)) {
        e.preventDefault();
        return;
    }
}

function updateCard(e) {
    
    const inCardEl = findInCardEl(e.target.id, "InCard");

    // add spaces effect
    //debugger;
    if (e.target.id === "cardNumber" && e.data !== null) {
        cardNumberSpaces.forEach(spacePos => {
            if (e.target.value.length === spacePos) {
                e.target.value += " ";
            }
        })
    }

    inCardEl.textContent = e.target.value;
}

function entryFocus(e) {
    const eValue = e.target.value;
    //check if the value is the default and if it's clear it.
    if (eValue === defaultValues[e.target.id]) {
        e.target.value = "";
        //e.target.style.color = 'hsl(278, 68%, 11%)';
        toggleColors(e.target);
        return
    } 
}

function entryBlur(e) {

    // revert to default values in case user clean up the inputs:
    if (e.target.value === "") {
        e.target.value = defaultValues[e.target.id];
        //e.target.style.color = 'hsl(270, 3%, 87%)';
        toggleColors(e.target);
        inCardEl = findInCardEl(e.target.id, "InCard");
        inCardEl.textContent = defaultValues[inCardEl.id];
        return // no need to continue
    }
    

    //validate entry:
    if (!window[e.target.id](e.target)) { // will call a function with the same name of id
        displayError(e.target); // display error in the referred field
    } else {
        cleanError(e.target); 
    }
}

/* Validation functions (function name = id of the element) */

function cardHolderName(el) {
    if (!hasLetters(el.value)) return false;
    if (el.value === defaultValues[el.id]) return false;
    return true
}

function mm(el) {
    const month = el.value;
    if (month === defaultValues[el.id]) return false; 
    if (month.length !== 2) return false;
    if (hasLetters(month)) return false;
    if (parseInt(month) < 1 || parseInt(month) > 12) return false;
    return true;
}

function yy(el) {
    const year = el.value;
    if (year === defaultValues[el.id]) return false;
    if (year.length !== 2) return false;
    if (hasLetters(year)) return false;
    if (parseInt(year) < 22) return false;
    return true;
}

function cvv(el) {
    const cvvNum = el.value;
    if (cvvNum === defaultValues[el.id]) return false
    if (cvvNum.length !== 3) return false;
    if (hasLetters(cvvNum)) return false;
    return true;
}

function cardNumber(el) {
    // validating card number
    const cardNumberNoSpace = el.value.split(" ").join("");
    if (cardNumberNoSpace.length !== 16) return false;
    if (hasLetters(cardNumberNoSpace)) return false;
    return true;
}

/* functions to display/clean errors*/

function cleanError(el) {
    const elErr = findInCardEl(el.id, "Err");
    el.style.border = "1px solid hsl(270, 3%, 87%)"
    elErr.style.color = "white";
}

function displayError(el) {
    const errEl = findInCardEl(el.id,"Err");
    el.style.border = "1px solid red"
    errEl.style.color = "red";
}

// helper functions:
function hasLetters(str) {
    const digits = "01234567890";
    return str.split("").some(digit => !(digits.includes(digit)))
}

function findInCardEl (id, suffix) {
    return document.getElementById(id + suffix);
}

function validateInputs() {
    const inputs = document.getElementsByClassName('entry-input');
    let formValid = true;
    for (const el of inputs) {
        if (!window[el.id](el)) {
            displayError(el);   
            formValid = false;
        }
    }
    return formValid;
}

function resetPage() {

    for (const id in defaultValues) {
        const el = document.getElementById(id);
        
        // if el is in the card, updates textContent:
        if (el.id.includes("InCard")) {
            el.textContent = defaultValues[id];
        // else updates value
        } else {
            el.value = defaultValues[id];
            toggleColors(el);
         
        }
    } 
} 

function toggleColors(el) {
    el.classList.toggle('fontDark');
    el.classList.toggle('fontClear');
}
