import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() text: string = "Botão";
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Input() size: 'small' | 'large' = 'small';
  @Input() disablePrimaryBtn: boolean = true;

  @Output("submit") onSubmit = new EventEmitter();
  @Output("navigate") onNavigate = new EventEmitter();

  onClick(){
    this.onSubmit.emit();
  }
  navigate(){
    this.onNavigate.emit();
  }
}
