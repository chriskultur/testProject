import {Adressart} from "app/shared/enum/enum.model";

export class Adresse {
    constructor(
        public adrbezeichnung?: string,
        public adressart?: Adressart,
        public betriebsId?: number,
        public freiCode?: number,
        public geoLat?: number,
        public geoLon?: number,
        public id?: number,
        public listeLandGliedsId?: number,
        public listeLandsId?: number,
        public postadreZus?: string,
        public postaltBetBez?: string,
        public postansprech?: string,
        public postfach?: string,
        public postplz?: string,
        public poststadt?: string,
        public poststrasse?:string
    ) {
    }
}
