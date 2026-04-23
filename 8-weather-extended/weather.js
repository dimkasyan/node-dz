#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather, getIcon } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from './services/storage.service.js';
import { homedir } from 'os';

const saveToken = async (token) => {
	if (!token.length) {
		printError('Не передан token');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Токен сохранён');
	} catch (e) {
		printError(e.message);
	}
}

const saveCity = async (cities) => {
	if (!cities.length) {
		printError('Не передан город');
		return;
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.cities, cities);
		const successTextCities = cities.length === 1 ? 'Город сохранен' : 'Города сохранены';
		printSuccess(successTextCities);
	} catch (e) {
		printError(e.message);
	}
}

const saveLanguage = async (lang) => {
	if (!lang || !lang.length) {
		printError('Не передан язык');
		return;
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.lang, lang);
		printSuccess('Язык сохранён');
	} catch (error) {
		printError(error.message);
	}
}

const getForcast = async () => {
	try {
		const cities = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.cities);
		const lang = await getKeyValue(TOKEN_DICTIONARY.lang) ?? 'en';

		for (const city of cities) {
			const weather = await getWeather(city, lang);
			printWeather(weather, getIcon(weather.weather[0].icon), lang);
		}
	} catch (e) {
		if (e?.response?.status == 404) {
			printError('Неверно указан город');
		} else if (e?.response?.status == 401) {
			printError('Неверно указан токен');
		} else {
			printError(e.message);
		}
	}
}

const initCLI = () => {
	const args = getArgs(process.argv);

	if (args.h) {
		return printHelp();
	}
	if (args.s) {
		return saveCity(args.s);
	}
	if (args.t) {
		return saveToken(args.t);
	}

	if (args.l) {
		return saveLanguage(args.l);
	}
	return getForcast();
};

initCLI();