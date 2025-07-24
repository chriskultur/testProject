import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {VerlagBuchunListModel} from 'app/shared/models/verlagBuchunList.model';

@Injectable()
export class verlaglistService {
  private prodVerlagBuchungList = 'services/opttab/api/V1/verlag/buchung/';

  constructor(private http: HttpClient) {}

  getProdVerlagBuchungList(id: number) {
    return this.http
      .get(this.prodVerlagBuchungList + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<VerlagBuchunListModel[]>) => res.body));
  }
}
