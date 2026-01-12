const { add } = require('./add.js');
const { multiply } = require('./multiply.js');

let nodePath = process.argv[0];
let appPath = process.argv[1];

let firstNum = process.argv[2];
let secondNum = process.argv[3];

if (process.argv[4] === 'add') {
    console.log(add(firstNum, secondNum));
} else if (process.argv[4] === 'multiply') {
    console.log(multiply(firstNum, secondNum));
}