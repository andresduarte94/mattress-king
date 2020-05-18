import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductFilterComponent } from './product-filter.component';
import { NouisliderModule } from 'ng2-nouislider';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [ProductFilterComponent],
    imports: [
      CommonModule,
      RouterModule,
      NouisliderModule,
      MatRadioModule,
      MatSliderModule,
      MatCheckboxModule,
      SharedModule
    ],
    exports: [],
    providers: [],
    bootstrap: [ProductFilterComponent]
  })
  export class ProductFilterModule {}