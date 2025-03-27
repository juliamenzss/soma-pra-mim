import { ShoppingItem } from "./shoppingItem.interface";

export type ShoppingItemPayload = Omit<ShoppingItem, 'id'>
