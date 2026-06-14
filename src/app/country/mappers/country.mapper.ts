import type { Country } from "../interfaces/country.interface";
import type { RESTCountry, Object as RestCountryItem } from "../interfaces/rest-countries.interfaces";

export class CountryMapper {

  static mapRestCountryToCountry(restCountry: RestCountryItem): Country {
    return {
      capital: restCountry.capitals?.map(cap => cap.name).join(', ') ?? 'Sin capital',
      cca2: restCountry.codes.alpha_2,
      flag: restCountry.flag?.emoji ?? '',
      flagSvg: restCountry.flag?.url_svg ?? '',
      name: restCountry.names.translations?.['spa']?.common ?? restCountry.names.common,
      population: restCountry.population ?? 0,
      region: restCountry.region,
      subRegion: restCountry.subregion,
    };
  }

  static mapRestCountryArrayToCountryArray(restCountries: RestCountryItem[]): Country[] {
    return restCountries.map(country => this.mapRestCountryToCountry(country));
  }

  static mapResponseToCountryArray(response: RESTCountry): Country[] {
    return this.mapRestCountryArrayToCountryArray(response.data.objects);
  }
}
