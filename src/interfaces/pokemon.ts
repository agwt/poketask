export interface Pokemon {
  id: number;
  name: string;
  sprites: Sprites;
}

export interface Sprites {
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

export interface PokemonRef {
  name: string;
  url: string;
}
