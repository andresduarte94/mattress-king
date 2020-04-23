import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { SharedModule } from './shared/shared.module';
import { HeroLoaderModule } from '@herodevs/hero-loader';

import { SEOService } from './shared/seo.service';
import { GlobalService } from './shared/global.service';
import { MainComponent } from './main/main.component';
import { NouisliderModule } from 'ng2-nouislider';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProductsComponent } from './main/products/products.component';
import { ProductListComponent } from './main/products/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    ProductsComponent,
    ProductListComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    HeroLoaderModule,
    NouisliderModule,
    MatRadioModule,
    MatSliderModule,
    MatCheckboxModule
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
