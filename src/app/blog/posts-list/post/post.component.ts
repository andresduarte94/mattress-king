import { Component, OnInit, SecurityContext, Injector, ViewChild, ComponentFactoryResolver, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from '../../post.model';
import { BlogService } from '../../blog.service';
import { Author } from '../../author.model';
import { ProductsService } from 'src/app/products/products.service';
import { Product } from 'src/app/products/product.model';
import { ProductItemComponent } from 'src/app/products/product-list/product-item/product-item.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit {
  post: Post;
  postIndex: number;
  nextId: number;
  author: Author;
  postFormattedDate: string;
  product: Product;
   @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
   productItemRef;
   productItemRef2;
  private closeSub: Subscription; 



  constructor(private activatedRoute: ActivatedRoute, private blogService: BlogService,
    private productsService: ProductsService, private router: Router, private cdr: ChangeDetectorRef, private componentFactoryResolver: ComponentFactoryResolver
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.postIndex = +params.postIndex;
        this.post = this.blogService.getPostById(this.postIndex);
        if (typeof this.post === 'undefined') {
          this.post = this.blogService.getPostById(0);
        }

        this.author = this.blogService.getAuthorById(this.post.authorId);
        this.postFormattedDate = new Date(this.post.date * 1000).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
      }
    );
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

  ngAfterViewInit(){

    let content = document.createElement('div');
    content.innerHTML = `
    <p>introduction</p>
    <app-product-item>more text</app-product-item>
    <app-product-item>and more text</app-product-item>
    <button>button text</button>
  `;



     const productItemCmpFactory = this.componentFactoryResolver.resolveComponentFactory(ProductItemComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    //this.productItemRef = hostViewContainerRef.createComponent(productItemCmpFactory);
    this.productItemRef = hostViewContainerRef.createComponent(productItemCmpFactory, undefined, undefined, [[content]]);

    this.product =  this.productsService.getProductById(0);
    this.productItemRef.instance.product = this.product;

    this.productItemRef2 = hostViewContainerRef.createComponent(productItemCmpFactory, undefined, undefined, [[content]]);

    this.product =  this.productsService.getProductById(1);
    this.productItemRef.instance.product = this.product;




    this.cdr.detectChanges(); 

  }

/*   ngOnDestroy() {
    if(this.productItemRef) {
      this.productItemRef.destroy();
    }
  } */

}
