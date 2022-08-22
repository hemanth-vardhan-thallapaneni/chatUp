import { Component, Inject, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { ChatServiceService } from 'src/app/core/chat-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  cards:any = [];
  constructor(
    private chatservice: ChatServiceService,
    private auth:AuthServiceService,
    public dialog: MatDialog,
    
  ) { }

  ngOnInit(): void {
   this.getChatsList();
  }
  async getChatsList(){
    this.cards = await this.chatservice.getChats();
    console.log('cards',this.cards)
  }
  creatChat(){
    const dialogRef = this.dialog.open(GroupDetailsDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
    
      this.chatservice.create(result);
     
    });
    
  }

   
  
  signOut(){
    this.auth.signOut()
  }
  selectChat(card:any){
    this.chatservice.chatId.next(card);
   
  }

}
@Component({
  selector: 'group-details-dialog',
  templateUrl: 'group-details-dialog.html',
  styleUrls: ['./chat-list.component.scss']
})
export class GroupDetailsDialog {
  path:string;
  group = {
    name:'',
    image:''
  }
  constructor(
    public dialogRef: MatDialogRef<GroupDetailsDialog>,
  ) {}

  upload(event:any){
     this.group.image = event?.target.files[0]
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}