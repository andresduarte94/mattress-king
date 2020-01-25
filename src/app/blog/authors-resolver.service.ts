import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { DataStorageService } from '../shared/data-storage.service';
import { BlogService } from './blog.service';
import { Author } from './author.model';

@Injectable({ providedIn: 'root' })
export class AuthorsResolverService implements Resolve<Author[]> {

  constructor(
    private dataStorageService: DataStorageService,
    private blogService: BlogService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const authors = this.blogService.getAuthors();
    if (authors.length === 0) {
      return this.dataStorageService.fetchAuthors();
    } else {
      return authors;
    }
  }
}