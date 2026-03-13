import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthModule } from '../../service/auth-module';
@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name = '';
  username = '';
  email = '';
  password = '';
  bio = '';
  skills = '';
  errorMessage = '';
  suggestedUsername = '';

  constructor(
    private readonly authModule: AuthModule,
    private readonly router: Router
  ) { }

  submit() {
    const skillsArray = this.skills.split(',').map(skill => skill.trim()); // Clear any leading/trailing spaces and split into an array
    this.authModule.register(this.name, this.username, this.email, this.password, this.bio, skillsArray).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/login'])
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.error;

        // Handle error 409 for username already taken and show suggested username
        if (err.status === 409 && err.error?.suggested_username) {
          this.suggestedUsername = err.error.suggested_username;
        }
      }
    });
  }
}
