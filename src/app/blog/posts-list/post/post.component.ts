import { Component, OnInit, SecurityContext, Injector, ViewChild, ComponentFactoryResolver, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, Renderer2, ViewContainerRef, TemplateRef } from '@angular/core';
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
/*    @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
   @ViewChild('content', { static: false, read: ViewContainerRef}) content: ViewContainerRef;
   @ViewChild('content2', { static: false, read: ViewContainerRef}) content2: ViewContainerRef;

   @ViewChild('test', { static: false, read: TemplateRef}) test: TemplateRef<any>;

   safeContent;
   productItemRef;
   productItemRef2;
   nativeContentElement;
  private closeSub: Subscription;  */



  constructor(private activatedRoute: ActivatedRoute, private blogService: BlogService,
    private productsService: ProductsService, private router: Router, private cdr: ChangeDetectorRef, 
    private componentFactoryResolver: ComponentFactoryResolver, private renderer: Renderer2
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

/*     this.safeContent.innerHTML = `
    <p>introduction</p>
    <div id="product1"></div>
    <button>button text</button>
  `; */
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
/* 
     const productItemCmpFactory = this.componentFactoryResolver.resolveComponentFactory(ProductItemComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    //this.productItemRef = hostViewContainerRef.createComponent(productItemCmpFactory);

    this.productItemRef = hostViewContainerRef.createComponent(productItemCmpFactory, undefined, undefined, [[content]]);
    let product =  this.productsService.getProductById(0);
    this.productItemRef.instance.product = product;

    this.productItemRef2 = hostViewContainerRef.createComponent(productItemCmpFactory, undefined, undefined, [[content]]);
    let product2 =  this.productsService.getProductById(1);
    this.productItemRef2.instance.product = product2;

    this.nativeContentElement = this.alertHost.viewContainerRef.element.nativeElement;

    //var node = document.createElement("div");  
    //console.log(node)               // Create a <li> node
//node.innerHTML = 'test satu dua tiga';
// Create a text node
//this.nativeContentElement.appendChild(node);
//this.content.el.nativeElement.appendChild(node);
//@ViewChild('content2', { static: false, read: ViewContainerRef}) content2: ViewContainerRef;
@ViewChild('product1', { static: false}) let product1: ElementRef;

const p = this.renderer.createElement('p');
const text = this.renderer.createText('Click here to add li');
this.renderer.appendChild(p, text);
this.renderer.appendChild(product1.nativeElement, p);

//this.content.createEmbeddedView(this.test);
//this.content.createEmbeddedView(this.content2.element);

let content = document.createElement('<div>fddksandkldsn</div>');

    this.cdr.detectChanges(); 
 */
  }

/*   ngOnDestroy() {
    if(this.productItemRef) {
      this.productItemRef.destroy();
    }
  } */

}
