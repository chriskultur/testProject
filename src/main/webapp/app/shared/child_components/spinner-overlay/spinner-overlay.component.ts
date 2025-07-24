import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-spinnerOverlay',
  templateUrl: './spinner-overlay.component.html',
  styleUrls: ['./spinner-overlay.component.scss']
})
export class SpinnerOverlayComponent implements OnInit {
  @Input() message;

  constructor() {}

  ngOnInit() {}
}
