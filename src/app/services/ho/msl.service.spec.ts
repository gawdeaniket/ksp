import { TestBed } from '@angular/core/testing';

import { MslService } from './msl.service';

describe('MslService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MslService = TestBed.get(MslService);
    expect(service).toBeTruthy();
  });
});
