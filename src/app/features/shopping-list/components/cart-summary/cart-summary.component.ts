import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cart-summary',
  imports: [],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.scss'
})
export class CartSummaryComponent {
@Input() totalPrice: number = 0;
@Input() totalItems: number = 0;
}
