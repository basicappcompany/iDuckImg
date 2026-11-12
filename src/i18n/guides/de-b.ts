import type { GuideText } from './types';

/** German text for guides 9 to 17 (see src/lib/guides-b.ts). */
export const deGuidesB: Record<string, GuideText> = {
  'how-to-rotate-or-flip-an-image': {
    title: `Ein Bild drehen oder spiegeln`,
    seoTitle: `Bild online drehen oder spiegeln (kostenlos, ohne Upload)`,
    description: `Drehen Sie ein Bild um 90, 180 oder 270 Grad oder spiegeln Sie es horizontal oder vertikal. Funktioniert mit JPG, PNG und WebP, im Browser.`,
    intro: `Um ein Bild zu drehen, ziehen Sie es in das Werkzeug „Drehen und spiegeln“, klicken so oft auf „Nach links drehen“ oder „Nach rechts drehen“, bis die Vorschau stimmt, und dann auf „Anwenden“. Mit den Spiegel-Schaltflächen drehen Sie ein Bild horizontal oder vertikal um.`,
    steps: [
      `Öffnen Sie das Werkzeug „Drehen und spiegeln“ und legen Sie Ihre JPG-, PNG- oder WebP-Dateien ab.`,
      `Drehen Sie mit den Schaltflächen nach links oder rechts oder spiegeln Sie das Bild. Die Vorschau zeigt das Ergebnis.`,
      `Klicken Sie auf „Anwenden“.`,
      `Laden Sie jede Datei einzeln herunter oder alle als ZIP.`,
    ],
    sections: [
      {
        h: `Drehen oder spiegeln: was ist was?`,
        p: [
          `Beim Drehen wird das ganze Bild um 90, 180 oder 270 Grad gedreht. Das behebt ein Foto, das quer oder auf dem Kopf herauskam. Beim Spiegeln wird es gespiegelt, so korrigieren Sie Text, der bei einer Selfie-Kamera seitenverkehrt erscheint.`,
          `Sie können beides kombinieren. Drehen Sie zuerst, spiegeln Sie dann und beobachten Sie die Vorschau, bis alles stimmt.`,
        ],
      },
      {
        h: `Viele Bilder auf einmal`,
        p: [
          `Dieselbe Änderung wird auf jedes hinzugefügte Bild angewendet, sodass sich ein ganzer Stapel quer liegender Fotos in einem Zug korrigieren lässt. PNG bleibt verlustfrei. JPG und WebP werden in hoher Qualität neu gespeichert.`,
          `Prüfen Sie zuerst die Vorschau: Sie zeigt nur das erste Bild, ein Stapel sollte also aus Bildern bestehen, die dieselbe Drehung brauchen.`,
        ],
      },
      {
        h: `Tipps`,
        p: [
          `Liegen nur einige Ihrer Fotos quer, drehen Sie diese in einem Durchgang und die übrigen in einem anderen. Ein Stapel bekommt genau eine Änderung, gemischte Bilder brauchen also getrennte Durchläufe.`,
          `Bewahren Sie Ihre Originaldateien auf. Das Drehen um 90 Grad lässt sich rückgängig machen, aber ein erneutes Speichern eines JPG verändert es immer ganz leicht, deshalb sollten Sie es nicht oft wiederholen.`,
        ],
      },
    ],
    faq: [
      { q: `Wie drehe ich ein Foto, das quer liegt?`, a: `Legen Sie es ab, klicken Sie auf „Nach links drehen“ oder „Nach rechts drehen“, bis es aufrecht steht, klicken Sie dann auf „Anwenden“ und laden Sie es herunter.` },
      { q: `Was ist der Unterschied zwischen Drehen und Spiegeln?`, a: `Drehen wendet das Bild um. Spiegeln kehrt es um, als würden Sie es in einem Spiegel betrachten.` },
      { q: `Verringert das Drehen die Qualität?`, a: `PNG bleibt verlustfrei. JPG und WebP werden in hoher Qualität neu gespeichert, eine Änderung ist also sehr klein.` },
    ],
  },

  'how-to-remove-location-and-exif-data-from-a-photo': {
    title: `Standort und EXIF-Daten aus einem Foto entfernen`,
    seoTitle: `EXIF- und GPS-Standortdaten aus einem Foto entfernen`,
    description: `Entfernen Sie versteckten Standort, Datum und Kameradetails aus einem Foto, bevor Sie es teilen. Im Browser, und das Bild wird nicht neu komprimiert.`,
    intro: `Um EXIF-Daten aus einem Foto zu entfernen, ziehen Sie es in das Werkzeug „EXIF-Daten entfernen“ und klicken auf „Metadaten entfernen“. Der versteckte GPS-Standort, das Datum und die Kameradetails werden entfernt, und das Bild selbst wird nicht neu komprimiert.`,
    steps: [
      `Öffnen Sie das Werkzeug „EXIF-Daten entfernen“ und legen Sie Ihre JPG-, PNG- oder WebP-Fotos ab.`,
      `Klicken Sie auf „Metadaten entfernen“.`,
      `Laden Sie jede bereinigte Datei einzeln herunter oder alle als ZIP.`,
      `Optional prüfen Sie das Ergebnis: Klicken Sie unter Windows mit der rechten Maustaste auf die Datei, wählen Sie „Eigenschaften“ und öffnen Sie die Registerkarte „Details“.`,
    ],
    sections: [
      {
        h: `Was in einem Foto versteckt ist`,
        p: [
          `Smartphones und Kameras schreiben zusätzliche Angaben in die Datei: den genauen Ort der Aufnahme, Datum und Uhrzeit und das Gerätemodell. Jeder, der die Originaldatei bekommt, kann sie lesen, selbst wenn das Bild selbst nichts Privates zeigt.`,
          `Viele soziale Netzwerke entfernen einen Teil davon selbst, aber nicht alle, und ein Foto, das per E-Mail oder Chat gesendet wird, kommt meist unverändert an. Es vorher zu bereinigen ist die sichere Gewohnheit.`,
        ],
      },
      {
        h: `Was dies nicht verbirgt`,
        p: [
          `Das Entfernen der Metadaten ändert nichts an dem, was im Bild zu sehen ist. Ein Straßenschild, eine Hausnummer oder ein Gesicht bleibt sichtbar. Um einen Teil des Bildes selbst zu verbergen, nutzen Sie das Werkzeug „Bildbereiche verwischen oder verdecken“.`,
          `Weil JPG-Daten nicht neu komprimiert werden, sieht das Bild genau aus wie vorher, und die Datei ist nur geringfügig kleiner.`,
        ],
      },
      {
        h: `Tipps`,
        p: [
          `Bereinigen Sie Fotos, bevor Sie sie senden, nicht danach. Ein Bild, das Sie schon gepostet oder gemailt haben, lässt sich nicht zurückholen, aber das nächste können Sie sauber senden.`,
          `Screenshots tragen meist keinen Standort, sie sind also eine sichere Art, ein Bild eines Bildschirms zu teilen. Fotos von der Smartphone-Kamera sind die, die eine Bereinigung lohnen, besonders Bilder, die zu Hause entstanden sind.`,
        ],
      },
    ],
    faq: [
      { q: `Was sind EXIF-Daten?`, a: `Es sind Informationen, die in einer Fotodatei gespeichert sind: wo sie aufgenommen wurde, wann und mit welchem Gerät und welchen Einstellungen.` },
      { q: `Verändert das Entfernen von EXIF das Bild?`, a: `Nein. Das Bild wird nicht neu komprimiert, es sieht also genau gleich aus.` },
      { q: `Wird mein Foto hochgeladen?`, a: `Nein. Die Daten werden in Ihrem Browser entfernt, und die Datei verlässt nie Ihr Gerät.` },
    ],
  },

  'how-to-make-a-round-profile-picture': {
    title: `Ein rundes Profilbild erstellen`,
    seoTitle: `Rundes Profilbild erstellen (Kreis zuschneiden, kostenlos)`,
    description: `Schneiden Sie ein Foto kreisförmig zu oder runden Sie nur die Ecken ab und speichern Sie es als PNG mit durchsichtigen Ecken. Kostenlos, im Browser.`,
    intro: `Um ein rundes Profilbild zu erstellen, ziehen Sie ein Foto in das Werkzeug „Kreisförmig zuschneiden und Ecken abrunden“, wählen "Circle" und klicken auf "Make it round". Sie erhalten ein PNG mit durchsichtigen Ecken, das das mittlere Quadrat Ihres Fotos behält.`,
    steps: [
      `Öffnen Sie das Werkzeug „Kreisförmig zuschneiden und Ecken abrunden“ und legen Sie Ihr Bild ab.`,
      `Wählen Sie "Circle" oder "Rounded corners", wenn Sie nur weiche Kanten möchten.`,
      `Klicken Sie auf "Make it round".`,
      `Laden Sie das PNG herunter.`,
    ],
    sections: [
      {
        h: `Warum das Ergebnis ein PNG ist`,
        p: [
          `Ein rundes Bild braucht durchsichtige Ecken, und JPG kann nicht durchsichtig sein. PNG kann es, daher ist das Ergebnis immer ein PNG. Legen Sie es auf einen farbigen Hintergrund, und es behält seine runde Form.`,
          `Die meisten Felder für Profilbilder schneiden Ihr Bild selbst kreisförmig zu. Dieses Werkzeug ist nützlich, wenn Sie das runde Bild als eigene Datei brauchen.`,
        ],
      },
      {
        h: `Das Gesicht richtig einrahmen`,
        p: [
          `Ein Kreis behält das mittlere Quadrat des Fotos. Sitzt das Gesicht an der Seite, schneiden Sie das Bild zuerst so zu, dass das Gesicht in der Mitte liegt, und machen Sie es dann rund.`,
          `Das Werkzeug „Bilder zuschneiden“ mit der Form 1:1 erledigt das in einem Schritt.`,
        ],
      },
      {
        h: `Tipps`,
        p: [
          `Beginnen Sie mit einem Bild, das mindestens einige hundert Pixel breit ist. Ein rundes Bild wird oft klein angezeigt, aber scharfe Kanten brauchen genug Pixel zum Start.`,
          `Lassen Sie etwas Platz um das Gesicht. Ein Kreis schneidet die Ecken ab, ein knapper Zuschnitt auf den Kopf kann daher Haare oder Kinn anschneiden.`,
        ],
      },
    ],
    faq: [
      { q: `Kann ich ein kreisförmiges Bild mit transparentem Hintergrund erstellen?`, a: `Ja. Die Ecken außerhalb des Kreises sind im heruntergeladenen PNG durchsichtig.` },
      { q: `Was, wenn mein Foto nicht quadratisch ist?`, a: `Der Kreis nutzt das mittlere Quadrat des Bildes. Schneiden Sie zuerst zu, wenn Sie einen anderen Teil möchten.` },
      { q: `Wird mein Bild hochgeladen?`, a: `Nein. Es wird in Ihrem Browser verarbeitet und bleibt auf Ihrem Gerät.` },
    ],
  },

  'how-to-split-an-image-into-a-grid': {
    title: `Ein Bild in ein Raster aus Kacheln teilen`,
    seoTitle: `Bild in ein Raster teilen (Instagram, Puzzle)`,
    description: `Schneiden Sie ein Bild in gleich große Zeilen und Spalten für einen Raster-Beitrag oder ein Puzzle, bis zu 10 mal 10, und laden Sie die Kacheln als ZIP herunter.`,
    intro: `Um ein Bild in ein Raster zu teilen, ziehen Sie es in das Werkzeug „Bild in ein Raster teilen“, wählen die gewünschte Anzahl an Zeilen und Spalten und klicken auf die Schaltfläche. Jede Kachel wird als eigenes Bild gespeichert, und Sie können alle in einer ZIP-Datei herunterladen.`,
    steps: [
      `Öffnen Sie das Werkzeug „Bild in ein Raster teilen“ und legen Sie Ihr Bild ab.`,
      `Wählen Sie die Anzahl der Zeilen und Spalten, bis zu 10 mal 10.`,
      `Klicken Sie auf die Schaltfläche "Split".`,
      `Laden Sie die Kacheln herunter, oder alle in einer ZIP-Datei.`,
    ],
    sections: [
      {
        h: `Raster-Beiträge und Puzzles`,
        p: [
          `Für ein Raster in sozialen Netzwerken posten Sie die Kacheln in der richtigen Reihenfolge, damit sie im Profil zusammenpassen. Eine Teilung 3 mal 1 ergibt ein breites Panorama in drei Beiträgen, 3 mal 3 ergibt neun Quadrate.`,
          `Die Kacheln werden nach Zeile und Spalte benannt, zum Beispiel photo-r1-c2.jpg, sodass Sie erkennen, welches Stück wohin gehört.`,
        ],
      },
      {
        h: `Keine Pixel gehen verloren`,
        p: [
          `Jedes Pixel des Bildes landet in genau einer Kachel, die Teile passen also wieder zusammen, ohne dass etwas fehlt oder doppelt vorkommt. Geht die Größe nicht glatt auf, unterscheiden sich die Kacheln um höchstens ein Pixel.`,
          `Die Kacheln behalten das Bildformat. Bringen Sie das Bild zuerst in die gewünschte Form, denn ein hohes Bild ergibt hohe Kacheln.`,
        ],
      },
      {
        h: `Tipps`,
        p: [
          `Schneiden Sie das Bild zuerst in die richtige Form zu. Ein Raster 3 mal 3 sieht aus einem quadratischen Bild am besten aus, ein Panorama 3 mal 1 aus einem breiten Bild, dessen Breite dreimal so groß ist wie die Höhe.`,
          `Laden Sie die Kacheln in umgekehrter Reihenfolge hoch, wenn die Website den neuesten Beitrag zuerst zeigt, damit sie im Profil richtig zusammenpassen. Prüfen Sie das Layout auf Ihrem Smartphone, bevor Sie es teilen.`,
        ],
      },
    ],
    faq: [
      { q: `Wie teile ich ein Foto für ein Instagram-Raster?`, a: `Wählen Sie die Zeilen und Spalten, die zu Ihrem Raster passen, zum Beispiel 3 mal 3, und posten Sie die Kacheln dann der Reihe nach.` },
      { q: `Wie viele Kacheln kann ich erstellen?`, a: `Bis zu 10 Zeilen und 10 Spalten.` },
      { q: `Wie werden die Kacheln benannt?`, a: `Nach Zeile und Spalte, etwa name-r1-c1.jpg, sodass Sie sie wieder in Reihenfolge bringen können.` },
    ],
  },

  'how-to-add-text-to-a-picture': {
    title: `Text zu einem Bild hinzufügen`,
    seoTitle: `Text zu einem Bild oder Foto hinzufügen (kostenlos, online)`,
    description: `Schreiben Sie eine Bildunterschrift oder einen Titel auf ein Bild. Position, Größe und Farbe wählen, optional mit einer Fläche hinter dem Text. Im Browser.`,
    intro: `Um Text zu einem Bild hinzuzufügen, ziehen Sie es in das Werkzeug „Text zu einem Bild hinzufügen“, geben bis zu fünf Zeilen ein, wählen die Position, stellen Größe und Farbe ein und klicken auf „Text hinzufügen“. Eine dunkle oder helle Fläche hinter dem Text hält ihn auf einem unruhigen Foto lesbar.`,
    steps: [
      `Öffnen Sie das Werkzeug „Text zu einem Bild hinzufügen“ und legen Sie Ihr Bild ab.`,
      `Geben Sie Ihren Text ein, bis zu fünf Zeilen.`,
      `Wählen Sie eine von neun Positionen, die Größe und die Farbe. Fügen Sie eine dunkle oder helle Fläche hinzu, wenn der Hintergrund unruhig ist.`,
      `Klicken Sie auf „Text hinzufügen“ und laden Sie das Ergebnis herunter.`,
    ],
    sections: [
      {
        h: `Text gut lesbar machen`,
        p: [
          `Text auf einem Foto ist schwer zu lesen, wenn der Hintergrund helle und dunkle Bereiche hat. Die optionale Fläche legt ein einfarbiges Band hinter die Wörter, was das behebt, ohne das Bild zu verändern.`,
          `Die Größe ist ein Anteil der Bildbreite, daher sieht eine Bildunterschrift auf einem kleinen und einem großen Bild gleich aus.`,
        ],
      },
      {
        h: `Grenzen, die Sie kennen sollten`,
        p: [
          `Sie können bis zu fünf Zeilen mit je bis zu 60 Zeichen hinzufügen. Für längeren Text machen Sie das Bild größer oder verwenden mehrere Bilder.`,
          `Die Vorschau zeigt das erste Bild, und derselbe Text kommt auf jedes hinzugefügte Bild.`,
        ],
      },
      {
        h: `Tipps`,
        p: [
          `Fassen Sie sich kurz. Große, kurze Schrift ist auf dem Smartphone lesbar, und die Größe skaliert mit dem Bild, ein kurzer Titel wirkt also meist besser als eine lange Bildunterschrift.`,
          `Wählen Sie die Farbe, die sich am stärksten vom Bereich hinter dem Text abhebt, oder schalten Sie die Fläche ein. Prüfen Sie die Vorschau in kleiner Größe, denn so werden es die meisten Leute sehen.`,
        ],
      },
    ],
    faq: [
      { q: `Wie viele Zeilen kann ich hinzufügen?`, a: `Bis zu fünf Zeilen mit je bis zu 60 Zeichen.` },
      { q: `Kann ich Text auf viele Bilder setzen?`, a: `Ja. Derselbe Text kommt auf jedes Bild, und Sie können alle zusammen herunterladen.` },
      { q: `Wird mein Bild hochgeladen?`, a: `Nein. Der Text wird in Ihrem Browser gezeichnet.` },
    ],
  },

  'how-to-turn-a-photo-into-pixel-art': {
    title: `Ein Foto in Pixel Art verwandeln`,
    seoTitle: `Foto in Pixel Art verwandeln (kostenlos, im Browser)`,
    description: `Machen Sie aus jedem Foto grobe Pixel Art. Wählen Sie, wie groß die Pixel sind und wie viele Farben bleiben. Als PNG gespeichert, ohne Upload.`,
    intro: `Um ein Foto in Pixel Art zu verwandeln, ziehen Sie es in den Pixel-Art-Generator, stellen mit dem Regler ein, wie viele große Pixel in der Breite entstehen, und klicken auf "Make pixel art". Weniger Pixel in der Breite ergeben gröbere Kunst, und das Ergebnis ist ein PNG.`,
    steps: [
      `Öffnen Sie den Pixel-Art-Generator und legen Sie Ihre Bilder ab.`,
      `Stellen Sie mit dem Regler ein, wie viele große Pixel in der Breite entstehen. Weniger ist gröber.`,
      `Wählen Sie optional "Retro" oder "Very few colours" für einen Spielkonsolen-Look.`,
      `Klicken Sie auf "Make pixel art" und laden Sie das PNG herunter.`,
    ],
    sections: [
      {
        h: `Die richtige Körnung finden`,
        p: [
          `Gesichter funktionieren am besten mit etwa 32 bis 64 Pixeln in der Breite. Landschaften sehen mit mehr gut aus. Jedes große Pixel ist die Durchschnittsfarbe eines quadratischen Blocks des Fotos.`,
          `Die Vorschau nutzt denselben Code wie die gespeicherte Datei, Sie sehen also genau das, was Sie bekommen.`,
        ],
      },
      {
        h: `Die Farben begrenzen`,
        p: [
          `"Retro" behält sechs Abstufungen jeder Farbe und "Very few colours" drei, was einen flachen, spielähnlichen Look ergibt. Behalten Sie die Originalfarben, wenn die Pixel noch wie das Foto aussehen sollen.`,
          `Das Ergebnis ist ein PNG in derselben Größe wie Ihr Bild, weil JPG die harten Kanten jedes großen Pixels verwischen würde.`,
        ],
      },
      {
        h: `Tipps`,
        p: [
          `Beginnen Sie mit einem einfachen Foto mit hohem Kontrast. Ein Gesicht vor einfarbigem Hintergrund übersteht grobe Pixel viel besser als eine belebte Straßenszene.`,
          `Probieren Sie ein paar Einstellungen aus und vergleichen Sie. Der Wechsel von 48 auf 32 Pixel in der Breite verändert die Wirkung stark, und "Retro"-Farben können ein normales Foto wie einen Spielbildschirm aussehen lassen.`,
        ],
      },
    ],
    faq: [
      { q: `Warum ist das Ergebnis ein PNG?`, a: `Ein PNG bewahrt die scharfen Kanten jedes großen Pixels. Ein JPG würde sie verwischen.` },
      { q: `Wie viele Pixel soll ich für ein Gesicht nehmen?`, a: `Etwa 32 bis 64 in der Breite funktionieren meist gut.` },
      { q: `Behält das Bild seine Größe?`, a: `Ja. Das Ergebnis hat dieselbe Größe wie das Original.` },
    ],
  },

  'how-to-merge-images-side-by-side': {
    title: `Bilder nebeneinander oder untereinander zusammenfügen`,
    seoTitle: `Bilder nebeneinander oder untereinander zusammenfügen`,
    description: `Verbinden Sie zwei oder mehr Bilder zu einem, in einer Reihe oder Spalte, mit optionalem Abstand und Hintergrund. Als PNG, JPG oder WebP. Im Browser.`,
    intro: `Um Bilder zusammenzufügen, ziehen Sie zwei oder mehr in das Werkzeug „Bilder nebeneinander zusammenfügen“, bringen sie in Reihenfolge, wählen nebeneinander oder untereinander und klicken auf "Join pictures". Sie werden auf eine gemeinsame Höhe oder Breite skaliert, sodass nichts gestreckt wird.`,
    steps: [
      `Öffnen Sie das Werkzeug „Bilder nebeneinander zusammenfügen“ und legen Sie zwei oder mehr Bilder ab.`,
      `Bringen Sie sie mit "Up" und "Down" in Reihenfolge und entfernen Sie alle, die Sie nicht möchten.`,
      `Wählen Sie nebeneinander oder untereinander, den Abstand dazwischen und den Hintergrund.`,
      `Klicken Sie auf "Join pictures" und laden Sie das Ergebnis als PNG, JPG oder WebP herunter.`,
    ],
    sections: [
      {
        h: `Größen angleichen`,
        p: [
          `Standardmäßig wird jedes Bild auf die kleinste gemeinsame Höhe (bei einer Reihe) oder Breite (bei einer Spalte) skaliert, sodass kein Bild aufgeblasen und unscharf wird. Möchten Sie lieber jedes Bild in seiner eigenen Größe behalten, wählen Sie diese Option, dann werden sie zentriert.`,
          `Ein Abstand und eine Hintergrundfarbe in Weiß, Schwarz oder Transparent runden den Look ab. Wählen Sie Transparent mit PNG oder WebP.`,
        ],
      },
      {
        h: `Größengrenzen`,
        p: [
          `Ein Ergebnis über 100 Megapixel wird mit einer klaren Meldung abgelehnt, weil ein Smartphone es nicht halten könnte. Nehmen Sie in diesem Fall weniger oder kleinere Bilder.`,
          `Vorher-nachher-Fotos funktionieren gut als Reihe aus zwei. Ein hoher Stapel Screenshots funktioniert gut als Spalte.`,
        ],
      },
      {
        h: `Tipps`,
        p: [
          `Schneiden Sie Ihre Bilder zuerst auf ähnliche Formen zu. Bilder mit gleicher Höhe reihen sich sauber nebeneinander, und das Werkzeug muss dann nichts verkleinern.`,
          `Nehmen Sie einen kleinen Abstand und weißen Hintergrund für ein sauberes Vorher-nachher. Nehmen Sie keinen Abstand für ein nahtloses Panorama aus Bildern, die zusammengehören sollten.`,
        ],
      },
    ],
    faq: [
      { q: `Wie setze ich zwei Fotos nebeneinander?`, a: `Legen Sie beide ab, wählen Sie nebeneinander und klicken Sie auf "Join pictures".` },
      { q: `Werden meine Bilder gestreckt?`, a: `Nein. Sie werden auf eine gemeinsame Höhe oder Breite skaliert und behalten ihre Proportionen.` },
      { q: `Kann ich die Reihenfolge ändern?`, a: `Ja. Nutzen Sie "Up" und "Down" bei jedem Bild in der Liste.` },
    ],
  },

  'how-to-blur-or-hide-part-of-an-image': {
    title: `Einen Teil eines Bildes verwischen oder verdecken`,
    seoTitle: `Bildteile verwischen oder verdecken (Namen, Nummern, Gesichter)`,
    description: `Ziehen Sie Rahmen über Namen, Nummern oder Gesichter und verwischen, verpixeln oder verdecken Sie sie. Läuft im Browser, das Original verlässt nie Ihr Gerät.`,
    intro: `Um einen Teil eines Bildes zu verbergen, ziehen Sie es in das Werkzeug „Bildbereiche verwischen oder verdecken“, ziehen einen Rahmen über Namen, Nummer oder Gesicht, wählen "Blur", "Pixelate" oder "Cover" und klicken auf die Schaltfläche. "Cover" ist die sicherste Wahl für alles Sensible.`,
    steps: [
      `Öffnen Sie das Werkzeug „Bildbereiche verwischen oder verdecken“ und legen Sie Ihr Bild ab.`,
      `Ziehen Sie einen Rahmen über jeden Bereich, der verborgen werden soll. Sie können beliebig viele hinzufügen.`,
      `Wählen Sie "Blur", "Pixelate" oder "Cover" mit einer einfarbigen Fläche.`,
      `Klicken Sie auf die Schaltfläche und laden Sie das neue Bild herunter.`,
    ],
    sections: [
      {
        h: `Verwischen, verpixeln oder verdecken?`,
        p: [
          `Eine leichte Unschärfe kann Text teilweise lesbar lassen, und wer es darauf anlegt, kann Ziffern aus einer schwachen Unschärfe oder Verpixelung manchmal wiederherstellen. "Cover" malt einen einfarbigen Block, sodass nichts wiederherzustellen bleibt.`,
          `Nehmen Sie "Cover" für Kartennummern, Kontonummern und alles Private. Nehmen Sie Unschärfe für Gesichter und Hintergründe, bei denen das Aussehen wichtiger ist als die Sicherheit.`,
        ],
      },
      {
        h: `Präzise Rahmen und viele Bilder`,
        p: [
          `Jeder Rahmen hat außerdem Zahlenfelder für seine Position in Prozent, was ohne Maus funktioniert und es Ihnen erlaubt, ihn genau zu justieren. Die Live-Vorschau nutzt denselben Code wie die gespeicherte Datei.`,
          `Legen Sie mehrere Bilder ab, gelten dieselben Rahmen für alle, was sich für Screenshots mit gleichem Layout eignet. Ihre Originaldateien werden nie verändert.`,
        ],
      },
      {
        h: `Tipps`,
        p: [
          `Machen Sie den Rahmen etwas größer als das, was Sie verbergen. Ränder von Buchstaben und Gesichtern ragen heraus, und ein knapper Rahmen kann einen Streifen sichtbar lassen.`,
          `Öffnen Sie nach dem Speichern das neue Bild und zoomen Sie hinein. Können Sie noch etwas lesen oder erkennen, führen Sie es noch einmal mit "Cover" durch. Und denken Sie daran, dass versteckte Standortdaten etwas anderes sind als das Sichtbare, bereinigen Sie also auch diese.`,
        ],
      },
    ],
    faq: [
      { q: `Reicht eine Unschärfe, um eine Kartennummer zu verbergen?`, a: `Nein. Eine leichte Unschärfe kann teilweise lesbar sein. Nutzen Sie "Cover", das einen einfarbigen Block malt.` },
      { q: `Kann ich mehrere Bereiche verbergen?`, a: `Ja. Fügen Sie so viele Rahmen hinzu, wie Sie brauchen.` },
      { q: `Wird mein Bild hochgeladen?`, a: `Nein. Der Effekt wird in Ihrem Browser angewendet, und das Original bleibt auf Ihrem Gerät.` },
    ],
  },

  'how-to-convert-pixels-to-cm-and-inches': {
    title: `Pixel in Zentimeter und Zoll umrechnen`,
    seoTitle: `Pixel in cm, mm und Zoll umrechnen (mit DPI)`,
    description: `Berechnen Sie, wie groß ein Bild auf Papier ist, aus Pixeln und DPI, oder wie viele Pixel A4 braucht. Ein kostenloser Rechner mit gängigen Papierformaten.`,
    intro: `Um Pixel in Zentimeter umzurechnen, teilen Sie die Pixel durch die DPI, um Zoll zu erhalten, und multiplizieren dann mit 2,54. Bei 300 DPI sind 1 cm etwa 118 Pixel, und der Pixel-, cm- und Zoll-Umrechner erledigt die Rechnung für jede Länge und Auflösung.`,
    steps: [
      `Öffnen Sie den Pixel-, cm- und Zoll-Umrechner und geben Sie die Länge ein, die Sie haben.`,
      `Wählen Sie ihre Einheit: Pixel, Zentimeter, Millimeter oder Zoll.`,
      `Wählen Sie die Auflösung in DPI. Nehmen Sie 300 für Fotoabzüge und 72 oder 96 für Bildschirme.`,
      `Lesen Sie dieselbe Länge in jeder Einheit ab sowie die Pixelmaße gängiger Papierformate.`,
    ],
    sections: [
      {
        h: `Warum DPI wichtig ist`,
        p: [
          `Pixel haben für sich genommen keine physische Größe. Dieselben 1200 Pixel sind bei 300 DPI 4 Zoll breit und bei 72 DPI etwa 16,7 Zoll breit. DPI gibt an, wie viele Pixel in einen Zoll passen.`,
          `Für den Druck sind 300 DPI das übliche Ziel bei Fotos. 150 DPI genügen für Entwürfe, und Bildschirme interessiert nur die Pixelzahl.`,
        ],
      },
      {
        h: `Gängige Größen in Pixeln`,
        p: [
          `Bei 300 DPI ist eine A4-Seite 2480 mal 3508 Pixel groß, und ein Fotoabzug von 4 mal 6 Zoll ist 1200 mal 1800 Pixel groß. Die Tabelle auf der Seite zeigt A4, A5, A3, US Letter und Passfotos bei der DPI, die Sie wählen.`,
          `Die DPI-Einstellung einer Datei zu ändern, ändert ihre Pixel nicht. Um die tatsächliche Größe eines Bildes zu ändern, nutzen Sie das Werkzeug „Bildgröße ändern“.`,
        ],
      },
    ],
    faq: [
      { q: `Wie viele Pixel sind 1 cm?`, a: `Bei 300 DPI sind es etwa 118 Pixel, bei 96 DPI etwa 38 Pixel. Die Formel lautet: Pixel = cm geteilt durch 2,54, mal DPI.` },
      { q: `Wie viele Pixel hat eine A4-Seite?`, a: `Bei 300 DPI ist A4 2480 mal 3508 Pixel groß. Bei 150 DPI sind es 1240 mal 1754.` },
      { q: `Verändert das mein Bild?`, a: `Nein. Es ist nur ein Rechner und verwendet keine Datei.` },
    ],
  },
};
