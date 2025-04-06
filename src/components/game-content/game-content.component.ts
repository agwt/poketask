import { Component, OnInit } from '@angular/core';
import { ChoiceComponent } from '../choice/choice.component';
import { ApiService } from '../../services/pokemon.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-game-content',
  imports: [ChoiceComponent],
  templateUrl: './game-content.component.html',
  styleUrl: './game-content.component.scss',
})
export class GameContentComponent implements OnInit {
  correctPokemon: any;
  fakePokemon: any[] = [];

  options: any[] = [];

  imageHidden: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.startNewRound();
  }

  startNewRound(): void {
    const correctId = this.getRandomId();
    this.fetchCorrectPokemon(correctId);

    const fakeIds = this.getRandomFakeIds(correctId, 3);
    const fakeCalls = fakeIds.map((id) => this.apiService.getPokemon(id));

    forkJoin(fakeCalls).subscribe((fakes) => {
      this.options = [this.correctPokemon?.name, ...fakes.map((p) => p?.name)];
      this.options.sort(() => Math.random() - 0.5);

      console.log(this.options);
    });

    this.imageHidden = true;
  }

  fetchCorrectPokemon(id: number): void {
    this.apiService.getPokemon(id).subscribe((p) => {
      this.correctPokemon = p;
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
    return [...idList];
  }

  handleOptionSelected(selectedOption: string): void {
    if (selectedOption === this.correctPokemon) {
      console.log('Correct');
    } else {
      console.log('Incorrect');
    }
  }
}
