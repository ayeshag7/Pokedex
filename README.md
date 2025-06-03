# Pokédex Explorer
Pokédex Explorer is a web app that lets users explore Pokémon data, including species traits, abilities, moves, and individual Pokémon. It presents categorized content with smooth navigation and dynamic pages.


## Features
- Pokémon species listing with egg groups, color, flavor text, habitat, and shape.
- Pokémon listing with images and primary types.
- Ability listing with detailed descriptions and associated Pokémon.
- Move listing with type, category, power, PP, accuracy, and effects.
- Color-based theming on species detail pages.
- Dynamic routing for species, Pokémon, abilities, and moves.
- Clean, responsive layout with interactive cards and floating dock navigation.


## Tech Stack
The primary tech stack used to develop this application included:
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)


## API Reference
This application utilizes the [PokéAPI](https://pokeapi.co/), a free and open RESTful API that provides rich data about the Pokémon universe. It offers structured access to Pokémon species, abilities, moves, stats, and more — making it an ideal backend data source for building interactive Pokémon-based applications.


### Endpoints Used
The following endpoints were utilized to build the features of Pokémon Insight:
- **List Pokémon**
  - `https://pokeapi.co/api/v2/pokemon?limit=30`

- **Get Pokémon Details**
  - `https://pokeapi.co/api/v2/pokemon/{name}`

- **List Abilities**
  - `https://pokeapi.co/api/v2/ability?limit=100`

- **Get Ability Details**
  - `https://pokeapi.co/api/v2/ability/${ability}`

- **List Moves**
  - `https://pokeapi.co/api/v2/move?limit=100`

- **Get Move Details**
  - `https://pokeapi.co/api/v2/move/${move}`

- **List Species**
  - `https://pokeapi.co/api/v2/pokemon-species?limit=50`

- **Get Species Details**
  - `https://pokeapi.co/api/v2/pokemon-species/${specie}`


## Project Structure
### Pages (`app/`)
The `app/` directory contains all the route-based UI pages for Pokémon, abilities, moves, and species. Dynamic routes and layouts are also defined here.
```
src/
└── app/
├── abilities/          # Abilities listing and dynamic detail pages
├── moves/              # Moves listing and dynamic detail pages
├── pokemon/            # Pokémon listing and dynamic detail pages
├── species/            # Species listing and dynamic detail pages
├── layout.tsx          # Global layout wrapper
├── page.tsx            # Home page entry
└── globals.css         # Global styles
```
### API Routes (`app/api/`)
These are serverless route handlers used to fetch data from the PokéAPI. Each route is scoped to its respective feature (abilities, moves, etc).
```
src/
└── app/
└── api/
├── abilities/         # API route handlers for abilities
├── moves/             # API route handlers for moves
├── pokemon/           # API route handlers for Pokémon
└── species/           # API route handlers for species
```
### Components (`components/`)
This folder holds reusable UI components like cards and floating UI elements that are used throughout the app.
```
src/
└── components/
├── PokemonCard.tsx     # Card component for displaying individual Pokémon
├── SpeciesCard.tsx     # Card component for displaying species info with dynamic color
└── ui/
└── floating-dock.tsx   # Floating navigation dock component
```
### Lib (`lib/`)
Utility functions and shared helpers for the application logic live here.
```
src/
└── lib/
└── utils.ts           # Shared utilities and helper functions
```


## Getting Started
Follow the steps below to run the application locally:
1. Clone the repository (Alternatively, extract the provided ZIP file and open the extracted folder)
```
git clone https://github.com/ayeshag7/Pokedex
```

2. Navigate to the project directory
```
cd pokedex-explorer 
```
3. Install dependencies
```
npm install
```
4. Run the development server
```
npm run dev
```


## Project Deployment
You can access the live version of the application here:  
[Pokedex App](https://pokedex-jet-nu-12.vercel.app/)

