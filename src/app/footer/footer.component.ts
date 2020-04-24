import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../shared/global.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { ProductsService } from '../main/products/products.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  //Global variables
  country: string;
  language: string;
  translationWords: any;
  componentWords: any;

  //Product variables
  productTypes: string[];

  //Routing variables
  navigationEnd: Observable<NavigationEnd>;
  routePathParam: Observable<string>;

  constructor(private globalService: GlobalService, private activatedRoute: ActivatedRoute, private router: Router,
    private productsService: ProductsService) { }

  ngOnInit() {
    // Global variables set-up
    this.country = this.globalService.getCountry();
    this.language = this.globalService.getLanguage();
    this.translationWords = this.globalService.getTranslationLanguage();
    this.componentWords = this.translationWords['footer'];
    // Product variables set-up
    this.productTypes = this.productsService.productTypes;

    // Get params from route when navigation ends
    this.navigationEnd = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => <NavigationEnd>event)
    );
    this.routePathParam = this.navigationEnd.pipe(
      map(() => {
        return this.activatedRoute.root.firstChild;
      }),
      switchMap(firstChild => {
        if (firstChild) {
          return firstChild.firstChild.params.pipe(map(params => {
            // Update language and translation words
            this.language = params.language;
            this.country = this.globalService.getCountry();
            this.translationWords = this.globalService.getTranslationLanguage();
            this.componentWords = this.translationWords['footer'];
            return params;
          }));
        }
        else {
          return of(null);
        }
      })
    )
    this.routePathParam.subscribe(() => {});
  }
}