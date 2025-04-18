import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game/game.service';
@Component({
  selector: 'app-choice',
  imports: [CommonModule],
  templateUrl: './choice.component.html',
  styleUrl: './choice.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChoiceComponent {
  private readonly gameService = inject(GameService);

  public readonly guessing = this.gameService.guessing;
  public readonly options = this.gameService.options;

  public chooseOption(option: string) {
    this.gameService.chooseOption(option);
  }
}
