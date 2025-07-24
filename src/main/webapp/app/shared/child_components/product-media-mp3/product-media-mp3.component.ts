import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {KunstlerProdMediaModel} from 'app/shared/models/kunstler-prod-media.model';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-product-media-mp3',
  templateUrl: './product-media-mp3.component.html',
  styleUrls: ['./product-media-mp3.component.scss'],
})
export class ProductMediaMp3Component implements OnInit, OnChanges {
  @Input() prodMedia: any[];
  @Output() onDeleteMp3 = new EventEmitter<number>();
  mp3FileSizeValid: boolean = true;
  mp3FileTypeValid: boolean = true;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.prodMedia) {
      let anyThing: any = changes.prodMedia.currentValue;
      this.prodMedia = anyThing;
    }
  }

  resetValidationVariable() {
    this.mp3FileSizeValid = true;
    this.mp3FileTypeValid = true;
  }

  changeMp3(e?: Event) {
    const fileEvent = e as HTMLInputEvent;
    this.mp3FileSizeValid = true;
    this.mp3FileTypeValid = true;
    let i = 0;
    for (let value of fileEvent.target.files) {
      if ((value.type == 'audio/mpeg' || value.type == 'audio/ogg') && value.size < 10485760) {
        this.prodMedia.push(
          new KunstlerProdMediaModel(
            null,
            null,
            null,
            value.type,
            3,
            null,
            i,
            value.name,
            null,
            null,
            null,
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
            true
          )
        );
        this.assignMp3Base64ToMediaVariable(value, this.prodMedia[this.prodMedia.length - 1]);
        i++;
      } else if ((value.type == 'audio/mpeg' || value.type == 'audio/ogg') && value.size > 10485760) {
        this.mp3FileSizeValid = false;
      } else if (value.size < 10485760 && !(value.type == 'audio/mpeg' || value.type == 'audio/ogg')) {
        this.mp3FileTypeValid = false;
      }
    }
  }

  assignMp3Base64ToMediaVariable(files, entity) {
    let reader = new FileReader();
    reader.onload = (event: any) => {
      let data = event.target.result.split(',');
      entity.media = data[1];
    };
    reader.readAsDataURL(files);
  }

  filterMp3() {
    if (this.prodMedia != undefined) {
      return this.prodMedia.filter(video => video.mediatypCode == 3);
    } else {
      return [];
    }
  }

  removefileMp3File(index) {
    if (this.prodMedia[index].id == null) {
      this.prodMedia.splice(index, 1);
    } else {
      this.onDeleteMp3.next(this.prodMedia[index].id);
      this.prodMedia.splice(index, 1);
    }
  }
}
