import { Router } from 'express';
const router = Router();
 import HistoryService from '../../service/historyService.js';
 import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  // TODO: GET weather data from city name
  const weatherData = await WeatherService.getWeather(req.body.city);
  res.json(weatherData);
  // TODO: save city to search history
  await HistoryService.save(req.body.city);
});

// TODO: GET search history
router.get('/history', async (req, res) => {
  const history = await HistoryService.getHistory();
  res.json(history);
});


// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  const {id} = req.body;
  await HistoryService.removeCity(id);
  res.json({message: 'City deleted from search history'});
});

export default router;
