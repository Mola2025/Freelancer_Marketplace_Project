import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicUser } from './public-user';

describe('PublicUser', () => {
  let component: PublicUser;
  let fixture: ComponentFixture<PublicUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
