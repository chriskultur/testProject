import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-product-media-mp3-view',
  templateUrl: './product-media-mp3-view.component.html',
  styleUrls: ['./product-media-mp3-view.component.scss'],
})
export class ProductMediaMp3ViewComponent implements OnInit, OnChanges {
  @Input() prodMediaMp3: any[];

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {}
}
