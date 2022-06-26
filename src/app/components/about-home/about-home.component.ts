import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AboutResponse } from 'src/app/interfaces/about-response';
import { AboutService } from 'src/app/services/about.service';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about-home',
  templateUrl: './about-home.component.html',
  styleUrls: ['./about-home.component.scss']
})
export class AboutHomeComponent implements OnInit {

  @Input() about: AboutResponse | null = null

  aboutUs = faAddressCard

  constructor(private aboutService: AboutService) { }

  ngOnInit(): void {
    // this.getAbout()
  }

  // isLoading: boolean = false
  // errorMsg: string | null = null

  // getAbout() {
  //   this.aboutService.getAbout().subscribe({
  //     next: (data: AboutResponse) => {
  //       this.about = data
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       this.isLoading = false
  //       this.errorMsg = error.error.message
  //     },
  //     complete: () => {
  //       this.isLoading = false
  //     }
  //   })
  // }

}
