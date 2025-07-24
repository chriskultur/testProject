import {Actioncode, Adressart, Freigabe, Libetmitbildart, Vorschlag_aktion_id} from 'app/shared/enum/enum.model';

export class Mitarbeiter {
  constructor(
    public abteilungsId?: number,
    public anrede?: string,
    public benid?: number,
    public beschaeftigungsart?: number,
    public betriebId?: number,
    public einladam?: any,
    public einladstatus?: string,
    public freigabeAm?: any,
    public freigabeVonBenutzer?: string,
    public funktion?: string,
    public id?: number,
    public mitadresseDTOList?: MitadresseDTOList[],
    public mitkomunikationDTOList?: MitkomunikationDTOList[],
    public nachname?: string,
    public privatBetriebMitarbeiterId?: number,
    public rolle?: string,
    public email?: string,
    public status?: string,
    public titel?: string,
    public vorname?: string,
    public vorschlagAm?: any,
    public vorschlagProzessId?: string,
    public vorschlagSerial?: string,
    public vorschlagVonBenutzer?: string,
    public vorschlag_aktion_id?: Vorschlag_aktion_id,
    public zustandDTOList?: ZustandDTOList[],
    public einladungBetrieb?: string
  ) {}
}

export class MitadresseDTOList {
  constructor(
    public actioncode?: Actioncode,
    public adrbezeichnung?: string,
    public adressart?: Adressart,
    public freiCode?: number,
    public geoLat?: number,
    public geoLon?: number,
    public id?: number,
    public listeLandGliedsId?: number,
    public listeLandsId?: number,
    public mitarbeitersId?: number,
    public postadreZus?: string,
    public postaltBetBez?: string,
    public postansprech?: string,
    public postfach?: string,
    public postplz?: string,
    public poststadt?: string,
    public poststrasse?: string
  ) {}
}

export class MitarbiterRechtModel {
  constructor(
    public bezeichnung?: string,
    public freigabeAm?: any,
    public freigabeVonBenutzer?: string,
    public id?: number,
    public mitarbeitersId?: number,
    public rechtCode?: number
  ) {}
}

export class MitEinladenDTOModel {
  constructor(
    public betriebEingeladen?: number, // aktibe betribe id
    public mitarbeiterEingeladen?: number, // mitarbiter id
    public einladstatus?: string,
    public nach_benutzer_id?: number,
    public von_benutzer_id?: number
  ) {}
}

export class MitkomunikationDTOList {
  constructor(
    public actioncode?: Actioncode,
    public freiCode?: Freigabe,
    public id?: number,
    public kommunikationsart?: number,
    public mitarbeitersId?: number,
    public wert?: string
  ) {}
}

export class ZustandDTOList {
  constructor(public actioncode?: Actioncode, public bezeichnung?: string, public id?: number, public mitarbeitersId?: number) {}
}

export class Betmitbild {
  constructor(
    public bild?: string,
    public bildContentType?: string,
    public freigabeAm?: any,
    public freigabeVonBenutzer?: string,
    public id?: number,
    public mitarbeitersId?: number,
    public vorschlagAm?: any,
    public vorschlagProzessId?: string,
    public vorschlagSerial?: string,
    public vorschlagVonBenutzer?: string,
    public vorschlag_aktion_id?: Vorschlag_aktion_id,
    public art?: Libetmitbildart
  ) {}
}

export class Mitrecht {
  constructor(
    public bezeichnung?: string,
    public freigabeAm?: any,
    public freigabeVonBenutzer?: string,
    public id?: number,
    public mitarbeitersId?: number,
    public rechtCode?: number,
    public mitarbeiterType?: number
  ) {}
}
