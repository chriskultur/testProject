import {Injectable} from '@angular/core';
import {Adresse} from 'app/shared/models/adresse.model';
import {createRequestOptionBetriebAdresse} from 'app/shared/util/request-util';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class AdresseService {
  private resourceUrl = 'services/bettab/api/V1/betriebe/Adressen';
  private resourceForAdminUrl = 'services/bettab/api/V1/betriebe/Admin/Adressen';
  private resourceUrlGetAddres = 'services/bettab/api/betriebe/Adressen/crowd';
  private resourceUrlBetAddres = 'services/bettab/api/V1/betriebe/filter/Adressen';

  constructor(private http: HttpClient) {}

  create(adresse: Adresse): Observable<Adresse> {
    return this.http.post(this.resourceUrl, adresse, { observe: 'response' }).pipe(
      map((res: HttpResponse<Adresse>) => {
        return res.body;
      })
    );
  }

  update(adresse: Adresse): Observable<Adresse> {
    return this.http.put(this.resourceUrl, adresse, { observe: 'response' }).pipe(
      map((res: HttpResponse<Adresse>) => {
        return res.body;
      })
    );
  }

  find(id: number): Observable<Adresse> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(
      map((res: HttpResponse<Adresse>) => {
        return res.body;
      })
    );
  }

  query(req?: any): Observable<Adresse[]> {
    const options = createRequestOptionBetriebAdresse(req);
    return this.http
      .get(this.resourceUrl, {
        params: options,
        observe: 'response',
      })
      .pipe(
        map((res: HttpResponse<Adresse[]>) => {
          return res.body;
        })
      );
  }

  queryCrowd(req?: any): Observable<Adresse[]> {
    const options = createRequestOptionBetriebAdresse(req);
    return this.http
      .get(this.resourceUrlGetAddres, {
        params: options,
        observe: 'response',
      })
      .pipe(
        map((res: HttpResponse<Adresse[]>) => {
          return res.body;
        })
      );
  }

  filter(id: number, req?: any): Observable<Adresse[]> {
    const options = createRequestOptionBetriebAdresse(req);
    return this.http
      .get(`${this.resourceUrlBetAddres}/${id}`, {
        params: options,
        observe: 'response',
      })
      .pipe(
        map((res: HttpResponse<Adresse[]>) => {
          return res.body;
        })
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }

  updateFromAdmin(adresse: Adresse): Observable<Adresse> {
    return this.http.put(this.resourceForAdminUrl, adresse, { observe: 'response' }).pipe(
      map((res: HttpResponse<Adresse>) => {
        return res.body;
      })
    );
  }
}
