import { ChangeDetectorRef, Component, OnInit, Signal } from '@angular/core';
import { DefaultCreateSLLayoutComponent } from "../../components/default-create-sl-layout/default-create-sl-layout.component";
import { PrimaryInputComponent } from "../../../../shared/components/ui/primary-input/primary-input.component";
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShoppingListService } from '../../../../shared/services/shopping-list.service';
import { ButtonService } from '../../../../shared/services/ui/button.service';
import { ToastrService } from 'ngx-toastr';
import { ShoppingListPayload } from '../../../../shared/interfaces/shopping-list/payload-shoppingList.interface';

interface ShoppingListForm {
  budget: FormControl,
  name: FormControl,
  marketName: FormControl,
}

@Component({
  selector: 'app-create-shopping-list',
  imports: [DefaultCreateSLLayoutComponent, ReactiveFormsModule],
  templateUrl: './create-shopping-list.component.html',
  styleUrl: './create-shopping-list.component.scss'
})
export class CreateShoppingListComponent {
  shoppingListForm!: FormGroup<ShoppingListForm>

  constructor(
    private router: Router,
    private shoppingListService: ShoppingListService,
    public buttonService: ButtonService,
    private toastService: ToastrService,
  ) {
    this.shoppingListForm = new FormGroup({
      budget: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      marketName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });

  }




  handleSubmit() {
    if(this.shoppingListForm.valid){
      const payload: ShoppingListPayload = {
        name: this.shoppingListForm.value.name ?? "",
        marketName: this.shoppingListForm.value.marketName ?? "",
        budget: this.shoppingListForm.value.budget ?? 0,

        totalPrice: 0, shoppingItem: []
      };

      this.shoppingListService.createShoppingList(payload).subscribe({next: (shoppingList) => {
        this.router.navigate([`/shopping-list/${shoppingList.id}`]);
        error: () => {
          this.toastService.error("Erro ao criar a lista. Tente novamente.");
        }
        }})
    }
  }

  handleNavigate() {
    console.log('Navigate clicado')
    this.router.navigate(['/']);
  }
}
