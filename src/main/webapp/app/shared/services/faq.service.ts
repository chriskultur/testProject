import {Injectable} from '@angular/core';

import {FAQ} from '../models/faq.model';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {createRequestOption, createRequestOptionFaq} from 'app/shared/util/request-util';

@Injectable()
export class FAQService {
  private resourceUrl = 'services/bptab/api/lifaqs';

  constructor(private http: HttpClient) {}

  create(faq: FAQ): Observable<FAQ> {
    return this.http.post(this.resourceUrl, faq, { observe: 'response' }).pipe(map((res: HttpResponse<FAQ>) => res.body));
  }
  update(faq: FAQ): Observable<FAQ> {
    return this.http.put(this.resourceUrl, faq, { observe: 'response' }).pipe(map((res: HttpResponse<FAQ>) => res.body));
  }

  find(id: number): Observable<FAQ[]> {
    return this.http.get(this.resourceUrl + id, { observe: 'response' }).pipe(map((res: HttpResponse<FAQ[]>) => res.body));
  }

  getAllFaq(req?: any): Observable<FAQ[]> {
    const options = createRequestOption(req);
    return this.http.get(this.resourceUrl, { params: options, observe: 'response' }).pipe(map((res: HttpResponse<FAQ[]>) => res.body));
  }

  query(req?: any): Observable<any[]> {
    const options = createRequestOptionFaq(req);
    return this.http.get(this.resourceUrl, { params: options, observe: 'response' }).pipe(map((res: HttpResponse<FAQ[]>) => res.body));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<FAQ[]> {
    const options = createRequestOption(req);
    return this.http.get(this.resourceUrl, { params: options, observe: 'response' }).pipe(map((res: HttpResponse<FAQ[]>) => res.body));
  }
}
