import { NgModule } from '@angular/core';
import { FooterComponent } from './footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [FooterComponent],
    imports: [
      CommonModule,
      RouterModule 
    ],
    exports: [],
    providers: [],
    bootstrap: [FooterComponent]
  })
  export class FooterModule {}