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

  public readonly guessing = this.gameService.guessing;

  public readonly correctPokemon = this.gameService.correctPokemon;
}
