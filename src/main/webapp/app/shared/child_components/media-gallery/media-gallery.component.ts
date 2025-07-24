import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ProdMedia} from 'app/shared/models/production-media.model';
import {StageMedia} from 'app/shared/models/stage-media.model';
import {WerkMedia} from 'app/shared/models/werk-media.model';
import {betMedia} from 'app/shared/models/betrieb.model';
import {KunstlerProdMediaModel} from 'app/shared/models/kunstler-prod-media.model';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from '@hyahfoufi/ngx-gallery';
import {DOC_ORIENTATION, NgxImageCompressService} from 'ngx-image-compress';

@Component({
  selector: 'app-media-gallery',
  templateUrl: './media-gallery.component.html',
  styleUrls: ['./media-gallery.component.scss'],
})
export class MediaGalleryComponent implements OnInit, OnChanges {
  modalReference: NgbModalRef;
  closeResult: string;
  Imagecounter: number = 0;
  MainImageCounter: number = 0;
  galleryOptionsComp: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  imageFormatCheck: boolean = false;
  isLoading = false;
  onRemoveImageList = [];

  @Input() prodMediaList: any[];
  @Input() type: string;
  @Output() removeGalleryImage: EventEmitter<any> = new EventEmitter<any>();

  constructor(private modalService: NgbModal, private imageCompress: NgxImageCompressService) {}

  ngOnInit() {
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
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.prodMediaList != undefined) {
      this.Imagecounter = this.filterGallery().length;
      this.MainImageCounter = this.Imagecounter;
      this.galleryimageupload();
    }
  }

  filterGallery() {
    return this.prodMediaList
      .filter(gallery => gallery.mediatypCode == 1)
      .sort((a, b) => (a.reihenfolge > b.reihenfolge ? 1 : b.reihenfolge > a.reihenfolge ? -1 : 0));
  }

  filterNotPictures($event) {
    let list = [];
    for (let i = 0; i < $event.target.files.length; i++) {
      if (
        $event.target.files[i].type == 'image/jpeg' ||
        $event.target.files[i].type == 'image/gif' ||
        $event.target.files[i].type == 'image/png' ||
        $event.target.files[i].type == 'image/bmp' ||
        $event.target.files[i].type == 'image/jpg'
      ) {
        list.push($event.target.files[i]);
      } else {
        this.imageFormatCheck = true;
        if (this.filterGallery().length == 0) {
          this.modalReference.close();
        }
        this.isLoading = false;
      }
    }
    return list;
  }

  addGallery($event, type) {
    let length = this.filterNotPictures($event).length;
    for (let i = 0; i < length; i++) {
      if (type == 'production') {
        this.prodMediaList.push(
          new ProdMedia(null, null, null, null, 1, null, this.MainImageCounter, null, null, null, null, null, null, null)
        );
      } else if (type == 'stage') {
        this.prodMediaList.push(new StageMedia(null, null, null, null, 1, this.MainImageCounter, null, null, null));
      } else if (type == 'werk') {
        this.prodMediaList.push(new WerkMedia(null, null, null, null, 1, null, this.MainImageCounter, null, null));
      } else if (type == 'bet') {
        this.prodMediaList.push(
          new betMedia(null, null, null, null, 1, null, this.MainImageCounter, null, null, null, null, null, null, null)
        );
      } else if (type == 'kunstlerProduction') {
        this.prodMediaList.push(
          new KunstlerProdMediaModel(null, null, null, null, 1, null, this.MainImageCounter, null, null, null, null, null, null, null)
        );
      } else if (type == 'kunstlerProductionProjekt') {
        this.prodMediaList.push(
          new ProdMedia(null, null, null, null, 1, null, this.MainImageCounter, null, null, null, null, null, null, null)
        );
      }
      this.MainImageCounter++;
    }
  }

  compressImage($event, entity) {
    this.getBase64($event.target.files[0]).then(data => {
      const baseimage = '' + data;
      this.imageCompress.compressFile(baseimage, DOC_ORIENTATION.Up, 50, 50).then(compressedimage => {
        const something: string[] = compressedimage.split(';base64,');
        const type: string[] = something[0].split('data:');
        entity.bild = something[1];
        entity.bildContentType = type[1];
      });
    });
  }

  setGalleryData(event, entity, field, isImage, counter) {
    this.isLoading = true;
    let i = 0;
    for (let image of event.target.files) {
      this.getBase64(image).then(data => {
        const baseimage = '' + data;
        this.imageCompress.compressFile(baseimage, DOC_ORIENTATION.Up, 50, 50).then(compressedimage => {
          const something: string[] = compressedimage.split(';base64,');
          const type: string[] = something[0].split('data:');
          entity[i + counter][field] = something[1];
          entity[i + counter][field + 'ContentType'] = type[1];
          i++;
          if (event.length == i) {
            this.isLoading = false;
          }
        });
      });
    }
  }

  getBase64(imageFile) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  setGallery($event, $entity, field, isImage) {
    this.imageFormatCheck = false;
    this.setGalleryData(this.filterNotPictures($event), $entity, field, isImage, this.Imagecounter);
    this.Imagecounter = this.Imagecounter + this.filterNotPictures($event).length;
  }

  updateGalleryImageList() {
    for (let tryTodelete of this.onRemoveImageList) {
      if (this.prodMediaList.filter(value => value.id == tryTodelete.id).length == 0) {
        this.prodMediaList.push(tryTodelete);
      }
    }
    this.onRemoveImageList = [];
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
      this.removeGalleryImage.emit(deleteImage.id);
    }
    this.onRemoveImageList = [];
  }

  removealbumimage(i: number) {
    if (this.filterGallery()[i].id == null) {
      this.prodMediaList.splice(
        this.prodMediaList.findIndex(todelete => todelete.media === this.filterGallery()[i].media),
        1
      );
    } else {
      // this.deleteFromDatabase(this.filterGallery()[i].id);
      this.onRemoveImageList.push(this.filterGallery()[i]);
      this.prodMediaList.splice(
        this.prodMediaList.findIndex(todelete => todelete.media === this.filterGallery()[i].media),
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

  setMainImage(i, item) {
    let mediaProd = this.filterGallery().filter((media: any) => media.mediatypCode == 1 && media.reihenfolge == 0)[0];
    let orderIndex = item.reihenfolge;
    let werhattenull = this.filterGallery().findIndex(mainimage => mainimage == mediaProd);
    this.filterGallery()[werhattenull].reihenfolge = orderIndex;
    this.filterGallery().filter(value => value == item)[0].reihenfolge = 0;
  }

  showImageInfoFunc(i) {
    if (i.show == null || i.show == undefined) {
      i.show = true;
    } else {
      i.show = !i.show;
    }
  }

  moveImageToleft(event: any, currentIndex: number) {
    let updatedReihenfolg = this.filterGallery()[currentIndex - 1].reihenfolge;
    this.filterGallery()[currentIndex - 1].reihenfolge = event.reihenfolge;
    this.filterGallery().filter(value => value == event)[0].reihenfolge = updatedReihenfolg;
  }

  moveImageToRight(event: any, currentIndex: number) {
    let updatedReihenfolg = this.filterGallery()[currentIndex + 1].reihenfolge;
    this.filterGallery()[currentIndex + 1].reihenfolge = event.reihenfolge;
    this.filterGallery().filter(value => value == event)[0].reihenfolge = updatedReihenfolg;
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
}
