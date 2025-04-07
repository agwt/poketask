import { Component, OnInit } from '@angular/core';
import { ChoiceComponent } from '../choice/choice.component';
import { ApiService } from '../../services/pokemon.service';
import { forkJoin } from 'rxjs';
import { GameControlsComponent } from '../game-controls/game-controls.component';

@Component({
  selector: 'app-game-content',
  imports: [ChoiceComponent, GameControlsComponent],
  templateUrl: './game-content.component.html',
  styleUrl: './game-content.component.scss',
})
export class GameContentComponent implements OnInit {
  correctPokemon: any;
  artwork: any = '';
  fakePokemon: any[] = [];

  gen: number = 0;
  genText: String = 'Gen 1-4';

  options: any[] = [];
  roundEndMessage: String = 'New Pokemon encountered!';

  imageBlackedOut: boolean = true;
  choiceButtonsDisabled: boolean = false;

  score: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.startNewRound();
  }

  startNewRound(): void {
    this.resetRoundValues();
    const correctId = this.getRandomId();
    this.fetchCorrectPokemon(correctId);

    const fakeIds = this.getRandomFakeIds(correctId, 3);
    const fakeCalls = fakeIds.map((id) => this.apiService.getPokemon(id));

    forkJoin(fakeCalls).subscribe((fakes) => {
      this.options = [this.correctPokemon?.name, ...fakes.map((p) => p?.name)];
      this.options.sort(() => Math.random() - 0.5);
    });
  }

  async fetchCorrectPokemon(id: number): Promise<void> {
    this.apiService.getPokemon(id).subscribe((p) => {
      this.correctPokemon = p;
      this.artwork = p?.sprites?.other['official-artwork']?.front_default;
    });
  }

  getRandomId(): number {
    // First 4 gens only, I only really played up until Diamond/Pearl
    let minDexEntry: number = 1;
    let maxDexEntry: number = 493;
    switch (this.gen) {
      case 1:
        minDexEntry = 1;
        maxDexEntry = 151;
        break;
      case 2:
        minDexEntry = 152;
        maxDexEntry = 251;
        break;
      case 3:
        minDexEntry = 252;
        maxDexEntry = 386;
        break;
      case 4:
        minDexEntry = 387;
        maxDexEntry = 493;
        break;
      default:
        break;
    }
    return Math.floor(Math.random() * maxDexEntry) + minDexEntry;
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

  handleOptionSelected(selectedOption: string): void {
    this.imageBlackedOut = false;
    this.choiceButtonsDisabled = true;
    if (selectedOption === this.correctPokemon?.name) {
      this.roundEndMessage = `${this.correctPokemon?.name} was caught!`;
      this.score += 1;
    } else {
      this.roundEndMessage = `${this.correctPokemon?.name} ran away...`;
    }
  }

  changeGen(): void {
    this.gen = this.gen < 3 ? this.gen + 1 : 0;
    switch (this.gen) {
      case 1:
        this.genText = 'Gen 1 only';
        break;
      case 2:
        this.genText = 'Gen 2 only';
        break;
      case 3:
        this.genText = 'Gen 3 only';
        break;
      case 4:
        this.genText = 'Gen 4 only';
        break;
      default:
        this.genText = 'Gen 1-4';
        break;
    }
  }

  resetRoundValues(): void {
    this.roundEndMessage = 'New Pokemon encountered!';
    this.imageBlackedOut = true;
    this.choiceButtonsDisabled = false;
  }
}
