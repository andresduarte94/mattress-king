import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { Product } from '../products/product.model';
import { ProductsService } from '../products/products.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private productsService: ProductsService
  ) {}

  fetchProducts() {
    return this.http
      .get<Product[]>(
        'https://mattress-king-10b2e.firebaseio.com/products.json'
      )
      .pipe(
        map(productsJson => {
            let products = [];
            for(let [i, [fbId, product]] of Object.entries(Object.entries(productsJson))) { 
                product.id = fbId;
                products[i] = product; 
            };
            return products;
        }),
        tap(products => {
          this.productsService.setProducts(products);
        })
      );
  }

/* 
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  } */
}
