import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DOC_ORIENTATION, NgxImageCompressService} from 'ngx-image-compress';
import {JhiDataUtils} from "../../util/JhiDataUtils";

@Component({
  selector: 'app-shared-images',
  templateUrl: './shared-images.component.html',
  styleUrls: ['./shared-images.component.scss'],
})
export class SharedImagesComponent implements OnInit {
  @Input() Mitimage: any;
  @Input() j: number;
  @Input() typeofmitarbeiter: string;
  @Output() signUploaded: EventEmitter<any> = new EventEmitter<any>();

  //image cropper
  imageChangedEvent: any = '';
  croppedImage: any = '';
  closeResult: string;
  lastLoad: any = null;
  ResizeOptions: any;
  imageName;
  keys;
  imageType;
  imageSize;
  imageModifiedDate;
  imageFormatCheck = false;
  imageSizeCheck = false;
  check: any = false;
  field = 'bild';
  imageUploadMit;
  isLoading = false;
  private file: any;
  public fileBlob: any;

  constructor(private dataUtils: JhiDataUtils, private modalService: NgbModal, private imageCompress: NgxImageCompressService) {}

  ngOnInit(): void {
    this.imageUploadMit = 'data:' + this.Mitimage.bildContentType + ';base64,' + this.Mitimage.bild;
    this.lastLoad = this.Mitimage;
  }

  setFileDataMit($event, entity, field, isImage, content) {
    this.isLoading = true;
    let imageCheck;
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
      this.imageSizeCheck = true;
      this.isLoading = false;
    }
    this.fileChangeEventMit($event);
  }

  //image cropper functions
  fileChangeEventMit(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(image: any) {
    let justcodeimage = image.base64.split(',');
    this.Mitimage.bild = justcodeimage[1];
    this.Mitimage.bildContentType = this.imageType;
    this.isLoading = false;

    this.imageUploadMit = 'data:' + this.Mitimage.bildContentType + ';base64,' + this.Mitimage.bild;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }
  base64Converter() {
    this.signUploaded.emit('imageUploaded');
  }

  setFile($event, entity, field, isImage) {
    this.dataUtils.setFileData($event, entity, field, isImage);
    this.check = true;
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  selectFile(event: any, $event, entity, field, isImage, content) {
    // console.log(event.target.files);
    this.setFileDataMit($event, entity, field, isImage, content);
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

  open(content) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  // compressImage($event, entity) {
  //   let option: ResizeOptions = { Resize_Max_Height: 1920, Resize_Max_Width: 1080, Resize_Quality: 60, Resize_Type: '' };
  //
  //   ImageCompressService.filesToCompressedImageSourceEx($event.target.files, option).then(observableImages => {
  //     let images = [];
  //     observableImages.subscribe(
  //       image => {
  //         images.push(image);
  //       },
  //       error => {},
  //       () => {
  //         entity[this.field] = images[0].compressedImage.imageDataUrl.split('base64,');
  //         entity[this.field + 'ContentType'] = images[0].compressedImage.type;
  //         this.isLoading = false;
  //       }
  //     );
  //   });
  // }

  removeImage() {
    this.Mitimage.bild = null;
    this.Mitimage.bildContentType = null;
  }
}
