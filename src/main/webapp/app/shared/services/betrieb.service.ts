import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {createRequestOptionBetrieb, createRequestOptionLiWert} from 'app/shared/util/request-util';
import {betMedia, BetribestatusModel, Betrieb, Betriebebild} from 'app/shared/models/betrieb.model';
import {GescheftbDTO} from 'app/shared/models/gescheftbDTO.model';
import {BetriebFreigabe} from 'app/shared/models/betriebFreigabe.model';
import {catchError, concat, delay, map, retryWhen, take} from 'rxjs/operators';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import dayjs from "dayjs/esm";

@Injectable()
export class BetriebService {
  private betriebSupportResource = 'services/bettab/api/V1/betrieb/support';
  private resourceUrl2 = 'services/bettab/api/V1/betriebe/Stammdaten';
  private prufungUrl2 = 'services/bettab/api/V1/betrieb/prufung/status';
  private resourceUrl2Admin = 'services/bettab/api/V1/betriebe/Admin/Stammdaten';
  private resourceUrl2AdminAll = 'services/bettab/api/V1/betriebe/Stammdaten/Admin/all';
  private resourceUrlCrowd = 'services/bettab/api/V1/betriebe/Stammdaten/crowd';
  private resourceUrlCrowdAll = 'services/bettab/api/V1/betriebe/Stammdaten/crowd/all';
  private resourceUrlAdminAll = 'services/bettab/api/V1/betriebe/Stammdaten/Admin/all';
  private resourceImage = 'services/bettab/api/V1/betriebe/Bilder';
  private resourceBetBildUrl = 'services/bettab/api/V1/betriebe/filter/Bilder/';
  private resourceBetBildCrowd = 'services/bettab/api/V1/betriebe/Bilder/crowd/all';
  private resourseGescheftsCoUrl = 'services/bettab/api/V1/betriebe/Geschaeftsbeziehungen';
  private resourceGetGesCoUrl = 'services/bettab/api/V1/betriebe/filter/Geschaeftsbeziehungen';
  private resourceBetriebFreigabe = 'services/bettab/api/V1/betriebe/Stammdaten/Betriebsstatus';
  private dashboardBenutzerStatusResource = 'services/bettab/api/V1/benutzer/new_companies/';
  // checking if betrieb has all of the mandatory fields
  private ValidationBetriebStatusResource = 'services/bettab/api/V1/status/betriebValidation';
  private liwertResource = 'services/bettab/api/V1/Listen/Wertelisten';
  private betriebMedia = 'services/bettab/api/betrieb/media';
  private betriebMediaMinimal = 'services/bettab/api/betrieb/media/minimal';
  private betriebMediaOne = 'services/bettab/api/betrieb/media/';
  public openCalendarPopUp: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private getRightsApi = 'services/bettab/api/V1/betrieb/rights/';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return throwError('Something bad happened; please try again later.');
  }

  create(betrieb: Betrieb) {
    const copy = this.convertDateFromClient(betrieb);
    return this.http
      .post<Betrieb>(this.resourceUrl2, copy, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<Betrieb>) => {
          return this.convertDateFromServer(res).body;
        }),
        retryWhen(error =>
          error.pipe(delay(2000), take(1), concat(throwError('Leider ist etwas schief gelaufen. Bitte versuchen Sie es erneut.')))
        ),
        catchError(this.handleError)
      );
  }

  createAdmin(betrieb: any) {
    return this.http
      .post(this.resourceUrl2Admin + '/changes', betrieb, { observe: 'response' })
      .pipe(map((res: HttpResponse<Betrieb>) => res.body));
  }

  update(betrieb: Betrieb): Observable<Betrieb> {
    const copy = this.convertDateFromClient(betrieb);
    return this.http.put(this.resourceUrl2, copy, { observe: 'response' }).pipe(
      map((res: HttpResponse<Betrieb>) => {
        return this.convertDateFromServer(res).body;
      }),
      retryWhen(error =>
        error.pipe(delay(2000), take(1), concat(throwError('Leider ist etwas schief gelaufen. Bitte versuchen Sie es erneut.')))
      ),
      catchError(this.handleError)
    );
  }

  find(id: number): Observable<Betrieb> {
    return this.http.get(`${this.resourceUrl2}/${id}`, { observe: 'response' }).pipe(
      map((res: HttpResponse<Betrieb>) => {
        return this.convertDateFromServer(res).body;
      })
    );
  }

  getPrufungStatus(id: number): Observable<Boolean> {
    return this.http.get(`${this.prufungUrl2}/${id}`, { observe: 'response' }).pipe(
      map((res: HttpResponse<Boolean>) => {
        return res.body;
      })
    );
  }

  findAdmin(id: number): Observable<Betrieb> {
    return this.http.get(`${this.resourceUrl2Admin}/${id}`, { observe: 'response' }).pipe(
      map((res: HttpResponse<Betrieb>) => {
        return this.convertDateFromServer(res).body;
      })
    );
  }

  betriebSupport(id: number): Observable<string> {
    return this.http
      .put(`${this.betriebSupportResource}/${id}`, null, { observe: 'response' })
      .pipe(map((res: HttpResponse<string>) => res.body));
  }

  searchDynamicForAdmin(term: string): Observable<Betrieb[]> {
    return this.http.get(`${this.resourceUrl2AdminAll}?betriebsname.contains=${term}`, { observe: 'response' }).pipe(
      map((res: HttpResponse<Betrieb[]>) => {
        return this.convertDateArrayFromServer(res).body;
      })
    );
  }

  findCrowd(id: number): Observable<Betrieb> {
    return this.http
      .get<Betrieb>(`${this.resourceUrlCrowd}/${id}`, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<Betrieb>) => {
          return this.convertDateFromServer(res).body;
        })
      );
  }

  searchdynamic(term: string): Observable<Betrieb[]> {
    return this.http.get(this.resourceUrlCrowdAll + '?betriebsname.contains=' + term).pipe(map((res: any) => this.convertResponse2(res)));
  }

  searchdynamicExcatName(term: string): Observable<Betrieb[]> {
    return this.http.get(this.resourceUrlCrowdAll + '?betriebsname.equals=' + term).pipe(map((res: any) => this.convertResponse2(res)));
  }

  query(req?: any): Observable<Betrieb[]> {
    const options = createRequestOptionBetrieb(req);
    return this.http
      .get<any[]>(this.resourceUrlCrowdAll, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<Betrieb[]>) => this.convertDateArrayFromServer(res).body));
  }

  queryAdmin(req?: any): Observable<Betrieb[]> {
    const options = createRequestOptionBetrieb(req);
    return this.http
      .get<any[]>(this.resourceUrlAdminAll, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<Betrieb[]>) => this.convertDateArrayFromServer(res).body));
  }

  getWetList(req?: any) {
    const options = createRequestOptionLiWert(req);
    return this.http
      .get(this.liwertResource, {
        params: options,
        observe: 'response',
      })
      .pipe(map((res: HttpResponse<any[]>) => res.body));
  }

  createImage(bpimage: Betriebebild) {
    return this.http.post<Betriebebild>(this.resourceImage, bpimage);
  }

  updateImage(bpimage: Betriebebild): Observable<any> {
    return this.http.put(this.resourceImage, bpimage).pipe(
      map((res: Response) => {
        return res;
      })
    );
  }

  queryImage(id: number): Observable<Betriebebild[]> {
    return this.http.get<Betriebebild[]>(this.resourceBetBildUrl + id);
  }

  getBetBildCrowd(id: number): Observable<Betriebebild[]> {
    return this.http.get<Betriebebild[]>(this.resourceBetBildCrowd + '?betriebsId.equals=' + id);
  }

  getBetBildMultipleId(id): Observable<Betriebebild[]> {
    return this.http.get<Betriebebild[]>(`${this.resourceBetBildCrowd}?id.in=${id}`);
  }

  getBenutzerData(limit: number) {
    return this.http.get(this.dashboardBenutzerStatusResource + limit);
  }

  getBetriebStatus(id: number): Observable<BetribestatusModel> {
    return this.http.get(this.resourceBetriebFreigabe + '/' + id);
  }

  updateBetribeVerwaltungCode(req: any) {
    let url = '/services/bettab/api/V1/betriebe/Stammdaten/Betriebsverwaltung';
    return this.http.post(url, req);
  }

  betriebstatus(betriebstatus: BetriebFreigabe): Observable<BetriebFreigabe> {
    return this.http.post(this.resourceBetriebFreigabe, betriebstatus);
  }

  createConnection(gescheftbDTO: GescheftbDTO): Observable<GescheftbDTO> {
    return this.http.post<GescheftbDTO>(this.resourseGescheftsCoUrl, gescheftbDTO).pipe(
      map((res: GescheftbDTO) => {
        const jsonResponse = res;
        this.convertItemFromServer(jsonResponse);
        return jsonResponse;
      })
    );
  }

  createConnectionCalendarEvent(gescheftbDTO: GescheftbDTO): Observable<GescheftbDTO> {
    return this.http.post<GescheftbDTO>(this.resourseGescheftsCoUrl + '/kalendarEintrag', gescheftbDTO).pipe(
      map((res: GescheftbDTO) => {
        const jsonResponse = res;
        this.convertItemFromServer(jsonResponse);
        return jsonResponse;
      })
    );
  }

  getConnection(id: number): Observable<GescheftbDTO[]> {
    return this.http
      .get(`${this.resourceGetGesCoUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: HttpResponse<GescheftbDTO[]>) => res.body));
  }

  updateConnection(gescheftbDTO: GescheftbDTO): Observable<GescheftbDTO> {
    return this.http.put<GescheftbDTO>(`${this.resourseGescheftsCoUrl}/${gescheftbDTO.id}`, gescheftbDTO).pipe(
      map((res: GescheftbDTO) => {
        const jsonResponse = res;
        this.convertItemFromServer(jsonResponse);
        return jsonResponse;
      })
    );
  }

  updateConnectionArt(gescheftbDTO: GescheftbDTO): Observable<GescheftbDTO> {
    return this.http.put<GescheftbDTO>(`${this.resourseGescheftsCoUrl}/Art`, gescheftbDTO).pipe(
      map((res: GescheftbDTO) => {
        const jsonResponse = res;
        this.convertItemFromServer(jsonResponse);
        return jsonResponse;
      })
    );
  }

  checkBetriebValidation(betriebsid: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.ValidationBetriebStatusResource}/${betriebsid}`);
  }

  deleteConnection(id: number) {
    return this.http.delete(`${this.resourseGescheftsCoUrl}/${id}`);
  }

  protected convertDateFromClient(betrieb: Betrieb): Betrieb {
    const copy: Betrieb = Object.assign({}, betrieb, {
      tochtereinam: betrieb.tochtereinam != null && betrieb.tochtereinam.isValid() ? betrieb.tochtereinam.toJSON() : null,
      deaktivam: betrieb.deaktivam != null && betrieb.deaktivam.isValid() ? betrieb.deaktivam.toJSON() : null,
      tochterbetriebEinladungSam:
        betrieb.tochterbetriebEinladungSam != null && betrieb.tochterbetriebEinladungSam.isValid()
          ? betrieb.tochterbetriebEinladungSam.toJSON()
          : null,
      vorschlagAm: betrieb.vorschlagAm != null && betrieb.vorschlagAm.isValid() ? betrieb.vorschlagAm.toJSON() : null,
      freigabeAm: betrieb.freigabeAm != null && betrieb.freigabeAm.isValid() ? betrieb.freigabeAm.toJSON() : null,
      spielzeit_von: betrieb.spielzeit_von != null ? dayjs(betrieb.spielzeit_von) : null,
      spielzeit_bis: betrieb.spielzeit_bis != null ? dayjs(betrieb.spielzeit_bis) : null,
    });
    return copy;
  }

  protected convertDateFromServer(res: HttpResponse<Betrieb>): HttpResponse<Betrieb> {
    if (res.body) {
      res.body.tochtereinam = res.body.tochtereinam != null ? dayjs(res.body.tochtereinam) : null;
      res.body.deaktivam = res.body.deaktivam != null ? dayjs(res.body.deaktivam) : null;
      res.body.tochterbetriebEinladungSam =
        res.body.tochterbetriebEinladungSam != null ? dayjs(res.body.tochterbetriebEinladungSam) : null;
      res.body.vorschlagAm = res.body.vorschlagAm != null ? dayjs(res.body.vorschlagAm) : null;
      res.body.freigabeAm = res.body.freigabeAm != null ? dayjs(res.body.freigabeAm) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: HttpResponse<Betrieb[]>): HttpResponse<Betrieb[]> {
    if (res.body) {
      res.body.forEach((betrieb: Betrieb) => {
        betrieb.tochtereinam = betrieb.tochtereinam != null ? dayjs(betrieb.tochtereinam) : null;
        betrieb.deaktivam = betrieb.deaktivam != null ? dayjs(betrieb.deaktivam) : null;
        betrieb.tochterbetriebEinladungSam = betrieb.tochterbetriebEinladungSam != null ? dayjs(betrieb.tochterbetriebEinladungSam) : null;
        betrieb.vorschlagAm = betrieb.vorschlagAm != null ? dayjs(betrieb.vorschlagAm) : null;
        betrieb.freigabeAm = betrieb.freigabeAm != null ? dayjs(betrieb.freigabeAm) : null;
      });
    }
    return res;
  }

  private convertResponse2(res: any): Betrieb[] {
    const jsonResponse = res;
    for (let response of jsonResponse) {
      this.convertItemFromServer(response);
    }
    return jsonResponse;
  }

  private convertItemFromServer(entity: any) {
    entity.tochtereinam = entity.tochtereinam != null ? dayjs(entity.tochtereinam) : null;
    entity.deaktivam = entity.deaktivam != null ? dayjs(entity.deaktivam) : null;
  }

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

  getBetMedia(betId) {
    return this.http
      .get(this.betriebMedia + '?mediabetId.equals=' + betId, { observe: 'response' })
      .pipe(map((res: HttpResponse<betMedia[]>) => res.body));
  }

  getBetMediaMinimal(betId) {
    return this.http
      .get(this.betriebMediaMinimal + '?mediabetId.equals=' + betId, { observe: 'response' })
      .pipe(map((res: HttpResponse<betMedia[]>) => res.body));
  }

  getBetMediaOne(Id) {
    return this.http.get(this.betriebMediaOne + Id, { observe: 'response' }).pipe(map((res: HttpResponse<betMedia>) => res.body));
  }

  createBetMedia(betMedia) {
    return this.http.post(this.betriebMedia, betMedia, { observe: 'response' }).pipe(map((res: HttpResponse<betMedia>) => res.body));
  }

  getRights(betId) {
    return this.http.get(this.getRightsApi + betId, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  updateBetMedia(betMedia) {
    return this.http.put(this.betriebMedia, betMedia, { observe: 'response' }).pipe(map((res: HttpResponse<betMedia>) => res.body));
  }

  deleteBetMedia(betId) {
    return this.http
      .delete(this.betriebMedia + '/' + betId, { observe: 'response' })
      .pipe(map((res: HttpResponse<betMedia[]>) => res.body));
  }

  checkBetriebMitwirkendeEmailExist(mail) {
    return this.http
      .put('services/bettab/api/V1/kunstler/check/email', mail, { observe: 'response' })
      .pipe(map((res: HttpResponse<[]>) => res.body));
  }
}
