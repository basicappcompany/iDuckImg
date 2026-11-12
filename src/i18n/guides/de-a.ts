import type { GuideText } from './types';

/** German text for guides 1 to 8 (see src/lib/guides-a.ts). */
export const deGuidesA: Record<string, GuideText> = {
  'how-to-compress-an-image': {
    title: `Bild komprimieren, ohne sichtbar an Qualität zu verlieren`,
    seoTitle: `Bild komprimieren ohne Qualitätsverlust (kostenlos)`,
    description: `JPG-, PNG- und WebP-Dateien im Browser verkleinern. Qualität wählen, Größe vorher und nachher prüfen, herunterladen. Ohne Upload, ohne Anmeldung.`,
    intro: `Um ein Bild zu komprimieren, ziehen Sie es in das Werkzeug „Bilder komprimieren“, lassen die Qualität bei etwa 75 und klicken auf „Komprimieren“. Fotos werden meist deutlich kleiner, ohne dass Sie einen Unterschied sehen, und das Bild verlässt nie Ihr Gerät.`,
    steps: [
      `Öffnen Sie das Werkzeug „Bilder komprimieren“ und legen Sie Ihre JPG-, PNG- oder WebP-Dateien ab oder fügen Sie sie aus der Zwischenablage ein.`,
      `Stellen Sie die Qualität ein. Bei etwa 75 sieht ein Foto unverändert aus, während die Datei deutlich kleiner wird.`,
      `Klicken Sie auf „Komprimieren“ und sehen Sie sich neben jeder Datei die Größe vorher und nachher an.`,
      `Laden Sie jede Datei einzeln herunter oder alle zusammen als ZIP.`,
    ],
    sections: [
      {
        h: `Was sich je nach Dateityp ändert`,
        p: [
          `JPG und WebP werden mit einstellbarer Qualität komprimiert: Ein niedrigerer Wert bedeutet eine kleinere Datei und etwas weniger Details. Fotos vom Smartphone haben oft 3 bis 8 MB, und das meiste davon lässt sich ohne sichtbaren Unterschied einsparen.`,
          `Bei PNG ist es anders. Es wird ohne Verlust optimiert, das Bild bleibt also exakt gleich, aber die Ersparnis ist geringer. Ist ein PNG ein Foto, spart die Umwandlung in JPG oder WebP weit mehr.`,
        ],
      },
      {
        h: `Wenn Sie eine genaue Größe brauchen`,
        p: [
          `Formulare verlangen oft, dass ein Foto unter einer bestimmten Anzahl Kilobyte liegt. Nutzen Sie dafür das Feld für die Zielgröße im Werkzeug „Bildgröße ändern“ oder öffnen Sie eine fertige Seite wie „Bild auf 100 KB komprimieren“. Das Werkzeug probiert verschiedene Qualitätsstufen aus und behält die beste, die passt.`,
          `Lässt sich eine Datei nicht weiter verkleinern, erhalten Sie das Original zurück statt einer schlechteren Version.`,
        ],
      },
    ],
    faq: [
      { q: `Verringert das Komprimieren die Bildqualität?`, a: `JPG und WebP verlieren mit sinkender Qualität etwas an Details, bei etwa 75 ist die Änderung kaum zu sehen. PNG wird ohne Verlust optimiert.` },
      { q: `Wird mein Bild beim Komprimieren hochgeladen?`, a: `Nein. Die Arbeit passiert in Ihrem Browser auf Ihrem eigenen Gerät, die Datei wird nirgendwohin gesendet.` },
      { q: `Kann ich viele Bilder auf einmal komprimieren?`, a: `Ja. Fügen Sie beliebig viele hinzu und laden Sie sie zusammen als ZIP herunter.` },
    ],
  },

  'how-to-resize-an-image': {
    title: `Bildgröße ändern: nach Pixeln, Prozent oder Dateigröße`,
    seoTitle: `Bildgröße ändern: Pixel, Prozent oder KB (kostenlos)`,
    description: `Ändern Sie ein Bild auf exakte Pixelmaße, einen Prozentwert oder eine Ziel-Dateigröße in KB, im Browser. Proportionen bleiben erhalten. Ohne Upload.`,
    intro: `Um die Größe eines Bildes zu ändern, ziehen Sie es in das Werkzeug „Bildgröße ändern“, geben Breite oder Höhe in Pixeln ein oder wählen einen Prozentwert und klicken auf „Größe ändern“. Lassen Sie ein Feld leer, wird das andere so berechnet, dass das Bild nicht verzerrt wird.`,
    steps: [
      `Öffnen Sie das Werkzeug „Bildgröße ändern“ und legen Sie Ihre JPG-, PNG- oder WebP-Dateien ab.`,
      `Geben Sie eine Breite, eine Höhe oder einen Prozentwert ein. Lassen Sie ein Feld leer, damit die Proportionen erhalten bleiben.`,
      `Braucht ein Formular eine bestimmte Dateigröße, geben Sie bei „Ziel-Dateigröße (KB, optional)“ ein Ziel in KB ein, zum Beispiel 100.`,
      `Klicken Sie auf „Größe ändern“ und laden Sie das Ergebnis herunter, oder alle Dateien als ZIP.`,
    ],
    sections: [
      {
        h: `Pixel, Prozent oder Kilobyte?`,
        p: [
          `Pixel brauchen Sie dort, wo eine Größe wie 1200 mal 800 verlangt wird. Ein Prozentwert geht schneller, wenn das Bild einfach kleiner werden soll, zum Beispiel 50 Prozent. Ein Ziel in KB ist für Upload-Grenzen gedacht, und das Werkzeug findet die beste Qualität, die passt.`,
          `Die Zielgröße funktioniert für JPG und WebP. Ein PNG mit Zielgröße wird als WebP gespeichert, weil PNG verlustfrei ist und Qualität nicht gegen Größe eintauschen kann.`,
        ],
      },
      {
        h: `Wenn das Ziel zu klein ist`,
        p: [
          `Lässt sich die gewünschte Größe bei der gewählten Pixelgröße nicht erreichen, sehen Sie eine Meldung statt einer falschen Datei. Probieren Sie weniger Pixel und versuchen Sie das Ziel dann noch einmal.`,
          `Ein Bild zu vergrößern fügt keine Details hinzu. Es wird nur hochgerechnet und kann dann weich wirken, deshalb ist Verkleinern die sichere Richtung.`,
        ],
      },
    ],
    faq: [
      { q: `Wie ändere ich die Größe, ohne das Bild zu verzerren?`, a: `Füllen Sie nur die Breite oder nur die Höhe aus. Die andere Seite wird aus den ursprünglichen Proportionen berechnet.` },
      { q: `Kann ich die Größe auf genau 100 KB ändern?`, a: `Ja. Geben Sie 100 als Zielgröße ein. Das Werkzeug wählt die höchste Qualität, die darunter passt, oder sagt Ihnen, wenn es nicht geht.` },
      { q: `Wird mein Foto beim Ändern der Größe hochgeladen?`, a: `Nein. Es läuft in Ihrem Browser, und die Datei bleibt auf Ihrem Gerät.` },
    ],
  },

  'how-to-crop-an-image': {
    title: `Bild auf den gewünschten Ausschnitt zuschneiden`,
    seoTitle: `Bild zuschneiden: ziehen, Verhältnis oder exakte Pixel`,
    description: `Schneiden Sie ein Bild zu: Rahmen ziehen, ein Verhältnis wie 1:1 oder 16:9 festlegen oder exakte Pixel eingeben. Kostenlos, im Browser, ohne Upload.`,
    intro: `Um ein Bild zuzuschneiden, ziehen Sie es in das Werkzeug „Bilder zuschneiden“, ziehen den Rahmen über den Teil, den Sie behalten möchten, und klicken auf „Zuschneiden“. Wählen Sie eine Form wie 1:1 oder 16:9, um die Proportionen festzuhalten, oder geben Sie exakte Pixel ein.`,
    steps: [
      `Öffnen Sie das Werkzeug „Bilder zuschneiden“ und legen Sie ein JPG-, PNG- oder WebP-Bild ab.`,
      `Ziehen Sie den Rahmen und seine Griffe über den gewünschten Teil. Wählen Sie ein Verhältnis wie 1:1 oder 16:9, wenn Sie eines brauchen.`,
      `Oder geben Sie für einen exakten Zuschnitt Links, Oben, Breite und Höhe in Pixeln ein.`,
      `Klicken Sie auf „Zuschneiden“ und laden Sie das Ergebnis herunter.`,
    ],
    sections: [
      {
        h: `Ein Verhältnis wählen`,
        p: [
          `Ein Verhältnis hält den Rahmen in einer festen Form, während Sie ihn verschieben und in der Größe ändern. Nutzen Sie 1:1 für ein quadratisches Profilbild, 16:9 für Video-Vorschaubilder und Folien sowie 4:3 oder 3:2 für Fotoabzüge.`,
          `Wenn Sie nicht wissen, welche Form ein Ort verlangt, rechnet der Seitenverhältnis-Rechner Breite und Höhe in ein Verhältnis um.`,
        ],
      },
      {
        h: `Feine Steuerung ohne Maus`,
        p: [
          `Sie können den Rahmen mit den Pfeiltasten verschieben und exakte Werte eingeben. Das funktioniert auch am Smartphone, wo Ziehen fummelig ist. Das zugeschnittene Bild behält sein ursprüngliches Format.`,
          `Das Zuschneiden entfernt den äußeren Bereich in der heruntergeladenen Datei endgültig, bewahren Sie also Ihr Original auf, falls Sie es zurückhaben möchten. Da das Werkzeug die abgelegte Datei nie verändert, können Sie jederzeit von ihr aus neu beginnen und einen anderen Rahmen probieren.`,
        ],
      },
    ],
    faq: [
      { q: `Wie schneide ich ein Bild quadratisch zu?`, a: `Wählen Sie die Form 1:1 und schieben Sie den Rahmen über den gewünschten Teil. Der Rahmen bleibt quadratisch, wenn Sie seine Größe ändern.` },
      { q: `Kann ich auf exakte Pixel zuschneiden?`, a: `Ja. Geben Sie Links, Oben, Breite und Höhe in Pixeln ein.` },
      { q: `Verringert das Zuschneiden die Qualität?`, a: `Die Pixel, die Sie behalten, bleiben unverändert. JPG und WebP werden in hoher Qualität neu gespeichert, PNG bleibt verlustfrei.` },
    ],
  },

  'how-to-add-a-watermark-to-a-photo': {
    title: `Ein Text-Wasserzeichen zu einem Foto hinzufügen`,
    seoTitle: `Text-Wasserzeichen auf Fotos setzen (kostenlos, ohne Upload)`,
    description: `Setzen Sie Ihren Namen oder einen Copyright-Vermerk auf Bilder. Position, Größe, Deckkraft und Farbe wählen oder den Text über das Bild wiederholen. Im Browser.`,
    intro: `Um ein Foto mit einem Wasserzeichen zu versehen, ziehen Sie es in das Werkzeug „Wasserzeichen hinzufügen“, geben Ihren Text ein, wählen die Position und klicken auf „Wasserzeichen hinzufügen“. Sie können es in eine Ecke setzen oder über das ganze Bild wiederholen.`,
    steps: [
      `Öffnen Sie das Werkzeug „Wasserzeichen hinzufügen“ und legen Sie Ihre JPG-, PNG- oder WebP-Bilder ab.`,
      `Geben Sie Ihren Text ein, zum Beispiel Ihren Namen oder einen Copyright-Vermerk.`,
      `Wählen Sie Position, Größe, Deckkraft und Farbe. Die Vorschau aktualisiert sich bei jeder Änderung.`,
      `Klicken Sie auf „Wasserzeichen hinzufügen“ und laden Sie jede Datei herunter, oder alle als ZIP.`,
    ],
    sections: [
      {
        h: `Gut lesbar, aber nicht hässlich`,
        p: [
          `Die Größe ist ein Anteil der Bildbreite, daher sieht das Zeichen auf einem kleinen und einem großen Foto gleich aus. Ein weicher Rand in der Gegenfarbe hält weißen Text auf hellen Flächen und schwarzen Text auf dunklen Flächen lesbar.`,
          `Etwa 60 Prozent Deckkraft sind ein guter Anfang. Senken Sie den Wert, wenn das Zeichen mit dem Bild konkurriert, und erhöhen Sie ihn, wenn es unbedingt zu sehen sein muss.`,
        ],
      },
      {
        h: `Was ein Wasserzeichen kann und was nicht`,
        p: [
          `Ein sichtbares Wasserzeichen schreckt vom Kopieren ab, verhindert es aber nicht. Wer es darauf anlegt, kann es abschneiden oder herausbearbeiten. Eine Platzierung nahe der Mitte oder eine Wiederholung über das Bild macht das schwieriger.`,
          `Dasselbe Wasserzeichen wird auf jedes hinzugefügte Bild angewendet, und JPG und WebP werden in hoher Qualität neu gespeichert.`,
        ],
      },
    ],
    faq: [
      { q: `Kann ich viele Fotos auf einmal mit einem Wasserzeichen versehen?`, a: `Ja. Fügen Sie alle hinzu, prüfen Sie die Vorschau des ersten, und jedes Bild erhält dasselbe Zeichen in gleicher relativer Größe.` },
      { q: `Kann jemand mein Wasserzeichen entfernen?`, a: `Wer es darauf anlegt, kann es abschneiden oder herausbearbeiten. Ein über das ganze Bild wiederholtes Zeichen ist schwerer zu entfernen als eines in einer Ecke.` },
      { q: `Kann ich statt Text ein Logo verwenden?`, a: `Ja, mit dem Werkzeug „Logo zu Bildern hinzufügen“, das ein PNG-, JPG- oder WebP-Bild auf dieselbe Weise platziert.` },
    ],
  },

  'how-to-add-a-logo-to-a-photo': {
    title: `Ihr Logo auf ein Foto setzen`,
    seoTitle: `Logo zu einem Foto oder Bild hinzufügen (kostenlos)`,
    description: `Setzen Sie Ihr Logo auf ein Bild oder auf viele. Position, Größe und Deckkraft wählen oder das Logo über das Bild wiederholen. Läuft in Ihrem Browser.`,
    intro: `Um ein Logo zu einem Foto hinzuzufügen, ziehen Sie das Bild in das Werkzeug „Logo zu Bildern hinzufügen“, wählen Ihre Logo-Datei, bestimmen die Position und klicken auf „Logo hinzufügen“. Ein PNG-Logo mit transparentem Hintergrund sieht am besten aus.`,
    steps: [
      `Öffnen Sie das Werkzeug „Logo zu Bildern hinzufügen“ und legen Sie Ihre JPG-, PNG- oder WebP-Bilder ab.`,
      `Wählen Sie Ihre Logo-Datei. Ein PNG mit transparentem Hintergrund ergibt das sauberste Ergebnis.`,
      `Wählen Sie eine von neun Positionen oder die Wiederholung und stellen Sie dann Größe und Deckkraft ein.`,
      `Klicken Sie auf „Logo hinzufügen“ und laden Sie die Dateien herunter, oder alle als ZIP.`,
    ],
    sections: [
      {
        h: `Ein sauberes Logo bekommen`,
        p: [
          `Ein JPG-Logo behält sein weißes Kästchen und erscheint daher als weißes Rechteck auf dem Foto. Exportieren Sie Ihr Logo stattdessen als PNG oder WebP mit transparentem Hintergrund.`,
          `SVG-Logos werden noch nicht unterstützt, weil der Browser sie im Hintergrund-Worker nicht zeichnen kann. Exportieren Sie vorher ein PNG in großer Größe.`,
        ],
      },
      {
        h: `Größe und Platzierung`,
        p: [
          `Das Logo behält seine eigenen Proportionen, und seine Größe ist ein Anteil der Bildbreite, daher sieht es auf jedem Foto eines Stapels gleich aus. Wäre es zu groß, um hineinzupassen, wird es verkleinert statt abgeschnitten.`,
          `Nehmen Sie eine Ecke für ein dezentes Markenzeichen und die Mitte oder die Wiederholung, wenn es schwerer zu entfernen sein soll.`,
        ],
      },
      {
        h: `Tipps für ein professionelles Ergebnis`,
        p: [
          `Halten Sie das Logo klein und einheitlich. Etwa 10 bis 20 Prozent der Bildbreite reichen meist aus, und dieselbe Ecke auf jedem Foto lässt eine Serie zusammengehörig wirken.`,
          `Prüfen Sie die Vorschau auf einem hellen und einem dunklen Foto, bevor Sie einen großen Stapel verarbeiten. Verschwindet das Logo auf einem von beiden, erhöhen Sie die Deckkraft oder geben Sie dem Logo vorher einen hellen Umriss.`,
        ],
      },
    ],
    faq: [
      { q: `Welche Logo-Dateien funktionieren?`, a: `PNG, JPG und WebP. Ein transparentes PNG oder WebP sieht am besten aus. SVG wird noch nicht unterstützt.` },
      { q: `Werden mein Logo oder mein Foto hochgeladen?`, a: `Nein. Beide werden in Ihrem Browser zusammengesetzt und bleiben auf Ihrem Gerät.` },
      { q: `Kann ich das Logo auf viele Fotos setzen?`, a: `Ja. Dasselbe Logo kommt in gleicher relativer Größe auf jedes Bild.` },
    ],
  },

  'how-to-resize-a-photo-and-signature-for-an-exam-form': {
    title: `Foto und Unterschrift für ein Prüfungsformular anpassen`,
    seoTitle: `Foto und Unterschrift für Prüfungen anpassen (KB und px)`,
    description: `Bringen Sie Foto, Unterschrift oder Daumenabdruck auf die exakten Pixel und KB, die ein Prüfungsformular verlangt, nach Vorgaben aus offiziellen Bekanntmachungen.`,
    intro: `Um ein Foto für ein Prüfungsformular anzupassen, wählen Sie im Werkzeug „Foto und Unterschrift für Prüfungen anpassen“ Ihre Prüfung und das Dokument, legen Ihr Bild ab und klicken auf "Make my file". Sie erhalten ein JPG in exakter Pixelgröße und innerhalb des erlaubten KB-Bereichs.`,
    steps: [
      `Öffnen Sie das Werkzeug „Foto und Unterschrift für Prüfungen anpassen“ und wählen Sie Ihre Prüfung und das Dokument, etwa Passfoto oder Unterschrift.`,
      `Prüfen Sie die angezeigten Anforderungen. Jede hat einen Link zur offiziellen Bekanntmachung und das Datum, an dem wir sie gelesen haben.`,
      `Legen Sie Ihr Foto oder Ihren Scan ab. HEIC-Fotos vom iPhone funktionieren auch.`,
      `Klicken Sie auf "Make my file", prüfen Sie die Größe in der Liste und laden Sie das JPG herunter.`,
    ],
    sections: [
      {
        h: `Welche Prüfungen abgedeckt sind`,
        p: [
          `Derzeit enthält das Werkzeug IBPS PO/MT (Foto, Unterschrift, Abdruck des linken Daumens und handschriftliche Erklärung) und die SSC-CGL-2026-Unterschrift. Jede Zahl stammt aus einer offiziellen Bekanntmachung, und jede Vorgabe zeigt ihre Quelle und wann wir sie gelesen haben.`,
          `Ist Ihre Prüfung nicht aufgeführt, wählen Sie "Other exam" und geben Breite, Höhe und KB-Grenzen aus Ihrer eigenen Bekanntmachung ein.`,
        ],
      },
      {
        h: `Prüfen Sie immer Ihre eigene Bekanntmachung`,
        p: [
          `Die Prüfungsregeln ändern sich von Durchgang zu Durchgang. Vergleichen Sie die Zahlen daher mit Ihrer aktuellen Bekanntmachung, bevor Sie hochladen. Das Werkzeug ist nur so aktuell wie die Bekanntmachung, aus der es gelesen wurde.`,
          `Das Bild wird auf die exakte Pixelgröße zugeschnitten oder aufgefüllt und dann in der besten Qualität gespeichert, die unter das Maximum passt. Kommt ein einfaches Bild unter dem Minimum heraus, werden harmlose Füllbytes an die Datei angehängt, damit sie es erreicht. Das Bild selbst wird nicht verändert.`,
        ],
      },
    ],
    faq: [
      { q: `Sind die Größen offiziell?`, a: `Ja, sie sind aus offiziellen Bekanntmachungen übernommen, und jede Vorgabe verlinkt das Dokument und nennt das Lesedatum. Prüfen Sie trotzdem die Bekanntmachung für Ihren eigenen Durchgang.` },
      { q: `Was, wenn meine Prüfung nicht aufgeführt ist?`, a: `Wählen Sie "Other exam" und geben Sie die Pixelgröße und den KB-Bereich aus Ihrer Bekanntmachung ein.` },
      { q: `Wird mein Foto hochgeladen?`, a: `Nein. Es wird in Ihrem Browser angepasst und verlässt nie Ihr Gerät.` },
    ],
  },

  'how-to-convert-images-between-jpg-png-webp-and-heic': {
    title: `Bilder zwischen JPG, PNG, WebP und HEIC konvertieren`,
    seoTitle: `Bilder konvertieren: JPG, PNG, WebP, HEIC zu PDF (kostenlos)`,
    description: `iPhone-HEIC-Fotos öffnen, zwischen JPG, PNG und WebP wechseln oder eine PDF erstellen. Läuft im Browser, ohne Upload und ohne Anmeldung.`,
    intro: `Um ein Bild zu konvertieren, ziehen Sie es in das Werkzeug „Bilder konvertieren“, wählen JPG, PNG, WebP oder PDF als Format und klicken auf „Umwandeln“. HEIC-Fotos vom iPhone sowie AVIF-, SVG-, GIF- und BMP-Dateien lassen sich als Eingabe ebenfalls öffnen.`,
    steps: [
      `Öffnen Sie das Werkzeug „Bilder konvertieren“ und legen Sie Ihre Dateien ab. Sie können viele auf einmal hinzufügen.`,
      `Wählen Sie das Ausgabeformat: JPG, PNG, WebP oder PDF.`,
      `Klicken Sie auf „Umwandeln“.`,
      `Laden Sie jede Datei einzeln herunter oder alle zusammen in einer ZIP-Datei.`,
    ],
    sections: [
      {
        h: `Welches Format Sie wählen sollten`,
        p: [
          `JPG ist die sichere Wahl für Fotos und lässt sich überall öffnen, auch in Upload-Formularen. PNG bewahrt scharfe Kanten und durchsichtige Hintergründe, es eignet sich also für Logos und Screenshots. WebP ist meist kleiner als beide und funktioniert in jedem aktuellen Browser.`,
          `JPG kann nicht durchsichtig sein, daher wird ein transparenter Bereich beim Umwandeln in JPG weiß gefüllt.`,
        ],
      },
      {
        h: `HEIC, AVIF, SVG, GIF und BMP`,
        p: [
          `iPhones speichern Fotos als HEIC, das viele Apps und Websites nicht öffnen können. Wandeln Sie es in JPG um, dann funktioniert es überall. Die erste HEIC-Datei lädt einen Decoder von etwa 2 MB, der Start kann also einen Moment dauern. HEIC ist nur als Eingabe möglich.`,
          `Ein GIF behält nur sein erstes Bild, ein SVG wird auf der längeren Seite mit mindestens 1024 Pixeln gezeichnet, und AVIF braucht einen Browser, der es öffnen kann. Diese Formate werden in Ihrem Browser zuerst in ein PNG umgewandelt.`,
        ],
      },
    ],
    faq: [
      { q: `Wie wandle ich HEIC in JPG um?`, a: `Legen Sie die HEIC-Datei im Werkzeug ab, lassen Sie das Format auf JPG und klicken Sie auf „Umwandeln“. Es funktioniert in Ihrem Browser.` },
      { q: `Geht beim Konvertieren Qualität verloren?`, a: `PNG ist verlustfrei. JPG und WebP sind verlustbehaftet, werden aber in hoher Qualität gespeichert, die Änderung ist bei einem Foto also kaum zu sehen.` },
      { q: `Kann ich eine PDF erstellen?`, a: `Ja, wählen Sie PDF, um pro Bild eine PDF zu erhalten. Um mehrere Bilder in einer einzigen PDF zu vereinen, nutzen Sie „Bilder zu einer PDF zusammenfassen“.` },
    ],
  },

  'how-to-combine-images-into-one-pdf': {
    title: `Bilder zu einer PDF zusammenfassen`,
    seoTitle: `Bilder zu einer PDF zusammenfassen (kostenlos, sortierbar)`,
    description: `Mehrere JPG-, PNG- oder WebP-Bilder in einer einzigen PDF vereinen, die Seitenreihenfolge festlegen und A4- oder bildgroße Seiten wählen. Im Browser.`,
    intro: `Um Bilder zu einer PDF zusammenzufassen, ziehen Sie sie in das Werkzeug „Bilder zu einer PDF zusammenfassen“, bringen sie mit „Hoch“ und „Runter“ in Reihenfolge, wählen den Seitenstil und klicken auf „PDF erstellen“. Jedes Bild wird eine Seite.`,
    steps: [
      `Öffnen Sie das Werkzeug „Bilder zu einer PDF zusammenfassen“ und legen Sie Ihre Bilder ab. Sie können jederzeit weitere hinzufügen.`,
      `Bringen Sie sie mit „Hoch“ und „Runter“ in die gewünschte Reihenfolge und entfernen Sie alle, die Sie nicht brauchen.`,
      `Wählen Sie „A4 mit Rändern“ oder „Jede Seite so groß wie ihr Bild“.`,
      `Klicken Sie auf „PDF erstellen“ und laden Sie die Datei herunter.`,
    ],
    sections: [
      {
        h: `A4-Seiten oder bildgroße Seiten`,
        p: [
          `A4 mit Rändern ist am besten, wenn Sie die PDF drucken oder als Dokument versenden, weil jede Seite gleich groß ist. Seiten, die zum jeweiligen Bild passen, sind besser, wenn die Bilder unterschiedliche Formen haben und Sie keinen weißen Rand wollen.`,
          `Bilder werden nicht verzerrt. Sie werden an die Seite angepasst und zentriert.`,
        ],
      },
      {
        h: `Die PDF klein halten`,
        p: [
          `Die PDF ist nur so klein wie die Bilder, die hineinkommen. Ist sie zu groß für eine E-Mail, komprimieren Sie zuerst die Bilder und fassen Sie sie dann zusammen.`,
          `Ein transparenter Bereich erscheint auf der Seite weiß. Wollen Sie statt einer PDF für alle lieber je eine eigene PDF pro Bild, nutzen Sie das Werkzeug „Bilder konvertieren“ mit PDF als Format.`,
        ],
      },
      {
        h: `Tipps für eine saubere PDF`,
        p: [
          `Drehen Sie quer liegende Fotos zuerst mit dem Werkzeug „Drehen und spiegeln“, damit jede Seite aufrecht steht. Es ist viel einfacher, die Bilder zu korrigieren als nachher die Seiten.`,
          `Benennen Sie Ihre Dateien so, dass sie der Reihe nach sortiert werden, und prüfen Sie die Reihenfolge in der Liste, bevor Sie auf „PDF erstellen“ klicken. Die Seiten folgen der Liste von oben nach unten.`,
        ],
      },
    ],
    faq: [
      { q: `Kann ich die Seitenreihenfolge ändern?`, a: `Ja. Nutzen Sie „Hoch“ und „Runter“ neben jedem Bild und entfernen Sie die, die Sie nicht brauchen.` },
      { q: `Funktioniert es mit iPhone-Fotos?`, a: `Ja. HEIC-Fotos lassen sich als Eingabe öffnen und kommen in die PDF.` },
      { q: `Werden meine Bilder hochgeladen?`, a: `Nein. Die PDF wird in Ihrem Browser erstellt und verlässt nie Ihr Gerät.` },
    ],
  },
};
