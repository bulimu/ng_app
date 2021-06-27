import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddContactComponent } from './components/add-contact/add-contact.component';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';

const routes: Routes = [
  {path: '', component: ContactsListComponent},
  {path: 'add', component: AddContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
