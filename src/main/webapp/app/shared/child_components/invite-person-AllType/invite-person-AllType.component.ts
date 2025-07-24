import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-invite-person-AllType',
  templateUrl: './invite-person-AllType.component.html',
  styleUrls: ['./invite-person-AllType.component.scss', '../../../../../../../node_modules/sweetalert2/src/sweetalert2.scss'],
})
export class InvitePersonAllTypeComponent implements OnInit {
  closeResult: string;
  textMessage: string;

  @Input() warningMessage: string;
  @Input() nachname: string;
  @Input()  vorname: string;
  @Input() email: string;

  @Output() sendInvitationMail: EventEmitter<any> = new EventEmitter<any>();
  @Output() invitationTerminated : EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    // some place we have vorname and nachname in one field
    if(this.vorname != null && this.nachname != null && this.vorname == this.nachname){
      this.vorname = this.vorname.split(' ')[0];
      let tempName = this.nachname.split(' ');
      if(tempName.length > 2) {
        const temp = tempName.shift();
        this.nachname = tempName.join(' ');
      } else {
        this.nachname = this.nachname.split(' ')[1];

      }
    }
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
    this.sendInvitationMail.emit({ vorname: this.vorname, nachname: this.nachname, email: this.email, message:this.textMessage });
  }

  onQuill2(html: any) {
    this.textMessage = html;
  }

  messageTemplateSelected(text, tp) {
    this.textMessage = text;
  }

  onAbbrechenClick(){

  }
}
