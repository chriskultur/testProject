import {Injectable} from '@angular/core';

import {HttpClient, HttpResponse} from '@angular/common/http';
import {createRequestOptionGlobalSearch} from 'app/shared/util/request-util';
import {map} from 'rxjs/operators';

@Injectable()
export class GlobalSearchService {
  private resourceUrlBetrieb = 'services/bettab/api/V1/betriebe/Stammdaten/crowd/all';
  private resourceUrlBenutzer = 'services/bptab/api/v1/benutzer/all';
  private resourceUrlSpielstatte = 'services/prodtab/api/V1/Produkt/Spielstätte/all';
  private resourceUrlWerk = 'services/prodtab/api/V1/Produkt/Werk/all';
  private resourceUrlProduktion = 'services/prodtab/api/V1/Produkt/Produktion/all';

  constructor(private http: HttpClient) {}

  queryBetrieb(req?: any) {
    const options = createRequestOptionGlobalSearch(req);
    return this.http
      .get<any[]>(this.resourceUrlBetrieb, { params: options, observe: 'response' })
      .pipe();
  }

  queryProduktion(req?: any) {
    const options = createRequestOptionGlobalSearch(req);
    return this.http.get<any[]>(this.resourceUrlProduktion, { params: options, observe: 'response' });
  }

  queryWerk(req?: any) {
    const options = createRequestOptionGlobalSearch(req);
    return this.http.get(this.resourceUrlWerk, { params: options, observe: 'response' });
  }

  queryBenutzer(req?: any) {
    const options = createRequestOptionGlobalSearch(req);
    return this.http.get<any[]>(this.resourceUrlBenutzer, { params: options, observe: 'response' });
  }

  querySpielstatte(req?: any) {
    const options = createRequestOptionGlobalSearch(req);
    return this.http.get<any[]>(this.resourceUrlSpielstatte, { params: options, observe: 'response' });
  }

  fullTextGlobalSearch(_queryText) {
    let bodyForBackend = {
      body: {
        size: 10000,
        query: {
          bool: {
            must: _queryText,
          },
        },
      },
      url: '_all/_search',
    };

    let url = 'services/bptab/api/public/elasticsearch/search';
    return this.http.post(url, bodyForBackend, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body.hits.hits));
  }
}
