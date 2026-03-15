import { TestBed } from '@angular/core/testing';

import { AuthModule } from './auth-module';

describe('AuthModule', () => {
  let service: AuthModule;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthModule);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
