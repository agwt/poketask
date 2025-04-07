import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { ChoiceComponent } from '../choice/choice.component';
import { ApiService } from '../../services/api/api.service';
import { forkJoin } from 'rxjs';
import { GameControlsComponent } from '../game-controls/game-controls.component';
import { Pokemon } from '../../interfaces/pokemon';
import { Generation } from '../../enums/generation';
import { GameService } from '../../services/game/game.service';
import { Status } from '../../enums/status';

@Component({
  selector: 'app-game-content',
  imports: [ChoiceComponent, GameControlsComponent],
  templateUrl: './game-content.component.html',
  styleUrl: './game-content.component.scss',
})
export class GameContentComponent implements OnInit {
  correctPokemon?: Pokemon;
  fakePokemon?: Pokemon[];

  gen: Generation = Generation.All;

  options: string[] = [];

  choiceButtonsDisabled: boolean = false;

  score: number = 0;

  public readonly guessing = computed(
    () => this.gameService.status() === Status.Guess
  );

  private readonly gameService = inject(GameService);
  private readonly apiService = inject(ApiService);

  ngOnInit(): void {}

  async fetchCorrectPokemon(id: number): Promise<void> {
    this.apiService.getPokemon(id).subscribe((p) => {
      this.correctPokemon = p;
      //this.artwork = p?.sprites.other['official-artwork'].front_default;
    });
  }

  getRandomFakeIds(correctId: number, count: number): number[] {
    const idList: number[] = [];
    while (idList.length < count) {
      const fakeId = this.getRandomId();
      if (fakeId !== correctId && !idList.includes(fakeId)) {
        idList.push(fakeId);
      }
    }
    return idList;
  }

  getRandomId(): number {
    // First 4 gens only, I only really played up until Diamond/Pearl
    let minDexEntry: number = 1;
    let maxDexEntry: number = 493;
    switch (this.gen) {
      case Generation.One:
        minDexEntry = 1;
        maxDexEntry = 151;
        break;
      case Generation.Two:
        minDexEntry = 152;
        maxDexEntry = 251;
        break;
      case Generation.Three:
        minDexEntry = 252;
        maxDexEntry = 386;
        break;
      case Generation.Four:
        minDexEntry = 387;
        maxDexEntry = 493;
        break;
      default:
        break;
    }
    return Math.floor(Math.random() * maxDexEntry) + minDexEntry;
  }
}
