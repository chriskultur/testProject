import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Injectable()
export class SubscriptionNotiz {
  public subscriptionNotes: ReplaySubject<any> = new ReplaySubject();

  constructor() {}

  emitSubscription(value: any) {
    console.log(value);
    this.subscriptionNotes.next(value);
  }
}
