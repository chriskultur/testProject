import {
  MlgMwSt,
  Recht,
  TantiemeAuf,
  TantiemeMwst,
  Vertriebsrechte,
  Warengruppe,
  Warenkategorie
} from "app/shared/enum/enum.model";

export class Angebot {
    constructor(
        public betriebsId?: number,
        public id?: number,
        public matererialleihgebuhr?: string,
        public matererialleihgebuhrMwSt?: MlgMwSt,
        public prodWerksId?: number,
        public recht?: Recht,
        public sucheVertrieb?: boolean,
        public tantiemAuf?: TantiemeAuf,
        public tantieme?: number,
        public tantiemeAufAndererPreis?: string,
        public tantiemeMwSt?: any,
        public vertriebBetriebId?: number,
        public vertriebBetriebIdAngefragt?: boolean,
        public vertriebBetriebIdAngefragtAm?: any,
        public vertriebsrechte?: Vertriebsrechte,
        public warengruppe?: Warengruppe,
        public warenkategorie?: Warenkategorie,

    ) {
    }
}

