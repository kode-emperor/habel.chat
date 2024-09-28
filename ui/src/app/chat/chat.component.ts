import { Component, ElementRef, signal, ViewChild, WritableSignal } from '@angular/core';
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
import { AuthService } from '@auth0/auth0-angular';
import { ChatMessage } from '@shared/types/chat';
import { RoomsComponent } from '../rooms/rooms.component';

const imports = [
  CommonModule, 
  ChatNavigationComponent,
  AvatarComponent,
  ChatBubbleComponent,
  ChatDotsComponent,
  RoomsComponent
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
  private authService = inject(AuthService);
  
  isAuthenticated: WritableSignal<boolean> = signal(false);
  currentUser: {id: string, name: string} = {name: "", id: ""}
  recipientAvatar: string = "assets/pexels-pixabay-415829.jpg";
  messages: ChatMessage[] = [];
  typing: Boolean = false;

  @ViewChild('messageinput') messageInput!: ElementRef<HTMLInputElement>;
  constructor() {
    
  }
  ngOnInit(): void {
    this.authService.idTokenClaims$.subscribe( (data) => {
      console.log(data)
    })

    this.authService.user$.subscribe( async ( user) => {
      console.log(user?.sub)
      this.currentUser.name = await user?.nickname || "Jesus Christ";
      this.currentUser.id = uuidv4()
      console.log(user!['https://habel-chat.uk.auth0.com/username'])
    })

    this.authService.isAuthenticated$.subscribe( (authVal: boolean) => {
      this.isAuthenticated.update( (value: boolean) => authVal)
    })

    if(this.isAuthenticated()) {
      console.log(this.authService.idTokenClaims$);
      this.chatService.setupSocketConnection();
      this.chatService.OnReceivedMessage().subscribe( ( res )=> {
        if(!(res.id === this.currentUser.id))  { // dont receive your own messages
          this.messages.push(res)
        }
      })
    }else {
      this.currentUser =  {
        id: uuidv4(),
        name: 'Ella Nkosi'
      };
    }
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
    const data = {id: this.currentUser.id, name: this.currentUser.name,message: msg, createdAt: new Date(), receivedAt: null};
    this.messages.push(data);
    this.chatService.Send(data);
    this.messageInput.nativeElement.value = "";
  }

  onSendEnter(event: Event) {
    this.sendMessage(event);
  }
}
