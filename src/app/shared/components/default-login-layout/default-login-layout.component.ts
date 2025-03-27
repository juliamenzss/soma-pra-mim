import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { Router } from '@angular/router';
import { ButtonService } from '../../services/ui/button.service';

@Component({
  selector: 'app-default-login-layout',
  imports: [ButtonComponent],
  templateUrl: './default-login-layout.component.html',
  styleUrl: './default-login-layout.component.scss'
})
export class DefaultLoginLayoutComponent {

  constructor(private router: Router, public buttonService: ButtonService){}
  @Input() title: string = "";
  @Input() subtitle: string = "";
  @Input() disablePrimaryBtn: boolean = true;


  @Output("submit") submit = new EventEmitter();
  @Output("navigate") navigate = new EventEmitter();
  @Output("navigateHome") navigateHome = new EventEmitter();


  handleNavigateHome(){
    this.router.navigate(['/']);
  }

  handlePrimaryCLick() {
    this.submit.emit();
  }

  handleSecondaryCLick() {
    this.navigate.emit();
  }

}
