import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import { DOC_ORIENTATION, NgxImageCompressService } from 'ngx-image-compress';
import {JhiDataUtils} from "../../util/JhiDataUtils";
import Swal from "sweetalert2";


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
  //image cropper
  imageChangedEvent: any = '';
  closeResult: string;
  file: any;

  private LOGO = '../../../../content/images/placeholder_betrieb.jpg';
  private Profileplaceholder = '../../../../content/images/Portrait_Placeholder.png';

  imageName;
  keys;
  localUrl;
  imageType;
  imageSize;
  imageModifiedDate;
  imageFormatCheck = false;
  imageSizeCheck = false;
  check: any = false;
  ResizeOptions: any;
  lastLoad: any;
  isLoading = false;
  roundCropperForImageCropper = false;
  imageUpload;
  imageUploadBkp = { bildContentType: null, bild: null, mediaContentType: null, media: null };
  @Input() field: any;
  @Input() bpimage: any;
  @Output() imageUploaded: EventEmitter<any> = new EventEmitter<any>();
  public fileBlob: any;

  constructor( private dataUtils: JhiDataUtils,private modalService: NgbModal, private imageCompress: NgxImageCompressService) {}

  ngOnInit(): void {
    if (this.field == 'bild') {
      this.roundCropperForImageCropper = true;
      this.imageUpload = 'data:' + this.bpimage.bildContentType + ';base64,' + this.bpimage.bild;
    } else if (this.field === 'media') {
      this.roundCropperForImageCropper = false;
      this.imageUpload = 'data:' + this.bpimage.bildContentType + ';base64,' + this.bpimage.bild;
    } else if (this.field === 'bildButtonOnly') {
      this.roundCropperForImageCropper = true;
      this.imageUpload = 'data:' + this.bpimage.bildContentType + ';base64,' + this.bpimage.bild;
    } else if (this.field === 'mediaButtonOnly') {
      this.roundCropperForImageCropper = false;
      this.imageUpload = 'data:' + this.bpimage.mediaContentType + ';base64,' + this.bpimage.bild;
    }
  }

  ngOnChanges(changes) {
    if (this.field == 'bild') {
      this.imageUploadBkp.bildContentType = changes.bpimage.currentValue.bildContentType;
      this.imageUploadBkp.bild = changes.bpimage.currentValue.bild;
    } else if (this.field === 'media') {
      this.imageUploadBkp.mediaContentType = changes.bpimage.currentValue.mediaContentType;
      this.imageUploadBkp.media = changes.bpimage.currentValue.media;
    }
  }

  //trigger image cropper modal
  fileChangeEvent(event: any): void {
    console.log(event);
    this.imageChangedEvent = event;
  }

  cropperFinish() {
    if (this.field === 'mediaButtonOnly') {
      this.imageUploaded.emit(this.bpimage);
    } else if (this.field === 'bildButtonOnly') {
      this.imageUploaded.emit(this.bpimage);
    }
  }

  selectFile(event: any, $event, entity, field, isImage, content) {
    console.log(event.target.files);
    this.setFileData($event, entity, field, isImage, content);
    let fileName: any;
    this.file = event.target.files[0];
    fileName = this.file['name'];

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (eventReader: any) => {
        this.localUrl = eventReader.target.result;
        this.compressFile(this.localUrl, fileName);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  compressFile(image, fileName) {
    console.log(image);
    this.imageCompress.compressFile(image, DOC_ORIENTATION.Up, 50, 50).then(compressedimage => {
      const something: string[] = compressedimage.split(';base64,');
      const type: string[] = something[0].split('data:');
      // create file from byte
      console.log('compressing');
      const imageName = fileName;
      // call method that creates a blob from dataUri
      const imageBlob = this.dataURItoBlob(compressedimage.split(',')[1], type[1]);
      this.fileBlob = imageBlob;
    }, ()=>{
      Swal.fire({
        title: 'Error',
        text: 'Es ist ein Fehler aufgetreten oder ein nicht Unterstütztes Bild war Hochgeladen.' +
          ' Bitte laden Sie die Seite neu oder versuchen sie einen anderen Bild.',
        type: 'warning',
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonColor: '#f28d35',
        cancelButtonColor: '#9c9c9c',
        confirmButtonText: 'Neu laden',
      }).then(result => {
        window.location.reload();
      });
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

  imageCropped(image: any) {
    console.log(image);
    const justcodeimage = image.base64.split(',');
    console.log('cropped');

    if (this.field === 'bild') {
      this.bpimage.bild = justcodeimage[1];
      this.bpimage.bildContentType = this.imageType;
      this.imageUpload = 'data:' + this.bpimage.bildContentType + ';base64,' + this.bpimage.bild;
    } else if (this.field === 'media') {
      this.bpimage.media = justcodeimage[1];
      this.bpimage.mediaContentType = this.imageType;
      this.imageUpload = 'data:' + this.bpimage.mediaContentType + ';base64,' + this.bpimage.media;
    } else if (this.field === 'mediaButtonOnly') {
      this.bpimage.media = justcodeimage[1];
      this.bpimage.mediaContentType = this.imageType;
      this.imageUpload = 'data:' + this.bpimage.mediaContentType + ';base64,' + this.bpimage.media;
    } else if (this.field === 'bildButtonOnly') {
      this.bpimage.bild = justcodeimage[1];
      this.bpimage.bildContentType = this.imageType;
      this.imageUpload = 'data:' + this.bpimage.bildContentType + ';base64,' + this.bpimage.bild;
    } else {
    }
    this.isLoading = false;
  }

  imageLoaded($event) {}

  loadImageFailed() {
    // show message
  }

  setFile($event, entity, field, isImage) {
    this.dataUtils.setFileData($event, entity, field, isImage);
    this.check = true;
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  open(content) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false }).result.then(
      result => {},
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.performActionBasedOnDismissalReason(this.closeResult);
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else if (reason === 'Cross click') {
      return 'Cross click';
    } else {
      return `with: ${reason}`;
    }
  }

  performActionBasedOnDismissalReason(reason: string) {
    if (reason == 'Dismissed by pressing ESC') {
      this.resetImageValueToOrignalValue();
    } else if (reason === 'Dismissed Cross click') {
      //this.imageUpload = 'data:' + this.bpimage.mediaContentType + ';base64,' + this.bpimage.media;
      if (this.field === 'bild') {
        this.imageUpload = 'data:' + this.bpimage.bildContentType + ';base64,' + this.bpimage.bild;
      } else if (this.field === 'media') {
        this.imageUpload = 'data:' + this.bpimage.mediaContentType + ';base64,' + this.bpimage.media;
      } else if (this.field === 'mediaButtonOnly') {
        this.imageUpload = 'data:' + this.bpimage.mediaContentType + ';base64,' + this.bpimage.media;
      } else if (this.field == 'bildButtonOnly') {
        this.imageUpload = 'data:' + this.bpimage.bildContentType + ';base64,' + this.bpimage.bild;
      }
    } else {
      this.resetImageValueToOrignalValue();
    }
  }

  resetImageValueToOrignalValue() {
    if (this.field == 'bild') {
      this.bpimage.bildContentType = this.imageUploadBkp.bildContentType;
      this.bpimage.bild = this.imageUploadBkp.bild;
    } else if (this.field == 'media') {
      this.bpimage.mediaContentType = this.imageUploadBkp.mediaContentType;
      this.bpimage.media = this.imageUploadBkp.media;
    } else if (this.field == 'mediaButtonOnly') {
      this.bpimage.mediaContentType = this.imageUploadBkp.mediaContentType;
      this.bpimage.media = this.imageUploadBkp.media;
    } else if (this.field == 'bildButtonOnly') {
      this.bpimage.bildContentType = this.imageUploadBkp.bildContentType;
      this.bpimage.bild = this.imageUploadBkp.bild;
    }
  }

  // compressImage($event, entity) {
  //   let option: ResizeOptions = { Resize_Max_Height: 1920, Resize_Max_Width: 1080, Resize_Quality: 60, Resize_Type: '' };
  //
  //   // ImageCompressService.filesToCompressedImageSourceEx($event.target.files, option).then(observableImages => {
  //   //   let images = [];
  //   //   observableImages.subscribe(
  //   //     image => {
  //   //       images.push(image);
  //   //       if (this.field == 'bildButtonOnly') {
  //   //         entity['bild'] = image.compressedImage.imageDataUrl.split('base64,')[1];
  //   //         entity['bildContentType'] = image.compressedImage.type;
  //   //       } else if (this.field == 'mediaButtonOnly') {
  //   //         entity['media'] = image.compressedImage.imageDataUrl.split('base64,')[1];
  //   //         entity['mediaContentType'] = image.compressedImage.type;
  //   //       } else {
  //   //         entity[this.field] = image.compressedImage.imageDataUrl.split('base64,')[1];
  //   //         entity[this.field + 'ContentType'] = image.compressedImage.type;
  //   //       }
  //   //     },
  //   //     error => {},
  //   //     () => {
  //         this.isLoading = false;
  //       }
  //     );
  //   });
  // }

  setFileData($event, entity, field, isImage, content) {
    this.isLoading = true;

    for (let i = 0; i < $event.target.files.length; i++) {
      this.imageName = $event.target.files[i].name;
      this.imageType = $event.target.files[i].type;
      this.imageSize = $event.target.files[i].size;
      this.imageModifiedDate = $event.target.files[i].lastModifiedDate;
    }

    if (this.imageType == 'image/jpeg' || this.imageType == 'image/gif' || this.imageType == 'image/png' || this.imageType == 'image/bmp') {
      this.imageFormatCheck = false;
      if (this.imageSize > 10000000) {
        this.imageSizeCheck = true;
        this.isLoading = false;
      } else {
        this.imageSizeCheck = false;
        // this.compressImage($event, entity);
        // this.dataUtils.setFileData($event, entity, field, isImage);
        this.check = true;
        this.open(content);
      }
    } else {
      this.imageFormatCheck = true;
      this.isLoading = false;
    }
    this.lastLoad = this.bpimage.bild;
  }

  removeImage(field) {
    if (field === 'bild') {
      this.bpimage.bild = null;
      this.bpimage.bildContentType = null;
      this.imageUpload = '../../../content/images/Portrait_Placeholder.png';
      this.imageUpload = '../c';
    } else {
      this.bpimage.media = null;
      this.bpimage.mediaContentType = null;
      this.imageUpload = '../../content/images/Portrait_Placeholder.png';
    }
  }

  loadImageBetriebpage(betrieb: any) {
    return betrieb == null || betrieb.mediaContentType == null || betrieb.media == null
      ? { 'background-image': 'url(' + this.LOGO + ')' }
      : { 'background-image': 'url(data:' + betrieb.mediaContentType + ';base64,' + betrieb.media + ')' };
  }

  loadImageUserpage(user: any) {
    return user == null || user.bildContentType == null || user.bild == null
      ? { 'background-image': 'url(' + this.Profileplaceholder + ')' }
      : { 'background-image': 'url(data:' + user.bildContentType + ';base64,' + user.bild + ')' };
  }
}
