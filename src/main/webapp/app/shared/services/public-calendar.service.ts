import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {
  AnbahnungKontakt,
  AnbahnungMediaModel,
  AnbahnungTerminModel,
  kalendareintrag,
  terminPDF,
  terminPDFMinimal,
} from 'app/shared/models/anbahnung.model';
import {BuchAngeMedia, BuchFreiVorschlag, BuchungAngebot} from 'app/shared/models/buchung.model';
import {Observable} from 'rxjs';
import {buchNachtrag} from 'app/shared/models/nachtrag.model';

@Injectable()
export class PublicCalendarService {
  private buchungNachtragURL = 'services/opttab/api/public/Buchung/Nachtrag';
  private buchungNachtragFreigabeURL = 'services/opttab/api/public/Buchung/Nachtrag/Freigabe';
  private buchungNachtragAblehnenURL = 'services/opttab/api/public/Buchung/Nachtrag/Ablehnen';

  constructor(private http: HttpClient) {}

  getTerminPdfWithAnabaIdForPreview(anbaId) {
    return this.http
      .get('services/opttab/api/public/data/preview/' + anbaId, { observe: 'response' })
      .pipe(map((res: HttpResponse<terminPDF>) => res.body));
  }

  /*public API data for confirm page*/
  getPublicAnbaWithHash(hash) {
    return this.http
      .get('services/opttab/api/public/Anba/Multiple/camunda/calendar/info/' + hash, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  getPublicAnbaAndBuchungWithHash(password, hash) {
    return this.http
      .get('services/opttab/api/public/Anbahnung/complete/data/' + password + '/' + hash, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  getPublicOneBuchungNachtrag(buchAngeId): Observable<buchNachtrag[]> {
    return this.http
      .get(this.buchungNachtragURL + '?id.equals=' + buchAngeId, { observe: 'response' })
      .pipe(map((res: HttpResponse<kalendareintrag[]>) => res.body));
  }

  acceptBuchungNachtrag(req: number, message): Observable<buchNachtrag> {
    return this.http
      .put(this.buchungNachtragFreigabeURL + '/' + req, message, { observe: 'response' })
      .pipe(map((res: HttpResponse<kalendareintrag>) => res.body));
  }

  declineBuchungNachtrag(req: number, message): Observable<buchNachtrag> {
    return this.http
      .put(this.buchungNachtragAblehnenURL + '/' + req, message, { observe: 'response' })
      .pipe(map((res: HttpResponse<kalendareintrag>) => res.body));
  }

  getPublicKalendarEintrag(hash, betId) {
    return this.http
      .get('services/opttab/api/public/kalendar/eintrag/' + hash + '/' + betId, { observe: 'response' })
      .pipe(map((res: HttpResponse<kalendareintrag[]>) => res.body));
  }

  getPublicKalendarCamunda(betId) {
    return this.http
      .get('services/bettab/api/public/camunda/tasks/calendar/' + betId, { observe: 'response' })
      .pipe(map((res: HttpResponse<Array<any>>) => res.body));
  }

  getPublicAnbaKontakt(hash, anbaId) {
    return this.http
      .get('services/opttab/api/public/Anbahnung/Kontakt/' + hash + '/' + anbaId, { observe: 'response' })
      .pipe(map((res: HttpResponse<AnbahnungKontakt[]>) => res.body));
  }

  postPublicAnbaKontakt(hash, req) {
    return this.http
      .post('services/opttab/api/public/Anbahnung/Kontakt/' + hash, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<AnbahnungKontakt[]>) => res.body));
  }

  putPublicAnbaKontakt(hash, req) {
    return this.http
      .put('services/opttab/api/public/Anbahnung/Kontakt/' + hash, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<AnbahnungKontakt[]>) => res.body));
  }

  getPublicAnbaMedia(hash, anbaId) {
    return this.http
      .get('services/opttab/api/public/anbahnung/media/' + hash + '/' + anbaId, { observe: 'response' })
      .pipe(map((res: HttpResponse<AnbahnungMediaModel[]>) => res.body));
  }

  getPublicAbkoTermin(hash, anbaId) {
    return this.http
      .get('services/opttab/api/public/Anbahnung/Termin/' + hash + '/' + anbaId, { observe: 'response' })
      .pipe(map((res: HttpResponse<AnbahnungTerminModel[]>) => res.body));
  }

  impressumBetEventAccept(hash, req) {
    return this.http
      .post('services/opttab/api/public/Anbahnung/termin/Zustand/Freigabe/Ablehnung/' + hash, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  impressumBetEventDecline(hash, req) {
    return this.http
      .post('services/opttab/api/public/Anbahnung/termin/Zustand/delete/' + hash, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  getPublicBuchungAngebot(id) {
    return this.http
      .get('services/opttab/api/public/Buchung/Angebot?anbaId.equals=' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<BuchungAngebot[]>) => res.body));
  }

  getPublicBuchungNachtrag(buchAngeId): Observable<buchNachtrag[]> {
    return this.http
      .get(this.buchungNachtragURL + '?buchAngeId.equals=' + buchAngeId + '&statusFreigegeben.equals=0', { observe: 'response' })
      .pipe(map((res: HttpResponse<kalendareintrag[]>) => res.body));
  }

  postPublicBuchungAngebot(id) {
    return this.http
      .get('services/opttab/api/public/Buchung/Angebot/pdf/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<BuchungAngebot[]>) => res.body));
  }

  getPublicBuchungAngebotMedia(id) {
    return this.http
      .get('services/opttab/api/public/Buchung/Media?buchAngesId.equals=' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<BuchAngeMedia[]>) => res.body));
  }

  getPublicStornoVorschlag(id) {
    return this.http
      .get('services/opttab/api/public/Buchung/Storno/Vorschlag/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<BuchAngeMedia[]>) => res.body));
  }

  getTerminPdfWithHash(hashId) {
    return this.http
      .get('services/opttab/api/public/data/' + hashId, { observe: 'response' })
      .pipe(map((res: HttpResponse<terminPDF>) => res.body));
  }

  getTerminPdfWithAnabaId(anbaId) {
    return this.http
      .get('services/opttab/api/public/data?anbaId.equals=' + anbaId, { observe: 'response' })
      .pipe(map((res: HttpResponse<terminPDF[]>) => res.body));
  }

  getTerminPdfWithAnabaIdMinimal(anbaId) {
    return this.http
      .get('services/opttab/api/public/minimal/data?anbaId.equals=' + anbaId, { observe: 'response' })
      .pipe(map((res: HttpResponse<terminPDFMinimal[]>) => res.body));
  }

  createAnderungVorschlagPublic(req: BuchFreiVorschlag, abkoterminId): Observable<BuchFreiVorschlag> {
    return this.http
      .post('services/opttab/api/public/Buchung/Vorschlag/' + abkoterminId, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<BuchFreiVorschlag>) => res.body));
  }

  getBetriebKalendarWithHash(hash: string) {
    return this.http
      .get('services/opttab/api/public/kalendar/eintrag/teilen/' + hash, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  getAnbaIdWithBuchId(id: number) {
    return this.http
      .get('services/opttab/api/public/buchung/anba/id/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  betriebKalendarEintragTeilenFreigeben(betId, id) {
    return this.http
      .post('services/opttab/api/public/kalendar/eintrag/teilen/accept/' + betId + '/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<BuchFreiVorschlag>) => res.body));
  }

  betriebKalendarEintragTeilenAblehnen(betId, id) {
    return this.http
      .post('services/opttab/api/public/kalendar/eintrag/decline/' + betId + '/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<BuchFreiVorschlag>) => res.body));
  }
}
