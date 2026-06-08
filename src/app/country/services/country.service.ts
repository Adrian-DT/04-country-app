import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { map, Observable, catchError, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1'; // /capital/{ capital }

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  // Injectamos el servicio HttpClient, previamente configurado en app.config.ts
  private http = inject(HttpClient);

  searchByCapital( query: string ): Observable<Country[]> {
    // Pasamos la query recibida por parámetro a minúsculas
    query = query.toLowerCase();

    // Devolvemos la url de la petición a la API con la query
    // Mediante pipe, usamos el mapper para obtener la información definida que nos interesa manejar
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map(resp => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      // Con catchError podemos controlar el error, y devolver una excepción
      catchError (error => {
        console.log('Error fetching ', error);
        return throwError(() => new Error(`No se pudo obtener paises con esa query: ${query}`));
      })
    );
  }

}
