import {Actioncode, Libetmedia, LibetTyp, Vorschlag_aktion_id,} from 'app/shared/enum/enum.model';

export class Betrieb {
  constructor(
    public aktualisierung_am?: any,
    public anlage_am?: any,
    public angelegtbenid?: number,
    public bankverDTOList?: bankver[],
    public beschreibung?: any,
    public betkommDTOList?: betkomm[],
    public betriebkatDTOList?: betriebkat[],
    public betriebsbezeichnung?: string,
    public betriebsname?: string,
    public betriebsstatus?: number,
    public betriebsverwaltungCode?: number,
    public deaktivam?: any,
    public dunsnummer?: string,
    public freigabeAm?: any,
    public freigabeVonBenutzer?: string,
    public freigabeabteilung?: number,
    public freigabebank?: number,
    public freigabeduns?: number,
    public freigabeglaubigerid?: number,
    public freigabemitarbeiter?: number,
    public geschaftsbereich?: string,
    public glaubigerid?: string,
    public id?: number,
    public listeLandsId?: number,
    public listerformsId?: number,
    public mitarbeiterbilderVer?: boolean,
    public mitarbeiterdatenVer?: boolean,
    public mwst_befreit?: boolean,
    public planungszyklus?: string,
    public portalb?: boolean,
    public quellensteuer_auf?: string,
    public quellensteuer_prozent?: number,
    public rechtbilder?: boolean,
    public rechtdaten?: boolean,
    public registergericht?: string,
    public registernummer?: number,
    public schlagwortDTOList?: schlagwort[],
    public selbstverwaltet_bankverbindung?: boolean,
    public selbstverwaltet_duns_nummer?: boolean,
    public selbstverwaltet_glaubiger_id?: boolean,
    public spielzeit_bis?: any,
    public spielzeit_von?: any,
    public tochterbetriebEinladungSam?: any,
    public tochterbetriebEinladungStatus?: string,
    public tochterbetriebId?: number,
    public tochtereinam?: any,
    public tochtereinstatus?: string,
    public ustArt?: string,
    public ustFrei?: string,
    public ustIdnr?: string,
    public ustSteuersatz?: number,
    public vorschlagAm?: any,
    public vorschlagProzessId?: string,
    public vorschlagSerial?: string,
    public vorschlagVonBenutzer?: string,
    public vorschlag_aktion_id?: number,
    public website?: string,
    public stornoklausel?: string,
    public betriebTyp?: LibetTyp,
    public prufungAngefragt?: boolean,
    public stornoklausel_jasper?: string
  ) {}
}

export class Betriebebild {
  constructor(
    public beschreibung?: string,
    public betriebsId?: number,
    public freigabeAm?: any,
    public freigabeVonBenutzer?: string,
    public id?: number,
    public media?: string,
    public mediaContentType?: string,
    public mediatyp?: Libetmedia,
    public vorschlagAm?: any,
    public vorschlagProzessId?: string,
    public vorschlagSerial?: string,
    public vorschlagVonBenutzer?: string,
    public vorschlag_aktion_id?: Vorschlag_aktion_id
  ) {}
}

export class betMedia {
  constructor(
    public beschreibung?: string,
    public id?: number,
    public media?: string,
    public media_content_type?: string,
    public mediatyp_code?: number,
    public mediabetId?: number,
    public reihenfolge?: number,
    public titel?: string,
    public web?: number,
    public media_autor?: string,
    public media_hinweis?: string,
    public media_lizenz?: string,
    public media_quelle?: string,
    public media_titel?: string,
    public isAdded?: boolean,
    public type?: string
  ) {}
}

export class BetribestatusModel {
  constructor(public betriebsname?: string, public betriebsstatus?: string, public id?: number, public betrieb_typ?: number) {}
}

export class bankver {
  constructor(
    public actioncode?: Actioncode,
    public bankbezeichnung?: string,
    public betriebsId?: number,
    public iban?: string,
    public id?: number,
    public switBic?: string,
    public verwendung?: string
  ) {}
}

export class betkomm {
  constructor(
    public actioncode?: Actioncode,
    public betriebsId?: number,
    public freiCode?: number,
    public id?: number,
    public kommunikationsart?: number,
    public wert?: string
  ) {}
}

export class betriebkat {
  constructor(public actioncode?: Actioncode, public betriebsId?: number, public bezeichnung?: string, public id?: number) {}
}

export class schlagwort {
  constructor(public actioncode?: Actioncode, public betriebsId?: number, public id?: number, public schlagwort?: string) {}
}

export class KategorieTag {
  constructor(public id?: number, public kategoriename?: string) {}
}

export class BetriebData {
  constructor(public betriebName?: string, public email?: string, public handy?: any, public id?: any, public betObj?: Betrieb) {}
}

export class BetriebFreigabe {
  constructor(public betriebsstatus?: number, public id?: number) {}
}

export class Notes {
  constructor(
    public benutzerName?: string,
    public beschreibung?: string,
    public betriebId?: number,
    public datum?: any,
    public id?: number,
    public mitarbeiterId?: number,
    public mitarbeiterName?: string,
    public prodProdId?: number,
    public prodSpielId?: number,
    public prodWerkId?: number,
    public reihenfolge?: number,
    public titel?: string,
    public partnerBetriebId?: number,
    public partnerBetriebsname?: string,
    public produktname?: string,
    public hide?: boolean,
    public bpId?: number
  ) {}
}
