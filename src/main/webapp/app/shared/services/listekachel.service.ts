import {Injectable} from '@angular/core';
import {Listekachel} from "app/shared/models/listekachel.model";
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ListekachelService {

  private resourceUrl = 'services/bptab/api/liste-kachels';
  private url: string = 'services/bptab/api/liste-kachels';

  constructor(private http: HttpClient) {
  }

  // create(listekachel: Listekachel): Observable<Listekachel> {
  //     const copy = this.convert(listekachel);
  //     return this.http.post(this.resourceUrl, copy).map((res: Response) => {
  //         return res.json();
  //     });
  // }
  //
  // update(listekachel: Listekachel): Observable<Listekachel> {
  //     const copy = this.convert(listekachel);
  //     return this.http.put(this.resourceUrl, copy).map((res: Response) => {
  //         return res.json();
  //     });
  // }
  //
  // find(id: number): Observable<Listekachel> {
  //     return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
  //         return res.json();
  //     });
  // }
  // lessen(id:number): Observable<ResponseWrapper> {
  //     return this.http.get(this.resourceUrl+ '?id=' +id)
  //         .map((res: Response) => this.convertResponse(res));
  // }

  // query(req?: any): Observable<ResponseWrapper> {
  //     const options = createRequestOption(req);
  //     return this.http.get(this.resourceUrl, options)
  //         .map((res: Response) => this.convertResponse(res));
  // }
  //
  // // delete(id: number): Observable<Response> {
  // //     return this.http.delete(`${this.resourceUrl}/${id}`);
  // // }
  //
  // get(id: number): Observable<Listekachel> {
  //     return this.http.get(this.url + "/" + id).map(response => response.json());
  // }

  private convert(listekachel: Listekachel): Listekachel {
    const copy: Listekachel = Object.assign({}, listekachel);
    return copy;
  }
}
