import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.books = [...this.bookService.wishlists];
    this.bookService.wishlistSubcription.subscribe((books: any) => {
      this.books = [...books!];
    });
    // console.log(this.books);
  }

  removeWishlist(id: string) {
    this.bookService.filterWishlist(id);
  }
}
