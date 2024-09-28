import { Component } from '@angular/core';
import { MessageListItemComponent } from '@shared/chat/message-list-item/message-list-item.component';


const imports = [
  MessageListItemComponent
];
@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [imports],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {
  rooms: string[] = [ "thuba", "kurtis","kaylee"]
}
