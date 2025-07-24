import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {rechform} from "app/shared/models/rechtform.model";
import {createRequestOption} from "app/shared/util/request-util";
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Injectable()
export class RechtformService {

  private resourceUrl = 'services/bettab/api/V1/Liste/Rechtsform';

  constructor(private http: HttpClient) {
  }

  find(id: number): Observable<rechform> {
    return this.http.get(`${this.resourceUrl}/${id}`, {observe: "response"}).pipe(map((res: HttpResponse<rechform>) => {
      return res.body;
    }));
  }

  query(req?: any): Observable<rechform[]> {
    const options = createRequestOption(req);
    return this.http.get(this.resourceUrl, {params: options, observe: "response"})
      .pipe(map((res: HttpResponse<rechform[]>) => {
        return res.body;
      }));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }

}
