import {Injectable} from '@angular/core';
import {MailService} from 'app/shared/services/mail.service';
import {InterestMailModel} from 'app/shared/models/interestMail.model';

@Injectable()
export class InterestMailService {
  mailObject: InterestMailModel = new InterestMailModel(
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  );

  constructor(private mailService: MailService) {}

  interestMailSend(
    prodwerkspelId,
    prodwerkspelBetId,
    prodwerkspelName,
    user_mit_Id,
    textMessage,
    aktiveBet,
    aktiveBen,
    mail,
    type,
    mailTo,
    aktiveBetName
  ) {
    this.mailObject.betrieb_von_id = aktiveBet;
    this.mailObject.betrieb_nach_id = prodwerkspelBetId;
    this.mailObject.interesse_id = prodwerkspelId;
    this.mailObject.interesse_type = type;
    this.mailObject.mail_type = 'interesse';
    this.mailObject.name_interesse = prodwerkspelName;
    this.mailObject.beschreibung = textMessage;
    this.mailObject.mailSubject = 'Interesse an Ihrer ' + type + ' ' + prodwerkspelName;
    this.mailObject.mitarbeiter_von_id = user_mit_Id;
    this.mailObject.mailaddr = mail;
    this.mailObject.vorname = aktiveBen.vorname;
    this.mailObject.nachname = aktiveBen.nachname;
    this.mailObject.accept_link = 'mailto:' + mailTo;
    this.mailObject.htmlMsg = 'something';
    this.mailObject.txtMsg = 'something';
    this.mailObject.original_betriebsname = aktiveBetName;

    this.mailService.createHtmlMailInterest(this.mailObject).subscribe(res => {});
  }

  PrufungMailSend(
    prodwerkspelId,
    prodwerkspelBetId,
    prodwerkspelName,
    user_mit_Id,
    textMessage,
    aktiveBet,
    aktiveBen,
    mail,
    type,
    mailTo,
    aktiveBetName
  ) {
    this.mailObject.betrieb_von_id = aktiveBet;
    this.mailObject.betrieb_nach_id = prodwerkspelBetId;
    this.mailObject.interesse_id = prodwerkspelId;
    this.mailObject.interesse_type = type;
    this.mailObject.mail_type = 'kunstler check';
    this.mailObject.name_interesse = prodwerkspelName;
    this.mailObject.beschreibung = textMessage;
    this.mailObject.mailSubject = 'Interesse an Ihrer ' + type + ' ' + prodwerkspelName;
    this.mailObject.mitarbeiter_von_id = user_mit_Id;
    this.mailObject.mailaddr = mail;
    this.mailObject.vorname = aktiveBen.vorname;
    this.mailObject.nachname = aktiveBen.nachname;
    this.mailObject.accept_link = 'mailto:' + mailTo;
    this.mailObject.htmlMsg = 'something';
    this.mailObject.txtMsg = 'something';
    this.mailObject.original_betriebsname = aktiveBetName;

    this.mailService.createHtmlMailInterest(this.mailObject).subscribe(res => {});
  }
}
