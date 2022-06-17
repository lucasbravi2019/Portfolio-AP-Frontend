import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Operacion } from '../operacion';
import { Persona } from '../persona';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private personaService: PersonaService) { }

  hidden: string = 'hide'
  isLoading: boolean = false
  operacion: Operacion = Operacion.GET 

  personaUpdate: Persona = {
    firstName: '',
    lastName: ''
  }

  persona: Persona | undefined

  ngOnInit(): void {
    this.getPersona()
  }

  crear() {
    this.operacion = Operacion.POST
  }

  actualizar() {
    if (this.persona !== undefined) {
      this.personaUpdate = { ...this.persona }
    }
    this.operacion = Operacion.PUT
  }

  getPersona() {
    this.isLoading = true
    this.personaService.getPersona().subscribe({
      next: (data: Persona) => { 
        this.persona = data
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error.message)
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
        console.log('Persona loaded')
      }
    })
  }

  createPersona() {
    this.isLoading = true
    this.personaService.createPersona(this.personaUpdate).subscribe((data: Persona) => {
      this.persona = data
      this.operacion = Operacion.GET
      this.isLoading = false
    })
  }

  updatePersona() {
    this.isLoading = true
    if (this.persona === undefined) return
    if (this.persona.id === undefined) console.log('No se puede actualizar porque el id es undefined')
    else this.personaService.updatePersona(this.persona?.id, this.personaUpdate).subscribe((data: Persona) => {
      this.persona = data
      this.operacion = Operacion.GET
    })
    this.isLoading = false
  }

}
