import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProduktionTabObj} from 'app/shared/models/production.model';
import {AngebotTabObj} from 'app/shared/models/ange-prod.model';
import {ProdMedia} from 'app/shared/models/production-media.model';
import {WerkMedia} from 'app/shared/models/werk-media.model';
import {Wertelisten} from 'app/shared/models/suggestionWertelisten.model';

@Injectable()
export class PublicProductionService {
  private publicProducionURL = 'services/prodtab/api/public/Produkt/Produktion/';
  private publicProducionAngebotURL = 'services/prodtab/api/public/Angebot/filter/Produktion/';
  private publicProducionMediaURL = 'services/prodtab/api/public/produkt/filter/Produktion/media/';
  private publicProducionMediaURLMinimal = 'services/prodtab/api/public/produkt/filter/Produktion/media/minimal/';
  private publicProducionMediaOneURL = 'services/prodtab/api/public/produkt/Produktion/media/';
  private publicWertlistURL = 'services/prodtab/api/public/Liste/Wertelisten/all';
  private prodProdMitwirPersonListUrl = 'services/prodtab/api/public/produkt/Produktion/Mitwikende/Person/';
  private resourceUrlProductionmitwirkendProdInfoOne = 'services/prodtab/api/public/V1/mitwirkende/database/single/';

  constructor(private http: HttpClient) {}

  getPublicProduction(id): Observable<ProduktionTabObj> {
    return this.http.get(this.publicProducionURL + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<ProduktionTabObj>) => {
        return res.body;
      })
    );
  }

  getPublicProductionAngebot(id): Observable<AngebotTabObj[]> {
    return this.http.get(this.publicProducionAngebotURL + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<AngebotTabObj[]>) => {
        return res.body;
      })
    );
  }

  getPublicProductionMedia(id): Observable<ProdMedia[]> {
    return this.http.get(this.publicProducionMediaURL + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<ProdMedia[]>) => {
        return res.body;
      })
    );
  }

  getPublicProductionMediaMinimal(id): Observable<ProdMedia[]> {
    return this.http.get(this.publicProducionMediaURLMinimal + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<ProdMedia[]>) => {
        return res.body;
      })
    );
  }

  getPublicProductionMediaOne(id): Observable<ProdMedia[]> {
    return this.http.get(this.publicProducionMediaOneURL + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<ProdMedia[]>) => {
        return res.body;
      })
    );
  }

  getProdProdHauptBild(id: any) {
    return this.http.get(`${this.publicProducionMediaURL}${id}`, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  getPublicProductionMediaWithQuery(id): Observable<WerkMedia[]> {
    return this.http.get(`${this.publicProducionMediaURL}-1?id.in=${id}`, { observe: 'response' }).pipe(
      map((res: HttpResponse<WerkMedia[]>) => {
        return res.body;
      })
    );
  }

  getWertlist(id): Observable<Wertelisten[]> {
    return this.http.get(`${this.publicWertlistURL}?listeNr.equals=${id}`, { observe: 'response' }).pipe(
      map((res: HttpResponse<Wertelisten[]>) => {
        return res.body;
      })
    );
  }

  getProdProdMitwirkPersonById(id: number) {
    return this.http.get(this.prodProdMitwirPersonListUrl + id, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  /*get all mitwirkend with Production Info with betribe id*/
  getAllProductionmitwirkendWithProdInfoSIngle(betId: number, id: number) {
    return this.http
      .get(this.resourceUrlProductionmitwirkendProdInfoOne + betId + '/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }
}
