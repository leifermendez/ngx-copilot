import { NgModule } from '@angular/core';
import { NgxCopilotComponent } from './ngx-copilot.component';
import { CopilotDirective } from './copilot.directive';
import { NgxWrapperCopilotComponent } from './ngx-wrapper-copilot/ngx-wrapper-copilot.component';
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [NgxCopilotComponent, CopilotDirective, NgxWrapperCopilotComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxCopilotComponent, CopilotDirective, NgxWrapperCopilotComponent]
})
export class NgxCopilotModule { }
