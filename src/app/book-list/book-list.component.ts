import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { Book } from '../book.model';
import { BookService } from '../book.service';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  constructor(private http: HttpClient, private bookService: BookService) {}

  ngOnInit(): void {
    this.books = this.bookService.books;
    this.bookService.bookSubscription.subscribe((bookData: any) => {
      this.books = bookData;
    });
  }
}
