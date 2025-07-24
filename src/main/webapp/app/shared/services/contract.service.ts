import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BuchungContract, BuchungContractBest} from 'app/shared/models/buchungContract.model';
import {
  createRequestOptionAbteilung,
  createRequestOptionHistorie,
  createRequestOptionVerknupfung,
  createRequestOptionVerknupfungWithoutEntwürf,
  createRequestOptionVertrag,
} from 'app/shared/util/request-util';
import {BuchVorlageObjKatGETDTOList, VertragsVorlageModel} from 'app/shared/models/vertrags-vorlage.model';
import {DOC_EDIT_WEB_API_ACTION, DOC_MERGE_WEB_API_ACTION} from 'app/app.constants';

@Injectable()
export class ContractService {
  private wordEditorImportUrl = DOC_EDIT_WEB_API_ACTION;
  private pdfMergeUrl = DOC_MERGE_WEB_API_ACTION;
  private buchungContractUrl = 'services/opttab/api/V1/Buchung/Vertrag/Bearbeitung/';
  private getbuchungContractUrl = 'services/opttab/api/V1/Buchung/Vertrag';
  private getbuchungContractUrlKonverter = 'services/opttab/api/V1/Buchung/Vertrag/Konvert';
  private getbuchungContractUrlAdministrator = 'services/opttab/api/V1/Buchung/Vertrag/Administrator';
  private getbuchungContractOffeneUrl = 'services/opttab/api/V1/Buchung/Vertrag/offen/count';
  private buchungContractVorlageUrl = 'services/opttab/api/V1/Buchung/Vorlage';
  private buchungContractVorlageUrlKonvert = 'services/opttab/api/V1/Buchung/Vorlage/Konvert';
  private buchungContractVorlageUrlAdministrator = 'services/opttab/api/V1/Buchung/Vorlage/Administrator';
  private buchungContractAnfrageUrl = 'services/opttab/api/V1/Buchung/Vertrag/Anfrage/';
  private buchungContractCamundaBearbeitenUrl = 'services/opttab/api/V1/Buchung/Vertrag/Camunda/Bearbeiten/';
  private buchungContractCamundaAblehnungUrl = 'services/opttab/api/V1/Buchung/Vertrag/Ablehnung/';
  private buchungContractCamundaFreigabeUrl = 'services/opttab/api/V1/Buchung/Vertrag/Freigabe/';
  private buchungContractBestUrl = 'services/opttab/api/Buchung/Vertrag/Beastatigung';
  private buchungContractVorschaubeUrl = 'services/opttab/api/public/data/merge/';
  private publicDataDTOUrl = 'services/opttab/api/public/data';
  private buchungContractMergeIGUrl = 'services/opttab/api/public/data/mergeIG/';
  private buchungContractUpdateBuchAngeVertrag = 'services/opttab/api/public/data/update/buchAnge/vertrag/';
  private buchungContractVorschauVorlageUrl = 'services/opttab/api/public/data/vorlage/merge/';
  private vorlageTagUrl = 'services/opttab/api/V1/Buchung/Vorlagen/Tags';
  private opttabListenWerteUrl = 'services/opttab/api/V1/Listen/Wertelisten/all';
  private buchungContractSuggestionFromAIURL = 'services/opttab/api/V1/machine/check/';
  private pdfConvertURL = 'services/opttab/api/V1/pdf/convert';
  private vertragHistorieUrl = 'services/opttab/api/V1/Buchung/Vertrag/Historie';
  private vorlageCaseIgnoreApiFilter = 'services/opttab/api/V1/Buchung/Vorlage/filter';
  constructor(private http: HttpClient) {}

  wordEditorImport(data) {
    return this.http
      .post(this.wordEditorImportUrl + 'Import', data, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  wordEditorImporttxt(data) {
    return this.http
      .post(this.wordEditorImportUrl + 'Importtxt', data, { observe: 'response', responseType: 'blob' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  mergePdfImport(pdf_1, pdf_2) {
    return this.http.post(this.pdfMergeUrl, [pdf_1, pdf_2], { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  savePublicData(data) {
    return this.http.post(this.publicDataDTOUrl, data, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  // wordToPdf(data) {
  //   let header = new HttpHeaders();
  //   header.set('Content-Type', 'multipart/form-data');
  //   return this.http
  //     .post(this.wordEditorImportUrl + 'DocToPDF?fileName=result-from.pdf', data, { observe: 'response', headers: header })
  //     .pipe(map((res: HttpResponse<any>) => res.body));
  // }

  wordToPdf(data) {
    let header = new HttpHeaders();
    // header.set('Content-Type', 'multipart/form-data');
    // header.set("Access-Control-Allow-Origin", "*");

    return this.http
      .post(this.pdfConvertURL, data, { observe: 'response', headers: header })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  dashboardVertragButtonDislpay(betId: number) {
    return this.http
      .get('services/opttab/api/V1/Vertrag/Count/' + betId, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  makeContractAnfrage(data: BuchungContract, betId) {
    return this.http.post(this.buchungContractAnfrageUrl + betId, data, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  buchungContractCamundaBearbeiten(data: BuchungContract, betId) {
    return this.http.post(this.buchungContractCamundaBearbeitenUrl + betId, data, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  buchungContractCamundaAblehnung(data: BuchungContract, betId) {
    return this.http.post(this.buchungContractCamundaAblehnungUrl + betId, data, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  buchungContractCamundaFreigabe(data: BuchungContract, betId) {
    return this.http.post(this.buchungContractCamundaFreigabeUrl + betId, data, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  postBuchungContract(data: BuchungContract, betId) {
    return this.http.post(this.buchungContractUrl + betId, data, { observe: 'response' }).pipe(
      map((res: HttpResponse<BuchungContract>) => {
        return res.body;
      })
    );
  }

  postBuchungContractKonvert(data: any) {
    return this.http.post(this.getbuchungContractUrlKonverter, data, { observe: 'response' }).pipe(
      map((res: HttpResponse<BuchungContract>) => {
        return res.body;
      })
    );
  }

  putBuchungContract(data: BuchungContract, betId) {
    return this.http.put(this.buchungContractUrl + betId, data, { observe: 'response' }).pipe(
      map((res: HttpResponse<BuchungContract>) => {
        return res.body;
      })
    );
  }

  getBuchungContractId(id) {
    return this.http.get(this.getbuchungContractUrl + '/' + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<BuchungContract>) => {
        return res.body;
      })
    );
  }

  getVorlageIgnoreCaseFilter(id, vorlagename) {
    return this.http.get(this.vorlageCaseIgnoreApiFilter + '/' + id + '/' + vorlagename, { observe: 'response' }).pipe(
      map((res: HttpResponse<any[]>) => {
        return res.body;
      })
    );
  }

  getBuchungContractQuery(req) {
    const options = createRequestOptionVerknupfung(req);
    return this.http.get(this.getbuchungContractUrl, { params: options, observe: 'response' }).pipe(
      map((res: HttpResponse<any[]>) => {
        return res.body;
      })
    );
  }

  getBuchungContractQueryAdministrator(req) {
    const options = createRequestOptionVertrag(req);
    return this.http.get(this.getbuchungContractUrlAdministrator, { params: options, observe: 'response' }).pipe(
      map((res: HttpResponse<any[]>) => {
        return res.body;
      })
    );
  }

  getBuchungVorlageQueryAdministrator(req) {
    const options = createRequestOptionVertrag(req);
    return this.http.get(this.buchungContractVorlageUrlAdministrator, { params: options, observe: 'response' }).pipe(
      map((res: HttpResponse<any[]>) => {
        return res.body;
      })
    );
  }

  getBuchungContractQueryOffeneNummer(req, betriebsId) {
    const options = createRequestOptionVerknupfung(req);
    return this.http.get(this.getbuchungContractOffeneUrl + '/' + betriebsId, { params: options, observe: 'response' }).pipe(
      map((res: HttpResponse<number>) => {
        return res.body;
      })
    );
  }

  getBuchungContractWithoutEntwürfQuery(req) {
    const options = createRequestOptionVerknupfungWithoutEntwürf(req);
    return this.http.get(this.getbuchungContractUrl, { params: options, observe: 'response' }).pipe(
      map((res: HttpResponse<BuchungContract[]>) => {
        return res.body;
      })
    );
  }

  getHistorieContractQuery(req) {
    const options = createRequestOptionHistorie(req);
    return this.http.get(this.vertragHistorieUrl, { params: options, observe: 'response' }).pipe(
      map((res: HttpResponse<any[]>) => {
        return res.body;
      })
    );
  }

  postVertragVorlage(data: VertragsVorlageModel) {
    return this.http.post(this.buchungContractVorlageUrl, data, { observe: 'response' }).pipe(
      map((res: HttpResponse<VertragsVorlageModel>) => {
        return res.body;
      })
    );
  }

  postVertragVorlageKonvert(data: any) {
    return this.http.post(this.buchungContractVorlageUrlKonvert, data, { observe: 'response' }).pipe(
      map((res: HttpResponse<VertragsVorlageModel>) => {
        return res.body;
      })
    );
  }

  putVertragVorlage(data: VertragsVorlageModel) {
    return this.http.put(this.buchungContractVorlageUrl, data, { observe: 'response' }).pipe(
      map((res: HttpResponse<VertragsVorlageModel>) => {
        return res.body;
      })
    );
  }

  getVertragVorlageQuery(req) {
    const options = createRequestOptionAbteilung(req);
    return this.http.get(this.buchungContractVorlageUrl, { params: options, observe: 'response' }).pipe(
      map((res: HttpResponse<VertragsVorlageModel[]>) => {
        return res.body;
      })
    );
  }

  getBuchungVorlageId(id) {
    return this.http.get(this.buchungContractVorlageUrl + '/' + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<BuchungContract>) => {
        return res.body;
      })
    );
  }

  deleteBuchungVorlage(id) {
    return this.http.delete(this.buchungContractVorlageUrl + '/' + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<BuchungContract>) => {
        return res.body;
      })
    );
  }

  deleteContract(id, betriebsId, contractMessage) {
    return this.http.post(this.getbuchungContractUrl + '/' + betriebsId + '/' + id, contractMessage, { observe: 'response' }).pipe(
      map((res: HttpResponse<BuchungContract>) => {
        return res.body;
      })
    );
  }

  contractVorschau(data, hash, betrieb_id?) {
    return this.http.post(this.buchungContractVorschaubeUrl + hash, data, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  updateBuchAngeVertrag(buch_ange_id,data, betrieb_id?) {
    return this.http.post(this.buchungContractUpdateBuchAngeVertrag + buch_ange_id, data, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  getIGPdf(vorschau,buchId,conttractId) {
    return this.http.get(this.buchungContractMergeIGUrl + vorschau+'/' + buchId+'/'+conttractId, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  vorlageVorschau(id) {
    return this.http.get(this.buchungContractVorschauVorlageUrl + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  postBuchungContractBest(data: BuchungContractBest) {
    return this.http.post(this.buchungContractBestUrl, data, { observe: 'response' }).pipe(
      map((res: HttpResponse<BuchungContractBest>) => {
        return res.body;
      })
    );
  }

  putBuchungContractBest(data: BuchungContractBest) {
    return this.http.put(this.buchungContractBestUrl, data, { observe: 'response' }).pipe(
      map((res: HttpResponse<BuchungContractBest>) => {
        return res.body;
      })
    );
  }

  deleteBuchungContractBest(id: number) {
    return this.http.put(this.buchungContractBestUrl + '/' + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  getBuchungContractBest(req) {
    const options = createRequestOptionVerknupfung(req);
    return this.http.get(this.buchungContractBestUrl, { params: options, observe: 'response' }).pipe(
      map((res: HttpResponse<BuchungContractBest[]>) => {
        return res.body;
      })
    );
  }

  postVorlageTag(data: BuchungContractBest) {
    return this.http.post(this.vorlageTagUrl, data, { observe: 'response' }).pipe(
      map((res: HttpResponse<BuchVorlageObjKatGETDTOList>) => {
        return res.body;
      })
    );
  }

  deleteVorlageTagService(id: number) {
    return this.http.delete(this.vorlageTagUrl + '/' + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<BuchVorlageObjKatGETDTOList>) => {
        return res.body;
      })
    );
  }

  getVorlageTag(req) {
    const options = createRequestOptionVerknupfung(req);
    return this.http.get(this.vorlageTagUrl, { params: options, observe: 'response' }).pipe(
      map((res: HttpResponse<BuchVorlageObjKatGETDTOList[]>) => {
        return res.body;
      })
    );
  }

  getOpttabWertListe(queryParams: string) {
    return this.http.get(this.opttabListenWerteUrl + queryParams, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  getContractSuggestionFromAI(buchId, aktivId) {
    return this.http.get(this.buchungContractSuggestionFromAIURL + aktivId + '/' + buchId + '/' + '1', { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }
}
