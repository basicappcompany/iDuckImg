import type { GuideLocale } from './types';
import { frGuidesA } from './fr-a';
import { frGuidesB } from './fr-b';
import { frGuidesC } from './fr-c';

/** French how-to guides: page chrome plus the 25 guides. */
export const frGuides: GuideLocale = {
  chrome: {
    home: `Accueil`,
    guides: `Guides pratiques`,
    quickAnswer: `Réponse rapide`,
    openTool: `Ouvrir {tool}`,
    steps: `Étapes`,
    commonQuestions: `Questions fréquentes`,
    writtenBy: `Rédigé par Basic App Company. Dernière vérification avec l'outil le {date}. L'outil fonctionne dans votre navigateur : vos images ne sont donc pas envoyées.`,
    relatedGuides: `Guides associés`,
    allGuides: `Tous les guides pratiques`,
    hubTitle: `Guides pratiques pour images : compresser, redimensionner, convertir et plus`,
    hubDescription: `De courts guides pratiques pour les tâches d'image les plus recherchées : compresser, redimensionner, recadrer, convertir, filigraner, supprimer les données cachées et plus. Chacun renvoie à l'outil gratuit qui fait le travail.`,
    hubBefore: `Guides `,
    hubMark: `pratiques`,
    hubAfter: ` pour images`,
    hubIntro: `De courtes explications pas à pas pour les tâches d'image les plus recherchées. Chacune donne d'abord la réponse, puis les étapes, et renvoie à l'outil gratuit qui fait le travail dans votre navigateur.`,
    hubListName: `Guides pratiques pour images`,
    hubListLabel: `Guides`,
  },
  guides: { ...frGuidesA, ...frGuidesB, ...frGuidesC },
};
