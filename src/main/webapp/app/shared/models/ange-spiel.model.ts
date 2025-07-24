import {Actioncode, Warengruppe, Warenkategorie} from 'app/shared/enum/enum.model';

export class AngebotSpiel {
  constructor(
    public angeSpielOptionDTOList?: AngeSpielOptionDTOListModel[],
    public angeSpielPreisDTOList?: AngeSpielPreisDTOListModel[],
    public beschreibung?: string,
    public betriebsId?: number,
    public id?: number,
    public preisAufAnfrage?: boolean,
    public prodSpielsId?: number,
    public spielstatteZuVermieten?: boolean,
    public sucheVertrieb?: boolean,
    public vertriebBetriebId?: number,
    public vertriebBetriebIdAngefragt?: boolean,
    public vertriebBetriebIdAngefragtAm?: any,
    public warengruppe?: Warengruppe,
    public warenkategorie?: Warenkategorie,
    public secondary_betrieb_id?: number
  ) {}
}

export class AngeSpielOptionDTOListModel {
  constructor(
    public actioncode?: Actioncode,
    public angeSpielOptionTagDTOList?: AngeSpielOptionTagDTOListModel[],
    public angeSpielsId?: number,
    public anzahl?: number,
    public id?: number,
    public preis?: number
  ) {}
}

export class AngeSpielOptionTagDTOListModel {
  constructor(public actioncode?: Actioncode, public angeSpielOptionsId?: number, public bezeichnung?: string, public id?: number) {}
}

export class AngeSpielPreisDTOListModel {
  constructor(
    public actioncode?: Actioncode,
    public angeSpielPreisTagDTOList?: AngeSpielPreisTagDTOListModel[],
    public angeSpielsId?: number,
    public id?: number,
    public preis?: string
  ) {}
}

export class AngeSpielPreisTagDTOListModel {
  constructor(public actioncode?: Actioncode, public angeSpielPreissId?: number, public bezeichnung?: string, public id?: number) {}
}
