import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
	{path: "login", component: LoginComponent, title: "Login"},
	{path: "register", component: RegisterComponent, title: "Register"},
	{path: "profile", component: ProfileComponent, title: "Profile"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
