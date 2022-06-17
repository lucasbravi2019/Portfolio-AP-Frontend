import { Component, OnInit } from '@angular/core';
import { Persona } from '../persona';
import { PersonaService } from '../persona.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private personaService: PersonaService) { }


  ngOnInit(): void {
  }


  getPersona() {
    // Retrieve my data
    // this.personaService.getPersona().subscribe(data => console.log(data))
  }


}
