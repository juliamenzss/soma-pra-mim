import { Component, Input } from '@angular/core';
import { ListItemComponent } from '../../components/list-item/list-item.component';
import { ShoppingListService } from '../../../../shared/services/shopping-list.service';
import { CommonModule } from '@angular/common';
import { ShoppingItem } from '../../../../shared/interfaces/shopping-item/shoppingItem.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-list-detail',
  imports: [ListItemComponent, CommonModule],
  templateUrl: './shopping-list-detail.component.html',
  styleUrl: './shopping-list-detail.component.scss'
})
export class ShoppingListDetailComponent {
  @Input() shoppingListId!: number;
  productName: string = '';
  productPrice: number | null = null;
  quantity: number | null = null;
  items$!: Observable<ShoppingItem[]>;

  constructor(private shoppingListService: ShoppingListService){
    this.items$ = this.shoppingListService.items$;
  }
  ngOnInit() {
    this.shoppingListService.getItems(this.shoppingListId).subscribe(response =>{
      this.shoppingListService.setItems(response.items);
    })
  }

  addProduct() {
    if (!this.productName || this.productPrice === null) return;

    const newProduct: ShoppingItem = {
      id: 0,
      name: this.productName,
      price: this.productPrice,
      quantity: 1,
      shoppingListId: this.shoppingListId
        };

    this.shoppingListService.createItem(newProduct, this.shoppingListId).subscribe(() =>{
      this.productName = '',
      this.productPrice = null
    });
  }
}
