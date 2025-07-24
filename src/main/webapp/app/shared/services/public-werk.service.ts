import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Werksangaben} from 'app/shared/models/werksangaben.model';
import {Angebot} from 'app/shared/models/ange-werk.model';
import {WerkMedia} from 'app/shared/models/werk-media.model';

@Injectable()
export class PublicWerkService {
  constructor(private http: HttpClient) {}

  private publicWerkURL = 'services/prodtab/api/public/Produkt/Werk/';
  private publicWerkAngebotURL = 'services/prodtab/api/public/Angebot/filter/Werk/';
  private publicWerkAngebotStatusURL = 'services/prodtab/api/public/Angebot/filter/Werk/Status/';
  private publicWerkMediaURL = 'services/prodtab/api/public/produkt/filter/Werk/media/';
  private publicWerkMediaURLMinimal = 'services/prodtab/api/public/produkt/filter/Werk/media/minimal/';
  private publicWerkMediaOneURL = 'services/prodtab/api/public/produkt/Werk/media/';

  getPublicProductionWerk(id): Observable<Werksangaben> {
    return this.http.get(this.publicWerkURL + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<Werksangaben>) => {
        return res.body;
      })
    );
  }

  getPublicProductionWerkForProduction(id, prodId): Observable<Werksangaben> {
    return this.http.get(this.publicWerkURL + id + '/' + prodId, { observe: 'response' }).pipe(
      map((res: HttpResponse<Werksangaben>) => {
        return res.body;
      })
    );
  }

  getPublicWerkAngebot(id): Observable<Angebot[]> {
    return this.http.get(this.publicWerkAngebotURL + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<Angebot[]>) => {
        return res.body;
      })
    );
  }

  getPublicWerkMedia(id): Observable<WerkMedia[]> {
    return this.http.get(this.publicWerkMediaURL + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<WerkMedia[]>) => {
        return res.body;
      })
    );
  }

  getPublicWerkMediaOne(id): Observable<WerkMedia> {
    return this.http.get(this.publicWerkMediaOneURL + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<WerkMedia>) => {
        return res.body;
      })
    );
  }

  getPublicWerkMediaMinimal(id): Observable<WerkMedia[]> {
    return this.http.get(this.publicWerkMediaURLMinimal + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<WerkMedia[]>) => {
        return res.body;
      })
    );
  }

  getPublicWerkMediaWithQuery(id): Observable<WerkMedia[]> {
    return this.http.get(`${this.publicWerkMediaURL}-1?id.in=${id}`, { observe: 'response' }).pipe(
      map((res: HttpResponse<WerkMedia[]>) => {
        return res.body;
      })
    );
  }

  getWerkAngebotPublic(id: number): Observable<Angebot[]> {
    return this.http.get(this.publicWerkAngebotURL + id, { observe: 'response' }).pipe(map((res: HttpResponse<Angebot[]>) => res.body));
  }

  getWerkAngebotStatusPublic(id: number): Observable<Angebot[]> {
    return this.http
      .get(this.publicWerkAngebotStatusURL + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<Angebot[]>) => res.body));
  }
}
