import { Component } from '@angular/core';

@Component({
  selector: 'app-choice',
  imports: [],
  templateUrl: './choice.component.html',
  styleUrl: './choice.component.scss',
})
export class ChoiceComponent {
  public buttonClicked(): void {
    console.log('clicked!');
  }
}
