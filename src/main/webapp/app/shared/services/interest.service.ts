import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class InterestService {

  public resourceUrlInterest = 'services/prodtab/api/V1/anfrages/database/';
  public resourceUrlInterestDelete = 'services/prodtab/api/V1/anfrages/';

  constructor(private http: HttpClient) {
  }

  getAllInterest(id) {
    return this.http.get(this.resourceUrlInterest + id, {observe: "response"}).pipe(map((res: HttpResponse<any[]>) => {
      return res.body;
    }));
  }

  deleteInterest(betId, id) {
    return this.http.delete(this.resourceUrlInterestDelete + betId + "/" + id, {observe: "response"}).pipe(map((res: HttpResponse<any[]>) => {
      return res.body;
    }));
  }
}
