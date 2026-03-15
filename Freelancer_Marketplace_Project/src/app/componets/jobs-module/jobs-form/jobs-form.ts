import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { JobService } from '../../../service/job-service';

@Component({
  selector: 'app-jobs-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './jobs-form.html',
  styleUrl: './jobs-form.css',
})
export class JobsForm {
  errorMessage = '';
  submitting = false;

  formData = {
    title: '',
    description: '',
    category: '',
    budget: null as number | null,
  };

  constructor(private readonly jobService: JobService, private readonly router: Router) { }

  submit() {
    if (!this.formData.title.trim() || !this.formData.description.trim() || !this.formData.category.trim() || this.formData.budget === null) {
      this.errorMessage = 'All fields are required';
      return;
    }
    this.submitting = true;
    this.jobService.createJob(this.formData.title, this.formData.description, this.formData.budget, this.formData.category).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/jobs']);
      }, error: (err) => {
        this.submitting = false;
        this.errorMessage = err.error.error;
      }
    });
  }
}
