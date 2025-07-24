import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {KunstlerProduktModel} from 'app/shared/models/kunstler-produkt.model';
import {map} from 'rxjs/operators';
import {createRequestOptionGeneral} from 'app/shared/util/request-util';
import {KunstlerProdMediaModel} from 'app/shared/models/kunstler-prod-media.model';
import {KunstlerProduktStatusModel} from 'app/shared/models/kunstler-produkt-status.model';
import {Betrieb} from 'app/shared/models/betrieb.model';
import {BpBetVerknupfung} from 'app/shared/models/bpBetVerknupfung.model';

@Injectable()
export class KunstlerService {
  public kunstlerBetriebUrl = 'services/bettab/api/V1/betriebe/Kunstler';
  public kunstlerProduktUrl = 'services/prodtab/api/V1/Produkt/Kunstler';
  public kunstlerProduktStatusUrl = 'services/prodtab/api/V1/Angebot/Kunstler/Status';
  public kunstlerProduktMediaUrl = 'services/prodtab/api/V1/Produkt/Kunstler/Media';
  public kunstlerProduktMediaUrlMinimal = 'services/prodtab/api/V1/Produkt/Kunstler/Media/minimal';
  public kunstlerProduktProjektListUrl = 'services/prodtab/api/V1/kunstler/mitwirkende/list/';
  public kunslerProduktStatus = 'services/prodtab/api/V1/production/menu\n';
  public kunstlerBetriebVerknupfung = 'services/bettab/api/V1/betriebe/Benutzerverknupfung/Kunstleranleger';
  public kunstlerBetriebMitarbiterVerknupfung = 'services/bettab/api/V1/betriebe/Benutzerverknupfung/Kunstleranleger/';

  constructor(private http: HttpClient) {}

  postKunstlerBetrieb(data: Betrieb) {
    return this.http.post(this.kunstlerBetriebUrl, data, { observe: 'response' }).pipe(map((res: HttpResponse<Betrieb>) => res.body));
  }

  putKunstlerBetrieb(data: Betrieb) {
    return this.http.put(this.kunstlerBetriebUrl, data, { observe: 'response' }).pipe(map((res: HttpResponse<Betrieb>) => res.body));
  }

  deleteKunstlerBetrieb(betId: number) {
    return this.http.delete(this.kunstlerBetriebUrl + '/' + betId, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  postKunstlerBetriebVerknupfung(data: BpBetVerknupfung) {
    return this.http
      .post(this.kunstlerBetriebVerknupfung, data, { observe: 'response' })
      .pipe(map((res: HttpResponse<BpBetVerknupfung>) => res.body));
  }

  postKunstlerProdukt(data: KunstlerProduktModel) {
    return this.http
      .post(this.kunstlerProduktUrl, data, { observe: 'response' })
      .pipe(map((res: HttpResponse<KunstlerProduktModel>) => res.body));
  }

  putKunstlerProdukt(data: KunstlerProduktModel) {
    return this.http
      .put(this.kunstlerProduktUrl, data, { observe: 'response' })
      .pipe(map((res: HttpResponse<KunstlerProduktModel>) => res.body));
  }

  getKunstlerProduktById(id: number) {
    return this.http
      .get(this.kunstlerProduktUrl + '/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<KunstlerProduktModel>) => res.body));
  }

  getKunstlerProduktByQuery(req: any) {
    const options = createRequestOptionGeneral(req);
    return this.http
      .get(this.kunstlerProduktUrl, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<KunstlerProduktModel[]>) => res.body));
  }

  postKunstlerProduktMedia(data: KunstlerProdMediaModel) {
    return this.http
      .post(this.kunstlerProduktMediaUrl, data, { observe: 'response' })
      .pipe(map((res: HttpResponse<KunstlerProdMediaModel>) => res.body));
  }

  putKunstlerProduktMedia(data: KunstlerProdMediaModel) {
    return this.http
      .put(this.kunstlerProduktMediaUrl, data, { observe: 'response' })
      .pipe(map((res: HttpResponse<KunstlerProdMediaModel>) => res.body));
  }

  deleteKunstlerProduktByIdMedia(id: number) {
    return this.http
      .delete(this.kunstlerProduktMediaUrl + '/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<KunstlerProdMediaModel>) => res.body));
  }

  getKunstlerProduktByIdMedia(id: number) {
    return this.http.get(this.kunstlerProduktMediaUrl + '/' + id, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  getKunstlerProduktMediaByQuery(req: any) {
    const options = createRequestOptionGeneral(req);
    return this.http
      .get(this.kunstlerProduktMediaUrl, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<KunstlerProdMediaModel[]>) => res.body));
  }

  getKunstlerProduktMediaByQueryMinimal(req: any) {
    const options = createRequestOptionGeneral(req);
    return this.http
      .get(this.kunstlerProduktMediaUrlMinimal, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<KunstlerProdMediaModel[]>) => res.body));
  }

  getKunstlerProductionStatus(menuIDObject) {
    return this.http.post(this.kunslerProduktStatus, menuIDObject, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  postKunstlerProduktStatus(data: KunstlerProduktStatusModel) {
    return this.http
      .post(this.kunstlerProduktStatusUrl, data, { observe: 'response' })
      .pipe(map((res: HttpResponse<KunstlerProduktStatusModel>) => res.body));
  }

  putKunstlerProduktStatus(data: KunstlerProduktStatusModel) {
    return this.http
      .put(this.kunstlerProduktStatusUrl, data, { observe: 'response' })
      .pipe(map((res: HttpResponse<KunstlerProduktStatusModel>) => res.body));
  }

  deleteKunstlerProduktByIdStatus(id: number) {
    return this.http
      .delete(this.kunstlerProduktStatusUrl + '/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<KunstlerProduktStatusModel>) => res.body));
  }

  getKunstlerProduktProjektByProdKunstId(prodKunstId: number) {
    return this.http
      .get(this.kunstlerProduktProjektListUrl + prodKunstId, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  postKunstlerBetriebMitarbeiterVerknupfung(betId, mitId) {
    return this.http
      .post(this.kunstlerBetriebMitarbiterVerknupfung + betId + '/' + mitId, null, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }
}
