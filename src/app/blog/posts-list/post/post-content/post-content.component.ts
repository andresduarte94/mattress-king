import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/products/product.model';
import { ProductsService } from 'src/app/products/products.service';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.css']
})
export class PostContentComponent implements OnInit {
  @Input() postId: number;
  products: Product[];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.products = this.productsService.getProducts();
  }

}
