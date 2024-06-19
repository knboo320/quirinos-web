import { TestBed } from '@angular/core/testing';

import { NewIdService } from './new-id.service';

describe('NewIdService', () => {
  let service: NewIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
