import { TestBed } from '@angular/core/testing';

import { CompiletimeApproachService } from './compiletime-approach.service';

describe('CompiletimeApproachService', () => {
  let service: CompiletimeApproachService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompiletimeApproachService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
