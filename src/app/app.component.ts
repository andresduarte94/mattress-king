import { Component } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SEOService } from './shared/seo.service';
import { ScriptLoader } from './shared/scriptLoader.service';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private seoService: SEOService,
    private scriptLoader: ScriptLoader, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {

     }

  ngOnInit() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => {
        return this.activatedRoute;
      }),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      map((route) => {
        return route.snapshot;
      })
    )
      .subscribe((snapshot: any) => {
        // Get route path without query parameters
        let routeURL = snapshot['_routerState'].url;
        const lastIndex = routeURL.indexOf('?');
        routeURL = lastIndex > -1 ? routeURL.slice(0, lastIndex) : routeURL.slice(0);

        // Update Title and Decription metas according to path
        this.seoService.updateAllMetasForRoute(routeURL, snapshot.params);

        // Set canonical relation on page
        this.seoService.createCanonicalURL(routeURL, snapshot.params, snapshot.queryParams);
        // Change lang attribute
        this.seoService.changeLangAttribute(snapshot.params.language);

        // Set route path in Google Analitycs configuration
        gtag('config', 'UA-163785252-1', {
          'page_path': routeURL
        });

      });
      this.registerSvgs();
  }

  ngAfterViewInit() {
    this.scriptLoader.loadScriptsAndStyles();
  }

  registerSvgs() {
    this.iconRegistry.addSvgIcon('menu', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/menu-24px.svg'));
    this.iconRegistry.addSvgIcon('filter_menu', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/filter_list-24px.svg'));
    this.iconRegistry.addSvgIcon('search', this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/search-24px.svg'));
  }
}