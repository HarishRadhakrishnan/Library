import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { Router } from '@angular/router';
import { Books } from '../books';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  public books: Books[] = [];
  public userInfo: object;

  constructor(private bs: BooksService, private route: Router, private _auth: AuthService) { }

  ngOnInit() {
    this._auth.isLoggedIn.subscribe(data => this.userInfo = data);
    this.bs.booksList.subscribe(data => this.books = data);
  }

  selectedBook(bookId){
    this.route.navigate(['/books-list', bookId]);
  }

  deleteBookAdmin(id){
    console.log(id);
    this.bs.deleteBook(id);
  }

}
