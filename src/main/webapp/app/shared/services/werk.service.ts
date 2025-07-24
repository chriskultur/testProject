import {Injectable} from '@angular/core';

// import {plainHTTPService} from "../production/http/http.service";
import {createRequestAngebot, createRequestOptionWerkStatus} from 'app/shared/util/request-util';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Werksangaben} from 'app/shared/models/werksangaben.model';
import {SuggestionObject} from 'app/shared/models/suggestionObject';
import {Angebot} from 'app/shared/models/ange-werk.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import dayjs from "dayjs/esm";
import {NgbDateDayjsAdapter} from './../../config/datepicker-adapter';

@Injectable()
export class WerkService {
  private resourceUrl = 'services/prodtab/api/V1/Produkt/Werk';
  private resourceStatus = 'services/prodtab/api/V1/Angebot/Werk/Status';
  private resourceStatusFilter = 'services/prodtab/api/V1/Angebot/filter/Werk/Status/';
  private resourceAccessRightsProdtab = 'services/prodtab/api/produktion/access_rights';
  private resourceUrlFilter = 'services/prodtab/api/V1/Produkt/filter/Werk';
  private resourseUrlAngebot = 'services/prodtab/api/V1/Angebot/Werk';
  private resourseUrlAngebotFilter = 'services/prodtab/api/V1/Angebot/filter/Werk';
  private suggestionUrl = 'services/prodtab/api/V1/Liste/Wertelisten/all?listeNr.equals=';
  private mitarbeitergetUrl = 'services/bettab/api/V1/betriebe/Mitarbeiter/all?nachname.contains=';
  private getMitwerkendeUrl = 'services/prodtab/api/V1/Betrieb/Mitwirkend';
  private prodMenuSingleID = 'services/prodtab/api/V1/production/menu\n';

  constructor(private http: HttpClient) {}

  getProductionIDFromMenu(menuIDObject) {
    return this.http.post(this.prodMenuSingleID, menuIDObject, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }
  //
  // getAccessRight (accessRightObject) :Observable<any> {
  //     return this.http.post(this.resourceAccessRightsProdtab, accessRightObject).map((res: Response) => {
  //         return res.json();
  //     });
  // }
  //
  deleteStatus(id: number): Observable<any> {
    return this.http.delete(this.resourceStatus + '/' + id, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => true));
  }

  createStatus(statusObject): Observable<any> {
    return this.http.post(this.resourceStatus, statusObject, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  updateStatus(statusObject): Observable<any> {
    return this.http.put(this.resourceStatus, statusObject).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  getWerkbyID(id: number): Observable<Werksangaben> {
    return this.http.get(this.resourceUrl + '/' + id, { observe: 'response' }).pipe(map((res: HttpResponse<Werksangaben>) => res.body));
  }

  //
  // getStatus (angeWerkId) : Observable <any> {
  //     return this.http.get(this.resourceStatusFilter + angeWerkId).map((res: Response) => {
  //         return res.json();
  //     });
  // }
  //

  getStatusWerk(req?: any): Observable<any> {
    const options = createRequestOptionWerkStatus(req);
    return this.http.get(this.resourceStatus, { params: options, observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  /*  createWerk(werk: Werksangaben): Observable<Werksangaben> {
      const copy = this.convert(werk);
      return this.http.post(this.resourceUrl, copy).map((res: Response) => {
          const jsonResponse = res.json();
          this.convertItemFromServer(jsonResponse);
          return jsonResponse;
      });
  }*/

  //
  // getWerk(id: number): Observable<Werksangaben[]>  {
  //     //check
  //     return this.http.get(this.resourceUrl + '/all?betriebsId.equals=' + id)
  //         .map((res: any) => this.convertResponse2(res));
  // }
  // getWerkbyIDView(id: number): Observable<Werksangaben>  {
  //     //check
  //     return this.http.get(this.resourceUrl + '/' + id)
  //         .map((res: any) => this.convertWerkAnsgabenObject(res));
  // }
  //

  // getWerkbyNameView(id: string): Observable<Werksangaben[]>  {
  //     //check
  //     return this.http.get(this.resourceUrl + '/all?titel.equals=' + id)
  //         .map((res: any) => this.convertResponse2(res));
  // }
  //
  // getWerkbyName(id: string, betID: number): Observable<Werksangaben[]>  {
  //     //check
  //     return this.http.get(this.resourceUrlFilter + '/' + betID + '?titel.equals=' + id)
  //         .map((res: any) => this.convertResponse2(res));
  // }
  //
  // updateWerk(werk: Werksangaben): Observable<Werksangaben> {
  //     const copy = this.convert(werk);
  //     return this.http.put(this.resourceUrl, copy).map((res: Response) => {
  //         const jsonResponse = res.json();
  //         this.convertItemFromServer(jsonResponse);
  //         return jsonResponse;
  //     });
  // }

  createAngebot(angebot: Angebot): Observable<Angebot> {
    const copy = this.convertResonseFromClientAngebotSingle(angebot);
    return this.http.post(this.resourseUrlAngebot, copy, { observe: 'response' }).pipe(
      map((res: HttpResponse<Angebot>) => {
        return this.convertResonseFromServerAngebotSingle(res.body);
      })
    );
  }

  getAngebotView(req): Observable<Angebot[]> {
    const options = createRequestAngebot(req);
    return this.http
      .get(this.resourseUrlAngebot, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<Angebot[]>) => this.convertResponseFromServerAngebotArray(res.body)));
  }

  getAngebot(id: number): Observable<Angebot[]> {
    return this.http
      .get(this.resourseUrlAngebot + '/all?prodWerksId.equals=' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<Angebot[]>) => res.body));
  }

  updateAngebot(angebot: Angebot): Observable<Angebot> {
    const copy = this.convertResonseFromClientAngebotSingle(angebot);
    return this.http.put(this.resourseUrlAngebot, copy, { observe: 'response' }).pipe(
      map((res: HttpResponse<Angebot>) => {
        return this.convertResonseFromServerAngebotSingle(res.body);
      })
    );
  }

  getSuggestion(suggestedNumber: string): Observable<SuggestionObject[]> {
    return this.http
      .get(this.suggestionUrl + suggestedNumber, { observe: 'response' })
      .pipe(map((res: HttpResponse<SuggestionObject[]>) => res.body));
  }
  //
  // createMitwerkende (mitWerker) {
  //     const copy = this.convert(mitWerker);
  //     return this.http.post(this.getMitwerkendeUrl, copy).map((res: Response) => {
  //         const jsonResponse = res.json();
  //         this.convertItemFromServer(jsonResponse);
  //         return jsonResponse;
  //     });
  // }
  //
  // getMitwerkende (betId) {
  //     return this.http.get(this.getMitwerkendeUrl + '?betriebsId.equals=' + betId)
  //         .map((res: any) => this.convertResponse2(res));
  // }
  // getMitwerkendeById (id) {
  //     return this.http.get(this.getMitwerkendeUrl + '?id.equals=' + id)
  //         .map((res: any) => this.convertResponse2(res));
  // }
  //
  //
  // searchDynamicMitarbeitersync(term: string): Observable<any[]> {
  //     return this.http.get(this.getMitwerkendeUrl+ '?name.contains=' + term)
  //         .map((res: Response) => res.json());
  //     // let responseObj = await this.plainHttpCall.getCall(this.mitarbeitergetUrl + term).toPromise();
  //     // return responseObj;
  // }
  //
  // searchDynamicsync(term: string) {
  //     if (term === '') {
  //         return Observable.of([]);
  //     }
  //     let queryparameter = '/all?titel.contains=' + term;
  //     let responseObj = this.plainHttpCall.getCall(this.resourceUrl, queryparameter);
  //     return responseObj;
  // }
  //
  //
  // private convertResponse(res: Response): ResponseWrapper {
  //     const jsonResponse = res.json();
  //     for (let i = 0; i < jsonResponse.length; i++) {
  //         this.convertItemFromServer(jsonResponse[i]);
  //     }
  //     return new ResponseWrapper(res.headers, jsonResponse, res.status);
  // }
  //
  // private convertResponse2(res: Response): Werksangaben[] {
  //     const jsonResponse = res.json();
  //     for (let i = 0; i < jsonResponse.length; i++) {
  //         this.convertItemFromServer(jsonResponse[i]);
  //     }
  //     return jsonResponse;
  // }
  // private convertWerkAnsgabenObject(res: Response): Werksangaben {
  //     const jsonResponse = res.json();
  //     return jsonResponse;
  // }
  //
  // private convertResponse3(res: Response): SuggestionObject[] {
  //     const jsonResponse = res.json();
  //     for (let i = 0; i < jsonResponse.length; i++) {
  //         this.convertItemFromServer(jsonResponse[i]);
  //     }
  //     return jsonResponse;
  // }
  //
  // private convertItemFromServer(entity: any) {
  //     entity.freigabeAm = this.dateUtils
  //         .convertLocalDateFromServer(entity.freigabeAm);
  //     entity.vorschlagAm = this.dateUtils
  //         .convertLocalDateFromServer(entity.vorschlagAm);
  // }

  // private convert(werk: Werksangaben): Werksangaben {
  //     const copy: Werksangaben = Object.assign({}, werk);
  //     // copy.freigabeAm = this.dateUtils
  //     //     .convertLocalDateToServer(werk.freigabeAm);
  //     // copy.vorschlagAm = this.dateUtils
  //     //     .convertLocalDateToServer(werk.vorschlagAm);
  //     return copy;
  // }
  // private convert2(angebot: Angebot): Angebot {
  //     const copy: Angebot = Object.assign({}, angebot);
  //     /*copy.freigabeAm = this.dateUtils
  //         .convertLocalDateToServer(angebot.freigabeAm);
  //     copy.vorschlagAm = this.dateUtils
  //         .convertLocalDateToServer(angebot.vorschlagAm);*/
  //     return copy;
  // }

  /*Convert werk Angebot object date from server*/
  protected convertResonseFromServerAngebotSingle(angebot: Angebot) {
    if (angebot) {
      angebot.vertriebBetriebIdAngefragtAm =
        angebot.vertriebBetriebIdAngefragtAm != null ? dayjs(angebot.vertriebBetriebIdAngefragtAm) : null;
    }
    return angebot;
  }

  /*Convert werk Angebot object date from server*/
  protected convertResonseFromClientAngebotSingle(angebot: Angebot) {
    if (angebot) {
      let converted_date = NgbDateDayjsAdapter.prototype.fromModel(angebot.vertriebBetriebIdAngefragtAm);
      angebot.vertriebBetriebIdAngefragtAm =
        angebot.vertriebBetriebIdAngefragtAm != null && angebot.vertriebBetriebIdAngefragtAm.isValid()
          ? dayjs(Date.UTC(converted_date.year, converted_date.month - 1, converted_date.day))
          : null;
    }
    return angebot;
  }

  /*Convert Array of werk Angebot object date from server*/
  convertResponseFromServerAngebotArray(angebots: Angebot[]) {
    if (angebots) {
      angebots.forEach((angebot: Angebot) => {
        angebot.vertriebBetriebIdAngefragtAm =
          angebot.vertriebBetriebIdAngefragtAm != null ? dayjs(angebot.vertriebBetriebIdAngefragtAm) : null;
      });
    }
    return angebots;
  }
}
