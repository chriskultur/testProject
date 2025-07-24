import {Actioncode} from 'app/shared/enum/enum.model';

export class Werksangaben {
  constructor(
    public abendfullend?: boolean,
    public beschreibung?: string,
    public betriebsId?: number,
    public damen?: number,
    public dauerInMinuten?: number,
    public herren?: number,
    public hinweisBesetzung?: string,
    public hinweisDekoration?: string,
    public hinweisInstrumentierung?: string,
    public id?: number,
    public interne_bezeichnung?: string,
    public prodWerkAuffDTOList?: ProdWerkAuffDTOListModel[],
    public prodWerkBasiertAufTagDTOList?: ProdWerkBasiertAufTagDTOListModel[],
    public prodWerkBesondTagDTOList?: ProdWerkBesondTagDTOListModel[],
    public prodWerkFreiZurTagDTOList?: ProdWerkFreiZurTagDTOListModel[],
    public prodWerkGenreDTOList?: ProdWerkGenreDTOListModel[],
    public prodWerkInstDTOList?: ProdWerkInstDTOListModel[],
    public prodWerkMundTagDTOList?: ProdWerkMundTagDTOListModel[],
    public prodWerkSpracheTagDTOList?: ProdWerkSpracheTagDTOListModel[],
    public prodWerkStimmTagDTOList?: ProdWerkStimmTagDTOListModel[],
    public prodWerkUnterDTOList?: ProdWerkUnterDTOListModel[],
    public prodWerkUrheberDTOList?: ProdWerkUrheberDTOListModel[],
    public prodWerkZielTagDTOList?: ProdWerkZielTagDTOListModel[],
    public titel?: string,
    public vertriebBetriebId?: null,
    public vertriebBetriebIdAngefragt?: null,
    public vertriebBetriebIdAngefragtAm?: any,
    public vertriebsrechte?: number,
    public warengruppe?: number,
    public warenkategorie?: number,
    public zusatzinformationen?: string,
    public verlag_mail?: boolean
  ) {}
}

export class ProdWerkAuffDTOListModel {
  constructor(
    public actioncode?: Actioncode,
    public beschreibung?: string,
    public betriebsId?: number,
    public id?: number,
    public listeSpielzeitsId?: number,
    public prodWerksId?: number,
    public reihenfolge?: number
  ) {}
}

export class ProdWerkBasiertAufTagDTOListModel {
  constructor(public actioncode?: Actioncode, public bezeichnung?: string, public id?: number, public prodWerksId?: number) {}
}

export class ProdWerkBesondTagDTOListModel {
  constructor(public actioncode?: Actioncode, public bezeichnung?: string, public id?: number, public prodWerksId?: number) {}
}

export class ProdWerkFreiZurTagDTOListModel {
  constructor(public actioncode?: Actioncode, public bezeichnung?: string, public id?: number, public prodWerksId?: number) {}
}

export class ProdWerkGenreDTOListModel {
  constructor(
    public actioncode?: Actioncode,
    public bezeichnung?: string,
    public id?: number,
    public prodWerksId?: number,
    public reihenfolge?: number
  ) {}
}

export class ProdWerkInstDTOListModel {
  constructor(
    public actioncode?: Actioncode,
    public anzahl?: number,
    public bezeichnung?: string,
    public id?: number,
    public prodWerksId?: number
  ) {}
}

export class ProdWerkMundTagDTOListModel {
  constructor(public actioncode?: Actioncode, public bezeichnung?: string, public id?: number, public prodWerksId?: number) {}
}

export class ProdWerkSpracheTagDTOListModel {
  constructor(public actioncode?: Actioncode, public bezeichnung?: string, public id?: number, public prodWerksId?: number) {}
}

export class ProdWerkStimmTagDTOListModel {
  constructor(public actioncode?: Actioncode, public bezeichnung?: string, public id?: number, public prodWerksId?: number) {}
}

export class ProdWerkUnterDTOListModel {
  constructor(
    public actioncode?: Actioncode,
    public art?: string,
    public bezeichnung?: string,
    public id?: number,
    public prodWerksId?: number,
    public reihenfolge?: number
  ) {}
}

export class ProdWerkUrheberDTOListModel {
  constructor(
    public actioncode?: Actioncode,
    public bild?: string,
    public bildContentType?: string,
    public kurzbeschreibung?: string,
    public name?: string,
    public id?: number,
    public prodWerkUrheberTagDTOList?: ProdWerkUrheberTagDTOListModel[],
    public prodWerksId?: number,
    public reihenfolge?: number
  ) {}
}

export class ProdWerkUrheberTagDTOListModel {
  constructor(
    public actioncode?: Actioncode,
    public bezeichnung?: string,
    public id?: number,
    public prodWerkUrhebersId?: number,
    public reihenfolge?: number
  ) {}
}

export class ProdWerkZielTagDTOListModel {
  constructor(public actioncode?: Actioncode, public bezeichnung?: string, public id?: number, public prodWerksId?: number) {}
}
