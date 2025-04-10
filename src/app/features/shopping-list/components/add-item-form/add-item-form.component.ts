import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShoppingListService } from '../../../../shared/services/shopping-list.service';
import { ShoppingItemPayload } from '../../../../shared/interfaces/shopping-item/payload-shoppingItem.interface';
import { ShoppingItem } from '../../../../shared/interfaces/shopping-item/shoppingItem.interface';
import { take } from 'rxjs';

interface CreateItemForm {
  name: FormControl,
  price: FormControl,
  quantity: FormControl
}

@Component({
  selector: 'app-add-item-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-item-form.component.html',
  styleUrl: './add-item-form.component.scss'
})
export class AddItemFormComponent {
  @Input() shoppingListId!: number;
  @Output() itemCreated = new EventEmitter<void>();


  createItemForm!: FormGroup<CreateItemForm>;

  constructor(
    private shoppingListService: ShoppingListService,
    private toastService: ToastrService,
    private fb: FormBuilder
  ) { }


  ngOnInit() {
    this.createItemForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [Validators.required],
      quantity: [Validators.required],
    });
  }


  handleSubmit(event: Event) {
    event.preventDefault();

    const payload: ShoppingItemPayload = {
      name: this.createItemForm.value.name ?? '',
      price: this.createItemForm.value.price ?? 0,
      quantity: this.createItemForm.value.quantity ?? 0,
      shoppingListId: this.shoppingListId
    };

    if (this.createItemForm.invalid) {
      this.toastService.warning("Preencha todos os campos corretamente");
      return;
    }

    this.shoppingListService
      .createItem(payload, this.shoppingListId)
      .pipe(take(1))
      .subscribe(() => {
        this.createItemForm.reset()
        this.itemCreated.emit();
      });
  }
}

