import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsEdit } from './jobs-edit';

describe('JobsEdit', () => {
  let component: JobsEdit;
  let fixture: ComponentFixture<JobsEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
