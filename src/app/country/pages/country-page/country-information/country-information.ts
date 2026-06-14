import { Component, computed, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-information',
  imports: [DecimalPipe],
  templateUrl: './country-information.html',
})
export class CountryInformation {

  country = input.required<Country>();

  // Porpiedad computada para mostrar en la estadistica del componente, el año
  currentYear = computed(() => {
    return new Date().getFullYear();
  })

}
