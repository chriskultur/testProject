import {Vorschlag_aktion_id} from 'app/shared/enum/enum.model';

export class BpBetVerknupfung {
  constructor(
    public betriebsId?: number,
    public bpsId?: number,
    public freigabeAm?: any,
    public freigabeBenutzer?: string,
    public freigabeBetrieb?: string,
    public freigabeVonBenutzer?: string,
    public id?: number,
    public mitarbeitersId?: number,
    public vorschlagAm?: any,
    public vorschlagProzessId?: string,
    public vorschlagVonBenutzer?: string,
    public verknupfungsart?: number,
    public vorschlag_aktion_id?: Vorschlag_aktion_id,
    public angelegter?: number,
    public betriebsname?: string,
    public betriebstatus?: number,
    public betriebTyp?: number
  ) {}
}
