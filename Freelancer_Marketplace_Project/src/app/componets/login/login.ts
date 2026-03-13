import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthModule } from '../../service/auth-module';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  errorMessage = ''

  constructor(
    private readonly authModule: AuthModule,
    private readonly router: Router
  ) { }

  submit() {
    this.authModule.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log(res);
        this.authModule.setToken(res.token);
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.error;
      }
    });
  }
}
