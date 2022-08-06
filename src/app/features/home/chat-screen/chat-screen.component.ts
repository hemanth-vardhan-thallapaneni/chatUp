import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { ChatServiceService } from 'src/app/core/chat-service.service';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.scss']
})
export class ChatScreenComponent implements OnInit {

  isNoMessage:boolean =false;
  user_id:any;
  chatId:string;
  message:string;
  group_messages:any = []
  constructor(
    private chatservice:ChatServiceService,
    private auth:AuthServiceService
  ) { }
  

  ngOnInit(): void {
    this.user_id = sessionStorage.getItem('id')
       this.chatservice.chatId.subscribe((res:any)=>{
          if(res){
            this.chatId = res;
            this.isNoMessage =false;
            this.chatservice.get(this.chatId).subscribe(res=>{
              this.group_messages = [...res['messages']]
              console.log(this.group_messages,this.user_id)
            })
          }
       })
       
  }

  sendMessage(message:any){
    let id:any;
    this.chatservice.chatId.subscribe((res:any)=>{
      id = res;
      console.log('dsfasd',res)
    })
    this.chatId = id;
    console.log('id',id)
    this.chatservice.sendMessage(this.chatId,message);
  }

}
