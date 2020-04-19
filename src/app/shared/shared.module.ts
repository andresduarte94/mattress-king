import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ShortenPipe } from './shorten.pipe';

import { MatSelectModule } from '@angular/material/select';
import { JwPaginationComponent } from './jw-pagination/jw-pagination.component';
import { ProductItemComponent } from '../main/products/product-list/product-item/product-item.component';

@NgModule({
  declarations: [
    ShortenPipe,
    JwPaginationComponent,
    ProductItemComponent,
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  exports: [
    ShortenPipe,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    JwPaginationComponent,
    ProductItemComponent
  ]
})
export class SharedModule {}
