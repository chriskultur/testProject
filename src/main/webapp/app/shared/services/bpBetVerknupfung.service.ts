import {Injectable} from '@angular/core';
import {createRequestOptionVerknupfung} from 'app/shared/util/request-util';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {catchError, concat, delay, map, retryWhen, take} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {BpBetVerknupfung} from 'app/shared/models/bpBetVerknupfung.model';
import {FreigabeVerknupfung} from 'app/shared/models/freigabeVerknupfung.model';

@Injectable()
export class BpBetVerknupfungService {
  private resourceUrlAnlager = 'services/bettab/api/V1/betriebe/Benutzerverknupfung/Betriebsanleger';
  private resourceUrlAktivBetverknupfung = 'services/bettab/api/V1/betriebe/Benutzerverknupfung/Aktiv/Betriebsanleger';
  private resourceSearchAnleger = 'services/bettab/api/V1/betriebe/Benutzerverknupfung/Betriebsanleger/all';
  private resourceSearchKunstlerAnleger = 'services/bettab/api/V1/betriebe/Benutzerverknupfung/BenutzerProfil/';
  private resourceSearchAnlegerAdmin = 'services/bettab/api/V1/betriebe/Benutzerverknupfung/Betriebsanleger/Admin/all';
  private resourceUrlFavorit = 'services/bettab/api/V1/betriebe/Benutzerverknupfung/Favorit';
  private resourceUrlFavoritAll = 'services/bettab/api/V1/betriebe/Benutzerverknupfung/Favorit/all';
  private resourceUrlMitarbeiter = 'services/bettab/api/V1/betriebe/Benutzerverknupfung/Benutzer/Vorschlag';
  private resourceUrlFreigabe = 'services/bettab/api/V1/betriebe/Benutzerverknupfung/Freigabe_Betrieb/Admin';
  private resourceUrlFreigabeAblehne = 'services/bettab/api/V1/betriebe/Benutzerverknupfung/Freigabe_Betrieb/';

  constructor(private http: HttpClient) {}

  freigabe(freigabe: any): Observable<FreigabeVerknupfung> {
    return this.http.put(this.resourceUrlFreigabe + '/' + freigabe.id, freigabe, { observe: 'response' }).pipe(
      map((res: HttpResponse<FreigabeVerknupfung>) => {
        return res.body;
      })
    );
  }

  freigabeAblehne(id?: number) {
    return this.http.delete(this.resourceUrlFreigabeAblehne + id, { observe: 'response' });
  }

  //
  // createAnleger(verknupfung: BpBetVerknupfung): Observable<BpBetVerknupfung> {
  //     const copy = this.convert(verknupfung);
  //     return this.http.post(this.resourceUrlAnlager, copy).map((res: Response) => {
  //         const jsonResponse = res.json();
  //         this.convertItemFromServer(jsonResponse);
  //         return jsonResponse;
  //     });
  // }
  //
  // updateAnleger(verknupfung: BpBetVerknupfung): Observable<BpBetVerknupfung> {
  //     const copy = this.convert(verknupfung);
  //     return this.http.put(this.resourceUrlAnlager, copy).map((res: Response) => {
  //         const jsonResponse = res.json();
  //         this.convertItemFromServer(jsonResponse);
  //         return jsonResponse;
  //     });
  // }

  queryAnleger(req?: any): Observable<BpBetVerknupfung[]> {
    const options = createRequestOptionVerknupfung(req);
    return this.http
      .get(this.resourceSearchAnleger, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<BpBetVerknupfung[]>) => res.body));
  }

  queryKunstlerAnleger(benid): Observable<BpBetVerknupfung[]> {
    return this.http
      .get(this.resourceSearchKunstlerAnleger + benid, { observe: 'response' })
      .pipe(map((res: HttpResponse<BpBetVerknupfung[]>) => res.body));
  }

  queryAnlegerAdmin(req?: any): Observable<BpBetVerknupfung[]> {
    const options = createRequestOptionVerknupfung(req);
    return this.http
      .get(this.resourceSearchAnlegerAdmin, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<BpBetVerknupfung[]>) => res.body));
  }

  deleteAnleger(id: number): Observable<any> {
    return this.http.delete(`${this.resourceUrlAnlager}/${id}`);
  }

  deleteAktivBetVerknupfung(id: number): Observable<any> {
    return this.http.delete(`${this.resourceUrlAktivBetverknupfung}/${id}`);
  }

  createFavorit(verknupfung: BpBetVerknupfung): Observable<BpBetVerknupfung> {
    return this.http.post(this.resourceUrlFavorit, verknupfung, { observe: 'response' }).pipe(
      map((res: HttpResponse<BpBetVerknupfung>) => {
        return res.body;
      })
    );
  }

  updateFavorit(verknupfung: BpBetVerknupfung): Observable<BpBetVerknupfung> {
    return this.http.put(this.resourceUrlFavorit, verknupfung, { observe: 'response' }).pipe(
      map((res: HttpResponse<BpBetVerknupfung>) => {
        return res.body;
      })
    );
  }

  queryFavorit(req?: any): Observable<BpBetVerknupfung[]> {
    const options = createRequestOptionVerknupfung(req);
    return this.http.get(this.resourceUrlFavoritAll, { params: options, observe: 'response' }).pipe(
      map((res: HttpResponse<BpBetVerknupfung[]>) => {
        return res.body;
      })
    );
  }

  deleteFavorit(id: number): Observable<any> {
    return this.http.delete(`${this.resourceUrlFavorit}/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('Something bad happened; please try again later.');
  }

  createMitarbeiterVerknupfung(verknupfung: BpBetVerknupfung): Observable<BpBetVerknupfung> {
    return this.http.post(this.resourceUrlMitarbeiter, verknupfung, { observe: 'response' }).pipe(
      map((res: HttpResponse<BpBetVerknupfung>) => res.body),
      retryWhen(error =>
        error.pipe(delay(2000), take(1), concat(throwError('Leider ist etwas schief gelaufen. Bitte versuchen Sie es erneut.')))
      ),
      catchError(this.handleError)
    );
  }
}
