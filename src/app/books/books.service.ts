import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Books } from './books';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  public newbookslist: Books[];
  public url= '/assets/books.json';
  public books = new BehaviorSubject<Books[]>([]);
  booksList = this.books.asObservable();

  getBooks(): Observable<Books[]>{
    return this.http.get<Books[]>(this.url);
  }

  // set booksList(books: any){
	// 	this.books.next(books);
  // };
  
	// get booksList() {
	// 	return this.books.asObservable();
  // };

  updateBook(book: Books){
    this.booksList.subscribe(data => this.newbookslist = data.map(item => {
      return item.id === book.id ? book : item;
    })); // replace matched item and returns the array)
    this.books.next(this.newbookslist);
  }

  addBook(newbook){
    this.booksList.subscribe(data => this.newbookslist = data);
    newbook.id = this.newbookslist.length + 1;
    this.newbookslist.push(newbook);
    this.books.next(this.newbookslist);
  }

  deleteBook(id){
    var i = 0;
    this.booksList.subscribe(data => this.newbookslist = data);
    this.newbookslist = this.newbookslist.filter(list =>{
      return list.id != id
    });
    this.newbookslist = this.newbookslist.map(list =>{
      list.id = ++i;
      return list;
    })
    this.books.next(this.newbookslist);
  }
}
