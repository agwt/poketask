import { inject, Injectable, signal } from '@angular/core';
import { Generation } from '../../enums/generation';
import { Status } from '../../enums/status';
import { ApiService } from '../api/api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { shareReplay } from 'rxjs';
import { Pokemon, PokemonRef } from '../../interfaces/pokemon';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly apiService = inject(ApiService);
  private readonly pokemonRefs = toSignal(
    this.apiService.getAllPokemonRefs().pipe(shareReplay(1)),
    { initialValue: [] }
  );

  public readonly correctPokemon = signal<Pokemon | undefined>(undefined);

  private readonly defaultGeneration = Generation.All;
  public readonly generation = signal<Generation>(this.defaultGeneration);

  private readonly defaultStatus = Status.Guess;
  public readonly status = signal<Status>(this.defaultStatus);

  public readonly options = signal<string[]>([]);
  public readonly score = signal<number>(0);

  private getXPokemonRefs(list: PokemonRef[], count: number): PokemonRef[] {
    return [...list].sort(() => Math.random() - 0.5).slice(0, count);
  }

  public startNewRound(): void {
    this.status.set(this.defaultStatus);

    const fourPokemonRefs = this.getXPokemonRefs(this.pokemonRefs(), 4);
    const randomIndex = Math.floor(Math.random() * fourPokemonRefs.length);
    const correctPokemonRef = fourPokemonRefs[randomIndex];

    this.apiService
      .getPokemon(correctPokemonRef.name)
      .subscribe((p) => this.correctPokemon.set(p));

    this.options.set(fourPokemonRefs.map((p) => p.name));
  }

  public selectGeneration(generation: Generation): void {
    this.generation.set(generation);
  }
}
