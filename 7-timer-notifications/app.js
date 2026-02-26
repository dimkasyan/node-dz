const { parseTimeArguments, formatDuration } = require('./timer');
const notifier = require('node-notifier');

const args = process.argv.slice(2);

if (!args.length) {
    throw new Error('Нужно передать время в формате hh mm ss');
}

const totalMilliseconds = parseTimeArguments(args);

setTimeout(() => {
    const totalTime = formatDuration(totalMilliseconds);

    notifier.notify({
        title: 'Таймер',
        message: `Таймер сработал! Прошло ${totalTime}.`,
        sound: true,
        wait: true
    });
}, totalMilliseconds);