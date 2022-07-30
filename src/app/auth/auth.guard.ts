import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';


import { AuthServiceService } from './auth-service.service'
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthServiceService, private router: Router) {
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.auth.user$.pipe(
        take(1),
        map(user => !!user), // <-- map to boolean
        tap(loggedIn => {
          if (!loggedIn) {
            console.log('access denied')
            this.router.navigate(['/login']);
          }
      })
 )
  }
  
}
