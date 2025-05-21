import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { $appConfig } from '@environments';
import { UserPrivate } from '@types';

@Injectable({
  providedIn: 'root',
})
export class UserAPI {
  private apiUrl = $appConfig.api.BASE_API_URL;
  private http: HttpClient = inject(HttpClient);

  public registerUser(
    email: UserPrivate['email'],
    password: UserPrivate['password'],
    name: UserPrivate['userInfo']['name'],
    profilePicture?: UserPrivate['userInfo']['profilePicture'],
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
      login: {
        email,
        password,
      },
    });
  }

  public verifyToken(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  public refreshTokens(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/refresh?token=${token}`);
  }

  public getUserInfo(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/user?userid=${userId}`);
  }

  public getUsersInfo(userIds: string[]): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/user/users?userids=${userIds.join(',')}`,
    );
  }

  public getUserPersonalInfo(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/user-private`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
