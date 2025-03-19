import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SignupResponse } from '../../types/signup-response.type';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient: HttpClient) { }

  signup(name: string, email: string, password: string): Observable<SignupResponse> {
    const signupData = { name, email, password };

    return this.httpClient.post<SignupResponse>("/signup", signupData).pipe(
      tap((response) => {
        sessionStorage.setItem('auth-token', response.token)
        sessionStorage.setItem('username', response.token)
      })
    )
  }
}
