import { TestBed } from '@angular/core/testing';

import { SclangBridgeService } from './sclang-bridge.service';

describe('SclangBridgeService', () => {
  let service: SclangBridgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SclangBridgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
