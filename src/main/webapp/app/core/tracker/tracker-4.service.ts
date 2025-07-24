import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd, Event } from '@angular/router';
import { Subscription, ReplaySubject, Subject } from 'rxjs';
import { filter, subscribeOn } from 'rxjs/operators';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';

import { TrackerActivity } from './tracker-activity.model';
import { BETTAB_WEBSOCKET, PRODTAB_WEBSOCKET } from 'app/app.constants';

@Injectable({ providedIn: 'root' })
export class TrackerService4 {
  private stompClient: Stomp.Client | null = null;
  private routerSubscription: Subscription | null = null;
  private connectionSubject: ReplaySubject<void> = new ReplaySubject(1);
  private connectionSubscription: Subscription | null = null;
  private stompSubscription: Stomp.Subscription | null = null;
  private stompSubscriptionVertrag: Stomp.Subscription | null = null;
  private listenerSubject: Subject<String> = new Subject();
  private listenerSubjectVertrag: Subject<String> = new Subject();
  private counter: any = 0;

  constructor(private router: Router, private location: Location) {}

  connect(ssoid: any, betriebsId: any): void {
    if (this.stompClient && this.stompClient.connected) {
      return;
    }
    // building absolute path so that websocket doesn't fail when deploying with a context path
    let url = PRODTAB_WEBSOCKET;

    // url = this.location.prepareExternalUrl(url);
    // const socket: WebSocket = new SockJS(url,[], {
    //   sessionId: () => {
    //     return ssoid;
    //   }});
    const socket: WebSocket = new SockJS(url);
    this.stompClient = Stomp.over(socket, { debug: true });
    const headers: Stomp.ConnectionHeaders = {};
    this.stompClient.connect(
      headers,
      () => {
        this.connectionSubject.next();
        // this.sendActivity();
        this.subscribe(ssoid, betriebsId);
      },
      (error: any) => {
        window.setTimeout(
          function () {
            this.counter++;
            if (this.counter >= 5) {
              return;
            }
            this.connect(ssoid, betriebsId);
          }.bind(this),
          2500
        );
      }
    );
  }

  disconnect(): void {
    this.unsubscribe();

    this.connectionSubject = new ReplaySubject(1);

    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
      this.routerSubscription = null;
    }

    if (this.stompClient) {
      if (this.stompClient.connected) {
        this.stompClient.disconnect();
      }
      this.stompClient = null;
    }
  }

  receive(): Subject<any> {
    return this.listenerSubject;
  }

  receiveVertrag(): Subject<any> {
    return this.listenerSubject;
  }

  subscribe(ssoid: any, betriebsId: any): void {
    if (this.connectionSubscription) {
      return;
    }

    this.connectionSubscription = this.connectionSubject.subscribe(() => {
      if (this.stompClient) {
        this.stompSubscription = this.stompClient.subscribe('/produkt/' + betriebsId, (data: Stomp.Message) => {
          this.listenerSubject.next(data.body);
        });
      }
    });
  }

  checkstatus() {
    return this.stompClient.connected;
  }

  unsubscribe(): void {
    if (this.stompSubscription) {
      this.stompSubscription.unsubscribe();
      this.stompSubscription = null;
    }

    if (this.stompSubscriptionVertrag) {
      this.stompSubscriptionVertrag.unsubscribe();
      this.stompSubscriptionVertrag = null;
    }

    if (this.connectionSubscription) {
      this.connectionSubscription.unsubscribe();
      this.connectionSubscription = null;
    }
  }

  sendActivity(): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(
        '/app/hello', // destination
        'how are you', // body
        {} // header
      );
    }
  }
}
