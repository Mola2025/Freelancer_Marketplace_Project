import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsProposalList } from './jobs-proposal-list';

describe('JobsProposalList', () => {
  let component: JobsProposalList;
  let fixture: ComponentFixture<JobsProposalList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsProposalList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsProposalList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
