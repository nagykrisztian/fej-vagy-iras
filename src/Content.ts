import fs from "fs";
import http from "http";
import url from "url";
import Megoldas from "./Megoldas";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Jedlik Ts Template</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->
        const megold = new Megoldas();

        res.write("1. feladat\n");
        res.write(`A pénzfeldobás eredménye: ${megold.penzFeldobas} \n`);

        res.write("2. feladat\n");
        const tipp: string = params.tipp as string;
        res.write(`Tippeljen! (F/I)= <input type='text' value='' name='tipp' value=${tipp} style='max-width:100px;' onChange='this.form.submit();'>\n`);
        if (tipp != null) {
            if (megold.penzFeldobas == tipp.toUpperCase()) {
                res.write("Ön eltalálta!\n");
            } else {
                res.write("Ön nem találta el.\n");
            }
        }

        res.write("3. feladat\n");
        res.write(`A kísérlet ${megold.dobasokSzama} dobásból állt\n`);

        res.write("4. feladat\n");
        res.write(`A kísérlet során a fej relatív gyakorisága ${megold.fejGyakorisag}% volt.\n`);

        res.write("5. feladat\n");
        res.write(`A kísérlet során ${megold.egymasUtaniKetFej} alkalommal dobtak pontosan 2 fejet egymás után.\n`);

        res.write("6. feladat\n");
        res.write(`A leghosszabb tisztafej sorozat ${megold.fejSorozat[0]} tagból áll, kezdete a(z) ${megold.fejSorozat[1]}. dobás.\n`);

        megold.ezerDobas();

        res.write("<a href='https://github.com/nagykrisztian/fej-vagy-iras'>Git</a>&nbsp;&nbsp;&nbsp;");
        res.write("<a href='https://fej-vagy-iras-13a-nk.herokuapp.com/'>Heroku</a>");

        // <---- Fejezd be a kódolást

        res.write("</pre></form>");
        res.write("</body></html>");
        res.end();
    }
}
