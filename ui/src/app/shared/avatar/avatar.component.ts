import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'chat-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent implements OnInit{
  @Input() avatar = "";
  @Input() size = "size-16";
  @Input() ringColor = "ring-green-700";

  constructor() {
    
  }

  ngOnInit(): void {
    console.log(this.avatar);
  }

}
