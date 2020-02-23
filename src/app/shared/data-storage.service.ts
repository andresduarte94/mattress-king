import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Product } from '../products/product.model';
import { ProductsService } from '../products/products.service';
import { BlogService } from '../blog/blog.service';
import { Post } from '../blog/post.model';
import { Author } from '../blog/author.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private productsService: ProductsService,
    private blogService: BlogService,
  ) { }

  fetchProducts() {
    return this.http
      .get<any[]>(
        'https://mattress-king-10b2e.firebaseio.com/products.json'
      )
      .pipe(
        map(productsJson => {
          let products = [];
          for (let [i, [fbId, product]] of Object.entries(Object.entries(productsJson))) {
            product.id = fbId;
            products[i] = product;
          };
          return products;
        }),
        tap((products: any[]) => {
          products.map((product, i) => {
            let sizeOptionsArray = product.sizes.split(';');
            // Trim, lowcase and push to sizes array each size
            sizeOptionsArray = sizeOptionsArray.map((sizeOption: string) => {
              return sizeOption.trim().toLowerCase();
            })
            products[i].sizes = sizeOptionsArray;
            return;
          })
          this.productsService.setProducts(products);
        })
      );
  }

  fetchPosts() {
    return this.http
      .get<Post[]>(
        'https://mattress-king-10b2e.firebaseio.com/posts.json'
      )
      .pipe(
        map(postsJson => {
          let posts = [];
          for (let [i, [fbId, post]] of Object.entries(Object.entries(postsJson))) {
            post.id = i;
            posts[i] = post;
          };
          return posts;
        }),
        tap(posts => {
          this.blogService.setPosts(posts);
        })
      );
  }

  fetchAuthors() {
    return this.http
      .get<Author[]>(
        'https://mattress-king-10b2e.firebaseio.com/authors.json'
      )
      .pipe(
        map(authorsJson => {
          let authors = [];
          for (let [i, [fbId, author]] of Object.entries(Object.entries(authorsJson))) {
            authors[i] = author;
          };
          return authors;
        }),
        tap(authors => {
          this.blogService.setAuthors(authors);
        })
      );
  }
}
