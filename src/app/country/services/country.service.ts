import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

const API_URL = 'https://restcountries.com/v3.1'; // /capital/{ capital }

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  // Injectamos el servicio HttpClient, previamente configurado en app.config.ts
  private http = inject(HttpClient);

  searchByCapital( query: string ) {
    // Pasamos la query recibida por parámetro a minúsculas
    query = query.toLowerCase();

    // Devolvemos la url de la petición a la API con la query
    return this.http.get(`${API_URL}/capital/${query}`);
  }

}
