import chalk from 'chalk';
import dedent from 'dedent-js';
import { languages } from '../assets/lang.js';

const printError = (error) => {
	console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
	console.log(
		dedent`${chalk.bgCyan(' HELP ')}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-h для вывода помощи
		-t [API_KEY] для сохранения токена
		`
	);
};

const printWeather = (res, icon, lang) => {
	console.log(
		dedent`${chalk.bgYellow(' WEATHER ')} ${languages[lang].weatherCity} ${res.name}
		${icon}  ${res.weather[0].description}
		${languages[lang].temp}: ${res.main.temp} (${languages[lang].feelsLike} ${res.main.feels_like})
		${languages[lang].humidity}: ${res.main.humidity}%
		${languages[lang].windSpeed}: ${res.wind.speed}
		`
	);
};

export { printError, printSuccess, printHelp, printWeather };