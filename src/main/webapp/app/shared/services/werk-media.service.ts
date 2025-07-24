import {Injectable} from '@angular/core';
import {WerkMedia} from 'app/shared/models/werk-media.model';
import {map} from 'rxjs/operators';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProdMedia} from 'app/shared/models/production-media.model';

@Injectable()
export class WerkMediaService {
  private resourceUrl = 'services/prodtab/api/V1/produkt/Werk/media';
  private resourceUrlSearchFilter = 'services/prodtab/api/V1/produkt/filter/Werk/media/';
  private resourceUrlSearchFilterMinimal = 'services/prodtab/api/V1/produkt/filter/Werk/media/minimal/';
  private resourceUrlWerk = 'services/prodtab/api/V1/produkt/Werk/media';

  constructor(private http: HttpClient) {}

  create(werkMedia: WerkMedia): Observable<WerkMedia> {
    return this.http.post(this.resourceUrl, werkMedia, { observe: 'response' }).pipe(
      map((res: HttpResponse<WerkMedia>) => {
        return res.body;
      })
    );
  }
  update(werkMedia: WerkMedia): Observable<WerkMedia> {
    return this.http.put(this.resourceUrl + '/' + werkMedia.id, werkMedia, { observe: 'response' }).pipe(
      map((res: HttpResponse<WerkMedia>) => {
        return res.body;
      })
    );
  }

  find(id: number): Observable<any> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  findMediaWerk(id: number): Observable<ProdMedia> {
    return this.http.get(`${this.resourceUrlWerk}/${id}`, { observe: 'response' }).pipe(
      map((res: HttpResponse<ProdMedia>) => {
        return res.body;
      })
    );
  }

  query(id: number): Observable<any> {
    return this.http.get(this.resourceUrlSearchFilter + id, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  queryMinimal(id: number): Observable<any> {
    return this.http.get(this.resourceUrlSearchFilterMinimal + id, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
