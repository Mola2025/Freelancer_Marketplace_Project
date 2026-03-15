import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../service/user-service';
import { FormsModule } from '@angular/forms';
import { Job, JobService } from '../../../service/job-service';
import { AuthModule } from '../../../service/auth-module';

@Component({
  selector: 'app-jobs-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './jobs-list.html',
  styleUrl: './jobs-list.css',
})
export class JobsList {
  jobs: Job[] = [];
  currentUserID: string = '';
  errorMessage = '';

  //Filters
  filterCategory: string = '';
  filterMinBudget: number | null = null;
  filterStatus: string = '';

  constructor(private readonly jobService: JobService, private readonly userService: UserService, private readonly router: Router, private readonly authModule: AuthModule) {
    this.userService.getMe().subscribe({
      next: (res) => {
        this.currentUserID = res.id;
        this.loadJobs();
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);

        this.authModule.clearToken();
        this.router.navigate(['/login']);
      }
    });
  }

  loadJobs() {
    const filters: any = {};
    if (this.filterCategory.trim()) {
      filters.category = this.filterCategory;
    }
    if (this.filterMinBudget !== null) {
      filters.min_budget = this.filterMinBudget;
    }
    // If user selected a status filter, only fetch jobs with that status
    if (this.filterStatus) {
      this.jobService.searchJobs({ ...filters, status: this.filterStatus }).subscribe({
        next: (jobs) => {
          this.jobs = jobs;
        },
        error: (err) => {
          console.error('Error fetching jobs:', err);
          this.errorMessage = err.error.error || 'An error occurred while fetching jobs.';
        }
      });
      return;
    }


    //No status filter 
    this.jobService.searchJobs({ ...filters, status: 'open' }).subscribe({
      next: (openJobs) => {
        this.jobs = openJobs;
        this.jobService.searchJobs({ ...filters, status: 'in_progress' }).subscribe({
          next: (inProgressJobs) => {
            this.jobs = [...this.jobs, ...inProgressJobs];
          },
          error: (err) => {
            console.error('Error fetching in-progress jobs:', err);
            this.errorMessage = err.error.error || 'An error occurred while fetching in-progress jobs.';
          }
        });
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
        this.errorMessage = err.error.error || 'An error occurred while fetching jobs.';
      }
    });
  }

  clearFilters() {
    this.filterCategory = '';
    this.filterMinBudget = null;
    this.filterStatus = '';
    this.loadJobs();
  }

  isOwner(job: Job): boolean {
    //! Consider both owner and owner_id for ownership check to handle different job states (open vs in_progress/completed) /jobs/search and /jobs/<job_id> may return owner info in different formats based on the job's status and assignment
    if (job.owner?.id) {
      return job.owner.id === this.currentUserID;
    }
    if (job.owner_id) {
      return job.owner_id === this.currentUserID;
    }
    return false;
  }

  isAssignedFreelancer(job: Job): boolean {
    if (job.freelancer?.id) {
      return job.freelancer.id === this.currentUserID;
    }
    if (job.freelancer_id) {
      return job.freelancer_id === this.currentUserID;
    }
    return false;
  }

  markJobCompleted(id: string) {
    this.jobService.completeJob(id).subscribe({
      next: (res) => {
        this.loadJobs();
      },
      error: (err) => {
        console.error('Error marking job as completed:', err);
        this.errorMessage = err.error.error || 'An error occurred while updating the job.';
      }
    });
  }
}



