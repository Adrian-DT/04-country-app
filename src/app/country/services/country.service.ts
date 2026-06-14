import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { map, Observable, catchError, throwError, delay, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

// const API_URL = 'https://restcountries.com/v3.1'; // /capital/{ capital }
const API_URL = 'https://api.restcountries.com/countries/v5';
const API_TOKEN = 'rc_live_e152d115b2d74e3e8b3054b2747a8fb4';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  // Injectamos el servicio HttpClient, previamente configurado en app.config.ts
  private http = inject(HttpClient);

  // Header para la nueva versión de la API
  private get headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${API_TOKEN}`,
    });
  }

  searchByCapital( query: string ): Observable<Country[]> {
    // Pasamos la query recibida por parámetro a minúsculas
    query = query.toLowerCase().trim();

    // Devolvemos la url de la petición a la API con la query
    // Mediante pipe, usamos el mapper para obtener la información definida que nos interesa manejar
    return this.http.get<RESTCountry>(`${API_URL}/capitals?q=${query}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    }).pipe(
      map(resp => CountryMapper.mapResponseToCountryArray(resp)),
      delay(2000),
      catchError(error => {
        console.log('Error fetching ', error);
        return throwError(() => new Error(`No se pudo obtener paises con esa query: ${query}`));
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    // Pasamos la query recibida por parámetro a minúsculas
    query = query.toLowerCase();

    // Devolvemos la url de la petición a la API con la query
    // Mediante pipe, usamos el mapper para obtener la información definida que nos interesa manejar
    return this.http.get<RESTCountry>(`${API_URL}/name?q=${query}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    }).pipe(
      map(resp => CountryMapper.mapResponseToCountryArray(resp)),
      delay(2000),
      catchError(error => {
        console.log('Error fetching ', error);
        return throwError(() => new Error(`No se pudo obtener paises con esa query: ${query}`));
      })
    );
  }


  // Función para la petición a la API por el CODE del país cuando damos a más información en la aplicación web
  searchCountryByAlphaCode(code: string) {

    // Devolvemos la url de la petición a la API con la query
    // Mediante pipe, usamos el mapper para obtener la información definida que nos interesa manejar
    return this.http.get<RESTCountry>(`${API_URL}/code?q=${code}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    }).pipe(
      map(resp => CountryMapper.mapResponseToCountryArray(resp)),
      // Hacemos un map del anterior, obteniendo un array de countries y cogeremos el primer obtenido.
      map( countries => countries.at(0) ),
      catchError(error => {
        console.log('Error fetching ', error);
        return throwError(() => new Error(`No se pudo obtener paises con ese código: ${code}`));
      })
    );
  }

}
