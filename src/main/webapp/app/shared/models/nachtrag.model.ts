import {Actioncode} from 'app/shared/enum/enum.model';

export class buchNachtragKosten {
  constructor(
    public actioncode?: Actioncode,
    public betragBrutto?: number,
    public betragNetto?: number,
    public buchNachtragId?: number,
    public bezeichnung?: string,
    public id?: number,
    public kostenArt?: number,
    public mwstsatz?: number,
    public preisbezeichnung?: string,
    public reihenfolge?: number,
    public vorzeichen?: any,
    public wert?: number,
    public exists?: boolean
  ) {}
}

export class buchNachtragMitw {
  constructor(
    public actioncode?: Actioncode,
    public bemerkung?: string,
    public betMitwirkendeId?: number,
    public bild?: string,
    public bildContentType?: string,
    public betriebMitwirkendeId?: number,
    public buchAngeMitwId?: number,
    public buchNachtragId?: number,
    public freigabe_actioncode?: number,
    public id?: number,
    public kunstlerName?: string,
    public kunstlerVorname?: string,
    public name?: string,
    public reihenfolge?: number,
    public vorname?: string,
    public titel?: string
  ) {}
}

export class buchNachtragSpiel {
  constructor(
    public actioncode?: Actioncode,
    public buchNachtragId?: number,
    public spielsId?: number,
    public betriebId?: number,
    public spielAdresse?: string,
    public betriebAdresse?: string,
    public spielName?: string,
    public id?: number
  ) {}
}

export class buchNachtragSumme {
  constructor(
    public betriebId?: number,
    public buchNachtragId?: number,
    public actioncode?: Actioncode,
    public id?: number,
    public summe_brutto?: number,
    public summe_netto?: number
  ) {}
}

export class buchNachtragTermin {
  constructor(
    public buchAngeTermId?: number,
    public abkoTerminId?: number,
    public actioncode?: Actioncode,
    public buchNachtragId?: number,
    public datum_von_neu?: any,
    public datum_bis_neu?: any,
    public datum_von_alt?: any,
    public datum_bis_alt?: any,
    public id?: number,
    public status?: string
  ) {}
}

export class buchNachtragAnsprech {
  constructor(
    public actioncode?: Actioncode,
    public anrede?: string,
    public id?: number,
    public betriebId?: number,
    public mitarbeiterId?: number,
    public name?: string,
    public buchNachtragId?: number,
    public titel?: string
  ) {}
}

export class buchNachtrag {
  constructor(
    public anlegerBetriebId?: number,
    public buchAngeId?: number,
    public statusFreigegeben?: number,
    public freigabeBetriebId?: number,
    public id?: number,
    public vorschlagAm?: any,
    public vorschlagProzessId?: string,
    public vorschlagSerial?: string,
    public vorschlagVonBenutzer?: string,
    public freigabeAm?: any,
    public freigabeVonBenutzer?: string,
    public buchNachtragAnsprechDTOList?: buchNachtragAnsprech[],
    public buchNachtragTerminDTOList?: buchNachtragTermin[],
    public buchNachtragSummeDTOList?: buchNachtragSumme[],
    public buchNachtragSpielDTOList?: buchNachtragSpiel[],
    public buchNachtragMitwDTOList?: buchNachtragMitw[],
    public buchNachtragKostenDTOList?: buchNachtragKosten[]
  ) {}
}
