import { Component } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SEOService } from './shared/seo.service';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private seoService: SEOService) { }

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
        this.seoService.createCanonicalURL();

        // Change lang attribute
        this.seoService.changeLangAttribute(snapshot.params.language);

        // Set route path in Google Analitycs configuration
        gtag('config', 'UA-163785252-1', {
          'page_path': routeURL
        });

      });
  }

}
