import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksListComponent } from './books-list/books-list.component';
import { BooksDetailComponent } from './books-detail/books-detail.component';
import { BooksEditComponent } from './books-edit/books-edit.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: 'books-list', component: BooksListComponent, canActivate: [AuthGuard] },
  { path: 'books-list/:id', component: BooksDetailComponent, canActivate: [AuthGuard]  },
  { path: 'books-list/:id/edit', component: BooksEditComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
