import {Actioncode, Adressart, Freigabe} from "app/shared/enum/enum.model";

export class Abteilung {
    constructor(
        public abtadresseDTOList?: AbtadresseDTOList[],
        public abtkomunikationDTOList?: AbtkomunikationDTOList[],
        public betriebsId?: number,
        public bezeichnung?: string,
        public freigabeAm?: any,
        public freigabeVonBenutzer?: string,
        public id?: number,
        public privatBetriebAbteilungId?: number,
        public vorschlagAm?: string,
        public vorschlagProzessId?: string,
        public vorschlagSerial?: string,
        public vorschlagVonBenutzer?: string,
        public vorschlag_aktion_id?: number
    ) {}
}

export class AbtkomunikationDTOList {
  constructor(
    public abteilungsId?: number,
    public actioncode?: Actioncode,
    public freiCode?: Freigabe,
    public id?: number,
    public kommunikationsart?:number,
    public wert?: string
  ) {
  }
}

export class AbtadresseDTOList {
  constructor(
    public abteilungId?: number,
    public actioncode?: Actioncode,
    public adrbezeichnung?: string,
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
    public poststrasse?: string
  ) {
  }
}
