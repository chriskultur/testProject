import {Injectable} from '@angular/core';
import {BetriebSecurityModel} from "app/shared/models/betriebSecurity.model";
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class BetribeSecurityService {

  private resourceUrlSecurity = 'services/bettab/api/V1/betrieb/access_rights';

  constructor(private http: HttpClient) {
  }

  checkAccessRights(securityObject: BetriebSecurityModel) : Observable<boolean> {
    return this.http.post(this.resourceUrlSecurity, securityObject, {observe : "response"}).pipe(map((res: HttpResponse<boolean>) => {
      return res.body;
    }));
  }

}
