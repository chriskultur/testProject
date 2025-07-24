import {Actioncode} from 'app/shared/enum/enum.model';

export class BpSucheModel {
  constructor(
    public bezeichnung?: string,
    public bpId?: number,
    public bpSucheParameterDTOList?: BpSucheParameterDTOList[],
    public datum?: any,
    public id?: number,
    public reihenfolge?: number,
    public warengruppe?: string
  ) {}
}

export class BpSucheParameterDTOList {
  constructor(
    public actioncode?: Actioncode,
    public bpSucheId?: number,
    public filtername?: string,
    public id?: number,
    public wert?: string
  ) {}
}
