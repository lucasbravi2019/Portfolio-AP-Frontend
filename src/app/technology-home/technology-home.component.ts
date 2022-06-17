import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Technology } from '../technology';
import { TechnologyService } from '../technology.service';

@Component({
  selector: 'app-technology-home',
  templateUrl: './technology-home.component.html',
  styleUrls: ['./technology-home.component.scss']
})
export class TechnologyHomeComponent implements OnInit {

  constructor(private technologyService: TechnologyService) { }

  isLoading: boolean = false
  technologies: Technology[] = []
  errorMsg: string | null = null

  ngOnInit(): void {
    this.getTechnologies()
  }

  getTechnologies() {
    this.isLoading = true
    this.technologyService.getTechnologies().subscribe({
      next: (data: Technology[]) => {
        this.technologies = data
        console.log(this.technologies)
        if (this.technologies.length === 0) this.errorMsg = 'No hay technologias'
      },
      error: (msg: HttpErrorResponse) => {
        this.errorMsg = msg.error.message
        this.isLoading = false
      },
      complete: () => { 
        console.log('Technologies agregadas')
        this.isLoading = false
      }
    })
  }

}
