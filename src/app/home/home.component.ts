import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { BookService } from '../book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('bookInput', { static: true }) bookInput!: ElementRef;
  private inputSubscription!: Subscription;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.inputSubscription = fromEvent(this.bookInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        tap(() => {
          const keyword = this.bookInput.nativeElement.value.trim();
          if (keyword !== '') {
            this.bookService.getBooks(keyword);
          }
        })
      )
      .subscribe();
  }
}
