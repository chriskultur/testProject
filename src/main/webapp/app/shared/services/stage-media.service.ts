import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {StageMedia} from 'app/shared/models/stage-media.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProdMedia} from 'app/shared/models/production-media.model';

@Injectable()
export class StageMediaService {
  private resourceUrl = 'services/prodtab/api/V1/Produkt/Spielstätte/Media';
  private resourceUrlSearch = 'services/prodtab/api/V1/Produkt/Spielstätte/Media';
  private resourceUrlSearchFilter = 'services/prodtab/api/V1/Produkt/filter/Spielstätte/Media/';
  private resourceUrlSearchFilterMinimal = 'services/prodtab/api/V1/Produkt/filter/Spielstätte/media/minimal/';
  private resourceUrlStage = 'services/prodtab/api/V1/Produkt/Spielstätte/Media';

  constructor(private http: HttpClient) {}

  create(stageMedia: StageMedia): Observable<StageMedia> {
    return this.http.post(this.resourceUrl, stageMedia, { observe: 'response' }).pipe(map((res: HttpResponse<StageMedia>) => res.body));
  }

  update(stageMedia: StageMedia): Observable<StageMedia> {
    return this.http.put(this.resourceUrl, stageMedia, { observe: 'response' }).pipe(map((res: HttpResponse<StageMedia>) => res.body));
  }

  find(id: number): Observable<StageMedia> {
    return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(map((res: HttpResponse<StageMedia>) => res.body));
  }

  delete(id: number) {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(id: number): Observable<StageMedia[]> {
    return this.http
      .get(this.resourceUrlSearchFilter + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<StageMedia[]>) => res.body));
  }

  queryMinimal(id: number): Observable<StageMedia[]> {
    return this.http
      .get(this.resourceUrlSearchFilterMinimal + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<StageMedia[]>) => res.body));
  }

  findMediaStage(id: number): Observable<ProdMedia> {
    return this.http.get(`${this.resourceUrlStage}/${id}`, { observe: 'response' }).pipe(
      map((res: HttpResponse<ProdMedia>) => {
        return res.body;
      })
    );
  }
  /*
    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }
*/

  /*
    private convertItemFromServer(entity: StageMedia) {
        /!*entity.vorschlagAm = this.dateUtils
            .convertLocalDateFromServer(entity.vorschlagAm);
        entity.freigabeAm = this.dateUtils
            .convertLocalDateFromServer(entity.freigabeAm);*!/
    }
*/

  /* private convert(stageMedia: StageMedia): StageMedia {
        const copy: StageMedia = Object.assign({}, stageMedia);
        /!*copy.vorschlagAm = this.dateUtils
            .convertLocalDateToServer(stageMedia.vorschlagAm);
        copy.freigabeAm = this.dateUtils
            .convertLocalDateToServer(stageMedia.freigabeAm);*!/
        return copy;
    }*/
}
