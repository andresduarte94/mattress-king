import { Component } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SEOService } from './shared/seo.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private activatedRoute : ActivatedRoute, private router: Router, private seoService: SEOService, private viewportScroller: ViewportScroller) { }

  ngOnInit() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => {
        console.log('dfg')
        this.viewportScroller.scrollToPosition([0, 0]);
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
       //this.viewportScroller.scrollToPosition([0, 0]);

     }); 
  }
}
