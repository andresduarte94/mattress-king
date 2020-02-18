import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalService {
    private language: string = 'en';
    private country: string = 'all';
    private translations: any = {};

  constructor(
  ) {}

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

  getTranslations() {
    return this.translations;
  }

  setTranslations(translations: any) {
    this.translations = translations;
  }

  getTranslationLanguage(language: string) {
    console.log(this.translations);
    console.log(this.translations[language]);
    console.log(language);

    return this.translations[language];
  }
}