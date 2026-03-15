import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Proposal, ProposalService } from '../../../core/service/proposal-service';
import { AuthModule } from '../../../core/service/auth-module';


@Component({
  selector: 'app-my-bids',
  imports: [CommonModule, RouterLink],
  templateUrl: './my-bids.html',
  styleUrl: './my-bids.css',
})
export class MyBids {
  proposals: Proposal[] = [];
  errorMessage = '';
  deleteProposalId: string | null = null;

  constructor(private router: Router, private proposalService: ProposalService, private authModule: AuthModule) {
    this.loadBids();
  }

  loadBids() {
    this.proposalService.getMyBids().subscribe({
      next: (proposals) => {
        this.proposals = proposals;
      },
      error: (err) => {
        if (err.status === 401) {
          this.authModule.clearToken();
          this.router.navigate(['/login']);
          return;
        }
        console.error('Error fetching proposals:', err);
        this.errorMessage = err.error?.error || 'Error fetching proposals. Please try again later.';
      },
    })
  }

  deleteProposal(proposalId: string) {
    this.deleteProposalId = proposalId;
    this.errorMessage = '';
    this.proposalService.deleteProposal(proposalId).subscribe({
      next: () => {
        this.deleteProposalId = null;
        this.loadBids();
      },
      error: (err) => {
        console.error('Error deleting proposal:', err);
        this.deleteProposalId = null;
        this.errorMessage = err.error?.error || 'Error deleting proposal. Please try again later.';
      },
    })
  }
}
