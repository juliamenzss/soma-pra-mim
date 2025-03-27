import { ShoppingItem } from "../shopping-item/shoppingItem.interface";

export interface ShoppingList {
  id: number;
  name: string;
  marketName: string;
  budget: number;
  totalPrice: number;
  shoppingItem: ShoppingItem[];
}

export interface shoppingListResponse extends ShoppingList{
  
}

