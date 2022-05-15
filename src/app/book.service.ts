import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './book.model';
import { map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookService {
  private baseURL = 'https://www.googleapis.com/books/v1/volumes?q=';

  books: Book[] = [];
  bookSubscription = new Subject();

  wishlists: Book[] = [];
  wishlistSubcription = new Subject();

  constructor(private http: HttpClient) {}

  getWishlist(id: string) {
    const book = this.books.find((book: Book) => book.id === id);
    const isFound = this.wishlists.find((book) => book.id === id);

    if (!isFound && book) {
      this.wishlists = [...this.wishlists, book!];
      // console.log(this.wishlists);
      this.wishlistSubcription.next(this.wishlists);
    }
  }

  filterWishlist(id: string) {
    const newlist = this.wishlists.filter((book) => book.id !== id);
    this.wishlists = [...newlist];
    this.wishlistSubcription.next(this.wishlists);
  }

  getBooks(keyword: string) {
    this.http
      .get<{ [key: string]: Book }>(this.baseURL + keyword)
      .pipe(
        map((response: any) => {
          const bookDetails: Book[] = response.items.map((item: any) => {
            return {
              id: item.id,
              title: item.volumeInfo.title,
              authors: item.volumeInfo.authors,
              publisher: item.volumeInfo.publisher,
              publishedDate: item.volumeInfo.publishedDate,
              description: item.volumeInfo.description,
              imageLinks: item.volumeInfo.imageLinks.thumbnail,
            };
          });

          return bookDetails;
        }),
        tap((bookData: Book[]) => {
          this.books = [...bookData];
          this.bookSubscription.next(bookData);
        })
      )
      .subscribe();
  }
}
