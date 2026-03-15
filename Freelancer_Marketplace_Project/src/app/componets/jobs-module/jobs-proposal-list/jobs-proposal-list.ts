import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { JobService } from '../../../service/job-service';
import { UserService } from '../../../service/user-service';
import { Proposal, ProposalService } from '../../../service/proposal-service';

@Component({
  selector: 'app-jobs-proposal-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './jobs-proposal-list.html',
  styleUrl: './jobs-proposal-list.css',
})
export class JobsProposalList {
  proposals: Proposal[] = [];
  jobId = '';
  jobTitle = '';
  errorMessage = '';
  acceptingId: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private jobService: JobService, private userService: UserService, private proposalService: ProposalService) {
    this.jobId = this.route.snapshot.paramMap.get('id') ?? '';

    // Check if the current user is the owner before fetching job details and proposals
    this.userService.getMe().subscribe({
      next: (user) => {
        this.jobService.getJobById(this.jobId).subscribe({
          next: (job) => {
            const ownerId = job.owner?.id ?? job.owner_id ?? '';
            if (ownerId !== user.id) {
              this.errorMessage = 'You are not authorized to view this job. Please log in as the owner to view proposals.';
              this.router.navigate(['/login']);
              return;
            }
            this.jobTitle = job.title;
            this.loadProposals();
          },
          error: (err) => {
            console.error('Error fetching job details:', err);
            this.errorMessage = err.error?.error || 'Error fetching job details. Please try again later.';
            this.router.navigate(['/login']);
          },
        });
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
        this.errorMessage = err.error?.error || 'Error fetching user data. Please try again later.';
        this.router.navigate(['/login']);
      },
    });
  }

  loadProposals() {
    this.proposalService.getProposalByJobId(this.jobId).subscribe({
      next: (proposals) => {
        this.proposals = proposals;
      },
      error: (err) => {
        console.error('Error fetching proposals:', err);
        this.errorMessage = err.error?.error || 'Error fetching proposals. Please try again later.';
      },
    });
  }

  acceptProposal(proposalId: string) {
    this.acceptingId = proposalId;
    this.errorMessage = '';
    this.proposalService.acceptProposal(proposalId).subscribe({
      next: () => {
        this.acceptingId = null;
        this.router.navigate(['/jobs', this.jobId]);
      },
      error: (err) => {
        console.error('Error accepting proposal:', err);
        this.acceptingId = null;
        this.errorMessage = err.error?.error || 'Error accepting proposal. Please try again later.';
      },
    });
  }
}

