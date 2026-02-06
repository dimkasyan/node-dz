const { parseTimeArguments, formatDuration } = require('./timer');

const args = process.argv.slice(2);

if (!args.length) {
    throw new Error('Нужно передать время в формате hh mm ss');
}

const totalMilliseconds = parseTimeArguments([args]);

setTimeout(() => {
    const totalTime = formatDuration(totalMilliseconds);
    console.log(`Таймер сработал! Прошло ${totalTime}.`);
}, totalMilliseconds);