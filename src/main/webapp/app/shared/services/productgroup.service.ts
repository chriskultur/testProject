import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ProductGroupListModel} from 'app/shared/models/productGroupList.model';
import {Observable} from 'rxjs';
import {ProductGropuItemModel} from 'app/shared/models/productGropuItem.model';

@Injectable()
export class ProductgroupService {
  private getProductGroupListResource = 'services/prodtab/api/V1/Produktion/Gruppe';
  private getProductGroupItemResource = 'services/prodtab/api/V1/Produktion/Gruppe/ProduktGruppe/';
  private getProductGroupItemAllForCreateResource = 'services/prodtab/api/V1/Produktion/Gruppe/ProduktGruppe/Bearbeiten/';

  private createGroupElement = 'services/prodtab/api/V1/Produktion/Gruppe/Element';
  private updateGroupElement = 'services/prodtab/api/V1/Produktion/Gruppe/Ungruppiert/Element';

  private addElemenArchiv = 'services/prodtab/api/V1/Produktion/Gruppe/Element/Archiv/';

  constructor(private http: HttpClient) {}

  getProductGroupList(id?: number): Observable<ProductGroupListModel[]> {
    return this.http
      .get(this.getProductGroupListResource + '?betriebId.equals=' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<ProductGroupListModel[]>) => res.body));
  }

  getProductGroupSingle(id?: number): Observable<ProductGroupListModel[]> {
    return this.http
      .get(this.getProductGroupListResource + '?id.equals=' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<ProductGroupListModel[]>) => res.body));
  }

  getGroupItemFromId(betId?: number, groupId?: number): Observable<ProductGropuItemModel[]> {
    return this.http
      .post(this.getProductGroupItemResource + betId + '/' + groupId, null, { observe: 'response' })
      .pipe(map((res: HttpResponse<ProductGropuItemModel[]>) => res.body));
  }

  getItemsToDisplayAtCreate(betid?: number, gpId?: any) {
    return this.http
      .post(this.getProductGroupItemAllForCreateResource + betid + '/' + gpId, null, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  createGroupItem(item) {
    return this.http.post(this.createGroupElement, item, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  updateGroupItem(item) {
    return this.http.put(this.updateGroupElement, item, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  deleteGroupItem(betId, id) {
    return this.http
      .delete(this.createGroupElement + '/' + betId + '/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  createProductGroup(item: ProductGroupListModel): Observable<ProductGroupListModel> {
    return this.http
      .post(this.getProductGroupListResource, item, { observe: 'response' })
      .pipe(map((res: HttpResponse<ProductGroupListModel>) => res.body));
  }

  updateProductGroup(item: ProductGroupListModel): Observable<ProductGroupListModel> {
    return this.http
      .put(this.getProductGroupListResource, item, { observe: 'response' })
      .pipe(map((res: HttpResponse<ProductGroupListModel>) => res.body));
  }

  addGroupElementIntoArchiv(id, item) {
    return this.http
      .put(this.addElemenArchiv + id, item, { observe: 'response' })
      .pipe(map((res: HttpResponse<ProductGroupListModel>) => res.body));
  }

  deleteGroup(id) {
    return this.http
      .delete(this.getProductGroupListResource + '/' + id, { observe: 'response' })
      .pipe(map((res: HttpResponse<any>) => res.body));
  }
}
