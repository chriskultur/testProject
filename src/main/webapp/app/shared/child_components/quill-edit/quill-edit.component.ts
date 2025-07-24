import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-quill-edit',
  templateUrl: './quill-edit.component.html',
  styleUrls: ['./quill-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuillEditComponent implements OnInit, OnChanges {
  public editor;
  public editorContent;
  public name = null;
  bubble: any;
  formats = [
    'background',
    'bold',
    'color',
    'font',
    'code',
    'italic',
    'link',
    'size',
    'strike',
    'script',
    'underline',
    'blockquote',
    'header',
    'indent',
    'list',
    'align',
    'direction',
    'code-block',
    'formula',
    // 'image'
    // 'video'
  ];

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
      // this.editor.disable();
    }, 1800);
  }

  ngOnChanges() {
    if (this.beschreibung == null) {
      this.beschreibung = '';
    }
    if (this.isHTML(this.beschreibung)) {
      this.editorContent = this.beschreibung;
    } else {
      this.editorContent = '<p>' + this.beschreibung + '</p>';
    }
    setTimeout(() => {
      // this.editor.disable();
    }, 1800);
  }

  isHTML(str) {
    let a = document.createElement('div');
    a.innerHTML = str;

    for (let c = a.childNodes, i = c.length; i--; ) {
      if (c[i].nodeType == 1) return true;
    }

    return false;
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

  onContentChanged(any) {
    console.log('html');
    this.changed.emit(this.editorContent);
  }
}
