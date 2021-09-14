import myCurrentLocation, { getGreeting, message, name } from "./myModule";
import addFunction, { subtract } from "./math";

// You can also grab the default export by typing the following
// import myCurrentLocation from "./myModule";

console.log('Calling math.js');
console.log(addFunction(5, 5))      //10
console.log(subtract(10, 5))        //5
console.log('');
console.log('Calling myModule.js');
console.log(message);                 // Some message from myModule.js
console.log(name);                    // Shaniya Malcolm
console.log(myCurrentLocation);       // New York
console.log(getGreeting(`Camilla`));  // Welcome to the course Camilla;  