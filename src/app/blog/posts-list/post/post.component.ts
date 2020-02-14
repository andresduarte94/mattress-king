import { Component, OnInit, ViewChild, ComponentFactoryResolver, ChangeDetectionStrategy, 
  ChangeDetectorRef, ViewContainerRef, Compiler, NgModule } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from '../../post.model';
import { BlogService } from '../../blog.service';
import { Author } from '../../author.model';
import { ProductsService } from 'src/app/products/products.service';
import { Product } from 'src/app/products/product.model';
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
  product: Product;
  @ViewChild('contentContainer', { static: false, read: ViewContainerRef }) contentContainer: ViewContainerRef;

  constructor(private activatedRoute: ActivatedRoute, private blogService: BlogService,
    private productsService: ProductsService, private router: Router, private cdr: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver, private _compiler: Compiler
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

    this.router.navigate(['/blog', this.nextId], {queryParams: {action: (Math.floor(Math.random()*1000)+1)}});
  }

  ngAfterViewInit() {
    let contentHtmlArray = this.post.content.split(new RegExp('{{[a-zA-Z0-9:]+}}', 'g'));
    let productIdsMatches = this.post.content.match(new RegExp('{{[a-zA-Z0-9:]+}}', 'g'));

    if (productIdsMatches != undefined) {
      var productIds = productIdsMatches.map((productId, i) => {
        return +productId.substring(12, productId.length - 2);
      });
    }

    let componentsArray = [];
    contentHtmlArray.forEach(contentTemplate => {
      const tmpCmp = Component({ template: contentTemplate })(class { });
      componentsArray.push(tmpCmp);
    });
    const tmpModule = NgModule({ declarations: componentsArray })(class { });

    this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
      .then((factories) => {
        const productItemCmpFactory = this.componentFactoryResolver.resolveComponentFactory(ProductItemComponent);
        
        factories.componentFactories.forEach((factory, i, array) => {
          const cmpRef = this.contentContainer.createComponent(factory);

          if ((i + 1) == array.length) { return; }
          const productItemRef = this.contentContainer.createComponent(productItemCmpFactory);
          const product = this.productsService.getProductById(productIds[i]);
          productItemRef.instance.product = product;

          this.cdr.detectChanges();
        })
      })
  }

  /*   ngOnDestroy() {
      if(this.productItemRef) {
        this.productItemRef.destroy();
      }
    } */

}
