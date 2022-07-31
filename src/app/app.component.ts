import { Component } from '@angular/core';
import { AuthServiceService } from './auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chatUp';
  loggedIn:boolean;
  constructor(
    private auth:AuthServiceService
  ){
    this.auth.isLoggedIn.subscribe(loggedIn=>{
      this.loggedIn = loggedIn
    })
    
  }
}
