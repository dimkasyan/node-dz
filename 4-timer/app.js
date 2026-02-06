const { parseTimeArguments, formatDuration } = require('./timer');

const args = process.argv.slice(2);

const totalMilliseconds = parseTimeArguments([args]);

setTimeout(() => {
    const totalTime = formatDuration(totalMilliseconds);
    console.log(`Таймер сработал! Прошло ${totalTime}.`);
}, totalMilliseconds);