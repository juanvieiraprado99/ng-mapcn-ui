import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

const GITHUB_REPO_URL =
  'https://api.github.com/repos/juanvieiraprado99/ng-mapcn';

interface GitHubRepoResponse {
  stargazers_count: number;
}

@Injectable({ providedIn: 'root' })
export class GithubStarsService {
  private readonly http = inject(HttpClient);
  private readonly starsSignal = signal<number | null>(null);
  private loaded = false;

  readonly stars = this.starsSignal.asReadonly();

  loadStars(): void {
    if (this.loaded) return;
    this.loaded = true;
    this.http
      .get<GitHubRepoResponse>(GITHUB_REPO_URL)
      .pipe(
        map((res: GitHubRepoResponse) => res.stargazers_count),
        tap((count: number) => this.starsSignal.set(count)),
        catchError(() => {
          this.starsSignal.set(null);
          return of(null);
        }),
      )
      .subscribe();
  }
}
