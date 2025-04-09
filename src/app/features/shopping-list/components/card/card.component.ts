import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ButtonComponent } from "../../../../shared/components/ui/button/button.component";
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
@Component({
  selector: 'app-card',
  imports: [NzCardModule, CommonModule, NzIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() id!: number;
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() quantity: number = 1;
  @Output()deleteItem = new EventEmitter<number>();

  deleteProduct() {
  this.deleteItem.emit(this.id);
  }
}
