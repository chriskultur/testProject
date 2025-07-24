import {Betmitbild} from 'app/shared/models/mitarbeiter.model';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {createRequestOptionMitarbeiterBild} from 'app/shared/util/request-util';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class MitarbeiterBilderService {
  private resourceImage = 'services/bettab/api/betriebe/Mitarbeiter/Bilder';
  private resourceImageAll = 'services/bettab/api/betriebe/filter/Mitarbeiter/Bilder';
  private resourceImageMitarbiterIdAll = 'services/bettab/api/betriebe/Mitarbeiter/Bilder/all';
  private resourceImageMitarbiterIdAllPublic = 'services/bettab/api/betriebe/Mitarbeiter/Bilder/public';
  private resourceImageAllCrowd = 'services/bettab/api/V1/betriebe/Mitarbeiter/Bilder/Crowd/all';

  constructor(private http: HttpClient) {}

  queryCrowd(req?: any): Observable<Betmitbild[]> {
    const options = createRequestOptionMitarbeiterBild(req);
    return this.http
      .get(this.resourceImageAllCrowd, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<Betmitbild[]>) => res.body));
  }

  filter(id: number, req?: any): Observable<Betmitbild[]> {
    const options = createRequestOptionMitarbeiterBild(req);
    return this.http
      .get(`${this.resourceImageAll}/${id}`, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<Betmitbild[]>) => res.body));
  }

  getMitBildMitarbiterIdList(id): Observable<Betmitbild[]> {
    return this.http
      .get(this.resourceImageMitarbiterIdAll + '?mitarbeitersId.in=' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<Betmitbild[]>) => res.body));
  }

  getMitBildMitarbiterId(id): Observable<Betmitbild[]> {
    return this.http
      .get(this.resourceImageMitarbiterIdAll + '?mitarbeitersId.equals=' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<Betmitbild[]>) => res.body));
  }

  getMitBildMitarbiterIdPublic(id): Observable<Betmitbild[]> {
    return this.http
      .get(this.resourceImageMitarbiterIdAllPublic + '/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<Betmitbild[]>) => res.body));
  }

  createImage(bpimage: Betmitbild): Observable<Betmitbild> {
    return this.http.post(this.resourceImage, bpimage, { observe: 'response' }).pipe(map((res: HttpResponse<Betmitbild>) => res.body));
  }

  updateImageMit(bpimage): Observable<Betmitbild> {
    return this.http
      .put(`${this.resourceImage}/${bpimage.id}`, bpimage, { observe: 'response' })
      .pipe(map((res: HttpResponse<Betmitbild>) => res.body));
  }

  deleteImage(id: number): Observable<any> {
    return this.http.delete(`${this.resourceImage}/${id}`, { observe: 'response' });
  }
}
