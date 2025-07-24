import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BuchungContract} from 'app/shared/models/buchungContract.model';
import {DOC_EDIT_WEB_API_ACTION} from 'app/app.constants';

@Injectable()
export class PublicContractService {
  public getBuchungContractURL = 'services/opttab/api/public/Anbahnung/complete/data/';
  public acceptBuchungContractURL = 'services/opttab/api/public/Buchung/Vertrag/Freigabe/';
  public declinedBuchungContractURL = 'services/opttab/api/public/Buchung/Vertrag/Ablehnung/';
  private buchungContractCamundaBearbeitenUrl = 'services/opttab/api/public/Buchung/Vertrag/Camunda/Bearbeiten/';
  private buchungContractAnfrageUrl = 'services/opttab/api/public/Buchung/Vertrag/Anfrage/';
  private buchungContractPublicUrl = 'services/opttab/api/public/data/buchung/contract/';
  private vertragHistorieUrlPublic = 'services/opttab/api/public/Buchung/Vertrag/Historie/';
  private buchungContractBestUrl = 'services/opttab/api/public/Buchung/Vertrag/Beastatigung';
  private wordEditorImportUrl = DOC_EDIT_WEB_API_ACTION;
  private pdfConvertURL = 'services/opttab/api/public/pdf/convert';

  constructor(private http: HttpClient) {}

  wordEditorImport(data) {
    return this.http
      .post(this.wordEditorImportUrl + 'Import', data, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  wordToPdf(data) {
    let header = new HttpHeaders();
    return this.http
      .post(this.pdfConvertURL, data, { observe: 'response', headers: header })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  publicBuchungContractCamundaBearbeiten(data: BuchungContract, betId, password) {
    return this.http.post(this.buchungContractCamundaBearbeitenUrl + password + '/' + betId, data, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  getHistorieContractQueryPublic(buchangeId, freigabeId, anlegeerId) {
    return this.http.get(this.vertragHistorieUrlPublic + buchangeId + '/' + freigabeId + '/' + anlegeerId, { observe: 'response' }).pipe(
      map((res: HttpResponse<any[]>) => {
        return res.body;
      })
    );
  }

  deleteBuchungContractBestPubic(id: number) {
    return this.http.put(this.buchungContractBestUrl + '/' + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  publicMakeContractAnfrage(data: BuchungContract, betId, password) {
    return this.http.post(this.buchungContractAnfrageUrl + password + '/' + betId, data, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  getPublicBuchungContractService(password, hash) {
    return this.http
      .get(this.getBuchungContractURL + password + '/' + hash, { observe: 'response' })
      .pipe(map((res: HttpResponse<BuchungContract>) => res.body));
  }

  getPublicBuchungContractWithoutPassword(hash) {
    return this.http
      .get(this.buchungContractPublicUrl + hash, { observe: 'response' })
      .pipe(map((res: HttpResponse<BuchungContract>) => res.body));
  }

  acceptPublicBuchungContractService(password, betId, buchung) {
    return this.http
      .post(this.acceptBuchungContractURL + password + '/' + betId, buchung, { observe: 'response' })
      .pipe(map((res: HttpResponse<BuchungContract>) => res.body));
  }

  declinedPublicBuchungContractService(password, betId, buchung) {
    return this.http
      .post(this.declinedBuchungContractURL + password + '/' + betId, buchung, { observe: 'response' })
      .pipe(map((res: HttpResponse<BuchungContract>) => res.body));
  }
}
