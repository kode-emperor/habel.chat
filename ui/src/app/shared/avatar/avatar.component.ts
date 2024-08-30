import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'chat-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent {
  @Input() avatar = ""
  @Input() size = "size-16"
  @Input() styles = {};
  className = {
    "ring-brandgreen-500": true, 
    "ring-offset-base-100": true,
    "rounded-full": true, 
    "ring": true, 
    "ring-offset-2": true,
    ...this.styles
  };


}
