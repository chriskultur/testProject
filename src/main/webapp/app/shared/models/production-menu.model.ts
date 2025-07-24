export class ProductionMenuModel {
  constructor(
    public angebot_id?: number,
    public angebotsbezeichnung?: string,
    public anzahl_produktionen?: number,
    public produkt_id?: number,
    public produkt_name?: string,
    public produktion_type?: number,
    public recht_add?: string,
    public recht_delete?: string,
    public recht_edit?: string,
    public recht_publish?: string,
    public status?: string,
    public status_id?: number
  ) {}
}

export class MenuEintragModel {
  constructor(public eintrag?: string, public anzeigen?: string) {}
}

export class AngebotMenuModel {
  constructor(
    public angebot_id?: number,
    public angebotsbezeichnung?: string,
    public anzahl_produktionen?: number,
    public media?: string,
    public mediaContentType?: string,
    public produkt_id?: number,
    public produkt_name?: string,
    public produktion_type?: number,
    public recht_add?: string,
    public recht_delete?: string,
    public recht_edit?: string,
    public recht_publish?: string,
    public spielstatte_zu_vermieten?: boolean,
    public status?: string,
    public status_id?: number,
    public suche_vertrieb?: boolean
  ) {}
}
