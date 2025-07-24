import {Actioncode} from 'app/shared/enum/enum.model';
import {ProdWerkUrheberDTOListModel} from 'app/shared/models/werksangaben.model';

export class IPriceModel {
  constructor(public id?: string, public value?: number, public name?: string, public domRepresentation?: number) {}
}

export class Spielzeit {
  constructor(
    public beschreibung?: string,
    public datumBis?: any,
    public datumVon?: any,
    public id?: number,
    public reihenfolge?: number
  ) {}
}

export class IProductionPageParentObject {
  constructor(
    public beschreibung?: string,
    public produktionsrechtinhaber?: string,
    public datum?: string,
    public prodProdRezenDTOList?: string
  ) {}
}

export class ProduktionTags {
  constructor(public actioncode?: Actioncode, public bezeichnung?: string, public id?: number, public prodProdsId?: number) {}
}

export class MitwirGruppeTag {
  constructor(public actioncode?: Actioncode, public bezeichnung?: string, public id?: number, public prodProdMitwirGruppesId?: number) {}
}

export class MitwirPersonTag {
  constructor(public actioncode?: Actioncode, public bezeichnung?: string, public id?: number, public prodProdMitwirPersonsId?: number) {}
}
export class Mitwirgruppe {
  constructor(
    public actioncode?: Actioncode,
    public anzahl?: number,
    public art?: string,
    public id?: number,
    public prodProdMitwirGruppeTagDTOList?: MitwirGruppeTag[],
    public prodProdsId?: number,
    public reihenfolge?: number,
    public team_gruppe?: number
  ) {}
}
export class ProdProdGenreDTO {
  constructor(
    public actioncode?: Actioncode,
    public bezeichnung?: string,
    public id?: number,
    public prodProdsId?: number,
    public reihenfolge?: number
  ) {}
}

export class Mitwirperson {
  constructor(
    public actioncode?: Actioncode,
    public beruf?: string,
    public betriebMitwirkendeId?: number,
    public bild?: string,
    public bildContentType?: string,
    public id?: number,
    public kurzbeschreibung?: string,
    public prodProdMitwirPersonTagDTOList?: MitwirPersonTag[],
    public prodProdsId?: number,
    public reihenfolge?: number,
    public rolle?: string,
    public team_person?: number,
    public nachname?: string,
    public vorname?: string,
    public name?: string,
    public kunstlername?: string,
    public prodKunst_id?: number,
    public in_verhandlung?: boolean
  ) {}
}

export class Rezensen {
  constructor(
    public actioncode?: Actioncode,
    public autor?: string,
    public datum?: any,
    public id?: number,
    public kritik?: string,
    public prodProdsId?: number,
    public quelle?: string,
    public reihenfolge?: number
  ) {}
}
export class ProdProdUnterList {
  constructor(
    public actioncode?: Actioncode,
    public art?: number,
    public bezeichnung?: string,
    public id?: number,
    public prodProdsId?: number,
    public reihenfolge?: number
  ) {}
}

export class ProduktionTabObj {
  constructor(
    public auffuhrungMinuten?: number,
    public auffuhrungsrechte?: boolean,
    public beschreibung?: string,
    public betriebsId?: number,
    public damen?: number,
    public herren?: number,
    public id?: number,
    public interne_bezeichnung_der_produkts?: string,
    public pauseMinuten?: number,
    public pauseNachMinuten?: number,
    public prodProdBesondTagDTOList?: ProduktionTags[],
    public prodProdGenreDTOList?: ProdProdGenreDTO[],
    public prodProdMitwirGruppeDTOList?: Mitwirgruppe[],
    public prodProdMitwirPersonDTOList?: Mitwirperson[],
    public prodProdRezenDTOList?: Rezensen[],
    public prodProdStimmTagDTOList?: ProduktionTags[],
    public prodProdUnterDTOList?: ProdProdUnterList[],
    public prodProdZielTagDTOList?: ProduktionTags[],
    public prodWerksId?: number,
    public produktionsrecheBetriebId?: number,
    public produktionsrechtinhaber?: number,
    public protagonistenvertrage?: boolean,
    public warengruppe?: number,
    public warenkategorie?: number,
    public werkvertrag_garantierte_auffuhrungen?: number,
    public werkvertrag_materialleigebuhr?: number,
    public werkvertrag_produktrechte_bis?: any,
    public werkvertrag_produktrechte_von?: any,
    public werkvertrag_tantieme?: number,
    public werkvertrag_vertragsstrafe?: number,
    public zusatzinformationen?: string,
    public verlag_mail?: boolean,
    public produktionsstatus?: number,
    public rolle?: string,
    public datum_bis?: any,
    public datum_von?: any,
    public betrieb_typ?: string,
    public betriebsname?: string,
    public prodWerkUrheberDTOList?: ProdWerkUrheberDTOListModel[]
  ) {}
}

export class BetriebVisibleProdsModel {
  constructor(
    public betrieb_id?: number,
    public angebot_id?: number,
    public prod_id?: number,
    public betriebsname?: string,
    public media_id?: number,
    public titel?: string,
    public angebotsbezeichnung?: string,
    public id?: number,
    public warengruppe?: number
  ) {}
}
