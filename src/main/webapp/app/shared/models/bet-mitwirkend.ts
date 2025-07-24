import {Actioncode, Adressart, BahncardArt, IdentifikationArt, TeamMitwirkend} from 'app/shared/enum/enum.model';

export class BetMitwirkende {
  constructor(
    public agentur_betrieb_idId?: number,
    public anrede?: string,
    public bahncard?: BahncardArt,
    public bankverbindungBic?: string,
    public bankverbindungIban?: number,
    public bayerischeVersorgungsnr?: string,
    public benutzerEingeladenAm?: any,
    public benutzerEingeladenStatus?: string,
    public benutzer_idId?: number,
    public betriebEingeladenAm?: any,
    public betriebEingeladenStatus?: string,
    public betrieb_idId?: number,
    public bild?: string,
    public bildContentType?: string,
    public gage?: number,
    public geburtsdatum?: any,
    public homepage?: string,
    public id?: number,
    public identifikationArt?: IdentifikationArt,
    public identifikationAusgestelltAm?: any,
    public identifikationAusgestelltVon?: any,
    public identifikationNr?: number,
    public krankenversicherungName?: string,
    public krankenversicherungNummer?: string,
    public kunstlerName?: string,
    public kunstlerVorname?: string,
    public kurzbeschreibung?: string,
    public mitAdresseDTOList?: MitAdresseDTO[],
    public mitBerufTagDTOList?: MitBerufTagDTO[],
    public mitBeschreibungTagDTOList?: MitBerufTagDTO[],
    public mitKommunikationDTOList?: MitKommunikationDTO[],
    public mitTeamTagDTOList?: MitTeamTagDTO[],
    public mitarbeiter_idId?: number,
    public name?: string,
    public nationalitat?: string,
    public sozialversicherungsnummer?: string,
    public steuerIdentnummer?: string,
    public titel?: string,
    public vorname?: string,
    public actioncode?: number,
    public prodProdMitwirPersonMenuDTOS?: Array<any>,
    public prodKunst_id?: number,
    public kunstlername?: string,
  ) {}
}

export interface MitTeamTagDTO {
  actioncode?: Actioncode;
  betriebMitwirkendeId?: number;
  id?: number;
  teamMitwirkend?: TeamMitwirkend;
}

export class MitKommunikationDTO {
  constructor(
    public actioncode?: Actioncode,
    public betriebMitwirkendeId?: number,
    public id?: number,
    public kommunikation?: number,
    public wert?: string
  ) {}
}

export interface MitBerufTagDTO {
  actioncode?: Actioncode;
  betriebMitwirkendeId?: number;
  bezeichnung?: string;
  id?: number;
}

export interface MitAdresseDTO {
  actioncode?: Actioncode;
  adressart: Adressart;
  adressbezeichnung: string;
  betMitwirkendesId: number;
  geoLat: number;
  geoLon: number;
  id?: number;
  postAdresszusatz: string;
  postAlternativeBetriebsbezeichnung: string;
  postAnsprechpartner: string;
  postPlz: number;
  postPostfach: string;
  postStadt: string;
  postStrasse: string;
  post_land_codeId: number;
  post_land_glied_codeId: number;
}
