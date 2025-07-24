export class ProductGropuItemModel {
  constructor(
    public produktion_type?: number,
    public produkt_id?: number,
    public produkt_name?: string,
    public status?: string,
    public status_id?: number,
    public recht_add?: string,
    public recht_edit?: string,
    public recht_delete?: string,
    public recht_publish?: string,
    public angebot_id?: number,
    public anzahl_produktionen?: string,
    public angebotsbezeichnung?: string,
    public media_id?: number,
    public suche_vertrieb?: boolean,
    public spielstatte_zu_vermieten?: boolean,
    public produktgruppe_bezeichnung?: [],
    public produktgruppe_id?: [],
    public pge_reihenfolge?: number,
    public prod_extern?: boolean
  ) {}
}

export class ProductGropuItemModelWithMedia {
  constructor(
    public produktion_type?: number,
    public produkt_id?: number,
    public produkt_name?: string,
    public status?: string,
    public status_id?: number,
    public recht_add?: string,
    public recht_edit?: string,
    public recht_delete?: string,
    public recht_publish?: string,
    public angebot_id?: number,
    public anzahl_produktionen?: string,
    public angebotsbezeichnung?: string,
    public media?: string,
    public mediaContentType?: string,
    public suche_vertrieb?: boolean,
    public spielstatte_zu_vermieten?: boolean,
    public produktgruppe_bezeichnung?: [],
    public produktgruppe_id?: [],
    public zeitraum_list?: [],
    public angebot_betriebsname?: string,
    public angebot_betriebs_id?: number,
    public prod_extern?: boolean
  ) {}
}
