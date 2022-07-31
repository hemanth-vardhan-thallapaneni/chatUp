import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { ChatServiceService } from 'src/app/core/chat-service.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  cards = [
    {
      image:'../../../../assets/Images/Google_Icons-09-512.webp',
      name:'Hemanth',
      last_message: 'Hello!',
      last_seen:'10:30pm'
    },
    {
      image:'../../../../assets/Images/Google_Icons-09-512.webp',
      name:'Hemanth',
      last_message: 'Hello!',
      last_seen:'10:30pm'
    },
    {
      image:'../../../../assets/Images/Google_Icons-09-512.webp',
      name:'Hemanth',
      last_message: 'Hello!',
      last_seen:'10:30pm'
    }
  ];
  constructor(
    private chatservice: ChatServiceService,
    private auth:AuthServiceService
  ) { }

  ngOnInit(): void {
        
  }
  creatChat(){
    
    this.chatservice.create();
  }
  signOut(){
    this.auth.signOut()
  }

}
