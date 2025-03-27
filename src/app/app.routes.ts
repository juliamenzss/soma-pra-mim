import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { SignupComponent } from './features/auth/pages/signup/signup.component';
import { ShoppingListDetailComponent } from './features/shopping-list/pages/shopping-list-detail/shopping-list-detail.component';
import { HomeComponent } from './features/home/home.component';
import { CreateShoppingListComponent } from './features/shopping-list/pages/create-shopping-list/create-shopping-list.component';
import { ShoppingListComponent } from './features/shopping-list/pages/shopping-list/shopping-list.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "shopping-list",
    component: ShoppingListComponent
  },
  {
    path: "shopping-list/create",
    component: CreateShoppingListComponent
  },
  {
    path: "shopping-list/:id",
    component: ShoppingListDetailComponent
  }
];
