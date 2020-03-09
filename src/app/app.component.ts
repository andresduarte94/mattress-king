import { Component } from '@angular/core';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SEOService } from './shared/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private activatedRoute : ActivatedRoute, private router: Router, private seoService: SEOService) { }

  ngOnInit() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => {
        console.log(route.snapshot);
        return route.data;
      })
     )
     .subscribe((event) => {
       this.seoService.updateAllMetas(event);
       //this.seoService.updateTitle(event['title']);
       //this.seoService.updateOgUrl(event['ogUrl']);
       //Updating Description tag dynamically with title
       //this.seoService.updateDescription(event['description'])
     }); 
  }




}
