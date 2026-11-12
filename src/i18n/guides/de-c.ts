import type { GuideText } from './types';

/** German text for guides 18 to 25 (see src/lib/guides-c.ts). */
export const deGuidesC: Record<string, GuideText> = {
  'how-to-calculate-an-aspect-ratio': {
    title: `Ein Seitenverhältnis berechnen`,
    seoTitle: `Seitenverhältnis berechnen (16:9, 4:3, 1:1)`,
    description: `Finden Sie das Seitenverhältnis jeder Breite und Höhe oder berechnen Sie die passende Höhe oder Breite zu einem Verhältnis. Kostenloser Rechner mit gängigen Verhältnissen.`,
    intro: `Um ein Seitenverhältnis zu berechnen, teilen Sie Breite und Höhe durch ihren größten gemeinsamen Teiler. 1920 mal 1080 ist 16:9. Der Seitenverhältnis-Rechner übernimmt das für Sie und findet auch die fehlende Seite, wenn Sie ein Verhältnis halten möchten.`,
    steps: [
      `Öffnen Sie den Seitenverhältnis-Rechner und geben Sie eine Breite und eine Höhe in Pixeln ein. Das einfachste Verhältnis erscheint.`,
      `Um auf ein Verhältnis zu skalieren, wählen Sie eines wie 16:9, 4:3 oder 1:1 oder geben Sie Ihr eigenes ein.`,
      `Geben Sie die neue Breite ein, und die Höhe ergibt sich, oder geben Sie die Höhe ein, und die Breite ergibt sich.`,
      `Verwenden Sie diese Zahlen im Werkzeug „Bildgröße ändern“ oder „Bilder zuschneiden“.`,
    ],
    sections: [
      {
        h: `Gängige Verhältnisse und wo sie verwendet werden`,
        p: [
          `Das Quadrat 1:1 wird für Profilbilder verwendet. 16:9 ist Video und die meisten Bildschirme, 4:3 sind ältere Bildschirme und viele Kameras, und 3:2 sind Spiegelreflexkameras und Abzüge von 4 mal 6 Zoll. 9:16 sind Stories und Kurzvideos, und 4:5 sind Instagram-Hochformat-Beiträge.`,
          `Der Rechner listet sie mit ihrem Verwendungszweck auf, sodass Sie das Verhältnis wählen können, das ein Ort verlangt.`,
        ],
      },
      {
        h: `Wenn eine Größe nur nahe an einem Verhältnis liegt`,
        p: [
          `Manche Größen sind fast, aber nicht genau ein gängiges Verhältnis. 1366 mal 768 ist 683:384, was um den Bruchteil eines Prozents von 16:9 abweicht. Der Rechner zeigt beides, sodass Sie wissen, dass es nah dran ist und nicht exakt.`,
          `Höhen und Breiten werden beim Skalieren auf ein Verhältnis auf ein ganzes Pixel gerundet.`,
        ],
      },
    ],
    faq: [
      { q: `Welches Seitenverhältnis hat 1920 x 1080?`, a: `16:9. Teilen Sie beide Zahlen durch 120, ihren größten gemeinsamen Teiler, und Sie erhalten 16 und 9.` },
      { q: `Wie behalte ich das Verhältnis beim Skalieren bei?`, a: `Wählen Sie das Verhältnis und geben Sie die neue Breite ein. Die Höhe wird berechnet als Breite mal Verhältnishöhe geteilt durch Verhältnisbreite.` },
      { q: `Verändert das mein Bild?`, a: `Nein. Es ist ein Rechner und verwendet keine Datei.` },
    ],
  },

  'how-to-adjust-the-colours-of-a-photo': {
    title: `Helligkeit, Kontrast und Farben anpassen oder ein Foto schwarzweiß machen`,
    seoTitle: `Foto schwarzweiß machen oder Helligkeit anpassen`,
    description: `Ändern Sie Helligkeit, Kontrast und Farbstärke oder wenden Sie Schwarzweiß, Sepia oder Negativ an. Live-Vorschau, im Browser, ohne Upload.`,
    intro: `Um ein Foto schwarzweiß zu machen, ziehen Sie es in das Werkzeug „Farben und Filter anpassen“, wählen den Filter "Black and white" und klicken auf "Apply". Dasselbe Werkzeug ändert Helligkeit, Kontrast und Farbstärke, mit Live-Vorschau.`,
    steps: [
      `Öffnen Sie das Werkzeug „Farben und Filter anpassen“ und legen Sie Ihre Bilder ab.`,
      `Bewegen Sie die Regler "Brightness", "Contrast" und "Colour strength" oder wählen Sie einen Filter wie "Black and white".`,
      `Prüfen Sie die Live-Vorschau und nutzen Sie "Reset", wenn Sie von vorn beginnen möchten.`,
      `Klicken Sie auf "Apply" und laden Sie die Dateien herunter, oder alle als ZIP.`,
    ],
    sections: [
      {
        h: `Was jeder Regler bewirkt`,
        p: [
          `"Brightness" macht alles heller oder dunkler. "Contrast" rückt Hell und Dunkel weiter auseinander oder näher zusammen. "Colour strength" dreht die Farben hoch oder bis hin zu Grau herunter, und die Filter ergeben Schwarzweiß, Sepia (ein warmes Braun wie bei alten Fotos) oder ein Negativ.`,
          `Zuerst werden Helligkeit und Kontrast angewendet, dann die Farbstärke, dann der Filter. Bewegen Sie die Regler in kleinen Schritten, denn große Änderungen verflachen Details oder lassen sie ausbrennen.`,
        ],
      },
      {
        h: `Stapel und Dateitypen`,
        p: [
          `Dieselben Änderungen werden auf jedes hinzugefügte Bild angewendet, sodass sich ein ganzer Ordner auf einmal schwarzweiß machen lässt. Die Vorschau zeigt das erste Bild.`,
          `Transparente Bereiche eines PNG bleiben transparent. Jedes Bild wird in seinem eigenen Format gespeichert, und JPG und WebP werden in hoher Qualität neu gespeichert.`,
        ],
      },
      {
        h: `Tipps`,
        p: [
          `Ändern Sie jeweils einen Regler und beobachten Sie die Vorschau. Man treibt Helligkeit und Kontrast leicht zusammen so weit, dass in den hellsten und dunkelsten Teilen Details verloren gehen.`,
          `Für ein Schwarzweißfoto mit mehr Wirkung wählen Sie "Black and white" und fügen etwas Kontrast hinzu. Für einen Look wie bei alten Fotos funktioniert Sepia mit etwas geringerer Helligkeit gut.`,
        ],
      },
    ],
    faq: [
      { q: `Wie mache ich ein Bild schwarzweiß?`, a: `Wählen Sie den Filter "Black and white" und klicken Sie auf "Apply". Wenn Sie "Colour strength" ganz herunterziehen, erhalten Sie ein ähnliches Ergebnis.` },
      { q: `Wie mache ich ein dunkles Foto heller?`, a: `Schieben Sie den Regler "Brightness" nach rechts und fügen Sie etwas Kontrast hinzu, wenn es flach wirkt.` },
      { q: `Wird mein Bild hochgeladen?`, a: `Nein. Die Änderungen werden in Ihrem Browser vorgenommen.` },
    ],
  },

  'how-to-add-a-border-to-a-picture': {
    title: `Einem Bild einen Rand oder Rahmen hinzufügen`,
    seoTitle: `Rand oder Rahmen zu einem Bild hinzufügen (jede Farbe)`,
    description: `Legen Sie einen weißen, schwarzen oder farbigen Rand oder einen durchsichtigen um jedes Bild. Stärke wählen und Vorschau sehen. Im Browser.`,
    intro: `Um einem Bild einen Rand hinzuzufügen, ziehen Sie es in das Werkzeug „Rand oder Rahmen hinzufügen“, stellen die Stärke ein, wählen eine Farbe und klicken auf "Add border". Der Rand liegt um das Bild, es wird also nichts abgeschnitten, und das Ergebnis ist etwas größer.`,
    steps: [
      `Öffnen Sie das Werkzeug „Rand oder Rahmen hinzufügen“ und legen Sie Ihre Bilder ab.`,
      `Stellen Sie ein, wie dick der Rand sein soll.`,
      `Wählen Sie Weiß, Schwarz, Gelb, Transparent oder geben Sie Ihren eigenen Farbcode ein, etwa #1e90ff.`,
      `Prüfen Sie die Vorschau, klicken Sie auf "Add border" und laden Sie das Ergebnis herunter.`,
    ],
    sections: [
      {
        h: `Stärke, die mitskaliert`,
        p: [
          `Die Stärke ist ein Anteil der kürzeren Seite des Bildes, daher sieht der Rand auf einem kleinen und einem großen Foto im selben Stapel gleich aus.`,
          `Weil der Rand außen hinzugefügt wird, behält das Bild seinen gesamten Inhalt. Das unterscheidet sich vom Zeichnen über den Rand, bei dem ein Teil verdeckt würde.`,
        ],
      },
      {
        h: `Durchsichtige Ränder`,
        p: [
          `Ein transparenter Rand braucht ein Format, das Transparenz unterstützt, daher wird ein JPG zu einem PNG, wenn Sie ihn wählen. Andere Bilder behalten ihr eigenes Format.`,
          `Geben Sie einen ungültigen Farbcode ein, sagt Ihnen die Seite das, statt zu raten. Nutzen Sie die Formen #1e90ff oder #fa0.`,
        ],
      },
      {
        h: `Tipps`,
        p: [
          `Ein dünner weißer Rand von etwa 2 bis 4 Prozent ergibt einen sauberen Druck- oder Galerie-Look. Ein dickerer in kräftiger Farbe funktioniert als Rahmen für einen Beitrag in sozialen Netzwerken.`,
          `Wenn Sie das Bild drucken wollen, denken Sie daran, dass ein Rand die Datei größer macht als das Original. Prüfen Sie daher die endgültige Größe gegen das Papier oder den Rahmen, den Sie im Sinn haben.`,
        ],
      },
    ],
    faq: [
      { q: `Wie füge ich einem Foto einen weißen Rand hinzu?`, a: `Legen Sie das Foto ab, lassen Sie die Farbe auf "White", stellen Sie die Stärke ein und klicken Sie auf "Add border".` },
      { q: `Verdeckt der Rand mein Bild?`, a: `Nein. Er wird außen hinzugefügt, das Bild ist also vollständig und das Ergebnis größer.` },
      { q: `Kann der Rand durchsichtig sein?`, a: `Ja. Wählen Sie "Transparent". Das Ergebnis ist ein PNG, weil JPG nicht durchsichtig sein kann.` },
    ],
  },

  'how-to-get-a-hex-color-from-an-image': {
    title: `Den HEX-Farbcode aus einem Bild auslesen`,
    seoTitle: `HEX-Farbcode aus einem Bild auslesen (Farbwähler)`,
    description: `Klicken Sie auf ein beliebiges Bild und erhalten Sie die exakte Farbe als HEX, RGB und HSL mit Ein-Klick-Kopieren. Auch per Tastatur. Im Browser.`,
    intro: `Um den HEX-Code einer Farbe in einem Bild zu erhalten, ziehen Sie es in den Farbwähler für Bilder, fahren über das Bild, um die Farbe in der Vorschau zu sehen, und klicken, um sie zu wählen. Die Codes HEX, RGB und HSL erscheinen, jeweils mit einer Schaltfläche "Copy".`,
    steps: [
      `Öffnen Sie den Farbwähler für Bilder und legen Sie ein Bild ab.`,
      `Fahren Sie über das Bild, um die Farbe unter dem Zeiger in der Vorschau zu sehen.`,
      `Klicken oder tippen Sie, um sie zu wählen, und klicken Sie dann neben dem gewünschten Code auf "Copy".`,
      `Wählen Sie so viele Farben, wie Sie möchten. Die letzten zehn bleiben unten stehen, sodass Sie zu ihnen zurückkehren können.`,
    ],
    sections: [
      {
        h: `HEX, RGB und HSL`,
        p: [
          `Es sind drei Schreibweisen für dieselbe Farbe. HEX ist der kurze Code, der auf Webseiten verwendet wird, etwa #1E90FF. RGB gibt die Anteile von Rot, Grün und Blau von 0 bis 255 an, und HSL gibt Farbton, Sättigung und Helligkeit an, was sich von Hand leichter anpassen lässt.`,
          `Das Feld zeigt alle drei, sodass Sie die einfügen können, die Ihr Design-Werkzeug oder Ihr Stylesheet will.`,
        ],
      },
      {
        h: `Eine verlässliche Farbe bekommen`,
        p: [
          `Ein Foto besteht aus Millionen leicht unterschiedlicher Pixel, daher können zwei Stellen, die gleich aussehen, um ein paar Stufen abweichen. Klicken Sie an ein paar Stellen oder nutzen Sie stattdessen das Palettenwerkzeug, um die Hauptfarben zu finden.`,
          `Ohne Maus klicken Sie einmal auf das Bild, bewegen sich dann mit den Pfeiltasten und wählen mit Enter. Ist ein Pixel durchsichtig, sagt die Seite das, denn was Sie auf dem Bildschirm sehen, hängt auch davon ab, was dahinter liegt.`,
        ],
      },
    ],
    faq: [
      { q: `Wie finde ich den HEX-Code einer Farbe in einem Bild?`, a: `Legen Sie das Bild ab, klicken Sie auf die Farbe und kopieren Sie den HEX-Code, der erscheint.` },
      { q: `Warum geben benachbarte Pixel unterschiedliche Codes?`, a: `Fotos enthalten winzige Abweichungen. Klicken Sie an ein paar Stellen oder nutzen Sie das Palettenwerkzeug, um die Hauptfarben zu sehen.` },
      { q: `Wird mein Bild hochgeladen?`, a: `Nein. Die Farbe wird in Ihrem Browser gelesen.` },
    ],
  },

  'how-to-get-a-color-palette-from-an-image': {
    title: `Eine Farbpalette aus einem Bild gewinnen`,
    seoTitle: `Farbpalette aus einem Bild gewinnen (HEX-Codes, CSS)`,
    description: `Ziehen Sie die Hauptfarben aus einem Bild mit ihren HEX-Codes und dem Anteil, den jede abdeckt. Als Liste oder CSS-Variablen kopieren.`,
    intro: `Um eine Farbpalette aus einem Bild zu gewinnen, ziehen Sie es in den Farbpaletten-Generator. Die Hauptfarben erscheinen als Farbfelder mit ihren HEX-Codes und dem Anteil des Bildes, den jede abdeckt, und Sie können sie als Liste oder als CSS kopieren.`,
    steps: [
      `Öffnen Sie den Farbpaletten-Generator und legen Sie ein Bild ab.`,
      `Die Hauptfarben erscheinen sofort. Mit dem Regler fordern Sie weniger oder mehr an, von 2 bis 12.`,
      `Klicken Sie auf ein Farbfeld, um seinen HEX-Code zu kopieren.`,
      `Oder kopieren Sie die ganze Palette als Liste oder als CSS-Variablen.`,
    ],
    sections: [
      {
        h: `Wie die Farben ausgewählt werden`,
        p: [
          `Ähnliche Pixel werden gruppiert, und jede Gruppe wird zu einer Farbe gemittelt. Eine Farbe, die den größten Teil des Bildes füllt, steht daher zuerst. Der Prozentwert an einem Farbfeld gibt an, wie viel vom Bild diese Gruppe abdeckt.`,
          `Ganz oder weitgehend durchsichtige Pixel werden ignoriert, sodass ein Logo auf transparentem Hintergrund die Farben des Logos ergibt und nicht eine dunkle leere.`,
        ],
      },
      {
        h: `Die Palette verwenden`,
        p: [
          `Das Kopieren als CSS-Variablen liefert benutzerdefinierte Eigenschaften wie --colour-1, die Sie direkt in ein Stylesheet einfügen können. Die einfache Liste ist praktisch für Notizen oder ein Design-Werkzeug.`,
          `Hat das Bild weniger verschiedene Farben, als Sie angefordert haben, erhalten Sie nur die Farben, die es hat. Ein Logo mit drei Farben ergibt drei Farbfelder, nicht zwölf. Für eine einzelne exakte Farbe nutzen Sie stattdessen den Farbwähler.`,
        ],
      },
      {
        h: `Tipps`,
        p: [
          `Nehmen Sie ein Bild mit der Stimmung, die Sie wollen. Eine Palette ist nur so gut wie das Bild, aus dem sie stammt, und ein Sonnenuntergangsfoto ergibt ganz andere Farben als ein Produktfoto.`,
          `Wählen Sie zwei oder drei Farben aus der Palette statt aller. Die meisten Designs funktionieren am besten mit einer Hauptfarbe, einer Akzentfarbe und einem Neutralton, und die Prozentwerte zeigen, welche Farben die größten Kandidaten sind.`,
        ],
      },
    ],
    faq: [
      { q: `Wie viele Farben kann ich erhalten?`, a: `Von 2 bis 12. Sechs sind ein guter Anfang für eine Marken- oder Design-Palette.` },
      { q: `Kann ich die Palette auf meiner Website verwenden?`, a: `Ja. Kopieren Sie sie als CSS-Variablen und fügen Sie das Ergebnis in Ihr Stylesheet ein.` },
      { q: `Wird mein Bild hochgeladen?`, a: `Nein. Die Farben werden in Ihrem Browser berechnet.` },
    ],
  },

  'how-to-convert-an-image-to-base64': {
    title: `Ein Bild in Base64 umwandeln (und zurück)`,
    seoTitle: `Bild in Base64 umwandeln und wieder dekodieren`,
    description: `Wandeln Sie ein Bild in einen Base64-Data-URI für HTML oder CSS um oder fügen Sie Base64 ein und erhalten Sie das Bild zurück. Im Browser, nichts wird hochgeladen.`,
    intro: `Um ein Bild in Base64 umzuwandeln, ziehen Sie es in das Werkzeug „Bild zu Base64“ und kopieren das Ergebnis. Standard ist ein Data-URI, den Sie in HTML oder CSS einfügen können. Für den Rückweg wählen Sie "Base64 to image", fügen den Text ein und laden das Bild herunter.`,
    steps: [
      `Öffnen Sie das Werkzeug „Bild zu Base64“ und wählen Sie "Image to Base64".`,
      `Legen Sie das Bild ab. Die Originaldatei wird unverändert kodiert, ein SVG bleibt also ein SVG.`,
      `Wählen Sie das gewünschte Format: ein Data-URI, reines Base64, ein CSS-Hintergrund oder ein HTML-Bild-Tag, und klicken Sie dann auf "Copy".`,
      `Zum Dekodieren wählen Sie "Base64 to image", fügen den Text ein und laden das Bild herunter.`,
    ],
    sections: [
      {
        h: `Wann Base64 eine gute Idee ist`,
        p: [
          `Base64 schreibt die Bytes einer Datei als reinen Text, sodass ein kleines Bild ohne separate Datei in einer Webseite, einem Stylesheet oder einer E-Mail stehen kann. Der Text ist etwa ein Drittel länger als die Datei.`,
          `Es eignet sich für kleine Bilder wie Icons und Logos. Bei einem großen Foto wird der Text sehr lang, und eine normale Bilddatei lädt schneller, daher warnt das Werkzeug oberhalb von 100 KB.`,
        ],
      },
      {
        h: `Base64 wieder einfügen`,
        p: [
          `Sie können einen vollständigen Data-URI oder nur die Base64-Zeichen einfügen. Das Werkzeug liest den Bildtyp (PNG, JPG, GIF, WebP, BMP, AVIF, SVG oder ICO) aus den Daten selbst und vertraut darauf mehr als auf eine falsche Angabe.`,
          `Wurde der Text beim Kopieren abgeschnitten oder ist er kein Bild, erhalten Sie eine klare Meldung dazu statt eines defekten Downloads.`,
        ],
      },
    ],
    faq: [
      { q: `Was ist ein Data-URI?`, a: `Eine Möglichkeit, eine Datei in eine Webadresse zu packen. Er beginnt mit data:, dem Dateityp und ;base64, gefolgt vom Base64-Text.` },
      { q: `Warum ist der Base64-Text größer als die Datei?`, a: `Base64 verwendet vier Textzeichen für je drei Bytes, daher ist der Text etwa 33 Prozent länger.` },
      { q: `Wird mein Bild hochgeladen?`, a: `Nein. Kodieren und Dekodieren geschehen in Ihrem Browser.` },
    ],
  },

  'how-to-make-a-favicon': {
    title: `Ein Favicon für Ihre Website erstellen`,
    seoTitle: `Favicon erstellen (favicon.ico, PNG, Apple-Touch-Icon)`,
    description: `Erstellen Sie favicon.ico, PNGs mit 16 und 32 Pixeln, ein Apple-Touch-Icon und Android-Icons aus einem Bild, mit dem Code zum Einfügen in Ihre Seite.`,
    intro: `Um ein Favicon zu erstellen, ziehen Sie ein Bild in den Favicon-Generator und klicken auf "Make favicons". Sie erhalten favicon.ico, PNGs mit 16 und 32 Pixeln, ein Apple-Touch-Icon und zwei Android-Icons, mit dem Code zum Einfügen in Ihre Seite.`,
    steps: [
      `Öffnen Sie den Favicon-Generator und legen Sie ein Bild ab. Ein quadratisches Bild mit 512 Pixeln oder mehr funktioniert am besten.`,
      `Ist es nicht quadratisch, wählen Sie, ob es aus der Mitte quadratisch zugeschnitten wird oder ob es mit durchsichtigen Balken vollständig erhalten bleibt.`,
      `Klicken Sie auf "Make favicons" und laden Sie die Dateien herunter, oder alle in einer ZIP-Datei.`,
      `Legen Sie die Dateien im Stammordner Ihrer Website ab und fügen Sie den angezeigten Code in den Head Ihrer Seiten ein.`,
    ],
    sections: [
      {
        h: `Was Sie bekommen`,
        p: [
          `favicon.ico enthält die Versionen mit 16, 32 und 48 Pixeln in einer Datei. favicon-16x16.png und favicon-32x32.png sind für Browser-Tabs, apple-touch-icon.png (180 Pixel) ist für iPhones und iPads, und Icons mit 192 und 512 Pixeln sind für Android und installierbare Web-Apps.`,
          `Die Vorschau zeigt Ihr Icon mit 16, 32 und 64 Pixeln, sodass Sie es vor dem Download prüfen können.`,
        ],
      },
      {
        h: `Auch klein gut aussehen`,
        p: [
          `Ein Favicon ist winzig, daher lesen sich eine einfache Form und kräftige Farben am besten. Detailreiche Bilder werden bei 16 Pixeln zu Brei, beginnen Sie also mit einem einfachen Logo oder einem einzelnen Buchstaben.`,
          `Ein Bild unter 512 Pixeln wird für die größten Icons hochgerechnet und kann weich wirken, und die Seite sagt Ihnen, wenn das passiert. Ein durchsichtiger Hintergrund bleibt erhalten.`,
        ],
      },
    ],
    faq: [
      { q: `Welche Dateien braucht eine Website für ein Favicon?`, a: `Eine favicon.ico, PNGs mit 16 und 32 Pixeln für Tabs, ein Apple-Touch-Icon mit 180 Pixeln und Icons mit 192 und 512 Pixeln für Android. Das Werkzeug erstellt alle.` },
      { q: `Wie groß sollte mein Bild sein?`, a: `Quadratisch und mindestens 512 mal 512 Pixel. Kleinere Bilder funktionieren, aber die großen Icons wirken weich.` },
      { q: `Ist die favicon.ico eine echte ICO-Datei?`, a: `Ja. Sie enthält die Icons mit 16, 32 und 48 Pixeln in einer Standard-ICO-Datei.` },
    ],
  },

  'are-online-image-tools-safe': {
    title: `Sind Online-Bildwerkzeuge sicher? So prüfen Sie Ihres`,
    seoTitle: `Sind Online-Bildwerkzeuge sicher? So prüfen Sie es`,
    description: `Viele Online-Bildwerkzeuge laden Ihr Foto auf einen Server hoch. So erkennen Sie das, prüfen es in zwei Minuten und was iDuckImg stattdessen tut.`,
    intro: `Ein Online-Bildwerkzeug ist nur so privat wie der Ort, an dem es seine Arbeit erledigt. Viele senden Ihr Foto an einen Server. iDuckImg erledigt die Arbeit in Ihrem Browser, sodass die Datei auf Ihrem Gerät bleibt. Das können Sie selbst im Netzwerk-Tab des Browsers prüfen.`,
    steps: [
      `Öffnen Sie die Seite des Werkzeugs, öffnen Sie dann die Entwicklertools Ihres Browsers (F12) und wählen Sie den Tab „Netzwerk“ (Network).`,
      `Leeren Sie die Liste, legen Sie dann ein Bild im Werkzeug ab und führen Sie es aus.`,
      `Suchen Sie nach großen Anfragen, die Ihr Bild enthalten, meist als POST oder PUT angezeigt. Ein Werkzeug, das auf Ihrem Gerät arbeitet, zeigt keine.`,
      `Lesen Sie die Datenschutzerklärung jedes Werkzeugs, das Sie nutzen, und prüfen Sie, was es nach eigener Angabe speichert und wie lange.`,
    ],
    sections: [
      {
        h: `Warum es wichtig ist`,
        p: [
          `Ein Foto kann Gesichter, Dokumente, eine Hausnummer und versteckte Angaben wie den genauen Ort der Aufnahme enthalten. Beim Hochladen geben Sie eine Kopie an jemand anderen, und Sie sehen nicht, was danach passiert.`,
          `Werkzeuge, die in Ihrem Browser arbeiten, vermeiden das, weil Ihre Datei von Ihrem eigenen Gerät verarbeitet und nie gesendet wird. Sie sind außerdem meist schneller, da es keinen Upload und keinen Download gibt.`,
        ],
      },
      {
        h: `Was iDuckImg tut`,
        p: [
          `Jedes iDuckImg-Werkzeug läuft in Ihrem Browser. Ihre Bilder werden nicht hochgeladen, es gibt keine Anmeldung, und es wird kein Wasserzeichen hinzugefügt. Die Seite lädt ihren eigenen Code und ihre Dateien von derselben Website und für einige Formate wie HEIC einen Decoder von derselben Website. Sie stellt keine Anfragen an andere Unternehmen.`,
          `Trotzdem sinnvoll: Entfernen Sie versteckte Standortdaten, bevor Sie ein Foto teilen, und nutzen Sie „Cover“ statt einer leichten Unschärfe, um alles Private zu verbergen. Die Werkzeuge „EXIF-Daten entfernen“ und „Bildbereiche verwischen oder verdecken“ erledigen diese Aufgaben auf Ihrem Gerät.`,
        ],
      },
    ],
    faq: [
      { q: `Wie erkenne ich, ob ein Werkzeug mein Foto hochlädt?`, a: `Öffnen Sie den Netzwerk-Tab in den Entwicklertools Ihres Browsers, führen Sie das Werkzeug aus und suchen Sie nach einer großen Anfrage, die Ihr Bild enthält. Gibt es keine, ist die Arbeit auf Ihrem Gerät geschehen.` },
      { q: `Lädt iDuckImg meine Bilder hoch?`, a: `Nein. Jedes Werkzeug läuft in Ihrem Browser, und Ihre Dateien bleiben auf Ihrem Gerät.` },
      { q: `Ist es sicher, ein Foto nach dem Bearbeiten zu teilen?`, a: `Entfernen Sie zuerst die versteckten Standort- und Kameradaten und verbergen Sie alles Private im Bild selbst mit einer einfarbigen Abdeckung.` },
    ],
  },
};
