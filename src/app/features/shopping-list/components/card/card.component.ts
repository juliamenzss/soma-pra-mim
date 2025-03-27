import { Component, Input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ButtonComponent } from "../../../../shared/components/ui/button/button.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [NzCardModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
@Input() productName: string = '';
@Input() productPrice: number = 0;
@Input() quantity: number = 1;
}
