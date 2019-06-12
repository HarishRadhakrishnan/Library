import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupByPipe } from './group-by.pipe';
import { FormsModule } from '@angular/forms';
import { SearchBoxPipe } from './search-box.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [GroupByPipe, SearchBoxPipe],
  exports: [GroupByPipe, FormsModule, SearchBoxPipe]
})
export class SharedModule { }
