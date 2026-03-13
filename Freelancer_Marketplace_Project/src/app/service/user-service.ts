import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



export interface User {
  id: string;
  name: string;
  username: string;
  bio: string;
  skills: string[];
  posted_by: string;
  rating_avg: number;
  completed_jobs: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly BASE_URL = "https://stingray-app-wxhhn.ondigitalocean.app/";

  constructor(private readonly http: HttpClient) { }

  //! GET /users/me to retrieve the currently authenticated user's profile
  getMe(): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}users/me`);
  }

  //! GET /users/{username} to retrieve a user by their username

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}users/${username}`);
  }
}
