import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {EmbedVideoService} from "../../embedVideo";

@Component({
  selector: 'app-media-video',
  templateUrl: './media-video.component.html',
  styleUrls: ['./media-video.component.scss'],
})
export class MediaVideoComponent implements OnInit {
  iframe_html: any;
  unsupportedVideo = false;

  @Input() prodVideo: any;
  @Output() removeVideo: EventEmitter<any> = new EventEmitter<any>();

  constructor(private embedService: EmbedVideoService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.prodVideo != undefined) {
      if (this.prodVideo == undefined) {
        this.prodVideo = changes.prodVideo.currentValue[0];
      }
      this.unsupportedVideo = false;
      if (this.prodVideo.media == null || this.prodVideo.media == 'bnVsbA==' || this.prodVideo.media == 'null') {
        this.prodVideo.media = null;
      } else if (
        !this.prodVideo.media.includes('https://www.youtube.com') &&
        !this.prodVideo.media.includes('https://youtube.com') &&
        !this.prodVideo.media.includes('https://youtu.be') &&
        !this.prodVideo.media.includes('https://vimeo.com') &&
        !this.prodVideo.media.includes('https://www.dailymotion.com') &&
        !this.prodVideo.media.includes('https://www.vimeo.com') &&
        !this.prodVideo.media.includes('https://dailymotion.com')
      ) {
        this.unsupportedVideo = true;
      } else if (this.prodVideo && this.prodVideo.media != null && this.prodVideo.media != 'bnVsbA==' && this.prodVideo.media != 'null') {
        this.iframe_html = this.embedService.embed(this.prodVideo.media);
      }
    }
  }

  changevideo() {
    this.unsupportedVideo = false;
    if (
      !this.prodVideo.media.includes('https://www.youtube.com') &&
      !this.prodVideo.media.includes('https://youtube.com') &&
      !this.prodVideo.media.includes('https://youtu.be') &&
      !this.prodVideo.media.includes('https://vimeo.com') &&
      !this.prodVideo.media.includes('https://www.dailymotion.com') &&
      !this.prodVideo.media.includes('https://www.vimeo.com') &&
      !this.prodVideo.media.includes('https://dailymotion.com')
    ) {
      this.unsupportedVideo = true;
    } else {
      this.iframe_html = this.embedService.embed(this.prodVideo.media);
      this.prodVideo.mediaContentType = 'video-link';
    }
  }

  removevideo() {
    if (this.prodVideo.id == null) {
      this.prodVideo.media = null;
      this.prodVideo.mediaContentType = null;
    } else {
      this.removeVideo.emit(this.prodVideo.id);
      this.prodVideo.media = null;
      this.prodVideo.mediaContentType = null;
    }
  }
}
