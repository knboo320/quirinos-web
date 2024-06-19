import { TestBed } from '@angular/core/testing';

import { CleanCheckupService } from './clean-checkup.service';

describe('CleanCheckupService', () => {
  let service: CleanCheckupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CleanCheckupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
