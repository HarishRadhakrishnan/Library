import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BooksService } from './books/books.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pageTitle = 'LIBRARY';
  public logInfo: object;
  user: firebase.User;
  newvalue: object;

  // get isLoggedIn(): Observable<object> {
  //   this._auth.isLoggedIn.subscribe(data => this.logInfo = data);
  //   return this._auth.isLoggedIn;
  // }

  constructor(private _auth: AuthService, private router: Router,
    private bs: BooksService) { }

  ngOnInit(){
    this._auth.isLoggedIn.subscribe(data => this.logInfo = data);
    this._auth.getLoggedInUser().subscribe(user => this.user = user);
    this.getIntialBooks();
  }

  logOut(){
    this._auth.logoutWithGoogle();
    localStorage.setItem('login', JSON.stringify({loggedIn: false, isAdmin: false, user: 'Unauthorized'}));
    this.newvalue = JSON.parse(localStorage.getItem('login'));
    this._auth.isUserLoggedIn.next(this.newvalue);
    localStorage.clear();
    //this._auth.isUserLoggedIn.next({loggedIn: false, isAdmin: false});
    this.router.navigateByUrl('/home');
  }

  getIntialBooks(){
    this.bs.getBooks().subscribe(
      books =>this.bs.books.next(books),
      err=> console.log(err)
    );
  }
  
}
