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

    public ezerDobas(): void {
        const t: string[] = [];
        let ffffDB: number = 0;
        let fffiDB: number = 0;
        for (let i = 0; i < 1000; i++) {
            t.push(this.penzFeldobas + this.penzFeldobas + this.penzFeldobas + this.penzFeldobas);
        }
        t.forEach(x => {
            if (x == "FFFF") {
                ffffDB++;
            } else if (x == "FFFI") {
                fffiDB++;
            }
        });
        fs.writeFileSync("dobasok.txt", `FFFF: ${ffffDB}, FFFI: ${fffiDB}\r\n`);
        fs.appendFileSync("dobasok.txt", t.join(" "));
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
