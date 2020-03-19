import { TestBed } from '@angular/core/testing';

import { CodingSessionService } from './coding-session.service';

describe('CodingSessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CodingSessionService = TestBed.get(CodingSessionService);
    expect(service).toBeTruthy();
  });
});
