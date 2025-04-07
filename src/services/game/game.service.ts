import { Injectable, signal } from '@angular/core';
import { Generation } from '../../enums/generation';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly defaultGeneration = Generation.All;
  public readonly generation = signal<Generation>(this.defaultGeneration);

  private readonly defaultScore = 0;
  public readonly score = signal<number>(this.defaultScore);

  private readonly defaultRoundEndMessage = '';
  public readonly roundEndMessage = signal<string>(this.defaultRoundEndMessage);

  public startNewRound(): void {
    console.log('start new round');
  }
  public selectGeneration(generation: Generation): void {
    this.generation.set(generation);
  }
}
