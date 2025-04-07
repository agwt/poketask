import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-controls',
  imports: [],
  templateUrl: './game-controls.component.html',
  styleUrl: './game-controls.component.scss',
})
export class GameControlsComponent {
  @Input() genText: String = 'Gen 1-4';
  @Input() roundEndMessage: String = '';
  @Input() score: number = 0;

  @Output() newRoundSelected = new EventEmitter<void>();
  @Output() newGenSelected = new EventEmitter<void>();

  onNewRoundSelected() {
    this.newRoundSelected.emit();
  }

  onNewGenSelected() {
    this.newGenSelected.emit();
  }
}
