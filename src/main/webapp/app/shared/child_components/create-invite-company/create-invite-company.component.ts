import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {Adresse} from 'app/shared/models/adresse.model';
import {Actioncode, Freigabe, Kommunikationsart, Ligsb} from 'app/shared/enum/enum.model';
import {Mitarbeiter, MitEinladenDTOModel} from 'app/shared/models/mitarbeiter.model';
import {betkomm, Betrieb} from 'app/shared/models/betrieb.model';
import {listStringEnumMembers} from 'app/shared/util/enum-util';
import {AdresseService} from 'app/shared/services/adresse.service';
import {Bp} from 'app/shared/models/bp.model';
import {MitarbeiterService} from 'app/shared/services/mitarbeiter.service';
import {EmailTemplateService} from 'app/shared/services/emailTemplate.service';
import {GescheftbDTO} from 'app/shared/models/gescheftbDTO.model';
import {BetriebService} from 'app/shared/services/betrieb.service';
import {HtmlMail} from 'app/shared/models/htmlMail.model';
import Swal from 'sweetalert2';
import {sortSuggestion} from 'app/shared/util/sort-util';
import {BpBet} from 'app/shared/models/bpBet.model';

@Component({
  selector: 'app-create-invite-company',
  templateUrl: './create-invite-company.component.html',
  styleUrls: ['./create-invite-company.component.scss'],
})
export class CreateInviteCompanyComponent implements OnInit {
  closeResult: string;
  modalOption: NgbModalOptions = {};
  keys;
  aktivBetrieb: BpBet = new BpBet(null, null, null, null, null, null);
  newBetribeId: Betrieb;
  newBetribeEmail: betkomm = new betkomm(Actioncode.create, null, 0, null, 0, null);
  newBetribeTelphone: betkomm = new betkomm(Actioncode.create, null, 0, null, 3, null);
  selectedLand;
  hauptadresse = new Adresse('Hauptadresse', 0, null, 0, null, null, null, null, null, null, null, null, null, null, null, null);
  leitung: Mitarbeiter = new Mitarbeiter(
    null,
    null,
    null,
    0,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    [],
    [],
    null,
    null,
    'B',
    null,
    'betrieb_angelegt',
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    [],
    null
  );
  kommunikations_art = listStringEnumMembers(Kommunikationsart);
  miteinLadStatus: MitEinladenDTOModel = new MitEinladenDTOModel(null, null, null, null, null);

  mail: HtmlMail = new HtmlMail(null, null, null, null, null);
  mailRegistrationLink;
  closeModal: any;
  aktiveBetribeObject: Betrieb;

  @Input() newCompanyObject: Betrieb;
  @Input() user: Bp;
  @Input() gsbCodeObject: GescheftbDTO;
  @Output() invitation: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeModalForAnge: EventEmitter<any> = new EventEmitter<any>();
  @Output() clearBetriebsname: EventEmitter<any> = new EventEmitter<any>();
  @Input() rechtForm;
  @Input() landList;
  @Input() typeOfCall;

  constructor(
    private modalService: NgbModal,
    private mitarbeiterService: MitarbeiterService,
    private betriebService: BetriebService,
    private adresseService: AdresseService,
    private emailTemplateService: EmailTemplateService
  ) {}

  ngOnInit(): void {
    this.keys = listStringEnumMembers(Ligsb);
    this.aktivBetrieb.betriebsId = this.gsbCodeObject.betriebsId;
    this.betriebService.find(this.gsbCodeObject.betriebsId).subscribe(res => {
      this.aktiveBetribeObject = res;
      this.aktivBetrieb.betriebsId = res.id;
      this.aktivBetrieb.betriebsname = res.betriebsname;
      this.aktivBetrieb.betriebstatus = res.betriebsstatus;
    });
    this.landList = sortSuggestion(this.landList);
    this.selectedLand = this.landList[0];
  }

  emitforHide() {
    this.closeModalForAnge.emit(true);
  }

  open(content) {
    this.closeModal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
    this.closeModal.result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  open2(content) {
    this.closeModal = this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
    this.closeModal.result.then(
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

  saveCompany() {
    this.newCompanyObject.freigabemitarbeiter = Freigabe.GESCHAEFTSPARTNER;
    this.newCompanyObject.freigabeglaubigerid = Freigabe.GESCHAEFTSPARTNER;
    this.newCompanyObject.freigabeduns = Freigabe.GESCHAEFTSPARTNER;
    this.newCompanyObject.freigabeabteilung = Freigabe.GESCHAEFTSPARTNER;
    this.newCompanyObject.freigabebank = Freigabe.GESCHAEFTSPARTNER;
    this.newCompanyObject.betkommDTOList.push(this.newBetribeEmail);
    this.newCompanyObject.betkommDTOList.push(this.newBetribeTelphone);
    this.newCompanyObject.mwst_befreit = false;
    this.newCompanyObject.listeLandsId = this.selectedLand.id;
    this.newCompanyObject.betriebsstatus = 0;
    this.newCompanyObject.mitarbeiterdatenVer = false;
    this.newCompanyObject.mitarbeiterbilderVer = false;
    this.newCompanyObject.betriebsverwaltungCode = 1;
    this.newCompanyObject.stornoklausel = null;
    this.betriebService.create(this.newCompanyObject).subscribe(res => {
      this.newBetribeId = res;
      this.hauptadresse.betriebsId = res.id;
      this.hauptadresse.listeLandsId = this.selectedLand.id;
      this.adresseService.create(this.hauptadresse).subscribe(Adres => {});

      this.leitung.betriebId = res.id;
      this.leitung.status = 'betrieb_angelegt';
      this.leitung.einladungBetrieb = 'create-invite';
      this.mitarbeiterService.create(this.leitung).subscribe((response: Mitarbeiter) => {
        this.miteinLadStatus.mitarbeiterEingeladen = response.id;
        this.miteinLadStatus.betriebEingeladen = this.newBetribeId.id;
        this.miteinLadStatus.einladstatus = '0';
        this.miteinLadStatus.von_benutzer_id = this.user.id;
        this.mitarbeiterService.einladStatusCreate(this.miteinLadStatus).subscribe(res => {});
      });
      this.gsbCodeObject.nachbetriebidId = this.newBetribeId.id;
      this.gsbCodeObject.betriebsname = this.newBetribeId.betriebsname;
      this.gsbCodeObject.einladungStatus = 1;
      this.betriebService.createConnection(this.gsbCodeObject).subscribe(value => {});
    });
  }

  sendMail() {
    this.closeModalForAnge.emit(false);
    this.emailTemplateService.sendMail(
      this.leitung,
      this.leitung.email,
      this.newBetribeId.betriebsname,
      this.mail.txtMsg,
      this.user,
      this.aktiveBetribeObject,
      'invitation'
    );
    this.invitation.emit({ betirebsid: this.newBetribeId.id, assignType: this.typeOfCall, betribeObj: this.newBetribeId });
  }

  onQuill(html: any) {
    this.mail.txtMsg = html;
  }

  openConfirmsSwal(connection) {
    setTimeout(() => {
      Swal.fire({
        title: 'Einladen?',
        text: 'Laden Sie den Betrieb ins eKulturPortal ein, um direkt mit ihm interagieren zu können',
        type: 'info',
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonColor: '#f28d35',
        cancelButtonColor: '#9c9c9c',
        cancelButtonText: 'Nein',
        confirmButtonText: 'Ja, einladen',
      })
        .then(
          result => {
            if (result.value) {
              this.open(connection);
            }
          },
          dismiss => {}
        )
        .catch();
    }, 1000);
  }

  clearAllModel(type?: any) {
    this.closeModalForAnge.emit(false);
    this.newCompanyObject.betriebsname = null;
    this.gsbCodeObject.gSbCode = null;
    this.newBetribeEmail = new betkomm(Actioncode.create, null, 0, null, 0, null);
    this.newBetribeTelphone = new betkomm(Actioncode.create, null, 0, null, 3, null);
    this.hauptadresse = new Adresse('Hauptadresse', 0, null, 0, null, null, null, null, null, null, null, null, null, null, null, null);
    this.leitung = new Mitarbeiter(
      null,
      null,
      null,
      0,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      [],
      [],
      null,
      null,
      'B',
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      [],
      null
    );
    this.clearBetriebsname.emit();
  }

  messageTemplateSelected(text) {
    this.mail.txtMsg = (this.mail.txtMsg != null ? this.mail.txtMsg : '') + text;
  }
}
