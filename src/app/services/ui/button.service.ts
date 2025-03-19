import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {

  private primaryTextSubject = new BehaviorSubject<string>('Entrar');
  primaryText$ = this.primaryTextSubject.asObservable();

  private secondaryTextSubject = new BehaviorSubject<string>('Criar conta');
  secondaryText$ = this.secondaryTextSubject.asObservable();

  navigateRouteSubject = new BehaviorSubject<string>('signup');
  navigateRoute$ = this.navigateRouteSubject.asObservable();


  setLoginText(){
    this.primaryTextSubject.next('Entrar');
    this.secondaryTextSubject.next('Criar conta');
    this.navigateRouteSubject.next('signup');
  }

  setSignupText(){
    this.primaryTextSubject.next('Criar conta');
    this.secondaryTextSubject.next('Entrar em sua conta');
    this.navigateRouteSubject.next('login');
  }
}
