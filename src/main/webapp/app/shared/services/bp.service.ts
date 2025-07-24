import {Injectable} from '@angular/core';
import {Bp, Bpdelete, BpImage, BpKachels} from 'app/shared/models/bp.model';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Account} from 'app/core/auth/account.model';
import {createRequestOption} from 'app/shared/util/request-util';
import {DashboardModel} from 'app/shared/models/dashboard.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {NgbDateDayjsAdapter} from './../../config/datepicker-adapter';
import dayjs from "dayjs/esm";

@Injectable()
export class BpService {
  private resourceUrl = 'services/bptab/api/v1/benutzer';
  private resourceUrlAdmin = 'services/bptab/api/v1/benutzer/admin';
  private resourceUrlAll = 'services/bptab/api/v1/benutzer/all';
  private resourceUrlAllCrowd = 'services/bptab/api/v1/benutzer/all';
  private resourceImage = 'services/bptab/api/v1/benutzer/bild';
  private resourceImageAll = 'services/bptab/api/v1/benutzer/bild/all';
  private resourceUrlactive = 'services/bptab/api/v1/benutzer/aktiv';
  private dashresourceUrl = 'services/bptab/api/V1/benutzer/dashboard';
  private suggestionUrl = 'services/bptab/api/liwertelistewerts';
  private getBenutzerUrl = 'services/bptab/api/V1/benutzer/new_users';
  private postKachelResource = 'services/bptab/api/bp-einstellungen-kachels';

  constructor(private http: HttpClient) {}

  create(bp: Bp): Observable<Bp> {
    const copy = this.convertDateFromClient(bp);
    return this.http
      .post<Bp>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<Bp>) => {
          return this.convertDateFromServer(res).body;
        })
      );
  }

  makebp(account: Account): Observable<Bp> {
    let data: Bp = new Bp();
    data.email = account.email;
    data.vorname = account.firstName;
    data.nachname = account.lastName;
    data.freigabeTelefon = 4;
    data.freigabeEmail = 4;
    data.freigabeMobil = 4;
    data.freigabeGeburtstag = 4;
    data.bpBeruf = [];
    data.bpSozialenMedien = [];
    data.aktiv = true;
    data.freigebeFavoritBetrieb = false;
    data.freigebeFavoritMitarbeiter = false;
    data.freigebeFavoritProduktion = false;
    data.freigebeFavoritSpielstaette = false;
    data.freigebeFavoritWerk = false;

    const copy = this.convertDateFromClient(data);
    return this.http
      .post<Bp>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<Bp>) => {
          return this.convertDateFromServer(res).body;
        })
      );
  }

  update(bp: Bp): Observable<Bp> {
    // const copy = this.convertDateFromClient(bp);
    return this.http.put(this.resourceUrl, bp, { observe: 'response' }).pipe(
      map((res: HttpResponse<Bp>) => {
        return this.convertDateFromServer(res).body;
      })
    );
  }

  query(req?: any): Observable<Bp> {
    const options = createRequestOption(req);
    return this.http
      .get<Bp>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<Bp>) => this.convertDateFromServer(res).body));
  }

  queryBpForAdmin(id?: number): Observable<Bp[]> {
    return this.http
      .get(this.resourceUrlAdmin + '?id.equals=' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<Bp[]>) => res.body));
  }

  findEacha(req?: any): Observable<Bp[]> {
    return this.http.get(this.resourceUrlAll + '?id.equals=' + req, { observe: 'response' }).pipe(
      map((res: HttpResponse<Bp[]>) => {
        return res.body;
      })
    );
  }

  findEachMitEmail(req?: any): Observable<Bp[]> {
    return this.http.get(this.resourceUrlAll + '?email.equals=' + req, { observe: 'response' }).pipe(
      map((res: HttpResponse<Bp[]>) => {
        return res.body;
      })
    );
  }

  findCrowd(req?: any): Observable<Bp[]> {
    return this.http.get(this.resourceUrlAllCrowd + '?id.equals=' + req, { observe: 'response' }).pipe(
      map((res: HttpResponse<Bp[]>) => {
        return res.body;
      })
    );
  }

  findCrowdMultipleId(req?: any): Observable<Bp[]> {
    return this.http.get(this.resourceUrlAllCrowd + '?id.in=' + req, { observe: 'response' }).pipe(
      map((res: HttpResponse<Bp[]>) => {
        return res.body;
      })
    );
  }

  benImageMutiBildId(req?: any): Observable<BpImage[]> {
    return this.http.get(this.resourceImageAll + '?Id.in=' + req, { observe: 'response' }).pipe(
      map((res: HttpResponse<BpImage[]>) => {
        return res.body;
      })
    );
  }

  delete(bpdelete: Bpdelete) {
    return this.http.post(this.resourceUrlactive, bpdelete, { observe: 'response' });
  }

  find(): Observable<Bp> {
    return this.http.get(this.resourceUrl, { observe: 'response' }).pipe(
      map((res: HttpResponse<Bp>) => {
        return this.convertDateFromServer(res).body;
      })
    );
  }

  createImage(bpimage: BpImage): Observable<BpImage> {
    return this.http.post(this.resourceImage, bpimage, { observe: 'response' }).pipe(
      map((res: HttpResponse<BpImage>) => {
        return res.body;
      })
    );
  }

  updateImage(bpimage: BpImage): Observable<BpImage> {
    return this.http.put(this.resourceImage, bpimage, { observe: 'response' }).pipe(
      map((res: HttpResponse<BpImage>) => {
        return res.body;
      })
    );
  }

  deleteImage(): Observable<BpImage> {
    return this.http.delete(this.resourceImage, { observe: 'response' }).pipe(
      map((res: HttpResponse<BpImage>) => {
        return res.body;
      })
    );
  }

  queryImage(): Observable<BpImage> {
    return this.http.get(this.resourceImage, { observe: 'response' }).pipe(
      map((res: HttpResponse<BpImage>) => {
        return res.body;
      })
    );
  }

  queryImageBp(id: number): Observable<BpImage[]> {
    return this.http.get(this.resourceImageAll + '?bpsId.equals=' + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<BpImage[]>) => {
        return res.body;
      })
    );
  }

  queryImageMultipleWithBpId(id: any): Observable<BpImage[]|null> {
    return this.http.get(this.resourceImageAll + '?bpsId.in=' + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<BpImage[]>) => {
        return res.body;
      })
    );
  }

  changeStatus(req?: any): Observable<DashboardModel|null> {
    const options = createRequestOption(req);
    return this.http
      .get(this.dashresourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<DashboardModel>) => res.body));
  }

  getSuggestions(paramValue: string): any {
    if (paramValue) {
      let url = this.suggestionUrl + '?werteliste.equals=' + paramValue;
      return this.http.get(url, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
    }
  }

  getBenutzerData(num: number): Observable<any> {
    let url = this.getBenutzerUrl + '/' + num;
    return this.http.get(url, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  getKachelSavedPosition():Observable<any[]> {
    return this.http.get(this.postKachelResource, { observe: 'response' }).pipe(
      map((res: HttpResponse<any[]>) => {
        return res.body;
      })
    );
  }

  saveCardNewPosition(bpKachels: BpKachels): Observable<BpKachels|null> {
    return this.http.post(this.postKachelResource, bpKachels, { observe: 'response' }).pipe(
      map((res: HttpResponse<BpKachels>) => {
        return res.body;
      })
    );
  }

  protected convertDateFromClient(benutzer: Bp): Bp {
    let converted_date = NgbDateDayjsAdapter.prototype.fromModel(benutzer.geburtstag);
    if(converted_date == null) {
      converted_date = { year: 1111, month: 1 + 1, day: 1 };
    }
    const copy: Bp = Object.assign({}, benutzer, {
      geburtstag:
        benutzer.geburtstag != null && benutzer.geburtstag.isValid()
          ? dayjs(Date.UTC(converted_date.year, converted_date.month - 1, converted_date.day))
          : null,
    });
    return copy;
  }

  protected convertDateFromServer(res: HttpResponse<Bp>): HttpResponse<Bp> {
    if (res.body) {
      res.body.geburtstag = res.body.geburtstag != null ? dayjs(res.body.geburtstag) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: HttpResponse<Bp[]>): HttpResponse<Bp[]> {
    if (res.body) {
      res.body.forEach((benutzer: Bp) => {
        benutzer.geburtstag = benutzer.geburtstag != null ? dayjs(benutzer.geburtstag) : null;
      });
    }
    return res;
  }
}
