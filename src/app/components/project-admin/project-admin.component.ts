import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Operacion } from 'src/app/enums/operacion';
import { PersonaResponse } from 'src/app/interfaces/persona-response';
import { ProjectRequest } from 'src/app/interfaces/project-request';
import { ProjectResponse } from 'src/app/interfaces/project-response';
import { PersonaService } from 'src/app/services/persona.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-admin',
  templateUrl: './project-admin.component.html',
  styleUrls: ['./project-admin.component.scss']
})
export class ProjectAdminComponent implements OnInit {

  constructor(private projectService: ProjectService, private personaService: PersonaService) { }
  faplus = faPlus
  isLoading: boolean = false
  projectList: ProjectResponse[] = []
  operacion: Operacion = Operacion.GET
  persona: PersonaResponse | null = null
  projectId: number | null = null
  projectForm: ProjectRequest = {
    description: '',
    image: '',
    personaId: null,
    projectName: '',
    site: ''
  }

  ngOnInit(): void {
    this.getPersona()
    this.getProjects()
  }

  crear() {
    this.reset()
    this.operacion = Operacion.POST
  }

  actualizar(project: ProjectResponse) {
    this.reset()
    this.projectForm = {
      ...project,
      personaId: null
    }
    this.projectId = project.id
    this.operacion = Operacion.PUT
  }

  borrar(id: number) {
    this.deleteProjects(id)
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

  getProjects() {
    this.isLoading = true
    this.projectService.getProjectList().subscribe({
      next: (data: ProjectResponse[]) => {
        this.projectList = data
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  createProject() {
    this.isLoading = true
    this.projectService.createProject(this.projectForm).subscribe({
      next: (data: ProjectResponse) => {
        console.table(data)
      },
      error: (error: HttpErrorResponse) => {
        this.operacion = Operacion.GET
        this.isLoading = false
      },
      complete: () => {
        this.operacion = Operacion.GET
        this.getProjects()
      }
    })
  }

  updateProject() {
    if (this.projectId === null) {
      this.operacion = Operacion.GET
      return
    } 
    this.isLoading = true
    this.projectService.updateProject(this.projectId, this.projectForm).subscribe({
      next: (data: ProjectResponse) => {
        console.table(data)
      },
      error: (error: HttpErrorResponse) => {
        this.operacion = Operacion.GET
        this.isLoading = false
      },
      complete: () => {
        this.operacion = Operacion.GET
        this.getProjects()
      }
    })
  }

  deleteProjects(id: number) {
    this.isLoading = true
    this.projectService.deleteProject(id).subscribe({
      error: (error: HttpErrorResponse) => {
        this.operacion = Operacion.GET
        this.isLoading = false
      },
      complete: () => {
        this.operacion = Operacion.GET
        this.getProjects()
      }
    })
  }

  reset() {
    this.projectForm = {
      description: '',
      image: '',
      personaId: null,
      projectName: '',
      site: ''
    }
  }

}
