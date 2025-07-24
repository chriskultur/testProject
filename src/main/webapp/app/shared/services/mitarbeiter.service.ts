import {Injectable} from '@angular/core';
import {Betmitbild, Mitarbeiter, MitarbiterRechtModel, MitEinladenDTOModel} from 'app/shared/models/mitarbeiter.model';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {catchError, concat, delay, map, retryWhen, take} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import dayjs from "dayjs/esm";
import {createRequestOptionMitarbeiter} from 'app/shared/util/request-util';

@Injectable()
export class MitarbeiterService {
  private resourceImageAfterVerknupfung = 'services/bettab/api/betriebe/Mitarbeiter/Bilder/verknupfung';
  private resourceUrl = 'services/bettab/api/V1/betriebe/filter/Mitarbeiter';
  private resourceUrlCrowdMit = 'services/bettab/api/V1/betriebe/Mitarbeiter/crowd/all';
  private resourceUrlCrowdMitContract = 'services/bettab/api/V1/betriebe/Mitarbeiter/crowd/contract/all';
  private resourceDel = 'services/bettab/api/V1/betriebe/Mitarbeiter';
  private resourceUrlEinlad = 'services/bettab/api/V1/betriebe/Mitarbeiter/einladen';
  private resourceUrlEinladConfirmation = 'services/bettab/api/V1/betriebe/Mitarbeiter/einladen/confirmation';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(`Something bad happened; please try again later. : ${error.message}`);
  }

  create(mitarbeiter: Mitarbeiter): Observable<Mitarbeiter> {
    const copy = this.convertDateFromClient(mitarbeiter);
    return this.http.post(this.resourceDel, copy, { observe: 'response' }).pipe(
      map((res: HttpResponse<Mitarbeiter>) => {
        return this.convertDateFromServer(res).body;
      }),
      retryWhen(error =>
        error.pipe(delay(2000), take(1), concat(throwError('Leider ist etwas schief gelaufen. Bitte versuchen Sie es erneut.')))
      ),
      catchError(this.handleError)
    );
  }

  update(mitarbeiter: Mitarbeiter): Observable<Mitarbeiter> {
    const copy = this.convertDateFromClient(mitarbeiter);
    return this.http.put(this.resourceDel, copy, { observe: 'response' }).pipe(
      map((res: HttpResponse<Mitarbeiter>) => {
        return this.convertDateFromServer(res).body;
      }),
      retryWhen(error =>
        error.pipe(delay(2000), take(1), concat(throwError('Leider ist etwas schief gelaufen. Bitte versuchen Sie es erneut.')))
      ),
      catchError(this.handleError)
    );
  }

  find(id: number): Observable<Mitarbeiter> {
    return this.http.get(`${this.resourceDel}/${id}`, { observe: 'response' }).pipe(
      map((res: HttpResponse<Mitarbeiter>) => {
        return this.convertDateFromServer(res).body;
      })
    );
  }

  query(req?: any): Observable<Mitarbeiter[]> {
    const options = createRequestOptionMitarbeiter(req);
    return this.http
      .get(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<Mitarbeiter[]>) => this.convertDateArrayFromServer(res).body));
  }

  queryCrowdContract(req?: any): Observable<Mitarbeiter[]> {
    const options = createRequestOptionMitarbeiter(req);
    return this.http
      .get(this.resourceUrlCrowdMitContract, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<Mitarbeiter[]>) => this.convertDateArrayFromServer(res).body));
  }

  queryCrowd(req?: any): Observable<Mitarbeiter[]> {
    const options = createRequestOptionMitarbeiter(req);
    return this.http
      .get(this.resourceUrlCrowdMit, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<Mitarbeiter[]>) => this.convertDateArrayFromServer(res).body));
  }

  filter(req?: any): Observable<Mitarbeiter[]> {
    return this.http
      .get(`${this.resourceUrl}/${req}`, { observe: 'response' })
      .pipe(map((res: HttpResponse<Mitarbeiter[]>) => this.convertDateArrayFromServer(res).body));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.resourceDel}/${id}`);
  }

  createImageAfterVerknupfung(bpimage: Betmitbild): Observable<Betmitbild> {
    return this.http.post(this.resourceImageAfterVerknupfung, bpimage).pipe(
      map((res: HttpResponse<Betmitbild>) => {
        return res.body;
      })
    );
  }

  searchdynamicMail(term: string): Observable<any> {
    return this.http
      .get(this.resourceUrlCrowdMit + '?email.equals=' + term, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  einladStatusCreate(ladum: MitEinladenDTOModel) {
    return this.http
      .post(this.resourceUrlEinlad, ladum, { observe: 'response' })
      .pipe(map((res: HttpResponse<MitEinladenDTOModel>) => res.body));
  }

  einladStatusUpdate(ladum: MitEinladenDTOModel) {
    return this.http.put(this.resourceUrlEinlad, ladum, { observe: 'response' }).pipe(
      map((res: HttpResponse<MitEinladenDTOModel>) => {
        return res.body;
      })
    );
  }

  einladStatusUpdateConfirmation(ladum: MitEinladenDTOModel) {
    return this.http
      .put(this.resourceUrlEinladConfirmation, ladum, { observe: 'response' })
      .pipe(map((res: HttpResponse<MitEinladenDTOModel>) => res.body));
  }

  einladStatusDelete(ladum: MitEinladenDTOModel) {
    return this.http
      .delete(`${this.resourceUrlEinlad}/${ladum.betriebEingeladen}/${ladum.mitarbeiterEingeladen}`, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<MitEinladenDTOModel>) => {
          return res.body;
        })
      );
  }

  assignRechtToLeiter(req: MitarbiterRechtModel) {
    let url = 'services/bettab/api/V1/betriebe/Mitarbeiter/Rechte';
    return this.http.post(url, req).pipe(
      map((res: HttpResponse<MitarbiterRechtModel>) => {
        return res.body;
      })
    );
  }

  checkBenWithMitEmail() {
    let url = 'services/bettab/api/V1/V1/betrieb/mitarbeiter/email/check';
    return this.http.get(url, { observe: 'response' }).pipe(map((res: HttpResponse<any[]>) => res.body));
  }

  protected convertDateFromClient(betrieb: Mitarbeiter): Mitarbeiter {
    const copy: Mitarbeiter = Object.assign({}, betrieb, {
      einladam: betrieb.einladam != null && betrieb.einladam.isValid() ? betrieb.einladam.toJSON() : null,
    });
    return copy;
  }

  protected convertDateFromServer(res: HttpResponse<Mitarbeiter>): HttpResponse<Mitarbeiter> {
    if (res.body) {
      res.body.einladam = res.body.einladam != null ? dayjs(res.body.einladam) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: HttpResponse<Mitarbeiter[]>): HttpResponse<Mitarbeiter[]> {
    if (res.body) {
      res.body.forEach((betrieb: Mitarbeiter) => {
        betrieb.einladam = betrieb.einladam != null ? dayjs(betrieb.einladam) : null;
      });
    }
    return res;
  }
}
