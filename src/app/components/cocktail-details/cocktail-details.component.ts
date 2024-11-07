import { Component, OnDestroy, OnInit } from '@angular/core';
import { CocktailService } from '../../services/cocktail/cocktail.service';
import { Cocktail } from '../../models/cocktail.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cocktail-details',
  standalone: true,
  imports: [CommonModule],
  providers: [CocktailService],
  templateUrl: './cocktail-details.component.html',
  styleUrl: './cocktail-details.component.scss'
})
export class CocktailDetailsComponent implements OnInit, OnDestroy {
  cocktail: Cocktail;
  isFavorite: boolean = false;
  private subscriptions: Subscription[] = []; 
  constructor(private cocktailService: CocktailService,
              private activatedRoute: ActivatedRoute,
              private route: Router) {}


  ngOnInit(): void {
    const sub = this.activatedRoute.paramMap.subscribe(params => {
      const cocktailId = params.get('id');
      if (cocktailId) {
        this.cocktailService.getCocktailsDetailsById(cocktailId).subscribe((cocktail) => {
          this.cocktail = cocktail;
          this.isFavorite = this.cocktailService.isFavorite(cocktail.id);
        });
      }
    });
    this.subscriptions.push(sub);
  }

  goBack(): void {
    this.route.navigate(['cocktails']);
  }

  toggleFavorite(): void {
    if (this.cocktail) {
      this.isFavorite = !this.isFavorite;
      this.cocktailService.toggleFavorite(this.cocktail.id, this.isFavorite);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
