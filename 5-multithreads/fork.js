const { counterRandomNumbers } = require('./randomNumbers');

process.on('message', (message) => {
    process.send(counterRandomNumbers(message));
    process.disconnect();
});