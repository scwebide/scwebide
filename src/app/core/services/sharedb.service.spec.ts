import { TestBed } from '@angular/core/testing';

import { SharedbService } from './sharedb.service';

describe('SharedbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedbService = TestBed.get(SharedbService);
    expect(service).toBeTruthy();
  });
});
