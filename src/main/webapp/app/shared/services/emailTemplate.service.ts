import {Injectable} from '@angular/core';
import {MailService} from './mail.service';
import {HtmlMail} from 'app/shared/models/htmlMail.model';
import {Bp} from 'app/shared/models/bp.model';
import Swal from 'sweetalert2';
import {Location} from '@angular/common';

@Injectable()
export class EmailTemplateService {
  mail: HtmlMail = new HtmlMail(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  mailRegistrationLink;
  roll: string;

  constructor(private mailService: MailService, private location: Location) {}

  sendMail(leitung: any, email: string, betribe: string, txtMsg: string, user: Bp, mainBetribe: any, type: any) {
    /*
            give sending mail, company name, VorName, Nachname, mail Password
    */
    this.mail.mailaddr = email;
    this.mail.betriebsname = betribe;
    this.mail.vorname = leitung.vorname;
    this.mail.nachname = leitung.nachname;
    this.mail.mailPW = 'oktnovdez01!';
    this.mail.htmlMsg = 'string';
    this.mail.txtMsg = 'string';
    if (mainBetribe) {
      this.mail.original_betriebsname = mainBetribe.betriebsname;
    }

    if (txtMsg) {
      this.mail.beschreibung = txtMsg;
    } else {
      this.mail.beschreibung = 'Jetzt kostenlos beitreten!';
    }

    /*
            Creating Invitation link for sending Invitation Mail
            By taking mail, vorname and nachname
    */

    let encodeWithbtoa = btoa('vorname=' + leitung.vorname + '&nachname=' + leitung.nachname + '&email=' + email);
    let paramsForAttaching = encodeURIComponent(encodeWithbtoa);

    this.mailRegistrationLink = `${location.origin}${this.location.prepareExternalUrl(
      'oauth2/authorization/oidc?serve=serveRegPage&' + paramsForAttaching
    )}`;

    /*
           Checking Type of Sending Mail
    */

    if (type == 'invitation') {
      this.mail.mail_type = type;
      this.mail.mailSubject = 'Einladung';
      this.mail.accept_link = this.mailRegistrationLink;
      if (leitung.rolle == 'B') {
        this.roll = 'Leiter';
        this.mail.leiter_mitarbeiter = 'leiter';
      } else {
        this.roll = 'Mitarbeiter';
        this.mail.leiter_mitarbeiter = 'mitarbeiter';
      }
    } else if (type == 'kontakt') {
      this.mail.mail_type = type;
      this.mail.mailSubject = 'Kontaktaufnahme';
      // this.mail.accept_link = this.mailRegistrationLink;
    } else if (type == 'freigegeben') {
      this.mail.mail_type = type;
      this.mail.mailSubject = 'freigegeben';
      this.mail.accept_link = 'https://ekulturportal-test.de/#/homepage';
    } else if (type == 'declined') {
      this.mail.mail_type = type;
      this.mail.mailSubject = 'Betrieb Abgelehnt';
      this.mail.declined_message = txtMsg;
    } else if (type.type == 'interesse') {
      this.mail.mail_type = type.type;
      this.mail.interesse_type = type.int_type;
      this.mail.name_interesse = type.int_name;
      this.mail.mailSubject = 'Interesse an Ihrem ' + this.mail.interesse_type + ' ' + this.mail.name_interesse;
      let inv_Mail = mainBetribe.betkommDTOList.filter(value => value.kommunikationsart == 0);
      this.mail.accept_link = 'mailto:' + inv_Mail[0].wert;
      this.mail.leiter_mitarbeiter = 'mailto:' + inv_Mail[0].wert;
    } else if (type == 'changes') {
      this.mail.mail_type = type;
      this.mail.interesse_type = 'forBenutzer123';
      this.mail.mailSubject = 'Change Request';
    } else if (type == 'changes_view') {
      this.mail.interesse_type = 'forBenutzer';
      this.mail.mail_type = 'changes';
      this.mail.mailSubject = 'Change Request';
    } else if (type == 'invitation-again') {
      this.mail.mail_type = type;
      this.mail.mailSubject = type;
      if (leitung.rolle == 'B') {
        this.roll = 'Leiter';
        this.mail.leiter_mitarbeiter = 'leiter';
      } else {
        this.roll = 'Mitarbeiter';
        this.mail.leiter_mitarbeiter = 'mitarbeiter';
      }
    } else if (type == 'Gescheftb_reminder') {
      this.mail.mail_type = type;
    } else if (type.type == 'mitbetrieb impressum invite') {
      let inv_Mail = mainBetribe.betkommDTOList.filter(value => value.kommunikationsart == 0);
      this.mail.accept_link = 'mailto:' + inv_Mail[0].wert;
      this.mail.mail_type = type.type;
      this.mail.produktname = type.int_name;
    }

    /*
            give object to service
    */

    if (type.type == 'interesse' || type.type == 'mitbetrieb impressum invite') {
      this.mailService.createHtmlMailInterest(this.mail).subscribe(
        () => {
          this.mail = new HtmlMail();
          if (type == 'changes') {
            Swal.fire({
              title: 'Änderungsantrag übermittelt',
              text: 'Wir werden Ihre Angaben innerhalb von 48 Stunden prüfen und ggf. freischalten.',
              type: 'success',
              showCancelButton: false,
            }).then(result => {});
          }
        },
        error => {
          if (type == 'changes') {
            Swal.fire({
              title: 'Change Request Failure!',
              text: 'Change request failure, please try after sometime.',
              type: 'warning',
              showCancelButton: false,
            }).then(result => {});
          }
        }
      );
    } else {
      this.mailService.createHtmlMail(this.mail).subscribe(
        () => {
          this.mail = new HtmlMail();
          if (type == 'changes') {
            Swal.fire({
              title: 'Änderungsantrag übermittelt',
              text: 'Wir werden Ihre Angaben innerhalb von 48 Stunden prüfen und ggf. freischalten.',
              type: 'success',
              showCancelButton: false,
            }).then(result => {});
          }
        },
        error => {
          if (type == 'changes') {
            Swal.fire({
              title: 'Change Request Failure!',
              text: 'Change request failure, please try after sometime.',
              type: 'warning',
              showCancelButton: false,
            }).then(result => {});
          }
        }
      );
    }

    return true;
  }
}
