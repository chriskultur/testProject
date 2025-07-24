export class ProductGroupListModel {
  constructor(
    public betriebs_id?: number,
    public bezeichnung?: string,
    public systemgruppe?: boolean,
    public bemerkung?: boolean,
    public reihenfolge?: number,
    public gruppe_id?: number,
    public betriebId?: number,
    public anzahl?: number,
    public id?: number
  ) {}
}
