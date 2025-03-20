import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/ui/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { ToastrService } from 'ngx-toastr';
import { ButtonService } from '../../services/ui/button.service';

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
    this.buttonService.setLoginText();
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
}
