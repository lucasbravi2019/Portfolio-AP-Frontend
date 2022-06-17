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
  show: boolean = false

  ngOnInit(): void {
  }

  openNavigation() {
    if (this.show) {
      this.show = !this.show
    } else {
      this.show = !this.show
    }
  }

  showNavigation() {
    if (this.show) return 'show'
    return 'hide'
  }

}
