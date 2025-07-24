import {Actioncode, Warengruppe, Warenkategorie} from 'app/shared/enum/enum.model';

export class KunstlerProduktModel {
  constructor(
    public agenturBetriebId?: number,
    public anrede?: string,
    public betriebId?: number,
    public geburstag?: number,
    public grosse?: string,
    public id?: number,
    public kunstler_name?: string,
    public kunstler_vorname?: string,
    public kurzbeschreibung?: string,
    public name?: string,
    public prodKunstAusbildungDTOList?: prodKunstAusbildungDTOList[],
    public prodKunstAuszeichnungDTOList?: prodKunstAuszeichnungDTOList[],
    public prodKunstBasisDTOList?: prodKunstBasisDTOList[],
    public prodKunstProjektDTOList?: prodKunstProjektDTOList[],
    public titel?: string,
    public vorname?: string,
    public warengruppe?: Warengruppe,
    public warenkategorie?: Warenkategorie,
    public kunstlername?: string,
    public created_am?: string,
    public aktualisierung_am?: string,
  ) {}
}

export class prodKunstProjektDTOList {
  constructor(
    public actioncode?: Actioncode,
    public aktualisierungAm?: any,
    public beschreibung?: string,
    public betriebId?: number,
    public id?: number,
    public prodKunstId?: number,
    public projektdatum?: any,
    public reihenfolge?: number,
    public titel?: string,
    public prodKunstProjektTagDTOS?: prodKunstProjektTagDTOS[],
    public prodKunstProjektUntertitelDTOList?: prodKunstProjektUntertitelDTOList[],
  ) {}
}

export class prodKunstProjektTagDTOS {
  constructor(
    public actioncode?: Actioncode,
    public bezeichnung?: string,
    public id?: number,
    public kunstProjektArt?: number,
    public prodKunstProjektId?: number
  ) {}
}

export class prodKunstProjektUntertitelDTOList {
  constructor(
    public actioncode?: Actioncode,
    public bezeichnung?: string,
    public id?: number,
    public prodKunstProjektId?: number,
    public reihenfolge?: number
  ) {}
}

export class prodKunstAusbildungDTOList {
  constructor(
    public actioncode?: Actioncode,
    public bis?: string,
    public id?: number,
    public prodKunstId?: number,
    public von?: string,
    public wert?: string
  ) {}
}

export class prodKunstAuszeichnungDTOList {
  constructor(
    public actioncode?: Actioncode,
    public id?: number,
    public prodKunstId?: number,
    public reihenfolge?: number,
    public wert?: string,
    public jahre?: string,
  ) {}
}

export class prodKunstBasisDTOList {
  constructor(
    public actioncode?: Actioncode,
    public id?: number,
    public prodKunstId?: number,
    public prodKunstTagDTOList?: prodKunstTagDTOList[],
    public reihenfolge?: number,
    public wert?: string
  ) {}
}

export class prodKunstTagDTOList {
  constructor(public actioncode?: Actioncode, public id?: number, public prodKunstBasisId?: number, public bezeichnung?: string) {}
}

export class prodKunstFavorit {
  constructor(
    public bemerkung?: string,
    public bpId?: number,
    public id?: number,
    public prodKunstId?: number,
    public reihenfolge?: number,
    public datum?: any
  ) {}
}
