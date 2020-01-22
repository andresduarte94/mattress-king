import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';
import { ShortenPipe } from './shorten.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//import { LoggingService } from '../logging.service';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    ShortenPipe
  ],
  imports: [CommonModule, FontAwesomeModule],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    ShortenPipe,
    FontAwesomeModule,
    CommonModule
  ]
  //entryComponents: [AlertComponent],
  //providers: [LoggingService]
})
export class SharedModule {}