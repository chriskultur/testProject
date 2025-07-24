import {Injectable} from '@angular/core';
// import { Http, Response } from '@angular/http';
//
// import { Liland } from './liland.model';

@Injectable()
export class LilandService {

  // private resourceUrl = 'services/bettab/api/V1/listen/land';
  // private resourceSearchUrl = 'services/bettab/api/_search/lilands';
  //
  // constructor(private http: Http) { }
  //
  // create(liland: Liland): Observable<Liland> {
  //     const copy = this.convert(liland);
  //     return this.http.post(this.resourceUrl, copy).map((res: Response) => {
  //         return res.json();
  //     });
  // }
  //
  // update(liland: Liland): Observable<Liland> {
  //     const copy = this.convert(liland);
  //     return this.http.put(this.resourceUrl, copy).map((res: Response) => {
  //         return res.json();
  //     });
  // }
  //
  // find(id: number): Observable<Liland> {
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
  //
  // private convertResponse(res: Response): ResponseWrapper {
  //     const jsonResponse = res.json();
  //     return new ResponseWrapper(res.headers, jsonResponse, res.status);
  // }
  //
  // private convert(liland: Liland): Liland {
  //     const copy: Liland = Object.assign({}, liland);
  //     return copy;
  // }
}
