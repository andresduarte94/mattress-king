import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GlobalService {
  private language: string = 'en';
  private country: string = 'all';
  private translations: any = {};
  updateSubComponentLanguage = new Subject<any>();

  constructor(private http: HttpClient) { }

  getLanguage() {
    return this.language.slice();
  }

  setLanguage(language: string) {
    this.language = language;
  }

  getCountry() {
    return this.country.slice();
  }

  setCountry(country: string) {
    this.country = country;
  }

  getTranslationLanguage() {
    return this.translations[this.language];
  }

  fetchTranslations(): Promise<any> {
    return this.http
      .get<any>(
        'https://mattress-king-10b2e.firebaseio.com/translations.json'
      )
      .pipe(
        map(translationsJson => {
          let translations = {};
          for (let [i, [fbId, translation]] of Object.entries(Object.entries(translationsJson))) {
            let language = Object.keys(translation)[0];
            translations[language] = translation[language];
          };
          return translations;
        }),
        tap(translations => {
          this.translations = translations;
        })
      ).toPromise();
  }
}