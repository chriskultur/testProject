import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Mitarbeiter} from 'app/shared/models/mitarbeiter.model';
import {Bp} from 'app/shared/models/bp.model';
import {Betrieb} from 'app/shared/models/betrieb.model';
import {MitarbeiterService} from 'app/shared/services/mitarbeiter.service';
import {BetriebService} from 'app/shared/services/betrieb.service';
import {MailService} from 'app/shared/services/mail.service';
import {EmailTemplateService} from 'app/shared/services/emailTemplate.service';

@Component({
  selector: 'app-invite-person-mitarbeiter',
  templateUrl: './invite-person-mitarbeiter.component.html',
  styleUrls: ['./invite-person-mitarbeiter.component.scss', '../../../../../../../node_modules/sweetalert2/src/sweetalert2.scss'],
})
export class InvitePersonMitarbeiterComponent implements OnInit {
  closeResult: string;
  txtMsg: string;

  @Input() invitePerson: Mitarbeiter;
  @Input() aktiveUser: Bp;
  @Input() editBetribe: Betrieb;
  @Output() invitedPerson: EventEmitter<any> = new EventEmitter<any>();
  aktivBetrieb: { betriebsId: number } = { betriebsId: null };

  constructor(
    private modalService: NgbModal,
    private mitarbeiterService: MitarbeiterService,
    private betriebService: BetriebService,
    private mailService: MailService,
    private emailTemplateService: EmailTemplateService
  ) {}

  ngOnInit(): void {
    // let mailList = this.invitePerson.mitkomunikationDTOList.filter(value => value.kommunikationsart == 0 || value.kommunikationsart == 1 || value.kommunikationsart == 2);
    // this.invitationEmail = mailList[0].wert;
    this.aktivBetrieb.betriebsId = this.editBetribe.id;
  }

  open(content) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  sendInviteMail() {
    this.emailTemplateService.sendMail(
      this.invitePerson,
      this.invitePerson.email,
      this.editBetribe.betriebsname,
      this.txtMsg,
      this.aktiveUser,
      this.editBetribe,
      'invitation'
    );
    this.invitedPerson.emit(this.invitePerson);
  }

  onQuill2(html: any) {
    this.txtMsg = html;
  }

  messageTemplateSelected(text, tp) {
    this.txtMsg = text;
  }
}
