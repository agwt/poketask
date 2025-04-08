import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { GameService } from '../../services/game/game.service';
import { Generation } from '../../enums/generation';
import { Status } from '../../enums/status';

@Component({
  selector: 'app-game-controls',
  imports: [],
  templateUrl: './game-controls.component.html',
  styleUrl: './game-controls.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameControlsComponent {
  private readonly gameService = inject(GameService);

  public readonly activeGeneration = this.gameService.generation;

  public readonly generationText = computed(() =>
    this.getGenerationText(this.activeGeneration())
  );
  public readonly score = this.gameService.score;
  public readonly highScore = this.gameService.highScore;

  public readonly guessing = this.gameService.guessing;

  public readonly message = computed(() => {
    const correctPokemon = this.gameService.correctPokemon();
    const status = this.gameService.status();
    if (status === Status.Guess) return 'New Pokemon Encountered!';
    if (!correctPokemon) return '';
    const name = correctPokemon.name;
    return status === Status.RevealCorrect
      ? `${name} was caught!`
      : `${name} ran away...`;
  });

  public readonly generations: Generation[] = [
    Generation.One,
    Generation.Two,
    Generation.Three,
    Generation.Four,
    Generation.All,
  ];

  public getGenerationText(generation: Generation): string {
    switch (generation) {
      case Generation.One:
        return 'Gen 1 only';
      case Generation.Two:
        return 'Gen 2 only';
      case Generation.Three:
        return 'Gen 3 only';
      case Generation.Four:
        return 'Gen 4 only';
      case Generation.All:
        return 'Gen 1-4';
    }
  }

  public startNewRound(): void {
    this.gameService.startNewRound();
  }

  public selectGeneration(generation: Generation): void {
    this.gameService.selectGeneration(generation);
  }
}
