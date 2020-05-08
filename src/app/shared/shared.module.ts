import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { JwPaginationComponent } from './jw-pagination/jw-pagination.component';
import { ProductItemComponent } from '../main/products/product-list/product-item/product-item.component';
import { ShortenPipe } from './shorten.pipe';

import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [
    ProductItemComponent,
    JwPaginationComponent,
    CarouselComponent,
    ShortenPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ProductItemComponent,
    JwPaginationComponent,
    CarouselComponent,
    ShortenPipe,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class SharedModule {}
