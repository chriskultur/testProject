import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import 'hammerjs';
import {ProdMedia} from 'app/shared/models/production-media.model';
import b64toBlob from 'app/shared/child_components/product-media-document/product-media-document.component';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from "@hyahfoufi/ngx-gallery";

import mime from 'mime';
import {JhiDataUtils} from "../../util/JhiDataUtils";
import {EmbedVideoService} from "../../embedVideo";

// let b64toBlob = require('b64-to-blob');

@Component({
  selector: 'app-product-media-view',
  templateUrl: './product-media-view.component.html',
  styleUrls: ['./product-media-view.component.scss'],
})
export class ProductMediaViewComponent implements OnInit {
  file: any[];
  iframe_html: any;
  videoUrl = '';
  videoinput: any = 1;
  galleryOptionsComp: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  closeResult: string;
  public data: any;
  eventalbum: any;
  Imagecounter: number = 0;
  FileCounter: number = 0;
  spinner: boolean = true;
  mediatitel: any;
  mediaautor: any;
  mediaquelle: any;
  medializenz: any;
  mediahinweis: any;

  @Input() prodVideo: any[];
  @Input() prodMedia: any[];
  @Input() mediaService: any;
  @Input() height: string;

  constructor(private dataUtils: JhiDataUtils, private modalService: NgbModal, private embedService: EmbedVideoService) {}

  ngOnInit(): void {
    this.galleryOptionsComp = [
      {
        width: '100%',
        imageAnimation: NgxGalleryAnimation.Slide,
      },
      // {
      //   breakpoint: 800,
      //   width: '100%',
      //   height: '300px',
      //   imagePercent: 80,
      //   imageSwipe: true,
      //   thumbnailsSwipe: true,
      //   previewSwipe: true,
      //   imageAnimation: 'slide'
      // },
      {
        width: '100%',
        height: this.height,
        previewCloseOnEsc: true,
        previewKeyboardNavigation: true,
        previewInfinityMove: true,
        arrowPrevIcon: 'icofont icofont-caret-left',
        arrowNextIcon: 'icofont icofont-caret-right',
        closeIcon: 'icofont icofont-close-circled',
        imageArrowsAutoHide: true,
        imageAutoPlayInterval: 5000,
        imageAutoPlayPauseOnHover: true,
        imageAutoPlay: true,
        imageSwipe: true,
        thumbnailsSwipe: true,
        previewSwipe: true,
        imageAnimation: 'slide',
        thumbnails: false,
        imageSize: 'NgxGalleryImageSize.Contain',
        imageInfinityMove: true,
      },
    ];
    this.spinner = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.prodMedia != undefined) {
      this.FileCounter = this.filterDocuments().length;
      this.Imagecounter = this.filterGallery().length;
      this.galleryimageupload();
      if (this.prodVideo[0] && this.prodVideo[0].media == 'null') {
        this.prodVideo[0].media = null;
      }
      if (
        this.prodVideo[0] &&
        this.prodVideo[0].media != null &&
        this.prodVideo[0].media != 'bnVsbA==' &&
        this.prodVideo[0].media != 'null'
      ) {
        this.iframe_html = this.embedService.embed(this.prodVideo[0].media, { attr: { width: 500, height: 350 } });
      }
    }
  }

  changevideo() {
    this.iframe_html = this.embedService.embed(this.prodVideo[0].media, { attr: { width: 500, height: 350 } });
    this.prodVideo[0].mediaContentType = 'video-link';
  }


  galleryimageupload() {
    const newImages = [];
    for (let i = 0; i < this.Imagecounter; i++) {
      let image = this.filterGallery()[i];
      if (image.media_titel == null) {
        image.media_titel = '';
      }
      if (image.media_autor == null || image.media_autor == '') {
        image.media_autor = '';
        this.mediaautor = '';
      } else {
        this.mediaautor = ' • Autor: ';
      }
      if (image.media_quelle == null || image.media_quelle == '') {
        image.media_quelle = '';
        this.mediaquelle = '';
      } else {
        this.mediaquelle = ' • Quelle: ';
      }
      if (image.media_lizenz == null || image.media_lizenz == '') {
        image.media_lizenz = '';
        this.medializenz = '';
      } else {
        this.medializenz = ' • Lizenz: ';
      }
      if (image.media_hinweis == null || image.media_hinweis == '') {
        image.media_hinweis = '';
        this.mediahinweis = '';
      } else {
        this.mediahinweis = ' • Hinweis: ';
      }
      newImages.push({
        small: 'data:image/jpeg;base64,' + image.media,
        medium: 'data:image/jpeg;base64,' + image.media,
        big: 'data:image/jpeg;base64,' + image.media,
        description:
          '<h5>' +
          image.media_titel +
          '</h5><br><h6>' +
          this.mediaautor +
          image.media_autor +
          this.mediaquelle +
          image.media_quelle +
          this.medializenz +
          image.media_lizenz +
          this.mediahinweis +
          image.media_hinweis +
          '</h6>',
      });
      this.galleryImages = newImages;
    }
  }

  setGalleryData(event, entity, field, isImage, counter) {
    // debugger;
    for (let i = 0; i < event.target.files.length; i++) {
      if (event && event.target.files && event.target.files[i]) {
        const file_1 = event.target.files[i];
        if (isImage && !/^image\//.test(file_1.type)) {
          return;
        }
        this.dataUtils.toBase64(file_1, function (base64Data) {
          entity[i + counter][field] = base64Data;
          entity[i + counter][field + 'ContentType'] = file_1.type;
        });
      }
    }
  }

  setGallery($event, $entity, field, isImage) {
    this.setGalleryData($event, $entity, field, isImage, this.Imagecounter);
    this.Imagecounter = this.Imagecounter + $event.target.files.length;
  }

  filterVideo() {
    return this.prodMedia.filter(video => video.mediatypCode == 2);
  }

  filterGallery() {
    return this.prodMedia.filter(gallery => gallery.mediatypCode == 1);
  }

  filterDocuments() {
    return this.prodMedia.filter(documents => documents.mediatypCode == 0);
  }

  addGallery($event) {
    for (let i = 0; i < $event.target.files.length; i++) {
      this.prodMedia.push(new ProdMedia(null, null, null, null, null, null, 1, null, null));
    }
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  save() {
    //    this.bpService.update(this.bp).subscribe();
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

  fromBase64(file: any) {
    if (file.media == null) {
      if (file.type.includes('public')) {
        if (file.type.includes('prod') && file.id != null) {
          this.mediaService.getPublicProductionMediaOne(file.id).subscribe(prodmedia => {
            file.media = prodmedia.media;
            file.mediaContentType = prodmedia.mediaContentType;
            this.downloadPdf(file);
          });
        } else if (file.type.includes('spiel') && file.id != null) {
          this.mediaService.getPublicSpielMediaOne(file.id).subscribe(prodmedia => {
            file.media = prodmedia.media;
            file.mediaContentType = prodmedia.mediaContentType;
            this.downloadPdf(file);
          });
        } else if (file.type.includes('werk') && file.id != null) {
          this.mediaService.getPublicWerkMediaOne(file.id).subscribe(prodmedia => {
            file.media = prodmedia.media;
            file.mediaContentType = prodmedia.mediaContentType;
            this.downloadPdf(file);
          });
        } else if (file.type.includes('bet') && file.id != null) {
          this.mediaService.getBetMediaOne(file.id).subscribe(prodmedia => {
            file.media = prodmedia.media;
            file.mediaContentType = prodmedia.media_content_type;
            this.downloadPdf(file);
          });
        } else if (file.type.includes('kunst') && file.id != null) {
          this.mediaService.getBetMediaOne(file.id).subscribe(prodmedia => {
            file.media = prodmedia.media;
            file.mediaContentType = prodmedia.mediaContentType;
            this.downloadPdf(file);
          });
        }
      } else {
        if (file.type == 'prod' && file.id != null) {
          this.mediaService.findMediaProd(file.id).subscribe(prodmedia => {
            file.media = prodmedia.media;
            file.mediaContentType = prodmedia.mediaContentType;
            this.downloadPdf(file);
          });
        } else if (file.type == 'spiel' && file.id != null) {
          this.mediaService.findMediaStage(file.id).subscribe(prodmedia => {
            file.media = prodmedia.media;
            file.mediaContentType = prodmedia.mediaContentType;
            this.downloadPdf(file);
          });
        } else if (file.type == 'werk' && file.id != null) {
          this.mediaService.findMediaWerk(file.id).subscribe(prodmedia => {
            file.media = prodmedia.media;
            file.mediaContentType = prodmedia.mediaContentType;
            this.downloadPdf(file);
          });
        } else if (file.type == 'bet' && file.id != null) {
          this.mediaService.getBetMediaOne(file.id).subscribe(prodmedia => {
            file.media = prodmedia.media;
            file.mediaContentType = prodmedia.media_content_type;
            this.downloadPdf(file);
          });
        } else if (file.type.includes('kunst') && file.id != null) {
          this.mediaService.getKunstlerProduktByIdMedia(file.id).subscribe(prodmedia => {
            file.media = prodmedia.media;
            file.mediaContentType = prodmedia.mediaContentType;
            this.downloadPdf(file);
          });
        }
      }
    } else {
      this.downloadPdf(file);
    }
  }

  downloadPdf(file) {
    let blob = b64toBlob(file.media, file.mediaContentType);
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob);
    } else {
      let a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = file.titel;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  open2(content, value: number) {
    if (value == 3) {
      this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false }).result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    }
  }

  //some commneted code eliminated from here

  fileEvent($event) {
    let j = 0;
    for (const fileupload of $event.target.files) {
      if (
        mime.getType(fileupload.name) == 'application/msword' ||
        mime.getType(fileupload.name) == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        mime.getType(fileupload.name) == 'application/pdf' ||
        mime.getType(fileupload.name) == 'audio/mpeg' ||
        mime.getType(fileupload.name) == 'image/jpeg' ||
        mime.getType(fileupload.name) == 'image/png' ||
        mime.getType(fileupload.name) == 'application/vnd.ms-word.document.macroenabled.12' ||
        mime.getType(fileupload.name) == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        mime.getType(fileupload.name) == 'application/vnd.ms-excel' ||
        mime.getType(fileupload.name) == 'application/vnd.ms-excel.sheet.macroenabled.12' ||
        mime.getType(fileupload.name) == 'text/csv' ||
        mime.getType(fileupload.name) == 'text/plain'
      ) {
        console.log('size: ' + fileupload.size);
        if (fileupload.size <= 7200000) {
          this.prodMedia.push(new ProdMedia(null, null, null, null, null, null, 0, null, null));
          j++;
        }
      }
    }
    this.setFile($event, this.filterDocuments(), 'media', false, j);
  }

  setFile($event, $entity, field, isImage, counter: number) {
    this.setFileData($event, $entity, field, isImage, this.FileCounter);
    this.FileCounter = this.FileCounter + counter;
  }

  setFileData(event, entity, field, isImage, counter) {
    // debugger;
    let j = 0;
    for (let i = 0; i < event.target.files.length; i++) {
      if (event && event.target.files && event.target.files[i]) {
        const file_1 = event.target.files[i];
        if (isImage && !/^image\//.test(file_1.type)) {
          return;
        }
        if (
          mime.getType(event.target.files[i].name) == 'application/msword' ||
          mime.getType(event.target.files[i].name) == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          mime.getType(event.target.files[i].name) == 'application/pdf' ||
          mime.getType(event.target.files[i].name) == 'audio/mpeg' ||
          mime.getType(event.target.files[i].name) == 'image/jpeg' ||
          mime.getType(event.target.files[i].name) == 'image/png' ||
          mime.getType(event.target.files[i].name) == 'application/vnd.ms-word.document.macroenabled.12' ||
          mime.getType(event.target.files[i].name) == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          mime.getType(event.target.files[i].name) == 'application/vnd.ms-excel' ||
          mime.getType(event.target.files[i].name) == 'application/vnd.ms-excel.sheet.macroenabled.12' ||
          mime.getType(event.target.files[i].name) == 'text/csv' ||
          mime.getType(event.target.files[i].name) == 'text/plain'
        ) {
          console.log('size: ' + event.target.files[i].size);
          if (event.target.files[i].size <= 7200000) {
            this.dataUtils.toBase64(file_1, function (base64Data) {
              entity[j + counter][field] = base64Data;
              entity[j + counter][field + 'ContentType'] = mime.getType(file_1.name);
              entity[j + counter].titel = file_1.name;
              j++;
            });
          }
        }
      }
    }
  }

  removevideo() {
    let deleteVideo = this.filterVideo()[0].id;
    let index = this.prodMedia.findIndex(todelete => todelete.media === this.filterVideo()[0].media);
    if (deleteVideo == null) {
      this.prodMedia[index].media = null;
      this.prodMedia[index].mediaContentType = null;
    } else {
      this.deleteFromDatabase(deleteVideo);
      this.prodMedia[index].media = null;
      this.prodMedia[index].mediaContentType = null;
    }
  }

  removefile(i: number) {
    let deleteDocument = this.filterDocuments()[i].id;
    if (deleteDocument == null) {
      this.prodMedia.splice(
        this.prodMedia.findIndex(todelete => todelete.media === this.filterDocuments()[i].media),
        1
      );
    } else {
      this.deleteFromDatabase(deleteDocument);
      this.prodMedia.splice(
        this.prodMedia.findIndex(todelete => todelete.media === this.filterDocuments()[i].media),
        1
      );
    }
    if (this.FileCounter > 0) {
      this.FileCounter--;
    }
  }

  deleteFromDatabase(id: number) {
    this.mediaService.delete(id).subscribe();
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
}
