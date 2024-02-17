import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../store/auth/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  signUp(user: User) {
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  login(user: User) {
    return this.http.post(`${this.baseUrl}/login`, user);
  }
}
