import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnInit,
  TemplateRef
} from '@angular/core';
import {NgxCopilotService} from "./ngx-copilot.service";

@Directive({
  selector: '[copilot]'
})
export class CopilotDirective implements OnInit, AfterViewInit {
  @Input('copilot-step') step: any;
  @Input('copilot-template') template: TemplateRef<any>;
  @Input('copilot-mode') mode = 'vertical';
  @Input('copilot-color') overviewcolor = 'false';

  constructor(private service: NgxCopilotService, private elem: ElementRef) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

    if (this.template) {
      this.elem.nativeElement.classList.add('ngx-copilot-init');
      if (this.step) {
        this.elem.nativeElement.dataset.step = this.step;
        this.elem.nativeElement.dataset.comode = this.mode;
        this.elem.nativeElement.dataset.overviewcolor = this.overviewcolor;
        this.service.template.emit({
          step: this.step,
          template: this.template,
          mode: this.mode,
          overviewcolor: this.overviewcolor
        })
      }
    }
  }
}
