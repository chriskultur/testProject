import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class ElasticsearchService {
  queryalldocs = {
    size: 10000,
    query: {
      match_all: {},
    },
  };

  body = { query: { match_all: {} }, results: 1000 };

  constructor(private http: HttpClient) {}

  /* private connect() {
        this.client = new Client({
            host: es_URL,
            log: 'trace'
        });
    }

    createIndex(benutzer): any {
        return this.client.indices.get(benutzer);
    }

    isAvailable(): any {
        return this.client.ping({
            requestTimeout: Infinity,
            body: 'hello JavaSampleApproach!'
        });
    }

    addToIndex(value): any {
        return this.client.create(value);
    }*/

  getAllDocuments(_index, _type, fromVal, sortArray): Observable<any> {
    let queryalldocsForElastic = {
      size: 15,
      query: {
        match_all: {},
      },
      from: fromVal,
      sort: sortArray,
    };
    let bodyForBackend = {
      body: queryalldocsForElastic,
      url: _index + '/_search',
    };
    let url = 'services/bptab/api/public/elasticsearch/search';
    return this.http.post(url, bodyForBackend, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
    /*return this.client.search({
            index: _index,
            type: _type,
            body: this.queryalldocs,
            filterPath: ['hits.hits._source']
        });*/
  }

  fullTextSearch(_index, _type, _field, _queryText, fromVal, sortArray?: any): Observable<any> {
    let bodyForBackend = {
      body: {
        size: 15,
        from: fromVal,
        sort: sortArray,
        query: {
          bool: {
            must: _queryText,
          },
        },
      },
      url: _index + '/_search',
    };
    let url = 'services/bptab/api/public/elasticsearch/search';

    return this.http.post(url, bodyForBackend, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  fullTextSearchFilter(_index, _type, _field, _queryText): Observable<any> {
    let bodyForBackend = {
      body: {
        size: 10000,
        query: {
          bool: {
            must: _queryText,
          },
        },
      },
      url: _index + '/_search',
    };
    let url = 'services/bptab/api/public/elasticsearch/search';

    return this.http.post(url, bodyForBackend, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  fullTextSearchFilterKB(_indexK, _indexB, _type, _field, _queryText, includeKunstler): Observable<any> {
    let temp;
    if (includeKunstler) {
      temp = _indexB + ',' + _indexK + '/_search';
    } else {
      temp = _indexB + '/_search';
    }
    let bodyForBackend = {
      body: {
        size: 10000,
        query: {
          bool: {
            must: _queryText,
          },
        },
      },
      url: temp,
    };
    let url = 'services/bptab/api/public/elasticsearch/search';

    return this.http.post(url, bodyForBackend, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  getAllDocumentsForHomepage(_index, _type, fromVal, sortArray): Observable<any> {
    let queryalldocsForElastic = {
      size: 50,
      query: {
        match_all: {},
      },
      from: fromVal,
      sort: sortArray,
    };
    let bodyForBackend = {
      body: queryalldocsForElastic,
      url: _index + '/_search',
    };
    let url = 'services/bptab/api/public/elasticsearch/search';
    return this.http.post(url, bodyForBackend, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
    /*return this.client.search({
            index: _index,
            type: _type,
            body: this.queryalldocs,
            filterPath: ['hits.hits._source']
        });*/
  }
}
