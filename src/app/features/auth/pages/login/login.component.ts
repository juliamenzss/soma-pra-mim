import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PrimaryInputComponent } from '../../../../shared/components/ui/primary-input/primary-input.component';
import { DefaultLoginLayoutComponent } from '../../../../shared/components/default-login-layout/default-login-layout.component';
import { LoginService } from '../../../../core/services/auth/login.service';
import { ButtonService } from '../../../../shared/services/ui/button.service';

interface LoginForm {
  email: FormControl,
  password: FormControl,
}

@Component({
  selector: 'app-login',
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;


  constructor(
    private router: Router,
    private loginService: LoginService,
    private buttonService: ButtonService,
    private toastService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit(){
    this.buttonService.setText('Entrar', 'Criar Conta', '/signup');
  }

  handleSubmit() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => this.toastService.success("Login efetuado com sucesso!"),
      error: () => this.toastService.error("Erro não esperado! Tente novamente!")
    })
  }

  handleNavigate() {
    const route = this.buttonService.navigateRoute();
    this.router.navigate([route]);
  }

  handleNavigateHome() {
    this.router.navigate(['/']);
}}
