import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TranslationService {
    private language: string = 'us';

  constructor(
    private http: HttpClient,
  ) {}

  getLanguage() {
    return this.language.slice();
  }

  setLanguage(language: string) {
    this.language = language;
  }



}