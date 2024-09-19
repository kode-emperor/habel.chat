import { Component, ElementRef, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ChatNavigationComponent } from '../shared/chat/chat-navigation/chat-navigation.component';
import { AvatarComponent } from '@shared/avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { users } from '../../data/users';
import { ChatBubbleComponent } from '@components/chat/chat-bubble/chat-bubble.component';
import { ChatDotsComponent } from '@components/chat/chat-dots/chat-dots.component';
import { v4 as uuidv4 } from 'uuid';

const imports = [
  CommonModule, 
  ChatNavigationComponent,
  AvatarComponent,
  ChatBubbleComponent,
  ChatDotsComponent
]
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [imports],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
  private chatService = inject(ChatService);
  currentUser: {id: string, name: string};
  recipientAvatar: string = "assets/pexels-aog-pixels-263452684-12698462.jpg";
  messages: string[] = [];
  myusers = users;
  typing: Boolean = false;

  @ViewChild('messageinput') messageInput!: ElementRef<HTMLInputElement>;
  constructor() {
    this.currentUser =  {
      id: uuidv4(),
      name: 'Jesus Christ'
    };
  }
  ngOnInit(): void {
    this.chatService.setupSocketConnection();
    this.currentUser.id = this.myusers[1].id;
    console.log(this.currentUser.id);
    console.log(this.myusers[1].id)
    this.chatService.OnReceivedMessage().subscribe( ( res )=> {
      if(!(res.id === this.currentUser.id))  { // dont receive your own messages
        this.myusers.push(res);
      }
    })
  }

  ngOnDestroy() {
    this.chatService.disconnect()
  }
  
  onTyping(event: Event) {
    this.typing = true;
  }

  onFocusOut() {
    this.typing = false;
  }

  sendMessage(event: Event) {
    const d = new Date();
    const H = d.getHours();
    const M = d.getMinutes();
    const timeStr = `${H}:${M < 10 ? '0'+M: M}`;
    const msg = this.messageInput.nativeElement.value;
    const data = {id: this.currentUser.id, name: this.currentUser.name,message: msg, createdAt: new Date()};
    this.myusers.push(data);
    this.chatService.Send(data);
    this.messageInput.nativeElement.value = "";
  }

  onSendEnter(event: Event) {
    this.sendMessage(event);
  }
}
