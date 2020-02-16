import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ShortenPipe } from './shorten.pipe';
//import { LoggingService } from '../logging.service';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ShortenPipe
  ],
  imports: [CommonModule, ],
  exports: [
    LoadingSpinnerComponent,
    ShortenPipe,
    CommonModule
  ]
})
export class SharedModule {}
