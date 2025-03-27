import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Input, Output } from '@angular/core';
import { ButtonService } from '../../../services/ui/button.service';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  // @Input() text: string = "Botão";
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Input() size: 'small' | 'large' = 'small';
  @Input() disablePrimaryBtn: boolean = true;
  @Input() text: string = '';

  @Output("submit") clickEvent = new EventEmitter();
  @Output("navigate") navigateEvent = new EventEmitter();

  primaryText: string = '';
  secondaryText: string = '';

  constructor(private buttonService: ButtonService) {}

  ngOnInit() {
    this.primaryText = this.buttonService.primaryText();
    this.secondaryText = this.buttonService.secondaryText();
    }

  handleClick(){
    if(this.type === 'primary'){
      this.clickEvent.emit();
    } else{
      this.navigateEvent.emit();
    }
  }
}
