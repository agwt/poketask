import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-controls',
  imports: [],
  templateUrl: './game-controls.component.html',
  styleUrl: './game-controls.component.scss',
})
export class GameControlsComponent {
  @Input() roundEndMessage: String = '';
  @Input() score: number = 0;
  @Output() newRound = new EventEmitter<void>();

  newRoundSelected() {
    this.newRound.emit();
  }
}
