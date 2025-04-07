import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon, PokemonRef } from '../../interfaces/pokemon';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';
  private readonly http = inject(HttpClient);

  getPokemon(nameOrId: string | number): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon | undefined>(
      `${this.baseUrl}/pokemon/${nameOrId}`
    );
  }

  getAllPokemonRefs(
    limit: number = 493,
    offset: number = 0
  ): Observable<PokemonRef[]> {
    return this.http.get<PokemonRef[]>(
      `${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`
    );
  }
}
