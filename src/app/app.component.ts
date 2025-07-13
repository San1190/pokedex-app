import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pokemon, PokemonDetail, PokemonService } from './services/pokemon.service';
import { Component } from '@angular/core';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonDetailModalComponent } from './components/pokemon-detail-modal/pokemon-detail-modal.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, PokemonCardComponent, PokemonDetailModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pokedex-app';

  allPokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  searchTerm = '';
  loading = false;
  error = '';
  initialShowCount = 20;

  // Favoritos
  favoritePokemons: Pokemon[] = [];
  showFavoritesOnly = false;

  // Modal state
  isModalOpen = false;
  selectedPokemon: PokemonDetail | null = null;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadAllPokemonNames();
    this.loadFavorites();
  }

  loadAllPokemonNames() {
    this.loading = true;
    this.error = '';
    this.pokemonService.getAllPokemonNames().subscribe({
      next: (data) => {
        this.allPokemons = data.results;
        this.filteredPokemons = this.allPokemons.slice(0, this.initialShowCount);
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      }
    });
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.filteredPokemons = this.allPokemons.slice(0, this.initialShowCount);
    } else {
      // Buscar en toda la Pokédex y mostrar todos los resultados
      this.filteredPokemons = this.allPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredPokemons = this.allPokemons.slice(0, this.initialShowCount);
  }

  // Favoritos
  loadFavorites() {
    const favs = localStorage.getItem('favoritePokemons');
    this.favoritePokemons = favs ? JSON.parse(favs) : [];
  }

  saveFavorites() {
    localStorage.setItem('favoritePokemons', JSON.stringify(this.favoritePokemons));
  }

  isFavorite(pokemon: Pokemon): boolean {
    return this.favoritePokemons.some(fav => fav.name === pokemon.name);
  }

  toggleFavorite(pokemon: Pokemon) {
    if (this.isFavorite(pokemon)) {
      this.favoritePokemons = this.favoritePokemons.filter(fav => fav.name !== pokemon.name);
    } else {
      this.favoritePokemons = [pokemon, ...this.favoritePokemons];
    }
    this.saveFavorites();
  }

  // Sidebar
  showFavorites() {
    this.showFavoritesOnly = true;
  }

  showPokedex() {
    this.showFavoritesOnly = false;
  }

  // Modal
  onCardClick(pokemonDetail: PokemonDetail) {
    this.selectedPokemon = pokemonDetail;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedPokemon = null;
  }
}
