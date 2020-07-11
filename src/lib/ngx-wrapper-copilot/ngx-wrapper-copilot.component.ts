import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgxCopilotService} from "../ngx-copilot.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'ngx-wrapper-copilot',
  templateUrl: './ngx-wrapper-copilot.component.html',
  styleUrls: ['./ngx-wrapper-copilot.component.css']
})
export class NgxWrapperCopilotComponent implements OnInit, OnDestroy {
  public viewTemplate = [];
  public queue: [];
  private subscriber: Subscription;

  constructor(private service: NgxCopilotService) {

  }

  ngOnInit(): void {

    this.subscriber = this.service.template.subscribe(a => {
      this.viewTemplate.push(a)
    })

    this.service.nextEmit.subscribe(next => this.service.find(next))
  }

  ngOnDestroy(): void {
    try {
      this.subscriber.unsubscribe();
      this.viewTemplate = [];
    } catch (e) {
      return null;
    }
  }


}
