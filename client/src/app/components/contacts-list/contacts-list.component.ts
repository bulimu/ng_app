import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})

export class ContactsListComponent implements OnInit {

  contacts: Contact[] = [];
  currentContact: Contact;
  currentIndex: number = -1;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.retrieveContacts();
  }

  retrieveContacts(): void {
    this.contactService.getAll()
      .subscribe(
        data => {
          this.contacts = data;
        },
        error => {
          console.log(error);
        });
  }

  setActiveContact(contact: Contact, index: number): void {
    this.currentContact = contact;
    this.currentIndex = index;
  }

  searchName(name: string) {
    this.currentIndex = -1;
    this.contactService.findByName(name)
      .subscribe(
        data => {
          this.contacts = data;
        },
        error => {
          console.log(error);
        });
  }

  deleteContact(deletedContact: Contact): void {
    this.contactService.deleteContact(deletedContact.id)
      .subscribe(
        data => {
          this.contacts = data;
        },
        error => {
          console.log(error);
        });
  }
}
