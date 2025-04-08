import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ChoiceComponent } from '../choice/choice.component';

import { GameControlsComponent } from '../game-controls/game-controls.component';
import { GameService } from '../../services/game/game.service';

@Component({
  selector: 'app-game-content',
  imports: [ChoiceComponent, GameControlsComponent],
  templateUrl: './game-content.component.html',
  styleUrl: './game-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameContentComponent {
  private readonly gameService = inject(GameService);

  public readonly loaded = signal<boolean>(false);

  public readonly guessing = this.gameService.guessing;
  public readonly correctPokemon = this.gameService.correctPokemon;

  public markAsLoaded() {
    this.loaded.set(true);
  }
}
