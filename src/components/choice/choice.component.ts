import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-choice',
  imports: [CommonModule],
  templateUrl: './choice.component.html',
  styleUrl: './choice.component.scss',
})
export class ChoiceComponent {
  @Input() options: string[] = [];
  @Input() choiceButtonsDisabled: boolean = false;
  @Output() optionSelected = new EventEmitter<string>();

  onOptionSelected(selectedOption: string): void {
    this.optionSelected.emit(selectedOption);
  }
}
