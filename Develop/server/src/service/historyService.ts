import fs from 'fs';
// TODO: Define a City class with name and id properties
class City {
  id: string;
  name: string;
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    fs.readFile('searchHistory.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      return data;
    });
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
   private async write(cities: City[]) {
    fs.writeFile('searchHistory.json', JSON.stringify(cities), (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const cities = await this.read();
    return cities;
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    const cities = await this.getCities();
    const cityId = cities.length + 1;
    const newCity = new City(cityId.toString(), city);
    cities.push(newCity);
    await this.write(cities);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
   async removeCity(id: string) {
    const cities = await this.getCities();
    const updatedCities = cities.filter((city) => city.id !== id);
    await this.write(updatedCities);
   }
}

export default new HistoryService();
