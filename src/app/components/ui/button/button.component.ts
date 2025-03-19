import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output("submit") clickEvent = new EventEmitter();
  @Output("navigate") navigateEvent = new EventEmitter();

  text: string = '';

  constructor(private buttonService: ButtonService){}

  ngOnInit(){
    if(this.type === 'primary'){
      this.buttonService.primaryText$.subscribe(text => {
        this.text = text;
      });
    } else {
      this.buttonService.secondaryText$.subscribe(text => {
        this.text = text;
      })
    }
  }

  handleClick(){
    if(this.type === 'primary'){ 
      this.clickEvent.emit();
    } else{
      console.log('botao navigate clicado');
      this.navigateEvent.emit();
    }
  }
}
