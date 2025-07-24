import {Injectable} from '@angular/core';
import {ProdMedia} from 'app/shared/models/production-media.model';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {createRequestOptionAbteilung, createRequestOptionBetrieb} from 'app/shared/util/request-util';

@Injectable()
export class ProdMediaService {
  private resourceUrlProduktion = 'services/prodtab/api/V1/produkt/Produktion/media';
  private resourceUrlWerk = 'services/prodtab/api/V1/produkt/Werk/media';
  private resourceUrlStage = 'services/prodtab/api/V1/Produkt/Spielstätte/Media';
  private resourceUrlSearchFilter = 'services/prodtab/api/V1/produkt/filter/Produktion/media/';
  private resourceUrlSearchFilterMinimal = 'services/prodtab/api/V1/produkt/filter/Produktion/media/minimal/';
  private resourceUrlWerkSearch = 'services/prodtab/api/V1/produkt/Werk/media/all';
  private resourceUrlProdSearch = 'services/prodtab/api/V1/produkt/Produktion/media/all';
  private resourceUrlStageSearchAll = 'services/prodtab/api/V1/Produkt/Spielstätte/Media/all';
  private resourceUrlSearchFilterWerk = 'services/prodtab/api/V1/produkt/filter/Werk/media/';
  private resourceUrlSearchFilterSpiel = 'services/prodtab/api/V1/Produkt/filter/Spielstätte/Media/';
  private resourceUrlSearchFilterWerkMinimal = 'services/prodtab/api/V1/produkt/filter/Werk/media/minimal/';
  private resourceUrlSearchFilterSpielMinimal = 'services/prodtab/api/V1/Produkt/filter/Spielstätte/media/minimal/';
  constructor(private http: HttpClient) {}

  createMediaProd(prodMedia: ProdMedia): Observable<ProdMedia> {
    return this.http.post(this.resourceUrlProduktion, prodMedia, { observe: 'response' }).pipe(
      map((res: HttpResponse<ProdMedia>) => {
        return res.body;
      })
    );
  }

  createMediaProdAll(prodMedia: ProdMedia[], prodId): Observable<ProdMedia[]> {
    return this.http.post(this.resourceUrlProduktion + '/' + prodId + '/all', prodMedia, { observe: 'response' }).pipe(
      map((res: HttpResponse<ProdMedia[]>) => {
        return res.body;
      })
    );
  }

  updateMediaProd(prodMedia: ProdMedia): Observable<ProdMedia> {
    return this.http.put(`${this.resourceUrlProduktion}/${prodMedia.id}`, prodMedia, { observe: 'response' }).pipe(
      map((res: HttpResponse<ProdMedia>) => {
        return res.body;
      })
    );
  }

  findMediaProd(id: number): Observable<ProdMedia> {
    return this.http.get(`${this.resourceUrlProduktion}/${id}`, { observe: 'response' }).pipe(
      map((res: HttpResponse<ProdMedia>) => {
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

  findMediaStage(id: number): Observable<ProdMedia> {
    return this.http.get(`${this.resourceUrlStage}/${id}`, { observe: 'response' }).pipe(
      map((res: HttpResponse<ProdMedia>) => {
        return res.body;
      })
    );
  }

  findWithMultipleIdProdWerk(id?: any): Observable<any> {
    const options = createRequestOptionAbteilung();
    return this.http
      .get(`${this.resourceUrlWerkSearch}?id.in=${id}`, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  findWithMultipleIdProdProd(id: any) {
    return this.http
      .get(`${this.resourceUrlProdSearch}?id.in=${id}`, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  findWithMultipleProdProdMediaWitProdId(id: any) {
    return this.http
      .get(`${this.resourceUrlProdSearch}?prodProdsId.in=${id}&mediatypCode.equals=BILD&reihenfolge.equals=0`, { observe: 'response' })
      .pipe(map((response: HttpResponse<any>) =>{
        if (response.body && response.body.length > 0) {
          return response.body[0];
        }
        throw new Error('No image found');
      }));
  }

  findWithMultipleIdSpiel(id: any) {
    return this.http
      .get(`${this.resourceUrlStageSearchAll}?id.in=${id}`, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  query(id: number): Observable<ProdMedia[]> {
    return this.http.get(this.resourceUrlSearchFilter + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<ProdMedia[]>) => {
        return res.body;
      })
    );
  }

  queryMinimal(id: number, req?): Observable<ProdMedia[]> {
    const options = createRequestOptionBetrieb(req);
    return this.http.get(this.resourceUrlSearchFilterMinimal + id, { params: options, observe: 'response' }).pipe(
      map((res: HttpResponse<ProdMedia[]>) => {
        return res.body;
      })
    );
  }

  queryMediaBild(id: number) {
    return this.http
      .get(this.resourceUrlSearchFilter + id + '?mediatypCode.equals=BILD' + '&reihenfolge.equals=0', { observe: 'response' })
      .pipe(
        map(res => {
          return res.body;
        })
      );
  }

  querySpielMediaBild(id: number) {
    return this.http
      .get(this.resourceUrlSearchFilterSpiel + id + '?mediatypCode.equals=BILD' + '&reihenfolge.equals=0', { observe: 'response' })
      .pipe(
        map(res => {
          return res.body;
        })
      );
  }

  queryWerkMediaBild(id: number) {
    return this.http
      .get(this.resourceUrlSearchFilterWerk + id + '?mediatypCode.equals=BILD' + '&reihenfolge.equals=0', { observe: 'response' })
      .pipe(
        map(res => {
          return res.body;
        })
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.resourceUrlProduktion}/${id}`, { observe: 'response' });
  }
}
