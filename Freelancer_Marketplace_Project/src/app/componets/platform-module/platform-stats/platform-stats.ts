import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { platformStats, PlatformService } from '../../../core/service/platform-service';


@Component({
  selector: 'app-platform-stats',
  imports: [CommonModule],
  templateUrl: './platform-stats.html',
  styleUrl: './platform-stats.css',
})
export class PlatformStats {
  stats: platformStats | null = null;
  errorMessage = '';
  isLoading = false;

  constructor(private readonly platformService: PlatformService) {
    this.platformService.getPlatformData().subscribe({
      next: (res) => {
        this.stats = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.error || 'An error occurred while fetching user data.';
        this.isLoading = false;
      }
    });
  }
}
