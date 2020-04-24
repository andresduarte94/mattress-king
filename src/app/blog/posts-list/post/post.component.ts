import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from '../../post.model';
import { BlogService } from '../../blog.service';
import { Author } from '../../author.model';
import { GlobalService } from 'src/app/shared/global.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  //Global variables
  country: string;
  language: string;
  translationWords: any;
  componentWords: any;

  //Post variables
  post: Post;
  author: Author;
  postFormattedDate: string;
  @ViewChild('contentContainer', { static: false, read: ViewContainerRef }) contentContainer: ViewContainerRef;
  postImageSize: string;

  // Subscriptions
  breakpointSub: Subscription;

  constructor(private globalService: GlobalService, private activatedRoute: ActivatedRoute, private blogService: BlogService,
    private router: Router, private location: Location, public breakpointObserver: BreakpointObserver 
    /*private productsService: ProductsService, private cdr: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver, private _compiler: Compiler*/
  ) { }

  ngOnInit() {
    //Global variables initialization
    this.country = this.globalService.getCountry();
    this.language = this.globalService.getLanguage();
    this.translationWords = this.globalService.getTranslationLanguage();
    this.componentWords = this.translationWords['post'];

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        //Update language and translation words
        this.language = params.language;
        this.translationWords = this.globalService.getTranslationLanguage();
        this.componentWords = this.translationWords['post'];

        //Update post information
        const postParam = params.postUrl;
        if (!isNaN(postParam)) {
          this.post = this.blogService.getPostById(postParam);
          this.location.replaceState(this.language + '/blog/' + this.post.url)
        }
        else {
          this.post = this.blogService.getPostByUrl(postParam);
        }
        this.author = this.blogService.getAuthorById(this.post.authorId);
        this.postFormattedDate = new Date(this.post.date * 1000).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
      }
    );

    // Set product responsive images depending on viewport size
    this.breakpointSub = this.createBreakpointsSubscription();
  }

  nextArticle() {
    let nextPost = this.blogService.getPostById(this.post.id + 1);
    if (!nextPost) {
      nextPost = this.blogService.getPostById(0);
    }
    this.router.navigate(['../', nextPost.url], { relativeTo: this.activatedRoute });
  }

  createBreakpointsSubscription() {
    // Set product image url and update the change
    return this.breakpointObserver
      .observe(['(max-width: 450px)', '(max-width: 790px)'])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints['(max-width: 450px)']) {
          this.postImageSize = '-small';
        }
        else if (state.breakpoints['(max-width: 760px)']) {
          this.postImageSize = '-medium';
        }
        else {
          this.postImageSize = '-large';
        }
      });
  }

  ngOnDestroy() {
    this.breakpointSub.unsubscribe();
  }

  // Generate post content on the fly - Commented until implementing a way of only use JIT compiler for this component
  /* ngAfterViewInit() {
    //Generate post content on the fly with product-item components
    //Array with html parts
    let contentHtmlArray = this.post.content.split(new RegExp('{{[a-zA-Z0-9:]+}}', 'g'));

    //Array with product Ids to display
    let productIdsMatches = this.post.content.match(new RegExp('{{[a-zA-Z0-9:]+}}', 'g'));
    if (productIdsMatches != undefined) {
      var productIds = productIdsMatches.map((productId, i) => {
        return +productId.substring(12, productId.length - 2);
      });
    }

    //Array with components of html parts
    let componentsArray = [];
    contentHtmlArray.forEach(contentTemplate => {
      const tmpCmp = Component({ template: contentTemplate })(class { });
      componentsArray.push(tmpCmp);
    });
    const tmpModule = NgModule({ declarations: componentsArray })(class { });

    //Compile all html parts mixed with product-item components
    this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
      .then((factories) => {
        const productItemCmpFactory = this.componentFactoryResolver.resolveComponentFactory(ProductItemComponent);

        //Loop trough each html part factory
        factories.componentFactories.forEach((factory, i, array) => {
          //Insert html part
          const cmpRef = this.contentContainer.createComponent(factory);

          //Don't insert product-item component after last html part
          if ((i + 1) == array.length) { return; }
          const productItemRef = this.contentContainer.createComponent(productItemCmpFactory);
          const product = this.productsService.getProductById(productIds[i]);
          productItemRef.instance.product = product;

          //Update component changes
          this.cdr.detectChanges();
        })
      })
  } */
}