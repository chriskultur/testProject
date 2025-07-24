import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AccountService} from 'app/core/auth/account.service';
import {Betrieb, Notes} from 'app/shared/models/betrieb.model';
import {Bp} from 'app/shared/models/bp.model';
import {BpBet} from 'app/shared/models/bpBet.model';
import {BpService} from 'app/shared/services/bp.service';
import {BpBetService} from 'app/shared/services/bpBet.service';
import {EmailTemplateService} from 'app/shared/services/emailTemplate.service';
import {prodHTTPService} from 'app/shared/services/production.business-logic.service';
import {ReplaySubject, Subject, Subscription} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {ElasticsearchService} from 'app/shared/services/elasticsearch.service';
import {AlleFavoriten} from 'app/shared/models/favorit_model';
import {FavoritService} from 'app/shared/services/favorit_service';
import {Liland} from 'app/shared/models/liland.model';
import {sortSuggestion} from 'app/shared/util/sort-util';
import {LilandService_bp} from 'app/shared/services/liland-bp.service';
import {Mitarbeiter} from 'app/shared/models/mitarbeiter.model';
import {MitarbeiterService} from 'app/shared/services/mitarbeiter.service';
import {SubscriptionNotiz} from 'app/shared/subscriptions/supscription.notiz';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FeedbackComponent implements OnInit, OnDestroy {
  closeResult: string;
  vornameAndName: { vorname: string; nachname: string } = { vorname: null, nachname: null };
  mail: string;
  txtmsg: string;
  subjectToClearInputValueSearchBet = new Subject<string>();
  subjectToClearInputValueSearchBetEdit = new Subject<string>();
  betnotes: Notes[] = [];
  mailFeedback: { type: string };
  position = 'bottom-right';
  shownotes: boolean = false;
  aktiveBetAllProduct = [];
  liland = [];
  selectedFilter = { beschreibung: 'All', count: 0, id: 0 };
  editBetreibsname = null;
  editNoteObject: Notes = new Notes();
  betriebsname: string = '';
  editnote: boolean = false;
  notemenu: boolean = false;
  public keyUp = new Subject<any>();
  displayAktiveBetProd: boolean = false;
  displayAktiveBetProdEdit: boolean = false;
  notes: Notes = new Notes(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false);
  mitarbeiter: Mitarbeiter[] = [new Mitarbeiter()];
  account: any;
  test: any;
  public queryStringForElasticSearch: Array<any> = [];
  public subscription: Subscription;
  public subscriptionEdit: Subscription;
  @Output() showToastyForFeedback: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateShowNotes: EventEmitter<any> = new EventEmitter<any>();
  @Input() aktiveUser;
  @Input() aktivBetrieb;
  @Input() subscriptionNotes;
  showNotes;
  subscriptionTemo;
  public searchString: string = null;
  searchStringEdit: string = null;
  isCollapsedBetriebsCalendar: boolean = false;
  isCollapsedBetriebsCalendarEdit: boolean = false;
  public productionSelected: boolean;
  public showResultList: boolean;
  public resultFound: any[] = [];
  public productionResultNotFound: boolean;
  public showResultListEdit: boolean;
  public resultFoundEdit: any[] = [];
  public productionResultNotFoundEdit: boolean;
  public resultLength: any;
  public ownProductionSelected: boolean;
  public ownProductionSelectedEdit: boolean;
  public displayProdSearchResult: boolean;
  public favoriteProdSpielList = [];
  @ViewChild('feedBackmodal') feedBackmodal: ElementRef;
  // const myModal = new Modal(element);
  public subscriptionNotesX: EventEmitter<any> = new EventEmitter();
  newBetCreatedForRecht: any;
  filtertags: { beschreibung: string; count: number; id: number }[] = [];
  public betFoundInCrowdList: any;
  displayProdSearchResultEdit: boolean;

  constructor(
    // private trackerServiceProd: TrackerService4,
    private favoritService: FavoritService,
    private es: ElasticsearchService,
    private mitarbeiterService: MitarbeiterService,
    private modalService: NgbModal,
    private emailTemplateService: EmailTemplateService,
    private betNoteService: prodHTTPService,
    private principal: AccountService,
    private bpService: BpService,
    private aktiv_betriebService: BpBetService,
    private prodHttpService: prodHTTPService,
    private landService: LilandService_bp,
    private subscriptionNoitz: SubscriptionNotiz
  ) {
    this.subscription = this.keyUp
      .pipe(
        map(event => {
          return event.target.value;
        }),
        debounceTime(700)
      )
      .subscribe(x => {
        this.displayAktiveBetProd = false;
        this.searchWithInputField(x, 'prod');
      });
    this.subscriptionEdit = this.keyUp
      .pipe(
        map(event => {
          return event.target.value;
        }),
        debounceTime(700)
      )
      .subscribe(x => {
        this.displayAktiveBetProdEdit = false;
        this.searchWithInputFieldEdit(x, 'prod');
      });
    // if (this.subscriptionNoitz.subscriptionNotes) {
    //   this.subscriptionNoitz.subscriptionNotes.unsubscribe();
    // }
    console.log("notiz subscription created");
    // this.subscriptionNoitz.subscriptionNotes = new ReplaySubject<any>();
    // this.subscriptionNotesX.subscribe(temp => {
    //   console.log('opening: ', temp);
    //   this.openNotesExternal(temp);
    //   this.refreschDataExternal(temp);
    //   // this.open(this.feedBackmodal);
    // });

    this.subscriptionNoitz.subscriptionNotes.subscribe(temp => {
      console.log('opening: ', temp);
      this.openNotesExternal(temp);
      this.refreschDataExternal(temp);
      // this.open(this.feedBackmodal);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.principal.identity().subscribe(account => {
      this.account = account;
      this.bpService.find().subscribe((bp: Bp) => {
        this.test = bp;
        this.aktiv_betriebService
          .query({
            bpsId: bp.id,
          })
          .subscribe((response: BpBet[]) => {
            if (response.length != 0) {
              this.aktivBetrieb = response[0];
              // this.trackerServiceProd.receive().subscribe((object: any) => {
              //   if (object == 'notiz') {
              //     this.filtertags = [];
              //     this.betNoteService
              //       .getBetriebNotes(this.aktivBetrieb.betriebsId, {
              //         betriebId: this.aktivBetrieb.betriebsId,
              //       })
              //       .subscribe((notes: Notes[]) => {
              //         this.loadingnotiz(notes);
              //       });
              //   }
              // });
              this.notes.betriebId = this.aktivBetrieb.betriebsId;
              this.getAllProdGroupData();
              this.getAllSpeilGroupData();
              this.getAllWerkGroupData();
              this.loadMitarbeiterInfo(this.aktivBetrieb.betriebsId);
              this.landService.query().subscribe((land: Liland[]) => {
                this.liland = sortSuggestion(land);
              });
              this.betNoteService
                .getBetriebNotes(this.aktivBetrieb.betriebsId, {
                  betriebId: this.aktivBetrieb.betriebsId,
                })
                .subscribe((notes: Notes[]) => {
                  this.loadingnotiz(notes);
                });
            }
          });
      });
    });
  }

  loadingnotiz(notes) {
    this.betnotes = notes;
    this.filtertags = [];
    this.betnotes.forEach((note: Notes) => {
      note.hide = false;
      if (note.partnerBetriebsname != null) {
        let filterBetrieb = this.filtertags.filter(tag => tag.id == note.partnerBetriebId);
        if (filterBetrieb.length == 0) {
          this.filtertags.push({ beschreibung: note.partnerBetriebsname, count: 1, id: note.partnerBetriebId });
        } else {
          let index = this.filtertags.findIndex(tag => tag.id == note.partnerBetriebId);
          this.filtertags[index].count++;
        }
      }
      if (note.produktname != null) {
        if (note.prodProdId != null) {
          let filterProdukt = this.filtertags.filter(tag => tag.id == note.prodProdId);
          if (filterProdukt.length == 0) {
            this.filtertags.push({ beschreibung: note.produktname, count: 1, id: note.prodProdId });
          } else {
            let index = this.filtertags.findIndex(tag => tag.id == note.prodProdId);
            this.filtertags[index].count++;
          }
        } else if (note.prodWerkId != null) {
          let filterwerk = this.filtertags.filter(tag => tag.id == note.prodWerkId);
          if (filterwerk.length == 0) {
            this.filtertags.push({ beschreibung: note.produktname, count: 1, id: note.prodWerkId });
          } else {
            let index = this.filtertags.findIndex(tag => tag.id == note.prodWerkId);
            this.filtertags[index].count++;
          }
        } else if (note.prodSpielId != null) {
          let filterspiel = this.filtertags.filter(tag => tag.id == note.prodSpielId);
          if (filterspiel.length == 0) {
            this.filtertags.push({ beschreibung: note.produktname, count: 1, id: note.prodSpielId });
          } else {
            let index = this.filtertags.findIndex(tag => tag.id == note.prodSpielId);
            this.filtertags[index].count++;
          }
        }
      }
      if (note.mitarbeiterName != null) {
        let filterMitarbeiter = this.filtertags.filter(tag => tag.id == note.mitarbeiterId);
        if (filterMitarbeiter.length == 0) {
          this.filtertags.push({ beschreibung: note.mitarbeiterName, count: 1, id: note.mitarbeiterId });
        } else {
          let index = this.filtertags.findIndex(tag => tag.id == note.mitarbeiterId);
          this.filtertags[index].count++;
        }
      }
    });
    this.betnotes.sort((a, b) => +new Date(b.datum) - +new Date(a.datum));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionEdit.unsubscribe();
  }

  open(content) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  getAllProdGroupData() {
    this.aktiveBetAllProduct =[];
    const object = {
      api_type: 'menu',
      betrieb_id: this.aktivBetrieb.betriebsId,
      produktion_id: null,
      warengruppe_gruppe_id: 2,
    };
    this.prodHttpService.getAngebotMenuListForAnge(object).subscribe(mainObject => {
      this.aktiveBetAllProduct = this.aktiveBetAllProduct.concat(mainObject);

      this.aktiveBetAllProduct.sort((a, b) => parseFloat(a.produkt_id) - parseFloat(b.produkt_id));
    });
  }

  getAllSpeilGroupData() {
    let objectSpiel = {
      api_type: 'menu',
      betrieb_id: this.aktivBetrieb.betriebsId,
      produktion_id: null,
      warengruppe_gruppe_id: 0,
    };
    this.prodHttpService.getAngebotMenuListForAnge(objectSpiel).subscribe(spielGroup => {
      this.aktiveBetAllProduct = this.aktiveBetAllProduct.concat(spielGroup);
    });
  }

  refreschData(temp?) {
    this.aktiv_betriebService
      .query({
        bpsId: this.test.id,
      })
      .subscribe((response: BpBet[]) => {
        if (response.length != 0) {
          this.aktivBetrieb = response[0];
          this.betNoteService
            .getBetriebNotes(this.aktivBetrieb.betriebsId, {
              betriebId: this.aktivBetrieb.betriebsId,
            })
            .subscribe((notes: Notes[]) => {
              this.loadingnotiz(notes);
              if (temp != undefined || temp != 'nothing') {
                if (temp != 'nothing') {
                  let filter = this.filtertags.filter(objekt => objekt.beschreibung == temp);
                  if (filter.length != 0) {
                    this.selectedFilter = filter[0];
                    this.betnotes.forEach(value => {
                      if (value.produktname == temp || value.partnerBetriebsname == temp || value.mitarbeiterName == temp) {
                        value.hide = false;
                      } else {
                        value.hide = true;
                      }
                    });
                  } else {
                    this.selectedFilter = { beschreibung: 'All', count: 0 ,id:0};
                    this.betnotes.forEach(value => (value.hide = false));
                  }
                }
              }
              this.betnotes.sort((a, b) => +new Date(b.datum) - +new Date(a.datum));
            });
          this.loadMitarbeiterInfo(this.aktivBetrieb.betriebsId);
        }
      });
  }

  refreschDataExternal(temp?) {
    console.log("refreshing");
    this.aktiv_betriebService
      .query({
        bpsId: temp.bpId,
      })
      .subscribe((response: BpBet[]) => {
        if (response.length != 0) {
          this.aktivBetrieb = response[0];
          this.betNoteService
            .getBetriebNotes(temp.id, {
              betriebId: temp.id,
            })
            .subscribe((notes: Notes[]) => {
              this.loadingnotiz(notes);
              if (temp != undefined || temp != 'nothing') {
                if (temp != 'nothing') {
                  let filter = this.filtertags.filter(objekt => objekt.beschreibung == temp);
                  if (filter.length != 0) {
                    this.selectedFilter = filter[0];
                    this.betnotes.forEach(value => {
                      if (value.produktname == temp.name || value.partnerBetriebsname == temp.name || value.mitarbeiterName == temp.name) {
                        value.hide = false;
                      } else {
                        value.hide = true;
                      }
                    });
                  } else {
                    this.selectedFilter = { beschreibung: 'All', count: 0 ,id:0};
                    this.betnotes.forEach(value => (value.hide = false));
                  }
                }
              }
              this.betnotes.sort((a, b) => +new Date(b.datum) - +new Date(a.datum));
            });
          this.loadMitarbeiterInfo(temp.id);
        }
      });
  }


  produktAndern(data, type, fromWhere) {
    this.productionSelected = true;
    this.showResultList = false;
    this.displayAktiveBetProd = false;
    if (fromWhere == 'fav') {
      if (data.favorit_art == 2) {
        this.notes.prodProdId = data.favorit_objekt_id;
        this.notes.prodWerkId = null;
        this.notes.prodSpielId = null;
      } else if (data.favorit_art == 1) {
        this.notes.prodWerkId = data.favorit_objekt_id;
        this.notes.prodProdId = null;
        this.notes.prodSpielId = null;
      } else if (data.favorit_art == 0) {
        this.notes.prodSpielId = data.favorit_objekt_id;
        this.notes.prodProdId = null;
        this.notes.prodWerkId = null;
      }
      this.searchString = data.favorit_objekt_bezeichnung;
    } else if (fromWhere == 'own') {
      if (data.produktion_type == 2) {
        this.notes.prodProdId = data.produkt_id;
        this.notes.prodWerkId = null;
        this.notes.prodSpielId = null;
        if (data.angebotsbezeichnung == null) {
          this.searchString = data.produkt_name;
        } else {
          this.searchString = data.produkt_name + ' (' + data.angebotsbezeichnung + ')';
        }
      } else if (data.produktion_type == 1) {
        this.notes.prodWerkId = data.produkt_id;
        this.notes.prodProdId = null;
        this.notes.prodSpielId = null;
        this.searchString = data.produkt_name;
      } else if (data.produktion_type == 0) {
        this.notes.prodSpielId = data.produkt_id;
        this.notes.prodProdId = null;
        this.notes.prodWerkId = null;
        if (data.angebotsbezeichnung == null) {
          this.searchString = data.produkt_name;
        } else {
          this.searchString = data.produkt_name + ' (' + data.angebotsbezeichnung + ')';
        }
      }
    } else if (fromWhere == 'elastic') {
      if (type == 'prod') {
        this.notes.prodProdId = data.id;
        this.notes.prodWerkId = null;
        this.notes.prodSpielId = null;
        if (data.interne_bezeichnung_der_produkts == null) {
          this.searchString = data.prodWerkSearchTeilDTO.titel;
        } else {
          this.searchString = data.prodWerkSearchTeilDTO.titel + ' (' + data.interne_bezeichnung_der_produkts + ')';
        }
      } else if (type == 'spiel') {
        this.notes.prodSpielId = data.id;
        this.notes.prodWerkId = null;
        this.notes.prodProdId = null;
        this.searchString = data.interne_bezeichnung_der_produkts;
      } else if (type == 'werk') {
        this.notes.prodWerkId = data.id;
        this.notes.prodProdId = null;
        this.notes.prodSpielId = null;
        this.searchString = data.titel;
      }
    }
  }

  produktAndernEditModal(data, type, fromWhere) {
    this.ownProductionSelectedEdit = true;
    this.showResultListEdit = false;
    this.displayAktiveBetProdEdit = false;
    if (fromWhere == 'fav') {
      if (data.favorit_art == 2) {
        this.editNoteObject.prodProdId = data.favorit_objekt_id;
        this.editNoteObject.prodWerkId = null;
        this.editNoteObject.prodSpielId = null;
      } else if (data.favorit_art == 1) {
        this.editNoteObject.prodWerkId = data.favorit_objekt_id;
        this.editNoteObject.prodProdId = null;
        this.editNoteObject.prodSpielId = null;
      } else if (data.favorit_art == 0) {
        this.editNoteObject.prodSpielId = data.favorit_objekt_id;
        this.editNoteObject.prodProdId = null;
        this.editNoteObject.prodWerkId = null;
      }
      this.searchStringEdit = data.favorit_objekt_bezeichnung;
    } else if (fromWhere == 'own') {
      if (data.produktion_type == 2) {
        this.editNoteObject.prodProdId = data.produkt_id;
        this.editNoteObject.prodWerkId = null;
        this.editNoteObject.prodSpielId = null;
        if (data.angebotsbezeichnung == null) {
          this.searchStringEdit = data.produkt_name;
        } else {
          this.searchStringEdit = data.produkt_name + ' (' + data.angebotsbezeichnung + ')';
        }
      } else if (data.produktion_type == 1) {
        this.editNoteObject.prodWerkId = data.produkt_id;
        this.editNoteObject.prodProdId = null;
        this.editNoteObject.prodSpielId = null;
        this.searchStringEdit = data.produkt_name;
      } else if (data.produktion_type == 0) {
        this.editNoteObject.prodSpielId = data.produkt_id;
        this.editNoteObject.prodProdId = null;
        this.editNoteObject.prodWerkId = null;
        if (data.angebotsbezeichnung == null) {
          this.searchStringEdit = data.produkt_name;
        } else {
          this.searchStringEdit = data.produkt_name + ' (' + data.angebotsbezeichnung + ')';
        }
      }
    } else if (fromWhere == 'elastic') {
      if (type == 'prod') {
        this.editNoteObject.prodProdId = data.id;
        this.editNoteObject.prodWerkId = null;
        this.editNoteObject.prodSpielId = null;
        if (data.interne_bezeichnung_der_produkts == null) {
          this.searchStringEdit = data.prodWerkSearchTeilDTO.titel;
        } else {
          this.searchStringEdit = data.prodWerkSearchTeilDTO.titel + ' (' + data.interne_bezeichnung_der_produkts + ')';
        }
      } else if (type == 'spiel') {
        this.editNoteObject.prodSpielId = data.id;
        this.editNoteObject.prodWerkId = null;
        this.editNoteObject.prodProdId = null;
        this.searchStringEdit = data.interne_bezeichnung_der_produkts;
      } else if (type == 'werk') {
        this.editNoteObject.prodWerkId = data.id;
        this.editNoteObject.prodProdId = null;
        this.editNoteObject.prodSpielId = null;
        this.searchStringEdit = data.titel;
      }
    }
  }

  searchWithInputFieldEdit(searchString, tp) {
    let stringList: Array<string> = searchString
      .replace(/["&/(){}[]/gi, '')
      .trim()
      .split(' ');
    if (stringList.length != 0) {
      this.queryStringForElasticSearch = this.queryStringForElasticSearch.filter(item => !item.hasOwnProperty('query_string'));

      for (let string of stringList) {
        if (string != '') {
          let keyWildcard = string + '*';
          let matchobjTemp = { query_string: {} };
          matchobjTemp.query_string['query'] = keyWildcard;
          matchobjTemp.query_string['fields'] = [
            'betriebsname',
            'prodWerkSearchTeilDTO.titel',
            'interne_bezeichnung_der_produkts',
            'spielSearchDTO.spielAdresseSearchDTOList.poststadt',
            'prodWerkSearchTeilDTO.prodWerkUnterDTOList.bezeichnung',
            'prodProdUnterDTOList.bezeichnung',
          ];
          this.queryStringForElasticSearch.push(matchobjTemp);
        }
      }

      if (this.queryStringForElasticSearch.length != 0) {
        this.resultFoundEdit = [];
        this.searchEdit(this.queryStringForElasticSearch, 'prod,spiel,werk');
      } else {
        this.resultFoundEdit = [];
      }
    }
    if (searchString == '' || searchString == null) {
      this.searchStringEdit = null;
      this.editNoteObject.prodProdId = null;
      this.editNoteObject.prodSpielId = null;
      this.editNoteObject.prodWerkId = null;
    }
  }

  searchEdit(queryString, tp) {
    this.productionResultNotFound = false;
    this.productionSelected = false;

    this.es.fullTextSearchFilter(tp, '', '', queryString).subscribe(
      response => {
        let res: any = response;
        this.resultLength = res.hits.total.value;
        if (res.hits.hits.length != 0) {
          res.hits.hits.forEach(item => this.resultFoundEdit.push(item));
          this.showResultListEdit = true;
          if (tp == 'prod,spiel' || tp == 'prod,spiel,werk') {
            this.displayProdSearchResultEdit = true;
          } else if (tp == 'spiel') {
            this.displayProdSearchResultEdit = false;
          }
        }
      },
      error => {}
    );
  }

  searchWithInputField(searchString, tp) {
    let stringList: Array<string> = searchString
      .replace(/["&/(){}[]/gi, '')
      .trim()
      .split(' ');
    if (stringList.length != 0) {
      this.queryStringForElasticSearch = this.queryStringForElasticSearch.filter(item => !item.hasOwnProperty('query_string'));

      for (let string of stringList) {
        if (string != '') {
          let keyWildcard = string + '*';
          let matchobjTemp = { query_string: {} };
          matchobjTemp.query_string['query'] = keyWildcard;
          matchobjTemp.query_string['fields'] = [
            'betriebsname',
            'prodWerkSearchTeilDTO.titel',
            'interne_bezeichnung_der_produkts',
            'spielSearchDTO.spielAdresseSearchDTOList.poststadt',
            'prodWerkSearchTeilDTO.prodWerkUnterDTOList.bezeichnung',
            'prodProdUnterDTOList.bezeichnung',
          ];
          this.queryStringForElasticSearch.push(matchobjTemp);
        }
      }

      if (this.queryStringForElasticSearch.length != 0) {
        this.resultFound = [];
        this.search(this.queryStringForElasticSearch, 'prod,spiel,werk');
      } else {
        this.resultFound = [];
      }
    }
    if (searchString == '' || searchString == null) {
      this.searchString = null;
      this.notes.prodProdId = null;
      this.notes.prodSpielId = null;
      this.notes.prodWerkId = null;
    }
  }

  search(queryString, tp) {
    this.productionResultNotFound = false;
    this.productionSelected = false;

    this.es.fullTextSearchFilter(tp, '', '', queryString).subscribe(
      response => {
        let res: any = response;
        this.resultLength = res.hits.total.value;
        if (res.hits.hits.length != 0) {
          res.hits.hits.forEach(item => this.resultFound.push(item));
          this.showResultList = true;
          if (tp == 'prod,spiel' || tp == 'prod,spiel,werk') {
            this.displayProdSearchResult = true;
          } else if (tp == 'spiel') {
            this.displayProdSearchResult = false;
          }
        } else {
          this.productionResultNotFound = true;
          this.ownProductionSelected = false;

          // // if prod not found than check : does impressum bet has such prod or not
          // this.checkImpressumBetProductionExist();
        }
      },
      error => {}
    );
  }

  filterWithTag(item) {
    this.selectedFilter = item;
    if (item.beschreibung != 'All') {
      this.betnotes.forEach(value => {
        if (
          value.prodProdId == item.id ||
          value.prodSpielId == item.id ||
          value.prodWerkId == item.id ||
          value.partnerBetriebId == item.id ||
          value.mitarbeiterId == item.id
        ) {
          value.hide = false;
        } else {
          value.hide = true;
        }
      });
    } else {
      this.betnotes.forEach(value => (value.hide = false));
    }
  }

  getAllFavoriten() {
    this.favoritService.find_alle_favorit(this.test.id).subscribe((favoriten: AlleFavoriten[]) => {
      this.favoriteProdSpielList = favoriten;
    });
  }

  getAllWerkGroupData() {
    let objectWerk = {
      api_type: 'menu',
      betrieb_id: this.aktivBetrieb.betriebsId,
      produktion_id: null,
      warengruppe_gruppe_id: 1,
    };
    this.prodHttpService.getAngebotMenuListForAnge(objectWerk).subscribe(werkGroup => {
      this.aktiveBetAllProduct = this.aktiveBetAllProduct.concat(werkGroup);
    });
  }

  openNotes() {
    this.shownotes = !this.shownotes;
    this.notes = new Notes(
      null,
      null,
      this.aktivBetrieb.betriebsId,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      false
    );
    this.searchString = null;
    this.displayAktiveBetProd = false;
    this.resultFound = [];
    this.getAllProdGroupData();
    this.getAllSpeilGroupData();
    this.getAllWerkGroupData();
    this.subjectToClearInputValueSearchBet.next('TEST');
    this.updateShowNotes.emit(this.shownotes);
  }

  openNotesExternal(temp) {
    console.log("openning");
    this.shownotes = true;
    this.notes = new Notes(
      null,
      null,
      temp.id,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      false
    );
    this.searchString = null;
    this.displayAktiveBetProd = false;
    this.resultFound = [];
    this.getAllProdGroupData();
    this.getAllSpeilGroupData();
    this.getAllWerkGroupData();
    this.subjectToClearInputValueSearchBet.next('TEST');
    this.updateShowNotes.emit(this.shownotes);
  }

  sendShowNotes() {
    this.updateShowNotes.emit(this.shownotes);
  }


  editNotes() {
    this.editnote = !this.editnote;
  }

  showNoteMenu() {
    this.notemenu = !this.notemenu;
  }

  onQuill(html: any) {
    this.notes.beschreibung = html;
  }

  onQuillEdit(html: any) {
    this.editNoteObject.beschreibung = html;
  }

  updatenotes() {
    this.betNoteService.updateBetriebNotes(this.editNoteObject).subscribe((note: Notes) => {
      // let index = this.betnotes.findIndex(tempnote => note.id == tempnote.id);
      //
      // if (index != -1) {
      //   if (
      //     this.selectedFilter.beschreibung == note.partnerBetriebsname ||
      //     this.selectedFilter.beschreibung == note.produktname ||
      //     this.selectedFilter.beschreibung == 'All'
      //   ) {
      //     note.hide = false;
      //   } else {
      //     note.hide = true;
      //   }
      //   let indexbetrieb = this.filtertags.findIndex(tag => tag.id == note.partnerBetriebId);
      //   if (indexbetrieb != -1) {
      //     if (this.filtertags[indexbetrieb].count == 1) {
      //       this.filtertags.splice(indexbetrieb, 1);
      //     } else {
      //       this.filtertags[indexbetrieb].count--;
      //     }
      //   }
      //   let indexproduktname = this.filtertags.findIndex(tag => {
      //     return tag.id == note.prodWerkId || tag.id == note.prodProdId || tag.id == note.prodSpielId
      //   });
      //   if (indexproduktname != -1) {
      //     if (this.filtertags[indexproduktname].count == 1) {
      //       this.filtertags.splice(indexproduktname, 1);
      //     } else {
      //       this.filtertags[indexproduktname].count--;
      //     }
      //   }
      //   if (note.partnerBetriebsname != null) {
      //     let filterBetrieb = this.filtertags.filter(tag => tag.id == note.partnerBetriebId);
      //     if (filterBetrieb.length == 0) {
      //       this.filtertags.push({beschreibung: note.partnerBetriebsname, count: 1, id: note.partnerBetriebId});
      //     } else {
      //       let index = this.filtertags.findIndex(tag => tag.id == note.partnerBetriebId);
      //       this.filtertags[index].count++;
      //     }
      //   }
      //   if (note.produktname != null) {
      //     let filterProdukt = this.filtertags.filter(tag => {
      //       return tag.id == note.prodWerkId || tag.id == note.prodProdId || tag.id == note.prodSpielId
      //     });
      //     if (filterProdukt.length == 0) {
      //       let id = null;
      //       if (note.prodSpielId != null) {
      //         id = note.prodSpielId;
      //       } else if (note.prodProdId != null) {
      //         id = note.prodProdId;
      //       } else {
      //         id = note.prodSpielId;
      //       }
      //       this.filtertags.push({beschreibung: note.produktname, count: 1, id: id});
      //     } else {
      //       let index = this.filtertags.findIndex(tag => {
      //         return tag.id == note.prodWerkId || tag.id == note.prodProdId || tag.id == note.prodSpielId
      //       });
      //       this.filtertags[index].count++;
      //     }
      //   }
      //   this.betnotes[index] = note;
      //   this.betnotes.sort((a, b) => +new Date(b.datum) - +new Date(a.datum));
      // }
      this.subjectToClearInputValueSearchBetEdit.next('TEST');
      this.searchStringEdit = null;
      this.editBetreibsname = null;
      this.editNoteObject = new Notes(
        null,
        null,
        this.aktivBetrieb.betriebsId,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        false
      );
      this.refreschData();
    });
  }

  produktRemove() {
    this.searchString = null;
    this.notes.prodSpielId = null;
    this.notes.prodWerkId = null;
    this.notes.prodProdId = null;
  }

  betriebRemove(event) {
    this.displayAktiveBetProd = false;
    this.notes.partnerBetriebId = null;
  }

  betriebRemoveEdit(event) {
    this.displayAktiveBetProd = false;
    this.editNoteObject.partnerBetriebId = null;
  }

  produktRemoveEdit() {
    this.searchStringEdit = null;
    this.editNoteObject.prodSpielId = null;
    this.editNoteObject.prodWerkId = null;
    this.editNoteObject.prodProdId = null;
  }

  saveNotes() {
    this.betNoteService.createBetriebNotes(this.notes, this.aktivBetrieb.betriebsId).subscribe((note: Notes) => {
      if (
        this.selectedFilter.beschreibung == note.partnerBetriebsname ||
        this.selectedFilter.beschreibung == note.produktname ||
        this.selectedFilter.beschreibung == 'All'
      ) {
        note.hide = false;
      } else {
        note.hide = true;
      }
      this.betnotes.push(note);
      // if (note.partnerBetriebsname != null) {
      //   let filterBetrieb = this.filtertags.filter(tag => tag.beschreibung == note.partnerBetriebsname);
      //   if (filterBetrieb.length == 0) {
      //     this.filtertags.push({ beschreibung: note.partnerBetriebsname, count: 1 });
      //   } else {
      //     let index = this.filtertags.findIndex(tag => tag.beschreibung == note.partnerBetriebsname);
      //     this.filtertags[index].count++;
      //   }
      // }
      // if (note.produktname != null) {
      //   let filterProdukt = this.filtertags.filter(tag => tag.beschreibung == note.produktname);
      //   if (filterProdukt.length == 0) {
      //     this.filtertags.push({ beschreibung: note.produktname, count: 1 });
      //   } else {
      //     let index = this.filtertags.findIndex(tag => tag.beschreibung == note.produktname);
      //     this.filtertags[index].count++;
      //   }
      // }
      this.betnotes.sort((a, b) => +new Date(b.datum) - +new Date(a.datum));
      this.searchString = null;
      this.subjectToClearInputValueSearchBet.next('TEST');
      this.notes = new Notes(
        null,
        null,
        this.aktivBetrieb.betriebsId,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        false
      );
      this.refreschData();
    });
  }

  deleteNotes(id, index) {
    this.betNoteService.deleteBetriebNotes(id).subscribe((noterrr: Notes) => {
      let note: Notes = this.betnotes[index];
      // let indexbetrieb = this.filtertags.findIndex(tag => tag.id == note.partnerBetriebId);
      //
      // if (indexbetrieb != -1) {
      //   if (this.filtertags[indexbetrieb].count == 1) {
      //     this.filtertags.splice(indexbetrieb, 1);
      //   } else {
      //     this.filtertags[indexbetrieb].count--;
      //   }
      // }
      // let indexproduktname = this.filtertags.findIndex(tag => {
      //   return tag.id == note.prodWerkId || tag.id == note.prodProdId || tag.id == note.prodSpielId
      // });
      // if (indexproduktname != -1) {
      //   if (this.filtertags[indexproduktname].count == 1) {
      //     this.filtertags.splice(indexproduktname, 1);
      //   } else {
      //     this.filtertags[indexproduktname].count--;
      //   }
      // }
      this.betnotes.splice(index, 1);
      this.refreschData();
    });
  }

  sendMail() {
    this.mailFeedback = { type: 'kontakt' };
    this.emailTemplateService.sendMail(this.aktiveUser, this.aktiveUser.email, null, this.txtmsg, null, 'null', 'kontakt');
    this.txtmsg = null;
    // this.showToastyForFeedback.emit("email sent");
  }

  resultnotFound(event) {}

  // addToast(options) {
  //     this.position = options.position ? options.position : this.position;
  //     const toastOptions: ToastOptions = {
  //         title: options.title,
  //         msg: options.msg,
  //         showClose: null,
  //         timeout: options.timeout,
  //         theme: options.theme,
  //         onAdd: (toast: ToastData) => {
  //             /* added */
  //         },
  //         onRemove: (toast: ToastData) => {
  //             /* removed */
  //         }
  //     };
  //     this.toastyService.success(toastOptions);
  //
  // }
  resultNotFoundInCrowd(event: any) {
    this.betFoundInCrowdList = event.val;
  }

  inputStringEditReset(event: any) {
    if (event == '' || event == null) {
      this.editBetreibsname = null;
      this.editNoteObject.partnerBetriebId = null;
      this.subjectToClearInputValueSearchBetEdit.next('TEST');
    }
  }

  inputStringReset(event: any) {
    if (event == '' || event == null) {
      this.betriebsname = null;
      this.notes.partnerBetriebId = null;
      this.subjectToClearInputValueSearchBet.next('TEST');
    }
  }

  loadEditNoteObject(note: Notes) {
    this.editNoteObject = Object.assign(this.editNoteObject, note);
    this.searchStringEdit = note.produktname;
    this.editBetreibsname = note.partnerBetriebsname;
  }

  closeEditObject() {
    this.editNoteObject = new Notes();
    this.editnote = false;
  }

  hideResultBox(value, fromWhere, index) {
    this.notes.partnerBetriebId = null;
  }

  selectedItemBetrieb(something: Betrieb) {
    /*need to empty old selected company list if selected */
    this.notes.partnerBetriebId = something.id;
  }

  selectedItemEditBetrieb(something: Betrieb) {
    /*need to empty old selected company list if selected */
    this.editNoteObject.partnerBetriebId = something.id;
  }

  selectMitarbeiter(event) {
    this.notes.mitarbeiterId = event.id;
  }

  loadMitarbeiterInfo(id) {
    this.mitarbeiterService.queryCrowd({ betriebId: id }).subscribe((mitarbeiter: Mitarbeiter[]) => {
      let body: Mitarbeiter[] = mitarbeiter;
      this.mitarbeiter = body.map((mitarbeiter: Mitarbeiter) => {
        return mitarbeiter;
      });
    });
  }
}
