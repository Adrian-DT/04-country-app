import { Component, inject, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom, of } from 'rxjs';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
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
  // Trabajando con Observable
  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      // Si query no tiene ningún valor, devuelve un array vacío.
      if (!params.query) return of([]);

      return this.countryService.searchByCountry(params.query)

    }
  })

  // Para trabajar con promesas
  // countryResource = resource({
  //   params: () => ({ query: this.query() }),
  //   loader: async ({ params }) => {
  //     // Si query no tiene ningún valor, devuelve un array vacío.
  //     if (!params.query) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(params.query)
  //     )
  //   }
  // })

}
