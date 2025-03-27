import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { ShoppingItem, ShoppingItemResponse } from '../interfaces/shopping-item/shoppingItem.interface';
import { ShoppingListPayload } from '../interfaces/shopping-list/payload-shoppingList.interface';
import { ShoppingList } from '../interfaces/shopping-list/shoppingList.interface';
import { PaginationResponse } from '../interfaces/shared/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private http = inject(HttpClient);
  private shoppingListUrl = 'http://localhost:5294/api/shoppingList';
  private itemsUrl = 'http://localhost:5294/api/shoppingItem';


  private itemSubject = new BehaviorSubject<ShoppingItem[]>([]);
  items$ = this.itemSubject.asObservable();

  createShoppingList(payload: ShoppingListPayload){
    return this.http.post<ShoppingList>(this.shoppingListUrl, payload)
  }

  getShoppingList(id: string){
    return this.http.get<ShoppingList>(`${this.shoppingListUrl}/${id}`);
  }

  getAllShoppingList(){
    return this.http.get<ShoppingList[]>(`${this.shoppingListUrl}`);
  }

  updateShoppingList(id: string, payload: ShoppingListPayload) {
    return this.http.put<ShoppingList>(`${this.shoppingListUrl}/${id}`, payload);
  }

  deleteShoppingList(id: string) {
    return this.http.delete(`${this.shoppingListUrl}/${id}`);
  }

  getItems(shoppingListId: number, page = 1, pageSize = 10){
    return this.http.get<PaginationResponse<ShoppingItemResponse>>
    (`${this.itemsUrl}?shoppingListId=${shoppingListId}&page=${page}&pageSize=${pageSize}`);

  };
  createItem(item: ShoppingItem, shoppingListId: number){
    return this.http.post<ShoppingItemResponse>(this.itemsUrl, {...item, shoppingListId}).pipe(
      tap(newItem => {
        const currentItems = this.itemSubject.value;
        this.itemSubject.next([...currentItems, newItem]);
      })
    )
  }

  removeItem(shoppingItemId: number){
    return this.http.delete(`${this.itemsUrl}/${shoppingItemId}`).pipe(
      tap(() =>{
        const currentItems = this.itemSubject.value.filter(i => i.id !== shoppingItemId);
        this.itemSubject.next(currentItems);
      })
    )
  }

  setItems(items: ShoppingItem[]) {
    this.itemSubject.next(items);
}
}
