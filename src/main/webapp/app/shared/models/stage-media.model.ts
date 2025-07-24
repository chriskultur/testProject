import {MediaInhalt} from 'app/shared/enum/enum.model';

export class StageMedia {
  constructor(
    public beschreibung?: string,
    public id?: number,
    public media?: string,
    public mediaContentType?: string,
    public mediatypCode?: MediaInhalt,
    public reihenfolge?: number,
    public spielsId?: number,
    public titel?: string,
    public web?: number,
    public secondary_betrieb_id?: number,
    public isAdded?: boolean,
    public type?: string
  ) {}
}
