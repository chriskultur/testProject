import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Mitrecht} from 'app/shared/models/mitarbeiter.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class SettingService {
  private resourceUrl = 'services/bettab/api/V1/betriebe/Mitarbeiter/Rechte';
  private resourceCreateListUrl = 'services/bettab/api/V1/betriebe/Mitarbeiter/Rechte/createList';
  private resourceDeleteListUrl = 'services/bettab/api/V1/betriebe/Mitarbeiter/Rechte/deleteList';
  private resourceGetUrl = 'services/bettab/api/V1/betriebe/filter/Mitarbeiter/Rechte/';

  constructor(private http: HttpClient) {}

  createMitrecht(recht: Mitrecht): Observable<Mitrecht> {
    return this.http.post(this.resourceUrl, recht, { observe: 'response' }).pipe(map((res: HttpResponse<Mitrecht>) => res.body));
  }

  createMitrechtList(recht: Mitrecht[], id): Observable<Mitrecht[]> {
    return this.http
      .post(this.resourceCreateListUrl + '/' + id, recht, { observe: 'response' })
      .pipe(map((res: HttpResponse<Mitrecht[]>) => res.body));
  }

  getMitrecht(id: number): Observable<Mitrecht[]> {
    return this.http.get(this.resourceGetUrl + id, { observe: 'response' }).pipe(map((res: HttpResponse<Mitrecht[]>) => res.body));
  }

  deleteMitrecht(recht: Mitrecht): Observable<any> {
    return this.http.delete(this.resourceUrl + '/' + recht);
  }

  deleteMitrechtList(rechtIds, id): Observable<any> {
    return this.http.put(this.resourceDeleteListUrl + '/' + id, rechtIds, { observe: 'response' });
  }
}
