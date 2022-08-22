import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { ChatServiceService } from 'src/app/core/chat-service.service';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.scss']
})
export class ChatScreenComponent implements OnInit,AfterViewInit {

  isNoMessage:boolean =true;
  user_id:any;
  chatId:any;
  message:string;
  current_message:string;
  input:any = document.getElementById("message");
  group_messages:any = []
  constructor(
    private chatservice:ChatServiceService,
    private auth:AuthServiceService
  ) { }
  ngAfterViewInit(): void {
    
    
    
             
  }
  

  ngOnInit(): void {
    this.user_id = sessionStorage.getItem('id')
       this.chatservice.chatId.subscribe((res:any)=>{
          if(res){
            this.chatId = res;
            this.isNoMessage =false;
            this.chatservice.get(this.chatId).subscribe(res=>{
              console.log(res,'res')
              this.group_messages = res
              console.log(this.group_messages,this.user_id)
            })
          }
       })
       this.input.addEventListener("keydown",(e:any) => {
        console.log(e)
        if (e.key === "Enter") {  
         this.sendMessage();
        }
      }); 
  }


  sendMessage(){

    let id:any;

    this.chatservice.chatId.subscribe((res:any)=>{
      id = res;

    })
    this.chatId = id;
    console.log('id',this.chatId)
    if(this.current_message != ''){
      this.chatservice.sendMessage(this.chatId,this.current_message);
    }
   
    this.current_message = '';
  }
  
  

}
