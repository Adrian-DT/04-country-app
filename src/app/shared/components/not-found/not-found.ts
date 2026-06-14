import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'not-found',
  imports: [],
  templateUrl: './not-found.html',
})
export class NotFound {

  // Obtenemos la localización del componente
  location = inject(Location);

  // Función para regresar, teniendo la anterior localización
  goBack() {
    this.location.back()
  }

}
