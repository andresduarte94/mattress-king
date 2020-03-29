import { Component, Inject } from '@angular/core';
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
        this.seoService.updateAllMetasForRoute(snapshot.url, snapshot.params);
        
        // Set route path in Google Analitycs configuration
        const routeURL = snapshot['_routerState'].url;
        gtag('config', 'UA-155272090-1', {
          'page_path': routeURL.slice(0, routeURL.indexOf('?'))
        });
      });
  }
}
