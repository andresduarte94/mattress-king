import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GlobalService {
    private language: string = 'en';
    private country: string = 'all';
    private translations: any[];
    private translationLanguage: any;

  constructor(
    private http: HttpClient,
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
    return this.translations.slice();
  }

  setTranslations(translations: any[]) {
    this.translations = translations;
  }

  getTranslationLanguage() {
    this.translationLanguage = this.translations[this.language];
    return this.translationLanguage.slice();
  }
}