import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BetriebVisibleProdsModel, ProduktionTabObj, Spielzeit} from 'app/shared/models/production.model';
import {Actioncode} from 'app/shared/enum/enum.model';
import {BetMitwirkende} from 'app/shared/models/bet-mitwirkend';
import {Werksangaben} from 'app/shared/models/werksangaben.model';
import {AngebotTabObj} from 'app/shared/models/ange-prod.model';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AngebotMenuModel, MenuEintragModel, ProductionMenuModel} from 'app/shared/models/production-menu.model';
import {AngeProdStatus} from 'app/shared/models/ange-prod-status.model';
import dayjs from "dayjs/esm";
import {createRequestAngebot, createRequestMitwirkend, createRequestProduction} from 'app/shared/util/request-util';
import {NgbDateDayjsAdapter} from './../../config/datepicker-adapter';
import {Bp} from 'app/shared/models/bp.model';
import {ProdStageModel} from 'app/shared/models/prod-stage.model';
import {Wertelisten} from 'app/shared/models/suggestionWertelisten.model';
import {Notes} from '../models/betrieb.model';

@Injectable()
export class prodHTTPService {
  private prodMenuSingleID = 'services/prodtab/api/V1/production/menu\n';
  private menuEintragAPI = 'services/prodtab/api/V1/menu/eintrag\n';
  private betriebNoteURL = 'services/prodtab/api/V1/betrieb/notiz\n';
  private angebotMenuSingleID = 'services/prodtab/api/V1/angebot/menu\n';
  private angebotMenuSingleIDAnge = 'services/prodtab/api/V1/angebot/group/menu\n';
  private prodStatus = 'services/prodtab/api/V1/Angebot/Produktion/Status';
  private prodStatusFilter = 'services/prodtab/api/V1/Angebot/filter/Produktion/Status';
  private werksangabenUrl = 'services/prodtab/api/V1/Produkt/Werk/all';
  private werksAngabenTab = 'services/prodtab/api/V1/Produkt/Werk';
  private resourceproduktion = 'services/prodtab/api/V1/Produkt/Produktion';
  private resourceproduktionAll = 'services/prodtab/api/V1/Produkt/Produktion/all';
  private angebotUrl = 'services/prodtab/api/V1/Angebot/Produktion/all';
  private angebotUrlSave = 'services/prodtab/api/V1/Angebot/Produktion';
  private spielzeits = 'services/prodtab/api/liste-spielzeits';
  private suggestions = 'services/prodtab/api/V1/Liste/Wertelisten/all';
  private resourceUrlBetriebsIdFilter = 'services/prodtab/api/V1/Produkt/filter/Produktion/';
  private resourceUrlProductionFilter = 'services/prodtab/api/V1/Produkt/filter/Produktion';
  private resourceUrlProductionmitwirkend = 'services/prodtab/api/V1/Betrieb/Mitwirkend/';
  private resourceUrlProductionmitwirkendProdInfo = 'services/prodtab/api/V1/mitwirkende/database/';
  private resourceUrlProductionmitwirkendProdInfoOne = 'services/prodtab/api/V1/mitwirkende/database/single/';
  private resourceUrlProductionmitwirkendBerufTag = 'services/prodtab/api/mit-beruf-tags/';
  private deleteStageUrl = 'services/bettab/api/V1/betriebe/Spielstaetten';
  private getProductionUrl = 'services/prodtab/api/V1/Produkt/Produktion/';
  private produktionsdatenUrl = 'services/prodtab/api/V1/Produkt/Produktion/';
  private produktionsSpielIdUrl = 'services/prodtab/api/V1/Produkt/Spielstätte/spiel/';

  private deleteAngeStageStatusUrl = 'services/prodtab/api/V1/Angebot/Spielstaette/Status/';
  private deleteProdStageUrl = 'services/prodtab/api/V1/Produkt/Spielstätte/';
  private deleteBetStageUrl = 'services/bettab/api/V1/betriebe/Spielstaetten/';

  private deleteAngeWerkStatusUrl = 'services/prodtab/api/V1/Angebot/Werk/Status/';
  private deleteProdWerkUrl = 'services/prodtab/api/V1/Produkt/Werk/';

  private deleteAngeProdStatusUrl = 'services/prodtab/api/V1/Angebot/Produktion/Status/';
  private resourceUrlVisibleprods = 'services/prodtab/api/V1/visible/production/group/';
  private deleteWerkUrl = 'services/prodtab/api/V1/Produkt/Werk';

  private neueProduztionData = 'services/prodtab/api/V1/benutzer/new_productions';
  private prodMitwirPersonUrl = 'services/prodtab/api/V1/produkt/Produktion/Mitwikende/Person';

  private prodInternValidationUrl = 'services/prodtab/api/produktion/check/interne_bezeichnung';

  private betriebMitwirkendeBenutzerVerknupfung = 'services/prodtab/api/V1/Betrieb/Mitwirkend/Bentuzerverknupfung/';
  private betriebMitwirkendeBetriebVerknupfung = 'services/prodtab/api/V1/Betrieb/Mitwirkend/Betriebverknupfung/';
  private betriebMitwirkendeVerknupfungCheckBoolean = 'services/prodtab/api/V1/Betrieb/Mitwirkend';

  constructor(private http: HttpClient) {}

  getNewProductionData(num: number) {
    let url = this.neueProduztionData + '/' + num;
    return this.http.get(url, { observe: 'response' }).pipe(
      map((res: HttpResponse<any[]>) => {
        return res.body;
      })
    );
  }

  getProductionIDFromMenu(menuIDObject): Observable<ProductionMenuModel[]> {
    return this.http.post(this.prodMenuSingleID, menuIDObject, { observe: 'response' }).pipe(
      map((res: HttpResponse<ProductionMenuModel[]>) => {
        return res.body;
      })
    );
  }

  getProductionIDFromMenuModeKalendar(menuIDObject): Observable<ProductionMenuModel[]> {
    return this.http.post(this.prodMenuSingleID, menuIDObject, { observe: 'response' }).pipe(
      map((res: HttpResponse<ProductionMenuModel[]>) => {
        return res.body;
      })
    );
  }

  getMenuEintrag(betriebId): Observable<MenuEintragModel[]> {
    return this.http.get(this.menuEintragAPI + '/' + betriebId, { observe: 'response' }).pipe(
      map((res: HttpResponse<MenuEintragModel[]>) => {
        return res.body;
      })
    );
  }

  createBetriebNotes(notes, betriebsId): Observable<Notes> {
    return this.http.post(this.betriebNoteURL + '/' + betriebsId, notes, { observe: 'response' }).pipe(
      map((res: HttpResponse<Notes>) => {
        return res.body;
      })
    );
  }

  updateBetriebNotes(notes): Observable<Notes> {
    return this.http.put(this.betriebNoteURL, notes, { observe: 'response' }).pipe(
      map((res: HttpResponse<Notes>) => {
        return res.body;
      })
    );
  }

  deleteBetriebNotes(id): Observable<Notes> {
    return this.http.delete(this.betriebNoteURL + '/' + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<Notes>) => {
        return res.body;
      })
    );
  }

  getBetriebNotes(betriebsId, req?: any): Observable<Notes[]> {
    const options = createRequestAngebot(req);
    return this.http
      .get(this.betriebNoteURL + '/all/' + betriebsId, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<Notes[]>) => this.convertDateFromNotesBetrieb(res.body)));
  }

  getBetriebNotesNumber(betriebsId, req?: any): Observable<any> {
    const options = createRequestAngebot(req);
    return this.http
      .get(this.betriebNoteURL + '/number/' + betriebsId, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  getCheckMitwirkendeForKunstler(prodKunstId: number, betriebId: number): Observable<boolean> {
    return this.http
      .get(this.betriebMitwirkendeVerknupfungCheckBoolean + '/' + prodKunstId + '/' + betriebId, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<boolean>) => {
          return res.body;
        })
      );
  }

  getAngebotMenuList(menuIDObject): Observable<AngebotMenuModel[]> {
    return this.http.post(this.angebotMenuSingleID, menuIDObject, { observe: 'response' }).pipe(
      map((res: HttpResponse<AngebotMenuModel[]>) => {
        return res.body;
      })
    );
  }

  getAngebotMenuListForAnge(menuIDObject): Observable<AngebotMenuModel[]> {
    return this.http.post(this.angebotMenuSingleIDAnge, menuIDObject, { observe: 'response' }).pipe(
      map((res: HttpResponse<AngebotMenuModel[]>) => {
        return res.body;
      })
    );
  }

  getStatus(angeProdID: number): Observable<AngeProdStatus[]> {
    return this.http.get(this.prodStatusFilter + '/' + angeProdID, { observe: 'response' }).pipe(
      map((res: HttpResponse<AngeProdStatus[]>) => {
        return res.body;
      })
    );
  }

  createStatus(statusObject): Observable<AngeProdStatus> {
    return this.http.post(this.prodStatus, statusObject, { observe: 'response' }).pipe(
      map((res: HttpResponse<AngeProdStatus>) => {
        return res.body;
      })
    );
  }

  updateStatus(statusObject): Observable<AngeProdStatus> {
    return this.http.put(this.prodStatus, statusObject, { observe: 'response' }).pipe(
      map((res: HttpResponse<AngeProdStatus>) => {
        return res.body;
      })
    );
  }

  deleteStatus(id: number) {
    return this.http.delete(this.prodStatus + '/' + id, { observe: 'response' });
  }

  getProductionbyId(id: number): Observable<ProduktionTabObj> {
    return this.http
      .get(this.resourceproduktion + '/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<ProduktionTabObj>) => this.convertDateFromServerProdProdSingle(res.body)));
  }

  /* get all production of betribe id (id = betribe ID)  */
  getAllProductionsofbetriebs(id: number): Observable<ProduktionTabObj[]> {
    return this.http
      .get(this.resourceUrlBetriebsIdFilter + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<ProduktionTabObj[]>) => this.convertDateFromServerProdProdArray(res.body)));
  }

  /* get all production of betribe id (id = betribe ID) and filter with Prod-werk ID  */
  getAllProductionswithProdWerksID(req?: any) {
    return this.http
      .get(this.resourceUrlBetriebsIdFilter + req.betID + '?prodWerksId.equals=' + req.prodWerkId, { observe: 'response' })
      .pipe(map((res: HttpResponse<ProduktionTabObj[]>) => this.convertDateFromServerProdProdArray(res.body)));
  }

  /*get all production Angebot object with the betrieb Id*/
  getAllAngebotofBetrieb(req?: any): Observable<AngebotTabObj[]> {
    const options = createRequestAngebot(req);
    return this.http
      .get(this.angebotUrl, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<AngebotTabObj[]>) => this.convertResonseFromServerAngebotArray(res.body)));
  }

  /*get production Angebot object with the prodprod Id*/
  getProductionAngebotquery(req?: any): Observable<AngebotTabObj[]> {
    const options = createRequestAngebot(req);
    return this.http
      .get(this.angebotUrl, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<AngebotTabObj[]>) => this.convertResonseFromServerAngebotArray(res.body)));
  }

  /*get production object by Production ID*/
  getProductionOnlyByID(id: number): Observable<ProduktionTabObj> {
    return this.http
      .get(this.getProductionUrl + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<ProduktionTabObj>) => this.convertDateFromServerProdProdSingle(res.body)));
  }

  /*get All production with Prod-werk Id*/
  getProductionbyWerkId(req?: any): Observable<ProduktionTabObj[]> {
    const options = createRequestProduction(req);
    return this.http
      .get(this.resourceproduktionAll, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<ProduktionTabObj[]>) => this.convertDateFromServerProdProdArray(res.body)));
  }

  /*get prod-werk with prod-werk id*/
  getWerksangabenbyID(id: number): Observable<Werksangaben> {
    return this.http
      .get(this.werksAngabenTab + '/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<Werksangaben>) => this.convertResonseFromServerProdWerkSingle(res.body)));
  }

  getAngebotbyProdId(req): Observable<AngebotTabObj[]> {
    const options = createRequestAngebot(req);
    return this.http
      .get(this.angebotUrl, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<AngebotTabObj[]>) => this.convertResonseFromServerAngebotArray(res.body)));
  }

  getProductionTabResourseSecondary(id: any): Observable<any> {
    return this.http.get(this.produktionsdatenUrl + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  /*Update prod-werk object*/
  putWerksAngabenDataAsync(Body: Werksangaben): Observable<Werksangaben> {
    const copy = this.convertResonseFromClientrProdWerkSingle(Body);
    return this.http
      .put(this.werksAngabenTab, copy, { observe: 'response' })
      .pipe(map((res: HttpResponse<Werksangaben>) => this.convertResonseFromServerProdWerkSingle(res.body)));
  }

  /*Create prod-werk object*/
  postWerksAngabenDataAsync(Body) {
    const copy = this.convertResonseFromClientrProdWerkSingle(Body);
    return this.http
      .post(this.werksAngabenTab, copy, { observe: 'response' })
      .pipe(map((res: HttpResponse<Werksangaben>) => this.convertResonseFromServerProdWerkSingle(res.body)));
  }

  /*delete Spiel Object*/
  deleteAngeSpielStatus(id): Observable<boolean> {
    return this.http.delete(this.deleteAngeStageStatusUrl + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<boolean>) => {
        if (res.status == 200) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  /*get Prod-spiel by ID */
  getProdSpiel(id): Observable<ProdStageModel> {
    return this.http.get(this.deleteProdStageUrl + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<ProdStageModel>) => {
        return res.body;
      })
    );
  }
  getProdSpielIdBySpielsId(id): Observable<number> {
    return this.http.get(this.produktionsSpielIdUrl + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<number>) => {
        return res.body;
      })
    );
  }

  /*get Prod-spiel by ID */
  getProdSpielbySpielsId(spielsid): Observable<ProdStageModel[]> {
    return this.http.get('services/prodtab/api/V1/Produkt/Spielstätte/all?spielssId.equals=' + spielsid, { observe: 'response' }).pipe(
      map((res: HttpResponse<ProdStageModel[]>) => {
        return res.body;
      })
    );
  }

  /*delete Prod-Spiel by Id*/
  deleteProdSpiel(id): Observable<boolean> {
    return this.http.delete(this.deleteProdStageUrl + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        if (res.status == 200) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  /*delete bet-spiel by id*/
  deleteBetSpiel(id): Observable<boolean> {
    return this.http.delete(this.deleteBetStageUrl + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        if (res.status == 200) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  deleteStageTab(id): Observable<any> {
    return this.http.delete(this.deleteStageUrl + '/' + id, { observe: 'response' });
  }

  /*delete Ange-werk status by Id*/
  deleteAngeWerkStatus(id): Observable<boolean> {
    return this.http.delete(this.deleteAngeWerkStatusUrl + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        if (res.status == 200) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  /*delete prod-werk by Id*/
  deleteProdWerk(id): Observable<boolean> {
    return this.http.delete(this.deleteProdWerkUrl + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        if (res.status == 200) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  /*delete Ange-prod status by id*/
  deleteAngeProdStatus(id): Observable<boolean> {
    return this.http.delete(this.deleteAngeProdStatusUrl + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        if (res.status == 200) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  /*delete Prod-prod by Id*/
  deleteProdProd(id): Observable<boolean> {
    return this.http.delete(this.getProductionUrl + '/' + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        if (res.status == 200) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  deleteWerk(id): Observable<any> {
    return this.http.delete(this.deleteWerkUrl + '/' + id, { observe: 'response' });
  }

  /*delete Prod-werk by id*/
  deleteWerksAngabenDataAsync(id): Observable<any> {
    return this.http.delete(this.werksAngabenTab + id, { observe: 'response' });
  }

  deleteAngeProdDataAsync(id): Observable<any> {
    return this.http.delete(this.angebotUrlSave + id, { observe: 'response' });
  }

  /*delete prod-prod by id*/
  deleteProdProdDataAsync(id): Observable<any> {
    return this.http.delete(this.resourceproduktion + '/' + id, { observe: 'response' });
  }

  /*create Prod-Prod*/
  postProduktionDataAsync(Body: ProduktionTabObj) {
    let copy = this.convertResponseFromClientProduktion(Body);
    return this.http.post(this.resourceproduktion, copy, { observe: 'response' }).pipe(
      map((res: HttpResponse<ProduktionTabObj>) => {
        return this.convertDateFromServerProdProdSingle(res.body);
      })
    );
  }

  /*update prod-prod*/
  putProduktionDataAsync(Body) {
    let copy = this.convertResponseFromClientProduktion(Body);
    return this.http.put(this.resourceproduktion, copy, { observe: 'response' }).pipe(
      map((res: HttpResponse<ProduktionTabObj>) => {
        return this.convertDateFromServerProdProdSingle(res.body);
      })
    );
  }

  /*create Angebot production */
  postAngebotDataAsync(Body) {
    let copy = this.convertDateFromClientAngebot(Body);
    return this.http.post(this.angebotUrlSave, copy, { observe: 'response' }).pipe(
      map((res: HttpResponse<AngebotTabObj>) => {
        return this.convertResonseFromServerAngebotSingle(res.body);
      })
    );
  }

  /*Update Angebot Production*/
  putAngebotnDataAsync(Body) {
    let copy = this.convertDateFromClientAngebot(Body);
    return this.http
      .put(this.angebotUrlSave, copy, { observe: 'response' })
      .pipe(map((res: HttpResponse<AngebotTabObj>) => this.convertResonseFromServerAngebotSingle(res.body)));
  }

  changeActionProperty(arrarName: Array<any>) {
    arrarName.forEach(element => {
      for (let property in element) {
        if (element.hasOwnProperty(property)) {
          if (typeof element[property] === 'object') {
            this.changeActionProperty(element[property]);
          } else if (element[property] == 'actioncode') {
            element.property = Actioncode.unchanged;
          }
        }
      }
    });
    return arrarName;
  }

  /*get all mitwirkend with betribe id*/
  getAllProductionmitwirkend(req: any) {
    const options = createRequestMitwirkend(req);
    return this.http
      .get(this.resourceUrlProductionmitwirkend, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<BetMitwirkende[]>) => res.body));
  }

  /*get all mitwirkend with betribe id*/
  getSingleMitwirkend(id) {
    return this.http
      .get(this.resourceUrlProductionmitwirkend + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<BetMitwirkende[]>) => res.body));
  }

  /*get all mitwirkend with Production Info with betribe id*/
  getAllProductionmitwirkendWithProdInfo(req: number) {
    return this.http
      .get(this.resourceUrlProductionmitwirkendProdInfo + req, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  getAllProductionmitwirkendWithProdInfoandId(req: number, prod_id: number) {
    return this.http
      .get(this.resourceUrlProductionmitwirkendProdInfo + req + '/' + prod_id, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  /*get all mitwirkend with Production Info with betribe id*/
  getAllProductionmitwirkendWithProdInfoSIngle(betId: number, id: number) {
    return this.http
      .get(this.resourceUrlProductionmitwirkendProdInfoOne + betId + '/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  /*update mitwirkend */
  updateAllProductionmitwirkend(body: BetMitwirkende): Observable<BetMitwirkende> {
    return this.http.put(this.resourceUrlProductionmitwirkend, body, { observe: 'response' }).pipe(
      map((res: HttpResponse<BetMitwirkende>) => {
        return res.body;
      })
    );
  }

  /*create new Mitwirkend*/
  newAllProductionmitwirkend(body) {
    return this.http.post(this.resourceUrlProductionmitwirkend, body, { observe: 'response' }).pipe(
      map((res: HttpResponse<BetMitwirkende>) => {
        return res.body;
      })
    );
  }

  /*delete mitwirkend*/
  deleteAllProductionmitwirkend(body, aktivBetId) {
    return this.http.delete(this.resourceUrlProductionmitwirkend + aktivBetId + '/' + body, { observe: 'response' });
  }

  /*delete mitwirkend tag*/
  deleteAllProductionmitwirkendBerufTag(body) {
    return this.http.delete(this.resourceUrlProductionmitwirkendBerufTag + body, { observe: 'response' });
  }

  checkBetMitExistInAnyProdBeforeDelete(id) {
    return this.http
      .get(this.prodMitwirPersonUrl + '/?betriebMitwirkendeId.equals=' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<Spielzeit[]>) => res.body));
  }

  getAllSpielzeitsync() {
    return this.http.get(this.spielzeits, { observe: 'response' }).pipe(map((res: HttpResponse<Spielzeit[]>) => res.body));
  }

  searchProd(term: string): Observable<Werksangaben[]> {
    let queryparameter = '?titel.contains=' + term;
    return this.http
      .get(this.werksangabenUrl + queryparameter, { observe: 'response' })
      .pipe(map((res: HttpResponse<Werksangaben[]>) => res.body));
  }

  searchWerkAktiveBet(term: string, id?: number): Observable<Werksangaben[]> {
    let queryparameter = '?betriebsId.equals=' + id + '&titel.contains=' + term;
    return this.http
      .get(this.werksangabenUrl + queryparameter, { observe: 'response' })
      .pipe(map((res: HttpResponse<Werksangaben[]>) => res.body));
  }

  searchWerkForBetExist(term: string, id?: number): Observable<Werksangaben[]> {
    let queryparameter = '?betriebsId.equals=' + id + '&titel.equals=' + term;
    return this.http
      .get(this.werksangabenUrl + queryparameter, { observe: 'response' })
      .pipe(map((res: HttpResponse<Werksangaben[]>) => res.body));
  }

  searchInterneBezeichnung(req: any): Observable<ProduktionTabObj[]> {
    let queryparameter = '?interne_bezeichnung_der_produkts.equals=' + req.term;
    return this.http
      .get(this.resourceUrlProductionFilter + '/' + req.this.aktivBetriebObject.id + queryparameter, { observe: 'response' })
      .pipe(map((res: HttpResponse<ProduktionTabObj[]>) => res.body));
  }

  getTagSuggestionsync(id: string) {
    return this.http.get(this.suggestions + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<Wertelisten[]>) => {
        return res.body;
      })
    );
  }

  deleteProdMitwirPersone(id: number) {
    return this.http.delete(this.prodMitwirPersonUrl + '/' + id, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        if (res.status == 200) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  productionInterneBezichnugValidation(item) {
    return this.http.post(this.prodInternValidationUrl, item, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  private convertDateFromClientAngebot(angebot: AngebotTabObj): AngebotTabObj {
    let copy: AngebotTabObj = Object.assign({}, angebot);
    for (let i = 0; i < angebot.angeProdZeitDTOList.length; i++) {
      let converted_date3 = NgbDateDayjsAdapter.prototype.fromModel(copy.angeProdZeitDTOList[i].datumVon);
      let converted_date = NgbDateDayjsAdapter.prototype.fromModel(copy.angeProdZeitDTOList[i].datumBis);

      copy.angeProdZeitDTOList[i].datumVon =
        copy.angeProdZeitDTOList[i].datumVon != null && copy.angeProdZeitDTOList[i].datumVon.isValid()
          ? dayjs(Date.UTC(converted_date3.year, converted_date3.month - 1, converted_date3.day))
          : null;
      copy.angeProdZeitDTOList[i].datumBis =
        copy.angeProdZeitDTOList[i].datumBis != null && copy.angeProdZeitDTOList[i].datumBis.isValid()
          ? dayjs(Date.UTC(converted_date.year, converted_date.month - 1, converted_date.day))
          : null;
    }
    return copy;
  }

  /*Convert Array of Production Angebot object date from server*/
  protected convertResonseFromServerAngebotArray(angebots: AngebotTabObj[]) {
    if (angebots.length != 0) {
      angebots.forEach((angebot: AngebotTabObj) => {
        for (let i = 0; i < angebot.angeProdZeitDTOList.length; i++) {
          angebot.angeProdZeitDTOList[i].datumVon =
            angebot.angeProdZeitDTOList[i].datumVon != null ? dayjs(angebot.angeProdZeitDTOList[i].datumVon) : null;
          angebot.angeProdZeitDTOList[i].datumBis =
            angebot.angeProdZeitDTOList[i].datumBis != null ? dayjs(angebot.angeProdZeitDTOList[i].datumBis) : null;
        }
        angebot.vertriebBetriebIdAngefragtAm =
          angebot.vertriebBetriebIdAngefragtAm != null ? dayjs(angebot.vertriebBetriebIdAngefragtAm) : null;
      });
    }
    return angebots;
  }

  /*Convert Production Angebot object date from server*/
  protected convertResonseFromServerAngebotSingle(angebot: AngebotTabObj) {
    if (angebot) {
      for (let i = 0; i < angebot.angeProdZeitDTOList.length; i++) {
        angebot.angeProdZeitDTOList[i].datumVon =
          angebot.angeProdZeitDTOList[i].datumVon != null ? dayjs(angebot.angeProdZeitDTOList[i].datumVon) : null;
        angebot.angeProdZeitDTOList[i].datumBis =
          angebot.angeProdZeitDTOList[i].datumBis != null ? dayjs(angebot.angeProdZeitDTOList[i].datumBis) : null;
      }
      angebot.vertriebBetriebIdAngefragtAm =
        angebot.vertriebBetriebIdAngefragtAm != null ? dayjs(angebot.vertriebBetriebIdAngefragtAm) : null;
    }
    return angebot;
  }

  /*Convert array of prod-prod date */
  protected convertDateFromServerProdProdArray(productions: ProduktionTabObj[]) {
    if (productions) {
      productions.forEach((production: ProduktionTabObj) => {
        production.werkvertrag_produktrechte_bis =
          production.werkvertrag_produktrechte_bis != null ? dayjs(production.werkvertrag_produktrechte_bis) : null;
        production.werkvertrag_produktrechte_von =
          production.werkvertrag_produktrechte_von != null ? dayjs(production.werkvertrag_produktrechte_von) : null;
        for (let i = 0; i < production.prodProdRezenDTOList.length; i++) {
          production.prodProdRezenDTOList[i].datum =
            production.prodProdRezenDTOList[i].datum != null ? dayjs(production.prodProdRezenDTOList[i].datum) : null;
        }
      });
    }
    return productions;
  }

  /*Convert Dates for Notes for Betrieb */
  protected convertDateFromNotesBetrieb(betnotes: Notes[]) {
    if (betnotes) {
      betnotes.forEach((betnote: Notes) => {
        betnote.datum = betnote.datum != null ? dayjs(betnote.datum) : null;
      });
    }
    return betnotes;
  }

  /*Convert single of prod-prod date */
  protected convertDateFromServerProdProdSingle(production: ProduktionTabObj) {
    if (production) {
      production.werkvertrag_produktrechte_bis =
        production.werkvertrag_produktrechte_bis != null ? dayjs(production.werkvertrag_produktrechte_bis) : null;
      production.werkvertrag_produktrechte_von =
        production.werkvertrag_produktrechte_von != null ? dayjs(production.werkvertrag_produktrechte_von) : null;
      for (let i = 0; i < production.prodProdRezenDTOList.length; i++) {
        production.prodProdRezenDTOList[i].datum =
          production.prodProdRezenDTOList[i].datum != null ? dayjs(production.prodProdRezenDTOList[i].datum) : null;
      }
    }
    return production;
  }

  private convertResponseFromClientProduktion(produktion: ProduktionTabObj): ProduktionTabObj {
    const copy: ProduktionTabObj = Object.assign({}, produktion);
    let converted_date = null;
    let converted_date2 = null;
    if (produktion.werkvertrag_produktrechte_bis != null && !produktion.werkvertrag_produktrechte_bis.hasOwnProperty('year')) {
      converted_date = NgbDateDayjsAdapter.prototype.fromModel(produktion.werkvertrag_produktrechte_bis);
      converted_date2 = NgbDateDayjsAdapter.prototype.fromModel(produktion.werkvertrag_produktrechte_von);
    } else if (produktion.werkvertrag_produktrechte_bis != null && produktion.werkvertrag_produktrechte_bis.hasOwnProperty('year')) {
      converted_date = produktion.werkvertrag_produktrechte_bis;
      converted_date2 = produktion.werkvertrag_produktrechte_von;
    }
    copy.werkvertrag_produktrechte_bis =
      copy.werkvertrag_produktrechte_bis != null
        ? dayjs(Date.UTC(converted_date.year, converted_date.month - 1, converted_date.day))
        : null;
    copy.werkvertrag_produktrechte_von =
      copy.werkvertrag_produktrechte_von != null
        ? dayjs(Date.UTC(converted_date2.year, converted_date2.month - 1, converted_date2.day))
        : null;

    for (let i = 0; i < produktion.prodProdRezenDTOList.length; i++) {
      let converted_date3 = null;

      if (produktion.prodProdRezenDTOList[i].datum != null && !produktion.prodProdRezenDTOList[i].datum.hasOwnProperty('year')) {
        converted_date3 = NgbDateDayjsAdapter.prototype.fromModel(copy.prodProdRezenDTOList[i].datum);
      } else {
        converted_date3 = copy.prodProdRezenDTOList[i].datum;
      }
      copy.prodProdRezenDTOList[i].datum =
        copy.prodProdRezenDTOList[i].datum != null
          ? dayjs(Date.UTC(converted_date3.year, converted_date3.month - 1, converted_date3.day))
          : null;
    }
    return copy;
  }

  /*Convert Prod-werk object date from server*/
  protected convertResonseFromServerProdWerkSingle(prodwerk: Werksangaben) {
    if (prodwerk) {
      prodwerk.vertriebBetriebIdAngefragtAm =
        prodwerk.vertriebBetriebIdAngefragtAm != null ? dayjs(prodwerk.vertriebBetriebIdAngefragtAm) : null;
    }
    return prodwerk;
  }

  /*Convert Prod-werk object date from Client*/
  protected convertResonseFromClientrProdWerkSingle(prodwerk: Werksangaben) {
    let converted_date = NgbDateDayjsAdapter.prototype.fromModel(prodwerk.vertriebBetriebIdAngefragtAm);
    const copy: Bp = Object.assign({}, prodwerk, {
      vertriebBetriebIdAngefragtAm:
        prodwerk.vertriebBetriebIdAngefragtAm != null
          ? dayjs(Date.UTC(converted_date.year, converted_date.month - 1, converted_date.day))
          : null,
    });
    return copy;
  }

  getAllVisiblestuffofbetriebs(id: number, tp: number): Observable<BetriebVisibleProdsModel[]> {
    return this.http
      .get(this.resourceUrlVisibleprods + id + '/' + tp, { observe: 'response' })
      .pipe(map((res: HttpResponse<BetriebVisibleProdsModel[]>) => res.body));
  }

  getProdProdMitwirkPersonById(id: number) {
    return this.http.get(this.prodMitwirPersonUrl + '/' + id, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  createMitwirkendePerson(req: any): Observable<any> {
    return this.http.post(this.prodMitwirPersonUrl, req, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  putbetriebMitwirkendeBenutzerVerknupfung(prodId, betMitId, prodKunstId) {
    let data = null;
    return this.http
      .put(this.betriebMitwirkendeBenutzerVerknupfung + prodId + '/' + betMitId + '/' + prodKunstId, data, { observe: 'response' })
      .pipe(map((res: HttpResponse<BetMitwirkende>) => res.body));
  }

  putbetriebMitwirkendeBetriebVerknupfung(betMitId, prodKunstId) {
    let data = null;
    return this.http
      .put(this.betriebMitwirkendeBetriebVerknupfung + betMitId + '/' + prodKunstId, data, { observe: 'response' })
      .pipe(map((res: HttpResponse<BetMitwirkende>) => res.body));
  }
}
