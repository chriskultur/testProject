import {
  Actioncode,
  ListeAbkommenStatus,
  ListeKalendar_Art,
  ListeKontaktaufnahme,
  ListeProzessbeteiligte,
  ListeTerminPrioritat,
  ListeTerminZustand,
  MediaInhalt,
  Teilen_Status,
} from 'app/shared/enum/enum.model';

export class AnbahnungStammdaten {
  constructor(
    public abkoVeraKateDTOList: abkoVeraKateDTOList[],
    public abkommenStatus?: ListeAbkommenStatus,
    public anbieter_BetriebId?: number,
    public anmerkung?: string,
    public bpsId?: number,
    public datum?: any,
    public id?: number,
    public prodProdsId?: number,
    public prodSpielsId?: number,
    public prodWerksId?: number,
    public produktname?: string,
    public prozessbeteiligteId?: ListeProzessbeteiligte,
    public reservierungGiltBis?: any,
    public spielssId?: number,
    public veranstalter_BetriebId?: number,
    public abfahrt_anbieter?: string,
    public abfahrt_veranstalter?: string,
    public zielort_anbieter?: string,
    public zielort_veranstalter?: string,
    public benachrichtigungId?: number,
    public created_benutzer_id?: number,
    public added_mail_anbieter?: string,
    public added_mail_veranstalter?: string,
    public send_to_me_anbieter?: boolean,
    public send_to_me_veranstalter?: boolean,
    public icon_routing_anbieter?: string,
    public icon_routing_veranstalter?: string,
    public hash_impressum?: string,
    public ansprechpartnerAnbieter?: string,
    public ansprechpartnerVeranstalter?: string,
    public kontaktaufnahmeId_anbieter?: ListeKontaktaufnahme,
    public kontaktaufnahme_id_veranstalter?: ListeKontaktaufnahme,
    public anbieter_mitarbeiter_id?: number,
    public veranstalter_mitarbeiter_id?: number,
    public spiel_anderung?: boolean,
    public freigabe_am?: any,
    public freigabe_von_benutzer?: string,
    public vorschlag_am?: any,
    public vorschlag_prozess_id?: string,
    public vorschlag_serial?: string,
    public vorschlag_von_benutzer?: string
  ) {}
}

export interface abkoVeraKateDTOList {
  actioncode?: Actioncode;
  anbasId?: number;
  betVeraKatsId?: number;
  betriebsId?: number;
  id?: number;
}

export class anbaAnsprechDTOList {
  constructor(
    public anbaId?: number,
    public betriebId?: number,
    public mitarbeiterId?: number,
    public id?: number,
    public name?: string,
    public anrede?: string
  ) {}
}

export class AnbahnungMediaModel {
  constructor(
    public anbasId?: number,
    public beschreibung?: string,
    public bpsId?: number,
    public datum?: any,
    public id?: number,
    public media?: string,
    public mediaInhalt?: MediaInhalt,
    public mediaContentType?: string
  ) {}
}

export class kalendarEintagMediaModel {
  constructor(
    public kalendarEintragId?: number,
    public beschreibung?: string,
    public bpsId?: number,
    public datum?: any,
    public id?: number,
    public media?: string,
    public mediaInhalt?: MediaInhalt,
    public mediaContentType?: string
  ) {}
}

export class AnbahnungTerminModel {
  constructor(
    public anbasId?: number,
    public anbieterZustandDatum?: any,
    public anbieterZustandId?: ListeTerminZustand,
    public anbieter_Zustand_BenutzerId?: number,
    public bpsId?: number,
    public datum?: any,
    public freigabeAm?: any,
    public freigabeVonBenutzer?: string,
    public id?: number,
    public premiere?: boolean,
    public prioritatId?: ListeTerminPrioritat,
    public termin_von?: any,
    public termin_bis?: any,
    public veranstalterZustandDatum?: any,
    public veranstalterZustandId?: ListeTerminZustand,
    public veranstalter_Zustand_BenutzerId?: number,
    public vorschlagAm?: any,
    public vorschlagProzessId?: string,
    public vorschlagSerial?: string,
    public vorschlagVonBenutzer?: string,
    public veranstalterBenutzer?: boolean,
    public alternativTermin?: boolean,
    public adresse?: string,
    public message?: string,
    public hash_mail?: string,
    public send_hash_mail?: boolean,
    public prodExtern?: boolean,
    public hash_impresum?: string
  ) {}
}

export class AnbahnungKontakt {
  constructor(
    public anbasId?: number,
    public anmerkung?: string,
    public ansprechpartnerAnbieter?: string,
    public ansprechpartnerVeranstalter?: string,
    public ansprechpartner_Anbieter_MitarbeiterId?: number,
    public ansprechpartner_Veranstalter_MitarbeiterId?: number,
    public betriebsId?: number,
    public bpsId?: number,
    public datum?: any,
    public erinnerung?: any,
    public id?: number,
    public kontaktaufnahmeId?: ListeKontaktaufnahme,
    public send_mail?: boolean,
    public abkotermin_ids?: Array<any>,
    public aktiv_betriebs_id?: number,
    public type?: string,
    public anderung?: string
  ) {}
}

export class AnbahnungAnmerkungModel {
  constructor(
    public anmerkung?: string,
    public betriebsId?: number,
    public bpsId?: number,
    public datum?: any,
    public erinnerung?: any,
    public id?: number,
    public anbasId?: number
  ) {}
}

export class EintragAnmerkungModel {
  constructor(
    public anmerkung?: string,
    public betriebsId?: number,
    public bpsId?: number,
    public datum?: any,
    public erinnerung?: any,
    public id?: number,
    public kalendarEintragId?: number
  ) {}
}

export class AnbahnungAllResourceModel {
  constructor(
    public abkoTerminWithHistorieDTOList?: abkoTerminWithHistorieDTOList[],
    public abkoVeraKateDTOList?: abkoVeraKateDTOList[],
    public abkommenStatus?: number,
    public anbaKontaktDTOList?: anbaKontaktDTOList[],
    public anbieter_BetriebId?: number,
    public anmerkung?: string,
    public bpsId?: number,
    public datum?: any,
    public id?: number,
    public prodProdsId?: number,
    public prodSpielsId?: number,
    public prodWerksId?: number,
    public produktname?: string,
    public prozessbeteiligteId?: number,
    public reservierungGiltBis?: any,
    public spielssId?: number,
    public veranstalter_BetriebId?: number
  ) {}
}

export interface abkoTerminWithHistorieDTOList {
  anbaTerminHistorieDTOList?: anbaTerminHistorieDTOList[];
  anbasId?: number;
  anbieterZustandDatum?: any;
  anbieterZustandId?: number;
  anbieter_Zustand_BenutzerId?: number;
  bpsId?: number;
  datum?: any;
  id?: number;
  premiere?: boolean;
  prioritatId?: number;
  termin?: any;
  uhrzeit?: any;
  veranstalterZustandDatum?: any;
  veranstalterZustandId?: number;
  veranstalter_Zustand_BenutzerId?: number;
}

export interface anbaTerminHistorieDTOList {
  abkoTerminsId?: number;
  anbieterZustandDatum?: any;
  anbieterZustandId?: number;
  anbieter_Zustand_BenutzerId?: number;
  beshreibung?: string;
  id?: number;
  premiere?: boolean;
  prioritatId?: number;
  uhrzeit?: any;
  veranstalterZustandDatum?: any;
  veranstalterZustandId?: number;
  veranstalter_Zustand_BenutzerId?: number;
}

export interface anbaKontaktDTOList {
  anbasId?: number;
  anmerkung?: string;
  ansprechpartnerAnbieter?: string;
  ansprechpartnerVeranstalter?: string;
  ansprechpartner_Anbieter_MitarbeiterId?: number;
  ansprechpartner_Veranstalter_MitarbeiterId?: number;
  betriebsId?: number;
  bpsId?: number;
  datum?: any;
  erinnerung?: any;
  id?: number;
  kontaktaufnahmeId?: ListeKontaktaufnahme;
}

export class einstellungKalendarbetrieb {
  constructor(
    public betriebId?: number,
    public bezeichnung?: string,
    public farbe?: string,
    public id?: number,
    public reihenfolge?: number
  ) {}
}

export class einstellungVeranstaltungsKategoriebetrieb {
  constructor(
    public betriebId?: number,
    public bezeichung?: number,
    public farbe?: string,
    public id?: number,
    public reihenfolge?: number
  ) {}
}

export class einstellungKalendarbenutzer {
  constructor(public betBetriebsKalendarId?: number, public id?: number, public bpId?: number) {}
}

export class einstellungbenutzer {
  constructor(
    public bpId?: number,
    public id?: number,
    public kalendarAnsicht?: number,
    public listeSpielzeitsId?: number,
    public start_datum?: any,
    public veranstalter_kalendar?: boolean
  ) {}
}

export class messageTemplate {
  constructor(public betriebsId?: number, public kontakt_text?: string, public kontakt_titel?: string, public id?: number, public vorlageArt?:number) {}
}

export class filterProduktebenutzer {
  constructor(
    public bpId?: number,
    public id?: number,
    public produktID?: number,
    public produktArt?: number,
    public aktiv?: boolean,
    public highlight?: boolean
  ) {}
}

export class filterSpielbenutzer {
  constructor(public bpId?: number, public id?: number, public spielsId?: number, public aktiv?: boolean, public betriebId?: number) {}
}

export class filterVeranstaltungsKategoriebenutzer {
  constructor(public betVeraKatId?: number, public bpId?: number, public id?: number) {}
}

export class standardKalenderbenutzer {
  constructor(public standKalesId?: number, public bpId?: number, public id?: number) {}
}

export class AnbahnungFremdangebotModel {
  constructor(
    public anbasId?: number,
    public id?: number,
    public listeSpielzeitsId?: number,
    public preis?: number,
    public tantieme?: number,
    public titel?: string
  ) {}
}

export class kalendareintrag {
  constructor(
    public abkoTerminId?: number,
    public beschreibung?: string,
    public anlegerBetriebId?: number,
    public freigabeBetriebId?: number,
    public betBetriebsKalendarId?: number,
    public betriebId?: number,
    public datum_bis?: string,
    public datum_von?: string,
    public id?: number,
    public kalendar_art?: ListeKalendar_Art,
    public ort?: string,
    public prodprod_id?: number,
    public prodspiel_id?: number,
    public produktname?: string,
    public prodwerk_id?: number,
    public spiel_id?: number,
    public spiels_name?: string,
    public termin_art?: number,
    public termin_typ?: number,
    public veranstaltungskategorie_id?: Array<any>,
    public warnung_entfernung?: boolean,
    public warnung_konflikt?: boolean,
    public betriebsname_anbieter?: string,
    public betriebsname_veranstalter?: string,
    public icon_routing?: string,
    public hash_impressum?: string,
    public anerkung_added?: string,
    public media_action?: string,
    public kalendareintrag_geteilt?: boolean,
    public publischer_kalendar?: number,
    public vertragStatus?: number,
    public buchVertragStatus?: number,
    public buchAngeId?: number
  ) {}
}

export class KalendarEintragBetrieb {
  constructor(
    public betriebId?: number,
    public id?: number,
    public teilen_Status?: Teilen_Status,
    public publischerKalendarEintragId?: number,
    public subscriberKalendarEintragId?: number,
    public freigabeAm?: any,
    public freigabeVonBenutzer?: string,
    public vorschlagAm?: any,
    public vorschlagProzessId?: string,
    public vorschlagSerial?: string,
    public vorschlagVonBenutzer?: string,
    public hash_impressum?: string,
    public publischer_betriebs_id?: string,
    public publischer_betriebsname?: string,
    public betrieb_typ?: number,
    public list_of_mails?: Array<string>,
    public send_mails?: boolean,
    public message?: string
  ) {}
}

export class standardkalender {
  constructor(
    public bezeichnung?: string,
    public farbe?: string,
    public gliedCodeId?: number,
    public id?: number,
    public jahr?: string,
    public kalendarartId?: number,
    public landCodeId?: number,
    public standKaleDetailsDTOList?: standKaleDetailsDTOList[]
  ) {}
}

export class standKaleDetailsDTOList {
  bemerkung?: string;
  bezeichnung?: string;
  datum_bis?: string;
  datum_von?: string;
  id?: number;
  standKalesId?: number;
}

export class spielZeitAll {
  constructor(
    public beschreibung?: string,
    public datumBis?: any,
    public datumVon?: any,
    public id?: number,
    public reihenfolge?: number
  ) {}
}

export class anfrageFilter {
  constructor(public anfrageId?: number, public bpId?: number, public id?: number, public aktiv?: boolean, public highlight?: boolean) {}
}

export class calendarViewbenutzer {
  constructor(
    public betriebId?: number,
    public bpsId?: number,
    public id?: number,
    public aktiv?: boolean,
    public kalendar_mode?: boolean,
    public kalendaransicht?: number,
    public listeSpielzeitsId?: number,
    public route_warning?: boolean,
    public start_datum?: string
  ) {}
}

export class produktEntfernung {
  constructor(public entfernung?: number, public prodProdId?: number, public id?: number, public auto_routing?: boolean) {}
}

export class terminPDF {
  constructor(
    public datum?: any,
    public hash_key?: string,
    public id?: number,
    public pdf_data?: string,
    public pdf_dataContentType?: string,
    public bezeichnung?: string,
    public anbaId?: number,
    public zustand_id?: number,
    public status?: string
  ) {}
}

export class terminPDFMinimal {
  constructor(
    public datum?: any,
    public hash_key?: string,
    public id?: number,
    public bezeichnung?: string,
    public anbaId?: number,
    public zustand_id?: number,
    public status?: string
  ) {}
}

export class AnbahnungKontaktForNestedAnba {
  constructor(
    public anbasId?: number,
    public anmerkung?: string,
    public ansprechpartnerAnbieter?: string,
    public ansprechpartnerVeranstalter?: string,
    public ansprechpartner_Anbieter_MitarbeiterId?: number,
    public ansprechpartner_Veranstalter_MitarbeiterId?: number,
    public betriebsId?: number,
    public bpsId?: number,
    public datum?: any,
    public erinnerung?: any,
    public id?: number,
    public kontaktaufnahmeId?: ListeKontaktaufnahme,
    public send_mail?: boolean,
    public abkotermin_ids?: Array<any>,
    public aktiv_betriebs_id?: number,
    public type?: string,
    public anderung?: string,
    public bp_vorname?: string,
    public bp_nachname?: string,
    public actioncode?: Actioncode
  ) {}
}

export class AnbahnungTerminModelForNestedAnba {
  constructor(
    public anbasId?: number,
    public anbieterZustandDatum?: any,
    public anbieterZustandId?: ListeTerminZustand,
    public anbieter_Zustand_BenutzerId?: number,
    public bpsId?: number,
    public freigabeAm?: any,
    public freigabeVonBenutzer?: string,
    public id?: number,
    public premiere?: boolean,
    public prioritatId?: ListeTerminPrioritat,
    public prodExtern?: boolean,
    public termin_von?: any,
    public termin_bis?: any,
    public datum?: any,
    public erinnerung?: any,
    public message?: string,
    public hash_mail?: string,
    public hash_impresum?: string,
    public send_hash_mail?: boolean,
    public veranstalterZustandDatum?: any,
    public veranstalterZustandId?: ListeTerminZustand,
    public veranstalter_Zustand_BenutzerId?: number,
    public vorschlagAm?: any,
    public vorschlagProzessId?: string,
    public vorschlagSerial?: string,
    public vorschlagVonBenutzer?: string,
    public veranstalterBenutzer?: boolean,
    public alternativTermin?: boolean,
    public adresse?: string,
    public actioncode?: Actioncode
  ) {}
}

export class AnbahnungStammdatenMergedDTO {
  constructor(
    public abkoVeraKateDTOList: abkoVeraKateDTOList[],
    public anbaAnsprechDTOList: anbaAnsprechDTOList[],
    public abkommenStatus?: ListeAbkommenStatus,
    public anbieter_BetriebId?: number,
    public anmerkung?: string,
    public bpsId?: number,
    public datum?: any,
    public id?: number,
    public prodProdsId?: number,
    public prodSpielsId?: number,
    public prodWerksId?: number,
    public angeProd?: number,
    public angeWerk?: number,
    public angeSpiel?: number,
    public produktname?: string,
    public prozessbeteiligteId?: ListeProzessbeteiligte,
    public reservierungGiltBis?: any,
    public spielssId?: number,
    public veranstalter_BetriebId?: number,
    public abfahrt_anbieter?: string,
    public abfahrt_veranstalter?: string,
    public zielort_anbieter?: string,
    public zielort_veranstalter?: string,
    public benachrichtigungId?: number,
    public created_benutzer_id?: number,
    public added_mail_anbieter?: string,
    public added_mail_veranstalter?: string,
    public send_to_me_anbieter?: boolean,
    public send_to_me_veranstalter?: boolean,
    public icon_routing_anbieter?: string,
    public icon_routing_veranstalter?: string,
    public hash_impressum?: string,
    public ansprechpartnerAnbieter?: string,
    public ansprechpartnerVeranstalter?: string,
    public kontaktaufnahmeId_anbieter?: ListeKontaktaufnahme,
    public kontaktaufnahme_id_veranstalter?: ListeKontaktaufnahme,
    public abkoTerminDTOList?: Array<AnbahnungTerminModelForNestedAnba>,
    public anbaKontaktDTO?: AnbahnungKontaktForNestedAnba,
    public send_hash_mail?: boolean,
    public generate_pdf?: boolean,
    public angebotGiltXTage?: number,
    public actioncode?: Actioncode,
    public freigabe_am?: any,
    public freigabe_von_benutzer?: string,
    public vorschlag_am?: any,
    public vorschlag_prozess_id?: string,
    public vorschlag_serial?: string,
    public vorschlag_von_benutzer?: string,
    public produktionsstatus?: number,
    public storno_id?: number
  ) {}
}

export class GetAnbahnungStammdatenMergedDTO {
  constructor(
    public abkoVeraKateDTOList: abkoVeraKateDTOList[],
    public anbaAnsprechDTOList: anbaAnsprechDTOList[],
    public abkommenStatus?: ListeAbkommenStatus,
    public anbieter_BetriebId?: number,
    public anmerkung?: string,
    public bpsId?: number,
    public datum?: any,
    public id?: number,
    public prodProdsId?: number,
    public prodSpielsId?: number,
    public prodWerksId?: number,
    public angeProd?: number,
    public angeWerk?: number,
    public angeSpiel?: number,
    public produktname?: string,
    public prozessbeteiligteId?: ListeProzessbeteiligte,
    public reservierungGiltBis?: any,
    public spielssId?: number,
    public veranstalter_BetriebId?: number,
    public abfahrt_anbieter?: string,
    public abfahrt_veranstalter?: string,
    public zielort_anbieter?: string,
    public zielort_veranstalter?: string,
    public benachrichtigungId?: number,
    public created_benutzer_id?: number,
    public added_mail_anbieter?: string,
    public added_mail_veranstalter?: string,
    public send_to_me_anbieter?: boolean,
    public send_to_me_veranstalter?: boolean,
    public icon_routing_anbieter?: string,
    public icon_routing_veranstalter?: string,
    public hash_impressum?: string,
    public ansprechpartnerAnbieter?: string,
    public ansprechpartnerVeranstalter?: string,
    public kontaktaufnahmeId_anbieter?: ListeKontaktaufnahme,
    public kontaktaufnahme_id_veranstalter?: ListeKontaktaufnahme,
    public abkoTerminDTOList?: Array<AnbahnungTerminModelForNestedAnba>,
    public anbaKontaktDTOList?: AnbahnungKontaktForNestedAnba[],
    public send_hash_mail?: boolean,
    public freigabe_am?: any,
    public freigabe_von_benutzer?: string,
    public vorschlag_am?: any,
    public vorschlag_prozess_id?: string,
    public vorschlag_serial?: string,
    public vorschlag_von_benutzer?: string,
    public produktionsstatus?: number
  ) {}
}

export class BuchungStornoVorschlag {
  constructor(
    public ansprechpartner?: string,
    public benutzerId?: number,
    public benutzerName?: string,
    public benutzerVorname?: string,
    public buchAngeId?: number,
    public datum?: any,
    public id?: number,
    public kanal?: string,
    public stornovereinbarung?: string,
    public stornovereinbarung_jasper?: string,
    public anfrage_betrieb_id?: number
  ) {}
}
