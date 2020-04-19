import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';

import { NouisliderModule } from 'ng2-nouislider';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [
    MainComponent,
    ProductsComponent,
    ProductListComponent
  ],
  imports: [
    RouterModule,
    MainRoutingModule,
    SharedModule,
    NouisliderModule,
    MatRadioModule,
    MatSliderModule,
    MatCheckboxModule
  ]
})
export class MainModule {}
