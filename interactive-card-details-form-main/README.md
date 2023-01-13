# Frontend Mentor - Interactive card details form solution

This is a solution to the [Interactive card details form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-card-details-form-XpS8cKZDWw). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

### The challenge

Users should be able to:

- Fill in the form and see the card details update in real-time
- Receive error messages when the form is submitted if:
  - Any input field is empty
  - The card number, expiry date, or CVC fields are in the wrong format
- View the optimal layout depending on their device's screen size
- See hover, active, and focus states for interactive elements on the page

### Links

- Solution URL: [GitHub] (https://github.com/abv4594/frontend-mentor/tree/main/interactive-card-details-form-main)
- Live Site URL: [Solution](https://jolly-mochi-4fa7e8.netlify.app/)

### Built with

- HTML
- CSS
- CSS Flexbox & Grid
- Javascript

### What I learned

- Great to review DOM manipulation. I didn't plan in advance and started to develop the project. During the development I noticed there was space to optimize, if I had planned in advance. Some aspects I implemented in the code which I believe are smart (not sure if they are recommended though):

- Relate IDs from the input fields in the form with the ids in the (dummy) card and the ids of the errors (which apppear below the input fields)
    - For instance, the input field for the card number has the id "cardNumber". The id of the paragraph containing the same field in the card is "cardNumberInCard"
    - So faciliatates code reutilization. 

- Use functions with the same name as ids and use ```window[id]``` to call the function.
    - This also helped to optimize the code. For instance, to validate the card number, with ```id=cardNumber```, there is a function ```cardNumber()```. 

### Useful resources

- [This codepen](https://codepen.io/P1xt/pen/wvxddQV?editors=1010) - was a great a recap of DOM and of great help to me. 




