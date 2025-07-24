import {Component, Input, OnInit} from '@angular/core';
import 'hammerjs';

@Component({
  selector: 'app-product-media-document',
  templateUrl: './product-media-document.component.html',
  styleUrls: ['./product-media-document.component.scss'],
})
export class ProductMediaDocumentComponent implements OnInit {
  @Input() prodMedia: any[];
  @Input() type: string;
  @Input() mediaService: any;

  ngOnInit(): void {}

  filterDocuments() {
    if (this.type != 'bet') {
      return this.prodMedia.filter(documents => documents.mediatypCode == 0);
    } else {
      return this.prodMedia.filter(documents => documents.mediatyp_code == 0);
    }
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
          this.mediaService.getPublicKunstlerProduktMediaOne(file.id).subscribe(prodmedia => {
            console.log('meida:' + prodmedia.mediaContentType + ',' + prodmedia.media_content_type);
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
        } else if (file.type == 'kunst' && file.id != null) {
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
    console.log('meida:' + file.mediaContentType + ',' + file.media_content_type);
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
}

export default function b64toBlob(dataURI, typeOfData) {
  let byteString = atob(dataURI);
  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: typeOfData });
}
