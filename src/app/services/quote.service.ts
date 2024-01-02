import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  PLATFORM_ID,
  TransferState,
  inject,
  makeStateKey,
  signal,
} from '@angular/core';
import {
  ITMDBMovie,
  ITMDBTrendingMoviesResponse,
} from '../models/ITMDBTrendingMoviesResponse';
import { lastValueFrom } from 'rxjs';

export const TRENDING_MOVIES = makeStateKey<any>('trendingMovies');

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  platformId = inject(PLATFORM_ID);
  transferState = inject(TransferState);
  httpClient = inject(HttpClient);

  trendingMovies = signal<ITMDBMovie[]>([]);

  async getTrendingMovies() {
    if (isPlatformServer(this.platformId)) {
      const json = await lastValueFrom(
        this.httpClient.get(
          `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${process.env['TMDB_API_KEY']}`,
          {
            headers: {
              accept: 'application/json',
            },
          }
        )
      );

      this.transferState.set(
        TRENDING_MOVIES,
        (json as ITMDBTrendingMoviesResponse).results
      );
    } else {
      this.trendingMovies.set(this.transferState.get(TRENDING_MOVIES, {}));
    }
  }
}
