import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BpBet} from 'app/shared/models/bpBet.model';
import {createRequestOptionVerknupfung} from 'app/shared/util/request-util';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class BpBetService {
  private resourceUrl = 'services/bettab/api/V1/Benutzer/Betrieb';

  constructor(private http: HttpClient) {}

  // createerror(bpbet: String): Observable<BpBet> {
  //     return this.http.post(this.resourceUrl, bpbet).map((res: Response) => {
  //
  //         const jsonResponse = res.json();
  //         return jsonResponse;
  //     });
  // }

  create(bpbet: BpBet): Observable<BpBet> {
    return this.http.post(this.resourceUrl, bpbet, { observe: 'response' }).pipe(
      map((res: HttpResponse<BpBet>) => {
        return res.body;
      })
    );
  }

  query(req?: any): Observable<BpBet[]> {
    const options = createRequestOptionVerknupfung(req);
    return this.http
      .get(this.resourceUrl, {
        params: options,
        observe: 'response',
      })
      .pipe(
        map((res: HttpResponse<BpBet[]>) => {
          return res.body;
        })
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }

  getKunstlerBetriebName(betId: number) {
    return this.http
      .get('services/prodtab/api/V1/Produkt/Kunstler/Name/' + betId, { observe: 'response', responseType: 'text' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }
}
