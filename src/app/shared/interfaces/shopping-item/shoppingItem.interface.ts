export interface ShoppingItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  shoppingListId: number;
}

export interface ShoppingItemResponse extends ShoppingItem {}
