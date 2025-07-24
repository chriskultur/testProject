import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OpenPdfIntoNewTabWithBase64StringService {
  constructor() {}

  openPdfInNewTab(base64String: string) {
    const isIFrame = (input: HTMLElement | null): input is HTMLIFrameElement => input !== null && input.tagName === 'IFRAME';

    let byteCharacters = atob(base64String);
    let byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    let byteArray = new Uint8Array(byteNumbers);
    let file = new Blob([byteArray], { type: 'application/pdf;base64' });
    let fileURL = URL.createObjectURL(file);
    base64String = 'data:application/pdf;base64,' + base64String;
    let iframe = "<iframe width='100%' height='100%' src='" + base64String + "'></iframe>";

    let x = window.open();
    x.document.write(iframe);
  }
}
