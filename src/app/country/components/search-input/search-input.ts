import { Component, effect, input, output, signal } from '@angular/core';

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

  // Almacenamos el valor del input
  inputValue = signal<string>('');

  // Propiedad para definir el tiempo del timeout
  debounceTime = input(300);

  debaunceEffect = effect((onCleanUp) => {
    const value = this.inputValue(); // Cada vez que la signal cambia, disparará este efecto

    const timeout = setTimeout(() => {
      this.value.emit(value);
    },this.debounceTime());

    // Limpiamos el timeout después de emitir la señal, esto nos permite que la señal se emita cuando dejamos de escribir y no cada vez que el valor cambia
    onCleanUp(() => {
      clearTimeout(timeout);
    })

  })

}
