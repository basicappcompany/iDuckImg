import type { ShortcutText } from './types';

export const fr: ShortcutText = {
  chrome: {
    howToUse: `Comment l’utiliser`,
    related: `À voir aussi`,
    quickTools: `Outils rapides`,
    community: `Communauté`,
    alsoFrom: `Aussi chez iDuck`,
    iduckpdf: `iDuckPDF : outils PDF`,
    communityPages: {
      roadmap: `Feuille de route`,
      request: `Demander une fonction`,
      feedback: `Envoyer un avis`,
      support: `Soutenir iDuckIMG`,
      settings: `Réglages`,
      about: `À propos`,
    },
    groups: {
      compress: `Compresser et redimensionner`,
      convert: `Convertir un format`,
      other: `Ouvrir d’autres formats`,
      pdf: `Créer un PDF`,
      forms: `Photos pour formulaires`,
      edit: `Retouches rapides`,
    },
  },
  kb: {
    name: `Compresser une image à {kb} Ko`,
    title: `Compresser une image à {kb} Ko en ligne, gratuit`,
    description: `Réduisez une photo JPG, PNG ou WebP à {kb} Ko ou moins, gratuitement, dans votre navigateur. Sans envoi, sans inscription, sans filigrane.`,
    summary: `Réduisez une photo à {kb} Ko ou moins, directement dans votre navigateur.`,
    quick: `Pour compresser une image à {kb} Ko, déposez-la et appuyez sur « {run} » : la cible est déjà réglée sur {kb} Ko et l’outil cherche la meilleure qualité qui tienne. Tout se passe sur votre appareil, l’image n’est donc jamais envoyée.`,
    steps: [
      `Déposez votre image JPG, PNG ou WebP, ou collez-la depuis le presse-papiers.`,
      `La taille visée est déjà réglée sur {kb} Ko et la taille en pixels est conservée.`,
      `Appuyez sur « {run} ». L’outil essaie plusieurs niveaux de qualité et garde le meilleur qui tienne.`,
      `Vérifiez la taille du résultat dans la liste, puis téléchargez-le.`,
    ],
    faqs: [
      {
        q: `Comment passer sous {kb} Ko sans abîmer la photo ?`,
        a: `Laissez d’abord la taille en pixels telle quelle. L’outil baisse la qualité du JPG ou du WebP pas à pas jusqu’à ce que le fichier fasse {kb} Ko ou moins. Ce n’est que si cela ne suffit pas qu’il faut aussi réduire la largeur.`,
      },
      {
        q: `Mon image est-elle envoyée quelque part ?`,
        a: `Non. La compression se fait dans l’onglet de votre navigateur. Le fichier n’est pas envoyé à nos serveurs : cela convient donc aussi aux photos et documents privés.`,
      },
      {
        q: `Le résultat dépasse {kb} Ko. Que faire ?`,
        a: `L’image compte trop de pixels pour tenir en {kb} Ko avec une qualité correcte. Ouvrez l’outil de redimensionnement, choisissez une largeur plus petite (par exemple 800 pixels), gardez la cible à {kb} Ko et relancez.`,
      },
    ],
  },
  convert: {
    name: `{from} vers {to}`,
    h1: `Convertisseur {from} vers {to}`,
    title: `{from} vers {to} : convertisseur en ligne gratuit`,
    description: `Convertissez du {from} en {to} gratuitement dans votre navigateur. Sans envoi, sans inscription, sans filigrane. Fonctionne sur mobile et ordinateur.`,
    summary: `Transformez vos fichiers {from} en {to} en quelques secondes.`,
    quick: `Pour convertir du {from} en {to}, déposez vos fichiers {from}, vérifiez que le format indique {to} et appuyez sur « {run} ». {why} Tout se passe dans votre navigateur : rien n’est envoyé.`,
    steps: [
      `Déposez vos fichiers {from} ou touchez la zone pour les choisir. Vous pouvez en ajouter plusieurs à la fois.`,
      `Le format de sortie est déjà réglé sur {to}.`,
      `Appuyez sur « {run} ».`,
      `Téléchargez chaque fichier, ou tous ensemble dans un ZIP.`,
    ],
    faqs: [
      {
        q: `Puis-je convertir des images privées ici en toute sécurité ?`,
        a: `La conversion se fait dans votre navigateur : les images ne sont pas envoyées à nos serveurs.`,
      },
      {
        q: `Puis-je convertir beaucoup de fichiers à la fois ?`,
        a: `Oui. Ajoutez-en autant que votre appareil le permet et téléchargez-les ensemble dans un ZIP.`,
      },
    ],
  },
  why: {
    'heic-to-jpg': `Le HEIC est le format des iPhone par défaut, et le JPG s’ouvre sur tous les appareils et tous les sites.`,
    'heic-to-png': `Le PNG garde chaque pixel tel quel et s’ouvre partout.`,
    'png-to-jpg': `Les fichiers JPG sont en général bien plus légers que les PNG pour les photos.`,
    'jpg-to-png': `Le PNG est sans perte : c’est un format sûr pour modifier et réenregistrer.`,
    'webp-to-jpg': `Le JPG s’ouvre dans tous les programmes, alors que certains éditeurs et formulaires refusent encore le WebP.`,
    'webp-to-png': `Le PNG garde la transparence et s’ouvre dans tous les éditeurs.`,
    'jpg-to-webp': `Le WebP est en général 25 à 35 % plus léger que le JPG à qualité similaire, ce qui accélère le chargement des pages.`,
    'png-to-webp': `Le WebP est bien plus léger que le PNG et peut garder la transparence.`,
    'jpg-to-pdf': `Chaque image devient une page du PDF, de la même taille que l’image.`,
    'png-to-pdf': `Chaque image devient une page du PDF.`,
    'avif-to-jpg': `Le JPG s’ouvre partout, y compris dans les formulaires, les éditeurs et les anciens téléphones qui ne savent pas afficher l’AVIF.`,
    'avif-to-png': `Le PNG s’ouvre dans tous les éditeurs et garde tout fond transparent.`,
    'svg-to-png': `Le PNG est une image ordinaire que tout programme, formulaire ou réseau social accepte, et il garde le fond transparent.`,
    'svg-to-jpg': `Le JPG est un format de photo léger et universel, et le SVG est dessiné net avant l’enregistrement.`,
    'bmp-to-jpg': `Un BMP est stocké sans compression : le JPG n’en représente donc souvent qu’une petite fraction.`,
    'gif-to-png': `Vous obtenez une image fixe nette du GIF, qui garde tout fond transparent.`,
  },
  exam: {
    name: `{short} : taille de {what}`,
    title: `{short} : taille de {what} en px et Ko`,
    description: `Redimensionnez votre {what} à {req} pour {short}, d’après l’avis officiel. Gratuit, dans votre navigateur, sans envoi.`,
    summary: `Mettez votre {what} {short} à {size}.`,
    quick: `Pour redimensionner votre {what} pour {short}, déposez-la et appuyez sur « {run} » : l’outil est déjà réglé sur {req}, comme dans l’avis officiel. Tout se passe dans votre navigateur : l’image n’est jamais envoyée.`,
    steps: [
      `Déposez votre {what} ou touchez la zone pour la choisir. Les photos HEIC d’un iPhone fonctionnent aussi.`,
      `{exam} et {doc} sont déjà choisis : la taille est réglée sur {req}.`,
      `Appuyez sur « {run} ».`,
      `Vérifiez la taille dans la liste, puis téléchargez le JPG et envoyez-le dans le formulaire.`,
    ],
    faqs: [
      {
        q: `Quelle taille doit avoir la {what} pour {short} ?`,
        a: `{exam} demande {req}. Cela provient de {source} ({location}).`,
      },
      {
        q: `Comment le fichier atteint-il la bonne taille ?`,
        a: `Il est ajusté à la taille puis enregistré en JPG avec la meilleure qualité restant sous le maximum. Tout se passe dans votre navigateur : l’image n’est jamais envoyée.`,
      },
      {
        q: `Ces chiffres sont-ils toujours d’actualité ?`,
        a: `Ils ont été lus dans le document officiel le {date}, pour {cycle}. Vérifiez votre propre avis, car les concours changent leurs règles d’une session à l’autre.`,
      },
    ],
  },
  docs: { photo: `photo`, signature: `signature`, 'left-thumb': `empreinte du pouce gauche`, declaration: `déclaration` },
};
