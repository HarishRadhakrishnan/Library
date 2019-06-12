import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _auth: AuthService, private router: Router){}
  public loggedData : any;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLoggedIn();
  }

  checkLoggedIn() : boolean{
    this._auth.isLoggedIn.subscribe(data => this.loggedData = data);
    if(this.loggedData.loggedIn){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
