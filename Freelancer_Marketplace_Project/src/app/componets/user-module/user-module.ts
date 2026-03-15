import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User, UserService } from '../../core/service/user-service';
import { Router, RouterLink } from '@angular/router';
import { AuthModule } from '../../core/service/auth-module';
import { FormsModule } from '@angular/forms';
import { Job, JobService } from '../../core/service/job-service';

@Component({
  selector: 'app-user-module',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user-module.html',
  styleUrl: './user-module.css',
})
export class UserModule {
  user: User | null = null;
  myJobs: Job[] = [];
  errorMessage = '';
  isLoading = true;
  searchUsername = '';

  constructor(private readonly userService: UserService,
    private readonly jobService: JobService,
    private readonly authModule: AuthModule,
    private readonly router: Router) {
    this.loadUser();
    this.loadMyJobs();
  }

  loadUser() {
    this.userService.getMe().subscribe({
      next: (me) => {
        this.userService.getUserByUsername(me.username).subscribe({
          next: (fullProfile) => {
            this.user = fullProfile;
            this.isLoading = false;
          },
          error: (err) => {
            // Return Basic User Data
            this.user = me;
            this.isLoading = false;
          }
        });
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.error || 'An error occurred while fetching user data.';
        this.isLoading = false;
      }
    });
  }

  loadMyJobs() {
    this.jobService.getMyJobPostings().subscribe({
      next: (res) => {
        this.myJobs = res;
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.error || 'An error occurred while fetching user data.';
        this.isLoading = false;
      }
    });
  }

  searchUser() {
    const username = this.searchUsername.trim();
    if (!username) return;
    this.router.navigate(['/users', username]);
  }

  logout() {
    this.authModule.clearToken();
    this.router.navigate(['/login']);
  }

}

