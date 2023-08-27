import { TestBed } from '@angular/core/testing';

import { LoadDictService } from './load-dict.service';

describe('LoadDictService', () => {
  let service: LoadDictService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadDictService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
