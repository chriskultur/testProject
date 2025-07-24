import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {Account} from 'app/core/auth/account.model';
import {AccountService} from 'app/core/auth/account.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class AdminGuard  {
  constructor(private router: Router, private principal: AccountService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.principal.identity().pipe(
      map(
        (account: Account) => {
          if (account != null) {
            return account.authorities.findIndex((role: string) => role == 'ROLE_ADMIN') != -1;
          } else {
            return false;
          }
        },
        (account:any) => {
          return false;
        }
      )
    );
  }
}
