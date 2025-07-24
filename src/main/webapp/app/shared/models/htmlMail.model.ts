export class HtmlMail {
    constructor(
        public accept_link?: string,
        public htmlMsg?: string,
        public mailPW?: string,
        public mailSubject?: string,
        public mailaddr?: string,
        public txtMsg?: string,
        public interesse_type?: string,
        public leiter_mitarbeiter?: string,
        public mail_type?: string,
        public nachname?: string,
        public name_interesse?: string,
        public original_betriebsname?: string,
        public vorname?: string,
        public beschreibung?: string,
        public betriebsname?: string,
        public declined_message?: string,
        public produktname?: string,
    ) {}
}
