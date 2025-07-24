import {LiFaq} from 'app/shared/enum/enum.model';

export class FAQ {
  constructor(
    public antwort?: string,
    public bild?: string,
    public bildContentType?: string,
    public faqArt?: number,
    public frage?: LiFaq,
    public id?: number,
    public reihenfolge?: number
  ) {}
}
