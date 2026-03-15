import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface platformStats {
  total_users: number;
  active_jobs: number;
  total_value_moved: number;
}

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private readonly BASE_URL = 'https://stingray-app-wxhhn.ondigitalocean.app/';
  constructor(private readonly http: HttpClient) { }

  //! GET /platform/stats
  getPlatformData(): Observable<platformStats> {
    return this.http.get<platformStats>(`${this.BASE_URL}platform/stats`);
  }
}
