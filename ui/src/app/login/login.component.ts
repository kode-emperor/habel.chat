import { Component } from '@angular/core';
import { Forms } from '@shared/forms.css';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  css: typeof Forms =  Forms;

}
