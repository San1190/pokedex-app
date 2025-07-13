import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PokemonDetail } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen) {
      <div class="modal-overlay" (click)="closeModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <button class="close-btn" (click)="closeModal()">✕</button>
          
          @if (pokemonDetail) {
            <div class="pokemon-detail">
              <div class="pokemon-header">
                <h2>{{ pokemonDetail.name | titlecase }}</h2>
                <span class="pokemon-id">#{{ pokemonDetail.id.toString().padStart(3, '0') }}</span>
              </div>

              <div class="pokemon-image-section">
                <img 
                  [src]="pokemonDetail.sprites.other['official-artwork'].front_default || pokemonDetail.sprites.front_default"
                  [alt]="pokemonDetail.name"
                  class="pokemon-image"
                  (error)="onImageError($event)"
                >
              </div>

              <div class="pokemon-info-grid">
                <div class="info-card">
                  <h3>Características</h3>
                  <div class="info-item">
                    <span class="label">Altura:</span>
                    <span class="value">{{ pokemonDetail.height / 10 }}m</span>
                  </div>
                  <div class="info-item">
                    <span class="label">Peso:</span>
                    <span class="value">{{ pokemonDetail.weight / 10 }}kg</span>
                  </div>
                </div>

                <div class="info-card">
                  <h3>Tipos</h3>
                  <div class="types-container">
                    @for (type of pokemonDetail.types; track type.type.name) {
                      <span class="type-badge" [class]="'type-' + type.type.name">
                        {{ type.type.name | titlecase }}
                      </span>
                    }
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      backdrop-filter: blur(5px);
    }

    .modal-content {
      background: white;
      border-radius: 20px;
      padding: 30px;
      max-width: 500px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .close-btn {
      position: absolute;
      top: 15px;
      right: 20px;
      background: #e74c3c;
      color: white;
      border: none;
      border-radius: 50%;
      width: 35px;
      height: 35px;
      cursor: pointer;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.3s ease;
    }

    .close-btn:hover {
      background: #c0392b;
    }

    .pokemon-detail {
      text-align: center;
    }

    .pokemon-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .pokemon-header h2 {
      margin: 0;
      color: #2c3e50;
      font-size: 2rem;
      font-weight: bold;
      text-transform: capitalize;
    }

    .pokemon-id {
      background: #f8f9fa;
      color: #6c757d;
      padding: 8px 12px;
      border-radius: 15px;
      font-size: 1rem;
      font-weight: bold;
    }

    .pokemon-image-section {
      margin: 25px 0;
    }

    .pokemon-image {
      width: 200px;
      height: 200px;
      object-fit: contain;
      border-radius: 15px;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 15px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .pokemon-info-grid {
      display: grid;
      gap: 20px;
      margin-top: 25px;
    }

    .info-card {
      background: #f8f9fa;
      border-radius: 15px;
      padding: 20px;
      text-align: left;
    }

    .info-card h3 {
      margin: 0 0 15px 0;
      color: #2c3e50;
      font-size: 1.2rem;
      font-weight: bold;
    }

    .info-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      padding: 8px 0;
      border-bottom: 1px solid #e9ecef;
    }

    .info-item:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }

    .label {
      font-weight: 600;
      color: #495057;
    }

    .value {
      color: #6c757d;
      font-weight: 500;
    }

    .types-container {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .type-badge {
      display: inline-block;
      padding: 6px 15px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: bold;
      color: white;
      text-transform: capitalize;
    }

    /* Colores de tipos de Pokémon */
    .type-normal { background: #A8A878; }
    .type-fire { background: #F08030; }
    .type-water { background: #6890F0; }
    .type-electric { background: #F8D030; }
    .type-grass { background: #78C850; }
    .type-ice { background: #98D8D8; }
    .type-fighting { background: #C03028; }
    .type-poison { background: #A040A0; }
    .type-ground { background: #E0C068; }
    .type-flying { background: #A890F0; }
    .type-psychic { background: #F85888; }
    .type-bug { background: #A8B820; }
    .type-rock { background: #B8A038; }
    .type-ghost { background: #705898; }
    .type-dragon { background: #7038F8; }
    .type-dark { background: #705848; }
    .type-steel { background: #B8B8D0; }
    .type-fairy { background: #EE99AC; }

    @media (max-width: 600px) {
      .modal-content {
        padding: 20px;
        margin: 20px;
      }

      .pokemon-header {
        flex-direction: column;
        gap: 10px;
      }

      .pokemon-image {
        width: 150px;
        height: 150px;
      }
    }
  `]
})
export class PokemonDetailModalComponent {
  @Input() isOpen = false;
  @Input() pokemonDetail: PokemonDetail | null = null;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  onImageError(event: any) {
    event.target.src = 'https://via.placeholder.com/200x200/cccccc/666666?text=No+Image';
  }
} 