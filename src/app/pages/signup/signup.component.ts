import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/ui/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { ToastrService } from 'ngx-toastr';
import { ButtonService } from '../../services/ui/button.service';
import { SignupService } from '../../services/auth/signup.service';

interface SignupForm {
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-signup',
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
  ],
  providers: [LoginService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup<SignupForm>;


  constructor(
    private router: Router,
    private signupService: SignupService,
    private buttonService: ButtonService,
    private toastService: ToastrService
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit() {
    this.buttonService.setSignupText();
  }

  handleSubmit() {
    if(this.signupForm.valid){
      const { name, email, password } = this.signupForm.value;

      this.signupService.signup(name!, email!, password!).subscribe({
        next: () => {
          this.toastService.success('Cadastro realizado com sucesso!');
          this.router.navigate(['/home']);
        },
        error: () => {
          this.toastService.error('Erro ao cadastrar. Tente novamente mais tarde!')
        }
      });

    } else{
      this.toastService.warning('Preencha todos os campos corretamente!');
    }
  }

  handleNavigate() {
    const route = this.buttonService.navigateRouteSubject.getValue();
      this.router.navigate([route]);
  }
}
