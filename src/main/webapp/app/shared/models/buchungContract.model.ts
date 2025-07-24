import {Actioncode} from 'app/shared/enum/enum.model';

export class BuchungContract {
  constructor(
    public anlegerBetriebId?: number,
    public benutzer_id?: number,
    public benutzer_name?: string,
    public benutzer_vorname?: string,
    public beschreibung?: string,
    public buchAngeId?: number,
    public buchVorlageId?: number,
    public datum?: any,
    public freigabeAm?: any,
    public freigabeBetriebId?: number,
    public freigabeVonBenutzer?: string,
    public id?: number,
    public titel?: string,
    public vertragsstatus?: number,
    public vertragstext?: string,
    public vertragstextContentType?: string,
    public vetragsart?: number,
    public vorschlagAktion_id?: number,
    public vorschlagAm?: any,
    public vorschlagProzessId?: string,
    public vorschlagSerial?: string,
    public vorschlagVonBenutzer?: string,
    public personal_message?: string,
    public added_mail_anleger?: string,
    public added_mail_freigeber?: string,
    public correction?: boolean,
    public vertragstext_jasper?: string,
    public vertragstext_html?: string,
    public betMitVertragList?: BetMitVertragDTO[],
    public vorschau_jasper?: string
  ) {}
}

export class VorschauDataDTO {
  constructor(
    public id?: number,
    public buch_nachtrag_id?: number,
    public anba_id?: number,
    public vorschau_jasper?: string,
    public buchVertragDTO?: BuchungContract
  ) {}
}

export class BetMitVertragDTO {
  constructor(
    public id?: number,
    public vorname?: string,
    public nachname?: string,
    public actioncode?: Actioncode,
    public buchVertragId?: number,
    public mitarbeiterId?: number
  ) {}
}

export class BuchungContractHistory {
  constructor(
    public anlegerBetriebId?: number,
    public benutzer_id?: number,
    public benutzer_name?: string,
    public benutzer_vorname?: string,
    public beschreibung?: string,
    public buchAngeId?: number,
    public buchVorlageId?: number,
    public datum?: any,
    public freigabeAm?: any,
    public freigabeBetriebId?: number,
    public freigabeVonBenutzer?: string,
    public id?: number,
    public titel?: string,
    public vertragsstatus?: number,
    public vertragstext?: string,
    public vertragstextContentType?: string,
    public vetragsart?: number,
    public vorschlagAktion_id?: number,
    public vorschlagAm?: any,
    public vorschlagProzessId?: string,
    public vorschlagSerial?: string,
    public vorschlagVonBenutzer?: string
  ) {}
}

export class BuchungContractBest {
  constructor(
    public benutzerId?: number,
    public benutzerName?: string,
    public benutzerVorname?: string,
    public bestaetigungArt?: number,
    public buchVertragsId?: number,
    public datum?: any,
    public text?: string,
    public id?: number,
    public betrieb_id?: number
  ) {}
}
