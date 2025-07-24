export class AngeSpielStatusModel {
  constructor(
    public angeSpielId?: number,
    public freigabeAm?: any,
    public freigabeVonBenutzer?: string,
    public id?: number,
    public status?: string,
    public vorschlagAm?: any,
    public vorschlagSerial?: string,
    public vorschlagVonBenutzer?: string,
    public secondary_betrieb_id?: number
  ) {}
}
