import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
 interface Coordinates{
  lat: number;
  lon: number;
 }

 const API_KEY = process.env.API_KEY;

 const BASE_API_URL = 'api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}'

// TODO: Define a class for the Weather object

class Weather {
  constructor(
    public temperature: number,
    public humidity: number,
    public windSpeed: number,
  ) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
  }
}


// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURl: string;
  private apiKey: string;
  private cityName: string;

  constructor() {
    this.baseURl = BASE_API_URL;
    this.apiKey = API_KEY;
    this.cityName = '';
}
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const response = await fetch(query);
    const data = await response.json();
    return data;
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const { lat, lon } = locationData;
    return { lat, lon };
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/gecode?city=${this.cityName}&appid=${this.apiKey}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const { lat, lon } = coordinates;
    return `${this.baseURL}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
   private async fetchAndDestructureLocationData() {
    const query = this.buildGeocodeQuery();
    const locationData = await this.fetchLocationData(query);
    return this.destructureLocationData(locationData);
   }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const query = this.buildWeatherQuery(coordinates);
    const response = await fetch(query);
    if (!response.ok) {
      throw new Error('Unable to fetch weather data');
    } else {
      const weatherData = await response.json();
      return weatherData;
    }
    
  
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const { main, wind } = response;
    const { temp, humidity } = main;
    const { speed } = wind;
    return new Weather(temp, humidity, speed);
  }
  // TODO: Complete buildForecastArray method
   private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecastArray = weatherData.map((weather) => {
      const { dt, main, wind } = weather;
      const { temp, humidity } = main;
      const { speed } = wind;
      return new Weather(temp, humidity, speed);
    });
    forecastArray.unshift(currentWeather);
    return forecastArray;

   }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const currentWeatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(currentWeatherData);
    const forecastData = await this.fetchWeatherData(coordinates);
    const forecastArray = this.buildForecastArray(currentWeather, forecastData);
    return forecastArray;
  }
}

export default new WeatherService();
