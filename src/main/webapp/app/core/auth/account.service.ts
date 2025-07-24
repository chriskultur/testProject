import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable, of, ReplaySubject} from 'rxjs';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';

import {StateStorageService} from 'app/core/auth/state-storage.service';
import {ApplicationConfigService} from '../config/application-config.service';
import {Account} from 'app/core/auth/account.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userIdentity: Account | null = null;
  static userIdentity11: Account | null = null;
  private authenticationState = new ReplaySubject<Account | null>(1);
  private accountCache$?: Observable<Account> | null;
  static authenticationSSS= new ReplaySubject<Account | null>(1);

  constructor(
    private http: HttpClient,
    private stateStorageService: StateStorageService,
    private router: Router,
    private applicationConfigService: ApplicationConfigService
  ) {}

  authenticate(identity: Account | null): void {
    this.userIdentity = identity;
    this.authenticationState.next(this.userIdentity);
    AccountService.userIdentity11= identity;
    if (!identity) {
      this.accountCache$ = null;
    }
  }

  fetchwithPromise(): Observable<any> {
    return this.http.get(SERVER_API_URL + 'api/account', { observe: 'response' }).pipe(
      map(res => {
        if (res['Error']) {
          alert('Movie not found at guard!');
          return false;
        } else {
          return true;
        }
      }),
      catchError(err => {
        console.clear();
        return of(false);
      })
    );
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    if (!this.userIdentity) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    return this.userIdentity.authorities.some((authority: string) => authorities.includes(authority));
  }

  identity(force?: boolean): Observable<Account | null> {
    if (!this.accountCache$ || force) {
      this.accountCache$ = this.fetch().pipe(
        tap((account: Account) => {
          this.authenticate(account);

          this.navigateToStoredUrl();
        }),
        shareReplay()
      );
    }
    return this.accountCache$.pipe(catchError(() => of(null)));
  }

  isAuthenticated(): boolean {
    return this.userIdentity !== null;
  }

   getAuthenticationState(): Observable<Account | null> {
    return this.authenticationState.asObservable();
  }

  static getAuthenticationState(): boolean {
    console.log( "account checking "+AccountService.userIdentity11 !== null)
    return AccountService.userIdentity11 !== null;
  }

  private fetch(): Observable<Account> {
    return this.http.get<Account>(this.applicationConfigService.getEndpointFor('api/account'));
  }

  private navigateToStoredUrl(): void {
    // previousState can be set in the authExpiredInterceptor and in the userRouteAccessService
    // if login is successful, go to stored previousState and clear previousState
    const previousUrl = this.stateStorageService.getUrl();
    if (previousUrl) {
      this.stateStorageService.clearUrl();
      this.router.navigateByUrl(previousUrl);
    }
  }
}
