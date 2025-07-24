import {Actioncode} from 'app/shared/enum/enum.model';

export class Bp {
  constructor(
    public anrede?: string,
    public bpBeruf?: Bpberuf[],
    public bpSozialenMedien?: BpSozialenMedien[],
    public email?: string,
    public freigabeEmail?: number,
    public freigabeGeburtstag?: number,
    public freigabeMobil?: number,
    public freigabeTelefon?: number,
    public geburtstag?: any,
    public id?: number,
    public aktiv?: boolean,
    public mobil?: string,
    public nachname?: string,
    public ssoid?: number,
    public telefon?: string,
    public titel?: string,
    public vorname?: string,
    public beschreibung?: string,
    public freigebeFavoritBetrieb?: boolean,
    public freigebeFavoritMitarbeiter?: boolean,
    public freigebeFavoritProduktion?: boolean,
    public freigebeFavoritSpielstaette?: boolean,
    public freigebeFavoritWerk?: boolean,
    public anderungAm?: any,
    public angelegtAm?: any
  ) {}
}

export class BpKachels {
  constructor(
    public ausgeblendet?: string,
    public bpId?: number,
    public id?: number,
    public listeKachelId?: number,
    public position?: number
  ) {}
}

export class Bpdelete {
  constructor(public aktiv?: boolean, public deaktivGrund?: string) {}
}

export class BpSozialenMedien {
  constructor(
    public actioncode?: Actioncode,
    public bpMedienTyp?: number,
    public bpsId?: number,
    public id?: number,
    public medienBezeichnung?: string,
    public medienEintrag?: string
  ) {}
}

export class Bpberuf {
  constructor(public actioncode?: Actioncode, public beruf?: string, public bpsId?: number, public id?: number) {}
}

export class BerufCategory {
  constructor(
    public bezeichnung?: string,
    public id?: number,
    public reihenfolge?: number,
    public werteliste?: number,
    public wert?: null
  ) {}
}

export class BpImage {
  constructor(public bild?: string, public bildContentType?: string, public bpsId?: number, public id?: number, public ssoid?: string) {}
}
