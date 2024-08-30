import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ChatNavigationComponent } from '../shared/chat/chat-navigation/chat-navigation.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatNavigationComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
  private chatService = inject(ChatService);
  messages: string[] = []
  constructor() {}
  ngOnInit(): void {
    this.chatService.setupSocketConnection();
  }
  ngOnDestroy() {
    this.chatService.disconnect()
  }
  
}
