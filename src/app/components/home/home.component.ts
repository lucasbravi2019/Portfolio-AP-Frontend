import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PersonaResponse } from 'src/app/interfaces/persona-response';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private personaService: PersonaService) { }

  persona: PersonaResponse | null = null
  isLoading: boolean = false
  msg: string = ''
  animationMsg: string = ''

  ngOnInit(): void {
    this.getPersona()
  }

  animateMsg(msg: string | null) {
    let index = this.animationMsg.length + 1
    if ((msg + '_') !== this.animationMsg) {
      this.animationMsg.replace('_', '')
      this.animationMsg = this.msg.substring(0, index) + '_'
      if (this.msg.substring(index - 1, index) === ' ') {
        setTimeout(() => {
          window.requestAnimationFrame(() => this.animateMsg(this.msg))
        }, 200)
      } else {
        setTimeout(() => {
          window.requestAnimationFrame(() => this.animateMsg(this.msg))
        }, 125)
      }
    } else {
      this.animationMsg = this.animationMsg.replace('_', '')
    }
  }

  getPersona() {
    this.isLoading = true
    this.personaService.getPersona().subscribe({
      next: (data: PersonaResponse) => {
        this.persona = data
        this.msg = `Hello, I am ${this.persona?.firstName}, a Web Developer and I work with both Frontend and Backend`
        if (this.msg !== '') {
          window.requestAnimationFrame(() => this.animateMsg(this.msg))
        }
      },
      error: (error: HttpErrorResponse) => this.isLoading = false,
      complete: () => this.isLoading = false
    })
  }


}
