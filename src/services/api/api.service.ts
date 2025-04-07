import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pokemon, PokemonRef, Sprites } from '../../interfaces/pokemon';

export interface Paged<T> {
  results: T;
  count: number;
}

type PokemonFromApi = Omit<Pokemon, 'imageUrl'> & { sprites: Sprites };

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';
  private readonly http = inject(HttpClient);

  getPokemon(nameOrId: string | number): Observable<Pokemon | undefined> {
    return this.http
      .get<PokemonFromApi | undefined>(`${this.baseUrl}/pokemon/${nameOrId}`)
      .pipe(
        map((pokemon) =>
          pokemon
            ? {
                ...pokemon,
                imageUrl:
                  pokemon?.sprites.other['official-artwork'].front_default,
              }
            : undefined
        )
      );
  }

  getAllPokemonRefs(
    limit: number = 493,
    offset: number = 0
  ): Observable<PokemonRef[]> {
    return this.http
      .get<Paged<PokemonRef[]>>(
        `${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`
      )
      .pipe(map((page) => page.results));
  }
}
