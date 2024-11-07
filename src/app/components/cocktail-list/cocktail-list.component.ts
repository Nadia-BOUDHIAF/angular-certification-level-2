import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { Cocktail } from '../../models/cocktail.interface';
import { CocktailService } from '../../services/cocktail/cocktail.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cocktail-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [CocktailService],
  templateUrl: './cocktail-list.component.html',
  styleUrl: './cocktail-list.component.scss'
})
export class CocktailListComponent implements OnInit, OnDestroy {
  cocktails = signal<Cocktail[]>([]);
  searchTerm = signal<string>('');
  private subscriptions: Subscription[] = []; 

  constructor(private cocktailService: CocktailService) { }


  ngOnInit(): void {
    const cocktailSub = this.cocktailService.getCocktails().subscribe((data) => {
      this.cocktails.set(data);
    });
    this.subscriptions.push(cocktailSub);
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  filteredCocktails = computed(() =>
    this.cocktails().filter(cocktail =>
      cocktail.name?.toLowerCase().includes(this.searchTerm().toLowerCase())
    )
  );

  isFavorite(cocktailId: string): boolean {
    return this.cocktailService.isFavorite(cocktailId);
  }


  toggleFavorite(cocktailId: string): void {
    const isCurrentlyFavorite = this.isFavorite(cocktailId);
    this.cocktailService.toggleFavorite(cocktailId, !isCurrentlyFavorite);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
