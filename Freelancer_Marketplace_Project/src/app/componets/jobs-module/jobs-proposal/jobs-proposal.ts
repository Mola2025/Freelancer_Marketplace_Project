import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { JobService } from '../../../service/job-service';
import { UserService } from '../../../service/user-service';
import { FormsModule } from '@angular/forms';
import { ProposalService } from '../../../service/proposal-service';


@Component({
  selector: 'app-jobs-proposal',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './jobs-proposal.html',
  styleUrl: './jobs-proposal.css',
})
export class JobsProposal {
  jobId = '';
  jobTitle = '';
  errorMessage = '';
  submitting = false;

  formData = {
    price: null as number | null,
    cover_letter: '',
    message: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private userService: UserService,
    private proposalService: ProposalService
  ) {
    this.jobId = this.route.snapshot.paramMap.get('id') ?? '';

    this.jobService.getJobById(this.jobId).subscribe({
      next: (job) => {
        if (job.status !== 'open') {
          this.errorMessage = 'This job is not open for proposals.';
          return;
        }
        this.jobTitle = job.title;

        // Verify that the user is not the owner of the job
        this.userService.getMe().subscribe({
          next: (user) => {
            const ownerId = job.owner?.id ?? job.owner_id ?? '';
            if (ownerId === user.id) {
              this.errorMessage = 'You cannot submit a proposal to your own job.';
              this.router.navigate(['/jobs', this.jobId]);
            }
          },
          error: (err) => {
            console.error('Error fetching user data:', err);
            this.errorMessage = err.error?.error || 'Error fetching user data. Please try again later.';
            this.router.navigate(['/login']);
          },
        });
      },
      error: (err) => {
        console.error('Error fetching job data:', err);
        this.errorMessage = err.error?.error || 'Error fetching job data. Please try again later.';
        this.router.navigate(['/jobs']);
      }
    });
  }

  submit() {
    if (this.formData.price === null || this.formData.price <= 0) {
      this.errorMessage = 'Please enter a valid price.';
      return;
    }
    const hasCoverLetter = this.formData.cover_letter.trim().length > 0;
    const hasMessage = this.formData.message.trim().length > 0;

    if (!hasCoverLetter && !hasMessage) {
      this.errorMessage = 'Please provide either a cover letter or a message.';
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const proposalData = {
      price: this.formData.price!,
      cover_letter: this.formData.cover_letter.trim(),
      message: this.formData.message.trim(),
    };

    this.proposalService.submitProposal(this.jobId, proposalData).subscribe({
      next: (proposal) => {
        this.submitting = false;
        this.router.navigate(['/jobs', this.jobId]);
      },
      error: (err) => {
        console.error('Error submitting proposal:', err);
        this.submitting = false;
        this.errorMessage = err.error?.error || 'Error submitting proposal. Please try again later.';
      }
    });
  }
}
