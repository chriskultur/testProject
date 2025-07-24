export enum Kommunikationsart {
  'E-Mail Zentrale',
  'E-mail Abteilung',
  'E-Mail Privat',
  'Telefon Zentrale',
  'Telefon Abteilung',
  'Telefon Privat',
  'Mobil Zentrale',
  'Mobil Abteilung',
  'Mobil Privat',
  'Fax Zentrale',
  'Fax Abteilung',
  'Fax Privat',
  'FACEBOOK',
  'LINKEDIN',
  'TWITTER',
  'YOUTUBE',
  'PINTEREST',
  'GOOGLE',
  'RSS_FEED',
  'INSTAGRAM',
  'REDDIT',
  'XING',
  'WEBSITE',
}

export enum KommunikationsartAbstract {
  'E-Mail',
  'Mobiltelefon',
  'Telefon',
  'Fax',
}

export enum Adressart {
  'Hauptadresse',
  'Rechnungsadresse',
  'Plakatadresse',
  'Zweigstelle',
  'Besucheradresse',
  'Anfahradresse',
  'Lieferantenadresse',
  'Vertragsadresse',
}

export const enum Actioncode {
  'unchanged',
  'create',
  'update',
  'delete',
  'update_without_camunda_task',
  'storno',
}

export enum ListeTerminTyp {
  'BETRIEBKALENDER',
  'ANFRAGE',
  'RESERVIERUNG',
  'BUCHUNG',
  'STORNO',
}

export enum ListeAbkommenStatus {
  'OFFEN',
  'IN_ARBEIT',
  'GESCHLOSSEN',
}

export enum ListeProzessbeteiligte {
  'BEIEDE',
  'ANBIETER',
  'VERANSTALTER',
}
export enum ListeTerminPrioritat {
  'WUNSCHTERMIN',
  'NORMAL',
  'AUSWEICHTERMIN',
}

export enum ListeTerminArt {
  LEER,
  ENTSCHEIDUNG,
  WARTE,
  ABGELEHNT,
  BESTATIGT,
  VORSCHLAG,}

export enum ListeTerminZustand {
  'BETRIEBKALENDER',
  'ENTSCHEIDUNG',
  'ANFRAGE_WARTE',
  'ANFRAGE_ABGELEHNT',
  'ANFRAGE_BESTATIGT',
  'RESERVIERUNG_WARTE',
  'RESERVIERUNG_ABGELEHNT',
  'RESERVIERUNG_BESTATIGT',
  'AUSWEICHTERMIN',
  'BUCHUNG_WARTE',
  'BUCHUNG_ABGELEHNT',
  'BUCHUNG_BESTATIGT',
  'STORNO_WARTE',
  'STORNO_ABGELEHNT',
  'STORNO_BESTATIGT',
}

export enum ListeFilterEintrag {
  'ANFRAGE',
  'OPTION',
  'BUCHUNG',
  'VERTRAG',
  'MITARBEITER',
  'BETRIEB',
  'OFFEN',
  'ARBEIT',
  'ERLEDIGT',
}

export enum ListeKontaktaufnahme {
  'Telefon',
  'Fax',
  'Persönlich',
  'E-Mail',
  'Brief',
  'Message',
  'Decline',
}

export enum ListeFilterTyp {
  'BUCHUNGSSTATUS',
  'AUFGABENSTATUS',
  'MITARBEITER',
  'BETRIEBS',
}
export enum ListeKalendar_Art {
  'PRODUKT',
  'BETRIEBSKALENDER',
}

export enum Teilen_Status {
  'nicht geteilt',
  'eingeladen',
  'bestätigt',
  'abgelehnt',
  'ausgetreten',
}

export enum Betriebsstatus {
  'ANGELEGT',
  'IN_PRUEFUNG',
  'FREIGEGEBEN',
  'DEAKTIV',
  'GESPERRT',
}

export enum BetriebsverwaltungCode {
  'IMPRESSUM',
  'SELBSTVERWALTET',
}

export enum Freigabe {
  'PRIVAT',
  'ALLE',
  'GESCHAEFTSPARTNER',
  'REGISTRIERTER_BENUTZER',
  'MITARBEITER_MEINES_BETRIEBS',
}

export const enum Vorschlag_aktion_id {
  'LEER',
  'EINFUGEN',
  'ANDERN',
  'LOSCHEN',
}

export const enum Libetverwaltung {
  'IMPRESSUM',
  'SELBSTVERWALTET',
}

export const enum Libetmitbildart {
  'STANDARDBILD',
  'UNTERSCHRIFT',
}

export enum Social {
  'FACEBOOK',
  'WEBSITE',
  'LINKEDIN',
  'TWITTER',
  'YOUTUBE',
  'PINTEREST',
  'GOOGLE',
  'RSS_FEED',
  'INSTAGRAM',
  'REDDIT',
  'XING',
}

export const USER_MIN_AGE = 18;

export const enum Aktiv {
  'Y',
  'N',
}

export enum Libetmedia {
  'PHOTO',
  'WEB',
  'PRINT',
}

export enum LibetTyp {
  'Standardbetrieb',
  'Künstlerbetrieb',
  'Dienstleister',
}

export enum BetriebsKategorie {
  'Agentur',
  'Anbieter von Bühnenproduktionen',
  'Anbieter von Gastspielen',
  'Anbieter von Kleinkunst',
  'Anbieter von Werken',
  'Anbieter von Probenräumen',
  'Anbieter von Veranstaltungsräumen',
  'Anbieter von Technik(Verleih)',
  'Sonstige Dienstleistungen',
  'Veranstalter',
  'Verlage',
}

export enum UntertirlArt {
  Untertitel,
  Originaltitel,
}

export enum Ligsb {
  'Lieferant',
  'Kunde',
  'Lieferant und Kunde',
  'Sonstiges',
}

export enum Beschaeftigungsart {
  'Intern',
  'Extern',
}

export enum Warenkategorie {
  'Produkt',
  'Angebot',
}

export enum Warengruppe {
  'Spielstatte',
  'Werk',
  'Produktion',
  'Kunst',
}

export enum LiFaq {
  'ALLGEMEIN',
  'ANMELDUNG REGISTIERUNG',
  'BENUTZERPROFIL VERWALTEN',
  'BETRIEB VERWALTEN',
  'PRODUKTE VERWALTEN',
  'OPTIONEN VERWALTEN',
  'TECHNIK',
  'PRIVATSPHAREEINSTELLUNGEN',
  'PARTER UND PRESSEANFRAGEN',
  'BERATUNGSSERVICE',
  'WER KANN_TEILNEHMEN',
  'WER STECKT HINTER DEM EKULTURPORTAL',
  'KOSTEN',
  'SPONSOREN',
  'DATENSCHUTZ',
  'KONTAKT',
  'ADRESSEN SYNCHRONISIEREN',
}

export enum ListeFreigabe {
  'NUR_BETRIEB',
  'ALLE',
  'GESCHAEFTSPARTNER',
  'REGISTRIERTER_BENUTZER',
  'MITARBEITER_MEINES_BETRIEBS',
}

export enum ListeFreigabeBetrieb {
  'IN_BEARBEITUNG',
  'BESTATIGT',
  'ABGELEHNT',
}

export enum ListeMlgMwSt {
  'MWST_FREI',
  'MWST_7',
}

export enum ListeMwst {
  'MWST_FREI',
  'MWST_9',
  'MWST_17',
}

export enum ListePreiskondition {
  'AUF_ANFRAGE',
  'FIXPREIS',
  'VARIABLER_PREIS',
}

export enum ListeProduktionsrechtinhaber {
  'BEI_MIR',
  'BETRIEB',
}

export enum ListeRecht {
  'KLEINES_RECHT',
  'GROSSES_RECHT',
}

export enum ListeTantiemeAuf {
  'ANGEBORTSPREIS',
  'ROHEINNAHMEN',
  'ANDERER_PREIS',
  'Angebotspreis oder Roheinnahmen (Es gilt der höher Wert)',
}

export enum ListeVorschlagAktion {
  'LEER',
  'EINFUGEN',
  'ANDERN',
  'LOSCHEN',
}

export enum ListeWarengruppe {
  'SPIELSTATTE',
  'WERK',
  'PRODUKTION',
}

export enum ListeWarenskategorie {
  'PRODUKT',
  'ANGEBOT',
}

export enum ListeWerteliste {
  'AP_VARIABLE_PREIS_TAG',
  'AP_TOURNEEART_TAG',
  'AP_UNTERKUNFT',
  'PP_PRODUKTION_BESONDERHEITEN',
  'PP_MITWIRKENDE_GRUPPE_AUF_BUHNE',
  'PP_REZENSION_QUELLE',
  'PP_STIMMUNG',
  'PP_ZIELGRUPPE',
  'AS_OPTION',
  'AS_PREISVARIANTE',
  'PS_SPIELSTATTE_ART',
  'PS_SCHEINWERFER_ART',
  'PS_SCHEINWERFER_ORT',
  'PW_BASIERT_AUF',
  'PW_BESONDERHEITEN',
  'PW_FREI_ZUR',
  'PW_GENRE',
  'PW_INSTRUMENTE',
  'PW_MUNDART',
  'PW_SPRACHE',
  'PW_STIMMUNG',
  'PW_URHEBER_TAG',
  'PW_URHEBER',
  'PW_ZIELGRUPPE',
  'PP_MITWIRKENDE_GRUPPE_HINTER_BUHNE',
  'PP_MITWIRKENDE_GRUPPE_STAB',
  'PS_LICHT_TON',
  'PP_KOSTEN',
  'PP_ABGABEN',
  'PS_EXTRA',
  'MITWIRKENDE_GRUPPE_BEZEICHNUNG',
  'BILD_LIZENZ',
}

export enum Liwerteliste {
  'DEAKTIVIERUNGSGRUND',
  'SCHLAGWORTBETRIEB',
  'BLACKLIST',
  'ABTEILUNG',
  'MITARBEITER_IST_ZUSTAENDIG_FUER',
  'BANKNAME',
  'BANKLEITZAHL',
  'USTFREI',
  'USTSATZ',
  'BETRIEBSKATEGORIE',
  'ARTDERSPIELSTÄTTE',
}

export enum ListeVertriebsrechte {
  'BEI_MIR',
  'RECHTEFREI',
  'BETRIEB',
}

export enum Lirecht {
  'Betriebsleitung',
  'Administration',
  'Betriebsverwaltung',
  'Produktverwaltung',
  'Mitarbeiterrechteverwaltung',
  'Buchungsverwaltung',
}

export enum BahncardArt {
  'KEINE_ERMASSIGUNG',
  'BAHNCARD_25_2_KLASSE',
  'BAHNCARD_25_1_KLASSE',
  'BAHNCARD_50_2_KLASSE',
  'BAHNCARD_50_1_KLASSE',
  'SH_CARD',
  'AT_VORTEILSCARD_INCL_RAILPLUS',
  'CH_GENERAL_ABONNEMENT',
  'CH_HALBTAXABO_INCL_RAILPLUS',
  'CH_HALBTAXABO_OHNE_RAILPLUS',
  'NL_VOORDEELURENABO_INCL_RAILPLUS',
  'NL_VOORDEELURENABO_OHNE_RAILPLUS',
}

export enum Fahrtkosten {
  'inklusiv',
  'exklusiv',
  'auf Anfrage',
}

export enum IdentifikationArt {
  'PERSONALAUSWEIS',
  'REISEPASS',
  'FUHRERSCHEIN',
}

export enum TeamMitwirkend {
  'AUF_DER_BUHNE',
  'HINTER_DER_BUHNE',
  'STAB',
  'URHEBER',
}

export enum MediaInhalt {
  'DOKUMENT',
  'BILD',
  'VIDEO',
  'MP3',
}

export enum MlgMwSt {
  'MWST_FREI',
  'MWST_7',
}

export enum Recht {
  'KLEINES_RECHT',
  'GROSSES_RECHT',
}

export enum TantiemeAuf {
  'ANGEBORTSPREIS',
  'ROHEINNAHMEN',
  'ANDERER_PREIS',
  'Angebotspreis oder Roheinnahmen (Es gilt der höher Wert)',
}

export enum TantiemeMwst {
  'MWST_FREI',
  'MWST_7',
}

export enum Vertriebsrechte {
  'BEI_MIR',
  'RECHTEFREI',
  'BETRIEB',
}

export enum ListeBenachrichtigungArt {
  'Neue oder geändarte Anbahnung',
  'Änderung am produkt',
  'Freigegeben/abgelehnt',
}

export enum KostenArt {
  'Betrag',
  'Prozent',
  'Freigegeben/inklusive',
}

export enum Headings {
  'Normal',
  'Überschrift 1',
  'Überschrift 2',
  'Überschrift 3',
  'Überschrift 4',
  'Überschrift 5',
}
