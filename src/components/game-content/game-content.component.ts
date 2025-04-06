import { Component, OnInit } from '@angular/core';
import { ChoiceComponent } from '../choice/choice.component';
import { PokemonService } from '../../services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-game-content',
  imports: [ChoiceComponent, HttpClientModule],
  templateUrl: './game-content.component.html',
  styleUrl: './game-content.component.scss',
})
export class GameContentComponent implements OnInit {
  title: String = "Who's That...";
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

      //TODO remove console logs
      console.log(this.pokemon.name);
    });
  }

  getRandomId(): number {
    return Math.floor(Math.random() * 500) + 1;
  }
}
