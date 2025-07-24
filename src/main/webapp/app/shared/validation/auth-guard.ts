import {Injectable} from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {AccountService} from 'app/core/auth/account.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthGuard  {
  constructor(private router: Router, private principal: AccountService, private aktiveRoute: ActivatedRoute) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.principal.fetchwithPromise().pipe(
      map(account => {
        console.log("doing");
        if (account) {
          return true;
        } else {
          if (state.url.includes('view') || state.url.includes('search-result')) {
            this.router.navigateByUrl('public' + state.url);
          }
          return false;
        }
      })
    );
  }
}
