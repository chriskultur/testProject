import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Stage} from 'app/shared/models/stage.model';
import {map} from 'rxjs/operators';
import {StageMedia} from 'app/shared/models/stage-media.model';
import {AngebotSpiel} from 'app/shared/models/ange-spiel.model';
import {ProdStageModel} from 'app/shared/models/prod-stage.model';

@Injectable()
export class PublicSpielstatteService {
  private publicSpielstatteURL = 'services/bettab/api/public/betriebe/Spielstaetten/';
  private publicSpielstatteProdURL = 'services/prodtab/api/public/Produkt/Spielstätte/';
  private publicSpielstatteMediaURL = 'services/prodtab/api/public/Produkt/filter/Spielstätte/Media/';
  private publicSpielstatteMediaOneURL = 'services/prodtab/api/public/Produkt/Spielstätte/Media/';
  private publicSpielstatteMediaURLMinimal = 'services/prodtab/api/public/Produkt/filter/Spielstätte/Media/minimal/';
  private publicSpielstatteAngebotURL = 'services/prodtab/api/public/Angebot/filter/Spielstatte/';

  constructor(private http: HttpClient) {}

  getPublicSpiel(id): Observable<Stage> {
    return this.http.get(this.publicSpielstatteURL + id, { observe: 'response' }).pipe(map((res: HttpResponse<Stage>) => res.body));
  }

  getPublicSpielProd(id): Observable<ProdStageModel> {
    return this.http
      .get(this.publicSpielstatteProdURL + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<ProdStageModel>) => res.body));
  }

  getPublicSpielAngebot(id): Observable<AngebotSpiel[]> {
    return this.http
      .get(this.publicSpielstatteAngebotURL + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<AngebotSpiel[]>) => res.body));
  }

  getPublicSpielMedia(id): Observable<StageMedia[]> {
    return this.http
      .get(this.publicSpielstatteMediaURL + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<StageMedia[]>) => res.body));
  }

  getPublicSpielMediaOne(id): Observable<StageMedia> {
    return this.http
      .get(this.publicSpielstatteMediaOneURL + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<StageMedia>) => res.body));
  }

  getPublicSpielMediaMinimal(id): Observable<StageMedia[]> {
    return this.http
      .get(this.publicSpielstatteMediaURLMinimal + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<StageMedia[]>) => res.body));
  }

  getPublicSpielMediaWithQuery(id): Observable<StageMedia[]> {
    return this.http
      .get(`${this.publicSpielstatteMediaURL}-1?id.in=${id}`, { observe: 'response' })
      .pipe(map((res: HttpResponse<StageMedia[]>) => res.body));
  }
}
