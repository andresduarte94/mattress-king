import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BlogService } from '../blog/blog.service';
import { DOCUMENT } from '@angular/common';
import { Post } from '../blog/post.model';

@Injectable({ providedIn: 'root' })
export class SEOService {
    seoData: any;
    postURLTitlesArray: string[];

    constructor(private http: HttpClient, private title: Title, private meta: Meta, private blogService: BlogService,
        @Inject(DOCUMENT) private _document: any) { }

    updateAllMetasForRoute(url: any, params: any) {
        let language = params.language;
        if(!['es', 'us'].includes(language)){
            language = 'en';
        }
        // SEO variables and path
        let path1 = url.split('/')[2];
        if (!path1) {
            language = 'en';
            path1 = 'home';
        }
        let description = this.seoData[language][path1].description;
        let pageTitle = this.seoData[language][path1].title;

        if (Object.keys(params).length > 1) {
            if (path1 == 'products') {
                let productType = this.seoData[language][path1][params.productType];
                productType = productType.replace(/\b\w/, v => v.toUpperCase());
                pageTitle = pageTitle.replace('{{ productType }}', productType);
                description = description.replace('{{ productType }}', productType);
            }
            else if (path1 == 'blog') {
                const postParam = params.postUrl;
                let post: Post;
                if (!isNaN(postParam)) {
                    post = this.blogService.getPostById(postParam);
                }
                else {
                    post = this.blogService.getPostByUrl(postParam);
                }
                pageTitle = this.seoData[language].post.title;
                description = this.seoData[language].post.description;
                pageTitle = pageTitle.replace('{{ title }}', post.title);
                description = description.replace('{{ author }}', this.blogService.getAuthorById(post.authorId).name);
                description = description.replace('{{ date }}', new Date(post.date * 1000).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }));
                description = description.replace('{{ summary }}', post.summary);
            }
        }
        // Update HTML language attribute, title and description meta
        this.changeLangAttribute(language);
        this.updateTitle(pageTitle);
        this.updateDescription(description);
    }

    updateTitle(pageTitle: string) {
        this.title.setTitle(pageTitle);
    }

    updateDescription(desc: string) {
        this.meta.updateTag({ name: 'description', content: desc })
    }

    changeLangAttribute(language: string) {
        this._document.documentElement.lang = language;
    }

    createCanonicalURL(url: string, params: any, queryParams: any) {
        let canonicalUrl = this._document.URL;
        let canonicalLink = this._document.querySelector('[rel="canonical"]');
        if (canonicalLink == null) {
            canonicalLink = this._document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            this._document.head.appendChild(canonicalLink);
        }

        let pathArray = url.split('/').slice(1);
        if( url == '/en/home' && !queryParams.gl) {
            canonicalUrl = 'https://www.mattressfinder.shop';
        }
        else if( pathArray[1] == 'blog' && params.postUrl) {
            let postUrl = params.postUrl;
            if( !isNaN(postUrl) ) {
                postUrl = this.blogService.getPostById(params.postUrl).url;
            }
            canonicalUrl= `https://www.mattressfinder.shop/es/blog/${postUrl}`
        }
        else if( pathArray[1] == 'blog' ) {
            canonicalUrl = `https://www.mattressfinder.shop/${params.language}/blog`;
        }
        canonicalLink.setAttribute('href', canonicalUrl);
    }

    fetchSEO(): Promise<any> {
        return this.http
            .get<any>(
                'https://mattress-king-10b2e.firebaseio.com/seo.json'
            )
            .pipe(
                map(seoDataJson => {
                    let seoData = {};
                    for (let [i, [fbId, seoDataIdObject]] of Object.entries(Object.entries(seoDataJson))) {
                        let language = Object.keys(seoDataIdObject)[0];
                        seoData[language] = seoDataIdObject[language];
                    };
                    return seoData;
                }),
                tap(seoData => {
                    this.seoData = seoData;
                })
            ).toPromise();
    }
}