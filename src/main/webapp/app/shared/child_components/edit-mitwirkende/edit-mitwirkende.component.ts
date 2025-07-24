import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BetMitwirkende, MitBerufTagDTO, MitKommunikationDTO} from 'app/shared/models/bet-mitwirkend';
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
import {EmailTemplateService} from 'app/shared/services/emailTemplate.service';
import {Betrieb} from 'app/shared/models/betrieb.model';
import {KunstlerService} from 'app/shared/services/kunstler.service';
import {DOC_ORIENTATION, NgxImageCompressService} from 'ngx-image-compress';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-mitwirkende',
  templateUrl: './edit-mitwirkende.component.html',
  styleUrls: ['./edit-mitwirkende.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditMitwirkendeComponent implements OnInit {
  public mitwir_placeholder = '../../../content/images/Portrait_Placeholder.png';
  imageSizeCheck: boolean = false;
  imageFormatCheck: boolean = false;
  imageChangedEvent: any = '';
  tagOnFocus_mit = false;
  personTagListe_new: MitBerufTagDTO[] = [];
  mitwirGruppeSuggestions: Wertelisten[];
  @ViewChild('mitwirForm', { static: true })mitwirForm: NgForm;
  public emailExistsSaveButton = true;
  public locale: string = 'de';
  public fields: any = { value: 'kunstlername' };
  public data: Observable<any>;
  public autofill: Boolean = true;
  public highlight: Boolean = true;
  public kuenstlernamecheck: Boolean = false;
  public mitwirkendeEmail: MitKommunikationDTO = new MitKommunikationDTO(Actioncode.create, null, null, 0, null);
  public kunstlerEmailInviteProcess: {
    invite: boolean;
    inviteType: string;
    emailInvalid: boolean;
    emailError: string;
    emailResultFound: [];
    inviteCompleted: boolean;
  } = { invite: false, inviteType: null, emailInvalid: false, emailError: null, emailResultFound: [], inviteCompleted: false };

  public kuenstlerEmailInvite: Boolean = false;
  public kunstlerEmailInvitationComplete: Boolean = false;
  public prodKunstIsThere: boolean = false;

  @Input() hideSearchResultIdList: [];
  @Input() existingEmailList: [];
  @Input() editMitwirkende: BetMitwirkende;
  @Input() aktivBet: Betrieb;
  @Input() prodName: string = null;
  @Output() updateMitwirkende = new EventEmitter<any>();
  private file: any;
  public fileBlob: any;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private prodHttpService: prodHTTPService,
    private betriebService: BetriebService,
    public kunstlerService: KunstlerService,
    private emailTemplateService: EmailTemplateService,
    private http: HttpClient,
    private imageCompress: NgxImageCompressService
  ) {}

  ngOnInit() {
    this.getMitwirkendeSuggestion();
    this.editMitwirkende.name = this.editMitwirkende.vorname + ' ' + this.editMitwirkende.name;
    this.editMitwirkende.mitBerufTagDTOList.forEach(value => (value.actioncode = Actioncode.unchanged));
    this.personTagListe_new = [...this.editMitwirkende.mitBerufTagDTOList];
    this.kuenstlernamecheck = this.editMitwirkende.kunstlerName != null;
    this.prodKunstIsThere = this.editMitwirkende.prodKunst_id != null;

    if (this.editMitwirkende.mitKommunikationDTOList.filter(value => value.kommunikation == 0).length != 0) {
      this.mitwirkendeEmail = this.editMitwirkende.mitKommunikationDTOList.filter(value => value.kommunikation == 0)[0];
    } else {
      this.mitwirkendeEmail.betriebMitwirkendeId = this.editMitwirkende.id;
    }
    this.onEmailBlur();
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

  setFileDataMitwirkendeImage($event, entity, field, isImage, content, i?: number) {
    this.imageSizeCheck = false;
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

  selectFile(event: any, $event, entity, field, isImage, content) {
    // console.log(event.target.files);
    this.setFileDataMitwirkendeImage($event, entity, field, isImage, content);
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
    let justcodeimage = image.base64.split(',');
    if (this.editMitwirkende.id != null) {
      this.editMitwirkende.actioncode = Actioncode.update;
    }
    this.editMitwirkende.bild = justcodeimage[1];
    this.editMitwirkende.bildContentType = justcodeimage[0].split(':')[1].split(';')[0];
  }

  openImage(content, entity, i) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  loadImageMitwir(mitwir: any) {
    return mitwir.bild == null
      ? { 'background-image': 'url(' + this.mitwir_placeholder + ')' }
      : { 'background-image': 'url(data:' + mitwir.bildContentType + ';base64,' + mitwir.bild + ')' };
  }

  trackByIndex(i: number) {
    return i;
  }

  onTagFocus3(validate: boolean) {
    this.tagOnFocus_mit = validate;
  }

  onQuillMitwirk(html) {
    this.editMitwirkende.kurzbeschreibung = html;
  }

  public onAddTag(item) {
    let topush = {
      actioncode: Actioncode.create,
      bezeichnung: item.bezeichnung,
      id: null,
      betriebMitwirkendeId: null,
    };
    if (this.editMitwirkende.mitBerufTagDTOList.filter(value => value.bezeichnung == item.bezeichnung).length == 0) {
      this.editMitwirkende.mitBerufTagDTOList.push(topush);
    } else {
      let index = this.editMitwirkende.mitBerufTagDTOList.findIndex(value => value.bezeichnung == item.bezeichnung);
      if (
        this.editMitwirkende.mitBerufTagDTOList[index].id != null &&
        this.editMitwirkende.mitBerufTagDTOList[index].actioncode == Actioncode.delete
      ) {
        this.editMitwirkende.mitBerufTagDTOList[index].actioncode = Actioncode.unchanged;
      }
    }
  }

  public onRemoveTag(item) {
    let index = this.editMitwirkende.mitBerufTagDTOList.findIndex(value => value.bezeichnung == item.bezeichnung);
    if (this.editMitwirkende.mitBerufTagDTOList[index].id == null) {
      this.editMitwirkende.mitBerufTagDTOList.splice(index, 1);
    } else if (
      this.editMitwirkende.mitBerufTagDTOList[index].id != null &&
      this.editMitwirkende.mitBerufTagDTOList[index].actioncode != Actioncode.delete
    ) {
      this.editMitwirkende.mitBerufTagDTOList[index].actioncode = Actioncode.delete;
    }
  }

  addTagtoInput(item: any) {
    let topush = {
      actioncode: Actioncode.create,
      bezeichnung: item.beschreibung,
      id: null,
      betriebMitwirkendeId: null,
    };
    if (this.personTagListe_new.filter(value => value.bezeichnung == item.beschreibung).length == 0) {
      this.personTagListe_new.push(topush);
    }

    if (this.editMitwirkende.mitBerufTagDTOList.filter(value => value.bezeichnung == item.beschreibung).length == 0) {
      this.editMitwirkende.mitBerufTagDTOList.push(topush);
    } else {
      let index = this.editMitwirkende.mitBerufTagDTOList.findIndex(value => value.bezeichnung == item.beschreibung);
      if (
        this.editMitwirkende.mitBerufTagDTOList[index].id != null &&
        this.editMitwirkende.mitBerufTagDTOList[index].actioncode == Actioncode.delete
      ) {
        this.editMitwirkende.mitBerufTagDTOList[index].actioncode = Actioncode.unchanged;
      }
    }
  }

  onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs, remote: AutoCompleteComponent) => {
    if (e.text.length > 2) {
      this.data = this.getData(remote, e.text);
      e.preventDefaultAction = true;
    } else {
      e.cancel = true;
    }
  };

  public getData(remote: AutoCompleteComponent, text: string): Observable<any> {
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
            }
            if (this.hideSearchResultIdList.filter(value => value == data.id).length == 0) {
              result.push(data);
            }
          });
          remote.hidePopup();
          setTimeout(() => remote.showPopup(), 500);
        } else {
          remote.hidePopup();
        }
        return result;
      })
    );
  }

  savenewmitwirkende() {
    let vorname = '';
    let name = '';
    let spiltName = this.editMitwirkende.name.split(' ');
    vorname = spiltName[0];
    spiltName.forEach((value, index) => {
      if (index != 0) {
        name = name + ' ' + value;
      }
    });
    this.editMitwirkende.name = name;
    this.editMitwirkende.vorname = vorname;
    if (this.mitwirkendeEmail.id == null && this.mitwirkendeEmail.wert != null && this.mitwirkendeEmail.wert != '') {
      this.editMitwirkende.mitKommunikationDTOList.push(this.mitwirkendeEmail);
    } else {
      this.editMitwirkende.mitKommunikationDTOList.forEach(value => {
        value.actioncode = Actioncode.update;
        value.wert = value.wert == null ? '' : value.wert;
      });
    }

    this.updateMitwirkende.emit(this.editMitwirkende);
  }

  selectedItem(item) {
    let data = item.itemData;
    this.editMitwirkende.kunstlerName = data.kunstlernameExist ? data.kunstlername : null;
    this.editMitwirkende.prodKunst_id = data.id;
    this.prodKunstIsThere = this.editMitwirkende.prodKunst_id != null;
    this.editMitwirkende.name = data.name;
    this.editMitwirkende.vorname = data.vorname;
    this.editMitwirkende.kurzbeschreibung = data.kurzbeschreibung;
    this.mitwirkendeEmail.wert = data.betkommDTOList.filter(value => value.kommunikationsart == 'EMAIL_ZENTRALE')[0].wert;
    if (this.existingEmailList.filter(email => email == this.mitwirkendeEmail.wert).length == 0) {
      this.emailExistsSaveButton = true;
    } else {
      this.emailExistsSaveButton = false;
    }
    this.personTagListe_new = [];
    for (let mitwirkende of this.editMitwirkende.mitBerufTagDTOList) {
      mitwirkende.actioncode = Actioncode.delete;
    }
    data.betriebkatDTOList.forEach(value => {
      if (this.editMitwirkende.mitBerufTagDTOList.filter(mitwirkende => mitwirkende.bezeichnung == value.bezeichnung).length == 0) {
        let topush = {
          actioncode: Actioncode.create,
          bezeichnung: value.bezeichnung,
          id: null,
          betriebMitwirkendeId: null,
        };
        this.personTagListe_new.push(topush);
        this.editMitwirkende.mitBerufTagDTOList.push(topush);
      } else {
        let mitwirkende = this.editMitwirkende.mitBerufTagDTOList.filter(mitwirkende => mitwirkende.bezeichnung == value.bezeichnung);
        mitwirkende[0].actioncode = Actioncode.unchanged;
        this.personTagListe_new.push(mitwirkende[0]);
      }
    });
    if (data.mediaObject) {
      this.editMitwirkende.bild = data.mediaObject.media;
      this.editMitwirkende.bildContentType = data.mediaObject.mediaContentType;
    }

    this.kunstlerEmailInviteProcess.invite = false;
    this.kunstlerEmailInviteProcess.inviteType = null;
    this.kunstlerEmailInviteProcess.emailError = null;
    this.kunstlerEmailInviteProcess.emailInvalid = false;
    this.kunstlerEmailInviteProcess.emailResultFound = [];
  }

  onEmailBlur() {
    this.mitwirkendeEmail.actioncode = this.mitwirkendeEmail.id == null ? Actioncode.create : Actioncode.update;
    if (!this.prodKunstIsThere) {
      if (this.mitwirkendeEmail.wert != '' && this.mitwirkendeEmail.wert != null && this.mitwirkendeEmail.wert.length > 5) {
        this.kunstlerEmailInviteProcess.invite = false;
        this.kunstlerEmailInviteProcess.inviteType = null;
        this.kunstlerEmailInviteProcess.emailError = null;
        this.kunstlerEmailInviteProcess.emailInvalid = false;
        this.kunstlerEmailInviteProcess.emailResultFound = [];

        // check email exist in mitwirkende list
        if (
          this.mitwirkendeEmail.wert != null &&
          this.existingEmailList.filter((value: any) => value.trim().toLowerCase() == this.mitwirkendeEmail.wert.trim().toLowerCase())
            .length != 0
        ) {
          // this.mitwirkendeEmail.wert = null;
          this.kunstlerEmailInviteProcess.emailInvalid = true;
          this.kunstlerEmailInviteProcess.emailError = 'email exist';
        }

        if (this.mitwirkendeEmail.wert != '' && this.mitwirkendeEmail.wert != null) {
          this.betriebService.checkBetriebMitwirkendeEmailExist(this.mitwirkendeEmail.wert).subscribe((result: any) => {
            this.kunstlerEmailInviteProcess.emailResultFound = result;

            if (this.kunstlerEmailInviteProcess.emailResultFound.filter((value: any) => value.betrieb_typ == 1).length != 0) {
              let kunstFilter: any = this.kunstlerEmailInviteProcess.emailResultFound.filter((value: any) => value.betrieb_typ == 1)[0];
              if (this.hideSearchResultIdList.filter(id => id == kunstFilter.prod_kunst_id).length != 0) {
                // this.mitwirkendeEmail.wert = null;
                this.kunstlerEmailInviteProcess.emailInvalid = true;
                this.kunstlerEmailInviteProcess.emailError = 'email exist';
              }
            }

            // Kunstler betrieb found
            if (
              this.editMitwirkende.prodKunst_id == null &&
              result.length != 0 &&
              result.filter(value => value.betrieb_typ == 1).length != 0
            ) {
              let kunst = result.filter(value => value.betrieb_typ == 1)[0];
              this.kunstlerEmailInviteProcess.invite = true;
              this.kunstlerEmailInviteProcess.inviteType = 'kunstlerBetrieb';
            }

            // benutzer found
            else if (
              this.editMitwirkende.prodKunst_id == null &&
              result.length != 0 &&
              result.filter(value => value.betrieb_typ == 1).length == 0 &&
              result.filter(value => value.betrieb_typ == 0).length == 0 &&
              result.filter(value => value.betrieb_typ == null).length != 0
            ) {
              let kunst = result.filter(value => value.betrieb_typ == null)[0];
              this.kunstlerEmailInviteProcess.invite = true;
              this.kunstlerEmailInviteProcess.inviteType = 'benutzer';
            }

            // email not found in ekultur portal
            else if (this.editMitwirkende.prodKunst_id == null && result.length == 0) {
              this.kunstlerEmailInviteProcess.invite = true;
              this.kunstlerEmailInviteProcess.inviteType = 'nothingFound';
            }
          });
        }
      } else {
        this.kunstlerEmailInviteProcess.invite = false;
        this.kunstlerEmailInviteProcess.inviteType = null;
        this.kunstlerEmailInviteProcess.emailInvalid = false;
      }

      if (this.mitwirkendeEmail.wert != '' && this.mitwirkendeEmail.wert != null) {
        this.betriebService.checkBetriebMitwirkendeEmailExist(this.mitwirkendeEmail.wert).subscribe(result => {
          if (this.editMitwirkende.prodKunst_id == null && !result) {
            this.kuenstlerEmailInvite = true;
          } else {
            this.kuenstlerEmailInvite = false;
          }
        });
      } else {
        this.kuenstlerEmailInvite = false;
      }
    }
    console.log(this.kunstlerEmailInviteProcess.emailInvalid);
  }

  getKunstlerBetriebFoundWithEmail() {
    let result: any = this.kunstlerEmailInviteProcess.emailResultFound.filter((value: any) => value.betrieb_typ == 1)[0];
    this.kunstlerService.getKunstlerProduktById(result.prod_kunst_id).subscribe(prodKunst => {
      this.editMitwirkende.prodKunst_id = prodKunst.id;
      this.editMitwirkende.kunstlerName = prodKunst.kunstlername;
      this.editMitwirkende.name = prodKunst.name;
      this.editMitwirkende.vorname = prodKunst.vorname;
      this.editMitwirkende.kurzbeschreibung = prodKunst.kurzbeschreibung;
      this.kunstlerEmailInviteProcess.inviteCompleted = true;

      this.betriebService.findCrowd(prodKunst.betriebId).subscribe(kunstBet => {
        this.mitwirkendeEmail.wert = kunstBet.betkommDTOList.filter(value => value.kommunikationsart == 0)[0].wert;
        this.mitwirkendeEmail.actioncode = this.mitwirkendeEmail.id == null ? Actioncode.create : Actioncode.update;
        this.editMitwirkende.mitBerufTagDTOList = [];
        this.personTagListe_new = [];
        kunstBet.betriebkatDTOList.forEach(value => {
          let topush = {
            actioncode: Actioncode.create,
            bezeichnung: value.bezeichnung,
            id: null,
            betriebMitwirkendeId: null,
          };
          this.personTagListe_new.push(topush);
          this.editMitwirkende.mitBerufTagDTOList.push(topush);
        });
      });
      this.betriebService.queryImage(prodKunst.betriebId).subscribe(logo => {
        if (logo.length != 0) {
          this.editMitwirkende.bild = logo[0].media;
          this.editMitwirkende.bildContentType = logo[0].mediaContentType;
        }
      });
    });
  }

  sendMiwirkendeInvitation(data) {
    this.emailTemplateService.sendMail(data, data.email, this.aktivBet.betriebsname, data.message, null, this.aktivBet, {
      type: 'mitbetrieb impressum invite',
      int_name: this.prodName != null ? this.prodName : 'none',
    });
    this.kunstlerEmailInviteProcess.inviteCompleted = true;
    this.kunstlerEmailInviteProcess.invite = false;
  }

  loadImageMitwirMedia(mitwir: any) {
    return mitwir == null || mitwir.media == null
      ? { 'background-image': 'url(' + this.mitwir_placeholder + ')' }
      : { 'background-image': 'url(data:' + mitwir.mediaContentType + ';base64,' + mitwir.media + ')' };
  }
}
