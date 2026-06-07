import { Component, inject, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country.service';
import { CountryMapper } from '../../mappers/country.mapper';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {

  countryService = inject(CountryService);

  // Propiedades para controlar los estados de la petición a la API
  isLoading = signal(false);
  isError = signal<string|null>(null);
  countries = signal<Country[]>([]);

  onSearch(query: string) {
    // Comprobamos que si esta cargando la búsqueda, que no haga nada.
    if (this.isLoading()) return;
    // Si isLoading esta en false, pasamos a true para control de búsqueda.
    this.isLoading.set(true);
    // Limpiamos el error en cada búsqueda para controlar si se genera uno nuevo.
    this.isError.set(null);


    this.countryService.searchByCapital(query).subscribe( resp => {
      // Si obtenemos la respuesta, pasamos el isLoading a false
      this.isLoading.set(false);
      // Cargamos la respuesta en la signal countries
      this.countries.set(resp);
      // console.log(resp);
    });
  }

}
