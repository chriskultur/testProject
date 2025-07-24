import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {AccountService} from 'app/core/auth/account.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class HomepageGuard  {
  constructor(private router: Router, private principal: AccountService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log("inot acocunt1");
    return this.principal.fetchwithPromise().pipe(
      map(account => {
        console.log("inot acocunt2");
        if (!account) {
          console.log("inot acocunt");
          return true;
        } else {
          console.log(" acocunt");
          if (state.url.includes('public') && !state.url.includes('download')) {
            this.router.navigateByUrl(state.url.replace('/public', ''));
          } else if (state.url.includes('download')) {
            this.router.navigate(['download', state.url.split('download/')[1]]);
          } else {
            this.router.navigate(['dashboard']);
          }
          return false;
        }
      },(error)=>{
        console.log("error");
      })
    );
  }
}
