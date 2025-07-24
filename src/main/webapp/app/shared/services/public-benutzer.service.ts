import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bp, BpImage} from 'app/shared/models/bp.model';
import {map} from 'rxjs/operators';
import {Wertelisten} from 'app/shared/models/suggestionWertelisten.model';

@Injectable()
export class PublicBenutzerService {
  private publicBenutzerURL = 'services/bptab/api/public/v1/benutzer/';
  private publicBenutzerBildURL = 'services/bptab/api/public/v1/benutzer/bild/';
  private publicWertlistURL = 'services/bptab/api/public/liwertelistewerts';

  constructor(private http: HttpClient) {}

  getWertlist(id): Observable<Wertelisten[]> {
    return this.http.get(`${this.publicWertlistURL}?listeNr.equals=${id}`, { observe: 'response' }).pipe(
      map((res: HttpResponse<Wertelisten[]>) => {
        return res.body;
      })
    );
  }

  getPublicBenutzerProfile(id): Observable<Bp> {
    return this.http.get(this.publicBenutzerURL + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<Bp>) => {
        return res.body;
      })
    );
  }

  getPublicBenutzerBild(id): Observable<BpImage[]> {
    return this.http.get(this.publicBenutzerBildURL + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<BpImage[]>) => {
        return res.body;
      })
    );
  }

  getPublicBenutzerBildWithQuery(id): Observable<BpImage[]> {
    return this.http.get(`${this.publicBenutzerBildURL}-1?id.in=${id}`, { observe: 'response' }).pipe(
      map((res: HttpResponse<BpImage[]>) => {
        return res.body;
      })
    );
  }
}
