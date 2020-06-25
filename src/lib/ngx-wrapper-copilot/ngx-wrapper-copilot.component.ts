import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NgxCopilotService} from "../ngx-copilot.service";

@Component({
  selector: 'ngx-wrapper-copilot',
  templateUrl: './ngx-wrapper-copilot.component.html',
  styleUrls: ['./ngx-wrapper-copilot.component.css']
})
export class NgxWrapperCopilotComponent implements OnInit, AfterViewInit {
  public viewTemplate = [];
  public queue: [];

  constructor(private service: NgxCopilotService) {

  }

  ngOnInit(): void {

    this.service.template.subscribe(a => {
      this.viewTemplate.push(a)
    })

    this.service.nextEmit.subscribe(next => this.service.find(next))
  }

  ngAfterViewInit(): void {
    setTimeout(() => {

    }, 50)

  }

}
