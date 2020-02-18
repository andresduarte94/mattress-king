import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { DataStorageService } from './data-storage.service';
import { GlobalService } from './global.service';

@Injectable({ providedIn: 'root' })
export class globalResolverService implements Resolve<any[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private globalService: GlobalService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const translations = this.globalService.getTranslations();

    if (Object.entries(translations).length === 0) {
      return this.dataStorageService.fetchTranslations();
    } else {
      return translations;
    }
  }
}