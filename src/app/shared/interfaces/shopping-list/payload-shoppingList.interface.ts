import { ShoppingList } from "./shoppingList.interface";

export type ShoppingListPayload = Omit<ShoppingList, 'id'>
