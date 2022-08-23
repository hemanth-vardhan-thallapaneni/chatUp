import { Component } from '@angular/core';
import { AuthServiceService } from './auth/auth-service.service';
import { ChatServiceService } from './core/chat-service.service';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chatUp';
  loggedIn:boolean;
  darkMode:any='';
  constructor(
    private auth:AuthServiceService,
    private chatserice:ChatServiceService
  ){
    this.auth.isLoggedIn.subscribe(loggedIn=>{
      this.loggedIn = loggedIn
    })
   this.chatserice.darkTheme.subscribe((theme:any)=>{
    this.darkMode = theme;
   })
  }
}
