import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/main/products/product.model';
import { ProductsService } from 'src/app/main/products/products.service';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss']
})
export class PostContentComponent implements OnInit {
  @Input() postId: number;
  products: Product[];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.products = this.productsService.getProducts();
  }

}
