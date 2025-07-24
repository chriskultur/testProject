export const enum Aktiv {
  'Y',
  'N'
}

export class Status {
  constructor(
    public bild?: any,
    public bildContentType?: string,
    public name?: string,
    public email?: string,
    public aktBetrieb?: string,
    public aktiv?: Aktiv,
    public voll?: boolean,
    public nachricht?: number,
    public neuigkeiten?: number,
    public aufgaben?: number
  ) {}
}
