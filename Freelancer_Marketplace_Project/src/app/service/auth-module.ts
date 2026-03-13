import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  skills: string[];
  rating_average: number;
  completed_jobs: number;
}

@Injectable({
  providedIn: 'root'
})

export class AuthModule {
  private readonly BASE_URL = "https://stingray-app-wxhhn.ondigitalocean.app/";

  constructor(private readonly http: HttpClient) { }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.BASE_URL}auth/login`, { email, password });
  }

  register(name: string, username: string, email: string, password: string, bio: string, skills: string[]): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.BASE_URL}auth/register`, { name, username, email, password, bio, skills });
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  getAuthHeaders() {
    return { Authorization: `Bearer ${this.getToken()}` }
  }

}
