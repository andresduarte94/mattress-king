import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { MainModule } from './main/main.module';
import { SharedModule } from './shared/shared.module';
import { HeroLoaderModule } from '@herodevs/hero-loader';

import { SEOService } from './shared/seo.service';
import { GlobalService } from './shared/global.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MainModule,
    SharedModule,
    HeroLoaderModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (globalService: GlobalService) =>
        () => globalService.fetchTranslations(),
      deps: [GlobalService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (seoService: SEOService) =>
        () => seoService.fetchSEO(),
      deps: [SEOService],
      multi: true
    }
  ]
})
export class AppModule { }
