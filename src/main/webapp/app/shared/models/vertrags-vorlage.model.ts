import {Actioncode} from 'app/shared/enum/enum.model';

export class VertragsVorlageModel {
  constructor(
    public benutzer_id?: number,
    public benutzer_name?: string,
    public benutzer_vorname?: string,
    public beschreibung?: string,
    public buchVorlageBetDTOList?: BuchVertragVorlageBetDTO[],
    public buchVorlageProdDTOList?: BuchVertragVorlageProdDTO[],
    public buchVorlageObjKatGETDTOList?: BuchVorlageObjKatGETDTOList[],
    public datum?: any,
    public id?: number,
    public titel?: string,
    public vertragstext?: string,
    public vertragstextContentType?: string,
    public vetragsart?: number,
    public vorlagenname?: string,
    public betriebId?: number,
    public vertragstext_html?: string,
    public vertragstext_jasper?: string
  ) {}
}

export class BuchVorlageObjKatGETDTOList {
  constructor(public buchVorlageId?: number, public bezeichnung?: string, public id?: number) {}
}

export class BuchVertragVorlageBetDTO {
  constructor(
    public actioncode?: Actioncode,
    public betriebId?: number,
    public buchVorlageId?: number,
    public gewichtung?: string,
    public id?: number
  ) {}
}

export class BuchVertragVorlageProdDTO {
  constructor(
    public actioncode?: Actioncode,
    public prodProdId?: number,
    public buchVorlageId?: number,
    public gewichtung?: string,
    public id?: number
  ) {}
}
