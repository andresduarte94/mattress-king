import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { MainModule } from './main/main.module';

const appRoutes: Routes = [
  {
    path: ':language',
    children: [
      {
        path: 'blog',
        loadChildren: () =>
          import("./blog/blog.module").then(m => m.BlogModule)
      },
      {
        path: '',
        loadChildren: () => MainModule
      },
      { path: '**', redirectTo: 'home' }
    ],
  },
  { path: '**', redirectTo: 'es/home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'top'}) //, enableTracing: true
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
