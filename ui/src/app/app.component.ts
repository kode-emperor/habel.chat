import { Component, } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';


const imports = [
  RouterOutlet, 
  ChatComponent, 
  LoginComponent,
  RouterLink,
  HeaderComponent
]
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [imports],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'srv';
  constructor(private router: Router) {
  }
  
}
