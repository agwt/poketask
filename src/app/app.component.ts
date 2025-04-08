import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameContentComponent } from '../components/game-content/game-content.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
