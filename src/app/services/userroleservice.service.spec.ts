import { TestBed } from '@angular/core/testing';

import { UserroleserviceService } from './userroleservice.service';

describe('UserroleserviceService', () => {
  let service: UserroleserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserroleserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
