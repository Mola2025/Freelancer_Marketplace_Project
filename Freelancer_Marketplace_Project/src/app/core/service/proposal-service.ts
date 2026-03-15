import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Proposal {
  id: string;
  job_id: string;
  freelancer_id: string;
  price: number;
  cover_letter: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  freelancer?: {
    id: string;
    name: string;
    username: string;
  };
  job?: {
    id: string;
    title: string;
    status: string;
  };
}

export interface submitProposalData {
  price: number;
  cover_letter?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProposalService {

  private readonly BASE_URL = 'https://stingray-app-wxhhn.ondigitalocean.app/';

  constructor(private http: HttpClient) { }

  //! POST /jobs/<job_id>/proposals (Authentication Required)
  submitProposal(jobId: string, data: submitProposalData): Observable<Proposal> {
    return this.http.post<Proposal>(`${this.BASE_URL}jobs/${jobId}/proposals`, data);
  }

  //! GET /jobs/<job_id>/proposals (Owner Only)
  getProposalByJobId(jobId: string): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`${this.BASE_URL}jobs/${jobId}/proposals`);
  }

  //! PATCH /proposals/<proposal_id>/accept (Authentication Required)
  acceptProposal(proposalId: string): Observable<Proposal> {
    return this.http.patch<Proposal>(`${this.BASE_URL}proposals/${proposalId}/accept`, {});
  }

  //! GET /proposals/my-bids (Authentication Required)
  getMyBids(): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(`${this.BASE_URL}proposals/my-bids`);
  }

  //! DELETE /proposals/<proposal_id> (Authentication Required)
  deleteProposal(proposalId: string): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}proposals/${proposalId}`);
  }
}
