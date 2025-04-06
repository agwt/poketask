import { Component, OnInit } from '@angular/core';
import { ChoiceComponent } from '../choice/choice.component';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-game-content',
  imports: [ChoiceComponent],
  templateUrl: './game-content.component.html',
  styleUrl: './game-content.component.scss',
})
export class GameContentComponent implements OnInit {
  pokemon: any;
  pokemonList: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.startNewRound();
  }

  startNewRound() {
    const id = this.getRandomId();

    this.pokemonService.getPokemon(id).subscribe((p) => {
      this.pokemon = p;

      console.log(this.pokemon.name);
    });
  }

  getRandomId(): number {
    return Math.floor(Math.random() * 500) + 1;
  }
}
