import fs from "fs";

export default class Megoldas {
    private _dobasok: string[] = [];

    public get dobasokSzama(): number {
        return this._dobasok.length;
    }

    public get penzFeldobas(): string {
        const random = +Math.random().toFixed(0);
        let dobas: string;
        if (random == 0) {
            dobas = "I";
        } else {
            dobas = "F";
        }
        return dobas;
    }

    public get fejGyakorisag(): number {
        let cnt: number = 0;
        this._dobasok.forEach(i => {
            if (i == "F") {
                cnt++;
            }
        });
        return +((cnt / this._dobasok.length) * 100).toFixed(2);
    }

    public get egymasUtaniKetFej(): number {
        let egymasUtaniF: number = 0;
        for (let i = 1; i < this._dobasok.length - 3; i++) {
            if (this._dobasok[i] == "F" && this._dobasok[i + 1] == "F" && this._dobasok[i + 2] != "F" && this._dobasok[i - 1] != "F") {
                egymasUtaniF++;
            }
        }
        return egymasUtaniF;
    }

    public get fejSorozat(): number[] {
        let fDarab: number = 0;
        let kezdoIndex: number = 0;
        let legtobbF: number = 0;
        for (let i = 0; i < this._dobasok.length; i++) {
            if (this._dobasok[i] == "F") {
                fDarab++;
                if (legtobbF < fDarab) {
                    legtobbF = fDarab;
                    kezdoIndex = i - fDarab + 2;
                }
            } else {
                fDarab = 0;
            }
        }

        return [legtobbF, kezdoIndex];
    }

    private _ffffDB: number = 0;
    private _fffiDB: number = 0;
    private _t: string[] = [];


    public ezerDobas(): void {

        for (let i = 0; i < 1000; i++) {
            this._t.push(this.penzFeldobas + this.penzFeldobas + this.penzFeldobas + this.penzFeldobas);
        }
        this._t.forEach(x => {
            if (x == "FFFF") {
                this._ffffDB++;
            } else if (x == "FFFI") {
                this._fffiDB++;
            }
        });

    }

    public get ezerDobasKepernyoreIr(): string[] {
        fs.writeFileSync("dobasok.txt", `FFFF: ${this._ffffDB}, FFFI: ${this._fffiDB}\r\n`);
        fs.appendFileSync("dobasok.txt", this._t.join(" "));
        return [this._ffffDB.toString(), this._fffiDB.toString(), this._t.join(" ").replace(/(.{100})/g, "$1\n")]; //kepernyore iras miatt 100 karakterenkent tordelve
    }


    constructor() {
        fs.readFileSync("kiserlet.txt")
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSor: string = i.trim();
                if (aktSor != "") {
                    this._dobasok.push(aktSor);
                }
            });
    }
}
