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
  @Input() buttonType: 'primary' | 'secondary' = 'primary';
  @Input() nativeType: 'button' | 'submit' | 'reset' = 'button';
  @Input() size: 'small' | 'large' = 'small';
  @Input() disablePrimaryBtn: boolean = false;
  @Input() text: string = '';

  @Output("submit") submitEvent = new EventEmitter();
  @Output("navigate") navigateEvent = new EventEmitter();

  primaryText: string = '';
  secondaryText: string = '';

  constructor(private buttonService: ButtonService) {}

  ngOnInit() {
    this.primaryText = this.buttonService.primaryText();
    this.secondaryText = this.buttonService.secondaryText();
    }

    handleClick(event: Event) {
      if (this.nativeType === 'submit') {
        return;
      }

      event.preventDefault();
      if (this.buttonType === 'primary') {
        this.submitEvent.emit();
      } else {
        this.navigateEvent.emit();
      }
    }
}
