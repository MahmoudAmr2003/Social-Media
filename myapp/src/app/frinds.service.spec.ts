import { TestBed } from '@angular/core/testing';

import { FrindsService } from './frinds.service';

describe('FrindsService', () => {
  let service: FrindsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrindsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
