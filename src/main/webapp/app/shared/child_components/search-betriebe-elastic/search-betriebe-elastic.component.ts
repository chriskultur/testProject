import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {Liland} from 'app/shared/models/liland.model';
import {ElasticsearchService} from 'app/shared/services/elasticsearch.service';
import {BetriebService} from 'app/shared/services/betrieb.service';

@Component({
  selector: 'app-search-betriebe-elastic',
  templateUrl: './search-betriebe-elastic.component.html',
  styleUrls: ['search-betriebe-elastic.component.scss'],
})
export class SearchBetriebeElasticComponent implements OnInit, OnDestroy, OnChanges {
  public searchStringBetSuch: string = null;
  public queryStringForElasticSearch: Array<any> = [];
  public resultLength = null;
  public resultFound: Array<any> = [];
  public showResultList: boolean = false;
  public foundInCrowd: boolean = false;
  public searchStringHasMatchInResult: boolean = false;
  @Input() liland: Array<Liland>;
  @Input() requiredValidator: boolean;
  @Input() newBetCreatedChangeClassOFInput: any;
  @Input() displayExtraOption: any;
  // once the betrieb is selected, with the help of this observable you can clear search string writen in the input field
  @Input() notifier: Subject<any>;
  @Input() includeKunstler: boolean;
  @Input() searchStringForDisplay: string = null;
  @Input() displayAktivBet: boolean;
  @Input() AktivBetId: number;
  @Input() classCheck: boolean;
  @Output() checkPanelOpen: EventEmitter<any> = new EventEmitter<any>();
  @Output() clearField: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedBetriebe: EventEmitter<any> = new EventEmitter<any>();
  @Output() blurInput: EventEmitter<any> = new EventEmitter<any>();
  @Output() notFound: EventEmitter<any> = new EventEmitter<any>();
  @Output() inputString: EventEmitter<any> = new EventEmitter<any>();
  // if betrieb not found in elasticsearch, but found in database with pending status or impressum status
  @Output() betriebFoundInCrowd: EventEmitter<any> = new EventEmitter<any>();

  private subscription: Subscription;
  public keyUp = new Subject<any>();

  constructor(private es: ElasticsearchService, private betriebService: BetriebService) {
    this.subscription = this.keyUp
      .pipe(
        map(event => event.target.value),
        debounceTime(700)
      )
      .subscribe(x => this.searchWithInputField(x));
  }

  ngOnInit(): void {
    this.searchStringBetSuch = this.searchStringForDisplay;
    if (this.notifier != null) {
      this.notifier.subscribe(event => {
        this.searchStringBetSuch = null;
      });
    }
  }

  ngOnChanges(): void {
    this.searchStringBetSuch = this.searchStringForDisplay;
    if (this.notifier != null) {
      this.notifier.subscribe(event => {
        this.searchStringBetSuch = null;
      });
    }
  }

  clearSearchValue() {
    this.searchStringBetSuch = null;
  }

  clearSearchValueAndSendNotifyBack() {
    this.searchStringBetSuch = null;
    this.showResultList = false;
    this.clearField.emit(true);
  }

  search(queryString) {
    this.newBetCreatedChangeClassOFInput = null;
    this.searchStringHasMatchInResult = false;
    this.es.fullTextSearchFilterKB('kunst', 'betrieb', '', '', queryString, this.includeKunstler).subscribe(
      response => {
        let res: any = response;
        this.resultLength = res.hits.total.value;
        if (res.hits.hits.length != 0) {
          this.checkPanelOpen.emit(true);
          res.hits.hits.forEach(item => {
            this.resultFound.push(item);
            if (item._index == 'kunst') {
              if (item._source.hasOwnProperty('kunstlername')) {
                if (item._source.kunstlername.toLowerCase().trim() == this.searchStringBetSuch.toLowerCase().trim()) {
                  this.searchStringHasMatchInResult = true;
                }
              }
              if (
                item._source.vorname.toLowerCase().trim() + ' ' + item._source.name.toLowerCase().trim() ==
                this.searchStringBetSuch.toLowerCase().trim()
              ) {
                this.searchStringHasMatchInResult = true;
              }
            } else if (item._index == 'betrieb') {
              if (item._source.betriebsname.toLowerCase().trim() == this.searchStringBetSuch.toLowerCase().trim()) {
                this.searchStringHasMatchInResult = true;
              }
            }
          });
          this.showResultList = true;
        } else {
          this.checkPanelOpen.emit(false);

          this.notFound.emit({ notFound: true, searchString: this.searchStringBetSuch });
          this.betriebService.searchdynamicExcatName(this.searchStringBetSuch).subscribe(res => {
            if (res.length != 0) {
              this.foundInCrowd = true;
              this.betriebFoundInCrowd.emit({ val: true, bet: res[0] });
            } else {
              this.foundInCrowd = false;
              this.betriebFoundInCrowd.emit({ val: false, bet: null });
            }
          });
        }
      },
      error => {}
    );
  }
  clearSearchString() {
    this.searchStringBetSuch = '';
  }

  displayOtherOptionToCreateBet() {
    this.notFound.emit({ notFound: true, searchString: this.searchStringBetSuch });
    this.resultFound = [];
  }

  searchWithInputField(searchString) {
    this.blurInput.emit(searchString);
    let stringList: Array<string> = searchString
      .replace(/["&/(){}[]/gi, '')
      .trim()
      .split(' ');

    if (stringList.length != 0) {
      this.queryStringForElasticSearch = this.queryStringForElasticSearch.filter(item => !item.hasOwnProperty('query_string'));

      for (let string of stringList) {
        if (string != '') {
          let keyWildcard = '*' + string + '*';
          let matchobjTemp = { query_string: {} };
          matchobjTemp.query_string['query'] = keyWildcard;
          matchobjTemp.query_string['fields'] = [
            'betriebsname',
            'prodWerkSearchTeilDTO.titel',
            'beschreibung',
            'titel',
            'vorname',
            'nachname',
            'interne_bezeichnung_der_produkts',
            'betriebAdresseSearchDTO.poststadt',
            'betriebAdresseSearchDTO.liste_lands_bezeichnung',
            'betriebAdresseSearchDTO.liste_land_glieds_bezeichnung',
            'kunstlername',
            'name',
          ];
          this.queryStringForElasticSearch.push(matchobjTemp);
        }
      }

      if (this.queryStringForElasticSearch.length != 0) {
        this.resultFound = [];
        this.search(this.queryStringForElasticSearch);
      } else {
        this.resultFound = [];
      }
      this.inputString.emit(searchString);
    }
  }

  clearSearchVal(event) {
    if (event.hasOwnProperty('betriebId')) {
      if (event.hasOwnProperty('kunstlername')) {
        if (event.kunstlername != null && event.kunstlername != '') {
          this.searchStringBetSuch = event.kunstlername + ' (' + event.vorname + ' ' + event.name + ')';
        } else {
          this.searchStringBetSuch = event.vorname + ' ' + event.name;
        }
      } else {
        this.searchStringBetSuch = event.vorname + ' ' + event.name;
      }
    } else {
      this.searchStringBetSuch = event.betriebsname;
    }
    if (event.hasOwnProperty('betriebId')) {
      this.betriebService.findCrowd(event.betriebId).subscribe(bet => {
        this.selectedBetriebe.emit(bet);
      });
    } else {
      this.betriebService.findCrowd(event.id).subscribe(bet => {
        this.selectedBetriebe.emit(bet);
      });
    }
    this.newBetCreatedChangeClassOFInput = event.id;
    this.showResultList = false;
  }

  trackByIndex(i: number) {
    return i;
  }

  getImageOfLand(land: string) {
    let temp = this.liland.filter(value => value.bezeichnung == land)[0];
    if (temp != undefined) {
      let imageString = 'data:' + temp.flaggeContentType + ';base64,' + temp.flagge;
      return imageString;
    } else {
      return null;
    }
  }

  createCompanyWithDiffLand() {
    this.searchStringBetSuch = this.resultFound[0]._source.betriebsname;
    this.notFound.emit({ notFound: true, searchString: this.resultFound[0]._source.betriebsname, matchedBetId: this.resultFound[0] });
    this.showResultList = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
