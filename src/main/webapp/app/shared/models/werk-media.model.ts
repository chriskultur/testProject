import {MediaInhalt} from 'app/shared/enum/enum.model';

export class WerkMedia {
  constructor(
    public beschreibung?: string,
    public id?: number,
    public media?: string,
    public mediaContentType?: string,
    public mediatypCode?: MediaInhalt,
    public prodWerksId?: number,
    public reihenfolge?: number,
    public titel?: string,
    public web?: number,
    public isAdded?: boolean,
    public type?: string
  ) {}
}
