import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
@Component({
  selector: 'app-quill-edit-contract',
  templateUrl: './quill-edit-contract.component.html',
  styleUrls: ['./quill-edit-contract.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuillEditContractComponent implements OnInit, OnChanges ,AfterViewInit{
  public editor;
  public editorContent;
  public name = null;
  bubble: any;
  formats = [
    'background',
    'color',
    'font',
    'code',
    'link',
    'size',
    'script',
    'underline',
    'list',
    // 'align',
    // 'direction',
    'formula',
    // 'image'
    // 'video'
  ];

  modules = {
    toolbar: [
      [ 'underline'], // toggled buttons

      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean'], // remove formatting button

      ['link', 'image', 'video'], // link and image, video
    ],
  };
  @Input() beschreibung: any;
  @Input() readOnly: boolean = false;
  @Output() changed = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    this.name = this.makeid();
    if (this.beschreibung == null) {
      this.beschreibung = '';
    } else {
      this.editorContent = this.beschreibung;
    }
    if (this.isHTML(this.beschreibung)) {
      this.editorContent = this.beschreibung;
    } else {
      this.editorContent = '<p>' + this.beschreibung + '</p>';
    }
    setTimeout(() => {
      this.editorContent = this.beschreibung;
    }, 1800);
    console.log('beshreibung on init:', this.beschreibung);
  }

  check(){
    console.log(this.beschreibung);
  }

  ngOnChanges() {
    if (this.beschreibung == null) {
      this.beschreibung = '';
    }
    // if(this.editorContent.length == 0){
    //   this.editorContent = "";
    // }
    if (this.isHTML(this.beschreibung)) {
      this.editorContent = this.beschreibung;
    } else {
      this.editorContent = '<p>' + this.beschreibung + '</p>';
    }
    setTimeout(() => {
      // this.editor.disable();
    }, 1800);
    console.log('beshreibung on change:', this.beschreibung);
  }

  isHTML(str) {
    let a = document.createElement('div');
    a.innerHTML = str;

    for (let c = a.childNodes, i = c.length; i--; ) {
      if (c[i].nodeType == 1) return true;
    }

    return false;
  }
  onPaste($event) {
    console.log($event);
  }

  makeid() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  onEditorBlured(quill) {}

  onEditorFocused(quill) {}

  onEditorCreated(quill) {
    this.editor = quill;
  }

  onContentChanged(content) {
    console.log("content change");
    this.changed.emit(this.editorContent);
  }

  ngAfterViewInit() {
    this.editorContent = this.beschreibung;
  }


  onNgModelChange($event: any) {
    console.log('onNgModelChange: {}',$event);
  }
}
