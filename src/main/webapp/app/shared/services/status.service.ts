import {Injectable} from '@angular/core';
import {StatusUserDelete} from "app/shared/models/dashboard.model";
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class StatusUserService {
  private statusResourceUrl = 'services/bptab/api/v1/benutzer/aktiv';


  constructor(private http: HttpClient) {
  }

  deleteUser(status: StatusUserDelete): Observable<StatusUserDelete> {
    return this.http.put(this.statusResourceUrl, status, {observe: "response"}).pipe(map((res: HttpResponse<StatusUserDelete>) => {
      return res.body;
    }));
  }

}
