import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'chat-bubble',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-bubble.component.html',
  styleUrl: './chat-bubble.component.css'
})
export class ChatBubbleComponent {
  @Input() messagetime: string = "00:00";
  @Input() message: string = "";
  @Input() chatDirection = "chat-start";
  @Input() bubbleForeground = "text-neutral-950";
  @Input() bubbleBackground = "bg-slate-50";
  
}
