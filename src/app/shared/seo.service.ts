import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BlogService } from '../blog/blog.service';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SEOService {
    seoData: any;

    constructor(private http: HttpClient, private title: Title, private meta: Meta, private blogService: BlogService,
        @Inject(DOCUMENT) private _document: any) { }

    updateAllMetasForRoute(url: any, params: any) {
        // Update HTML language attr
        let language = params.language;
        this._document.documentElement.lang = language;

        let path1 = url[0].path;
        let title = this.seoData[language][path1].title;
        let description = this.seoData[language][path1].description;
        console.log(path1);
        console.log(language);

        if (Object.keys(params).length > 1) {
            if (path1 == 'products') {
                let productType = this.seoData[language][path1][params.productType];
                productType = productType.replace(/\b\w/, v => v.toUpperCase());
                title = title.replace('{{ productType }}', productType);
                description = description.replace('{{ productType }}', productType);
            }
            else if (path1 == 'blog') {
                const post = this.blogService.getPostById(params.postIndex);
                title = this.seoData[language].post.title;
                description = this.seoData[language].post.description;
                title = title.replace('{{ title }}', post.title);
                description = description.replace('{{ author }}', this.blogService.getAuthorById(post.authorId).name);
                description = description.replace('{{ date }}', new Date(post.date * 1000).toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }));
                description = description.replace('{{ summary }}', post.summary);
            }
        }
        this.updateTitle(title);
        this.updateDescription(description);
    }

    updateTitle(title: string) {
        this.title.setTitle(title);
    }

    updateDescription(desc: string) {
        this.meta.updateTag({ name: 'description', content: desc })
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