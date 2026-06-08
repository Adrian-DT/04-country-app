import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country.service';
import { CountryMapper } from '../../mappers/country.mapper';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {

  countryService = inject(CountryService);

  query = signal('');

  // A partir de la versión de Angular 19 en adelante, podemos hacer uso de los resource para hacer peticiones asincronas y controlar errores.
  countryResource = resource({
    params: () => ({ query: this.query() }),
    loader: async({ params }) => {
      // Si query no tiene ningún valor, devuelve un array vacío.
      if (!params.query) return [];

      return await firstValueFrom(
        this.countryService.searchByCapital(params.query)
      )
    }
  })



  // // Propiedades para controlar los estados de la petición a la API
  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);
  // Función necesaria con control de errores para versiones de Angular 18 o inferior.
  // onSearch(query: string) {
  //   // Comprobamos que si esta cargando la búsqueda, que no haga nada.
  //   if (this.isLoading()) return;
  //   // Si isLoading esta en false, pasamos a true para control de búsqueda.
  //   this.isLoading.set(true);
  //   // Limpiamos el error en cada búsqueda para controlar si se genera uno nuevo.
  //   this.isError.set(null);


  //   this.countryService.searchByCapital(query).subscribe({ next: (countries) => {
  //       // Si obtenemos la respuesta, pasamos el isLoading a false
  //       this.isLoading.set(false);
  //       // Cargamos la respuesta en la signal countries
  //       this.countries.set(countries);
  //       // console.log(resp);
  //   },
  //   // En caso de que salte una excepción, en el servicio hemos definido un catchError el cual es 'err'. Seteamos las countries vacías, terminamos el loading con false y seteamos la propiedad del error.
  //   error: (err) => {
  //     this.isLoading.set(false);
  //     this.countries.set([]);
  //     this.isError.set(err);
  //   },
  //   });
  // }

}
