import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/login`, {
      username,
      password,
    });
  }

  register(username: string, password: string, passConfirm: string) {
    return this.http.post(`${environment.apiUrl}/register`, {
      username,
      password,
      passConfirm,
    });
  }
}
