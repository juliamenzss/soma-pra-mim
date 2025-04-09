import { ShoppingItem } from "../shopping-item/shoppingItem.interface";

export interface ShoppingList {
  id: string;
  name: string;
  marketName: string;
  budget: number;
  totalPrice?: number;
  totalItems?: number;
  shoppingItem?: ShoppingItem[];
  userId: string
}

export interface shoppingListResponse extends ShoppingList{

}

