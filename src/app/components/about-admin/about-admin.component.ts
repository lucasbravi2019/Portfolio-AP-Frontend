import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Operacion } from 'src/app/enums/operacion';
import { AboutRequest } from 'src/app/interfaces/about-request';
import { AboutResponse } from 'src/app/interfaces/about-response';
import { PersonaResponse } from 'src/app/interfaces/persona-response';
import { AboutService } from 'src/app/services/about.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-about-admin',
  templateUrl: './about-admin.component.html',
  styleUrls: ['./about-admin.component.scss']
})
export class AboutAdminComponent implements OnInit {

  constructor(private aboutService: AboutService, private personaService: PersonaService) { }

  faplus = faPlus

  isLoading: boolean = false

  errorMsg: string | null = null

  persona: PersonaResponse | null = null
  about: AboutResponse | null = null

  aboutForm: AboutRequest = {
    title: '',
    about: '',
    image: '',
    personaId: null
  }

  operacion: Operacion = Operacion.GET

  ngOnInit(): void {
    this.getPersona()
    this.getAbout()
  }

  getAbout() {
    this.isLoading = true
    this.aboutService.getAbout().subscribe({
      next: (data: AboutResponse) => {
        this.about = data
        this.isLoading = false
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false
        this.errorMsg = error.error.errors
      },
      complete: () => {
        this.isLoading = false
        console.log('About get completado')
      }
    })
  }

  crear() {
    this.operacion = Operacion.POST
  }

  actualizar() {
    if (this.about === null) return
    this.aboutForm = {
      ...this.about,
      personaId: null
    }
    this.operacion = Operacion.PUT
  }

  getPersona() {
    this.isLoading = true
    this.personaService.getPersona().subscribe({
      next: (data: PersonaResponse) => {
        this.persona = data
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  crearAbout() {
    this.reset()
    this.isLoading = true
    this.aboutService.createAbout(this.aboutForm).subscribe({
      next: (data: AboutResponse) => console.log(data),
      error: (error: HttpErrorResponse) => console.log(error),
      complete: () => {
        this.getAbout()
        this.operacion = Operacion.GET
      }
    })
  }

  actualizarAbout() {
    if (this.about === null) return
    this.isLoading = true
    this.operacion = Operacion.GET
    this.aboutService.updateAbout(this.about.id, this.aboutForm).subscribe({
      next: (data: AboutResponse) => console.table(data),
      error: (error: HttpErrorResponse) => this.isLoading = false,
      complete: () => {
        this.getAbout()
      }
    })
  }

  reset() {
    this.aboutForm = {
      title: '',
      about: '',
      image: '',
      personaId: null
    }
  }

}
