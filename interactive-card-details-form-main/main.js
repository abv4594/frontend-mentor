//Important convention:
//ids of text/paragraphs in the illustration of card = id of form + "InCard"
//ids of the errors message (<p> elements) = id of form + "Err"
//(this is used along the code to, given the id in the form, find the id in card 
//or the id of the error message)

// some global constants and objects
let defaultValues = {}; // store defult values
const cardNumberSpaces = [4,9,14]; // used to make the space effect in the card number


// initial set up, add event listeners and collect default values (from HTML)

window.addEventListener('DOMContentLoaded', (event)=> {

    const entryInputs = document.getElementsByClassName('entry-input');
    for (const entryInput of entryInputs) {
        entryInput.addEventListener('focus', entryFocus);
        entryInput.addEventListener('blur', entryBlur);
        entryInput.addEventListener('input', updateCard);
        defaultValues[entryInput.id + "InCard"] = findInCardEl(entryInput.id, "InCard").textContent;
        defaultValues[entryInput.id] = entryInput.value;
    }


})


function updateCard(e) {
    const inCardEl = findInCardEl(e.target.id, "InCard");

    // add spaces effect
    if (e.target.id === "cardNumber") {
        cardNumberSpaces.forEach(spacePos => {
            if (e.target.value.length === spacePos) {
                e.target.value += " ";
            }
        })
    }

    inCardEl.textContent = e.target.value;
}

function entryFocus(e) {
    //check if there is currently data in the input field
    if (e.target.value === defaultValues[e.target.id]) {
        e.target.value = "";
        e.target.style.color = 'hsl(278, 68%, 11%)';
    } 
}

function entryBlur(e) {

    // revert to default values in case user clean up the inputs:
    if (e.target.value === "") {
        e.target.value = defaultValues[e.target.id];
        e.target.style.color = 'hsl(270, 3%, 87%)';
        inCardEl = findInCardEl(e.target.id, "InCard");
        inCardEl.textContent = defaultValues[inCardEl.id];
        return // no need to continue
    }

    //validate entry:
    if (!window[e.target.id](e)) { // will call a function with the same name of id
        displayError(e);
    } else {
        cleanError(e);
    }
}

// validation functions (function name = id of the element)

function cardHolderName(el) {
    return true // you can add whatever as a name
}

function mm(el) {
    const month = el.target.value;
    if (month.length !== 2) return false;
    if (hasLetters(month)) return false;
    if (parseInt(month) < 1 || parseInt(month) > 12) return false;
    return true;
}

function yy(el) {
    const year = el.target.value;
    if (year.length !== 2) return false;
    if (hasLetters(year)) return false;
    if (parseInt(year) < 22) return false;
    return true;
}

function cvv(el) {
    const cvvNum = el.target.value;
    if (cvvNum.length !== 3) return false;
    if (hasLetters(cvvNum)) return false;
    return true;
}

function cardNumber(el) {
    // validating card number
    const cardNumberNoSpace = el.target.value.split(" ").join("");
    if (cardNumberNoSpace.length !== 16) return false;
    if (hasLetters(cardNumberNoSpace)) return false;
    return true;
}




// functions to control errors display
function cleanError(el) {
    const elErr = findInCardEl(el.target.id, "Err");
    el.target.style.border = "1px solid hsl(270, 3%, 87%)"
    elErr.style.color = "white";
}
function displayError(el) {
    const errEl = findInCardEl(el.target.id,"Err");
    el.target.style.border = "1px solid red"
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