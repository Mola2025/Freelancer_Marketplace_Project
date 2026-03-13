import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../service/user-service';

@Component({
  selector: 'app-public-user',
  imports: [CommonModule],
  templateUrl: './public-user.html',
  styleUrl: './public-user.css',
})
export class PublicUser {
  user: User | null = null;
  errorMessage = '';
  isLoading = true;

  constructor(private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) {

    const username = this.route.snapshot.paramMap.get('username');

    if (!username) {
      this.router.navigate(['/login']);
      return;
    }

    this.userService.getUserByUsername(username).subscribe({
      next: (res) => {
        this.user = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.error || 'User Not Found.';
        this.isLoading = false;
      }
    });

  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
