import { Component, OnInit } from '@angular/core';
import { ChatServiceService } from 'src/app/core/chat-service.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  constructor(
    private chatservice: ChatServiceService
  ) { }

  ngOnInit(): void {
  }
  creatChat(){
    this.chatservice.create();
  }

}
