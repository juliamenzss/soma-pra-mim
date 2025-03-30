import { ChangeDetectorRef, Component, OnInit, Signal } from '@angular/core';
import { DefaultCreateSLLayoutComponent } from "../../components/default-create-sl-layout/default-create-sl-layout.component";
import { PrimaryInputComponent } from "../../../../shared/components/ui/primary-input/primary-input.component";
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShoppingListService } from '../../../../shared/services/shopping-list.service';
import { ButtonService } from '../../../../shared/services/ui/button.service';
import { ToastrService } from 'ngx-toastr';
import { ShoppingListPayload } from '../../../../shared/interfaces/shopping-list/payload-shoppingList.interface';
import { ButtonComponent } from "../../../../shared/components/ui/button/button.component";
import { take } from 'rxjs';

interface ShoppingListForm {
  budget: FormControl,
  name: FormControl,
  marketName: FormControl,
}

@Component({
  selector: 'app-create-shopping-list',
  imports: [DefaultCreateSLLayoutComponent, ReactiveFormsModule, PrimaryInputComponent, ButtonComponent],
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
  ) {}

  ngOnInit() {
        this.buttonService.setText('Criar Lista', 'Voltar', '/');
        this.shoppingListForm = new FormGroup({
          budget: new FormControl<number>(0, [Validators.required]),
          name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
          marketName: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
        });
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    if(this.shoppingListForm.invalid) {
      this.toastService.warning("Preencha todos os campos corretamente");
      return;
    }

    if(this.shoppingListForm.valid){
      const payload: ShoppingListPayload = {
        name: this.shoppingListForm.value.name ?? "",
        marketName: this.shoppingListForm.value.marketName ?? "",
        budget: this.shoppingListForm.value.budget ?? 0,
        totalPrice: 0, shoppingItem: [],
        userId: 2
      };

      this.shoppingListService.createShoppingList(payload).pipe(take(1)).subscribe(
        {
        next: (shoppingList) => {this.router.navigate([`/shopping-list/${shoppingList.id}`])
      },
        error: () => {this.toastService.error("Erro ao criar a lista. Tente novamente.")}
        });
    }
  }

  handleNavigate() {
    this.router.navigate(['/']);
  }
}
