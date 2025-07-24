import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BpSucheModel} from 'app/shared/models/bp-suche.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {createRequestOptionBetrieb} from 'app/shared/util/request-util';

@Injectable()
export class BpSucheService {
  private resourceUrlSuch = 'services/bptab/api/V1/benutzer/suche';

  constructor(private http: HttpClient) {}

  createBenSuch(bpSuch: BpSucheModel): Observable<BpSucheModel> {
    return this.http.post(this.resourceUrlSuch, bpSuch, { observe: 'response' }).pipe(map((res: HttpResponse<BpSucheModel>) => res.body));
  }

  updateBenSuch(bpSuch: BpSucheModel): Observable<BpSucheModel> {
    return this.http.put(this.resourceUrlSuch, bpSuch, { observe: 'response' }).pipe(map((res: HttpResponse<BpSucheModel>) => res.body));
  }

  getBenSuchQuery(req?: any): Observable<BpSucheModel[]> {
    const options = createRequestOptionBetrieb(req);
    return this.http
      .get(this.resourceUrlSuch + '/all', { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<BpSucheModel[]>) => res.body));
  }
}
