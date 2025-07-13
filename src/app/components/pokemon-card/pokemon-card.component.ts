import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Pokemon, PokemonDetail, PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent implements OnInit {

  @Input() pokemon!: Pokemon;
  @Output() cardClick = new EventEmitter<PokemonDetail>();

  pokemonDetail : PokemonDetail | null = null;
  loading = true;
  error = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(){
    this.loadPokemonDetail();
  }

  onImageError(event: any) {
    event.target.src = 'https://via.placeholder.com/150x150/cccccc/666666?text=No+Image';
  }

  loadPokemonDetail(){
    this.loading = true;
    this.error = '';

    this.pokemonService.getPokemonDetail(this.pokemon.url).subscribe({
      next: (detail) => {
        this.pokemonDetail = detail;
        this.loading = false;
      },

      error: (err) => {
        console.error(err);
        this.error = err;
        this.loading = false;
      }
    })
  }

  onCardClick() {
    if (this.pokemonDetail) {
      this.cardClick.emit(this.pokemonDetail);
    }
  }
}
