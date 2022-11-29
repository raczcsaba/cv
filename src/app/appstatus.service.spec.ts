import { TestBed } from '@angular/core/testing';

import { AppstatusService } from './appstatus.service';

describe('AppstatusService', () => {
  let service: AppstatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppstatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
