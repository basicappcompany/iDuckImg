import type { ShortcutText } from './types';

export const de: ShortcutText = {
  chrome: {
    howToUse: `So wird es benutzt`,
    related: `Verwandt`,
    quickTools: `Schnellwerkzeuge`,
    community: `Community`,
    alsoFrom: `Auch von iDuck`,
    iduckpdf: `iDuckPDF: PDF-Werkzeuge`,
    communityPages: {
      roadmap: `Fahrplan`,
      request: `Funktion vorschlagen`,
      feedback: `Feedback senden`,
      support: `iDuckIMG unterstützen`,
      settings: `Einstellungen`,
      about: `Über uns`,
    },
    groups: {
      compress: `Komprimieren und Größe ändern`,
      convert: `Format umwandeln`,
      other: `Weitere Formate öffnen`,
      pdf: `PDF erstellen`,
      forms: `Fotos für Formulare`,
      edit: `Schnelle Bearbeitung`,
    },
  },
  kb: {
    name: `Bild auf {kb} KB komprimieren`,
    title: `Bild auf {kb} KB komprimieren, kostenlos online`,
    description: `Verkleinern Sie ein JPG-, PNG- oder WebP-Foto auf {kb} KB oder weniger, kostenlos im Browser. Ohne Upload, ohne Anmeldung, ohne Wasserzeichen.`,
    summary: `Verkleinern Sie ein Foto auf {kb} KB oder weniger, direkt im Browser.`,
    quick: `Um ein Bild auf {kb} KB zu komprimieren, legen Sie es ab und klicken Sie auf „{run}“: Das Ziel steht schon auf {kb} KB, und das Werkzeug findet die höchste Qualität, die passt. Es läuft auf Ihrem Gerät, das Bild wird also nie hochgeladen.`,
    steps: [
      `Legen Sie Ihr JPG-, PNG- oder WebP-Bild ab oder fügen Sie es aus der Zwischenablage ein.`,
      `Die Zielgröße steht schon auf {kb} KB, die Pixelgröße bleibt unverändert.`,
      `Klicken Sie auf „{run}“. Das Werkzeug probiert verschiedene Qualitätsstufen aus und behält die beste, die passt.`,
      `Prüfen Sie die Ergebnisgröße in der Liste und laden Sie die Datei herunter.`,
    ],
    faqs: [
      {
        q: `Wie bekomme ich ein Foto unter {kb} KB, ohne dass es schlecht aussieht?`,
        a: `Lassen Sie die Pixelgröße zunächst unverändert. Das Werkzeug senkt die JPG- oder WebP-Qualität Schritt für Schritt, bis die Datei {kb} KB oder kleiner ist. Nur wenn das nicht reicht, müssen Sie auch die Breite verringern.`,
      },
      {
        q: `Wird mein Bild irgendwohin hochgeladen?`,
        a: `Nein. Die Komprimierung läuft im Tab Ihres Browsers. Die Datei wird nicht an unsere Server gesendet, deshalb eignet sie sich auch für private Fotos und Dokumente.`,
      },
      {
        q: `Das Ergebnis ist größer als {kb} KB. Was nun?`,
        a: `Das Bild hat zu viele Pixel für {kb} KB bei akzeptabler Qualität. Öffnen Sie das Werkzeug zum Ändern der Größe, wählen Sie eine kleinere Breite (zum Beispiel 800 Pixel), lassen Sie das Ziel bei {kb} KB und starten Sie erneut.`,
      },
    ],
  },
  convert: {
    name: `{from} in {to}`,
    h1: `{from} in {to} umwandeln`,
    title: `{from} in {to}: kostenloser Online-Konverter`,
    description: `Wandeln Sie {from} kostenlos im Browser in {to} um. Ohne Upload, ohne Anmeldung, ohne Wasserzeichen. Funktioniert auf Handy und Computer.`,
    summary: `Verwandeln Sie {from}-Dateien in wenigen Sekunden in {to}.`,
    quick: `Um {from} in {to} umzuwandeln, legen Sie Ihre {from}-Dateien ab, prüfen Sie, dass als Format {to} steht, und klicken Sie auf „{run}“. {why} Alles passiert in Ihrem Browser, es wird nichts hochgeladen.`,
    steps: [
      `Legen Sie Ihre {from}-Dateien ab oder tippen Sie auf den Bereich, um sie auszuwählen. Sie können viele auf einmal hinzufügen.`,
      `Das Ausgabeformat steht schon auf {to}.`,
      `Klicken Sie auf „{run}“.`,
      `Laden Sie jede Datei einzeln oder alle zusammen als ZIP herunter.`,
    ],
    faqs: [
      {
        q: `Ist es sicher, hier private Bilder umzuwandeln?`,
        a: `Die Umwandlung läuft in Ihrem Browser, die Bilder werden also nicht auf unsere Server hochgeladen.`,
      },
      {
        q: `Kann ich viele Dateien auf einmal umwandeln?`,
        a: `Ja. Fügen Sie so viele hinzu, wie Ihr Gerät verkraftet, und laden Sie sie zusammen als ZIP herunter.`,
      },
    ],
  },
  why: {
    'heic-to-jpg': `HEIC ist das Standardformat von iPhones, und JPG lässt sich auf jedem Gerät und jeder Website öffnen.`,
    'heic-to-png': `PNG behält jedes Pixel genau bei und lässt sich überall öffnen.`,
    'png-to-jpg': `JPG-Dateien sind bei Fotos meist deutlich kleiner als PNG.`,
    'jpg-to-png': `PNG ist verlustfrei und damit ein sicheres Format zum Bearbeiten und erneuten Speichern.`,
    'webp-to-jpg': `JPG öffnet sich in jedem Programm, während manche Editoren und Formulare WebP noch ablehnen.`,
    'webp-to-png': `PNG behält die Transparenz und öffnet sich in jedem Editor.`,
    'jpg-to-webp': `WebP ist bei ähnlicher Qualität meist 25 bis 35 Prozent kleiner als JPG, wodurch Seiten schneller laden.`,
    'png-to-webp': `WebP ist deutlich kleiner als PNG und kann die Transparenz behalten.`,
    'jpg-to-pdf': `Jedes Bild wird zu einer PDF-Seite, die so groß ist wie das Bild.`,
    'png-to-pdf': `Jedes Bild wird zu einer PDF-Seite.`,
    'avif-to-jpg': `JPG öffnet sich überall, auch in Formularen, Editoren und älteren Handys, die AVIF nicht anzeigen können.`,
    'avif-to-png': `PNG öffnet sich in jedem Editor und behält jeden transparenten Hintergrund.`,
    'svg-to-png': `PNG ist ein normales Bild, das jedes Programm, Formular und soziale Netzwerk akzeptiert, und es behält den transparenten Hintergrund.`,
    'svg-to-jpg': `JPG ist ein kleines, universelles Fotoformat, und die SVG wird vor dem Speichern scharf gezeichnet.`,
    'bmp-to-jpg': `Eine BMP wird unkomprimiert gespeichert, daher ist das JPG meist nur ein Bruchteil so groß.`,
    'gif-to-png': `Sie erhalten ein scharfes Standbild des GIFs, das jeden transparenten Hintergrund behält.`,
  },
  exam: {
    name: `{short}: {what} – Größe`,
    title: `{short}: Größe für {what} in px und KB`,
    description: `Ändern Sie Ihr {what} auf {req} für {short}. Nach der offiziellen Bekanntmachung. Kostenlos, im Browser, ohne Upload.`,
    summary: `Bringen Sie Ihr {what} für {short} auf {size}.`,
    quick: `Um Ihr {what} für {short} anzupassen, legen Sie es ab und klicken Sie auf „{run}“: Das Werkzeug ist schon auf {req} eingestellt, wie in der offiziellen Bekanntmachung. Es läuft in Ihrem Browser, das Bild wird also nie hochgeladen.`,
    steps: [
      `Legen Sie Ihr {what} ab oder tippen Sie auf den Bereich, um es auszuwählen. HEIC-Fotos vom iPhone funktionieren auch.`,
      `{exam} und {doc} sind schon gewählt, die Größe steht daher auf {req}.`,
      `Klicken Sie auf „{run}“.`,
      `Prüfen Sie die Größe in der Liste, laden Sie das JPG herunter und laden Sie es im Formular hoch.`,
    ],
    faqs: [
      {
        q: `Welche Größe muss das {what} für {short} haben?`,
        a: `{exam} verlangt {req}. Das stammt aus {source} ({location}).`,
      },
      {
        q: `Wie erreicht die Datei die richtige Größe?`,
        a: `Sie wird auf die Größe angepasst und als JPG in der besten Qualität gespeichert, die unter dem Maximum bleibt. Alles passiert in Ihrem Browser, das Bild wird nie hochgeladen.`,
      },
      {
        q: `Sind diese Zahlen noch aktuell?`,
        a: `Sie wurden am {date} aus dem offiziellen Dokument gelesen, für {cycle}. Prüfen Sie Ihre eigene Bekanntmachung, denn Prüfungen ändern ihre Regeln zwischen den Runden.`,
      },
    ],
  },
  docs: { photo: `Foto`, signature: `Unterschrift`, 'left-thumb': `Abdruck des linken Daumens`, declaration: `Erklärung` },
};
