import {Actioncode, Fahrtkosten} from 'app/shared/enum/enum.model';

export class AngebotTabObj {
  angeProdExtraLeistungDTOList?: AngeProdExtraLeistung[];
  angeProdFahrtDTOList?: AngeProdFahrtDTO[];
  angeProdGebuhrenAbgabenDTOList?: AngeProdGebuhrenAbgaben[];
  angeProdPreisDTOList?: AngebotPreis[];
  angeProdTourTagDTOList?: AngebotTag[];
  angeProdZeitDTOList?: AngebotZeit[];
  angeProdZusatKostenDTOList?: AngeProdZusatKostenDTO[];
  auffuhrungMinuten?: number;
  betriebVertriebId?: number;
  betriebsId?: number;
  fahrtkostenInklusiv?: Fahrtkosten;
  id?: number;
  listeSpielzeitsId?: number;
  materialGebuhren?: number;
  mwst?: number;
  pauseMinuten?: number;
  pauseNachMinuten?: number;
  preis?: number;
  preisAufAnfrage?: boolean;
  preisInAuslandAbweichend?: boolean;
  prodProdsId?: number;
  sucheVertrieb?: boolean;
  tantiemAuf?: number;
  tantieme?: number;
  tantiemeAufAndererPreis?: string;
  tantiemeMwSt?: number;
  tourneezeitraumAngeben?: boolean;
  unterkunftArt?: number;
  unterkunftBeschreibung?: string;
  unterkunftHotelkategorie?: string;
  unterkunftUberKm?: number;
  unterkunftZimmerAnz?: number;
  vertriebBetriebIdAngefragt?: boolean;
  vertriebBetriebIdAngefragtAm?: any;
  vertriebsrechte?: number;
  warengruppe?: number;
  warenkategorie?: number;
  mwstArt?: number;
  auslandBeschreibung?: string;
  fahrtkosten_fallenan?: boolean;
  materialGebuhrenMwst?: number;
  preisAusland?: number;
  preisAuslandMwst?: number;
  angeProdRegionAbweichendDTOList?: AngeProdRegionAbweichendDTOList[];
  preisbezeichnung?: string;
}

export interface AngeProdRegionAbweichendDTOList {
  actioncode?: Actioncode;
  angeProdId?: number;
  id?: number;
  preis?: number;
  reihenfolge: number;
  mwst: number;
  bezeichnung?: string;
}

export interface AngeProdZusatKostenDTO {
  actioncode?: Actioncode;
  angeProdId?: number;
  angeProdKostenTagDTOList?: AngeProdKostenTagDTO[];
  id?: number;
  preis?: number;
  reihenfolge: number;
  mwst: number;
}

export interface AngeProdKostenTagDTO {
  actioncode?: Actioncode;
  angeProdZusatKostenId?: number;
  bezeichnung?: string;
  id?: number;
}

export interface AngeProdGebuhrenAbgaben {
  actioncode?: Actioncode;
  angeProdAbgabenTagDTOList?: AngeProdAbgabenTagDTO[];
  angeProdId?: number;
  art_abgabe?: number;
  betrag?: number;
  id?: number;
  prozent?: number;
  reihenfolge: number;
  minuten?: string;
  mwst: number;
}
export interface AngeProdAbgabenTagDTO {
  actioncode?: Actioncode;
  angeProdGebuhrenAbgabenId?: number;
  bezeichnung?: string;
  id?: number;
}

export interface AngeProdExtraLeistung {
  actioncode?: Actioncode;
  angeProdId?: number;
  angeProdLeistungTagDTOList?: AngeProdLeistungTagDTO[];
  id?: number;
  preis?: number;
  reihenfolge: number;
  mwst: number;
}
export interface AngeProdLeistungTagDTO {
  actioncode?: Actioncode;
  angeProdExtraLeistungId?: number;
  bezeichnung?: string;
  id?: number;
}

export interface AngeProdFahrtDTO {
  actioncode?: Actioncode;
  angeProdsId?: number;
  entfernung?: number;
  id?: number;
  preisEur?: number;
  mwst: number;
}

export interface AngebotZeit {
  actioncode?: Actioncode;
  angeProdsId?: number;
  datumBis?: any;
  datumVon?: any;
  id?: number;
}

export interface AngebotTag {
  actioncode?: Actioncode;
  angeProdsId?: number;
  bezeichnung?: string;
  id?: number;
}

export interface AngebotPreis {
  actioncode?: Actioncode;
  angeProdPreisTagDTOList?: AngebotPreisTag[];
  angeProdsId?: number;
  id?: number;
  preis?: string;
}
export interface AngebotPreisTag {
  actioncode?: Actioncode;
  angeProdPreissId?: number;
  bezeichnung?: string;
  id?: number;
}
