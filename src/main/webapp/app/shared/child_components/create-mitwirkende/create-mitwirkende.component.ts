import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BetMitwirkende, MitBerufTagDTO} from 'app/shared/models/bet-mitwirkend';
import {Actioncode} from 'app/shared/enum/enum.model';
import {Wertelisten} from 'app/shared/models/suggestionWertelisten.model';
import {sortSuggestion} from 'app/shared/util/sort-util';
import {prodHTTPService} from 'app/shared/services/production.business-logic.service';
import {Observable} from 'rxjs';
import {EmitType} from '@syncfusion/ej2-base';
import {FilteringEventArgs} from '@syncfusion/ej2-dropdowns';
import {AutoCompleteComponent} from '@syncfusion/ej2-angular-dropdowns';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BetriebService} from 'app/shared/services/betrieb.service';
import {Betrieb} from 'app/shared/models/betrieb.model';
import {EmailTemplateService} from 'app/shared/services/emailTemplate.service';
import {KunstlerService} from 'app/shared/services/kunstler.service';
import {DOC_ORIENTATION, NgxImageCompressService} from 'ngx-image-compress';

@Component({
  selector: 'app-create-mitwirkende',
  templateUrl: './create-mitwirkende.component.html',
  styleUrls: ['./create-mitwirkende.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateMitwirkendeComponent implements OnInit {
  newmitwirkende: Array<{
    betMit: BetMitwirkende;
    email: string;
    invite: boolean;
    invitationComplete: boolean;
    rolle: string;
    team_person: number;
    inviteType: string;
    emailResultFound: [];
    emailInValid: boolean;
    emailError: string;
    disableSelection: boolean;
  }> = [];
  public mitwirkendeExistsAlready = false;
  public mitwir_placeholder = '../../../content/images/Portrait_Placeholder.png';
  imageSizeCheck: boolean = false;
  imageFormatCheck: boolean = false;
  imageAlertPlace = null;
  entityImage: any = null;
  imageChangedEvent: any = '';
  tagOnFocus_mit = [];
  emailExistsSaveButton = true;
  personTagListe_new: MitBerufTagDTO[][] = [];
  mitwirGruppeSuggestions: Wertelisten[];
  public locale: string = 'de';
  public fields: Object = { value: 'kunstlername' };
  public data: Observable<any>;
  public autofill: Boolean = true;
  public highlight: Boolean = true;
  public betMitName: Array<string> = [];
  public kuenstlernamecheck: Array<boolean> = [];

  @Input() hideSearchResultIdList: [];
  @Input() existingEmailList: [];
  @Input() showRolleForProdMitPerson: boolean;
  @Input() allowAddMore: boolean;
  @Input() aktivBet: Betrieb;
  @Input() mitwirkendenames: { name: string; kunstlername: string }[];
  @Input() prodName: string = null;
  @Output() saveMitwirkende = new EventEmitter<any>();
  private file: any;
  public fileBlob: any;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private emailTemplateService: EmailTemplateService,
    public kunstlerService: KunstlerService,
    private prodHttpService: prodHTTPService,
    private betriebService: BetriebService,
    private http: HttpClient,
    private imageCompress: NgxImageCompressService
  ) {}

  ngOnInit() {
    this.pushMitwirkende();
    this.getMitwirkendeSuggestion();
  }

  getMitwirkendeSuggestion() {
    let queryParam = '?listeNr.equals=PP_MITWIRKENDE_GRUPPE_AUF_BUHNE';
    this.prodHttpService.getTagSuggestionsync(queryParam).subscribe(
      res => {
        this.mitwirGruppeSuggestions = sortSuggestion(res);
      },
      error => {}
    );
  }

  pushMitwirkende() {
    this.personTagListe_new.push([]);
    this.betMitName.push(null);
    this.tagOnFocus_mit.push(false);
    this.kuenstlernamecheck.push(false);
    this.newmitwirkende.push({
      betMit: new BetMitwirkende(
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
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        0,
        null,
        null,
        0,
        null,
        null,
        null,
        null,
        null,
        [],
        [],
        [],
        [],
        [],
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
      ),
      email: null,
      invite: false,
      invitationComplete: false,
      team_person: null,
      rolle: null,
      inviteType: null,
      emailResultFound: [],
      emailInValid: false,
      emailError: null,
      disableSelection: false,
    });
  }

  selectFile(event: any, $event, entity, field, isImage, content, i) {
    // console.log(event.target.files);
    this.setFileDataMitwirkendeImage($event, entity, field, isImage, content, i);
    let fileName: any;
    this.file = event.target.files[0];
    fileName = this.file['name'];

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (eventReader: any) => {
        this.compressFile(eventReader.target.result, fileName);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  compressFile(image, fileName) {
    this.imageCompress.compressFile(image, DOC_ORIENTATION.Up, 50, 50).then(compressedimage => {
      const something: string[] = compressedimage.split(';base64,');
      const type: string[] = something[0].split('data:');
      // create file from byte
      console.log('compressing');
      const imageName = fileName;
      // call method that creates a blob from dataUri
      const imageBlob = this.dataURItoBlob(compressedimage.split(',')[1], type[1]);
      this.fileBlob = imageBlob;
    });
  }

  dataURItoBlob(dataURI, type) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: type });
    return blob;
  }

  setFileDataMitwirkendeImage($event, entity, field, isImage, content, i?: number) {
    this.imageSizeCheck = false;
    this.imageAlertPlace = null;
    let imageName = null;
    let imageType = null;
    let imageSize = null;
    let imageModifiedDate = null;

    for (let k = 0; k < $event.target.files.length; k++) {
      imageName = $event.target.files[k].name;
      imageType = $event.target.files[k].type;
      imageSize = $event.target.files[k].size;
      imageModifiedDate = $event.target.files[k].lastModifiedDate;
    }

    if (
      imageType == 'image/jpeg' ||
      imageType == 'image/jpg' ||
      imageType == 'image/gif' ||
      imageType == 'image/png' ||
      imageType == 'image/bmp'
    ) {
      this.imageFormatCheck = false;
      if (imageSize > 10000000) {
        this.imageSizeCheck = true;
        this.imageAlertPlace = i;
      } else {
        this.imageSizeCheck = false;
        // this.compressImage($event, entity);
        // this.dataUtils.setFileData($event, entity, field, isImage);
        this.openImage(content, entity, i);
      }
    } else {
      this.imageFormatCheck = true;
      this.imageSizeCheck = true;
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  // compressImage($event, entity) {
  //   ImageCompressService.filesToCompressedImageSource($event.target.files).then(observableImages => {
  //     let images = [];
  //     observableImages.subscribe(
  //       image => {
  //         images.push(image);
  //       },
  //       error => {},
  //       () => {
  //         entity.bild = images[0].compressedImage.imageDataUrl.split('base64,')[1];
  //         entity.bildContentType = images[0].compressedImage.type;
  //       }
  //     );
  //   });
  // }

  imageCropped(image) {
    console.log(image);
    let justcodeimage = image.base64.split(',');
    this.entityImage.bild = justcodeimage[1];
    if (this.entityImage.id != null) {
      this.entityImage.actioncode = Actioncode.update;
    }
    this.newmitwirkende[this.entityImage.index].betMit.bild = this.entityImage.bild;
    this.newmitwirkende[this.entityImage.index].betMit.bildContentType = justcodeimage[0].split(':')[1].split(';')[0];
  }

  openImage(content, entity, i) {
    this.entityImage = entity;
    this.entityImage.index = i;
    this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  loadImageMitwir(mitwir: any) {
    return mitwir.bild == null
      ? { 'background-image': 'url(' + this.mitwir_placeholder + ')' }
      : { 'background-image': 'url(data:' + mitwir.bildContentType + ';base64,' + mitwir.bild + ')' };
  }

  loadImageMitwirMedia(mitwir: any) {
    return mitwir == null || mitwir.media == null
      ? { 'background-image': 'url(' + this.mitwir_placeholder + ')' }
      : { 'background-image': 'url(data:' + mitwir.mediaContentType + ';base64,' + mitwir.media + ')' };
  }

  trackByIndex(i: number) {
    return i;
  }

  onTagFocus3(validate: boolean, i: number) {
    this.tagOnFocus_mit[i] = validate;
  }

  removemitwirkendPerson_new(i: number) {
    if (this.newmitwirkende[i].betMit.id == null) {
      this.newmitwirkende.splice(i, 1);
    }
    this.personTagListe_new.splice(i, 1);
    this.kuenstlernamecheck.splice(i, 1);
    this.betMitName.splice(i, 1);
  }

  onQuillMitwirk(html, i) {
    this.newmitwirkende[i].betMit.kurzbeschreibung = html;
  }

  public onAddTag(item, i: number) {
    let topush = {
      actioncode: Actioncode.create,
      bezeichnung: item.bezeichnung,
      id: null,
      betriebMitwirkendeId: null,
    };
    if (this.newmitwirkende[i].betMit.mitBerufTagDTOList.filter(value => value.bezeichnung == item.bezeichnung).length == 0) {
      this.newmitwirkende[i].betMit.mitBerufTagDTOList.push(topush);
    }
  }

  public onRemoveTag(item, i: number) {
    let index = this.newmitwirkende[i].betMit.mitBerufTagDTOList.findIndex(value => value.bezeichnung == item.bezeichnung);
    if (this.newmitwirkende[i].betMit.mitBerufTagDTOList[index].id == null) {
      this.newmitwirkende[i].betMit.mitBerufTagDTOList.splice(index, 1);
    }
  }

  addTagtoInput(item: any, i: number) {
    let topush = {
      actioncode: Actioncode.create,
      bezeichnung: item.beschreibung,
      id: null,
      betriebMitwirkendeId: null,
    };
    if (this.personTagListe_new[i].filter(value => value.bezeichnung == item.beschreibung).length == 0) {
      this.personTagListe_new[i].push(topush);
      this.newmitwirkende[i].betMit.mitBerufTagDTOList.push(topush);
    }
  }

  resetMitWirkendeKunstlerConnectionData(i) {
    this.newmitwirkende[i].betMit.prodKunst_id = null;
  }

  onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs, remote: AutoCompleteComponent, i) => {
    if (e.text.length > 2) {
      this.data = this.getData(remote, e.text, i);
      e.preventDefaultAction = true;
      this.resetMitWirkendeKunstlerConnectionData(i);
    } else {
      e.cancel = true;
    }
  };

  public getData(remote: AutoCompleteComponent, text: string, i): Observable<any> {
    for (let object of this.mitwirkendenames) {
    }

    if (this.mitwirkendenames.filter(object => object.kunstlername == text.trim() || object.name == text.trim()).length != 0) {
      this.mitwirkendeExistsAlready = true;
    } else {
      this.mitwirkendeExistsAlready = false;
    }
    let stringList: Array<string> = text
      .replace(/["&/(){}[]/gi, '')
      .trim()
      .split(' ');
    let _queryText = [];
    for (let string of stringList) {
      if (string != '') {
        let keyWildcard = '*' + string + '*';
        let matchobjTemp = { query_string: {} };
        matchobjTemp.query_string['query'] = keyWildcard;
        matchobjTemp.query_string['fields'] = ['kunstlername', 'vorname', 'name', 'stadt'];
        _queryText.push(matchobjTemp);
      }
    }
    let bodyForBackend = {
      body: {
        size: 10000,
        query: {
          bool: {
            must: _queryText,
          },
        },
      },
      url: 'kunst/_search',
    };
    let url = 'services/bptab/api/public/elasticsearch/search';
    return this.http.post(url, bodyForBackend, { observe: 'response' }).pipe(
      map((data: HttpResponse<any>) => {
        let result = [];
        if (data.body.hits.hits.length != 0) {
          data.body.hits.hits.forEach(value => {
            let data = value._source;
            if (data.Media_id != null) {
              this.betriebService.getBetBildMultipleId(data.Media_id).subscribe(betbild => {
                if (betbild.length != 0) {
                  data.mediaObject = betbild[0];
                } else {
                  data.mediaObject = null;
                }
              });
            }
            if (data.kunstlername == undefined) {
              data.kunstlername = data.vorname + ' ' + data.name;
              data.kunstlernameExist = false;
            } else {
              data.kunstlernameExist = true;
              data.originalKunstlername = data.kunstlername;
              data.kunstlername = data.kunstlername + ' (' + data.vorname + ' ' + data.name + ')';
            }
            if (this.hideSearchResultIdList.filter(value => value == data.id).length == 0) {
              result.push(data);
            }
          });
          setTimeout(() => remote.showPopup(), 500);
        } else {
          remote.hidePopup();
        }

        return result;
      })
    );
  }

  savenewmitwirkende() {
    let createMitList = [];
    this.newmitwirkende.forEach((value: any, mainIndex) => {
      let spiltName = this.betMitName[mainIndex].split(' ');
      let name = '';
      if (value.betMit.prodKunst_id == null) {
        spiltName.forEach((term, index) => {
          if (index == 0) {
            value.betMit.vorname = term;
          } else {
            name = name + ' ' + term;
          }
        });
        value.betMit.name = name;
      }
      if (value.email != null && value.email != '') {
        let temp = {
          actioncode: Actioncode.create,
          betriebMitwirkendeId: null,
          id: null,
          kommunikation: 0,
          wert: value.email,
        };
        value.betMit.mitKommunikationDTOList.push(temp);
      }
      if (this.showRolleForProdMitPerson) {
        value.betMit.prodPersonRolle = value.rolle;
        value.betMit.prodTeamPerson = value.team_person;
      }
      createMitList.push(value.betMit);
    });

    this.saveMitwirkende.emit(createMitList);
  }

  selectedItem(item, index) {
    let data = item.itemData;

    this.newmitwirkende[index].betMit.prodKunst_id = data.id;
    this.newmitwirkende[index].betMit.kunstlerName = data.kunstlernameExist ? data.originalKunstlername : null;
    this.newmitwirkende[index].betMit.name = data.name;
    this.newmitwirkende[index].betMit.vorname = data.vorname;
    this.betriebService.findCrowd(data.betriebId).subscribe(betrieb => {
      this.newmitwirkende[index].betMit.kurzbeschreibung = data.kurzbeschreibung;
      if (betrieb.betkommDTOList.filter(value => value.kommunikationsart == 0).length != 0) {
        this.newmitwirkende[index].email = betrieb.betkommDTOList.filter(value => value.kommunikationsart == 0)[0].wert;
        if (this.existingEmailList.filter(email => email == this.newmitwirkende[index].email).length == 0) {
          this.emailExistsSaveButton = true;
        } else {
          this.emailExistsSaveButton = false;
        }
      } else {
        this.emailExistsSaveButton = true;
      }
      this.personTagListe_new[index] = [];
      this.newmitwirkende[index].betMit.mitBerufTagDTOList = [];
      this.newmitwirkende[index].disableSelection = true;
      this.kuenstlernamecheck[index] = data.kunstlernameExist;
      betrieb.betriebkatDTOList.forEach(value => {
        let topush = {
          actioncode: Actioncode.create,
          bezeichnung: value.bezeichnung,
          id: null,
          betriebMitwirkendeId: null,
        };
        this.personTagListe_new[index].push(topush);
        this.newmitwirkende[index].betMit.mitBerufTagDTOList.push(topush);
      });
      if (data.mediaObject) {
        this.newmitwirkende[index].betMit.bild = data.mediaObject.media;
        this.newmitwirkende[index].betMit.bildContentType = data.mediaObject.mediaContentType;
      }
    });
  }

  onEmailBlur(index) {
    if (this.newmitwirkende[index].email != '' && this.newmitwirkende[index].email != null && this.newmitwirkende[index].email.length > 5) {
      this.newmitwirkende[index].invite = false;
      this.newmitwirkende[index].inviteType = null;
      this.newmitwirkende[index].emailResultFound = [];
      this.newmitwirkende[index].emailInValid = false;
      this.newmitwirkende[index].emailError = null;
      // check email exist in mitwirkende list and new creating mitwirkende list
      if (!this.newmitwirkende[index].emailInValid) {
        this.newmitwirkende.forEach((value, arrayIndex, array) => {
          if (
            value.email != null &&
            this.newmitwirkende[index].email != null &&
            value.email.trim().toLowerCase() == this.newmitwirkende[index].email.trim().toLowerCase() &&
            arrayIndex != index
          ) {
            this.newmitwirkende[index].invite = false;
            this.newmitwirkende[index].inviteType = null;
            this.newmitwirkende[index].email = null;
            this.newmitwirkende[index].emailInValid = true;
            this.newmitwirkende[index].emailError = 'email exist';
            return;
          } else if (
            this.newmitwirkende[index].email != null &&
            this.existingEmailList.filter(
              (value: any) => value.trim().toLowerCase() == this.newmitwirkende[index].email.trim().toLowerCase()
            ).length != 0
          ) {
            this.newmitwirkende[index].invite = false;
            this.newmitwirkende[index].inviteType = null;
            this.newmitwirkende[index].email = null;
            this.newmitwirkende[index].emailInValid = true;
            this.newmitwirkende[index].emailError = 'email exist';
            return;
          }
        });
      }

      if (this.newmitwirkende[index].email != '' && this.newmitwirkende[index].email != null) {
        this.betriebService
          .checkBetriebMitwirkendeEmailExist(this.newmitwirkende[index].email.trim().toLowerCase())
          .subscribe((result: any) => {
            this.newmitwirkende[index].emailResultFound = result;

            if (this.newmitwirkende[index].emailResultFound.filter((value: any) => value.betrieb_typ == 1).length != 0) {
              let kunstFilter: any = this.newmitwirkende[index].emailResultFound.filter((value: any) => value.betrieb_typ == 1)[0];
              if (this.hideSearchResultIdList.filter(id => id == kunstFilter.prod_kunst_id).length != 0) {
                this.newmitwirkende[index].email = null;
                this.newmitwirkende[index].emailInValid = true;
                this.newmitwirkende[index].emailError = 'email exist';
              }
            }

            // Kunstler betrieb found
            if (
              this.newmitwirkende[index].betMit.prodKunst_id == null &&
              result.length != 0 &&
              result.filter(value => value.betrieb_typ == 1).length != 0
            ) {
              let kunst = result.filter(value => value.betrieb_typ == 1)[0];
              this.newmitwirkende[index].invite = true;
              this.newmitwirkende[index].inviteType = 'kunstlerBetrieb';
            }

            // benutzer found
            else if (
              this.newmitwirkende[index].betMit.prodKunst_id == null &&
              result.length != 0 &&
              result.filter(value => value.betrieb_typ == 1).length == 0 &&
              result.filter(value => value.betrieb_typ == 0).length == 0 &&
              result.filter(value => value.betrieb_typ == null).length != 0
            ) {
              let kunst = result.filter(value => value.betrieb_typ == null)[0];
              this.newmitwirkende[index].invite = true;
              this.newmitwirkende[index].inviteType = 'benutzer';
            }

            // email not found in ekultur portal
            else if (this.newmitwirkende[index].betMit.prodKunst_id == null && result.length == 0) {
              this.newmitwirkende[index].invite = true;
              this.newmitwirkende[index].inviteType = 'nothingFound';
            }
          });
      }
    } else {
      this.newmitwirkende[index].invite = false;
      this.newmitwirkende[index].inviteType = null;
    }
  }

  sendMitWirkendInviteMail(data) {
    let mail = data.email;
    let index = this.newmitwirkende.findIndex(value => value.email == mail);
    if (index >= 0) {
      this.newmitwirkende[index].invitationComplete = true;
    }

    this.emailTemplateService.sendMail(data, data.email, this.aktivBet.betriebsname, data.message, null, this.aktivBet, {
      type: 'mitbetrieb impressum invite',
      int_name: this.prodName != null ? this.prodName : 'none',
    });
  }

  showKuenstlerName(i) {
    this.kuenstlernamecheck[i] = !this.kuenstlernamecheck[i];
  }

  getKunstlerBetriebFoundWithEmail(index) {
    // this.newmitwirkende[index].emailResultFound
    let result: any = this.newmitwirkende[index].emailResultFound.filter((value: any) => value.betrieb_typ == 1)[0];
    this.kunstlerService.getKunstlerProduktById(result.prod_kunst_id).subscribe(prodKunst => {
      this.newmitwirkende[index].betMit.prodKunst_id = prodKunst.id;
      this.newmitwirkende[index].betMit.kunstlerName = prodKunst.kunstlername;
      this.kuenstlernamecheck[index] = this.newmitwirkende[index].betMit.kunstlerName != null;
      this.newmitwirkende[index].betMit.name = prodKunst.name;
      this.newmitwirkende[index].betMit.vorname = prodKunst.vorname;
      this.newmitwirkende[index].betMit.kurzbeschreibung = prodKunst.kurzbeschreibung;
      this.newmitwirkende[index].invitationComplete = true;
      this.betMitName[index] = prodKunst.vorname + ' ' + prodKunst.name;

      this.betriebService.findCrowd(prodKunst.betriebId).subscribe(kunstBet => {
        this.newmitwirkende[index].email = kunstBet.betkommDTOList.filter(value => value.kommunikationsart == 0)[0].wert;
        this.personTagListe_new[index] = [];
        this.newmitwirkende[index].betMit.mitBerufTagDTOList = [];
        kunstBet.betriebkatDTOList.forEach(value => {
          let topush = {
            actioncode: Actioncode.create,
            bezeichnung: value.bezeichnung,
            id: null,
            betriebMitwirkendeId: null,
          };
          this.personTagListe_new[index].push(topush);
          this.newmitwirkende[index].betMit.mitBerufTagDTOList.push(topush);
        });
      });
      this.betriebService.queryImage(prodKunst.betriebId).subscribe(logo => {
        if (logo.length != 0) {
          this.newmitwirkende[index].betMit.bild = logo[0].media;
          this.newmitwirkende[index].betMit.bildContentType = logo[0].mediaContentType;
        }
      });
    });
  }
}
