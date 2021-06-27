import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Contact } from '../models/contact.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  private apiUrl = 'http://localhost:3000/contacts'
  constructor(private http: HttpClient) { }

  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl)
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, data, httpOptions)
  }

  findByName(name: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/${name}`)
  }

  deleteContact(id: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`)
  }

}
