import { TestBed } from '@angular/core/testing';

import { LmdService } from './lmd.service';

describe('LmdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LmdService = TestBed.get(LmdService);
    expect(service).toBeTruthy();
  });
});
