import {
  Component,
  OnInit,
  PLATFORM_ID,
  inject,
  makeStateKey,
} from '@angular/core';
import { CommonModule, isPlatformServer } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TransferState } from '@angular/platform-browser';
import { QuoteService } from './services/quote.service';
import { ITMDBMovie } from './models/ITMDBTrendingMoviesResponse';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Movies';

  quoteService = inject(QuoteService);
  transferState = inject(TransferState);
  movies?: ITMDBMovie[];

  ngOnInit() {
    this.quoteService.getTrendingMovies();
  }
}
