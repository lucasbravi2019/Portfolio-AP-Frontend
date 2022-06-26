import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { TechnologyResponse } from 'src/app/interfaces/technology-response';
import { TechnologyService } from 'src/app/services/technology.service';

@Component({
  selector: 'app-technology-home',
  templateUrl: './technology-home.component.html',
  styleUrls: ['./technology-home.component.scss']
})
export class TechnologyHomeComponent implements OnInit {

  constructor() { }

  @Input() technologyList: TechnologyResponse[] = []

  ngOnInit(): void {
  }

  

}
