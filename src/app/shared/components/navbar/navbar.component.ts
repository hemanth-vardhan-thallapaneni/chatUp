import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { ChatServiceService } from 'src/app/core/chat-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  toggleControl = new FormControl(false);
  darkClassName = '';
  @HostBinding('class') className = '';
  constructor(
    private auth:AuthServiceService,
    private chatservice:ChatServiceService
  ) { }

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      console.log(darkMode)
      this.darkClassName = darkMode ?  'darkMode' : '';
      this.chatservice.darkTheme.next(this.darkClassName);
    });
    
  }
  signOut(){
      this.auth.signOut();
  }

}
