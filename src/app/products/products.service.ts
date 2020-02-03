import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Product } from './product.model';
import { Filter } from './product-display/filter.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  filterChanged = new Subject<Filter>();
  private products: Product[] = [];
  readonly productTypes: string[] = ['Mattresses', 'Beds', 'Sheets', 'Pillows', 'Accessories'];

  getProducts(filter?: Filter) {
    let products = this.products.slice();
    if (!filter) {
      return products;
    }

    products = products.filter(function (product) {
      return (filter.hasOwnProperty('type') ? (product.type == filter.type) : (true)) &&
        ((filter.hasOwnProperty('name') ? (RegExp(filter.name, 'i').test(product.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) : (true)) ||
          (filter.hasOwnProperty('description') ? (RegExp(filter.description, 'i').test(product.description.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) : (true))) &&
        (filter.hasOwnProperty('score') ? (product.score >= filter.score) : (true)); //&&
      //(filter.hasOwnProperty('price')? (product.price <= filter.price) : (true));
    });

    return products;
  }

  setProducts(products: Product[]) {
    this.products = products;
    //this.recipesChanged.next(this.products.slice());
  }

  getProductTypeId(productType: string) {
    productType = productType.charAt(0).toUpperCase() + productType.slice(1);
    return this.productTypes.indexOf(productType);
  }


  onFilterChange(filter: Filter) {

  }

  getSizes(type: number) {
    let filteredProducts: Product[] = this.products.filter((product) => {
      return (product.type == type);
    });

    let sizes = filteredProducts.reduce((sizes, product) => {
      sizes.push(product.size);
      return sizes;
    }, []);
    
    var seen = {};
    return sizes.filter(function(size) {
        return seen.hasOwnProperty(size) ? false : (seen[size] = true);
    });
  }






  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
  //   ),
  //   new Recipe(
  //     'Big Fat Burger',
  //     'What else you need to say?',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //     [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
  //   )
  // ];
  /* private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
 */



}