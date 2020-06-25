import { TestBed } from '@angular/core/testing';

import { NgxCopilotService } from './ngx-copilot.service';

describe('NgxCopilotService', () => {
  let service: NgxCopilotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxCopilotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
