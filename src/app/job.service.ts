import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from './job';
import { LoginService } from './login.service';
import { Paths } from './paths';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  header: HttpHeaders = new HttpHeaders()

  getAllJobs(): Observable<Job[]> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.get<Job[]>(Paths.BASE + Paths.JOB, {
      headers: this.header
    })
  }



}
