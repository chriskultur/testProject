export class AngeProdStatus {
  constructor(
    public angeProdId: number,
    public freigabeAm: any,
    public freigabeVonBenutzer: string,
    public id: number,
    public status: string,
    public vorschlagAm: any,
    public vorschlagSerial: string,
    public vorschlagVonBenutzer: string
  ) {}
}
