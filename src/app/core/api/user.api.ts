import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '@environments';
import { User } from '@types';

@Injectable({
  providedIn: 'root',
})
export class UserAPI {
  private apiUrl = config.api.BASE_API_URL;
  private http: HttpClient = inject(HttpClient);

  public registerUser(
    email: User['email'],
    password: User['password'],
    name: User['userInfo']['name'],
    profilePicture?: User['userInfo']['profilePicture'],
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/auth/register`, {
      user: {
        email,
        password,
        userInfo: {
          name,
          ...{
            ...(profilePicture && { profilePicture }),
          },
        },
      },
    });
  }

  public logInUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, {
      email,
      password,
    });
  }
}
