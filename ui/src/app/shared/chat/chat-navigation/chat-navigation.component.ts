import { Component, Input } from '@angular/core';
import { AvatarComponent } from '@shared/avatar/avatar.component';

@Component({
  selector: 'chat-main-nav',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './chat-navigation.component.html',
  styleUrl: './chat-navigation.component.css'
})
export class ChatNavigationComponent {
  @Input({required: true}) user: string = "Jesus Christ";
  avatar: string = "assets/pexels-pixabay-415829.jpg";
  avatarStyles = { "w-2": true}
  buttonStyles = {
    size: 'size-8',
    icon: {
      size: 'text-xl',
      color: 'text-neutral-950',
      weight: 'font-black'
    }
  };
}
