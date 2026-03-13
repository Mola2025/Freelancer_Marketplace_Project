import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModule } from './user-module';

describe('UserModule', () => {
  let component: UserModule;
  let fixture: ComponentFixture<UserModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserModule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
