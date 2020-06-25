import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxWrapperCopilotComponent } from './ngx-wrapper-copilot.component';

describe('NgxWrapperCopilotComponent', () => {
  let component: NgxWrapperCopilotComponent;
  let fixture: ComponentFixture<NgxWrapperCopilotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxWrapperCopilotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxWrapperCopilotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
