import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Cocktail } from '../../models/cocktail.interface';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  private readonly apiUrl = '/cocktails'

  private favoriteKey = 'favorites';

  constructor(private httpClient: HttpClient) { }

  getCocktails(): Observable<Cocktail[]> {
    return this.httpClient.get<Cocktail[]>(this.apiUrl);
  }

  getCocktailsDetailsById(id: string): Observable<Cocktail> {
    return this.httpClient.get<Cocktail>(`${this.apiUrl}/${id}`);
  }

  getFavorites(): string[] {
    const favorites = localStorage.getItem(this.favoriteKey);
    return favorites ? JSON.parse(favorites) : [];
  }


  isFavorite(cocktailId: string): boolean {
    const favorites = this.getFavorites();
    return favorites.includes(cocktailId);
  }


  toggleFavorite(cocktailId: string, isFavorite: boolean): void {
    let favorites = this.getFavorites();
    if (isFavorite) {

      favorites.push(cocktailId);
    } else {

      favorites = favorites.filter(id => id !== cocktailId);
    }

    localStorage.setItem(this.favoriteKey, JSON.stringify(favorites));
  }
}


