import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ElasticsearchService} from 'app/shared/services/elasticsearch.service';
import {debounceTime, map} from 'rxjs/operators';
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-search-production-elastic',
  templateUrl: './search-production-elastic.component.html',
  styleUrls: ['./search-production-elastic.component.scss'],
})
export class SearchProductionElasticComponent implements OnInit, AfterViewInit {
  public searchString = null;
  public keyUp = new Subject<any>();
  private productionSubscription: Subscription;
  public queryStringForElasticSearch: Array<any> = [];
  public resultFound: Array<any> = [];
  public displayAktiveBetProd: boolean = false;
  public prodFoundInElastic: boolean = false;
  public prodIsSelected: boolean = false;

  @Input() requireValidation: boolean = false;
  @Input() titleForInput: string;
  @Input() aktivBetProdList = [];
  @Input() favoriteProdSpielList = [];
  @Input() clearInputFieldValue: Subject<any>;
  @Output() selectedProd = new EventEmitter<any>();
  @Output() prodNotFound = new EventEmitter<any>();
  @Output() prodFoundWithInsertedValue = new EventEmitter<any>();
  @Output() searchingIsInProgress = new EventEmitter<any>();
  @Output() notFound: EventEmitter<any> = new EventEmitter<any>();

  constructor(private es: ElasticsearchService) {
    this.productionSubscription = this.keyUp
      .pipe(
        map(event => {
          return event.target.value;
        }),
        debounceTime(700)
      )
      .subscribe(x => {
        this.prodIsSelected = false;
        this.searchingIsInProgress.emit(true);
        this.searchProductionFromElastic(x);
      });
  }

  ngOnInit() {
    if (this.clearInputFieldValue != null) {
      this.clearInputFieldValue.subscribe(event => {
        this.searchString = null;
        this.prodIsSelected = true;
      });
    }
  }

  ngAfterViewInit() {}

  searchProductionFromElastic(searchString) {
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
        this.search();
      } else {
        this.resultFound = [];
      }
    }
  }

  search() {
    this.es.fullTextSearchFilter('prod', '', '', this.queryStringForElasticSearch).subscribe(res => {
      this.prodFoundInElastic = res.hits.hits.length != 0;
      if (res.hits.hits.length != 0) {
        this.prodFoundWithInsertedValue.emit(this.searchString);
        res.hits.hits.forEach(item => this.resultFound.push(item));
      } else {
        this.prodNotFound.emit(this.searchString);
      }
    });
  }

  prodSelectedFromElasticList(data) {
    this.searchString = data.prodWerkSearchTeilDTO.titel;
    this.prodIsSelected = true;
    this.selectedProd.emit({ prodObject: data, fromWhere: 'elastic' });
  }

  aktivBetProductionSelected(data) {
    this.searchString = data.produkt_name;
    this.prodIsSelected = true;
    this.selectedProd.emit({ prodObject: data, fromWhere: 'aktivBetProd' });
  }

  favoritProductionSelected(data) {
    this.searchString = data.favorit_objekt_bezeichnung;
    this.prodIsSelected = true;
    this.selectedProd.emit({ prodObject: data, fromWhere: 'favorit' });
  }

  displayOtherOptionToCreateBet() {
    this.notFound.emit({ notFound: true, searchString: this.searchString });
    this.resultFound = [];
  }

  checkAktivBetProdWithStatusOffentlich() {
    return this.aktivBetProdList.filter(value => value.produktion_type == 2 && value.status == 'O').length != 0;
  }

  checkAktivBetFavHasProd() {
    return this.favoriteProdSpielList.filter(value => value.favorit_art == 2).length != 0;
  }
}
