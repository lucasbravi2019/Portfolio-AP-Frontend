import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Job } from '../job';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-home',
  templateUrl: './job-home.component.html',
  styleUrls: ['./job-home.component.scss']
})
export class JobHomeComponent implements OnInit {

  constructor(private jobService: JobService) { }

  isLoading: boolean = false
  jobs: Job[] = []
  errorMsg: string | null = null

  ngOnInit(): void {
    this.getAllJobs()
  }

  getAllJobs() {
    this.isLoading = true
    this.jobService.getAllJobs().subscribe({
      next: (data: Job[]) => {
        this.jobs = data
        if (this.jobs.length === 0) this.errorMsg = 'No hay trabajos'
      },
      error: (error: HttpErrorResponse) => {
        this.errorMsg = error.error.message
        this.isLoading = false
      },
      complete: () => this.isLoading = false
    })
  }

}
