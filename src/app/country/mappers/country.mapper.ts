import type { Country } from "../interfaces/country.interface";
import type { RESTCountry } from "../interfaces/rest-countries.interfaces";


export class CountryMapper {

  // Método estatico para mapear los objetos recibidos por la API
  static mapRestCountryToCountry( restCountry: RESTCountry ): Country {
    return {
      // La capital, en caso de que tengamos más de una, las unimos con join, mediante una coma.
      capital: restCountry.capital.join(','),
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.name.common,
      population: restCountry.population
    };
  }
  // Método para obtener un array de la petición a la API, mappeada por la interfaz creada
  static mapRestCountryArrayToCountryArray( restCountries: RESTCountry[] ):Country[] {
    return restCountries.map( this.mapRestCountryToCountry);
  }


}
