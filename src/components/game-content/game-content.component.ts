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

  options: any[] = [];
  roundEndMessage: String = 'New Pokemon encountered!';

  imageBlackedOut: boolean = true;
  choiceButtonsDisabled: boolean = false;

  score: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.startNewRound();
  }

  async startNewRound(): Promise<void> {
    this.resetRoundValues();
    const correctId = this.getRandomId();
    await this.fetchCorrectPokemon(correctId);

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
      this.artwork =
        this.correctPokemon?.sprites?.other['official-artwork']?.front_default;
    });
  }

  getRandomId(): number {
    // First 4 gens only
    return Math.floor(Math.random() * 493) + 1;
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

  resetRoundValues(): void {
    this.roundEndMessage = 'New Pokemon encountered!';
    this.imageBlackedOut = true;
    this.choiceButtonsDisabled = false;
  }
}
