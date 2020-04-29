import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { JwPaginationComponent } from './jw-pagination/jw-pagination.component';
import { ProductItemComponent } from '../main/products/product-list/product-item/product-item.component';
import { ShortenPipe } from './shorten.pipe';

import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    ShortenPipe,
    JwPaginationComponent,
    ProductItemComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule
  ],
  exports: [
    ShortenPipe,
    CommonModule,
    ReactiveFormsModule,
    JwPaginationComponent,
    ProductItemComponent,
    MatSelectModule,
    MatCardModule
  ]
})
export class SharedModule {}
