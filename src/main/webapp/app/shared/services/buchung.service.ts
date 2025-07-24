import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {
  AngebotInterneKostenBuchung,
  BuchAngeFrei,
  BuchAngeMedia,
  BuchAngeSummeDTOList,
  BuchFreiTerm,
  BuchFreiVorschlag,
  BuchungAngebot,
} from 'app/shared/models/buchung.model';
import {map} from 'rxjs/operators';
import {createRequestOptionVerknupfung} from 'app/shared/util/request-util';
import {Observable} from 'rxjs';

@Injectable()
export class BuchungService {
  private buchungAngebotInternalKosten = 'services/opttab/api/V1/Buchung/Angebot/Interne_Kosten';
  private buchungAngebotSumme = 'services/opttab/api/Buchung/Angbot/Summe';
  private buchungAngebotMedia = 'services/opttab/api/V1/Buchung/Media';
  private buchungAngebotMediaMinimal = 'services/opttab/api/V1/Buchung/Media/Minimal';
  private buchungAngebot = 'services/opttab/api/V1/Buchung/Angebot';
  private AnderungVorschlagUrl = 'services/opttab/api/V1/Buchung/Vorschlag';
  private buchungInterneFreiFreigabeUrl = 'services/opttab/api/V1/Buchung/Angebot/Interne/Freigabe';
  private buchungFreigabeUrl = 'services/opttab/api/V1/Buchung/Freigabe';
  private buchungStornoVorschlag = 'services/opttab/api/V1/Buchung/Storno/Vorschlag';
  private buchungStatusUrl = 'services/opttab/api/V1/Buchung/Status';

  constructor(private http: HttpClient) {}

  createBuchungAngebot(req, betId) {
    return this.http
      .post(this.buchungAngebot + '/' + betId, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<BuchungAngebot>) => res.body));
  }

  updateBuchungAngebot(req) {
    return this.http.put(this.buchungAngebot, req, { observe: 'response' }).pipe(map((res: HttpResponse<BuchungAngebot>) => res.body));
  }

  deleteBuchungAngebot(buchAngeId) {
    return this.http
      .delete(this.buchungAngebot + '/' + buchAngeId, { observe: 'response' })
      .pipe(map((res: HttpResponse<BuchungAngebot>) => res.body));
  }

  getBuchungAngebotWithId(id) {
    return this.http
      .get(this.buchungAngebot + '/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<BuchungAngebot>) => res.body));
  }

  getBuchungAngebotWithQuery(req) {
    const options = createRequestOptionVerknupfung(req);
    return this.http
      .get(this.buchungAngebot, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<BuchungAngebot[]>) => res.body));
  }

  createBuchungAngebotMedia(req) {
    return this.http.post(this.buchungAngebotMedia, req, { observe: 'response' }).pipe(map((res: HttpResponse<BuchAngeMedia>) => res.body));
  }

  updateBuchungAngebotMedia(req) {
    return this.http.put(this.buchungAngebotMedia, req, { observe: 'response' }).pipe(map((res: HttpResponse<BuchAngeMedia>) => res.body));
  }

  getBuchungAngebotMediaWithQuery(req) {
    const options = createRequestOptionVerknupfung(req);
    return this.http
      .get(this.buchungAngebotMedia, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<BuchAngeMedia[]>) => res.body));
  }

  getBuchungAngebotMediaMinimalWithQuery(req) {
    const options = createRequestOptionVerknupfung(req);
    return this.http
      .get(this.buchungAngebotMediaMinimal, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<BuchAngeMedia[]>) => res.body));
  }

  deleteBuchungAngebotMedia(id) {
    return this.http.delete(this.buchungAngebotMedia + '/' + id, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  getBuchungAngebotMediaById(id) {
    return this.http.get(this.buchungAngebotMedia + '/' + id, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  createAnderungVorschlag(req: BuchFreiVorschlag, abkoterminId): Observable<BuchFreiVorschlag> {
    return this.http
      .post(this.AnderungVorschlagUrl + '/' + abkoterminId, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<BuchFreiVorschlag>) => res.body));
  }

  createBuchungAngebotInterneKosten(req) {
    return this.http
      .post(this.buchungAngebotInternalKosten, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<AngebotInterneKostenBuchung>) => res.body));
  }

  updateBuchungAngebotInterneKosten(req) {
    return this.http
      .put(this.buchungAngebotInternalKosten, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<AngebotInterneKostenBuchung>) => res.body));
  }

  deleteBuchungAngebotInterneKosten(id) {
    return this.http
      .delete(this.buchungAngebotInternalKosten + '/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  createBuchungAngebotSumme(req) {
    return this.http
      .post(this.buchungAngebotSumme, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<BuchAngeSummeDTOList>) => res.body));
  }

  updateBuchungAngebotSumme(req) {
    return this.http
      .put(this.buchungAngebotSumme, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<BuchAngeSummeDTOList>) => res.body));
  }

  createBuchungInterneFrei(req) {
    return this.http
      .post(this.buchungInterneFreiFreigabeUrl, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<BuchAngeFrei>) => res.body));
  }

  createBuchungFrei(req) {
    return this.http.post(this.buchungFreigabeUrl, req, { observe: 'response' }).pipe(map((res: HttpResponse<BuchFreiTerm>) => res.body));
  }

  // Buchung Storno Vorschlag

  postBuchungStornoVorschlag(req) {
    return this.http.post(this.buchungStornoVorschlag, req, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  getBuchungStornoVorschlagBuchungId(buchAngeId) {
    return this.http
      .get(this.buchungStornoVorschlag + '?buchAngeId.equals=' + buchAngeId, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  // Buchung Status get

  getBuchungStatusBuchungId(buchAngeId) {
    return this.http
      .get(this.buchungStatusUrl + '?buchAngesId.equals=' + buchAngeId, { observe: 'response' })
      .pipe(map((res: HttpResponse<Array<any>>) => res.body));
  }

  /*  check mitarbiter recht to add/edit buchung */

  checkMitarbiterBuchungStatus(betId: number) {
    return this.http
      .get('services/bettab/api/V1/betriebe/Mitarbeiter/Rechte/Buchung/' + betId, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }
}
