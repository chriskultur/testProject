import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {catchError, concat, delay, map, retryWhen, take} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {SuggestionObject} from 'app/shared/models/suggestionObject';
import {SpieladresseDTOListModel, SpielPersonen, SpielVerknupfung, Stage} from 'app/shared/models/stage.model';
import {NgbDateDayjsAdapter} from './../../config/datepicker-adapter';
import dayjs from "dayjs/esm";
import {ProdStageModel} from 'app/shared/models/prod-stage.model';
import {AngebotSpiel} from 'app/shared/models/ange-spiel.model';
import {createRequestOptionFaq, createRequestProduction} from 'app/shared/util/request-util';

@Injectable()
export class StageService {
  private resourceStatus = 'services/prodtab/api/V1/Angebot/Spielstaette/Status';
  private resourceUrl = 'services/bettab/api/V1/betriebe/Spielstaetten';
  private resourceUrlSpielstatteVerwalter = 'services/bettab/api/V1/betriebe/Spielstaetten/verwaltung/';
  private resourceUrlCrowd = 'services/bettab/api/V1/betriebe/Spielstaetten/Crowd';
  private resourceUrlCrowdAll = 'services/bettab/api/V1/betriebe/Spielstaetten/crowd/all';
  private resourseUrlAngebot = 'services/prodtab/api/V1/Angebot/Spielstatte';
  private resourseUrlSpielAngebotVerwalter = 'services/prodtab/api/V1/Angebot/filter/Spielstatte/verwaltung/';
  private resourseUrlAngebotFilter = 'services/prodtab/api/V1/Angebot/filter/Spielstatte/';
  private resourseUrlStageNC = 'services/prodtab/api/V1/Produkt/Spielstätte';
  private resourseUrlProdSpielExternal = 'services/prodtab/api/V1/Produkt/Spielstätte/verwaltung/';
  private resourseUrlStageNCFilter = 'services/prodtab/api/V1/Produkt/filter/Spielstätte/';
  private suggestionUrl = 'services/prodtab/api/V1/Liste/Wertelisten/all?listeNr.equals=';
  private prodMenuSingleID = 'services/prodtab/api/V1/production/menu\n';
  private spielAddress = 'services/prodtab/api/spieladresses';
  private spielVerknupfung = 'services/bettab/api/betrieb/spielstatte_verknupfung';
  private spielPersonen = 'services/bettab/api/spielstatte-personens';
  private spielVerwaltungUpdate = 'services/bettab/api/V1/betriebe/Spielstaetten/Verwalter';
  private getSpielWithVerknupfungFilter = 'services/bettab/api/V1/betriebe/filter/Spielstaetten/verknupfungFilter/All/';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return throwError('Something bad happened; please try again later.');
  }

  getProductionIDFromMenu(menuIDObject) {
    return this.http.post(this.prodMenuSingleID, menuIDObject, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  createStatus(statusObject): Observable<any> {
    return this.http.post(this.resourceStatus, statusObject, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  deleteStatus(id: number): Observable<any> {
    return this.http.delete(this.resourceStatus + '/' + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        if (res.status == 200) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  updateStatus(statusObject): Observable<any> {
    return this.http.put(this.resourceStatus, statusObject, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  getStatusSpiel(angeSpielID): Observable<any> {
    return this.http.get(this.resourceStatus + '?angeSpielId.equals=' + angeSpielID, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  createStage(stage: Stage): Observable<Stage> {
    const copy = this.convertResponseFromClientStage(stage);
    return this.http.post(this.resourceUrl, copy, { observe: 'response' }).pipe(
      map((res: HttpResponse<Stage>) => {
        return this.convertResponseFromServerStage(res.body);
      }),
      retryWhen(error =>
        error.pipe(delay(2000), take(1), concat(throwError('Leider ist etwas schief gelaufen. Bitte versuchen Sie es erneut.')))
      ),
      catchError(this.handleError)
    );
  }

  updateStage(stage: Stage): Observable<Stage> {
    const copy = this.convertResponseFromClientStage(stage);

    return this.http.put(this.resourceUrl + '/' + stage.id, copy, { observe: 'response' }).pipe(
      map((res: HttpResponse<Stage>) => {
        return this.convertResponseFromServerStage(res.body);
      }),
      retryWhen(error =>
        error.pipe(delay(2000), take(1), concat(throwError('Leider ist etwas schief gelaufen. Bitte versuchen Sie es erneut.')))
      ),
      catchError(this.handleError)
    );
  }

  getStagebyID(id: number): Observable<Stage> {
    return this.http.get(this.resourceUrl + '/' + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<Stage>) => {
        return this.convertResponseFromServerStage(res.body);
      })
    );
  }

  getStagebyForVerwalterID(id: number, betId): Observable<Stage> {
    return this.http.get(this.resourceUrlSpielstatteVerwalter + betId + '/' + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<Stage>) => {
        return this.convertResponseFromServerStage(res.body);
      })
    );
  }

  getStagebyIDCrowd(id?: number, aktiveBetID?: number): Observable<Stage> {
    return this.http
      .get(this.resourceUrlCrowd + '/' + aktiveBetID + '/' + id, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<Stage>) => this.convertResponseFromServerStage(res.body)));
  }

  getStagebyQuery(req?: any): Observable<Stage[]> {
    const options = createRequestProduction(req);
    return this.http
      .get(this.resourceUrlCrowdAll, {
        params: options,
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<Stage[]>) => this.convertResponseFromServerStageArray(res.body)));
  }

  getSpielWithVerknupfungFIlterAll(id?: number): Observable<Stage[]> {
    return this.http
      .get(this.getSpielWithVerknupfungFilter + id, {
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<Stage[]>) => this.convertResponseFromServerStageArray(res.body)));
  }

  getSpielWithVerknupfungFIlterOhneGeloscht(id?: number, req?: any): Observable<Stage[]> {
    const options = createRequestProduction(req);
    return this.http
      .get(this.getSpielWithVerknupfungFilter + id, {
        params: options,
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<Stage[]>) => this.convertResponseFromServerStageArray(res.body)));
  }

  getStagebyQueryContain(req?: any): Observable<Stage[]> {
    const options = createRequestOptionFaq(req);
    return this.http
      .get(this.resourceUrl + '/all', {
        params: options,
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<Stage[]>) => this.convertResponseFromServerStageArray(res.body)));
  }

  createProduktStage(stageNC: ProdStageModel): Observable<ProdStageModel> {
    return this.http
      .post(this.resourseUrlStageNC, stageNC, { observe: 'response' })
      .pipe(map((res: HttpResponse<ProdStageModel>) => res.body));
  }

  updateProduktStage(stageNC: ProdStageModel): Observable<ProdStageModel> {
    return this.http
      .put(this.resourseUrlStageNC, stageNC, { observe: 'response' })
      .pipe(map((res: HttpResponse<ProdStageModel>) => res.body));
  }

  getProdukt(id: number, betID: number): Observable<ProdStageModel[]> {
    return this.http
      .get(this.resourseUrlStageNCFilter + betID + '?id.equals=' + id, { observe: 'response' })
      .pipe(map((res: any) => res.body));
  }

  getAllSpielAktiveBet(betID: number): Observable<ProdStageModel[]> {
    return this.http.get(this.resourseUrlStageNCFilter + betID, { observe: 'response' }).pipe(map((res: any) => res.body));
  }

  getProduktViewCrowd(id: number): Observable<ProdStageModel> {
    return this.http.get(this.resourseUrlStageNC + '/' + id, { observe: 'response' }).pipe(map((res: any) => res.body));
  }

  getAngeSpielForVerwalter(id: number, betId: number): Observable<AngebotSpiel[]> {
    return this.http
      .get(this.resourseUrlSpielAngebotVerwalter + betId + '/' + id, { observe: 'response' })
      .pipe(map((res: any) => res.body));
  }

  getProdSpielVerwalter(id: number, betId): Observable<ProdStageModel> {
    return this.http.get(this.resourseUrlProdSpielExternal + betId + '/' + id, { observe: 'response' }).pipe(map((res: any) => res.body));
  }

  getProduktViewCrowdQuery(req?: any): Observable<ProdStageModel[]> {
    const options = createRequestProduction(req);
    return this.http
      .get(this.resourseUrlStageNC + '/all', {
        params: options,
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<ProdStageModel[]>) => res.body));
  }

  createStageAngebot(angebot: AngebotSpiel): Observable<AngebotSpiel> {
    const copy = this.convertResponseFromClientStageAngebot(angebot);
    return this.http.post(this.resourseUrlAngebot, copy, { observe: 'response' }).pipe(
      map((res: HttpResponse<AngebotSpiel>) => {
        return this.convertResponseFromServerStageAngebot(res.body);
      })
    );
  }

  updateStageAngebot(angebot: AngebotSpiel): Observable<AngebotSpiel> {
    const copy = this.convertResponseFromClientStageAngebot(angebot);
    return this.http.put(this.resourseUrlAngebot, copy, { observe: 'response' }).pipe(
      map((res: HttpResponse<AngebotSpiel>) => {
        return this.convertResponseFromServerStageAngebot(res.body);
      })
    );
  }

  getStageAngebot(prodSpielID: number): Observable<AngebotSpiel[]> {
    return this.http
      .get(this.resourseUrlAngebotFilter + prodSpielID, { observe: 'response' })
      .pipe(map((res: HttpResponse<AngebotSpiel[]>) => this.convertResponseFromServerStageAngebotArray(res.body)));
  }

  getAngebotView(req?: any): Observable<AngebotSpiel[]> {
    const options = createRequestProduction(req);
    return this.http
      .get(this.resourseUrlAngebot + '/all', { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<AngebotSpiel[]>) => this.convertResponseFromServerStageAngebotArray(res.body)));
  }

  getSuggestion(suggestedNumber: string): Observable<SuggestionObject[]> {
    return this.http
      .get(this.suggestionUrl + suggestedNumber, { observe: 'response' })
      .pipe(map((res: HttpResponse<SuggestionObject[]>) => res.body));
  }

  getSpielAddress(req?: any): Observable<SpieladresseDTOListModel[]> {
    const options = createRequestProduction(req);
    return this.http
      .get(this.spielAddress, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<SpieladresseDTOListModel[]>) => res.body));
  }

  convertResponseFromClientStage(stage: Stage) {
    let converted_date = NgbDateDayjsAdapter.prototype.fromModel(stage.freigabeAm);
    let converted_date2 = NgbDateDayjsAdapter.prototype.fromModel(stage.vorschlagAm);
    const copy: Stage = Object.assign({}, stage);
    copy.vorschlagAm =
      copy.vorschlagAm != null ? dayjs(Date.UTC(converted_date2.year, converted_date2.month - 1, converted_date2.day)) : null;
    copy.freigabeAm = copy.freigabeAm != null ? dayjs(Date.UTC(converted_date.year, converted_date.month - 1, converted_date.day)) : null;

    return copy;
  }

  convertResponseFromServerStage(stage: Stage) {
    const copy: Stage = Object.assign({}, stage);
    copy.vorschlagAm = copy.vorschlagAm != null ? dayjs(copy.vorschlagAm) : null;
    copy.freigabeAm = copy.freigabeAm != null ? dayjs(copy.freigabeAm) : null;

    return copy;
  }

  convertResponseFromClientStageAngebot(stage: AngebotSpiel) {
    let converted_date = NgbDateDayjsAdapter.prototype.fromModel(stage.vertriebBetriebIdAngefragtAm);
    const copy: AngebotSpiel = Object.assign({}, stage);
    copy.vertriebBetriebIdAngefragtAm =
      copy.vertriebBetriebIdAngefragtAm != null
        ? dayjs(Date.UTC(converted_date.year, converted_date.month - 1, converted_date.day))
        : null;

    return copy;
  }

  convertResponseFromServerStageAngebot(stage: AngebotSpiel) {
    const copy: AngebotSpiel = Object.assign({}, stage);
    copy.vertriebBetriebIdAngefragtAm = copy.vertriebBetriebIdAngefragtAm != null ? dayjs(copy.vertriebBetriebIdAngefragtAm) : null;

    return copy;
  }

  convertResponseFromServerStageArray(stage: Stage[]) {
    if (stage.length != 0) {
      stage.forEach((copy: Stage) => {
        copy.vorschlagAm = copy.vorschlagAm != null ? dayjs(copy.vorschlagAm) : null;
        copy.freigabeAm = copy.freigabeAm != null ? dayjs(copy.freigabeAm) : null;
      });
    }
    return stage;
  }

  convertResponseFromServerStageAngebotArray(stage: AngebotSpiel[]) {
    if (stage.length != 0) {
      stage.forEach((copy: AngebotSpiel) => {
        copy.vertriebBetriebIdAngefragtAm = copy.vertriebBetriebIdAngefragtAm != null ? dayjs(copy.vertriebBetriebIdAngefragtAm) : null;
      });
    }
    return stage;
  }

  getspielVerknupfung(req, betid) {
    const options = createRequestProduction(req);
    return this.http
      .get(this.spielVerknupfung + '/' + betid, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<SpielVerknupfung[]>) => res.body));
  }

  getspielVerknupfungWithSpielId(req, betid) {
    const options = createRequestProduction(req);
    return this.http
      .get(this.spielVerknupfung + '/' + betid, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<SpielVerknupfung[]>) => res.body));
  }

  createspielVerknupfung(req, betId) {
    return this.http
      .post(this.spielVerknupfung + '/' + betId, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<SpielVerknupfung>) => res.body));
  }

  updatespielVerknupfung(req, betId) {
    return this.http
      .put(this.spielVerknupfung + '/' + betId, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<SpielVerknupfung>) => res.body));
  }

  deleteSpielVerknupfung(id, aktivebetId) {
    return this.http
      .delete(this.spielVerknupfung + '/' + id + '/' + aktivebetId, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  getspielVerknupfungById(id) {
    return this.http
      .get(this.spielVerknupfung + '/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<SpielVerknupfung>) => res.body));
  }

  createspielPersonen(req) {
    return this.http.post(this.spielPersonen, req, { observe: 'response' }).pipe(map((res: HttpResponse<SpielPersonen>) => res.body));
  }

  updatespielPersonen(req) {
    return this.http.put(this.spielPersonen, req, { observe: 'response' }).pipe(map((res: HttpResponse<SpielPersonen>) => res.body));
  }

  deletespielPersonen(req) {
    return this.http
      .delete(this.spielPersonen + '/' + req, { observe: 'response' })
      .pipe(map((res: HttpResponse<SpielPersonen>) => res.body));
  }

  getspielPersonen(req) {
    const options = createRequestProduction(req);
    return this.http
      .get(this.spielPersonen, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<SpielPersonen[]>) => res.body));
  }

  updatespielVerwalter(req) {
    return this.http
      .put(this.spielVerwaltungUpdate, req, { observe: 'response' })
      .pipe(map((res: HttpResponse<SpielPersonen>) => res.body));
  }
}
