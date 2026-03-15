import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsProposal } from './jobs-proposal';

describe('JobsProposal', () => {
  let component: JobsProposal;
  let fixture: ComponentFixture<JobsProposal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsProposal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsProposal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
