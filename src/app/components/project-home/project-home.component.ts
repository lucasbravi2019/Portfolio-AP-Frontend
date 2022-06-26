import { Component, Input, OnInit } from '@angular/core';
import { ProjectResponse } from 'src/app/interfaces/project-response';

@Component({
  selector: 'app-project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.scss']
})
export class ProjectHomeComponent implements OnInit {

  constructor() { }

  @Input() projectList: ProjectResponse[] = []

  ngOnInit(): void {
  }

}
