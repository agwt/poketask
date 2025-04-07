import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemon(nameOrId: string | number): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon/${nameOrId}`);
  }

  // getAllPokemon(limit: number = 493, offset: number = 0): Observable<any> {
  //   return this.http.get(
  //     `${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`
  //   );
  // }
}
