import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import 'hammerjs';
import {EmbedVideoService} from "../../embedVideo";

@Component({
  selector: 'app-product-media-video',
  templateUrl: './product-media-video.component.html',
  styleUrls: ['./product-media-video.component.scss'],
})
export class ProductMediaVideoComponent implements OnInit {
  file: any[];
  iframe_html: any;
  videoUrl = '';
  videoinput: any = 1;

  @Input() prodVideo: any[];
  @Input() prodMedia: any[];
  @Input() type: string;

  constructor(private embedService: EmbedVideoService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.prodMedia != undefined) {
      if (this.prodVideo[0].media != null && this.prodVideo[0].media != 'bnVsbA==' && this.prodVideo[0].media != 'null') {
        this.iframe_html = this.embedService.embed(this.prodVideo[0].media, { attr: { width: 500, height: 350 } });
      }
    }
  }
}
