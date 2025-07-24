import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class plainHTTPService {
  constructor(private http: HttpClient) {}

  getCall(apiURL: string, query?: string) {
    let urlMitQuery = '';
    if (query) {
      urlMitQuery = apiURL + query;
    } else {
      urlMitQuery = apiURL;
    }
    return this.http.get(urlMitQuery).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  postCall(apiURL: string, body: any) {
    return this.http.post(apiURL, body).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  putCall(apiURL: string, body: any) {
    return this.http.put(apiURL, body).pipe(
      map((res: HttpResponse<any>) => {
        return res.body;
      })
    );
  }

  deleteCall(apiURL: string, id) {
    return this.http.delete(`${apiURL}/${id}`);
  }
}
