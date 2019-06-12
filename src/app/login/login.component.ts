import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  newvalue: object;
  errorMessage: string;
  constructor(private _auth: AuthService, private router: Router, private zone: NgZone) { }

  ngOnInit() {
  }
  adminlogin(loginForm: NgForm){
    var self= this;
    console.log(typeof loginForm.value.username);
    this._auth.loginWithGoogle(loginForm.value.username, loginForm.value.password).then(() => {
      localStorage.setItem('login', JSON.stringify({loggedIn: true, isAdmin: true, user: 'Admin'}));
      this.newvalue = JSON.parse(localStorage.getItem('login'));
      //this._auth.isUserLoggedIn.next({loggedIn: true, isAdmin: true});
      this._auth.isUserLoggedIn.next(this.newvalue);
      this.router.navigate(['/books-list']);
    }).catch(function(error) {
      // Handle Errors here.
      self.errorMessage = error.message;
      // ...
    });
    // .catch(error => this.errorMessage = error || "Username and Password is wrong");
  }
  googlelogin(){
    this._auth.loginGoogle()
    .then(()=> {
      localStorage.setItem('login', JSON.stringify({loggedIn: true, isAdmin: false, user: 'User'}));
      this.newvalue = JSON.parse(localStorage.getItem('login'));
      this._auth.isUserLoggedIn.next(this.newvalue);
        //this._auth.isUserLoggedIn.next({loggedIn: true, isAdmin: false});
        this.zone.run(()=>{
          this.router.navigate(['/books-list']);
        })
      }).catch(error => console.log(error));
  }

}
