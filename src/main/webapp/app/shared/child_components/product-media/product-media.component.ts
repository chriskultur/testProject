import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from '@hyahfoufi/ngx-gallery';
import {ProdMedia} from 'app/shared/models/production-media.model';
import {WerkMedia} from 'app/shared/models/werk-media.model';
import {StageMedia} from 'app/shared/models/stage-media.model';
import b64toBlob from 'app/shared/child_components/product-media-document/product-media-document.component';
import Swal from 'sweetalert2';
import {betMedia} from 'app/shared/models/betrieb.model';
import {KunstlerProdMediaModel, KunstlerProdProjektMediaModel} from 'app/shared/models/kunstler-prod-media.model';
import {DOC_ORIENTATION, NgxImageCompressService} from 'ngx-image-compress';
import {JhiDataUtils} from "../../util/JhiDataUtils";
import {EmbedVideoService} from "../../embedVideo";

import mime from 'mime';

@Component({
  selector: 'app-product-media',
  templateUrl: './product-media.component.html',
  styleUrls: ['./product-media.component.scss'],
})
export class ProductMediaComponent implements OnInit, OnChanges {
  modalReference: NgbModalRef;
  file: any[];
  iframe_html: any;
  videoUrl = '';
  videoinput: any = 1;
  galleryOptionsComp: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  closeResult: string;
  public data: any;
  Imagecounter: number = 0;
  FileCounter: number = 0;
  MainImageCounter: number = 0;
  mediaProd: any;
  notavideo = false;
  prodVideo: any[];
  @Input() prodMedia: any[];
  @Input() mediaService: any;
  @Input() type: string;
  @Output() media: EventEmitter<any[]> = new EventEmitter<any[]>();

  showImageInfo;
  documentSizeExceeded: boolean = false;
  imageFormatCheck: boolean = false;
  documentFormatNotSupported: boolean = false;
  onRemoveImageList = [];
  isLoading = false;
  base64image;

  constructor(
    private imageCompress: NgxImageCompressService,
    private dataUtils: JhiDataUtils,
    private modalService: NgbModal,
    private embedService: EmbedVideoService
  ) {}

  ngOnInit(): void {
    this.prodVideo = this.prodMedia.filter(video => video.mediatypCode == 2);
    this.galleryOptionsComp = [
      {
        width: '100%',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
      },
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
      },
      {
        width: '100%',
        breakpoint: 400,
        preview: false,
      },
      {
        width: '100%',
        previewCloseOnEsc: true,
        previewKeyboardNavigation: true,
        previewInfinityMove: true,
        lazyLoading: true,
        arrowPrevIcon: 'icofont icofont-caret-left',
        arrowNextIcon: 'icofont icofont-caret-right',
        closeIcon: 'icofont icofont-close-circled',
      },
    ];
    this.notavideo = false;
    if (
      this.prodVideo.length != 0 &&
      (this.prodVideo[0].media == null ||
        this.prodVideo[0].media == 'bnVsbA==' ||
        this.prodVideo[0].media == 'null' ||
        (this.type != 'bet' ? this.prodVideo[0].mediaContentType == null : this.prodVideo[0].media_content_type == null))
    ) {
      this.prodVideo[0].media = null;
    } else if (
      this.prodVideo.length != 0 &&
      !this.prodVideo[0].media.includes('https://www.youtube.com') &&
      !this.prodVideo[0].media.includes('https://youtube.com') &&
      !this.prodVideo[0].media.includes('https://youtu.be') &&
      !this.prodVideo[0].media.includes('https://a-gon.de') &&
      !this.prodVideo[0].media.includes('https://vimeo.com') &&
      !this.prodVideo[0].media.includes('https://www.dailymotion.com') &&
      !this.prodVideo[0].media.includes('https://www.vimeo.com') &&
      !this.prodVideo[0].media.includes('https://dailymotion.com')
    ) {
      this.notavideo = true;
    } else if (
      this.prodVideo.length != 0 &&
      this.prodVideo[0].media != null &&
      this.prodVideo[0].media != 'bnVsbA==' &&
      this.prodVideo[0].media != 'null'
    ) {
      this.iframe_html = this.embedService.embed(this.prodVideo[0].media);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.prodMedia != undefined) {
      this.FileCounter = this.filterDocuments().length;
      this.Imagecounter = this.filterGallery().length;
      this.MainImageCounter = this.Imagecounter;
      this.galleryimageupload();
      this.notavideo = false;
      if (
        this.prodVideo.length != 0 &&
        (this.prodVideo[0].media == null ||
          this.prodVideo[0].media == 'bnVsbA==' ||
          this.prodVideo[0].media == 'null' ||
          (this.type != 'bet' ? this.prodVideo[0].mediaContentType == null : this.prodVideo[0].media_content_type == null))
      ) {
        this.prodVideo[0].media = null;
      } else if (
        this.prodVideo.length != 0 &&
        !this.prodVideo[0].media.includes('https://www.youtube.com') &&
        !this.prodVideo[0].media.includes('https://youtube.com') &&
        !this.prodVideo[0].media.includes('https://youtu.be') &&
        !this.prodVideo[0].media.includes('https://a-gon.de') &&
        !this.prodVideo[0].media.includes('https://vimeo.com') &&
        !this.prodVideo[0].media.includes('https://www.dailymotion.com') &&
        !this.prodVideo[0].media.includes('https://www.vimeo.com') &&
        !this.prodVideo[0].media.includes('https://dailymotion.com')
      ) {
        this.notavideo = true;
      } else if (
        this.prodVideo.length != 0 &&
        this.prodVideo[0].media != null &&
        this.prodVideo[0].media != 'bnVsbA==' &&
        this.prodVideo[0].media != 'null'
      ) {
        this.iframe_html = this.embedService.embed(this.prodVideo[0].media);
      }
    }
  }


  changevideo() {
    this.notavideo = false;
    if (
      !this.prodVideo[0].media.includes('https://www.youtube.com') &&
      !this.prodVideo[0].media.includes('https://youtube.com') &&
      !this.prodVideo[0].media.includes('https://a-gon.de') &&
      !this.prodVideo[0].media.includes('https://youtu.be') &&
      !this.prodVideo[0].media.includes('https://vimeo.com') &&
      !this.prodVideo[0].media.includes('https://www.dailymotion.com') &&
      !this.prodVideo[0].media.includes('https://www.vimeo.com') &&
      !this.prodVideo[0].media.includes('https://dailymotion.com')
    ) {
      this.notavideo = true;
    } else {
      this.iframe_html = this.embedService.embed(this.prodVideo[0].media);
      if (this.type != 'bet') {
        this.prodVideo[0].mediaContentType = 'video-link';
      } else {
        this.prodVideo[0].media_content_type = 'video-link';
      }
      this.prodVideo[0].isAdded = true;
    }
    let index = this.prodMedia.findIndex(video => video.mediatypCode == 2);
    this.prodMedia[index] = this.prodVideo[0];
  }

  filterNotPictures($event) {
    let list = [];
    for (let i = 0; i < $event.target.files.length; i++) {
      if (
        !(
          $event.target.files[i].type == 'image/jpeg' ||
          $event.target.files[i].type == 'image/gif' ||
          $event.target.files[i].type == 'image/png' ||
          $event.target.files[i].type == 'image/bmp' ||
          $event.target.files[i].type == 'image/jpg'
        )
      ) {
        this.imageFormatCheck = true;
        if (this.filterGallery().length == 0) {
          this.modalReference.close();
        }
        this.isLoading = false;
      } else {
        list.push(i);
      }
    }
    return list;
  }

  galleryimageupload() {
    const newImages = [];
    for (let i = 0; i < this.Imagecounter; i++) {
      let autor = null;
      let quelle = null;
      let lizenz = null;
      let hinweis = null;
      let image = this.filterGallery()[i];
      if (image.media_titel == null) {
        image.media_titel = '';
      }
      if (image.media_autor == null || image.media_autor == '') {
        image.media_autor = '';
        autor = '';
      } else {
        autor = ' • Autor: ';
      }
      if (image.media_quelle == null || image.media_quelle == '') {
        image.media_quelle = '';
        quelle = '';
      } else {
        quelle = ' • Quelle: ';
      }
      if (image.media_lizenz == null || image.media_lizenz == '') {
        image.media_lizenz = '';
        lizenz = '';
      } else {
        lizenz = ' • Lizenz: ';
      }
      if (image.media_hinweis == null || image.media_hinweis == '') {
        image.media_hinweis = '';
        hinweis = '';
      } else {
        hinweis = ' • Hinweis: ';
      }
      newImages.push({
        small: 'data:image/jpeg;base64,' + this.filterGallery()[i].media,
        medium: 'data:image/jpeg;base64,' + this.filterGallery()[i].media,
        big: 'data:image/jpeg;base64,' + this.filterGallery()[i].media,
        description:
          image.media_titel +
          '<h6>' +
          autor +
          image.media_autor +
          quelle +
          image.media_quelle +
          lizenz +
          image.media_lizenz +
          hinweis +
          image.media_hinweis +
          '</h6>',
      });
      this.galleryImages = newImages;
    }
    for (let deleteImage of this.onRemoveImageList) {
      this.deleteFromDatabase(deleteImage.id);
    }
    this.onRemoveImageList = [];
  }

  setGalleryData(event, entity, field, isImage, counter) {
    this.isLoading = true;
    let i = 0;
    for (const image of event.target.files) {
      if (
        event.target.files[i].type == 'image/jpeg' ||
        event.target.files[i].type == 'image/gif' ||
        event.target.files[i].type == 'image/png' ||
        event.target.files[i].type == 'image/bmp' ||
        event.target.files[i].type == 'image/jpg'
      ) {
        this.getBase64(image).then(data => {
          let baseimage = '' + data;
          this.imageCompress.compressFile(baseimage, DOC_ORIENTATION.Up, 50, 50).then(compressedimage => {
            const something: string[] = compressedimage.split(';base64,');
            const type: string[] = something[0].split('data:');
            entity[i + counter][field] = something[1];
            entity[i + counter][field + 'ContentType'] = type[1];
            entity[i + counter].isAdded = true;
            i++;
            if (event.target.files.length == i) {
              this.isLoading = false;
            }
          });
        });
      }
    }
  }

  setGallery($event, $entity, field, isImage) {
    this.imageFormatCheck = false;
    this.setGalleryData($event, $entity, field, isImage, this.Imagecounter);
    this.Imagecounter = this.Imagecounter + this.filterNotPictures($event).length;
  }

  getBase64(imageFile) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  filterVideo() {
    if (this.type == 'bet') {
      return this.prodMedia.filter(video => video.mediatyp_code == 2);
    } else {
      return this.prodMedia.filter(video => video.mediatypCode == 2);
    }
  }

  filterGallery() {
    if (this.type == 'bet') {
      return this.prodMedia
        .filter(gallery => gallery.mediatyp_code == 1)
        .sort((a, b) => (a.reihenfolge > b.reihenfolge ? 1 : b.reihenfolge > a.reihenfolge ? -1 : 0));
    } else {
      return this.prodMedia
        .filter(gallery => gallery.mediatypCode == 1)
        .sort((a, b) => (a.reihenfolge > b.reihenfolge ? 1 : b.reihenfolge > a.reihenfolge ? -1 : 0));
    }
  }

  filterDocuments() {
    if (this.type == 'bet') {
      return this.prodMedia
        .filter(video => video.mediatyp_code == 0)
        .sort((a, b) => (a.reihenfolge > b.reihenfolge ? 1 : b.reihenfolge > a.reihenfolge ? -1 : 0));
    } else {
      return this.prodMedia
        .filter(documents => documents.mediatypCode == 0)
        .sort((a, b) => (a.reihenfolge > b.reihenfolge ? 1 : b.reihenfolge > a.reihenfolge ? -1 : 0));
    }
  }

  addGallery($event, type) {
    let length = this.filterNotPictures($event).length;
    for (let i = 0; i < length; i++) {
      if (type == 'production') {
        this.prodMedia.push(
          new ProdMedia(null, null, null, null, 1, null, this.MainImageCounter, null, null, null, null, null, null, null)
        );
      } else if (type == 'stage') {
        this.prodMedia.push(new StageMedia(null, null, null, null, 1, this.MainImageCounter, null, null, null));
      } else if (type == 'werk') {
        this.prodMedia.push(new WerkMedia(null, null, null, null, 1, null, this.MainImageCounter, null, null));
      } else if (type == 'bet') {
        this.prodMedia.push(new betMedia(null, null, null, null, 1, null, this.MainImageCounter, null, null, null, null, null, null, null));
      } else if (type == 'kunstlerProduction') {
        this.prodMedia.push(
          new KunstlerProdMediaModel(null, null, null, null, 1, null, this.MainImageCounter, null, null, null, null, null, null, null)
        );
      } else if (type == 'kunstlerProductionProjekt') {
        this.prodMedia.push(
          new KunstlerProdProjektMediaModel(
            null,
            null,
            null,
            null,
            1,
            null,
            this.MainImageCounter,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          )
        );
      }
      this.MainImageCounter++;
    }
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  save() {
    //    this.bpService.update(this.bp).subscribe();
  }

  removealbumimage(i: number) {
    if (this.filterGallery()[i].id == null) {
      this.prodMedia.splice(
        this.prodMedia.findIndex(todelete => todelete.media === this.filterGallery()[i].media),
        1
      );
    } else {
      // this.deleteFromDatabase(this.filterGallery()[i].id);
      this.onRemoveImageList.push(this.filterGallery()[i]);
      this.prodMedia.splice(
        this.prodMedia.findIndex(todelete => todelete.media === this.filterGallery()[i].media),
        1
      );
    }
    let counter = 0;
    for (let prodmedia of this.filterGallery()) {
      prodmedia.reihenfolge = counter;
      counter++;
    }
    const newImages = this.galleryImages;
    newImages.slice(i, 1);
    this.galleryImages = newImages;
    if (this.Imagecounter > 0) {
      this.Imagecounter--;
    }
    if (this.MainImageCounter > 0) {
      this.MainImageCounter--;
    }
  }

  open(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then(
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
      if (file.type == 'produkt' && file.id != null) {
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
      } else if (file.type == 'kunst' && file.id != null) {
        this.mediaService.getKunstlerProduktByIdMedia(file.id).subscribe(prodmedia => {
          file.media = prodmedia.media;
          file.mediaContentType = prodmedia.mediaContentType;
          this.downloadPdf(file);
        });
      }
    } else {
      this.downloadPdf(file);
    }
  }

  downloadPdf(file) {
    let blob = b64toBlob(file.media, this.type != 'bet' ? file.mediaContentType : file.media_content_type);
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  fileEvent($event) {
    this.documentFormatNotSupported = false;
    this.documentSizeExceeded = false;
    let j = 0;

    for (const fileupload of $event.target.files) {
      console.log(mime.getType(fileupload.name));
      if (
        mime.getType(fileupload.name) == 'application/msword' ||
        mime.getType(fileupload.name) == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        mime.getType(fileupload.name) == 'application/pdf' ||
        mime.getType(fileupload.name) == 'audio/mpeg' ||
        mime.getType(fileupload.name) == 'image/jpeg' ||
        mime.getType(fileupload.name) == 'image/png' ||
        mime.getType(fileupload.name) == 'image/gif' ||
        mime.getType(fileupload.name) == 'application/vnd.ms-word.document.macroenabled.12' ||
        mime.getType(fileupload.name) == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        mime.getType(fileupload.name) == 'application/vnd.ms-excel' ||
        mime.getType(fileupload.name) == 'application/vnd.ms-excel.sheet.macroenabled.12' ||
        mime.getType(fileupload.name) == 'application/vnd.oasis.opendocument.text' ||
        mime.getType(fileupload.name) == 'text/csv' ||
        mime.getType(fileupload.name) == 'text/plain; charset=utf-8' ||
        mime.getType(fileupload.name) == 'text/plain' ||
        mime.getType(fileupload.name) == 'text/pdf'
      ) {
        console.log('size: ' + fileupload.size);
        if (fileupload.size <= 7200000) {
          if (this.type == 'kunstlerProduction') {
            this.prodMedia.push(new KunstlerProdMediaModel(null, null, null, null, 0, null, j, null, null, null, null, null, null, null));
          } else if (this.type == 'kunstlerProductionProjekt') {
            this.prodMedia.push(
              new KunstlerProdProjektMediaModel(null, null, null, null, 0, null, j, null, null, null, null, null, null, null)
            );
          } else if (this.type == 'bet') {
            this.prodMedia.push(new betMedia(null, null, null, null,  0, null, j, null, null));
            console.log("betting")
          } else {
            this.prodMedia.push(new ProdMedia(null, null, null, null, 0, null, j, null, null));
          }
          j++;
          this.documentSizeExceeded = false;
        } else {
          this.documentSizeExceeded = true;
        }
        console.log('size excedded: ' + this.documentSizeExceeded);
      }
    }
    this.setFile($event, this.prodMedia, 'media', false, j);
  }

  setFile($event, $entity, field, isImage, counter: number) {
    this.setFileData($event, $entity, field, isImage, this.FileCounter);
    this.FileCounter = this.FileCounter + counter;
  }

  setFileData(event, entity, field, isImage, counter) {
    let tp = this.type;
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
          mime.getType(event.target.files[i].name) == 'image/gif' ||
          mime.getType(event.target.files[i].name) == 'application/vnd.ms-word.document.macroenabled.12' ||
          mime.getType(event.target.files[i].name) == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          mime.getType(event.target.files[i].name) == 'application/vnd.ms-excel' ||
          mime.getType(event.target.files[i].name) == 'application/vnd.oasis.opendocument.text' ||
          mime.getType(event.target.files[i].name) == 'application/vnd.ms-excel.sheet.macroenabled.12' ||
          mime.getType(event.target.files[i].name) == 'text/csv' ||
          mime.getType(event.target.files[i].name) == 'text/plain; charset=utf-8' ||
          mime.getType(event.target.files[i].name) == 'text/plain'
        ) {
          console.log('size: ' + event.target.files[i].size);
          if (event.target.files[i].size <= 7200000) {
            this.toBase64(file_1, function (base64Data) {
              let index;
              entity.forEach((xx :any)=>{
                console.log(xx.titel);
                console.log(xx.id);
                console.log(xx.mediatyp_code);

              });
              if (tp != 'bet') {
                index = entity.findIndex(file => file.titel == null && file.id == null && file.mediatypCode == 0);
              } else {
                index = entity.findIndex(file => file.titel == null && file.id == null && file.mediatyp_code == 0);
              }
              console.log(index);
              if (index != -1) {
                entity[index][field] = base64Data;
                console.log('counter name:', index);

                if (tp != 'bet') {
                  entity[index][field + 'ContentType'] = mime.getType(file_1.name);
                } else {
                  entity[index][field + '_content_type'] = mime.getType(file_1.name);
                }
                entity[index].titel = file_1.name;
                entity[index].isAdded = true;
                console.log('file name:', entity[index]);
                entity = [...entity];
                console.log("first");
                j++;
              }
            }).then(()=>{
              this.prodMedia =[...entity];
              this.media.emit([...entity]);
              console.log("second");
              console.log(this.prodMedia);
            });
          }
        } else {
          this.documentFormatNotSupported = true;
        }
      }
    }
  }

  toBase64(file: File, cb: Function) {
  return new Promise((resolve, reject) => {

    const fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function (e:any) {
      const base64Data: string = e.target.result.substr(e.target.result.indexOf('base64,') + 'base64,'.length);
      cb(base64Data);
      resolve(true);
    }
    fileReader.onerror = function (evt) {
      reject("error reading file");
    }});
  }

  console(){
    for(let media of this.prodMedia){
      if(media.media != null){
        console.log("media is not null "+ media.titel);
      }
    }
  }
  removevideo() {
    let deleteVideo = this.filterVideo()[0].id;
    let index = this.prodMedia.findIndex(todelete => todelete.media === this.filterVideo()[0].media);
    if (deleteVideo == null) {
      this.prodMedia[index].media = null;
      if (this.type != 'bet') {
        this.prodMedia[index].mediaContentType = null;
      } else {
        this.prodMedia[index].media_content_type = null;
      }
    } else {
      this.deleteFromDatabase(deleteVideo);
      this.prodMedia[index].media = null;
      if (this.type != 'bet') {
        this.prodMedia[index].mediaContentType = null;
      } else {
        this.prodMedia[index].media_content_type = null;
      }
    }
  }

  removefile(i: number) {
    Swal.fire({
      title: 'Sind Sie sicher?',
      text: 'Dieser Schritt kann nicht rückgängig gemacht werden',
      type: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonColor: '#f28d35',
      cancelButtonColor: '#9c9c9c',
      cancelButtonText: 'Abbrechen',
      confirmButtonText: 'Ja, Dokument löschen',
    }).then(result => {
      console.log('result index: ', i);
      if (result.value) {
        Swal.fire('Entfernt!', ' Das Dokument wurde gelöscht.', 'success').then();
        let deleteDocument = this.filterDocuments()[i].id;
        this.filterDocuments()[i].web = 'delete';
        if (deleteDocument != null) {
          this.deleteFromDatabase(deleteDocument);
        }
        let newList :any[] = this.prodMedia.filter(media => media.web != 'delete');
        this.prodMedia = [...newList];
        console.log('prodmedia:', this.prodMedia);
        this.media.emit([...this.prodMedia]);
        for(let media of this.prodMedia){
          if(media.media != null){
            console.log("media is not null "+ media.titel);
          }
        }
        if (this.FileCounter > 0) {
          this.FileCounter--;
        }
      }
    });
  }

  updateGalleryImageList() {
    for (let tryTodelete of this.onRemoveImageList) {
      if (this.prodMedia.filter(value => value.id == tryTodelete.id).length == 0) {
        this.prodMedia.push(tryTodelete);
      }
    }
    this.onRemoveImageList = [];
  }

  deleteFromDatabase(id: number) {
    if (this.type == 'bet') {
      this.mediaService.deleteBetMedia(id).subscribe();
    } else if (this.type == 'kunstlerProduction') {
      this.mediaService.deleteKunstlerProduktByIdMedia(id).subscribe();
    } else if (this.type == 'kunstlerProduction') {
      this.mediaService.deleteKunstlerProduktProjektByIdMedia(id).subscribe();
    } else if (this.type != 'bet') {
      this.mediaService.delete(id).subscribe();
    }
  }

  setMainImage(i, item) {
    this.mediaProd = this.filterGallery().filter((media: any) => media.mediatypCode == 1 && media.reihenfolge == 0)[0];
    let orderIndex = item.reihenfolge;
    let werhattenull = this.filterGallery().findIndex(mainimage => mainimage == this.mediaProd);
    this.filterGallery()[werhattenull].isAdded = true;
    this.filterGallery()[werhattenull].reihenfolge = orderIndex;
    this.filterGallery().filter(value => value == item)[0].reihenfolge = 0;
    this.filterGallery().filter(value => value == item)[0].isAdded = true;
  }

  setToSave(i) {
    this.filterGallery()[i].isAdded = true;
  }

  showImageInfoFunc(i) {
    this.showImageInfo = i;
    if (i.show == null || i.show == undefined) {
      i.show = true;
    } else {
      i.show = !i.show;
    }
  }

  moveImageToleft(event: any, currentIndex: number) {
    let updatedReihenfolg = this.filterGallery()[currentIndex - 1].reihenfolge;
    this.filterGallery()[currentIndex - 1].reihenfolge = event.reihenfolge;
    this.filterGallery()[currentIndex - 1].isAdded = true;
    this.filterGallery().filter(value => value == event)[0].reihenfolge = updatedReihenfolg;
    this.filterGallery().filter(value => value == event)[0].isAdded = true;
  }

  moveImageToRight(event: any, currentIndex: number) {
    let updatedReihenfolg = this.filterGallery()[currentIndex + 1].reihenfolge;
    this.filterGallery()[currentIndex + 1].reihenfolge = event.reihenfolge;
    this.filterGallery()[currentIndex + 1].isAdded = true;
    this.filterGallery().filter(value => value == event)[0].reihenfolge = updatedReihenfolg;
    this.filterGallery().filter(value => value == event)[0].isAdded = true;
  }
}
