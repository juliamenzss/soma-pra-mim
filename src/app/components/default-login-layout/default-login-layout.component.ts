import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';

@Component({
  selector: 'app-default-login-layout',
  imports: [ButtonComponent],
  templateUrl: './default-login-layout.component.html',
  styleUrl: './default-login-layout.component.scss'
})
export class DefaultLoginLayoutComponent {
  @Input() title: string = "";

}
