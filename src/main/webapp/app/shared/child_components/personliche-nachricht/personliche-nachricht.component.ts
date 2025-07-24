import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Betrieb} from 'app/shared/models/betrieb.model';
import {Mitarbeiter} from 'app/shared/models/mitarbeiter.model';
import {BpBet} from 'app/shared/models/bpBet.model';

@Component({
  selector: 'app-personliche-nachricht',
  templateUrl: 'personliche-nachricht.component.html',
  styleUrls: ['personliche-nachricht.component.scss'],
})
export class PersonlicheNachrichtComponent implements OnInit, OnChanges {
  public personlichNachricht: string = '';
  public addNewMailToSend: string = '';
  public listOfEmailToSendMessage: Array<string> = [];
  public isCollapsedmail: boolean = false;
  public sendCopyOfMailToMe: boolean = true;
  public oldValue: Array<{ betrieb: Betrieb; listOfMitarbiter: Array<Mitarbeiter>; betriebEmail: string }> = [];

  @Input() aktivbetrieb: BpBet;
  @Input() listOfBetriebWithMitarbeiter: Array<{ betrieb: Betrieb; listOfMitarbiter: Array<Mitarbeiter>; betriebEmail: string }> = [];

  @Output() messageDataReturn: EventEmitter<{ message: string; emailList: Array<string>; sendToMe: boolean }> = new EventEmitter<{
    message: string;
    emailList: Array<string>;
    sendToMe: boolean;
  }>();

  constructor() {}

  /*as ngOnchanges can track the changes of the @Input variable: if value changes it get called */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['aktivbetrieb']) {
      this.aktivbetrieb = <BpBet>changes['aktivbetrieb'].currentValue;
    }
    this.oldValue = [];
    this.listOfEmailToSendMessage = [];
    this.listOfBetriebWithMitarbeiter.forEach((value, index, array) => {
      this.oldValue.push({
        betrieb: value.betrieb,
        listOfMitarbiter: value.listOfMitarbiter,
        betriebEmail: value.betriebEmail,
      });
      if (this.listOfEmailToSendMessage.filter(mail => mail == value.betriebEmail).length == 0) {
        this.listOfEmailToSendMessage.push(value.betriebEmail);
      }
      if (index == array.length - 1) {
        if (this.listOfEmailToSendMessage.filter(mail => mail == this.aktivbetrieb.mail).length == 0) {
          this.listOfEmailToSendMessage.push(this.aktivbetrieb.mail);
        }
        this.messageDataReturn.emit({
          message: this.personlichNachricht,
          emailList: this.listOfEmailToSendMessage,
          sendToMe: this.sendCopyOfMailToMe,
        });
      }
    });
  }

  sendTocopytoMeChange() {
    if (this.sendCopyOfMailToMe) {
      this.listOfEmailToSendMessage.push(this.aktivbetrieb.mail);
    } else {
      let index = this.listOfEmailToSendMessage.findIndex(value => value == this.aktivbetrieb.mail);
      if (index != -1) {
        this.listOfEmailToSendMessage.splice(index, 1);
      }
    }
  }

  ngOnInit(): void {}

  /*as ngOnchanges cant track the nested object values thats why we need ngdocheck*/
  // ngDoCheck() {
  //   console.log(this.aktivbetrieb.mail);
  //   if (this.listOfBetriebWithMitarbeiter.length != this.oldValue.length) {
  //     this.oldValue = [];
  //     this.listOfEmailToSendMessage = [];
  //     this.listOfBetriebWithMitarbeiter.forEach((value, index, array) => {
  //       this.oldValue.push({ betrieb: value.betrieb, listOfMitarbiter: value.listOfMitarbiter, betriebEmail: value.betriebEmail });
  //       if (this.listOfEmailToSendMessage.filter(mail => mail == value.betriebEmail).length == 0) {
  //         this.listOfEmailToSendMessage.push(value.betriebEmail);
  //       }
  //       if (index == array.length - 1) {
  //         if (this.sendCopyOfMailToMe) {
  //           this.listOfEmailToSendMessage.push(this.aktivbetrieb.mail);
  //         }
  //         this.messageDataReturn.emit({
  //           message: this.personlichNachricht,
  //           emailList: this.listOfEmailToSendMessage,
  //           sendToMe: this.sendCopyOfMailToMe,
  //         });
  //       }
  //     });
  //   }
  // }

  addorRemoveFromMailList(mail) {
    if (this.listOfEmailToSendMessage.filter(value => value == mail).length == 0) {
      this.listOfEmailToSendMessage.push(mail);
    } else {
      let index = this.listOfEmailToSendMessage.findIndex(value => value == mail);
      this.listOfEmailToSendMessage.splice(index, 1);
    }
    this.addNewMailToSend = null;

    if (this.listOfEmailToSendMessage.length == 0) {
      this.listOfBetriebWithMitarbeiter.forEach(value => {
        if (this.listOfEmailToSendMessage.filter(mail => mail == value.betriebEmail).length == 0) {
          this.listOfEmailToSendMessage.push(value.betriebEmail);
        }
      });
    }
    this.messageDataReturn.emit({
      message: this.personlichNachricht,
      emailList: this.listOfEmailToSendMessage,
      sendToMe: this.sendCopyOfMailToMe,
    });
  }

  insertNewEmailFromUser(mail) {
    if (this.listOfEmailToSendMessage.filter(value => value == mail).length == 0) {
      this.listOfEmailToSendMessage.push(mail);
      this.messageDataReturn.emit({
        message: this.personlichNachricht,
        emailList: this.listOfEmailToSendMessage,
        sendToMe: this.sendCopyOfMailToMe,
      });
    }
  }

  checkEmailExistInList(mail) {
    if (this.listOfEmailToSendMessage.filter(value => value == mail).length == 0) {
      return false;
    } else {
      return true;
    }
  }

  onQuill(html: string) {
    this.personlichNachricht = html;
    this.messageDataReturn.emit({
      message: this.personlichNachricht,
      emailList: this.listOfEmailToSendMessage,
      sendToMe: this.sendCopyOfMailToMe,
    });
  }

  messageTemplateSelected(text) {
    this.personlichNachricht = this.personlichNachricht + text;
  }
}
