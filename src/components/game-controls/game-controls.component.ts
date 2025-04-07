import { Component, computed, inject } from '@angular/core';
import { GameService } from '../../services/game/game.service';
import { Generation } from '../../enums/generation';

@Component({
  selector: 'app-game-controls',
  imports: [],
  templateUrl: './game-controls.component.html',
  styleUrl: './game-controls.component.scss',
})
export class GameControlsComponent {
  private readonly gameService = inject(GameService);

  public readonly generationText = computed(() =>
    this.getGenerationText(this.gameService.generation())
  );
  public readonly score = this.gameService.score;
  public readonly roundEndMessage = this.gameService.roundEndMessage;

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
