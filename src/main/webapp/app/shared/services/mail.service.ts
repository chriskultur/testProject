import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HtmlMail} from 'app/shared/models/htmlMail.model';
import {InterestMailModel} from 'app/shared/models/interestMail.model';

@Injectable()
export class MailService {
  private resourceUrlHtmlMail = 'services/bettab/api/V1/htmlemail';
  private resorceUrlHtmlMailInterest = 'services/prodtab/api/V1/htmlemail';

  constructor(private http: HttpClient) {}

  createHtmlMail(htmlmail: HtmlMail): Observable<HtmlMail> {
    htmlmail.mailPW = 'oktnovdez01!';
    return this.http.post(this.resourceUrlHtmlMail, htmlmail).pipe(map((res: HttpResponse<HtmlMail>) => res.body));
  }

  createHtmlMailInterest(mailObject: InterestMailModel): Observable<InterestMailModel> {
    mailObject.mailPW = 'oktnovdez01!';
    return this.http.post(this.resorceUrlHtmlMailInterest, mailObject, { observe: 'response' }).pipe(
      map((res: HttpResponse<InterestMailModel>) => {
        return res.body;
      })
    );
  }
}
