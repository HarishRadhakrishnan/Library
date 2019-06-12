import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksListComponent } from './books-list/books-list.component';
import { BooksDetailComponent } from './books-detail/books-detail.component';
import { SharedModule } from '../shared/shared.module';
import { BooksEditComponent } from './books-edit/books-edit.component';


@NgModule({
  imports: [
    CommonModule,
    BooksRoutingModule,
    SharedModule
  ],
  declarations: [BooksListComponent, BooksDetailComponent, BooksEditComponent] 
})
export class BooksModule { }
