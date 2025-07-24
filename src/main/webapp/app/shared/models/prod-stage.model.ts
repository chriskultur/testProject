import {Actioncode} from 'app/shared/enum/enum.model';

export class ProdStageModel {
  constructor(
    public buhnenprojektionenMoglich?: boolean,
    public buhnenzugeElektrisch?: number,
    public buhnenzugeTragkraft?: number,
    public duschen?: number,
    public grossraumgarderoben?: number,
    public hauptbuhneBeschreibung?: string,
    public hauptbuhneBodenbelag?: string,
    public hauptbuhneBreite?: number,
    public hauptbuhneHohe?: number,
    public hauptbuhneTiefe?: number,
    public id?: number,
    public interne_bezeichnung_der_produkts?: string,
    public kapazitatBestuhlung?: number,
    public kapazitatMusiktheater?: number,
    public kapazitatOhneBestuhlung?: number,
    public kapazitatTischbestuhlung?: number,
    public konzertzugeElektrisch?: number,
    public konzertzugeTragkraft?: number,
    public kurbelzugeElektrisch?: number,
    public kurbelzugeTragkraft?: number,
    public lichtstellpult?: boolean,
    public lichtstellpultBeschreibung?: string,
    public lichtstellpultBuhnenversatzte?: number,
    public lichtstellpultDimmerkreise?: number,
    public lichtstellpultFabrikat?: string,
    public lichtstellpultSpeicherplatze?: number,
    public lichtstellpultStarkstromanschlusse?: number,
    public lichtstellpultTyp?: string,
    public lichtstellpultVerfolger?: number,
    public orchestergrabenMusiker?: number,
    public orchestergrabenVerfahrbar?: boolean,
    public portalBreite?: number,
    public portalHohe?: number,
    public prodSpielArtDTOList?: ProdSpielArtDTOListModel[],
    public prodSpielLichtpultDTOList?: ProdSpielLichtpultDTOListModel[],
    public prodSpielScheinDTOList?: ProdSpielScheinDTOListModel[],
    public prodSpielTonregieraumDTOList?: ProdSpielLichtpultDTOListModel[],
    public rangEmporeVorhanden?: boolean,
    public scheinwerferBeschreibung?: string,
    public scheinwerferVorhanden?: boolean,
    public sologaderoben?: number,
    public spielssId?: number,
    public toiletten?: number,
    public tonAnlageBeschreibung?: string,
    public tonAnlageHochwertig?: boolean,
    public tonAnlageMusikeinspielungMoglich?: boolean,
    public tonAnlageVideoMittschnittMoglich?: boolean,
    public tonAnlageVorhanden?: boolean,
    public transportwege?: number,
    public vorbuhneBreite?: number,
    public vorbuhneTiefe?: number,
    public warengruppe?: number,
    public warenkategorie?: number,
    public waschmaschineAnschlussmoglichkeit?: boolean,
    public waschmaschineVorhanden?: boolean,
    public zuschauerramMitAnsteigendemParkett?: boolean,
    public betriebsId?: number
  ) {}
}

export class ProdSpielArtDTOListModel {
  constructor(public actioncode?: Actioncode, public bezeichnung?: string, public id?: number, public prodSpielsId?: number) {}
}

export class ProdSpielLichtpultDTOListModel {
  constructor(public actioncode?: Actioncode, public bezeichnung?: string, public id?: number, public prodSpielsId?: number) {}
}

export class ProdSpielScheinDTOListModel {
  constructor(
    public actioncode?: Actioncode,
    public art?: string,
    public id?: number,
    public ort?: string,
    public prodSpielsId?: number,
    public starke?: number
  ) {}
}

export class ProdSpielTonregieraumDTOListModel {
  constructor(public actioncode?: Actioncode, public bezeichnung?: string, public id?: number, public prodSpielsId?: number) {}
}
