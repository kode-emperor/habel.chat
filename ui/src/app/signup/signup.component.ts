import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Forms } from '@shared/forms.css';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  css = Forms;
}
