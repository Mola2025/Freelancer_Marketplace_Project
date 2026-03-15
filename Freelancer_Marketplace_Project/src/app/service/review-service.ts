import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Review {
  id: string;
  job_id: string;
  reviewer_id: string;
  target_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface ReviewData {
  target_id: string;
  rating: number;
  comment?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly BASE_URL = "https://stingray-app-wxhhn.ondigitalocean.app/";

  constructor(private readonly http: HttpClient) { }

  //! POST /jobs/<job_id>/reviews (Authentication Required)
  submitReview(jobId: string, data: ReviewData): Observable<Review> {
    return this.http.post<Review>(`${this.BASE_URL}jobs/${jobId}/reviews`, data);
  }

  //! GET /reviews/user/<user_id>
  getReviewsByUserId(userId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.BASE_URL}reviews/user/${userId}`);
  }
}
