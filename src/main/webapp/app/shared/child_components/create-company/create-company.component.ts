import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BpService} from 'app/shared/services/bp.service';
import {prodHTTPService} from 'app/shared/services/production.business-logic.service';
import {Betrieb, Betriebebild} from 'app/shared/models/betrieb.model';
import {Bp, BpImage} from 'app/shared/models/bp.model';
import {BpBetVerknupfung} from 'app/shared/models/bpBetVerknupfung.model';
import {BpBet} from 'app/shared/models/bpBet.model';
import {Liland} from 'app/shared/models/liland.model';
import {Betmitbild, Mitarbeiter, MitkomunikationDTOList} from 'app/shared/models/mitarbeiter.model';
import {BetriebService} from 'app/shared/services/betrieb.service';
import {AccountService} from 'app/core/auth/account.service';
import {BpBetVerknupfungService} from 'app/shared/services/bpBetVerknupfung.service';
import {AdresseService} from 'app/shared/services/adresse.service';
import {BpBetService} from 'app/shared/services/bpBet.service';
import {RechtformService} from 'app/shared/services/rechtform.service';
import {MitarbeiterService} from 'app/shared/services/mitarbeiter.service';
import {Actioncode, Freigabe} from 'app/shared/enum/enum.model';
import {rechform} from 'app/shared/models/rechtform.model';
import {Account} from 'app/core/auth/account.model';
import {DashboardModel} from 'app/shared/models/dashboard.model';
import {Stage} from 'app/shared/models/stage.model';
import {MitarbeiterBilderService} from 'app/shared/services/mitarbeiter_bilder.service';
import {ProduktionTabObj} from 'app/shared/models/production.model';
import {Werksangaben} from 'app/shared/models/werksangaben.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss'],
  providers: [BpService, prodHTTPService],
  encapsulation: ViewEncapsulation.None,
})
export class CreateCompanyComponent implements OnInit {
  account: Account;
  status: DashboardModel;
  check: any = false;
  newbetrieb: Betrieb = new Betrieb();
  searching = false;
  searchFailed = false;
  foundInCrowdList = false;
  routerId: string;
  bpimage: BpImage = new BpImage();
  betrieb: Betrieb[] = [];
  betriebeVer: { betrieb: Betrieb; verknupfung: BpBetVerknupfung }[] = [];
  betriebImage: Betriebebild;
  full: boolean = false;
  betriebFull: boolean = false;
  imagePlaceholder: boolean;
  produktions: ProduktionTabObj[] = [];
  werksAngabens: Werksangaben[] = [];
  spielstaetten: Stage[] = [];
  angebots = [];
  editedWerksAngaben = [];
  customObject = [];
  productionWithAngebots = [];
  BetMitImage: Betmitbild[] = [];
  BetleitImage: Betmitbild[] = [];
  validateHauptadresse: boolean = false;
  validateLeiter: boolean = false;
  verknupfungBetrieb: BpBetVerknupfung = new BpBetVerknupfung();
  benutzer: Bp;
  clickedItem: {
    value: string;
    id: number;
  }[];
  clickedBetrieb: {
    value: string;
    id: number;
  }[];
  toClear: any = null;

  userId = 999;
  globalChoice: string = 'Betrieb';
  Choice: boolean = true;
  // @ts-ignore
  @ViewChild('searchFriends') search_friends: ElementRef;
  closeResult: string;
  // liland: Liland[] = [];
  Betriebgesucht: Betrieb = null;
  loadedBetribeMitarbiter: Mitarbeiter[] = [];
  loadedBetribeLeiter: Mitarbeiter[] = [];
  loadedeBetribeAddress;
  loadedBetribeKonto;
  loadedBetriebe: Betrieb = null;
  betribeLiland: any;
  navigation: boolean = true;
  support: boolean = false;
  production: boolean = false;
  stage: boolean = false;
  werk: boolean = false;

  searchedBetriebe: Betrieb[] = [];
  searchedProduction: ProduktionTabObj[] = [];
  searchedSpiel: Stage[] = [];
  position = 'bottom-right';
  mitarbeiter: Mitarbeiter[] = [new Mitarbeiter()];
  leiter: Mitarbeiter[] = [new Mitarbeiter()];
  mitVerknupfCheck: { check: string; id: number }[] = [];
  leiterVerknupfCheck: { check: string; id: number }[] = [];
  verknupft: boolean = false;
  clickOnVerknupf: boolean = false;
  impressumbetrieb: boolean = false;
  // @ts-ignore
  @ViewChild('notificationPopUp') openModalForNotification: ElementRef;
  isLoading: boolean = false;
  showBetModal: boolean = false;
  displayInfo = null;
  alreadyPartOfBetrieb: number = null;
  existingCompanyForNewLandCreate: Betrieb[] = [];
  createNewLandComapany: boolean = false;

  @Input() liland: Array<Liland> = [];
  @Input() listerform: Array<rechform> = [];
  @Input() bp: Bp;
  @Input() aktivBetrieb: BpBet;
  @Input() aktivBetriebObject: Betrieb;

  constructor(
    private principal: AccountService,
    private modalService: NgbModal,
    private router: Router,
    private betriebService: BetriebService,
    private verknupfungService: BpBetVerknupfungService,
    private aktiv_betriebService: BpBetService,
    private prodHttpService: prodHTTPService,
    private betriebAdresseService: AdresseService,
    private bpService: BpService,
    private listerformService: RechtformService,
    private mitarbeiterService: MitarbeiterService,
    private mitarbeiterBildService: MitarbeiterBilderService
  ) {}

  ngOnInit() {}

  loadImage(bpimage: BpImage) {
    this.bpimage = bpimage;
  }

  checkBetriebFull(id: number) {
    this.betriebService.checkBetriebValidation(id).subscribe((check: boolean) => {
      this.betriebFull = check;
    });
  }

  selectedItem(item, search) {
    item.preventDefault();
    if (this.globalChoice == 'Betrieb') {
      this.toClear = null;
      let id = this.searchedBetriebe.filter(betriebe => betriebe.betriebsname == item.item.name)[0].id;
      this.router.navigate(['/betrieb_view', this.betriebService.sanitizeForRoute(item.item), id]);
    } else if (this.globalChoice == 'Benutzer') {
      this.toClear = null;
      this.router.navigate(['/user/userprofile_view', this.clickedItem.filter((value: any) => value.value == item.item)[0].id]);
    } else if (this.globalChoice == 'Produktion') {
      let index = this.searchedProduction.filter(werk => werk.interne_bezeichnung_der_produkts == item.item)[0].id;
      this.toClear = null;
      this.router.navigate(['/production-view', this.betriebService.sanitizeForRoute(item.item), index]);
    } else if (this.globalChoice == 'Spielstätte') {
      let index = this.searchedSpiel.filter(spiel => spiel.spielbezeichnung == item.item)[0].id;
      this.toClear = null;
      this.router.navigate(['/stage-view', this.betriebService.sanitizeForRoute(item.item), index]);
      search.value = '';
    }
  }

  stringImage() {
    return 'data:' + this.bpimage.bildContentType + ';base64,' + this.bpimage.bild;
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

  toolTipText(validate: boolean) {
    if (validate) {
      return 'Bitte legen Sie erst einen Betrieb an';
    } else {
      return null;
    }
  }

  hideResultBox(val) {
    this.showBetModal = false;
    this.searchFailed = false;
  }

  resultnotFound(event) {
    this.searchFailed = true;
    this.newbetrieb.betriebsname = event.searchString;
    if (event.matchedBetId) {
      this.betriebService.searchdynamicExcatName(event.searchString).subscribe(betList => {
        if (betList.length != 0) {
          this.createNewLandComapany = true;
          this.existingCompanyForNewLandCreate = betList;
        }
      });
      // this.filterLand(event.matchedBetId._source.betriebAdresseSearchDTO.liste_land_glieds_bezeichnung)
    } else {
      this.existingCompanyForNewLandCreate = [];
      this.createNewLandComapany = false;
    }
  }

  checkBetLandExistInDBBetList(id) {
    return this.existingCompanyForNewLandCreate.filter(value => value.listeLandsId == id).length == 0;
  }

  resultNotFoundInCrowd(event) {
    this.foundInCrowdList = event.val;
  }

  selectedItemBetrieb(item) {
    this.searchFailed = false;
    this.isLoading = true;
    this.showBetModal = false;
    this.mitVerknupfCheck = [];
    this.leiterVerknupfCheck = [];
    this.loadedBetribeLeiter = [];
    this.loadedBetribeMitarbiter = [];
    this.Betriebgesucht = item;
    this.loadedBetriebe = item;
    this.alreadyPartOfBetrieb = null;
    this.mitarbeiterService.checkBenWithMitEmail().subscribe((mitarbeiter: any[]) => {
      if (mitarbeiter.filter(mitarbeiter => mitarbeiter.betriebId == this.Betriebgesucht.id).length != 0) {
        this.alreadyPartOfBetrieb = mitarbeiter.filter(mitarbeiter => mitarbeiter.betriebId == this.Betriebgesucht.id)[0].id;
      }
    });

    // this.Betriebgesucht = this.clickedBetrieb.filter((value: any) => value.value == item.item.name)[0]; by Parth
    this.betriebService.getBetBildCrowd(this.Betriebgesucht.id).subscribe((bild: Betriebebild[]) => {
      this.imagePlaceholder = false;
      if (bild.length != 0) {
        if (bild[0].media != null) {
          this.imagePlaceholder = true;
          this.betriebImage = bild[0];
        }
      }
    });

    this.verknupfungService
      .queryAnleger({
        bpsId: this.bp.id,
        betriebsId: this.loadedBetriebe.id,
        verknupfungequals: 'MITARBEITERVERKNUEPFUNG',
      })
      .subscribe((response: BpBetVerknupfung[]) => {
        let checkMitarbeiter: BpBetVerknupfung[] = response;
        this.verknupft = checkMitarbeiter.length != 0;
      });
    this.loadedBetribeKonto = this.loadedBetriebe.betkommDTOList;
    this.betriebAdresseService.queryCrowd({ betriebsId: this.loadedBetriebe.id }).subscribe(res => {
      let add = res;
      let index = add.findIndex(value => value.adressart == 0);
      this.loadedeBetribeAddress = add[index];
      this.betribeLiland = this.liland.filter(value => value.id == this.loadedeBetribeAddress.listeLandsId)[0];
    });
    this.impressumbetrieb = this.loadedBetriebe.betriebsverwaltungCode == 0;
    this.mitarbeiterService.queryCrowd({ betriebId: this.loadedBetriebe.id }).subscribe(res => {
      this.loadedBetribeLeiter = res.filter(leiter => leiter.rolle == 'B');
      this.loadedBetribeMitarbiter = res.filter(leiter => leiter.rolle == 'M');
      this.BetleitImage = [];
      this.BetMitImage = [];
      for (let i = 0; i < this.loadedBetribeLeiter.length; i++) {
        this.BetleitImage.push(new Betmitbild(null, null, null, null, null, this.loadedBetribeLeiter[i].id, null, null, null, null, 0));
        if (this.loadedBetribeLeiter[i].id != null) {
          this.mitarbeiterBildService.queryCrowd({ mitarbeitersId: this.loadedBetribeLeiter[i].id }).subscribe((bild: Betmitbild[]) => {
            if (bild.length != 0) {
              let index = this.BetleitImage.findIndex(bild => bild.mitarbeitersId == this.loadedBetribeLeiter[i].id);
              this.BetleitImage[index] = bild[0];
            }
          });
          this.leiterVerknupfCheck.push({ check: '0', id: this.loadedBetribeLeiter[i].id });
          this.checkVerknupfung(this.loadedBetribeLeiter[i].id, 'B', i);
        }
      }
      for (let m = 0; m < this.loadedBetribeMitarbiter.length; m++) {
        this.BetMitImage.push(new Betmitbild(null, null, null, null, null, this.loadedBetribeMitarbiter[m].id, null, null, null, null, 0));
        if (this.loadedBetribeMitarbiter[m].id != null) {
          this.mitarbeiterBildService.queryCrowd({ mitarbeitersId: this.loadedBetribeMitarbiter[m].id }).subscribe((bild: Betmitbild[]) => {
            if (bild.length != 0) {
              let index = this.BetMitImage.findIndex(bild => bild.mitarbeitersId == this.loadedBetribeMitarbiter[m].id);
              this.BetMitImage[index] = bild[0];
            }
          });
          this.mitVerknupfCheck.push({ check: '0', id: this.loadedBetribeMitarbiter[m].id });
          this.checkVerknupfung(this.loadedBetribeMitarbiter[m].id, 'M', m);
        }
      }
    });
    this.isLoading = false;
    this.showBetModal = true;
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  checkIfCompanyImageExists() {
    if (this.betriebImage != null) {
      return true;
    }
  }

  open(content) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
        // this.reload();
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        // this.reload();
      }
    );
  }

  saveBetrieb(type: string) {
    if (type == 'Betrieb') {
      this.newbetrieb.id = null;
      this.newbetrieb.betriebkatDTOList = [];
      this.newbetrieb.betkommDTOList = [];
      this.newbetrieb.bankverDTOList = [];
      this.newbetrieb.schlagwortDTOList = [];
      this.newbetrieb.freigabebank = Freigabe.GESCHAEFTSPARTNER;
      this.newbetrieb.freigabeabteilung = Freigabe.GESCHAEFTSPARTNER;
      this.newbetrieb.freigabeduns = Freigabe.GESCHAEFTSPARTNER;
      this.newbetrieb.freigabeglaubigerid = Freigabe.GESCHAEFTSPARTNER;
      this.newbetrieb.freigabemitarbeiter = Freigabe.GESCHAEFTSPARTNER;
      this.newbetrieb.vorschlag_aktion_id = 0;
      this.newbetrieb.betriebsstatus = 0;
      this.newbetrieb.betriebsverwaltungCode = 1;
      this.newbetrieb.portalb = true;
      this.newbetrieb.mwst_befreit = false;
      this.newbetrieb.angelegtbenid = this.bp.id;
      this.newbetrieb.mitarbeiterdatenVer = false;
      this.newbetrieb.mitarbeiterbilderVer = false;
      this.newbetrieb.stornoklausel = null;
      /*let declined_message = "Der User " + this.bp.vorname + " " + this.bp.nachname + " hat den neuen Betrieb " + this.newbetrieb.betriebsname + " erstellt. Dieser muss geprüft und ggf. freigegeben werden.";
            this.emailTemplateService.sendMail(this.bp, null, null, declined_message, this.aktivBetriebObject, null, 'kontakt');*/
      this.betriebService.create(this.newbetrieb).subscribe(
        (savedBetrieb: Betrieb) => {
          this.verknupfungBetrieb = new BpBetVerknupfung(
            savedBetrieb.id,
            this.bp.id,
            null,
            'JA',
            'NEIN',
            null,
            null,
            null,
            null,
            null,
            null,
            1,
            0,
            savedBetrieb.angelegtbenid
          );
          this.verknupfungService.createMitarbeiterVerknupfung(this.verknupfungBetrieb).subscribe(
            () => {
              this.aktiv_betriebService
                .query({
                  bpsId: this.bp.id,
                })
                .subscribe((response: BpBet[]) => {
                  if (response.length == 0) {
                    let bpBetObject = {
                      betriebsId: savedBetrieb.id,
                      bpsId: this.bp.id,
                      id: null,
                      angelegter: null,
                      betriebsname: savedBetrieb.betriebsname,
                      betriebstatus: savedBetrieb.betriebsstatus,
                    };
                    this.aktiv_betriebService.create(bpBetObject).subscribe();
                  }
                  this.router.navigate(['/betriebe'], {
                    fragment: this.newbetrieb.betriebsname,
                    queryParams: { id: savedBetrieb.id },
                  });
                });
            },
            error => {
              Swal.fire('Fehler aufgetreten!', ' Leider ist etwas schief gelaufen. Bitte versuchen Sie es erneut..', 'warning').then();
            }
          );
        },
        error => {
          Swal.fire('Fehler aufgetreten!', ' Leider ist etwas schief gelaufen. Bitte versuchen Sie es erneut..', 'warning').then();
        }
      );
    } else if (type == 'Leiter') {
      let toinit: Mitarbeiter = new Mitarbeiter();
      toinit.rolle = 'B';
      toinit.beschaeftigungsart = 0;
      toinit.betriebId = this.Betriebgesucht.id;
      toinit.zustandDTOList = [];
      toinit.mitadresseDTOList = [];
      toinit.vorname = this.bp.vorname;
      toinit.nachname = this.bp.nachname;
      toinit.anrede = this.bp.anrede;
      toinit.titel = this.bp.titel;
      toinit.mitkomunikationDTOList = [];
      toinit.einladungBetrieb = null;
      if (this.bp.email != null && this.bp.email != '') {
        toinit.email = this.bp.email;
      }
      if (this.bp.telefon != null && this.bp.telefon != '') {
        toinit.mitkomunikationDTOList.push(new MitkomunikationDTOList(Actioncode.create, 0, null, 0, null, this.bp.telefon));
      }
      if (this.bp.mobil != null && this.bp.mobil != '') {
        toinit.mitkomunikationDTOList.push(new MitkomunikationDTOList(Actioncode.create, 0, null, 2, null, this.bp.mobil));
      }
      if (toinit.mitkomunikationDTOList.length == 0) {
        toinit.mitkomunikationDTOList.push(new MitkomunikationDTOList(Actioncode.unchanged, 0, null, 1, null, null));
      }
      toinit.vorname = this.bp.vorname;
      toinit.benid = this.bp.id;
      this.mitarbeiterService.create(toinit).subscribe((mitarbeiter: Mitarbeiter) => {
        /*// assign "Betriebsleiter" right to leiter for camunda
                this.mitarbiterRechtCode = new MitarbiterRechtModel('Betriebsleiter', null, null, null, mitarbeiter.id, 0);
                this.mitarbeiterService.assignRechtToLeiter(this.mitarbiterRechtCode).subscribe((res) => {
                    ;
                });*/
        this.verknupfungBetrieb = new BpBetVerknupfung(
          this.Betriebgesucht.id,
          this.bp.id,
          null,
          'JA',
          'NEIN',
          null,
          null,
          mitarbeiter.id,
          null,
          null,
          null,
          0,
          0,
          this.Betriebgesucht.angelegtbenid
        );
        this.verknupfungService.createMitarbeiterVerknupfung(this.verknupfungBetrieb).subscribe(() => {
          this.bpService.queryImage().subscribe((benutzer_bild: BpImage) => {
            let mitarbeiterbild: Betmitbild = new Betmitbild();
            mitarbeiterbild.bild = benutzer_bild.bild;
            mitarbeiterbild.bildContentType = benutzer_bild.bildContentType;
            mitarbeiterbild.mitarbeitersId = mitarbeiter.id;
            mitarbeiterbild.vorschlag_aktion_id = 0;
            this.mitarbeiterService.createImageAfterVerknupfung(mitarbeiterbild).subscribe(() => {});
          });
          // this.reload();
        });
      });
    } else if (type == 'Mitarbeiter') {
      let toinit: Mitarbeiter = new Mitarbeiter();
      toinit.rolle = 'M';
      toinit.beschaeftigungsart = 0;
      toinit.betriebId = this.Betriebgesucht.id;
      toinit.zustandDTOList = [];
      toinit.mitadresseDTOList = [];
      toinit.vorname = this.bp.vorname;
      toinit.nachname = this.bp.nachname;
      toinit.anrede = this.bp.anrede;
      toinit.titel = this.bp.titel;
      toinit.mitkomunikationDTOList = [];
      toinit.einladungBetrieb = null;
      if (this.bp.email != null && this.bp.email != '') {
        toinit.email = this.bp.email;
      }
      if (this.bp.telefon != null && this.bp.telefon != '') {
        toinit.mitkomunikationDTOList.push(new MitkomunikationDTOList(Actioncode.create, 0, null, 0, null, this.bp.telefon));
      }
      if (this.bp.mobil != null && this.bp.mobil != '') {
        toinit.mitkomunikationDTOList.push(new MitkomunikationDTOList(Actioncode.create, 0, null, 2, null, this.bp.mobil));
      }
      if (toinit.mitkomunikationDTOList.length == 0) {
        toinit.mitkomunikationDTOList.push(new MitkomunikationDTOList(Actioncode.unchanged, 0, null, 1, null, null));
      }
      toinit.vorname = this.bp.vorname;
      toinit.benid = this.bp.id;
      this.mitarbeiterService.create(toinit).subscribe((mitarbeiter: Mitarbeiter) => {
        this.verknupfungBetrieb = new BpBetVerknupfung(
          this.Betriebgesucht.id,
          this.bp.id,
          null,
          'JA',
          'NEIN',
          null,
          null,
          mitarbeiter.id,
          null,
          null,
          null,
          0,
          0,
          this.Betriebgesucht.angelegtbenid
        );
        this.verknupfungService.createMitarbeiterVerknupfung(this.verknupfungBetrieb).subscribe(() => {
          this.bpService.queryImage().subscribe(
            (benutzer_bild: BpImage) => {
              let mitarbeiterbild: Betmitbild = new Betmitbild();
              mitarbeiterbild.bild = benutzer_bild.bild;
              mitarbeiterbild.bildContentType = benutzer_bild.bildContentType;
              mitarbeiterbild.mitarbeitersId = mitarbeiter.id;
              mitarbeiterbild.vorschlag_aktion_id = 0;
              this.mitarbeiterService.createImageAfterVerknupfung(mitarbeiterbild).subscribe(() => {});
            },
            () => {}
          );
          // this.reload();
        });
      });
    } else if (type == 'existing') {
      this.verknupfungBetrieb = new BpBetVerknupfung(
        this.Betriebgesucht.id,
        this.bp.id,
        null,
        'JA',
        'NEIN',
        null,
        null,
        this.alreadyPartOfBetrieb,
        null,
        null,
        null,
        0,
        0,
        this.Betriebgesucht.angelegtbenid
      );
      this.verknupfungService.createMitarbeiterVerknupfung(this.verknupfungBetrieb).subscribe(() => {});
    }
  }

  navigateAfterSave() {
    this.reload();
  }

  reload() {
    location.reload();
  }

  getImageforleiter(id: number) {
    let leiter = this.BetleitImage.find(x => x.mitarbeitersId == id);
    let imageString = 'data:' + leiter.bildContentType + ';base64,' + leiter.bild;
    return imageString;
  }

  getImageforMitarbeiter(id: number) {
    let mitarbeiter = this.BetMitImage.find(x => x.mitarbeitersId == id);
    let imageString = 'data:' + mitarbeiter.bildContentType + ';base64,' + mitarbeiter.bild;
    return imageString;
  }

  checkIfImageExistsLeiter(id: number) {
    if (this.BetleitImage.filter(e => e.mitarbeitersId == id && e.bild != null).length > 0) {
      return true;
    }
  }

  checkIfImageExistsMit(id: number) {
    return this.BetMitImage.filter(e => e.mitarbeitersId == id && e.bild != null).length != 0;
  }

  checkVerknupfung(mit: number, tp, index) {
    this.verknupfungService
      .queryAnleger({
        mitarbeitersId: mit,
        betriebsId: this.Betriebgesucht.id,
      })
      .subscribe((response: BpBetVerknupfung[]) => {
        let res = response;
        if (res.length != 0) {
          if (tp == 'B') {
            if (
              (res[0].freigabeBenutzer === 'JA' && res[0].freigabeBetrieb === 'JA') ||
              (res[0].freigabeBenutzer === 'NEIN' && res[0].freigabeBetrieb === 'JA')
            ) {
              this.leiterVerknupfCheck[index].check = '1';
            } else {
              this.leiterVerknupfCheck[index].check = '2';
            }
          } else {
            if (
              (res[0].freigabeBenutzer === 'JA' && res[0].freigabeBetrieb === 'JA') ||
              (res[0].freigabeBenutzer === 'NEIN' && res[0].freigabeBetrieb === 'JA')
            ) {
              this.mitVerknupfCheck[index].check = '1';
            } else {
              this.mitVerknupfCheck[index].check = '2';
            }
          }
        }
      });
  }

  connectwithMitarbeiter(mitId: number) {
    let verknupfung: BpBetVerknupfung = new BpBetVerknupfung();
    verknupfung.betriebsId = this.Betriebgesucht.id;
    verknupfung.bpsId = this.bp.id;
    verknupfung.freigabeBenutzer = 'JA';
    verknupfung.freigabeBetrieb = 'NEIN';
    verknupfung.mitarbeitersId = mitId;
    verknupfung.verknupfungsart = 0;
    verknupfung.vorschlag_aktion_id = 0;
    verknupfung.angelegter = this.Betriebgesucht.angelegtbenid;
    this.verknupfungService.createMitarbeiterVerknupfung(verknupfung).subscribe((bpbetverk: BpBetVerknupfung) => {
      //this.mitVerknupfCheck.push(bpbetverk);
      this.verknupft = true;
      this.clickOnVerknupf = true;
      this.reload();
    });
  }
}
