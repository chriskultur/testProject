import {Actioncode, Adressart, Freigabe, Vorschlag_aktion_id} from 'app/shared/enum/enum.model';

export class Stage {
  constructor(
    public art?: string,
    public bemerkungint?: string,
    public bemerkungoff?: string,
    public beschreibung?: string,
    public betriebsId?: number,
    public bild?: string,
    public bildContentType?: string,
    public externespielsttateId?: number,
    public freigabeAm?: any,
    public freigabeVonBenutzer?: string,
    public id?: number,
    public privatBetriebSpielsttateId?: number,
    public spieladresseDTOList?: SpieladresseDTOListModel[],
    public spielbezeichnung?: string,
    public spielkomunikationDTOList?: SpielkomunikationDTOListModel[],
    public spielpartnerDTOList?: SpielpartnerDTOListModel[],
    public verwaltungBetriebId?: number,
    public vorschlagAm?: any,
    public vorschlagProzessId?: string,
    public vorschlagSerial?: string,
    public vorschlagVonBenutzer?: string,
    public vorschlag_aktion_id?: Vorschlag_aktion_id,
    public status?: string,
    public spielstatte_personenDTOList?: SpielPersonen[],
    public secondary_betrieb_id?: number,
    public mochte_benutzen?: boolean
  ) {}
}

export class SpielpartnerDTOListModel {
  constructor(public actioncode?: Actioncode, public id?: number, public mitarbeitersId?: number, public spielssId?: number) {}
}

export class SpielkomunikationDTOListModel {
  constructor(
    public actioncode?: Actioncode,
    public freiCode?: Freigabe,
    public id?: number,
    public kommunikationsart?: number,
    public spielssId?: number,
    public wert?: string
  ) {}
}
export class SpieladresseDTOListModel {
  constructor(
    public actioncode?: Actioncode,
    public aradrbezeichnungt?: string,
    public adressart?: Adressart,
    public freiCode?: number,
    public geoLat?: number,
    public geoLon?: number,
    public id?: number,
    public listeLandGliedsId?: number,
    public listeLandsId?: number,
    public postadreZus?: string,
    public postaltBetBez?: string,
    public postansprech?: string,
    public postfach?: string,
    public postplz?: string,
    public poststadt?: string,
    public poststrasse?: string,
    public spielssId?: number
  ) {}
}

export class SpielVerknupfung {
  constructor(
    public id?: number,
    public betrieb_idId?: number,
    public spiels_idId?: number,
    public eigentumer?: boolean,
    public geloscht_status?: boolean,
    public geloscht_bemerkung?: string
  ) {}
}

export class SpielPersonen {
  constructor(
    public id?: number,
    public spielstatte_idId?: number,
    public bild?: string,
    public bild_content_type?: string,
    public kurzbeschreibung?: string,
    public name?: string,
    public vorname?: string,
    public titel?: string,
    public actioncode?: Actioncode,
    public spielstatte_personen_komDTOList?: SpielPersoneKomm[]
  ) {}
}

export class SpielPersoneKomm {
  constructor(
    public actioncode?: Actioncode,
    public id?: number,
    public kommunikationsart?: number,
    public spielstatte_personen_idId?: number,
    public wert?: string
  ) {}
}
