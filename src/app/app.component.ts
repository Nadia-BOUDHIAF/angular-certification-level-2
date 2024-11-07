import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CocktailDetailsComponent } from "./components/cocktail-details/cocktail-details.component";
import { CocktailListComponent } from "./components/cocktail-list/cocktail-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CocktailDetailsComponent, CocktailListComponent],
  templateUrl: 'app.component.html',
})
export class AppComponent {
}
