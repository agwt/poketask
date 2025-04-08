# Pokemon Guessing Game 

A simple game built using [Angular 19](https://angular.io/) where users guess the name of a hidden Pokemon, similar to the "Who's That Pokemon" segment of the anime.

Features:
- TypeScript
- Signals
- RxJS
- SCSS

## Project Structure
```bash
├── public/ 
├── src/ 
│ ├── app/ 
│ ├── components/ 
│ │ ├── choice/ 
│ │ ├── game-content/ 
│ │ └── game-controls/ 
│ ├── enums/ 
│ │ ├── generation
│ │ └── status
│ ├── interfaces/ 
│ │ └── pokemon
│ ├── services/ 
│ │ ├── api      # Fetches data from pokeapi
│ │ └── game     # Handles game state
│ ├── index
│ ├── main
│ └── styles
```
### Prerequisites

- Node.js
- Angular CLI (`npm install -g @angular/cli`)

### Installation

Clone the repository:

```bash
git clone https://github.com/agwt/poketask.git
```
Install dependencies:

```bash
npm install
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`, or use the `--open` modifier. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```
