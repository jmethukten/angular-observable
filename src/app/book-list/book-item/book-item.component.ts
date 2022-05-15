import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Book } from 'src/app/book.model';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss'],
})
export class BookItemComponent implements OnInit {
  @Input() info!: Book;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {}

  getCurrentBook(id: string) {
    this.bookService.getWishlist(id);
  }
}
