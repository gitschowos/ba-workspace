import { TestBed } from '@angular/core/testing';

import { CreateFormControlService } from './create-form-control.service';

describe('CreateFormControlService', () => {
  let service: CreateFormControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateFormControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
