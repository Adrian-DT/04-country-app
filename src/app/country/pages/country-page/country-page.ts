import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFound } from "../../../shared/components/not-found/not-found";
import { CountryInformation } from "./country-information/country-information";

@Component({
  selector: 'app-country-page',
  imports: [NotFound, CountryInformation],
  templateUrl: './country-page.html',
})
export class CountryPage {

  // Obtenemos el codeCountry de la ruta activa cuando se activa este componente
  countryCode = inject(ActivatedRoute).snapshot.params['codeCountry'];
  countryService = inject(CountryService);

  // Creamos el recurso que devuelve la búsqueda del servicio pasando el code del país.
  countryResource = rxResource({
    params: () => ({ code: this.countryCode }),
    stream: ({params}) => {
      return this.countryService.searchCountryByAlphaCode(params.code);
    },
  })

}
