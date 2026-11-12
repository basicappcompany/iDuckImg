import type { GuideLocale } from './types';
import { deGuidesA } from './de-a';
import { deGuidesB } from './de-b';
import { deGuidesC } from './de-c';

/** German how-to guides: the page chrome and every guide, keyed by slug. */
export const deGuides: GuideLocale = {
  chrome: {
    home: `Startseite`,
    guides: `Anleitungen`,
    quickAnswer: `Kurze Antwort`,
    openTool: `{tool} öffnen`,
    steps: `Schritte`,
    commonQuestions: `Häufige Fragen`,
    writtenBy: `Verfasst von Basic App Company. Zuletzt am {date} mit dem Werkzeug abgeglichen. Das Werkzeug läuft in Ihrem Browser, Ihre Bilder werden also nicht hochgeladen.`,
    relatedGuides: `Verwandte Anleitungen`,
    allGuides: `Alle Anleitungen`,
    hubTitle: `Bild-Anleitungen: komprimieren, skalieren, konvertieren und mehr`,
    hubDescription: `Kurze, praktische Anleitungen für die am häufigsten gesuchten Bildaufgaben: komprimieren, skalieren, zuschneiden, konvertieren, Wasserzeichen setzen, versteckte Daten entfernen und mehr. Jede verlinkt das kostenlose Werkzeug dafür.`,
    hubBefore: `Bild-`,
    hubMark: `Anleitungen`,
    hubAfter: ``,
    hubIntro: `Kurze, praktische Anleitungen für die am häufigsten gesuchten Bildaufgaben. Jede nennt zuerst die Antwort, dann die Schritte und verlinkt das kostenlose Werkzeug, das die Arbeit in Ihrem Browser erledigt.`,
    hubListName: `Bild-Anleitungen`,
    hubListLabel: `Anleitungen`,
  },
  guides: { ...deGuidesA, ...deGuidesB, ...deGuidesC },
};
