import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SEOService {
    seoData: any;

    constructor(private http: HttpClient, private title: Title, private meta: Meta) { }

    updateAllMetas(url: any, params: any) {
        
let language = params.language;
let path1 = url[0].path;
let title = this.seoData[language][path1];
let description = 

console.log(params);
console.log(language)
console.log(path1);

if(params.length <= 1) {

}


    }

    updateTitle(title: string) {
        this.title.setTitle(title);
    }

    updateOgUrl(url: string) {
        this.meta.updateTag({ name: 'og:url', content: url })
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
                    console.log(seoData)
                })
            ).toPromise();
    }
}