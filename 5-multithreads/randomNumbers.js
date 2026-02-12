const performance = require('perf_hooks');
const os = require('os');
const counterCore = os.cpus().length;

function randomNumbers() {
    const arr = [];
    for (let i = 0; i < 300000; i++) {
        arr.push(i);
    }
    return arr;
}

function counterRandomNumbers({ array }) {
    let counter = 0;

    if (!Array.isArray(array)) {
        throw new Error('Argument must be an array');
    }

    array.forEach((el) => {
        if (el % 3 === 0) {
            counter++;
        }
    });

    return counter;
}

function splitSubArray(array) {
    const subArrays = [];
    const size = Math.ceil(array.length / counterCore)
    const arrayLength = Math.ceil(array.length / size);

    for (let i = 0; i < arrayLength; i++) {
        subArrays.push(array.slice((i * size), (i * size) + size));
    }
    return subArrays;
}

module.exports = { counterRandomNumbers, randomNumbers, splitSubArray };