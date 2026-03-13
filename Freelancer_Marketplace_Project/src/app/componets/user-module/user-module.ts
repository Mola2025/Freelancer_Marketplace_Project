import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User, UserService } from '../../service/user-service';
import { Router } from '@angular/router';
import { AuthModule } from '../../service/auth-module';

@Component({
  selector: 'app-user-module',
  imports: [CommonModule],
  templateUrl: './user-module.html',
  styleUrl: './user-module.css',
})
export class UserModule {
  user: User | null = null;
  errorMessage = '';
  isLoading = true;

  constructor(private readonly userService: UserService,
    private readonly authModule: AuthModule,
    private readonly router: Router) {
    this.loadUser();
  }

  loadUser() {
    this.userService.getMe().subscribe({
      next: (res) => {
        this.user = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.error || 'An error occurred while fetching user data.';
        this.isLoading = false;
      }
    });
  }

  logout() {
    this.authModule.clearToken();
    this.router.navigate(['/login']);
  }

}

