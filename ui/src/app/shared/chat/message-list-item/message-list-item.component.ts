import { Component } from '@angular/core';
import { AvatarComponent } from "../../avatar/avatar.component";
import { CommonModule } from '@angular/common';

const imports = [
  AvatarComponent,
  CommonModule
]

@Component({
  selector: 'message-list-item',
  standalone: true,
  imports: [imports],
  templateUrl: './message-list-item.component.html',
  styleUrl: './message-list-item.component.css'
})
export class MessageListItemComponent {
  message: {
    from: string,
    data: string,
    receivedAt: Date,
    avatar: string
  } = {
    from: "Moses Levi",
    data: "Hear O Israel, the LORD our God, the LORD is one.",
    receivedAt: new Date(2024,9,27, 18,20,12),
    avatar: "assets/serene_professiona_elegance.jpeg"
  }
}
