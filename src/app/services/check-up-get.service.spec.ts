import { TestBed } from '@angular/core/testing';

import { CheckUpGetService } from './check-up-get.service';

describe('CheckUpGetService', () => {
  let service: CheckUpGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckUpGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
