import Megoldas from "../Megoldas";

describe("Megoldás osztály unit tesztek", () => {
    const instance: Megoldas = new Megoldas();

    it("Megoldás osztálypéldány ellenőrzése", async () => {
        expect(instance).toBeInstanceOf(Megoldas);
    });

    it("3. feladat: Dobások száma", async () => {
        expect(instance.dobasokSzama).toBe(4321);
    });

    it("4. feladat: Fej dobás relatív gyakorisága", async () => {
        expect(instance.fejGyakorisag).toBe(51.03);
    });

    it("5. feladat: Pontosan 2 fej egymás után", async () => {
        expect(instance.egymasUtaniKetFej).toBe(259);
    });

    it("6. feladat: Leghosszabb fejekből álló részsorozat", async () => {
        expect(instance.fejSorozat[0]).toBe(11);
        expect(instance.fejSorozat[1]).toBe(947);
    });
});
