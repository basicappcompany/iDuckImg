import type { GuideText } from './types';

/** French guides 18 to 25. */
export const frGuidesC: Record<string, GuideText> = {
  'how-to-calculate-an-aspect-ratio': {
    title: `Comment calculer un rapport d'aspect`,
    seoTitle: `Calculer un rapport d'aspect (16:9, 4:3, 1:1)`,
    description: `Trouvez le rapport d'aspect de n'importe quelle largeur et hauteur, ou la hauteur ou la largeur correspondant à un rapport. Un calculateur gratuit avec les rapports courants.`,
    intro: `Pour calculer un rapport d'aspect, divisez la largeur et la hauteur par leur plus grand diviseur commun. 1920 par 1080 donne 16:9. Le Calculateur de rapport d'aspect le fait pour vous, et trouve aussi le côté manquant quand vous voulez conserver un rapport.`,
    steps: [
      `Ouvrez le Calculateur de rapport d'aspect et saisissez une largeur et une hauteur en pixels. Le rapport le plus simple s'affiche.`,
      `Pour redimensionner selon un rapport, choisissez-en un comme 16:9, 4:3 ou 1:1, ou saisissez le vôtre.`,
      `Saisissez la nouvelle largeur et la hauteur suit, ou saisissez la hauteur et la largeur suit.`,
      `Utilisez ces nombres dans l'outil Redimensionner des images ou Recadrer des images.`,
    ],
    sections: [
      {
        h: `Rapports courants et leurs usages`,
        p: [
          `Le carré 1:1 sert aux photos de profil. Le 16:9 est celui de la vidéo et de la plupart des écrans, le 4:3 celui des anciens écrans et de nombreux appareils photo, et le 3:2 celui des reflex et des tirages de 4 par 6 pouces. Le 9:16 est celui des stories et des vidéos courtes, et le 4:5 celui des publications Instagram en portrait.`,
          `Le calculateur les liste avec leur usage, pour que vous puissiez choisir celui qu'un site demande.`,
        ],
      },
      {
        h: `Quand une taille est seulement proche d'un rapport`,
        p: [
          `Certaines tailles sont presque, mais pas exactement, un rapport courant. 1366 par 768 donne 683:384, ce qui est à une fraction de pour cent de 16:9. Le calculateur montre les deux, pour que vous sachiez que c'est proche et non exact.`,
          `Les hauteurs et les largeurs sont arrondies au pixel entier quand vous redimensionnez selon un rapport.`,
        ],
      },
    ],
    faq: [
      { q: `Quel est le rapport d'aspect de 1920 x 1080 ?`, a: `16:9. Divisez les deux par 120, leur plus grand diviseur commun, et vous obtenez 16 et 9.` },
      { q: `Comment conserver le rapport quand je redimensionne ?`, a: `Choisissez le rapport et saisissez la nouvelle largeur. La hauteur se calcule ainsi : largeur multipliée par la hauteur du rapport, divisée par la largeur du rapport.` },
      { q: `Cela change-t-il mon image ?`, a: `Non. C'est un calculateur et il n'utilise aucun fichier.` },
    ],
  },
  'how-to-adjust-the-colours-of-a-photo': {
    title: `Comment régler la luminosité, le contraste et les couleurs, ou passer une photo en noir et blanc`,
    seoTitle: `Photo en noir et blanc ou réglage de la luminosité`,
    description: `Changez la luminosité, le contraste et l'intensité des couleurs, ou appliquez noir et blanc, sépia ou négatif. Aperçu en direct, dans votre navigateur, sans envoi.`,
    intro: `Pour passer une photo en noir et blanc, déposez-la dans l'outil Ajuster les couleurs et les filtres, choisissez le filtre "Black and white" et appuyez sur "Apply". Le même outil règle la luminosité, le contraste et l'intensité des couleurs, avec un aperçu en direct.`,
    steps: [
      `Ouvrez l'outil Ajuster les couleurs et les filtres et déposez vos images.`,
      `Déplacez les curseurs "Brightness", "Contrast" et "Colour strength", ou choisissez un filtre comme "Black and white".`,
      `Regardez l'aperçu en direct, et utilisez "Reset" si vous voulez recommencer.`,
      `Appuyez sur "Apply" et téléchargez les fichiers, ou tous dans un ZIP.`,
    ],
    sections: [
      {
        h: `Ce que fait chaque réglage`,
        p: [
          `La luminosité éclaircit ou assombrit l'ensemble. Le contraste éloigne ou rapproche les zones claires et sombres. L'intensité des couleurs les renforce, ou les ramène vers le gris, et les filtres donnent le noir et blanc, le sépia (un brun chaud de photo ancienne) ou un négatif.`,
          `La luminosité et le contraste sont appliqués d'abord, puis l'intensité des couleurs, puis le filtre. Avancez par petits pas, car de grands changements aplatissent ou brûlent les détails.`,
        ],
      },
      {
        h: `Lots et types de fichiers`,
        p: [
          `Les mêmes changements s'appliquent à chaque image ajoutée : tout un dossier peut donc passer en noir et blanc d'un coup. L'aperçu montre la première image.`,
          `Les zones transparentes d'un PNG restent transparentes. Chaque image est enregistrée dans son propre format, et le JPG et le WebP sont réenregistrés en haute qualité.`,
        ],
      },
      {
        h: `Astuces`,
        p: [
          `Changez un seul curseur à la fois et regardez l'aperçu. Il est facile de pousser ensemble la luminosité et le contraste jusqu'à perdre les détails dans les parties les plus claires et les plus sombres.`,
          `Pour un noir et blanc plus percutant, choisissez "Black and white", puis ajoutez un peu de contraste. Pour un effet photo ancienne, le sépia avec une luminosité un peu plus basse fonctionne bien.`,
        ],
      },
    ],
    faq: [
      { q: `Comment passer une image en noir et blanc ?`, a: `Choisissez le filtre "Black and white" et appuyez sur "Apply". Faire glisser "Colour strength" tout en bas donne un résultat voisin.` },
      { q: `Comment éclaircir une photo sombre ?`, a: `Déplacez le curseur "Brightness" vers la droite, et ajoutez un peu de contraste si elle paraît plate.` },
      { q: `Mon image est-elle envoyée quelque part ?`, a: `Non. Les changements sont faits dans votre navigateur.` },
    ],
  },
  'how-to-add-a-border-to-a-picture': {
    title: `Comment ajouter une bordure ou un cadre à une image`,
    seoTitle: `Ajouter une bordure ou un cadre à une image (toute couleur)`,
    description: `Mettez une bordure blanche, noire ou colorée autour d'une image, ou une bordure transparente. Choisissez l'épaisseur et voyez l'aperçu. Dans votre navigateur.`,
    intro: `Pour ajouter une bordure à une image, déposez-la dans l'outil Ajouter une bordure ou un cadre, réglez l'épaisseur, choisissez une couleur et appuyez sur "Add border". La bordure entoure l'image : rien n'est coupé et le résultat est un peu plus grand.`,
    steps: [
      `Ouvrez l'outil Ajouter une bordure ou un cadre et déposez vos images.`,
      `Réglez l'épaisseur de la bordure.`,
      `Choisissez "White", "Black", "Yellow", "Transparent", ou saisissez votre propre code de couleur comme #1e90ff.`,
      `Vérifiez l'aperçu, appuyez sur "Add border" et téléchargez le résultat.`,
    ],
    sections: [
      {
        h: `Une épaisseur qui s'adapte`,
        p: [
          `L'épaisseur est une part du plus petit côté de l'image : la bordure a donc le même aspect sur une petite photo et sur une grande du même lot.`,
          `Comme la bordure est ajoutée à l'extérieur, l'image garde tout son contenu. C'est différent de dessiner par-dessus le bord, ce qui en cacherait une partie.`,
        ],
      },
      {
        h: `Bordures transparentes`,
        p: [
          `Une bordure transparente demande un format qui gère la transparence : un JPG devient donc un PNG quand vous la choisissez. Les autres images gardent leur propre format.`,
          `Si vous saisissez un code de couleur non valide, la page vous le dit au lieu de deviner. Utilisez les formes #1e90ff ou #fa0.`,
        ],
      },
      {
        h: `Astuces`,
        p: [
          `Une fine bordure blanche, d'environ 2 à 4 pour cent, donne un rendu net d'impression ou de galerie. Une bordure plus épaisse dans une couleur vive fait un cadre pour une publication sur les réseaux sociaux.`,
          `Si vous comptez imprimer l'image, souvenez-vous qu'une bordure rend le fichier plus grand que l'original : comparez donc la taille finale avec le papier ou le cadre que vous avez en tête.`,
        ],
      },
    ],
    faq: [
      { q: `Comment ajouter une bordure blanche à une photo ?`, a: `Déposez la photo, laissez la couleur sur "White", réglez l'épaisseur et appuyez sur "Add border".` },
      { q: `La bordure recouvre-t-elle mon image ?`, a: `Non. Elle est ajoutée à l'extérieur : l'image est donc complète et le résultat est plus grand.` },
      { q: `La bordure peut-elle être transparente ?`, a: `Oui. Choisissez "Transparent". Le résultat est un PNG, car le JPG ne peut pas être transparent.` },
    ],
  },
  'how-to-get-a-hex-color-from-an-image': {
    title: `Comment obtenir le code couleur HEX d'une image`,
    seoTitle: `Obtenir le code couleur HEX d'une image (pipette)`,
    description: `Cliquez sur une image pour obtenir la couleur exacte en HEX, RGB et HSL, avec copie en un clic. Utilisable aussi au clavier. Dans votre navigateur.`,
    intro: `Pour obtenir le code HEX d'une couleur d'une image, déposez-la dans la Pipette de couleur d'une image, survolez l'image pour prévisualiser la couleur et cliquez pour la choisir. Les codes HEX, RGB et HSL apparaissent, chacun avec un bouton "Copy".`,
    steps: [
      `Ouvrez la Pipette de couleur d'une image et déposez une image.`,
      `Survolez l'image pour prévisualiser la couleur sous le pointeur.`,
      `Cliquez ou touchez pour la choisir, puis appuyez sur "Copy" à côté du code dont vous avez besoin.`,
      `Choisissez autant de couleurs que vous voulez. Les dix dernières restent en dessous pour que vous puissiez y revenir.`,
    ],
    sections: [
      {
        h: `HEX, RGB et HSL`,
        p: [
          `Ce sont trois façons d'écrire la même couleur. Le HEX est le code court utilisé dans les pages web, comme #1E90FF. Le RGB donne les quantités de rouge, de vert et de bleu de 0 à 255, et le HSL donne la teinte, la saturation et la luminosité, plus facile à ajuster à la main.`,
          `Le panneau affiche les trois, pour que vous puissiez coller celui que votre outil de conception ou votre feuille de style attend.`,
        ],
      },
      {
        h: `Obtenir une couleur fiable`,
        p: [
          `Une photo est faite de millions de pixels légèrement différents : deux endroits qui semblent identiques peuvent donc différer de quelques niveaux. Cliquez à plusieurs endroits, ou utilisez plutôt l'outil de palette pour trouver les couleurs principales.`,
          `Sans souris, cliquez une fois sur l'image, puis utilisez les flèches pour vous déplacer et Entrée pour choisir. Si un pixel est transparent, la page vous le dit, car ce que vous voyez à l'écran dépend aussi de ce qu'il y a derrière.`,
        ],
      },
    ],
    faq: [
      { q: `Comment trouver le code HEX d'une couleur dans une image ?`, a: `Déposez l'image, cliquez sur la couleur et copiez le code HEX qui apparaît.` },
      { q: `Pourquoi des pixels voisins donnent-ils des codes différents ?`, a: `Les photos contiennent de minuscules variations. Cliquez à quelques endroits ou utilisez l'outil de palette pour voir les couleurs principales.` },
      { q: `Mon image est-elle envoyée quelque part ?`, a: `Non. La couleur est lue dans votre navigateur.` },
    ],
  },
  'how-to-get-a-color-palette-from-an-image': {
    title: `Comment obtenir une palette de couleurs à partir d'une image`,
    seoTitle: `Obtenir une palette de couleurs d'une image (HEX, CSS)`,
    description: `Extrayez les couleurs principales d'une image avec leurs codes HEX et la part de l'image que chacune couvre. Copiez-les en liste ou en variables CSS.`,
    intro: `Pour obtenir une palette de couleurs à partir d'une image, déposez-la dans le Générateur de palette de couleurs. Les couleurs principales apparaissent en échantillons avec leurs codes HEX et la part de l'image que chacune couvre, et vous pouvez les copier en liste ou en CSS.`,
    steps: [
      `Ouvrez le Générateur de palette de couleurs et déposez une image.`,
      `Les couleurs principales apparaissent tout de suite. Utilisez le curseur pour en demander moins ou plus, de 2 à 12.`,
      `Cliquez sur un échantillon pour copier son code HEX.`,
      `Ou copiez toute la palette en liste ou en variables CSS.`,
    ],
    sections: [
      {
        h: `Comment les couleurs sont choisies`,
        p: [
          `Les pixels proches sont regroupés et chaque groupe est moyenné en une seule couleur : une couleur qui remplit l'essentiel de l'image vient donc en premier. Le pourcentage sur un échantillon est la part de l'image que ce groupe couvre.`,
          `Les pixels entièrement ou presque transparents sont ignorés : un logo sur fond transparent donne donc les couleurs du logo, pas un noir vide.`,
        ],
      },
      {
        h: `Utiliser la palette`,
        p: [
          `"Copy as CSS variables" donne des propriétés personnalisées comme --colour-1 que vous pouvez coller directement dans une feuille de style. La liste simple est pratique pour des notes ou un outil de conception.`,
          `Si l'image a moins de couleurs distinctes que vous n'en avez demandé, vous n'obtenez que celles qu'elle contient. Un logo de trois couleurs donne trois échantillons, pas douze. Pour une couleur exacte, utilisez plutôt la pipette de couleur.`,
        ],
      },
      {
        h: `Astuces`,
        p: [
          `Prenez une image qui a l'ambiance voulue. Une palette ne vaut que par l'image dont elle vient, et une photo de coucher de soleil donne des couleurs très différentes d'une photo de produit.`,
          `Choisissez deux ou trois couleurs de la palette plutôt que toutes. La plupart des designs fonctionnent mieux avec une couleur principale, une couleur d'accent et un neutre, et les pourcentages montrent quelles couleurs sont les meilleures candidates.`,
        ],
      },
    ],
    faq: [
      { q: `Combien de couleurs puis-je obtenir ?`, a: `De 2 à 12. Six est un bon départ pour une palette de marque ou de design.` },
      { q: `Puis-je utiliser la palette sur mon site web ?`, a: `Oui. Copiez en variables CSS et collez le résultat dans votre feuille de style.` },
      { q: `Mon image est-elle envoyée quelque part ?`, a: `Non. Les couleurs sont calculées dans votre navigateur.` },
    ],
  },
  'how-to-convert-an-image-to-base64': {
    title: `Comment convertir une image en Base64 (et inversement)`,
    seoTitle: `Convertir une image en Base64 et la décoder`,
    description: `Transformez une image en data URI Base64 pour du HTML ou du CSS, ou collez du Base64 pour récupérer l'image. Dans votre navigateur, rien n'est envoyé.`,
    intro: `Pour convertir une image en Base64, déposez-la dans l'outil Image en Base64 et copiez le résultat. Par défaut, c'est un data URI que vous pouvez coller dans du HTML ou du CSS. Pour revenir en arrière, choisissez "Base64 to image", collez le texte et téléchargez l'image.`,
    steps: [
      `Ouvrez l'outil Image en Base64 et choisissez "Image to Base64".`,
      `Déposez l'image. Le fichier d'origine est encodé tel quel : un SVG reste donc un SVG.`,
      `Choisissez le format voulu : un data URI, du Base64 simple, un arrière-plan CSS ou une balise image HTML, puis appuyez sur "Copy".`,
      `Pour décoder, choisissez "Base64 to image", collez le texte et téléchargez l'image.`,
    ],
    sections: [
      {
        h: `Quand le Base64 est une bonne idée`,
        p: [
          `Le Base64 écrit les octets d'un fichier sous forme de texte simple : une petite image peut donc se trouver dans une page web, une feuille de style ou un e-mail sans fichier séparé. Le texte est environ un tiers plus long que le fichier.`,
          `Il convient aux petites images comme les icônes et les logos. Pour une grande photo, le texte devient très long et un fichier d'image normal se charge plus vite : l'outil vous avertit donc au-delà de 100 Ko.`,
        ],
      },
      {
        h: `Recoller du Base64`,
        p: [
          `Vous pouvez coller un data URI complet ou seulement les caractères Base64. L'outil lit le type d'image dans les données elles-mêmes (PNG, JPG, GIF, WebP, BMP, AVIF, SVG ou ICO) et s'y fie plus qu'à une étiquette erronée.`,
          `Si le texte a été coupé à la copie, ou n'est pas une image, vous recevez un message clair qui le dit, au lieu d'un téléchargement cassé.`,
        ],
      },
    ],
    faq: [
      { q: `Qu'est-ce qu'un data URI ?`, a: `Une façon de placer un fichier dans une adresse web. Il commence par data:, le type de fichier et ;base64, suivis du texte Base64.` },
      { q: `Pourquoi le texte Base64 est-il plus gros que le fichier ?`, a: `Le Base64 utilise quatre caractères de texte pour trois octets : le texte est donc environ 33 pour cent plus long.` },
      { q: `Mon image est-elle envoyée quelque part ?`, a: `Non. L'encodage et le décodage se font dans votre navigateur.` },
    ],
  },
  'how-to-make-a-favicon': {
    title: `Comment créer un favicon pour votre site web`,
    seoTitle: `Créer un favicon (favicon.ico, PNG, icône Apple touch)`,
    description: `Créez favicon.ico, des PNG de 16 et 32 pixels, une icône Apple touch et des icônes Android à partir d'une image, avec le code à coller dans votre page.`,
    intro: `Pour créer un favicon, déposez une image dans le Générateur de favicon et appuyez sur "Make favicons". Vous obtenez favicon.ico, des PNG de 16 et 32 pixels, une icône Apple touch et deux icônes Android, avec le code à coller dans votre page.`,
    steps: [
      `Ouvrez le Générateur de favicon et déposez une image. Une image carrée de 512 pixels ou plus donne le meilleur résultat.`,
      `Si elle n'est pas carrée, choisissez de la couper en carré depuis le milieu, ou de la garder entière avec des bandes transparentes.`,
      `Appuyez sur "Make favicons" et téléchargez les fichiers, ou tous dans un ZIP.`,
      `Placez les fichiers à la racine de votre site et collez le code affiché dans l'en-tête (head) de vos pages.`,
    ],
    sections: [
      {
        h: `Ce que vous obtenez`,
        p: [
          `favicon.ico contient les versions de 16, 32 et 48 pixels dans un seul fichier. favicon-16x16.png et favicon-32x32.png servent aux onglets du navigateur, apple-touch-icon.png (180 pixels) aux iPhone et aux iPad, et les icônes de 192 et 512 pixels à Android et aux applications web installables.`,
          `L'aperçu montre votre icône à 16, 32 et 64 pixels pour que vous puissiez la vérifier avant de télécharger.`,
        ],
      },
      {
        h: `Qu'elle reste belle en petit`,
        p: [
          `Un favicon est minuscule : une forme simple aux couleurs franches se lit le mieux. Les images détaillées deviennent de la bouillie à 16 pixels, alors partez d'un logo simple ou d'une seule lettre.`,
          `Une image de moins de 512 pixels est agrandie pour les plus grandes icônes et peut paraître floue, et la page vous prévient quand cela arrive. Un fond transparent est conservé.`,
        ],
      },
    ],
    faq: [
      { q: `De quels fichiers un site web a-t-il besoin pour un favicon ?`, a: `Un favicon.ico, des PNG de 16 et 32 pixels pour les onglets, une icône Apple touch de 180 pixels, et des icônes de 192 et 512 pixels pour Android. L'outil les crée tous.` },
      { q: `Quelle taille doit avoir mon image ?`, a: `Carrée et d'au moins 512 par 512 pixels. Des images plus petites fonctionnent, mais les grandes icônes paraissent floues.` },
      { q: `Le favicon.ico est-il un vrai fichier ICO ?`, a: `Oui. Il contient les icônes de 16, 32 et 48 pixels dans un fichier ICO standard.` },
    ],
  },
  'are-online-image-tools-safe': {
    title: `Les outils d'image en ligne sont-ils sûrs ? Comment vérifier le vôtre`,
    seoTitle: `Les outils d'image en ligne sont-ils sûrs ? Vérifiez`,
    description: `Beaucoup d'outils d'image en ligne envoient votre photo à un serveur. Voici comment le savoir, le vérifier en deux minutes, et ce que fait iDuckImg à la place.`,
    intro: `Un outil d'image en ligne n'est aussi privé que l'endroit où il fait son travail. Beaucoup envoient votre photo à un serveur ; iDuckImg fait le travail dans votre navigateur : le fichier reste donc sur votre appareil. Vous pouvez le vérifier vous-même dans l'onglet Réseau du navigateur.`,
    steps: [
      `Ouvrez la page de l'outil, puis les outils de développement de votre navigateur (F12) et choisissez l'onglet Réseau.`,
      `Videz la liste, puis déposez une image dans l'outil et lancez-le.`,
      `Cherchez les grosses requêtes qui transportent votre image, en général affichées comme POST ou PUT. Un outil qui travaille sur votre appareil n'en montre aucune.`,
      `Lisez la politique de confidentialité de tout outil que vous utilisez, et vérifiez ce qu'elle dit conserver et pendant combien de temps.`,
    ],
    sections: [
      {
        h: `Pourquoi c'est important`,
        p: [
          `Une photo peut contenir des visages, des documents, un numéro de maison et des détails cachés comme l'endroit exact où elle a été prise. L'envoyer remet une copie à quelqu'un d'autre, et vous ne voyez pas ce qui se passe ensuite.`,
          `Les outils qui fonctionnent dans votre navigateur évitent cela, car votre fichier est traité par votre propre appareil et n'est jamais envoyé. Ils ont aussi tendance à être plus rapides, puisqu'il n'y a ni envoi ni téléchargement.`,
        ],
      },
      {
        h: `Ce que fait iDuckImg`,
        p: [
          `Chaque outil iDuckImg fonctionne dans votre navigateur. Vos images ne sont pas envoyées, il n'y a pas d'inscription et aucun filigrane n'est ajouté. La page charge son propre code et ses propres fichiers depuis le même site, et, pour certains formats comme le HEIC, un décodeur provenant du même site. Elle n'envoie aucune requête à d'autres entreprises.`,
          `À faire quand même : retirez les données de position cachées avant de partager une photo, et utilisez "Cover" plutôt qu'un flou léger pour masquer tout ce qui est privé. Les outils Supprimer les données EXIF et Flouter ou masquer des parties d'une image font ces tâches sur votre appareil.`,
        ],
      },
    ],
    faq: [
      { q: `Comment savoir si un outil envoie ma photo ?`, a: `Ouvrez l'onglet Réseau des outils de développement de votre navigateur, lancez l'outil et cherchez une grosse requête qui transporte votre image. S'il n'y en a pas, le travail s'est fait sur votre appareil.` },
      { q: `iDuckImg envoie-t-il mes images ?`, a: `Non. Chaque outil fonctionne dans votre navigateur et vos fichiers restent sur votre appareil.` },
      { q: `Peut-on partager une photo sans risque après l'avoir modifiée ?`, a: `Retirez d'abord les données de position et d'appareil cachées, et masquez tout ce qui est privé dans l'image elle-même avec un bloc uni.` },
    ],
  },
};
