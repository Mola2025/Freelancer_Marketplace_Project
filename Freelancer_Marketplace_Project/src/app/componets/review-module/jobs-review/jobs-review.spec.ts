import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsReview } from './jobs-review';

describe('JobsReview', () => {
  let component: JobsReview;
  let fixture: ComponentFixture<JobsReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsReview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
