import { Component, input } from '@angular/core';
import { NoItemsComponent } from "../no-items/no-items.component";
import { CardComponent } from "../card/card.component";
import { Observable } from 'rxjs';
import { ShoppingListService } from '../../../../shared/services/shopping-list.service';
import { CommonModule } from '@angular/common';
import { ShoppingItem } from '../../../../shared/interfaces/shopping-item/shoppingItem.interface';

export interface Item{
  name: string
}

@Component({
  selector: 'app-list-item',
  imports: [NoItemsComponent, CardComponent, CommonModule],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent {
  items$: Observable<ShoppingItem[]>;

  constructor(private shoppingListService: ShoppingListService){
    this.items$ = this.shoppingListService.items$;
  }
}

