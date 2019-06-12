import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../books.service';
import { Books } from '../books';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-books-edit',
  templateUrl: './books-edit.component.html',
  styleUrls: ['./books-edit.component.css']
})
export class BooksEditComponent implements OnInit {
  public id: any;
  public bookModel: any;
  public userInfo: object;
  public pagetitle: string;
  
  isbnValue: number;
  newbook:any={
    id:'',
    title : '',
    author:'',
    description:'',
    publishedOn:'',
    publisher:'',
    image:'',
    category:''
  };

  constructor(private actroute: ActivatedRoute, private bs: BooksService, private router: Router,
              private _auth: AuthService, private http: HttpClient) { }
  
  ngOnInit() {
    this._auth.isLoggedIn.subscribe(data => this.userInfo = data);
    this.actroute.paramMap.subscribe(params => {
      this.id = +params.get('id');
      this.getBook(this.id);
    }) 
  }

  getBook(id){
    if (id == 0) {
      this.pagetitle = "Add Book";
      this.bookModel = this.initializeProduct();
    }
    else{
      this.pagetitle = "Edit Book";
      this.bs.booksList.subscribe(data => this.bookModel = data.find(x=> x['id'] == id));
    }
  }

  onSubmit(){
    if(this.bookModel.id == 0){
      console.log('********', this.bookModel);
      this.bs.addBook(this.bookModel)
    }
    //this.bs.updateBook(this.bookModel);
    //this.router.navigate(['/books-list',this.bookModel.id]);
    this.router.navigate(['/books-list']);
  }

  private initializeProduct(): Books {
    // Return an initialized object
    return {
      id: 0,
      title: null,
      author: null,
      category: null,
      image: null,
      issuedTo: null,
      renewalDate: null,
      categoryId: null,
      publishedOn: null,
      stockStatus: null,
      description: null
    };
  }

  isbnFun(){
    let data:any= this.http.get('https://www.googleapis.com/books/v1/volumes?q=isbn:'+this.isbnValue);
    data.subscribe(list=>{
      this.bookModel.title = list.items[0].volumeInfo.title;
      this.bookModel.author = list.items[0].volumeInfo.authors;
      this.bookModel.category = list.items[0].volumeInfo.categories;
      this.bookModel.description = list.items[0].volumeInfo.description;
      this.bookModel.image = list.items[0].volumeInfo.imageLinks.thumbnail;
    })
  }
}
