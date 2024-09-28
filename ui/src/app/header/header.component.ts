import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

const imports = [
  RouterLink,
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [imports],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() isAuthenticated: WritableSignal<boolean> = signal(false);
  authService: AuthService = inject(AuthService)
  constructor() {
    effect(() =>{
      this.authService.isAuthenticated$.subscribe( value => this.isAuthenticated.update(v => value))
    })
    console.log(this.isAuthenticated())
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
