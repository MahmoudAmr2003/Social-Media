import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { pagegardGuard } from './gards/pagegard.guard';

describe('pagegardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => pagegardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
