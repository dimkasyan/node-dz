import express from "express";
import { getWeather, getIcon } from "./services/api.service.js";
import { languages } from "./assets/lang.js";

const port = 8000;
const app = express();

app.listen(port, () => {
  console.log("Сервер запущен на порту", port);
});

app.get("/weather", async (req, res) => {
  try {
    const city = req.query.city;

    if (!city) {
      return res.status(400).json({ error: "Не передан город" });
    }

    const lang = req.query.lang || "en";
    const weather = await getWeather(city, lang);

    return res.json({
      [languages[lang].weatherCity]: weather.name,
      [languages[lang].temp]: weather.main.temp,
      [languages[lang].icon]: getIcon(weather.weather[0].icon),
      [languages[lang].description]: weather.weather[0].description,
      [languages[lang].humidity]: weather.main.humidity,
      [languages[lang].windSpeed]: weather.wind.speed,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ошибка при получении погоды" });
  }
});
