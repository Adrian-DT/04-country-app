import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
})
export class SearchInput {

  // Señal para utilizar en el placeholder del input del componente
  placeholder = input('Buscar');
  // Valor que va a emitir el componente
  value = output<string>();
  // onSearch(value: string) {
  //   console.log({ value });
  // }

}
