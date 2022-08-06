import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { ChatServiceService } from 'src/app/core/chat-service.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  cards:any = [];
  constructor(
    private chatservice: ChatServiceService,
    private auth:AuthServiceService
  ) { }

  ngOnInit(): void {
   this.getChatsList();
  }
  async getChatsList(){
    this.cards = await this.chatservice.getChats();
  }
  creatChat(){
    
    this.chatservice.create(name);
  }
  signOut(){
    this.auth.signOut()
  }
  selectChat(uid:any){
    this.chatservice.chatId.next(uid);
   
  }

}
