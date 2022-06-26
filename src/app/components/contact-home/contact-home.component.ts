import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ContactResponse } from 'src/app/interfaces/contact-response';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-home',
  templateUrl: './contact-home.component.html',
  styleUrls: ['./contact-home.component.scss']
})
export class ContactHomeComponent implements OnInit {

  constructor() { }

  @Input() contactList: ContactResponse[] = []

  ngOnInit(): void {
  }

}
