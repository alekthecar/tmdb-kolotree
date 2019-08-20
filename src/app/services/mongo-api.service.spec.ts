import { TestBed } from '@angular/core/testing';

import { MongoApiService } from './mongo-api.service';

describe('MongoApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MongoApiService = TestBed.get(MongoApiService);
    expect(service).toBeTruthy();
  });
});
