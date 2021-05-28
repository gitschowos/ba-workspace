import { TestBed } from '@angular/core/testing';

import { SuggestionsService } from './suggestions.service';

describe('ApiService', () => {
  let service: SuggestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuggestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
