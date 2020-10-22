import Megoldas from "../Megoldas";

test("feladat4", () => {
    const megold = new Megoldas();
    expect(megold.fejGyakorisag).toBe(51.03);
});

test("feladat5", () => {
    const megold = new Megoldas();
    expect(megold.egymasUtaniKetFej).toBe(259);
});

test("feladat6", () => {
    const megold = new Megoldas();
    expect(megold.fejSorozat[0]).toBe(11);
    expect(megold.fejSorozat[1]).toBe(947);
});
