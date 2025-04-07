export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
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
