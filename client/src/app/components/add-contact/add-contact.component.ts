import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})

export class AddContactComponent implements OnInit {

  exform: any;
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.exform = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-z]*')]),
      'surname': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-z]*')]),
      'number': new FormControl(
        null,
        [
          Validators.required,
          Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')
        ]),

      'birthday': new FormControl(null, Validators.pattern('(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}')),
      'address': new FormControl(null)
    });
  }

  submitData(): void {
    const newContact: Contact = {
      name: this.exform.value.name,
      surname: this.exform.value.surname,
      number: this.exform.value.number,
      birthday: this.exform.value.birthday,
      address: this.exform.value.address
    };

    if (this.exform.valid) {
      this.contactService.create(newContact)
        .subscribe(
          data => {
            alert(data.msg);
            this.exform.reset()
          },
          error => {
            if (error.status === 409) {
              alert("Phone already exist")
            } else {
              alert(error.message)
            }
          });
    }
  }

  get name() {
    return this.exform.get('name');
  }

  get surname() {
    return this.exform.get('surname');
  }

  get number() {
    return this.exform.get('number');
  }

  get birthday() {
    return this.exform.get('birthday');
  }

  get address() {
    return this.exform.get('address');
  }

}
