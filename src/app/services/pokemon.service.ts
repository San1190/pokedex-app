import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//Interface for PokemonService
export interface Pokemon{
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previus: string | null;
  results: Pokemon[];

}

export interface PokemonDetail{
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      }
    }
  };
  types: Array<{
    type: {
      name: string;
    }
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  // Obtener todos los nombres de Pokémon (solo nombres y URLs)
  getAllPokemonNames(): Observable<PokemonListResponse> {
    // El número actual de Pokémon es 1025, pero ponemos un número alto por si aumentan
    return this.http.get<PokemonListResponse>(`${this.apiUrl}/pokemon?limit=2000`);
  }

  getPokemons(limit: number = 20): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.apiUrl}/pokemon?limit=${limit}`);
  }

  getPokemonDetail(url: string): Observable<PokemonDetail>{
    return this.http.get<PokemonDetail>(url);
  }
}
