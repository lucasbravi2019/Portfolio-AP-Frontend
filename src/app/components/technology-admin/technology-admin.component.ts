import { Component, OnInit } from '@angular/core';
import { TechnologyResponse } from 'src/app/interfaces/technology-response';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Operacion } from 'src/app/enums/operacion';
import { TechnologyRequest } from 'src/app/interfaces/technology-request';
import { TechnologyService } from 'src/app/services/technology.service';
import { PersonaService } from 'src/app/services/persona.service';
import { PersonaResponse } from 'src/app/interfaces/persona-response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-technology-admin',
  templateUrl: './technology-admin.component.html',
  styleUrls: ['./technology-admin.component.scss']
})
export class TechnologyAdminComponent implements OnInit {

  constructor(private technologyService: TechnologyService, private personaService: PersonaService) { }

  faplus = faPlus
  isLoading: boolean = false
  technologyList: TechnologyResponse[] = []
  technologyForm: TechnologyRequest = {
    personaId: null,
    technologyLevel: 0,
    technologyName: ''
  }
  technologyId: number | null = null
  persona: PersonaResponse | null = null
  operacion: Operacion = Operacion.GET

  ngOnInit(): void {
    this.getPersona()
    this.getTechnologyList()
  }

  crear() {
    this.reset()
    this.operacion = Operacion.POST
  }

  editar(technology: TechnologyResponse) {
    this.technologyForm = {
      ...technology,
      personaId: null
    }
    this.technologyId = technology.id
    this.operacion = Operacion.PUT
  }

  borrar(id: number) {
    this.deleteTechnology(id)
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

  getTechnologyList() {
    this.isLoading = true
    this.technologyService.getTechnologies().subscribe({
      next: (data: TechnologyResponse[]) => {
        this.technologyList = data
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      }
    })

  }

  createTechnology() {
    this.isLoading = true
    this.operacion = Operacion.GET
    this.technologyService.createTechnology(this.technologyForm).subscribe({
      next: (data: TechnologyResponse) => {
        console.table(data)
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false
      },
      complete: () => {
        this.getTechnologyList()
      }
    })
  }

  updateTechnology() {
    if (this.technologyId === null) {
      this.operacion = Operacion.GET
      return
    }
    this.isLoading = true
    this.operacion = Operacion.GET
    this.technologyService.updateTechnology(this.technologyId, this.technologyForm).subscribe({
      next: (data: TechnologyResponse) => {
        console.table(data)
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false
      },
      complete: () => {
        this.getTechnologyList()
      }
    })
  }

  deleteTechnology(id: number) {
    this.isLoading = true
    this.technologyService.deleteTechnology(id).subscribe({
      error: (error: HttpErrorResponse) => {
        this.isLoading = false
      },
      complete: () => {
        this.getTechnologyList()
        this.operacion = Operacion.GET
      }
    })
  }

  reset() {
    this.technologyForm = {
      personaId: null,
      technologyLevel: 0,
      technologyName: ''
    }
  }

}
