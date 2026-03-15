import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Review, ReviewService } from '../../../service/review-service';
import { UserService } from '../../../service/user-service';
import { AuthModule } from '../../../service/auth-module';


@Component({
  selector: 'app-my-reviews',
  imports: [CommonModule],
  templateUrl: './my-reviews.html',
  styleUrl: './my-reviews.css',
})
export class MyReviews {
  reviews: Review[] = [];
  errorMessage = '';
  isLoading = true;

  constructor(private readonly reviewService: ReviewService, private readonly userService: UserService, private readonly router: Router, private readonly authModule: AuthModule) {
    this.userService.getMe().subscribe({
      next: (user) => {
        this.reviewService.getReviewsByUserId(user.id).subscribe({
          next: (res) => {
            this.reviews = res;
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error fetching reviews:', err);
            this.errorMessage = err.error.error || 'An error occurred while fetching reviews.';
            this.isLoading = false;
          }
        });
      },
      error: (err) => {
        if (err.status === 401) {
          this.authModule.clearToken();
          this.router.navigate(['/login']);
          return;
        }
        this.errorMessage = err.error.error || 'An error occurred while fetching user profile.';
        this.isLoading = false;
      }
    });
  }

  getStars(rating: number): number[] {
    return [1, 2, 3, 4, 5];
  }
}
