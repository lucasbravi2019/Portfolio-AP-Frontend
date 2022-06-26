import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { JobResponse } from 'src/app/interfaces/job-response';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-home',
  templateUrl: './job-home.component.html',
  styleUrls: ['./job-home.component.scss']
})
export class JobHomeComponent implements OnInit {

  constructor(private jobService: JobService) { }

  @Input() jobs: JobResponse[] = []

  isLoading: boolean = false
  errorMsg: string | null = null

  ngOnInit(): void {
    // this.getAllJobs()
  }

  // getAllJobs() {
  //   this.isLoading = true
  //   this.jobService.getAllJobs().subscribe({
  //     next: (data: JobResponse[]) => {
  //       this.jobs = data
  //       if (this.jobs.length === 0) this.errorMsg = 'No hay trabajos'
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       this.errorMsg = error.error.message
  //       this.isLoading = false
  //     },
  //     complete: () => this.isLoading = false
  //   })
  // }

}
