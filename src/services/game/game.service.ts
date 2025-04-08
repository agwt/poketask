import { computed, inject, Injectable, signal } from '@angular/core';
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
  private readonly pokemonRefs = signal<PokemonRef[]>([]);

  public readonly correctPokemon = signal<Pokemon | undefined>(undefined);

  private readonly defaultGeneration = Generation.All;
  public readonly generation = signal<Generation>(this.defaultGeneration);

  private readonly defaultStatus = Status.Guess;
  public readonly status = signal<Status>(this.defaultStatus);

  public readonly guessing = computed(() => this.status() === Status.Guess);

  public readonly options = signal<string[]>([]);
  public readonly score = signal<number>(0);

  constructor() {
    this.apiService.getAllPokemonRefs().subscribe((refs) => {
      this.pokemonRefs.set(refs);
      this.startNewRound();
    });
  }

  public startNewRound(): void {
    this.status.set(this.defaultStatus);

    const pokemonRefsInGen = this.getPokemonRefsInGen(
      this.pokemonRefs(),
      this.generation()
    );
    const fourPokemonRefs = this.getXPokemonRefs(pokemonRefsInGen, 4);
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

  public chooseOption(option: string): void {
    const correctName = this.correctPokemon()?.name;
    if (!correctName) return;
    const matches = correctName === option;
    this.status.set(matches ? Status.RevealCorrect : Status.RevealIncorrect);
    this.score.update((score) => (score = matches ? score + 1 : 0));
  }

  private getXPokemonRefs(list: PokemonRef[], count: number): PokemonRef[] {
    return [...list].sort(() => Math.random() - 0.5).slice(0, count);
  }

  private getPokemonRefsInGen(list: PokemonRef[], generation: Generation) {
    // First 4 gens only, I only really played up until Diamond/Pearl
    let minDexEntry: number = 1;
    let maxDexEntry: number = 493;
    switch (generation) {
      case Generation.One:
        minDexEntry = 1;
        maxDexEntry = 151;
        break;
      case Generation.Two:
        minDexEntry = 152;
        maxDexEntry = 251;
        break;
      case Generation.Three:
        minDexEntry = 252;
        maxDexEntry = 386;
        break;
      case Generation.Four:
        minDexEntry = 387;
        maxDexEntry = 493;
        break;
      default:
        break;
    }
    return list.slice(minDexEntry, maxDexEntry);
  }
}
