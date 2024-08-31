import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ChatNavigationComponent } from '../shared/chat/chat-navigation/chat-navigation.component';
import { AvatarComponent } from '@shared/avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { users } from '../../data/users';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ChatNavigationComponent, AvatarComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
  private chatService = inject(ChatService);
  recipientAvatar: string = "assets/pexels-aog-pixels-263452684-12698462.jpg";
  messages: string[] = [];
  myusers = users;
  constructor() {}
  ngOnInit(): void {
    this.chatService.setupSocketConnection();
  }
  ngOnDestroy() {
    this.chatService.disconnect()
  }
  
}
