import {Component, HostListener, Input, OnInit} from '@angular/core';
import {GlobalSearchService} from 'app/shared/services/globalSearch.service';
import {Router} from '@angular/router';
import {Liland} from 'app/shared/models/liland.model';
import {LilandService_bp} from 'app/shared/services/liland-bp.service';
import {BetriebService} from 'app/shared/services/betrieb.service';
import {Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-globalSearch',
  templateUrl: './globalSearch.component.html',
  styleUrls: ['./globalSearch.component.scss'],
})
export class GlobalSearchComponent implements OnInit {
  searchWithWord = '';
  queryForGlobalSearch = [];
  resultList;
  showDefault: boolean = true;
  showplus: boolean;
  public keyUp = new Subject<any>();
  private subscription: Subscription;
  @Input() liland: Array<Liland> = [];
  constructor(
    private globalSearchService: GlobalSearchService,
    private router: Router,
    private landService: LilandService_bp,
    public betriebServiceGlob: BetriebService
  ) {
    this.subscription = this.keyUp
      .pipe(
        map(event => event.target.value),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((x: string) => {
        if (x.length > 2) this.globalsearchWithInputField(x);
      });
  }

  ngOnInit(): void {
    this.searchWithWord = null;
  }

  @HostListener('document:click', ['$event']) clickedOutside($event) {
    if (this.showplus) {
      this.showplus = false;
    }
  }

  clickedInside($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  clickplus() {
    if (this.showplus == true) {
    } else {
      this.showplus = !this.showplus;
    }

    /*after redirect display normal division*/
    if (this.searchWithWord == null || this.searchWithWord == ' ') {
      this.showDefault = true;
    }
  }

  globalsearchWithInputField(str: string) {
    /*split string if whitespace is there*/
    let stringList: Array<string> = str
      .replace(/["&/(){}[]/gi, '')
      .trim()
      .split(' ');
    if (stringList.length != 0) {
      this.queryForGlobalSearch = [];

      /*create query for each word and push it to query variable */
      for (let string of stringList) {
        if (string != '') {
          let keyWildcard = '*' + string + '*';
          let matchobjTemp = { query_string: {} };
          matchobjTemp.query_string['query'] = keyWildcard;
          matchobjTemp.query_string['fields'] = [
            'betriebsname',
            'prodWerkSearchTeilDTO.titel',
            'titel',
            'vorname',
            'nachname',
            'interne_bezeichnung_der_produkts',
            'post_title',
            'post_content',
            'prodWerkSearchTeilDTO.prodWerkUnterDTOList.bezeichnung',
            'prodWerkUnterDTOList.bezeichnung',
            'spielSearchDTO.spielAdresseSearchDTOList.poststadt',
            'betriebAdresseSearchDTO.poststadt',
            'betriebAdresseSearchDTO.liste_lands_bezeichnung',
            'betriebAdresseSearchDTO.liste_land_glieds_bezeichnung',
            'prodProdUnterDTOList.bezeichnung',
            'kunstlername',
            'name',
            'stadt',
          ];
          this.queryForGlobalSearch.push(matchobjTemp);
        }
      }
    }

    /*make the result array every time empty for assigning new results*/
    this.resultList = [];
    if (this.queryForGlobalSearch.length != 0) {
      this.resultList = [];
      this.globalSearchService.fullTextGlobalSearch(this.queryForGlobalSearch).subscribe((res: Array<any>) => {
        this.queryForGlobalSearch = [];
        let bet = res.filter(value => value._index == 'betrieb');
        let ben = res.filter(value => value._index == 'benutzer');
        let prod = res.filter(value => value._index == 'prod');
        let werk = res.filter(value => value._index == 'werk');
        let spiel = res.filter(value => value._index == 'spiel');
        let knowled = res.filter(value => value._index == 'wissensdatenbankekulturportalde-post-1');
        let kunst = res.filter(value => value._index == 'kunst');
        this.resultList = bet.concat(kunst.concat(ben.concat(prod.concat(werk.concat(spiel.concat(knowled))))));
        this.resultList = this.resultList.filter(item => {
          if (item._index == 'wissensdatenbankekulturportalde-post-1') {
            if (
              (item._source.post_type == 'post' || item._source.post_type == 'question' || item._source.post_type == 'answer') &&
              item._source.post_status == 'publish'
            ) {
              return item;
            } else {
              return !item;
            }
          } else {
            return item;
          }
        });

        if (this.resultList.length == 0) {
          this.showDefault = true;
        } else {
          this.showDefault = false;
        }
      });
    } else {
      this.resultList = [];
      this.showDefault = true;
    }
  }

  searchProductionWithKeyword(type, keyword, repo) {
    this.router.navigate(['/search-result'], { queryParams: { val: keyword, tp: repo, key: type } });
  }

  trackByIndex(i: number) {
    return i;
  }

  clearSearchVal() {
    this.searchWithWord = null;
  }

  openKnowledgeQuestion(link) {
    window.open(link, '_blank');
  }

  getImageOfLang(land: string) {
    console.log(land);
    console.log(this.liland);
    if(this.liland.filter(value => value.bezeichnung == land).length != 0) {
      let temp = this.liland.filter(value => value.bezeichnung == land)[0];
      console.log(this.liland.filter(value => value.bezeichnung == land));
      let imageString = 'data:' + temp.flaggeContentType + ';base64,' + temp.flagge;
      return imageString;
    }
    return '';
  }

  getLandName(id) {
    let temp = this.liland.filter(value => value.id == id)[0];
    let imageString = 'data:' + temp.flaggeContentType + ';base64,' + temp.flagge;
    return imageString;
  }
}
