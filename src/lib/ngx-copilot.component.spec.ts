import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCopilotComponent } from './ngx-copilot.component';

describe('NgxCopilotComponent', () => {
  let component: NgxCopilotComponent;
  let fixture: ComponentFixture<NgxCopilotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxCopilotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCopilotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
