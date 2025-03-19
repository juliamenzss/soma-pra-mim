import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';

@Component({
  selector: 'app-default-login-layout',
  imports: [ButtonComponent],
  templateUrl: './default-login-layout.component.html',
  styleUrl: './default-login-layout.component.scss'
})
export class DefaultLoginLayoutComponent {
  @Input() title: string = "";
  @Input() subtitle: string = "";
  @Input() disablePrimaryBtn: boolean = true;


  @Output("submit") submit = new EventEmitter();
  @Output("navigate") navigate = new EventEmitter();

  handlePrimaryCLick() {
    this.submit.emit();
  }

  handleSecondaryCLick() {
    this.navigate.emit();
  }
}
