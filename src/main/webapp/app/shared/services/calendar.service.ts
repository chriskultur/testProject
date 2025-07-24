import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {
  AnbahnungAnmerkungModel,
  AnbahnungKontakt,
  AnbahnungMediaModel,
  AnbahnungStammdaten,
  AnbahnungStammdatenMergedDTO,
  AnbahnungTerminModel,
  calendarViewbenutzer,
  einstellungKalendarbetrieb,
  einstellungVeranstaltungsKategoriebetrieb,
  EintragAnmerkungModel,
  filterProduktebenutzer,
  filterSpielbenutzer,
  GetAnbahnungStammdatenMergedDTO,
  kalendarEintagMediaModel,
  kalendareintrag,
  KalendarEintragBetrieb,
  messageTemplate,
  produktEntfernung,
  standardkalender,
  standardKalenderbenutzer,
  terminPDF,
} from 'app/shared/models/anbahnung.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {createRequestOptionAbteilung, createRequestOptionBetrieb} from 'app/shared/util/request-util';
import {BuchFreiVorschlag} from 'app/shared/models/buchung.model';
import {buchNachtrag} from 'app/shared/models/nachtrag.model';

@Injectable()
export class CalendarService {
  private kalendarEintrageURL = 'services/opttab/api/V1/kalendar/eintrag';
  private buchungNachtragURL = 'services/opttab/api/V1/Buchung/Nachtrag';
  private buchungNachtragFreigabeURL = 'services/opttab/api/V1/Buchung/Nachtrag/Freigabe';
  private buchungNachtragAblehnenURL = 'services/opttab/api/V1/Buchung/Nachtrag/Ablehnen';
  private buchungNachtragFreigabeSelfURL = 'services/opttab/api/V1/Buchung/Nachtrag/Freigabe/Self';
  private buchungNachtragCamundaURL = 'services/opttab/api/V1/Buchung/Nachtrag/Camunda';
  private kalendarEintrageSonstigeDeleteURL = 'services/opttab/api/V1/kalendar/eintrag/delete/sonstiges/';
  private kalendarEintrageBetriebTeilenURL = 'services/opttab/api/kalendar/eintrag/teilen';
  private kalendarEintrageBetriebNotTeilenURL = 'services/opttab/api/kalendar/eintrag/ohne-teilen';
  private AnbahnungStammdatenURL = 'services/opttab/api/V1/Anbahnung/Stammdaten';
  private AnbahnungStammdatenBigDTOURL = 'services/opttab/api/V1/Anba/Multiple/save/';
  private AnbahnungTerminURL = 'services/opttab/api/V1/Anbahnung/Termin';
  private AnbahnungTerminListOfStringsURL = 'services/opttab/api/V1/Anbahnung/list/termin';
  private anbiterUpdateTerminURL = 'services/opttab/api/V1/Anbahnung/termin/Zustand/';
  private einstellungBetribeskalender = 'services/opttab/api/V1/betrieb/einstellung/betriebskalendar';
  private standardKalenderApi = 'services/opttab/api/V1/Kalender/Standardkalender/all';
  private getstandardKalenderbenutzerFilter = 'services/opttab/api/V1/Benutzer/Standardkalender';
  private geteinstellungProduktebenutzerFilter = 'services/opttab/api/V1/benutzer/einstellung/produkte';
  private einstellungBetriebVeranstaltungKat = 'services/opttab/api/V1/Betrieb/Einstellung/Veranstaltungskategorie';
  private benutzerFilter = 'services/opttab/api/V1/benutzer/einstellung/filter';
  private anbahnugKontackURL = 'services/opttab/api/V1/Anbahnung/Kontakt';
  private anbahnugMediaURL = 'services/opttab/api/V1/anbahnung/media';
  private anbahnugMediaMinimalURL = 'services/opttab/api/V1/anbahnung/media/minimal';
  private kalendarEintragMediaURL = 'services/opttab/api/anbahnung/media/betriebskalendar';
  private kalendarEintragMediaMinimalURL = 'services/opttab/api/anbahnung/media/minimal/betriebskalendar';
  private ownresourceURL = 'services/opttab/api/V1/benutzer/einstellung/betriebskalendar';
  private betriebAnmerkung = 'services/opttab/api/V1/anbahnung/anmerkung';
  private kalendarEintragAnmerkung = 'services/opttab/api/V1/betrieb/betriebskalendar/anmerkung';
  private spielFilterBenURL = 'services/opttab/api/V1/benutzer/einstellung/spielsttate';
  private putspielFilterBenURL = 'services/opttab/api/V1/bp-/benutzer/einstellung/spielsttate';
  private calendarViewBenURL = 'services/opttab/api/V1/Benutzer/Einstellung';
  private produktEntfernungURL = 'services/opttab/api/V1/entfernung';
  private exportKalendarURL = 'services/opttab/api/V1/kalendar/export';
  private terminReminderEmailUrl = 'services/opttab/api/V1/resend/email';
  private AnderungVorschlagUrl = 'services/opttab/api/V1/Buchung/Vorschlag';
  private checkTermineUrl = 'services/opttab/api/V1/termine/check';
  private camundaAcceptDeclineURL = 'services/opttab/api/V1/Anba/Multiple/Freigabe/Ablehnung/';
  private getAnabaBigDTOForCamundaTask = 'services/opttab/api/V1/Anba/Multiple/camunda/calendar/info/';
  private errorRollbackAPI = 'services/opttab/api/V1/Anba/Error/Rollback/';

  constructor(private http: HttpClient) {}

  acceptCalendarTermin(url, body) {
    return this.http.post(url, body, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  acceptDecliendBetribsKalendatTeilen(url) {
    return this.http.post(url, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  exportKalendar(betriebId, datum_von, datum_bis) {
    let temp: { datum_von: string; datum_bis: string } = { datum_von: datum_von, datum_bis: datum_bis };
    return this.http
      .post(this.exportKalendarURL + '/' + betriebId, temp, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  /*

  calendar eintrag Object create/update/delete/get

*/

  deleteVorschlag(id) {
    return this.http.delete(this.AnderungVorschlagUrl + '/' + id, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  errorRollback(betId, anbaId) {
    return this.http
      .delete(this.errorRollbackAPI + betId + '/' + anbaId, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  createKalendarEintrage(req: kalendareintrag): Observable<kalendareintrag> {
    return this.http
      .post(this.kalendarEintrageURL, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<kalendareintrag>) => res.body));
  }

  updateKalendarEintrage(req: kalendareintrag): Observable<kalendareintrag> {
    return this.http
      .put(this.kalendarEintrageURL, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<kalendareintrag>) => res.body));
  }

  deleteKalendarEintrage(temp) {
    return this.http.post(this.kalendarEintrageURL + '/delete', temp, { observe: 'response' });
  }

  createBuchungNachtrag(req: buchNachtrag): Observable<buchNachtrag> {
    return this.http
      .post(this.buchungNachtragURL, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<kalendareintrag>) => res.body));
  }

  updateBuchungNachtrag(req: buchNachtrag): Observable<buchNachtrag> {
    return this.http.put(this.buchungNachtragURL, req, { observe: 'response' }).pipe(map((res: HttpResponse<kalendareintrag>) => res.body));
  }

  acceptBuchungNachtrag(req: number, message): Observable<buchNachtrag> {
    return this.http
      .put(this.buchungNachtragFreigabeURL + '/' + req, message, { observe: 'response' })
      .pipe(map((res: HttpResponse<kalendareintrag>) => res.body));
  }

  acceptBuchungNachtragSelf(req: number): Observable<buchNachtrag> {
    return this.http
      .put(this.buchungNachtragFreigabeSelfURL + '/' + req, null, { observe: 'response' })
      .pipe(map((res: HttpResponse<kalendareintrag>) => res.body));
  }

  declineBuchungNachtrag(req: number, message): Observable<buchNachtrag> {
    return this.http
      .put(this.buchungNachtragAblehnenURL + '/' + req, message, { observe: 'response' })
      .pipe(map((res: HttpResponse<kalendareintrag>) => res.body));
  }

  stopCamundaBuchungNachtrag(req: number): Observable<buchNachtrag> {
    return this.http
      .delete(this.buchungNachtragCamundaURL + '/' + req, { observe: 'response' })
      .pipe(map((res: HttpResponse<kalendareintrag>) => res.body));
  }

  deleteBuchungNachtrag(temp) {
    return this.http.post(this.buchungNachtragURL + '/delete', temp, { observe: 'response' });
  }

  getBuchungNachtrag(buchAngeId): Observable<buchNachtrag[]> {
    return this.http
      .get(this.buchungNachtragURL + '?buchAngeId.equals=' + buchAngeId + '&statusFreigegeben.equals=0', { observe: 'response' })
      .pipe(map((res: HttpResponse<kalendareintrag[]>) => res.body));
  }

  getOneBuchungNachtrag(buchAngeId): Observable<buchNachtrag[]> {
    return this.http
      .get(this.buchungNachtragURL + '?id.equals=' + buchAngeId, { observe: 'response' })
      .pipe(map((res: HttpResponse<kalendareintrag[]>) => res.body));
  }

  deleteSonstigeKalendarEintrage(id, betId) {
    return this.http.post(this.kalendarEintrageSonstigeDeleteURL + betId + '/' + id, { observe: 'response' });
  }

  getKalendarEintrageByEintragId(id): Observable<kalendareintrag> {
    return this.http
      .get(this.kalendarEintrageURL + '/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<kalendareintrag>) => res.body));
  }

  getCheckTermine(id, art) {
    return this.http
      .get(this.checkTermineUrl + '/' + art + '/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  getKalendarEintrage(betId): Observable<kalendareintrag[]> {
    return this.http
      .get(this.kalendarEintrageURL + '?betriebId.equals=' + betId, { observe: 'response' })
      .pipe(map((res: HttpResponse<kalendareintrag[]>) => res.body));
  }

  getKalendarEintrageReducedByDate(betId, datum_von, datum_bis): Observable<kalendareintrag[]> {
    return this.http
      .get(
        this.kalendarEintrageURL +
          '?betriebId.equals=' +
          betId +
          '&datum_von_date.greaterThanOrEqual=' +
          datum_von +
          '&datum_bis_date.lessThanOrEqual=' +
          datum_bis,
        { observe: 'response' }
      )
      .pipe(map((res: HttpResponse<kalendareintrag[]>) => res.body));
  }

  getKalendarEintrageQuery(req): Observable<kalendareintrag[]> {
    const options = createRequestOptionAbteilung(req);
    return this.http
      .get(this.kalendarEintrageURL, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<kalendareintrag[]>) => res.body));
  }

  getStandardKalendar(): Observable<standardkalender[]> {
    return this.http.get(this.standardKalenderApi, { observe: 'response' }).pipe(map((res: HttpResponse<standardkalender[]>) => res.body));
  }

  createKalendarEintrageBetriebTeilen(req: KalendarEintragBetrieb, betId): Observable<KalendarEintragBetrieb> {
    return this.http
      .post(this.kalendarEintrageBetriebTeilenURL + '/' + betId, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<KalendarEintragBetrieb>) => res.body));
  }

  getKalendarEintrageBetriebTeilenQuery(req: any): Observable<KalendarEintragBetrieb[]> {
    const options = createRequestOptionBetrieb(req);
    return this.http
      .get(this.kalendarEintrageBetriebTeilenURL, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<KalendarEintragBetrieb[]>) => res.body));
  }

  transferKalendarEintrageBetriebInterneAnmerkungen(eintragId, anbaId): Observable<AnbahnungAnmerkungModel[]> {
    return this.http
      .get(this.kalendarEintragAnmerkung + '/transfer/' + eintragId + '/' + anbaId, { observe: 'response' })
      .pipe(map((res: HttpResponse<AnbahnungAnmerkungModel[]>) => res.body));
  }

  createKalendarEintrageBetriebNotTeilen(req: KalendarEintragBetrieb): Observable<KalendarEintragBetrieb> {
    return this.http
      .post(this.kalendarEintrageBetriebNotTeilenURL, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<KalendarEintragBetrieb>) => res.body));
  }

  deleteKalendarEintragBetriebTeilen(type, betId, id) {
    return this.http
      .delete(this.kalendarEintrageBetriebTeilenURL + '/' + type + '/' + betId + '/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<KalendarEintragBetrieb>) => res.body));
  }

  /*

    Anbahnung Object create/update/delete/get

*/

  createAnbahnungStammdatenBigDto(req: AnbahnungStammdatenMergedDTO, betId): Observable<AnbahnungStammdatenMergedDTO> {
    return this.http
      .post(this.AnbahnungStammdatenBigDTOURL + betId, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<AnbahnungStammdatenMergedDTO>) => res.body));
  }

  updateAnbahnungStammdaten(req: AnbahnungStammdaten, betId): Observable<AnbahnungStammdaten> {
    return this.http
      .put(this.AnbahnungStammdatenURL + '/' + betId, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<AnbahnungStammdaten>) => res.body));
  }

  getMergeAnbaStamdatenWithAnbaId(anbaId, betId): Observable<GetAnbahnungStammdatenMergedDTO[]> {
    return this.http
      .get(this.getAnabaBigDTOForCamundaTask + betId + '?id.equals=' + anbaId, { observe: 'response' })
      .pipe(map((res: HttpResponse<GetAnbahnungStammdatenMergedDTO[]>) => res.body));
  }

  /*

  Abko Termin Object create/get

*/

  createAnbahnungTermin(req: AnbahnungTerminModel[], betId): Observable<AnbahnungTerminModel[]> {
    return this.http
      .post(this.AnbahnungTerminURL + '/' + betId, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<AnbahnungTerminModel[]>) => res.body));
  }

  getAnbahnungTermin(id): Observable<any> {
    return this.http
      .get(this.AnbahnungTerminURL + '/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<AnbahnungTerminModel>) => res.body));
  }

  getAnbahnungListOfTermin(id): Observable<any> {
    return this.http
      .get(this.AnbahnungTerminListOfStringsURL + '/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<string[]>) => res.body));
  }

  updateAnbahnungTermin(req, id): Observable<AnbahnungTerminModel[]> {
    return this.http
      .put(this.AnbahnungTerminURL + '/' + id, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<AnbahnungTerminModel[]>) => res.body));
  }

  updateAnbahnungTerminOhneCamunda(req, betId): Observable<AnbahnungTerminModel[]> {
    return this.http
      .put('services/opttab/api/V1/Anbahnung/Termin/OhneCamunda/' + betId, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<AnbahnungTerminModel[]>) => res.body));
  }

  updateAnbahnungTerminForArtChange(req, betId): Observable<any> {
    return this.http
      .put(this.anbiterUpdateTerminURL + `${betId}`, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  /*

  Create Betrieb Resource Object create/update/delete/get

*/

  createeinstellungBetribeskalender(req: einstellungKalendarbetrieb): Observable<einstellungKalendarbetrieb> {
    return this.http
      .post(this.einstellungBetribeskalender, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<einstellungKalendarbetrieb>) => res.body));
  }

  updateeinstellungBetribeskalender(req: einstellungKalendarbetrieb): Observable<einstellungKalendarbetrieb> {
    return this.http
      .put(this.einstellungBetribeskalender, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<einstellungKalendarbetrieb>) => res.body));
  }

  geteinstellungBetribeskalender(betId): Observable<einstellungKalendarbetrieb[]> {
    return this.http
      .get(this.einstellungBetribeskalender + '?betriebId.equals=' + betId, { observe: 'response' })
      .pipe(map((res: HttpResponse<einstellungKalendarbetrieb[]>) => res.body));
  }

  deleteeinstellungBetribeskalender(id) {
    return this.http.delete(this.einstellungBetribeskalender + '/' + id, { observe: 'response' });
  }

  /*

  Standard Calendar Filter Object for Benutzer create/update/delete/get

*/

  createStandardKalenderbenutzer(req: standardKalenderbenutzer): Observable<standardKalenderbenutzer> {
    return this.http
      .post(this.getstandardKalenderbenutzerFilter, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<standardKalenderbenutzer>) => res.body));
  }

  getstandardKalenderbenutzer(betId): Observable<standardKalenderbenutzer[]> {
    return this.http
      .get(this.getstandardKalenderbenutzerFilter + '/all?bpsId.equals=' + betId, { observe: 'response' })
      .pipe(map((res: HttpResponse<standardKalenderbenutzer[]>) => res.body));
  }

  deletestandardKalenderbenutzer(id: number) {
    return this.http.delete(this.getstandardKalenderbenutzerFilter + '/' + id, { observe: 'response' });
  }

  /*

   Betrieb's Production Filter Object for Benutzer create/update/delete/get

*/

  createEinstellungProduktebenutzer(req: filterProduktebenutzer): Observable<filterProduktebenutzer> {
    return this.http
      .post(this.geteinstellungProduktebenutzerFilter, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<filterProduktebenutzer>) => res.body));
  }

  updateEinstellungProduktebenutzer(req: filterProduktebenutzer): Observable<filterProduktebenutzer> {
    return this.http
      .put(this.geteinstellungProduktebenutzerFilter, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<filterProduktebenutzer>) => res.body));
  }

  geteinstellungProduktebenutzer(betId): Observable<filterProduktebenutzer[]> {
    return this.http
      .get(this.geteinstellungProduktebenutzerFilter + '?betriebId.equals=' + betId, { observe: 'response' })
      .pipe(map((res: HttpResponse<filterProduktebenutzer[]>) => res.body));
  }

  /*

    Produkt-Category create/update/delete/get

  */

  createProdKatForBetVeranstaltung(req: einstellungVeranstaltungsKategoriebetrieb): Observable<einstellungVeranstaltungsKategoriebetrieb> {
    return this.http
      .post(this.einstellungBetriebVeranstaltungKat, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<einstellungVeranstaltungsKategoriebetrieb>) => res.body));
  }

  updateProdKatForBetVeranstaltung(req: einstellungVeranstaltungsKategoriebetrieb): Observable<einstellungVeranstaltungsKategoriebetrieb> {
    return this.http
      .put(this.einstellungBetriebVeranstaltungKat, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<einstellungVeranstaltungsKategoriebetrieb>) => res.body));
  }

  deleteProdKatForBetVeranstaltung(id) {
    return this.http.delete(this.einstellungBetriebVeranstaltungKat + '/' + id, { observe: 'response' });
  }

  getProdKatForBetVeranstaltung(betId): Observable<einstellungVeranstaltungsKategoriebetrieb[]> {
    return this.http
      .get(this.einstellungBetriebVeranstaltungKat + '/all?betriebsId.equals=' + betId, { observe: 'response' })
      .pipe(map((res: HttpResponse<einstellungVeranstaltungsKategoriebetrieb[]>) => res.body));
  }

  /*

    Benutzer's Special Filter Object  create/update/delete/get

*/

  getBenutzerFilterSpecial(betId) {
    return this.http
      .get(this.benutzerFilter + '?betriebId.equals=' + betId, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  createBenutzerFilterSpecial(req) {
    return this.http.post(this.benutzerFilter, req, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  updateBenutzerFilterSpecial(req) {
    return this.http.put(this.benutzerFilter, req, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  /*

   Anbahnug Kontakt Object  create/update/delete/get

*/

  createAnbahnKontakt(req: AnbahnungKontakt): Observable<AnbahnungKontakt> {
    return this.http
      .post(this.anbahnugKontackURL, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<AnbahnungKontakt>) => res.body));
  }

  updateAnbahnKontakt(req: AnbahnungKontakt): Observable<AnbahnungKontakt> {
    return this.http
      .put(this.anbahnugKontackURL, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<AnbahnungKontakt>) => res.body));
  }

  getAnbahnKontaktWithAnbahnId(id): Observable<AnbahnungKontakt[]> {
    return this.http
      .get(this.anbahnugKontackURL + '/all?anbasId.equals=' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<AnbahnungKontakt[]>) => res.body));
  }

  /*

    Anbahn Media Object  create/update/delete/get

*/

  createAnbahnMedia(req: AnbahnungMediaModel): Observable<AnbahnungMediaModel> {
    return this.http
      .post(this.anbahnugMediaURL, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<AnbahnungMediaModel>) => res.body));
  }

  getAnbahnMediaByAnbaId(id): Observable<AnbahnungMediaModel[]> {
    return this.http
      .get(this.anbahnugMediaURL + '?anbasId.equals=' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<AnbahnungMediaModel[]>) => res.body));
  }

  getAnbahnMediaMinimalByAnbaId(id): Observable<AnbahnungMediaModel[]> {
    return this.http
      .get(this.anbahnugMediaMinimalURL + '?anbasId.equals=' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<AnbahnungMediaModel[]>) => res.body));
  }

  deleteAnbahnMedia(id): Observable<AnbahnungMediaModel> {
    return this.http
      .delete(this.anbahnugMediaURL + '/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<AnbahnungMediaModel>) => res.body));
  }

  getAnbahnMediaById(id): Observable<AnbahnungMediaModel> {
    return this.http
      .get(this.anbahnugMediaURL + '/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<AnbahnungMediaModel>) => res.body));
  }

  /*

  Calendar Eintrag Object  create/update/delete/get

*/

  createKalEintragMedia(req: kalendarEintagMediaModel): Observable<kalendarEintagMediaModel> {
    return this.http
      .post(this.kalendarEintragMediaURL, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<kalendarEintagMediaModel>) => res.body));
  }

  getKalEintragMediaByEintragId(id): Observable<kalendarEintagMediaModel[]> {
    return this.http
      .get(this.kalendarEintragMediaURL + '?kalendarEintragId.equals=' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<kalendarEintagMediaModel[]>) => res.body));
  }

  getKalEintragMediaMinimalByEintragId(id): Observable<kalendarEintagMediaModel[]> {
    return this.http
      .get(this.kalendarEintragMediaMinimalURL + '?kalendarEintragId.equals=' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<kalendarEintagMediaModel[]>) => res.body));
  }

  deleteKalEintragMedia(id): Observable<kalendarEintagMediaModel> {
    return this.http
      .post(this.kalendarEintragMediaURL + '/delete', id, { observe: 'response' })
      .pipe(map((res: HttpResponse<kalendarEintagMediaModel>) => res.body));
  }

  getKalEintragMediaById(id): Observable<kalendarEintagMediaModel> {
    return this.http
      .get(this.kalendarEintragMediaURL + '/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<kalendarEintagMediaModel>) => res.body));
  }

  /*  betrieb's Resource filter for benutzer*/

  createBetResourceFilterBen(req) {
    return this.http.post(this.ownresourceURL, req, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  updateBetResourceFilterBen(req) {
    return this.http.put(this.ownresourceURL, req, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  getBetResourceFilterBen(betId) {
    return this.http
      .get(this.ownresourceURL + '?betriebId.equals=' + betId, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  /* betrieb private anmerkung*/

  createBetAnmerkung(req): Observable<AnbahnungAnmerkungModel> {
    return this.http
      .post(this.betriebAnmerkung, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<AnbahnungAnmerkungModel>) => res.body));
  }

  getBetAnmerkung(anbahnid, betId): Observable<AnbahnungAnmerkungModel[]> {
    return this.http
      .get(this.betriebAnmerkung + '?anbasId.equals=' + anbahnid + '&betriebsId.equals=' + betId, { observe: 'response' })
      .pipe(map((res: HttpResponse<AnbahnungAnmerkungModel[]>) => res.body));
  }

  deleteBetAnmerkung(id) {
    return this.http.delete(this.betriebAnmerkung + '/' + id, { observe: 'response' });
  }

  /* eintrag private anmerkung*/

  createEintragAnmerkung(req): Observable<EintragAnmerkungModel> {
    return this.http
      .post(this.kalendarEintragAnmerkung, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<EintragAnmerkungModel>) => res.body));
  }

  getEintragAnmerkung(id): Observable<EintragAnmerkungModel[]> {
    return this.http
      .get(this.kalendarEintragAnmerkung + '?kalendarEintragId.equals=' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<EintragAnmerkungModel[]>) => res.body));
  }

  deleteEintragAnmerkung(id) {
    return this.http.delete(this.kalendarEintragAnmerkung + '/' + id, { observe: 'response' });
  }

  /*Spielsttate Filter for specific Benutzer */

  createSpielFilter(req: filterSpielbenutzer): Observable<filterSpielbenutzer> {
    return this.http
      .post(this.spielFilterBenURL, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<filterSpielbenutzer>) => res.body));
  }

  updateSpielFilter(req: filterSpielbenutzer): Observable<filterSpielbenutzer> {
    return this.http
      .put(this.putspielFilterBenURL, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<filterSpielbenutzer>) => res.body));
  }

  getSpielFilter(betId): Observable<filterSpielbenutzer[]> {
    return this.http
      .get(this.spielFilterBenURL + '?betriebId.equals=' + betId, { observe: 'response' })
      .pipe(map((res: HttpResponse<filterSpielbenutzer[]>) => res.body));
  }

  /*end camunda task*/
  deleleteCamundaTask(id) {
    return this.http
      .post('services/opttab/api/V1/camunda/endTask', id, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  endBetriebsKalendarCamundaTask(id) {
    return this.http
      .post('services/opttab/api/V1/camunda/Sonstiges/endTask', id, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  deleteBenachrichtigungs(id) {
    let url = 'services/opttab/api/benachrichtigungs/' + id;
    return this.http.delete(url, { observe: 'response' });
  }

  /*calendar view for Benutzer*/

  createcalendarViewbenutzer(req: calendarViewbenutzer): Observable<calendarViewbenutzer> {
    return this.http
      .post(this.calendarViewBenURL, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<calendarViewbenutzer>) => res.body));
  }

  updatecalendarViewbenutzer(req: calendarViewbenutzer): Observable<calendarViewbenutzer> {
    return this.http
      .put(this.calendarViewBenURL, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<calendarViewbenutzer>) => res.body));
  }

  getcalendarViewbenutzer(betId, benId): Observable<calendarViewbenutzer[]> {
    return this.http
      .get(this.calendarViewBenURL + '?betriebId.equals=' + betId + '&bpsId.equals=' + benId, { observe: 'response' })
      .pipe(map((res: HttpResponse<calendarViewbenutzer[]>) => res.body));
  }

  /*produktion Entfernung*/

  createProduktEntfernung(req: produktEntfernung): Observable<produktEntfernung> {
    return this.http
      .post(this.produktEntfernungURL, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<produktEntfernung>) => res.body));
  }

  updateProduktEntfernung(req: produktEntfernung): Observable<produktEntfernung> {
    return this.http
      .put(this.produktEntfernungURL, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<produktEntfernung>) => res.body));
  }

  getProduktEntfernung(prodId): Observable<produktEntfernung[]> {
    return this.http
      .get(this.produktEntfernungURL + '?prodProdId.equals=' + prodId, { observe: 'response' })
      .pipe(map((res: HttpResponse<produktEntfernung[]>) => res.body));
  }

  /*pdf for the event*/

  /*resend mail for event reminder*/
  reminderEmailSend(req) {
    return this.http.post(this.terminReminderEmailUrl, req, { observe: 'response' }).pipe(map((res: HttpResponse<terminPDF>) => res.body));
  }

  createMessageTemptate(temp) {
    return this.http
      .post('services/opttab/api/kontakttemplates', temp, { observe: 'response' })
      .pipe(map((res: HttpResponse<messageTemplate>) => res.body));
  }

  editAllMessageTemptate(temp) {
    return this.http
      .put('services/opttab/api/kontakttemplates/all', temp, { observe: 'response' })
      .pipe(map((res: HttpResponse<messageTemplate[]>) => res.body));
  }

  getAllMessageTemptate(id,vorlageArt) {
    return this.http
      .get('services/opttab/api/kontakttemplates?betriebsId.equals=' + id+'&vorlageArt.equals='+vorlageArt, { observe: 'response' })
      .pipe(map((res: HttpResponse<messageTemplate[]>) => res.body));
  }

  deleteMessageTemptate(id) {
    return this.http.delete('services/opttab/api/kontakttemplates/' + id, { observe: 'response' });
  }

  deleteMessageTemptateAll(temp) {
    return this.http.post('services/opttab/api/kontakttemplates/delete/all', temp, { observe: 'response' });
  }

  createAnderungVorschlag(req: BuchFreiVorschlag, abkoterminId): Observable<BuchFreiVorschlag> {
    return this.http
      .post(this.AnderungVorschlagUrl + '/' + abkoterminId, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<BuchFreiVorschlag>) => res.body));
  }

  calendarCamundaTaskFrigabeAblehen(req, betId) {
    return this.http
      .post(this.camundaAcceptDeclineURL + betId, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  getAnabaBigDTOForDeleteTermin(anabId, betId) {
    return this.http
      .get('services/opttab/api/V1/Anba/Multiple/getAllwithDelete/' + anabId + '/' + betId, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  getAnabaBigDTO(anabId, betId) {
    return this.http
      .get('services/opttab/api/V1/Anba/Multiple/getAll/' + anabId + '/' + betId, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }
}
