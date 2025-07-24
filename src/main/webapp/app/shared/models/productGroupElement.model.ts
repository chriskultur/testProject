export class ProductGroupElementModel {
  constructor(
    public id?: number,
    public prodGruppeId?: number,
    public prodProdId?: number,
    public prodSpielId?: number,
    public prodWerkId?: number,
    public produkt_extern?: boolean,
    public reihenfolge?: number,
    public part_of_group?: boolean
  ) {}
}
