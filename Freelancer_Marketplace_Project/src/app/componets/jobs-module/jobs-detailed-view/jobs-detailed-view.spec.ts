import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsDetailedView } from './jobs-detailed-view';

describe('JobsDetailedView', () => {
  let component: JobsDetailedView;
  let fixture: ComponentFixture<JobsDetailedView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsDetailedView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsDetailedView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
