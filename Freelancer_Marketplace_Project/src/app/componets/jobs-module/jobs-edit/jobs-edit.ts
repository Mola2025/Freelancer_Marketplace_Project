import { Component } from '@angular/core';
import { JobService } from '../../../core/service/job-service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/service/user-service';



@Component({
  selector: 'app-jobs-edit',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './jobs-edit.html',
  styleUrl: './jobs-edit.css',
})
export class JobsEdit {
  errorMessage = '';
  submitting = false;
  jobID = '';
  isOwner = false;


  formData = {
    title: '',
    description: '',
    category: '',
    budget: null as number | null,
    status: 'open' as 'open' | 'in_progress' | 'completed',
  }

  statusOptions = ['open', 'in_progress', 'completed'];

  constructor(private readonly jobService: JobService, private readonly router: Router, private readonly route: ActivatedRoute, private readonly userService: UserService) {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.jobID = id;

    // First, get the current user to verify ownership of the job before fetching job details
    this.userService.getMe().subscribe({
      next: (user) => {
        // Now fetch the job details and verify ownership
        this.jobService.getJobById(id).subscribe({
          next: (res) => {
            const ownerId = res.owner?.id ?? res.owner_id ?? '';
            if (ownerId !== user.id) {
              this.router.navigate(['/jobs']);
              return;
            }
            this.isOwner = true;
            this.formData.title = res.title;
            this.formData.description = res.description;
            this.formData.category = res.category;
            this.formData.budget = res.budget;
            this.formData.status = res.status;
          },
          error: (err) => {
            console.error('Error fetching job details:', err);
            this.router.navigate(['/jobs']);
          }
        });
      },
      error: (err) => {
        this.router.navigate(['/login']);
      }
    });
  }

  submit() {
    if (!this.formData.title.trim() || !this.formData.description.trim() || !this.formData.category.trim() || this.formData.budget === null) {
      this.errorMessage = 'All fields are required';
      return;
    }
    this.submitting = true;
    this.jobService.updateJob(this.jobID, { title: this.formData.title, description: this.formData.description, category: this.formData.category, budget: this.formData.budget, status: this.formData.status }).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/jobs']);
      },
      error: (err) => {
        this.submitting = false;
        this.errorMessage = err.error.error || 'An error occurred ';
      }
    });
  }
}
