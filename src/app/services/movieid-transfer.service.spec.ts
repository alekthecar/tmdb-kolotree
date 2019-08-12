import { TestBed } from '@angular/core/testing';

import { MovieidTransferService } from './movieid-transfer.service';

describe('MovieidTransferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovieidTransferService = TestBed.get(MovieidTransferService);
    expect(service).toBeTruthy();
  });
});
