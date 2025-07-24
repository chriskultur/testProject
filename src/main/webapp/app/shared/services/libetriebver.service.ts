import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Libetriebver} from "app/shared/models/libetriebver.model";

@Injectable()
export class LibetriebverService {

  private resourceUrl = 'services/bettab/api/libetriebvers';
  private resourceSearchUrl = 'services/bettab/api/_search/libetriebvers';

  constructor(private http: HttpClient) {
  }

  // create(libetriebver: Libetriebver): Observable<Libetriebver> {
  //     const copy = this.convert(libetriebver);
  //     return this.http.post(this.resourceUrl, copy).map((res: Response) => {
  //         return res.json();
  //     });
  // }
  //
  // update(libetriebver: Libetriebver): Observable<Libetriebver> {
  //     const copy = this.convert(libetriebver);
  //     return this.http.put(this.resourceUrl, copy).map((res: Response) => {
  //         return res.json();
  //     });
  // }
  //
  // find(id: number): Observable<Libetriebver> {
  //     return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
  //         return res.json();
  //     });
  // }
  //
  // query(req?: any): Observable<ResponseWrapper> {
  //     const options = createRequestOption(req);
  //     return this.http.get(this.resourceUrl, options)
  //         .map((res: Response) => this.convertResponse(res));
  // }
  //
  // delete(id: number): Observable<Response> {
  //     return this.http.delete(`${this.resourceUrl}/${id}`);
  // }
  //
  // search(req?: any): Observable<ResponseWrapper> {
  //     const options = createRequestOption(req);
  //     return this.http.get(this.resourceSearchUrl, options)
  //         .map((res: any) => this.convertResponse(res));
  // }

  private convert(libetriebver: Libetriebver): Libetriebver {
    const copy: Libetriebver = Object.assign({}, libetriebver);
    return copy;
  }
}
