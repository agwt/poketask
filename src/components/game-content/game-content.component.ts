import { Component, computed, inject } from '@angular/core';
import { ChoiceComponent } from '../choice/choice.component';

import { GameControlsComponent } from '../game-controls/game-controls.component';
import { GameService } from '../../services/game/game.service';
import { Status } from '../../enums/status';

@Component({
  selector: 'app-game-content',
  imports: [ChoiceComponent, GameControlsComponent],
  templateUrl: './game-content.component.html',
  styleUrl: './game-content.component.scss',
})
export class GameContentComponent {
  private readonly gameService = inject(GameService);

  public readonly guessing = computed(
    () => this.gameService.status() === Status.Guess
  );

  public readonly correctPokemon = this.gameService.correctPokemon;

  // getRandomId(): number {
  //   // First 4 gens only, I only really played up until Diamond/Pearl
  //   let minDexEntry: number = 1;
  //   let maxDexEntry: number = 493;
  //   switch (this.gen) {
  //     case Generation.One:
  //       minDexEntry = 1;
  //       maxDexEntry = 151;
  //       break;
  //     case Generation.Two:
  //       minDexEntry = 152;
  //       maxDexEntry = 251;
  //       break;
  //     case Generation.Three:
  //       minDexEntry = 252;
  //       maxDexEntry = 386;
  //       break;
  //     case Generation.Four:
  //       minDexEntry = 387;
  //       maxDexEntry = 493;
  //       break;
  //     default:
  //       break;
  //   }
  //   return Math.floor(Math.random() * maxDexEntry) + minDexEntry;
  // }
}
