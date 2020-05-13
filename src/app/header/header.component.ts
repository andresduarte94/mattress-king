import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { ProductsService } from '../main/products/products.service';
import { Filter } from '../main/products/filter.model';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
import { GlobalService } from '../shared/global.service';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // Global variables
  countriesList: string[] = ['All countries', 'Amazon US', 'Amazon Spain'];
  countriesCodes: string[] = ['all', 'us', 'es'];
  languagesList: string[] = ['English', 'Español'];
  languagesCodes: string[] = ['en', 'es'];
  country: string;
  language: string;
  translationWords: any;
  componentWords: any;
  // Form variables
  countries = new FormControl();
  languages = new FormControl();
  productTypes: string[];
  searchForm: FormGroup;
  globalForm: FormGroup;
  // UI variables
  hideNavbar: boolean;
  public innerWidth: any;
  countriesLogos;
  languagesLogos;
  // Routing variables
  navigationEnd: Observable<NavigationEnd>;
  routePathParam: Observable<string>;
  routePathSubscription: Subscription;

  constructor(private productsService: ProductsService, private router: Router, private activatedRoute: ActivatedRoute,
    private globalService: GlobalService, private elRef: ElementRef) { }

  ngOnInit() {
    this.languagesLogos = {
      'en': 'assets/icons/english.png',
      'es': 'assets/icons/spanish.png'
    };
    this.countriesLogos = {
      'all': 'assets/icons/world-small.png',
      'us': 'assets/icons/usa.png',
      'es': 'assets/icons/spain.png'
    };
    // Product variables set-up
    this.productTypes = this.productsService.productTypes.slice();
    // Global variables set-up    
    this.country = this.globalService.getCountry();
    this.language = this.globalService.getLanguage();
    this.translationWords = this.globalService.getTranslationLanguage();
    this.componentWords = this.translationWords['header'];
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
        const child = firstChild.firstChild;
        if (child) {
          if (!child.snapshot['_routerState'].url.match(/products/)) {
            this.searchForm.controls['search'].setValue('');
          }

          return child.params.pipe(map(params => {
            const countryQueryParam = child.snapshot.queryParams['gl'];

            if (!this.languagesCodes.includes(params.language)) {
              this.router.navigateByUrl('/' + this.language + '/home');
            }
            if (params.language !== this.globalForm.controls['languages'].value) {
              this.language = params.language;
              if (countryQueryParam) {
                this.country = countryQueryParam;
              }
              this.globalForm.controls['languages'].setValue(this.language);
            }

            return countryQueryParam;
          }));
        }
        else {
          return of(null);
        }
      })
    );
    // Update language select based on route
    this.routePathSubscription = this.routePathParam.subscribe((countryQueryParam) => {
      if (countryQueryParam && countryQueryParam !== this.globalForm.controls['countries'].value) {
        this.country = countryQueryParam;
        this.globalForm.controls['countries'].setValue(countryQueryParam);
      }
    });
    // Create, initialize and set subscriptions for header forms
    this.createReactiveHeaderForms();
    // Update UI variables
    this.innerWidth = window.innerWidth;
    this.hideNavbar = this.innerWidth <= 762;
  }

  createReactiveHeaderForms() {
    // Create reactive form for country and language
    this.globalForm = new FormGroup({
      'countries': new FormControl(this.country),
      'languages': new FormControl(this.language)
    });
    this.searchForm = new FormGroup({
      'search': new FormControl(''),
    });
    // Navigating with country query parameter change
    this.globalForm.controls['countries'].valueChanges.subscribe(
      (country) => {
        // Update country
        this.country = country;
        this.globalService.setCountry(this.country);
        // Update country icon
        let countrySelected = this.elRef.nativeElement.querySelector('.global-logo-country');
        countrySelected.src = this.countriesLogos[this.country];
        // Route to update language and country variables
        const activatedRouteURL = this.activatedRoute.snapshot['_routerState'].url;
        const baseURL = activatedRouteURL === '/' ? '/home' : activatedRouteURL.indexOf('?') > -1 ? activatedRouteURL.slice(3, activatedRouteURL.indexOf('?')) : activatedRouteURL.slice(3);
        const countryParameter = country == 'all' ? '' : `?gl=${country}`;
        const newRoute = '/' + this.language + baseURL + countryParameter;
        if (activatedRouteURL !== newRoute) {
          this.router.navigateByUrl(newRoute);
        }
      });
    // Navigating with language parameter change
    this.globalForm.controls['languages'].valueChanges.subscribe(
      (language) => {
        // Update language and translation words
        this.language = language;
        this.globalService.setLanguage(language);
        this.translationWords = this.globalService.getTranslationLanguage();
        this.componentWords = this.translationWords['header'];
        // Update language icon
        let languageSelected = this.elRef.nativeElement.querySelector('.global-logo-language');
        languageSelected.src = this.languagesLogos[this.language];
        // Route to update language and country variables
        const activatedRouteURL = this.activatedRoute.snapshot['_routerState'].url;
        const baseURL = activatedRouteURL === '/' ? '/home' : activatedRouteURL.indexOf('?') > -1 ? activatedRouteURL.slice(3, activatedRouteURL.indexOf('?')) : activatedRouteURL.slice(3);
        const countryParameter = this.country == 'all' ? '' : `?gl=${this.country}`;
        const newRoute = '/' + this.language + baseURL + countryParameter;
        if (activatedRouteURL !== newRoute) {
          this.router.navigateByUrl(newRoute);
        }
      });
    // Updating products on search input change
    this.searchForm.controls['search'].valueChanges.subscribe(
      (search) => {
        // Update name and description filter
        this.onSearchChange();
      });
  }

  onSearchChange() {
    const search = this.searchForm.controls['search'].value;
    const activatedRouteURL = this.activatedRoute.snapshot['_routerState'].url;
    if (activatedRouteURL.match(/products/)) {
      // Update name and description filter if routing is within products
      let filter: Filter = {};
      filter.search = search;
      this.productsService.filterUpdateEvent.next(filter);
    }
    else {
      // Avoid navigating to products if search bar is empty outside products path
      if (search == '') {
        return;
      }
      // Navigate to products path with search params when using search bar outside products
      if (this.country == 'all') {
        this.router.navigate([this.language, 'products', 'all'], {
          queryParams: {
            search: search
          }
        });
      }
      else {
        this.router.navigate([this.language, 'products', 'all'], {
          queryParams: {
            gl: this.country,
            search: search
          }
        });
      }
    }
  }

  changeProductType(category: string) {
    if (this.country == 'all') {
      this.router.navigate([this.language, 'products', category.toLowerCase()]);
    }
    else {
      this.router.navigate([this.language, 'products', category.toLowerCase()], { queryParams: { gl: this.country } });
    }
  }

  toggleNavbar() {
    this.hideNavbar = !this.hideNavbar;
  }

  navigateTo(route: string) {
    if (this.country == 'all') {
      this.router.navigate([this.language, route]);
    }
    else {
      this.router.navigate([this.language, route], {
        queryParams: {
          gl: this.country
        }
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.innerWidth == window.innerWidth) {
      return;
    }
    this.innerWidth = window.innerWidth;
    this.hideNavbar = this.innerWidth <= 762;
  }

  ngAfterContentInit() {
    const selectedElements = this.elRef.nativeElement.querySelectorAll('.mat-select-value');
    let languageSelected = selectedElements[0];
    let countrySelected = selectedElements[1];
    const languageString = `<img class="global-logo-language" src="${this.languagesLogos[this.language]}">`;
    const countryString = `<img class="global-logo-country" src="${this.countriesLogos[this.country]}">`;
    languageSelected.insertAdjacentHTML('beforeend', languageString);
    countrySelected.insertAdjacentHTML('beforeend', countryString);
  }

  ngOnDestroy() {
    if (this.routePathSubscription) {
      this.routePathSubscription.unsubscribe();
    }
  }
}