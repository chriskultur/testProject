import {Injectable} from '@angular/core';

import {HttpClient, HttpResponse} from '@angular/common/http';
import {Liland} from 'app/shared/models/liland.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class LilandService_bp {
  private resourceUrl = 'services/bptab/api/public/liste-lands';
  private resourceUrlbettab = 'services/bettab/api/V1/listen/land';

  constructor(private http: HttpClient) {}

  query(): Observable<Liland[]> {
    return this.http.get<Liland[]>(this.resourceUrl, { observe: 'response' }).pipe(
      map((res: HttpResponse<Liland[]>) => {
        return res.body;
      })
    );
  }
  queryPublic(id): Observable<Liland[]> {
    return this.http.get<Liland[]>(this.resourceUrl + '?id.equals=' + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<Liland[]>) => {
        return res.body;
      })
    );
  }

  find(id: any): Observable<Liland> {
    return this.http.get<Liland>(`${this.resourceUrlbettab}/${id}`, { observe: 'response' }).pipe(
      map((res: HttpResponse<Liland>) => {
        return res.body;
      })
    );
  }
}
