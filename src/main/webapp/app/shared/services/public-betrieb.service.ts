import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Betrieb, Betriebebild} from 'app/shared/models/betrieb.model';
import {Betmitbild, Mitarbeiter} from 'app/shared/models/mitarbeiter.model';
import {Adresse} from 'app/shared/models/adresse.model';
import {Abteilung} from 'app/shared/models/abteilung.model';
import {ProductGropuItemModelWithMedia} from 'app/shared/models/productGropuItem.model';
import {Wertelisten} from 'app/shared/models/suggestionWertelisten.model';
import {KunstlerProduktModel} from 'app/shared/models/kunstler-produkt.model';
import {createRequestOptionGeneral} from 'app/shared/util/request-util';
import {KunstlerProdMediaModel} from 'app/shared/models/kunstler-prod-media.model';

@Injectable()
export class PublicBetriebService {
  private publicBetriebURL = 'services/bettab/api/public/betriebe/Stammdaten/';
  private publicBetriebMitarbiterURL = 'services/bettab/api/public/betriebe/Mitarbeiter/';
  private publicBetriebMitarbiterContractURL = 'services/bettab/api/public/betriebe/Mitarbeiter/Contract/';
  private publicBetriebBildURL = 'services/bettab/api/public/betriebe/Bilder/';
  private publicBetriebMItarbiterBildURL = 'services/bettab/api/public/betriebe/Mitarbeiter/Bilder/';
  private publicBetrieAddressbURL = 'services/bettab/api/public/betriebe/Adressen/';
  private publicBetrieAbtielungbURL = 'services/bettab/api/public/betriebe/abteilungen/';
  private publicBetriebAllProdukt = 'services/prodtab/api/public/angebot/group/menu';
  private publicKunstlerBetriebMitwirkendeProdukt = 'services/prodtab/api/public/V1/public/kunstler/mitwirkende/list/';
  private publicWertlistURL = 'services/bettab/api/public/Listen/Wertelisten';
  private publicKunstlerProduktURL = 'services/prodtab/api/public/Produkt/Kunstler';
  private publicKunstlerProjekteURL = 'services/prodtab/api/public/Produkt/Produktion/Projekt/';
  private publicKunstlerProduktMediaURL = 'services/prodtab/api/public/Produkt/Kunstler/Media';
  private publicKunstlerProduktMediaOneURL = 'services/prodtab/api/public/Produkt/Kunstler/Media/';
  private publicKunstlerProduktMediaURLMinimal = 'services/prodtab/api/public/Produkt/Kunstler/Media/minimal';
  private publicBpVerknupfungURL = 'services/bettab/api/public/betriebe/Benutzerverknupfung/BenutzerProfil/';

  constructor(private http: HttpClient) {}

  sanitizeForRoute(betName): string {
    if (betName == null) {
      return null;
    } else {
      return betName
        .replace(/\u00e4/g, 'ae')
        .replace(/\u00c4/g, 'ae')
        .replace(/\u00dc/g, 'ue')
        .replace(/\u00fc/g, 'ue')
        .replace(/\u00d6/g, 'oe')
        .replace(/\u00f6/g, 'oe')
        .replace(/\u00df/g, 'ss')
        .replace(/\s/g, '-')
        .replace(/[^a-zA-Z0-9-]/g, '');
    }
  }

  getWertlist(id): Observable<Wertelisten[]> {
    return this.http.get(`${this.publicWertlistURL}?listeNr.equals=${id}`, { observe: 'response' }).pipe(
      map((res: HttpResponse<Wertelisten[]>) => {
        return res.body;
      })
    );
  }

  getPublicBetrieb(id): Observable<Betrieb> {
    return this.http.get(this.publicBetriebURL + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<Betrieb>) => {
        return res.body;
      })
    );
  }

  getPublicBetriebBild(id): Observable<Betriebebild[]> {
    return this.http.get(this.publicBetriebBildURL + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<Betriebebild[]>) => {
        return res.body;
      })
    );
  }

  getPublicBetriebBildWithQuery(id): Observable<Betriebebild[]> {
    return this.http.get(`${this.publicBetriebBildURL}-1?id.in=${id}`, { observe: 'response' }).pipe(
      map((res: HttpResponse<Betriebebild[]>) => {
        return res.body;
      })
    );
  }

  getPublicBetriebMitarbiter(id): Observable<Mitarbeiter[]> {
    return this.http.get(this.publicBetriebMitarbiterURL + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<Mitarbeiter[]>) => {
        return res.body;
      })
    );
  }

  getPublicBetriebMitarbiterContract(id): Observable<Mitarbeiter[]> {
    return this.http.get(this.publicBetriebMitarbiterContractURL + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<Mitarbeiter[]>) => {
        return res.body;
      })
    );
  }

  getPublicBetriebMitarbiterBild(id): Observable<Betmitbild[]> {
    return this.http.get(this.publicBetriebMItarbiterBildURL + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<Betmitbild[]>) => {
        return res.body;
      })
    );
  }

  getPublicBetriebAddress(id): Observable<Adresse[]> {
    return this.http.get(this.publicBetrieAddressbURL + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<Adresse[]>) => {
        return res.body;
      })
    );
  }

  getPublicBetriebAbtielung(id): Observable<Abteilung[]> {
    return this.http.get(this.publicBetrieAbtielungbURL + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<Abteilung[]>) => {
        return res.body;
      })
    );
  }

  getPublicBetriebAllProdukt(betId, groupId): Observable<ProductGropuItemModelWithMedia[]> {
    let object = {
      api_type: 'menu',
      betrieb_id: betId,
      produktion_id: null,
      warengruppe_gruppe_id: groupId,
    };
    return this.http.post(this.publicBetriebAllProdukt + '/' + betId + '/' + groupId, object, { observe: 'response' }).pipe(
      map((res: HttpResponse<ProductGropuItemModelWithMedia[]>) => {
        return res.body;
      })
    );
  }

  getpublicKunstlerBetriebMitwirkendeProdukt(prodId): Observable<[]> {
    return this.http.get(this.publicKunstlerBetriebMitwirkendeProdukt + prodId, { observe: 'response' }).pipe(
      map((res: HttpResponse<[]>) => {
        return res.body;
      })
    );
  }

  getPublicKunstlerProdukt(req): Observable<KunstlerProduktModel> {
    const options = createRequestOptionGeneral(req);
    return this.http.get(this.publicKunstlerProduktURL, { params: options, observe: 'response' }).pipe(
      map((res: HttpResponse<KunstlerProduktModel>) => {
        return res.body;
      })
    );
  }

  getPublicKunstlerProjekt(prodKunstId): Observable<any> {
    return this.http.get(this.publicKunstlerProjekteURL + prodKunstId, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  getPublicKunstlerProduktMedia(req): Observable<KunstlerProdMediaModel[]> {
    const options = createRequestOptionGeneral(req);
    return this.http.get(this.publicKunstlerProduktMediaURL, { params: options, observe: 'response' }).pipe(
      map((res: HttpResponse<KunstlerProdMediaModel[]>) => {
        return res.body;
      })
    );
  }

  getPublicKunstlerProduktMediaOne(id): Observable<KunstlerProdMediaModel> {
    return this.http.get(this.publicKunstlerProduktMediaOneURL + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<KunstlerProdMediaModel>) => {
        return res.body;
      })
    );
  }

  getPublicKunstlerProduktMediaMinimal(req): Observable<KunstlerProdMediaModel[]> {
    const options = createRequestOptionGeneral(req);
    return this.http.get(this.publicKunstlerProduktMediaURLMinimal, { params: options, observe: 'response' }).pipe(
      map((res: HttpResponse<KunstlerProdMediaModel[]>) => {
        return res.body;
      })
    );
  }

  getBenutzerKunstlerVerknupfung(bpId): Observable<any> {
    return this.http.get(this.publicBpVerknupfungURL + bpId, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }
}
