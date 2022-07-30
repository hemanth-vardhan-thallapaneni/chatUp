import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth:AuthServiceService,
    private router:Router
  ) {
    
   }

  ngOnInit(): void {
  }
  loginWithGoogle(){
     this.auth.googleSignin();
    
  }

}
