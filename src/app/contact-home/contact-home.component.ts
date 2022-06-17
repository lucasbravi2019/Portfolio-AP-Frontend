import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-home',
  templateUrl: './contact-home.component.html',
  styleUrls: ['./contact-home.component.scss']
})
export class ContactHomeComponent implements OnInit {

  constructor(private contactService: ContactService) { }

  isLoading: boolean = false
  errorMsg: string | null = null
  contacts: Contact[] = []
  

  ngOnInit(): void {
    this.getAllContacts()
  }

  getAllContacts() {
    this.isLoading = true
    this.contactService.getAllContacts().subscribe({
      next: (data: Contact[]) => {
        this.contacts = data
        if (this.contacts.length === 0) this.errorMsg = 'No hay contactos'
      },
      error: (error: HttpErrorResponse) => {
        this.errorMsg = error.error.message 
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

}
