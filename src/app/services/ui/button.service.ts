import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {

  primaryText = signal<string>('Entrar');
  secondaryText = signal<string>('Criar conta')
  navigateRoute = signal<string>('signup')


  setLoginText(){
    this.primaryText.set('Entrar');
    this.secondaryText.set('Criar conta');
    this.navigateRoute.set('signup');
  }

  setSignupText(){
    this.primaryText.set('Criar conta');
    this.secondaryText.set('Entrar em sua conta');
    this.navigateRoute.set('login');
  }
}
