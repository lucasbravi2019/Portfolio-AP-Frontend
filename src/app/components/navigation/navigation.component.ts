import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  faBars = faBars
  show = {
    display: 'none'
  } 

  ngOnInit(): void {
  }

  openNavigation() {
    if (this.show.display === 'none') this.show.display = 'block'
    else this.show.display = 'none'
  }

}
