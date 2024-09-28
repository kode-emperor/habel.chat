import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'login'
  },
  {
    path: 'chat',
    title: 'chats',
    component: ChatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    title: "signup",
    component: SignupComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "",
    redirectTo: "/home", pathMatch: "full"
  }
];
