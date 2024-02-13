import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8081/api/user';
  constructor(private http: HttpClient) {}

  login(documentNumber: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, documentNumber);
  }

}
