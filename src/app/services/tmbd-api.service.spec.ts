import { TestBed } from '@angular/core/testing';

import { TmbdApiService } from './tmbd-api.service';

describe('TmbdApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TmbdApiService = TestBed.get(TmbdApiService);
    expect(service).toBeTruthy();
  });
});
