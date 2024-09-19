import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'login'
  },
  {
    path: 'chat',
    title: 'chats',
    component: ChatComponent
  },
  {
    path: 'signup',
    title: "signup",
    component: SignupComponent
  }
];
