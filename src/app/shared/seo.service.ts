import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SEOService {
    seoData: any;

    constructor(private http: HttpClient, private title: Title, private meta: Meta) { }

    updateAllMetas(routeObj: any) {

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
                    for (let [i, [fbId, seoDataLanguage]] of Object.entries(Object.entries(seoDataJson))) {
                        let language = Object.keys(seoDataLanguage)[0];
                        seoData[language] = seoData[language];
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