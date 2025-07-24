export class InterestMailModel {
  constructor(
    public accept_link?: string,
    public beschreibung?: string,
    public betrieb_nach_id?: number,
    public betrieb_von_id?: number,
    public betriebsname?: string,
    public declined_message?: string,
    public htmlMsg?: string,
    public interesse_id?: number,
    public interesse_type?: string,
    public leiter_mitarbeiter?: string,
    public mailPW?: string,
    public mailSubject?: string,
    public mail_type?: string,
    public mailaddr?: string,
    public mitarbeiter_von_id?: number,
    public nachname?: string,
    public name_interesse?: string,
    public original_betriebsname?: string,
    public txtMsg?: string,
    public vorname?: string
  ) {}
}
