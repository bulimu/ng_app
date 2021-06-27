import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

  @Input() contact:Contact;
  @Output() onDeleteContact: EventEmitter<Contact> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  onDelete(contact:Contact) {
    this.onDeleteContact.emit(contact)    
  }
}
