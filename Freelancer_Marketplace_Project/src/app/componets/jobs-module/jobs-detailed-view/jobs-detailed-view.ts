import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Job, JobService } from '../../../core/service/job-service';
import { UserService } from '../../../core/service/user-service';
@Component({
  selector: 'app-jobs-detailed-view',
  imports: [CommonModule, RouterLink],
  templateUrl: './jobs-detailed-view.html',
  styleUrl: './jobs-detailed-view.css',
})
export class JobsDetailedView {
  job: Job | null = null;
  currentUserId = '';
  errorMessage = '';

  constructor(private readonly jobService: JobService, private readonly route: ActivatedRoute, private readonly router: Router, private readonly userService: UserService) {

    this.userService.getMe().subscribe({
      next: (user) => {
        this.currentUserId = user.id;
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
        this.router.navigate(['/login']);
      }
    });

    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.jobService.getJobById(id).subscribe({
      next: (res) => {
        this.job = res;
      },
      error: (err) => {
        console.error('Error fetching job details:', err);
        this.router.navigate(['/jobs']);
      }
    });
  }

  isOwner(): boolean {
    const ownerId = this.job?.owner?.id ?? this.job?.owner_id ?? '';
    return ownerId === this.currentUserId;
  }

  markJobCompleted() {
    if (!this.job) return;
    this.jobService.completeJob(this.job.id).subscribe({
      next: (res) => {
        this.router.navigate(['/jobs']);
      },
      error: (err) => {
        console.error('Error marking job as completed:', err);
        this.errorMessage = err.error.error || 'An error occurred while updating the job.';
      }
    });
  }
}
