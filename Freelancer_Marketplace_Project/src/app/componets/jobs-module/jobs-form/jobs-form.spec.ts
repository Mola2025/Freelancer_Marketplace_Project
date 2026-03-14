import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsForm } from './jobs-form';

describe('JobsForm', () => {
  let component: JobsForm;
  let fixture: ComponentFixture<JobsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
