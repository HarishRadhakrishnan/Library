import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../books.service';
import { AuthService } from 'src/app/auth/auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-books-detail',
  templateUrl: './books-detail.component.html',
  styleUrls: ['./books-detail.component.css']
})
export class BooksDetailComponent implements OnInit {
  public bookid: any;
  public book: any;
  public userInfo: object;
  modalRef: BsModalRef;
  
  constructor(private actroute: ActivatedRoute, private bs: BooksService, private _auth: AuthService,
    private modalService: BsModalService ) { }

  ngOnInit() {
    this._auth.isLoggedIn.subscribe(data => this.userInfo = data);
    this.actroute.paramMap.subscribe(
        params => this.bookid = +params.get('id')
      );
    this.getBookDetails(this.bookid)
  }

  getBookDetails(id){
    this.bs.booksList.subscribe(data => this.book = data.find(x=> x['id'] == id));
  }

  requestBook(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }
}
