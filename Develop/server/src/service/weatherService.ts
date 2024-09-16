import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
 interface Coordinates{
  lat: number;
  lon: number;
 }

 const API_KEY = 'fe1c79808de9a65d2d9f15508a8e5b99'

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
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
