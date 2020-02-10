import { Component, OnInit, SecurityContext, Injector } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from '../../post.model';
import { BlogService } from '../../blog.service';
import { Author } from '../../author.model';
import { ProductsService } from 'src/app/products/products.service';
import { Product } from 'src/app/products/product.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductItemComponent } from 'src/app/products/product-list/product-item/product-item.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post;
  postIndex: number;
  nextId: number;
  author: Author;
  postFormattedDate: string;
  products: Product[];
  safeContent: SafeHtml;
  public component = {
      label: 'Product item',
      component: ProductItemComponent
    };
    injector: Injector;

  constructor(private activatedRoute: ActivatedRoute, private blogService: BlogService,
    private productsService: ProductsService, private router: Router, private sanitizer: DomSanitizer, private inj: Injector) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.postIndex = +params.postIndex;
        this.post = this.blogService.getPostById(this.postIndex);
        if (typeof this.post === 'undefined') {
          this.post = this.blogService.getPostById(0);
        }
        this.safeContent = this.sanitizer.sanitize(SecurityContext.HTML, this.post.content);
        //this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.post.content);

        this.author = this.blogService.getAuthorById(this.post.authorId);
        this.postFormattedDate = new Date(this.post.date * 1000).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
      }
    );

    this.products = this.productsService.getProducts(null);

/*     this.injector = Injector.create([
      { provide: PRODUCT, useValue: this.products[0] }
    ], this.inj); */
  }

  nextArticle() {
    var post = this.blogService.getPostById(this.postIndex + 1);
    if (typeof post === 'undefined') {
      this.nextId = 0;
    }
    else {
      this.nextId = ++this.postIndex;
    }
    this.router.navigate(['/blog', this.nextId]);
  }

}
