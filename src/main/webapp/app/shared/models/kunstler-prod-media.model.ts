import {MediaInhalt} from 'app/shared/enum/enum.model';

export class KunstlerProdMediaModel {
  constructor(
    public beschreibung?: string,
    public id?: number,
    public media?: string,
    public mediaContentType?: string,
    public mediatypCode?: MediaInhalt,
    public prodKunstId?: number,
    public reihenfolge?: number,
    public titel?: string,
    public web?: number,
    public media_autor?: string,
    public media_hinweis?: string,
    public media_lizenz?: string,
    public media_quelle?: string,
    public media_titel?: string,
    public vorschlagAktionId?: number,
    public vorschlagAm?: any,
    public vorschlagProzessId?: string,
    public vorschlagSerial?: string,
    public vorschlagVonBenutzer?: string,
    public freigabeAm?: any,
    public freigabeVonBenutzer?: string,
    public type?: string,
    public isAdded?: boolean
  ) {}
}

export class KunstlerProdProjektMediaModel {
  constructor(
    public beschreibung?: string,
    public id?: number,
    public media?: string,
    public mediaContentType?: string,
    public mediatypCode?: MediaInhalt,
    public prodKunstProjektId?: number,
    public reihenfolge?: number,
    public titel?: string,
    public link?: number,
    public media_autor?: string,
    public media_hinweis?: string,
    public media_lizenz?: string,
    public media_quelle?: string,
    public media_titel?: string
  ) {}
}
