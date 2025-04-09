import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ListItemComponent } from '../../components/list-item/list-item.component';
import { ShoppingListService } from '../../../../shared/services/shopping-list.service';
import { CommonModule } from '@angular/common';
import { ShoppingItem } from '../../../../shared/interfaces/shopping-item/shoppingItem.interface';
import { map, Observable, switchMap, take, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonService } from '../../../../shared/services/ui/button.service';
import { ToastrService } from 'ngx-toastr';
import { ShoppingItemPayload } from '../../../../shared/interfaces/shopping-item/payload-shoppingItem.interface';
import { AddItemFormComponent } from '../../components/add-item-form/add-item-form.component';

interface CreateItemForm {
  name: FormControl,
  price: FormControl,
  quantity: FormControl,
}

@Component({
  selector: 'app-shopping-list-detail',
  imports: [ListItemComponent, CommonModule, ReactiveFormsModule, AddItemFormComponent],
  templateUrl: './shopping-list-detail.component.html',
  styleUrl: './shopping-list-detail.component.scss'
})
export class ShoppingListDetailComponent implements OnInit {
  createItemForm!: FormGroup<CreateItemForm>
  totalItems: number = 0;
  totalPrice: number = 0;
  budget: number = 0;
  items!: ShoppingItem[];

  constructor(
    private shoppingListService: ShoppingListService,
    public buttonService: ButtonService,
    private toastService: ToastrService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  items$!: Observable<ShoppingItem[]>;
  shoppingListId!: number;

  ngOnInit() {
    var idRouter = this.route.snapshot.paramMap.get('id');
    this.shoppingListId = Number(idRouter);

    this.items$ = this.shoppingListService.items$;
    this.getItems(this.shoppingListId);
    this.getListData(this.shoppingListId);

    this.createItemForm = this.fb.group({
      name:['',[Validators.required, Validators.minLength(3)]],
      price:[Validators.required],
      quantity: [Validators.required],
    });
  }

  onItemCreated() {
    this.getListData(this.shoppingListId);
  }
  getListData(id: number) {
    this.shoppingListService.getShoppingList(id).pipe(take(1)).subscribe(res => {
      console.log('Atualizando lista:', res);
      this.budget = res.budget;
      this.totalPrice = res.totalPrice ?? 0;
      this.totalItems = res.totalItems ?? 0;
      this.items = res.shoppingItem ?? [];
    });
  }
  getItems(id: number) {
    this.shoppingListService.getItems(id).pipe(take(1)).subscribe(items => {
      this.shoppingListService.setItems(items);
    })
  }
  onDeletarList(id: number){
    this.shoppingListService.removeItem(id, this.shoppingListId).pipe(take(1)).subscribe(() =>
      this.getListData(this.shoppingListId));
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    if (this.createItemForm.invalid) {
      this.toastService.warning("Preencha todos os campos corretamente");
      return;
    }

    if (this.createItemForm.valid) {
      const payload: ShoppingItemPayload = {
        name: this.createItemForm.value.name ?? "",
        price: this.createItemForm.value.price ?? 0,
        quantity: this.createItemForm.value.quantity ?? 0,
        shoppingListId: this.shoppingListId,
      };

      const newProduct: ShoppingItem = {
        id: 0,
        name: payload.name,
        price: payload.price,
        quantity: payload.quantity,
        shoppingListId: this.shoppingListId,
      };

      this.shoppingListService
        .createItem(newProduct, this.shoppingListId)
        .pipe(take(1))
        .subscribe(() => {
          this.createItemForm.reset();
          setTimeout(() => {
            this.getListData(this.shoppingListId);
            this.getItems(this.shoppingListId);
          }, 5000)
        });
    }
  }
}
