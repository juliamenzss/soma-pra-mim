import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {

  primaryText = signal<string>('Entrar');
  secondaryText = signal<string>('Criar conta')
  navigateRoute = signal<string>('signup')

  setText(primary: string, secondary: string, navigateRoute: string){
    this.primaryText.set(primary);
    this.secondaryText.set(secondary);
    this.navigateRoute.set(navigateRoute);
  }
}
