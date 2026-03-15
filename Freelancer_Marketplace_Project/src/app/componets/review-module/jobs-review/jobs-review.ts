import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../../core/service/review-service';
import { JobService } from '../../../core/service/job-service';
import { UserService } from '../../../core/service/user-service';

@Component({
  selector: 'app-jobs-review',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './jobs-review.html',
  styleUrl: './jobs-review.css',
})
export class JobsReview {
  jobId = '';
  jobTitle = '';
  targetId = '';
  targetName = '';
  errorMessage = '';
  submitting = false;

  formData = {
    rating: null as number | null,
    comment: '',
  };

  ratingOptions = [1, 2, 3, 4, 5];

  constructor(
    private readonly reviewService: ReviewService,
    private readonly jobService: JobService,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {

    this.jobId = this.route.snapshot.paramMap.get('id') ?? '';

    this.userService.getMe().subscribe({
      next: (currentUser) => {
        this.jobService.getJobById(this.jobId).subscribe({
          next: (job) => {
            // Job Status = Completed
            if (job.status !== 'completed') {
              this.errorMessage = 'This job is not completed yet. You cannot review it.';
              return;
            }

            this.jobTitle = job.title;

            const ownerId = job.owner?.id ?? job.owner_id ?? '';
            const freelancerId = job.freelancer?.id ?? job.freelancer_id ?? '';

            // Determine Target
            if (currentUser.id === ownerId) {
              // Current User is the Owner of the Job, Target is the Freelancer
              this.targetId = freelancerId;
              this.targetName = job.freelancer?.name ?? 'Freelancer';
            } else if (currentUser.id === freelancerId) {
              // Current User is the Freelancer of the Job, Target is the Owner
              this.targetId = ownerId;
              this.targetName = job.owner?.name ?? 'Owner';
            } else {
              this.errorMessage = 'You are not authorized to review this job.';
              return;
            }
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
      }
    });
  }

  submit() {
    if (this.formData.rating === null) {
      this.errorMessage = 'Please select a rating.';
      return;
    }

    if (this.formData.rating < 1 || this.formData.rating > 5 || !Number.isInteger(this.formData.rating)) {
      this.errorMessage = 'Invalid rating. Please select a rating between 1 and 5.';
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const reviewData: any = {
      target_id: this.targetId,
      rating: this.formData.rating,
    };

    if (this.formData.comment.trim()) {
      reviewData.comment = this.formData.comment.trim();
    }

    this.reviewService.submitReview(this.jobId, reviewData).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/jobs']);
      },
      error: (err) => {
        this.submitting = false;
        this.errorMessage = err.error?.error || 'Error submitting review. Please try again later.';
      }
    });
  }
}
