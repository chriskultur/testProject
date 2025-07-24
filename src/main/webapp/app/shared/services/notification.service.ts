import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class NotificationService {
  constructor(private http: HttpClient) {}

  getAllNotification(id) {
    let url = 'services/bettab/api/V1/camunda/tasks/' + id;
    return this.http.get(url, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  getSingleNotification(id) {
    let url = 'services/bettab/api/V1/camunda/aufgabe/' + id;
    return this.http.get(url, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  declineNotification(url) {
    return this.http.delete(url, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  declineCalendarNotification(url, body) {
    return this.http.post(url, body, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  rejectBusinessConnection(id) {
    let url = 'services/bettab/api/V1/betriebe/Geschaeftsbeziehungen/Betrieb_einladen/' + id;
    return this.http.delete(url, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  getBusinessConnectionObject(id) {
    let url = 'services/bettab/api/V1/betriebe/Geschaeftsbeziehungen/crowd/' + id;
    return this.http.get(url, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  acceptBetribeVerknpfung(url) {
    return this.http.put(url, null, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  acceptCalendarTermin(url, body) {
    return this.http.post(url, body, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  getAllCalendarNotification(id) {
    let url = 'services/bettab/api/V1/camunda/tasks/calendar/' + id;
    return this.http.get(url, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  getAllKalenderbenachrichtigung(id) {
    let url = 'services/opttab/api/benachrichtigungs';
    return this.http.get(url + '/all/' + id, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  getKalenderbenachrichtigung(id) {
    let url = 'services/opttab/api/benachrichtigungs';
    return this.http.get(url + '/' + id, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }

  updateKalenderbenachrichtigung(id, status) {
    let url = 'services/opttab/api/benachrichtigungs/';
    return this.http.put(url + id + '/' + status, { observe: 'response' }).pipe(map((res: HttpResponse<any>) => res.body));
  }
}
