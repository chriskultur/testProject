import {Actioncode, Adressart, KostenArt, Warengruppe} from 'app/shared/enum/enum.model';

export class AngebotInterneKostenBuchung {
  constructor(
    public actioncode?: Actioncode,
    public betragBrutto?: number,
    public betragNetto?: number,
    public betriebId?: number,
    public bezeichnung?: string,
    public buchAngesId?: number,
    public id?: number,
    public kostenArt?: any,
    public mwstsatz?: number,
    public reihenfolge?: number,
    public vorzeichen?: string,
    public wert?: number,
    public preisbezeichnung?: string,
    public isUserInput?: string,
  ) {
    this.isUserInput = isUserInput ? isUserInput : 'false';
  }
}

export class AngebotAddressBuchung {
  constructor(
    public actioncode?: Actioncode,
    public adressBezeichung?: string,
    public buchAngeBetsId?: number,
    public postAdresszusatz?: string,
    public postAlternativeBetriebsbezeichnung?: string,
    public postAnsprechpartner?: string,
    public id?: number,
    public adressart?: Adressart,
    public postPlz?: string,
    public reihenfolge?: number,
    public postPostfach?: string,
    public postStadt?: string,
    public postStrasse?: string,
    public postLand?: string
  ) {}
}

export class AngebotBestsBuchung {
  constructor(
    public actioncode?: Actioncode,
    public benutzerId?: number,
    public benutzerName?: string,
    public benutzerVorname?: string,
    public bestaetigungArt?: number,
    public buchAngesId?: number,
    public id?: number,
    public datum?: any,
    public text?: string,
    public checked?: boolean
  ) {}
}
export class AngebotBetsBuchung {
  constructor(
    public actioncode?: Actioncode,
    public bemerkung?: string,
    public beteiligteArt?: number,
    public betriebId?: number,
    public betriebsname?: string,
    public buchAngeAdressDTOList?: Array<AngebotAddressBuchung>,
    public buchAngeBetTagDTOList?: Array<BuchAngeBetTagDTOList>,
    public buchAngePartnerDTOList?: Array<BuchAngePartnerDTOList>,
    public buchAngesId?: number,
    public id?: number,
    public reihenfolge?: number,
    public stornoklausel?: string
  ) {}
}

export class BuchStornoVorschlag {
  constructor(
    public datum?: string,
    public benutzerName?: string,
    public benutzerVorname?: string,
    public ansprechpartner?: string,
    public kanal?: string,
    public benutzerId?: number,
    public buchAngeId?: number,
    public id?: number,
    public stornovereinbarung_jasper?: string,
    public stornovereinbarung?: string
  ) {}
}

export class BuchAngeBetTagDTOList {
  constructor(
    public actioncode?: Actioncode,
    public buchAngeBetsId?: number,
    public betriebsname?: string,
    public tagArt?: Array<AngebotAddressBuchung>,
    public id?: number
  ) {}
}

export class BuchAngePartnerDTOList {
  constructor(
    public actioncode?: Actioncode,
    public anrede?: string,
    public funktion?: string,
    public buchAngeBetsId?: number,
    public id?: number,
    public mitarbeiter?: number,
    public name?: string,
    public reihenfolge?: number,
    public titel?: string,
    public vorname?: string,
    public rolle?: string
  ) {}
}

export class BuchAngeFrei {
  constructor(
    public actioncode?: Actioncode,
    public benutzerId?: number,
    public benutzerName?: string,
    public benutzerVorname?: string,
    public buchAngesId?: number,
    public datum?: any,
    public freigabebegrund?: string,
    public id?: number,
    public kanal?: string,
    public ansprechpartner?: string
  ) {}
}

export class BuchAngeMedia {
  constructor(
    public buchAngesId?: number,
    public datum?: any,
    public id?: number,
    public media?: string,
    public mediaContentType?: string,
    public beschreibung?: string,
    public mediaInhalt?: number,
    public mediatypCode?: number,
    public reihenfolge?: number,
    public prodmediaId?: number,
    public actioncode?: number,
    public type?: string
  ) {}
}

export class BuchAngeMitw {
  constructor(
    public actioncode?: Actioncode,
    public anrede?: string,
    public betriebMitwirkendeId?: number,
    public bild?: string,
    public bildContentType?: string,
    public buchAngesId?: number,
    public id?: number,
    public kunstlerName?: string,
    public kunstlerVorname?: string,
    public name?: string,
    public reihenfolge?: number,
    public titel?: string,
    public vorname?: string,
    public prodProd_MitwirPersons_Id?: string,
    public buchAngeMitwirTagDTOList?: Array<BuchAngeMitwTag>,
    public rolle?: number
  ) {}
}

export class BuchAngeMitwTag {
  constructor(public bezeichnung?: string, public buchAngeMitwId?: number, public id?: number) {}
}

export class BuchAngeTerm {
  constructor(
    public actioncode?: Actioncode,
    public buchAngesId?: number,
    public id?: number,
    public premiere?: boolean,
    public termin?: any,
    public terminbis?: any,
    public abkoTerminId?: any
  ) {}
}

export class BuchungAngebot {
  constructor(
    public anbaId?: number,
    public angebotGiltXTage?: number,
    public anlegerBetriebId?: number,
    public buchAngeBestDTOList?: Array<AngebotBestsBuchung>,
    public buchAngeMediaDTOList?: Array<BuchAngeMedia>,
    public buchAngeBetDTOList?: Array<AngebotBetsBuchung>,
    public buchAngeFreiDTOList?: Array<BuchAngeFrei>,
    public buchAngeKostenDTOList?: Array<AngebotInterneKostenBuchung>,
    public buchAngeMitwDTOList?: Array<BuchAngeMitw>,
    public buchAngeSummeDTOList?: Array<BuchAngeSummeDTOList>,
    public buchAngeTermDTOList?: Array<BuchAngeTerm>,
    public freigabeBetriebId?: number,
    public id?: number,
    public produktname?: string,
    public stornoklausel?: string,
    public summeBrutto?: number,
    public summeNetto?: number,
    public vereinbarung?: string,
    public warengruppe?: Warengruppe,
    public stornovereinbarung?: string,
    public angebotsdatum?: string,
    public stornovereinbarung_jasper?: string
  ) {}
}

export class BuchAngeSummeDTOList {
  constructor(
    public actioncode?: Actioncode,
    public betrieb_id?: number,
    public buchAngeId?: number,
    public id?: number,
    public summe_brutto?: number,
    public summe_netto?: number
  ) {}
}

export class BuchFreiTermBest {
  constructor(
    public actioncode?: Actioncode,
    public bestaetigungArt?: number,
    public buchFreiTermsId?: number,
    public id?: number,
    public reihenfolge?: number,
    public text?: string
  ) {}
}

export class BuchFreiTerm {
  constructor(
    public benutzerId?: number,
    public benutzerName?: string,
    public benutzerVorname?: string,
    public betriebId?: number,
    public buchAngesId?: number,
    public buchFreiTermBestDTOList?: Array<BuchFreiTermBest>,
    public id?: number,
    public datum?: any
  ) {}
}

export class BuchFreiVorschlag {
  constructor(
    public anderungsvorschlag?: string,
    public benutzerId?: number,
    public benutzerName?: string,
    public benutzerVorname?: string,
    public betriebId?: number,
    public buchAngesId?: number,
    public id?: number,
    public datum?: any,
    public vorschlagProzessId?: string,
    public abkoterminId?: number
  ) {}
}

export class BuchStatus {
  constructor(
    public aktionVonAnlegerBetrieb?: boolean,
    public benutzerId?: number,
    public benutzerName?: string,
    public benutzerVorname?: string,
    public betriebId?: number,
    public buchAngesId?: number,
    public buchungZustand?: number,
    public id?: number,
    public datum?: any
  ) {}
}
