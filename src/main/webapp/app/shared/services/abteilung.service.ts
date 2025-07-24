import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Abteilung} from "app/shared/models/abteilung.model";
import {createRequestOptionAbteilung} from "app/shared/util/request-util";
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable()
export class AbteilungService {

  private dataUrl = 'services/bettab/api/V1/betriebe/abteilungen';
  private resourceUrl = 'services/bettab/api/V1/betriebe/abteilungen/all';
  private resourceUrlBetAbt = 'services/bettab/api/V1/betriebe/filter/abteilungen';
  private resourceSearchUrl = 'services/bettab/api/_search/abteilungs';
  private resourceURLCrowd = 'services/bettab/api/V1/betriebe/abteilungen/crowd/all';

  constructor(private http: HttpClient) {
  }

  create(abteilung: Abteilung): Observable<Abteilung> {
    return this.http.post(this.dataUrl, abteilung, {observe: "response"}).pipe(map((res: HttpResponse<Abteilung>) => {
      return res.body;
    }));
  }

  update(abteilung: Abteilung): Observable<Abteilung> {
    return this.http.put(this.dataUrl, abteilung, {observe: "response"}).pipe(map((res: HttpResponse<Abteilung>) => {
      return res.body;
    }));
  }

  find(id: number): Observable<Abteilung> {
    return this.http.get(`${this.dataUrl}/${id}`, {observe: "response"}).pipe(map((res: HttpResponse<Abteilung>) => {
      return res.body;
    }));
  }

  filter(id: number, req?: any): Observable<Abteilung[]> {
    const options = createRequestOptionAbteilung(req);
    return this.http.get(`${this.resourceUrlBetAbt}/${id}`, {params: options, observe: "response"})
      .pipe(map((res: HttpResponse<Abteilung[]>) => res.body));
  }

  query(req?: any): Observable<Abteilung[]> {
    const options = createRequestOptionAbteilung(req);
    return this.http.get(this.resourceUrl, {params: options, observe: "response"})
      .pipe(map((res: HttpResponse<Abteilung[]>) => res.body));
  }

  queryCrowd(req?: any): Observable<Abteilung[]> {
    const options = createRequestOptionAbteilung(req);
    return this.http.get(this.resourceURLCrowd, {params: options, observe: "response"})
      .pipe(map((res: HttpResponse<Abteilung[]>) => res.body));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.dataUrl}/${id}`);
  }

}
