import { TestBed } from '@angular/core/testing';

import { RuntimeApproachService } from './runtime-approach.service';

describe('RuntimeApproachService', () => {
  let service: RuntimeApproachService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuntimeApproachService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
