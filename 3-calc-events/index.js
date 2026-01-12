const { add } = require('./add.js');
const { multiply } = require('./multiply.js');

const eventEmitter = require('events');
const calcEvents = new eventEmitter();

calcEvents.on('add', (a, b) => {
    calcEvents.emit('result', add(a, b));
}); 

calcEvents.on('multiply', (a, b) => {
    calcEvents.emit('result', multiply(a, b));
});

calcEvents.on('result', (result) => {
    console.log(result);
});

let firstNum = process.argv[2];
let secondNum = process.argv[3];

calcEvents.emit(process.argv[4], firstNum, secondNum);
