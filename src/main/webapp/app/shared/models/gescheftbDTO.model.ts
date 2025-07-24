import {Actioncode, Ligsb} from 'app/shared/enum/enum.model';

export class GescheftbDTO {
  constructor(
    /*      public actioncode?: Actioncode,
        public companyName?: string,
        public connectionType?: number,*/
    public betriebsId?: number,
    public betriebsname?: string,
    public einladungAm?: string,
    public einladungStatus?: number,
    public freigabeAm?: string,
    public freigabeVonBenutzer?: string,
    public gSbCode?: Ligsb,
    public gsbadresseDTOList?: GsbadresseDTOList[],
    public gsbkomunikationDTOList?: GsbkomunikationDTOList[],
    public id?: number,
    public nachbetriebidId?: number,
    public vorschlagAm?: string,
    public vorschlagProzessId?: string,
    public vorschlagSerial?: string,
    public vorschlagVonBenutzer?: string,
    public vorschlag_aktion_id?: number
  ) {}
}

export class GsbadresseDTOList {
  constructor(
    public actioncode?: Actioncode,
    public adrbezeichnung?: string,
    public adressart?: number,
    public freiCode?: number,
    public geoLat?: number,
    public geoLon?: number,
    public gescheftbsId?: number,
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
  ) {}
}

export class GsbkomunikationDTOList {
  constructor(
    public actioncode?: Actioncode,
    public freiCode?: string,
    public gescheftbsId?: number,
    public id?: number,
    public kommunikationsart?: string,
    public wert?: string
  ) {}
}
