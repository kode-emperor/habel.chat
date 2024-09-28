import { Component, computed, effect, inject, Signal, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatComponent, LoginComponent,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'srv';
  authService: AuthService = inject(AuthService)
  public isAuthenticated: WritableSignal<boolean> = signal(false);
  constructor(private router: Router) {
    effect(() =>{
      this.authService.isAuthenticated$.subscribe( value => this.isAuthenticated.update(v => value))
    })
  }
  
  login() {
    if(!this.isAuthenticated()) {
      this.authService.loginWithRedirect();
    }
  }

  logout() {
    if(this.isAuthenticated()) {
      this.authService.logout()
    }
  }
}
