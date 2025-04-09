import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, buffer, catchError, Observable, of, tap, throwError } from 'rxjs';
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
  public items$ = this.itemSubject.asObservable();

  createShoppingList(payload: ShoppingListPayload){
    return this.http.post<ShoppingList>(this.shoppingListUrl, payload).pipe(
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  getShoppingList(id: number){
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

  getItems(shoppingListId: number){
    return this.http.get<ShoppingItemResponse[]>(`${this.shoppingListUrl}/${shoppingListId}/items`);
  };

  createItem(item: ShoppingItem, shoppingListId: number): Observable<{item: ShoppingItemResponse, totalItems: number}> {
    return this.http.post<{ item: ShoppingItemResponse, totalItems: number }>(this.itemsUrl, { ...item, shoppingListId }).pipe(
      tap(() => {
        this.refreshItems(shoppingListId);
      })
    );
  }

  removeItem(shoppingItemId: number, shoppingListId: number){
    return this.http.delete(`${this.itemsUrl}/${shoppingItemId}`).pipe(
      tap(() => this.refreshItems(shoppingListId))
    );
  }

  refreshItems(shoppingListId: number){
    this.getItems(shoppingListId).subscribe(items => {
      this.itemSubject.next(items);
    })
  }

  setItems(items: ShoppingItem[]) {
    this.itemSubject.next(items);
  }
}
