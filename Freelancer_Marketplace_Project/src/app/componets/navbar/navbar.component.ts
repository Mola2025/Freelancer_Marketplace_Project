import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { AuthModule } from '../../core/service/auth-module';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLoggedIn = true;

  constructor(
    private readonly authService: AuthModule,
    private readonly router: Router
  ) {
    this.updateAuthState();
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.updateAuthState());
  }

  updateAuthState() {
    this.isLoggedIn = !!this.authService.getToken();
  }

  logout() {
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }
}
