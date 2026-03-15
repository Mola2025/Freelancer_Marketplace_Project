import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthModule } from './auth-module';

export interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  category: string;
  status: 'open' | 'in_progress' | 'completed';
  created_at: string;
  //! Format for owner and freelancer is the same, but only one will be present based on the job's status and assignment /jobs/search and /jobs/<job_id> may return owner info in different formats based on the job's status and assignment
  owner?: {
    id: string;
    name: string;
    username: string;
  };
  //! Format of freelancer is the same as owner, but only present if a freelancer has been assigned to the job
  owner_id?: string;
  freelancer?: {
    id: string;
    name: string;
    username: string;
  };
  freelancer_id?: string;
}

export interface JobSearchFilters {
  category?: string;
  status?: string;
  min_budget?: number;
}

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private readonly BASE_URL = 'https://stingray-app-wxhhn.ondigitalocean.app/';

  constructor(private readonly http: HttpClient, private readonly authModule: AuthModule) { }

  //POST /jobs/search to search for jobs with optional filters
  searchJobs(filters: JobSearchFilters): Observable<Job[]> {
    return this.http.post<Job[]>(`${this.BASE_URL}jobs/search`, filters);
  }

  // POST /jobs (Authentication Required) to create a new job posting
  createJob(title: string, description: string, budget: number, category: string) {
    const jobData = { title, description, budget, category };
    return this.http.post<Job>(`${this.BASE_URL}jobs`, jobData)
  };


  // GET /jobs/<job_id> (Authentication Required) to retrieve a specific job by its ID
  getJobById(jobId: string): Observable<Job> {
    return this.http.get<Job>(`${this.BASE_URL}jobs/${jobId}`);
  }

  // PATCH /jobs/<job_id> (Owner Only) to update a job posting
  updateJob(jobId: string, updates: Partial<{ title: string; description: string; budget: number; category: string; status: string }>) {
    return this.http.patch<Job>(`${this.BASE_URL}jobs/${jobId}`, updates);
  }

  // GET /jobs/my-postings (Authentication Required) to retrieve all job postings created by the authenticated user
  getMyJobPostings(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.BASE_URL}jobs/my-postings`);
  }

  // PATCH /jobs/<job_id>/complete (Authentication Required) to mark a job as completed (Owner or Freelancer Assigned Only)
  completeJob(jobId: string) {
    return this.http.patch<Job>(`${this.BASE_URL}jobs/${jobId}/complete`, {}
    );
  }

}


