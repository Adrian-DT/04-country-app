import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
import { firstValueFrom } from 'rxjs';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {

  countryService = inject(CountryService);

  query = signal('');


  // A partir de la versión de Angular 19 en adelante, podemos hacer uso de los resource para hacer peticiones asincronas y controlar errores.
  countryResource = resource({
    params: () => ({ query: this.query() }),
    loader: async ({ params }) => {
      // Si query no tiene ningún valor, devuelve un array vacío.
      if (!params.query) return [];

      return await firstValueFrom(
        this.countryService.searchByCountry(params.query)
      )
    }
  })

}
