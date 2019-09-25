import { TestBed } from '@angular/core/testing';

import { BranchEditService } from './branch-edit.service';

describe('BranchEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BranchEditService = TestBed.get(BranchEditService);
    expect(service).toBeTruthy();
  });
});
