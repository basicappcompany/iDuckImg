import type { GuideText } from './types';

/** French guides 1 to 8. */
export const frGuidesA: Record<string, GuideText> = {
  'how-to-compress-an-image': {
    title: `Comment compresser une image sans perdre en qualité`,
    seoTitle: `Compresser une image sans perte de qualité (gratuit)`,
    description: `Réduisez le poids de vos JPG, PNG et WebP dans votre navigateur. Choisissez une qualité, comparez les tailles avant et après, puis téléchargez. Sans envoi, sans inscription.`,
    intro: `Pour compresser une image, déposez-la dans l'outil Compresser des images, gardez la qualité autour de 75 et appuyez sur "Compresser". Les photos deviennent souvent bien plus légères sans changement visible, et l'image ne quitte jamais votre appareil.`,
    steps: [
      `Ouvrez l'outil Compresser des images et déposez vos fichiers JPG, PNG ou WebP, ou collez-les depuis le presse-papiers.`,
      `Réglez la qualité. Autour de 75, une photo garde le même aspect alors que le fichier devient bien plus léger.`,
      `Appuyez sur "Compresser" et regardez la taille avant et après à côté de chaque fichier.`,
      `Téléchargez chaque fichier, ou tous ensemble dans un seul ZIP.`,
    ],
    sections: [
      {
        h: `Ce qui change selon le type de fichier`,
        p: [
          `Le JPG et le WebP sont compressés avec une qualité réglable : un chiffre plus bas donne un fichier plus petit et un peu moins de détails. Les photos de téléphone pèsent souvent de 3 à 8 Mo, et on peut en retirer la plus grande partie sans différence visible.`,
          `Le PNG, lui, est différent. Il est optimisé sans rien perdre : l'image reste exactement la même, mais le gain est plus faible. Si votre PNG est une photo, la convertir en JPG ou en WebP fera gagner bien plus de place.`,
        ],
      },
      {
        h: `Si vous avez besoin d'une taille précise`,
        p: [
          `Les formulaires demandent souvent une photo de moins d'un certain nombre de kilo-octets. Dans ce cas, utilisez la case de taille visée de l'outil Redimensionner des images, ou ouvrez une page toute prête comme Compresser une image à 100 Ko. L'outil essaie plusieurs niveaux de qualité et garde le meilleur qui tient dans la limite.`,
          `Si un fichier ne peut pas être rendu plus petit, vous récupérez l'original plutôt qu'une version dégradée.`,
        ],
      },
    ],
    faq: [
      { q: `Compresser une image fait-il baisser sa qualité ?`, a: `Le JPG et le WebP perdent un peu de détails quand la qualité baisse, et autour de 75 le changement est difficile à voir. Le PNG est optimisé sans aucune perte.` },
      { q: `Mon image est-elle envoyée quelque part quand je la compresse ?`, a: `Non. Le travail se fait dans votre navigateur, sur votre propre appareil : le fichier n'est envoyé nulle part.` },
      { q: `Puis-je compresser plusieurs images à la fois ?`, a: `Oui. Ajoutez-en autant que vous voulez et téléchargez-les ensemble dans un ZIP.` },
    ],
  },
  'how-to-resize-an-image': {
    title: `Comment redimensionner une image en pixels, en pourcentage ou en poids`,
    seoTitle: `Redimensionner une image : pixels, % ou Ko (gratuit)`,
    description: `Passez une image à des dimensions exactes en pixels, à un pourcentage ou à un poids cible en Ko, dans votre navigateur. Les proportions sont conservées. Sans envoi.`,
    intro: `Pour redimensionner une image, déposez-la dans l'outil Redimensionner des images, saisissez une largeur ou une hauteur en pixels, ou choisissez un pourcentage, puis appuyez sur "Redimensionner". Laissez une case vide et l'autre est calculée pour ne pas déformer l'image.`,
    steps: [
      `Ouvrez l'outil Redimensionner des images et déposez vos fichiers JPG, PNG ou WebP.`,
      `Saisissez une largeur, une hauteur ou un pourcentage. Laissez une case vide pour conserver les proportions.`,
      `Si un formulaire exige un poids de fichier, saisissez une cible en Ko dans "Taille de fichier visée (Ko, facultatif)", par exemple 100.`,
      `Appuyez sur "Redimensionner" et téléchargez le résultat, ou tous les fichiers dans un ZIP.`,
    ],
    sections: [
      {
        h: `Pixels, pourcentage ou kilo-octets ?`,
        p: [
          `Les pixels servent quand un site demande une taille précise comme 1200 par 800. Un pourcentage est plus rapide quand vous voulez simplement réduire, par exemple 50 pour cent. Une cible en Ko répond aux limites d'envoi, et l'outil trouve la meilleure qualité qui convient.`,
          `La taille visée fonctionne pour le JPG et le WebP. Un PNG avec une taille visée est enregistré en WebP, car le PNG est sans perte et ne peut pas échanger de la qualité contre du poids.`,
        ],
      },
      {
        h: `Quand la cible est trop petite`,
        p: [
          `Si la taille demandée est impossible à atteindre avec les dimensions en pixels choisies, vous voyez un message plutôt qu'un mauvais fichier. Essayez avec moins de pixels, puis relancez la cible.`,
          `Agrandir une image n'ajoute pas de détails. Elle est étirée, donc elle peut paraître floue : c'est pourquoi réduire est la direction sûre.`,
        ],
      },
    ],
    faq: [
      { q: `Comment redimensionner sans déformer l'image ?`, a: `Remplissez seulement la largeur ou seulement la hauteur. L'autre côté est calculé d'après les proportions d'origine.` },
      { q: `Puis-je redimensionner à exactement 100 Ko ?`, a: `Oui. Saisissez 100 comme taille visée. L'outil choisit la qualité la plus élevée qui tient en dessous, ou vous dit s'il n'y arrive pas.` },
      { q: `Redimensionner envoie-t-il ma photo quelque part ?`, a: `Non. Tout se passe dans votre navigateur et le fichier reste sur votre appareil.` },
    ],
  },
  'how-to-crop-an-image': {
    title: `Comment recadrer une image sur la zone exacte que vous voulez`,
    seoTitle: `Recadrer une image : glisser, format ou pixels exacts`,
    description: `Recadrez une image en faisant glisser un cadre, en verrouillant un format comme 1:1 ou 16:9, ou en saisissant des pixels exacts. Gratuit, dans votre navigateur, sans envoi.`,
    intro: `Pour recadrer une image, déposez-la dans l'outil Recadrer des images, faites glisser le cadre sur la partie à conserver et appuyez sur "Recadrer". Choisissez une forme comme 1:1 ou 16:9 pour verrouiller les proportions, ou saisissez des pixels exacts.`,
    steps: [
      `Ouvrez l'outil Recadrer des images et déposez une image JPG, PNG ou WebP.`,
      `Faites glisser le cadre et ses poignées sur la partie voulue. Choisissez un format comme 1:1 ou 16:9 si vous en avez besoin d'un.`,
      `Ou saisissez les valeurs de gauche, haut, largeur et hauteur en pixels pour un recadrage exact.`,
      `Appuyez sur "Recadrer" et téléchargez le résultat.`,
    ],
    sections: [
      {
        h: `Choisir un format`,
        p: [
          `Un format garde le cadre dans une forme fixe pendant que vous le déplacez et le redimensionnez. Utilisez 1:1 pour une photo de profil carrée, 16:9 pour les miniatures vidéo et les diaporamas, et 4:3 ou 3:2 pour les tirages photo.`,
          `Si vous ne savez pas quelle forme un site attend, le calculateur de rapport d'aspect transforme une largeur et une hauteur en rapport.`,
        ],
      },
      {
        h: `Régler finement sans souris`,
        p: [
          `Vous pouvez déplacer le cadre avec les flèches du clavier et saisir des valeurs exactes, ce qui marche aussi sur un téléphone où le glisser est peu pratique. L'image recadrée garde son format d'origine.`,
          `Le recadrage retire définitivement la zone extérieure dans le fichier que vous téléchargez : gardez donc votre original si vous voulez pouvoir le retrouver. Comme l'outil ne touche jamais au fichier que vous avez déposé, vous pouvez toujours repartir de lui et essayer un autre cadre.`,
        ],
      },
    ],
    faq: [
      { q: `Comment recadrer en carré ?`, a: `Choisissez la forme 1:1 et placez le cadre sur la partie voulue. Le cadre reste carré quand vous le redimensionnez.` },
      { q: `Puis-je recadrer en pixels exacts ?`, a: `Oui. Saisissez les valeurs de gauche, haut, largeur et hauteur en pixels.` },
      { q: `Recadrer fait-il baisser la qualité ?`, a: `Les pixels que vous gardez ne changent pas. Le JPG et le WebP sont réenregistrés en haute qualité, et le PNG reste sans perte.` },
    ],
  },
  'how-to-add-a-watermark-to-a-photo': {
    title: `Comment ajouter un filigrane texte à une photo`,
    seoTitle: `Ajouter un filigrane texte à une photo (gratuit, sans envoi)`,
    description: `Mettez votre nom ou une mention de copyright sur vos images. Choisissez position, taille, opacité et couleur, ou répétez le texte sur toute l'image. Dans votre navigateur.`,
    intro: `Pour mettre un filigrane sur une photo, déposez-la dans l'outil Ajouter un filigrane, saisissez votre texte, choisissez son emplacement et appuyez sur "Ajouter le filigrane". Vous pouvez le placer dans un coin ou le répéter sur toute l'image.`,
    steps: [
      `Ouvrez l'outil Ajouter un filigrane et déposez vos images JPG, PNG ou WebP.`,
      `Saisissez votre texte, par exemple votre nom ou une mention de copyright.`,
      `Choisissez la position, la taille, l'opacité et la couleur. L'aperçu se met à jour au fil de vos réglages.`,
      `Appuyez sur "Ajouter le filigrane" et téléchargez chaque fichier, ou tous dans un ZIP.`,
    ],
    sections: [
      {
        h: `Lisible, mais pas laid`,
        p: [
          `La taille est une part de la largeur de l'image : la marque a donc le même aspect sur une petite photo et sur une grande. Un léger contour de la couleur opposée garde le texte blanc lisible sur les zones claires et le texte noir lisible sur les zones sombres.`,
          `Une opacité d'environ 60 pour cent est un bon point de départ. Baissez-la si la marque concurrence l'image, augmentez-la si elle doit absolument se voir.`,
        ],
      },
      {
        h: `Ce qu'un filigrane peut et ne peut pas faire`,
        p: [
          `Un filigrane visible décourage la copie, mais ne l'empêche pas. Quelqu'un de déterminé peut le rogner ou le retoucher. Le placer vers le milieu, ou le répéter sur toute l'image, rend cela plus difficile.`,
          `Le même filigrane est appliqué à chaque image ajoutée, et le JPG et le WebP sont réenregistrés en haute qualité.`,
        ],
      },
    ],
    faq: [
      { q: `Puis-je mettre un filigrane sur plusieurs photos à la fois ?`, a: `Oui. Ajoutez-les toutes, vérifiez l'aperçu de la première, et chaque image reçoit la même marque à la même taille relative.` },
      { q: `Quelqu'un peut-il retirer mon filigrane ?`, a: `Une personne déterminée peut le rogner ou le retoucher. Une marque répétée sur toute l'image est plus difficile à retirer qu'une marque dans un coin.` },
      { q: `Puis-je utiliser un logo à la place du texte ?`, a: `Oui, avec l'outil Ajouter un logo à des images, qui place une image PNG, JPG ou WebP de la même façon.` },
    ],
  },
  'how-to-add-a-logo-to-a-photo': {
    title: `Comment mettre votre logo sur une photo`,
    seoTitle: `Ajouter un logo à une photo ou une image (gratuit)`,
    description: `Placez votre logo sur une image ou sur plusieurs. Choisissez position, taille et opacité, ou répétez-le sur toute l'image. Fonctionne dans votre navigateur.`,
    intro: `Pour ajouter un logo à une photo, déposez l'image dans l'outil Ajouter un logo à des images, choisissez le fichier du logo, indiquez son emplacement et appuyez sur "Ajouter le logo". Un logo PNG à fond transparent rend le mieux.`,
    steps: [
      `Ouvrez l'outil Ajouter un logo à des images et déposez vos images JPG, PNG ou WebP.`,
      `Choisissez le fichier de votre logo. Un PNG à fond transparent donne le résultat le plus net.`,
      `Choisissez l'une des neuf positions, ou la répétition, puis réglez la taille et l'opacité.`,
      `Appuyez sur "Ajouter le logo" et téléchargez les fichiers, ou tous dans un ZIP.`,
    ],
    sections: [
      {
        h: `Obtenir un logo propre`,
        p: [
          `Un logo en JPG garde son cadre blanc : il apparaîtra comme un rectangle blanc sur la photo. Exportez plutôt votre logo en PNG ou en WebP à fond transparent.`,
          `Les logos SVG ne sont pas encore pris en charge, car le navigateur ne peut pas les dessiner dans le processus de travail en arrière-plan. Exportez d'abord un PNG en grande taille.`,
        ],
      },
      {
        h: `Taille et emplacement`,
        p: [
          `Le logo garde ses propres proportions et sa taille est une part de la largeur de l'image : il a donc le même aspect sur chaque photo d'un lot. S'il était trop grand pour tenir, il est réduit plutôt que coupé.`,
          `Choisissez un coin pour une marque discrète, et le milieu ou la répétition quand vous voulez qu'elle soit plus difficile à retirer.`,
        ],
      },
      {
        h: `Conseils pour un résultat professionnel`,
        p: [
          `Gardez le logo petit et cohérent. Environ 10 à 20 pour cent de la largeur de l'image suffisent en général, et utiliser le même coin sur chaque photo donne à l'ensemble une vraie unité.`,
          `Vérifiez l'aperçu sur une photo claire et sur une photo sombre avant de lancer un gros lot. Si le logo disparaît sur l'une d'elles, augmentez l'opacité ou ajoutez un contour clair au logo avant de l'utiliser.`,
        ],
      },
    ],
    faq: [
      { q: `Quels fichiers de logo fonctionnent ?`, a: `PNG, JPG et WebP. Un PNG ou un WebP transparent rend le mieux. Le SVG n'est pas encore pris en charge.` },
      { q: `Mon logo ou ma photo sont-ils envoyés quelque part ?`, a: `Non. Les deux sont assemblés dans votre navigateur et restent sur votre appareil.` },
      { q: `Puis-je mettre le logo sur plusieurs photos ?`, a: `Oui. Le même logo est placé sur chaque image à la même taille relative.` },
    ],
  },
  'how-to-resize-a-photo-and-signature-for-an-exam-form': {
    title: `Comment redimensionner une photo et une signature pour un formulaire d'examen`,
    seoTitle: `Photo et signature pour examen : Ko et pixels exacts`,
    description: `Mettez une photo, une signature ou une empreinte de pouce aux pixels et aux Ko exacts qu'un formulaire d'examen demande, d'après des avis officiels.`,
    intro: `Pour redimensionner une photo pour un formulaire d'examen, choisissez votre examen et le document dans l'outil Redimensionner photo et signature pour un examen, déposez votre image et appuyez sur "Make my file". Vous obtenez un JPG à la taille exacte en pixels et dans la plage de Ko autorisée.`,
    steps: [
      `Ouvrez l'outil Redimensionner photo et signature pour un examen et choisissez votre examen et le document, comme la photographie ou la signature.`,
      `Vérifiez les exigences affichées. Chacune renvoie à l'avis officiel et indique la date où nous l'avons lu.`,
      `Déposez votre photo ou votre scan. Les photos HEIC d'un iPhone fonctionnent aussi.`,
      `Appuyez sur "Make my file", vérifiez la taille dans la liste et téléchargez le JPG.`,
    ],
    sections: [
      {
        h: `Quels examens sont couverts`,
        p: [
          `Aujourd'hui, l'outil propose IBPS PO/MT (photographie, signature, empreinte du pouce gauche et déclaration manuscrite) et la signature SSC CGL 2026. Chaque chiffre vient d'un avis officiel, et chaque préréglage indique sa source et la date de lecture.`,
          `Si votre examen n'est pas dans la liste, choisissez "Other exam" et saisissez la largeur, la hauteur et les limites en Ko de votre propre avis.`,
        ],
      },
      {
        h: `Vérifiez toujours votre propre avis`,
        p: [
          `Les règles des examens changent d'une session à l'autre : comparez donc les chiffres avec votre avis actuel avant d'envoyer votre fichier. L'outil n'est à jour que dans la mesure où l'avis dont il est tiré l'est.`,
          `L'image est coupée ou complétée pour atteindre la taille exacte en pixels, puis enregistrée à la meilleure qualité qui tient sous le maximum. Si une image simple passe sous le minimum, des données de remplissage sans effet sont ajoutées au fichier pour l'atteindre. L'image elle-même n'est pas modifiée.`,
        ],
      },
    ],
    faq: [
      { q: `Les tailles sont-elles officielles ?`, a: `Oui, elles sont recopiées d'avis officiels, et chaque préréglage renvoie au document et indique la date où nous l'avons lu. Vérifiez aussi l'avis de votre propre session.` },
      { q: `Et si mon examen n'est pas dans la liste ?`, a: `Choisissez "Other exam" et saisissez la taille en pixels et la plage de Ko de votre avis.` },
      { q: `Ma photo est-elle envoyée quelque part ?`, a: `Non. Elle est redimensionnée dans votre navigateur et ne quitte jamais votre appareil.` },
    ],
  },
  'how-to-convert-images-between-jpg-png-webp-and-heic': {
    title: `Comment convertir des images entre JPG, PNG, WebP et HEIC`,
    seoTitle: `Convertir des images : JPG, PNG, WebP, HEIC, PDF (gratuit)`,
    description: `Ouvrez des photos HEIC d'iPhone, passez de JPG à PNG ou WebP, ou créez un PDF. La conversion se fait dans votre navigateur, sans envoi ni inscription.`,
    intro: `Pour convertir une image, déposez-la dans l'outil Convertir des images, choisissez JPG, PNG, WebP ou PDF comme format et appuyez sur "Convertir". Les photos HEIC d'iPhone, ainsi que les fichiers AVIF, SVG, GIF et BMP, s'ouvrent aussi en entrée.`,
    steps: [
      `Ouvrez l'outil Convertir des images et déposez vos fichiers. Vous pouvez en ajouter plusieurs à la fois.`,
      `Choisissez le format de sortie : JPG, PNG, WebP ou PDF.`,
      `Appuyez sur "Convertir".`,
      `Téléchargez chaque fichier, ou tous dans un seul ZIP.`,
    ],
    sections: [
      {
        h: `Quel format choisir`,
        p: [
          `Le JPG est le choix sûr pour les photos et s'ouvre partout, y compris dans les formulaires d'envoi. Le PNG garde des bords nets et des fonds transparents, ce qui lui convient pour les logos et les captures d'écran. Le WebP est en général plus léger que les deux et fonctionne dans tous les navigateurs actuels.`,
          `Le JPG ne peut pas être transparent : une zone transparente est donc remplie de blanc quand vous convertissez en JPG.`,
        ],
      },
      {
        h: `HEIC, AVIF, SVG, GIF et BMP`,
        p: [
          `Les iPhone enregistrent les photos en HEIC, que beaucoup d'applications et de sites ne savent pas ouvrir. Convertissez en JPG et cela marche partout. Le premier fichier HEIC charge un décodeur d'environ 2 Mo : le démarrage peut donc prendre un instant. Le HEIC n'est accepté qu'en entrée.`,
          `Un GIF ne garde que sa première image, un SVG est dessiné avec au moins 1024 pixels sur son plus grand côté, et l'AVIF demande un navigateur capable de l'ouvrir. Ces fichiers sont d'abord transformés en PNG, dans votre navigateur.`,
        ],
      },
    ],
    faq: [
      { q: `Comment convertir du HEIC en JPG ?`, a: `Déposez le fichier HEIC dans l'outil, laissez le format sur JPG et appuyez sur "Convertir". Cela fonctionne dans votre navigateur.` },
      { q: `Convertir fait-il perdre en qualité ?`, a: `Le PNG est sans perte. Le JPG et le WebP sont avec perte mais enregistrés en haute qualité : le changement est difficile à voir sur une photo.` },
      { q: `Puis-je faire un PDF ?`, a: `Oui, choisissez PDF pour obtenir un PDF par image. Pour mettre plusieurs images dans un seul PDF, utilisez Réunir des images en un PDF.` },
    ],
  },
  'how-to-combine-images-into-one-pdf': {
    title: `Comment réunir des images en un seul PDF`,
    seoTitle: `Réunir des images en un seul PDF (gratuit, ordre libre)`,
    description: `Mettez plusieurs images JPG, PNG ou WebP dans un seul PDF, choisissez l'ordre des pages et des pages A4 ou à la taille des images. Dans votre navigateur.`,
    intro: `Pour réunir des images en un PDF, déposez-les dans l'outil Réunir des images en un PDF, classez-les avec "Monter" et "Descendre", choisissez le style de page et appuyez sur "Créer le PDF". Chaque image devient une page.`,
    steps: [
      `Ouvrez l'outil Réunir des images en un PDF et déposez vos images. Vous pouvez en ajouter d'autres à tout moment.`,
      `Mettez-les dans l'ordre voulu avec "Monter" et "Descendre", et retirez celles dont vous n'avez pas besoin.`,
      `Choisissez "A4 avec marges", ou des pages à la taille de chaque image.`,
      `Appuyez sur "Créer le PDF" et téléchargez le fichier.`,
    ],
    sections: [
      {
        h: `Pages A4 ou pages à la taille des images`,
        p: [
          `A4 avec marges convient le mieux quand vous allez imprimer le PDF ou l'envoyer comme document, car toutes les pages ont la même taille. Les pages à la taille de chaque image sont préférables quand les images ont des formes différentes et que vous ne voulez aucun espace blanc.`,
          `Les images ne sont pas déformées. Elles sont mises à l'échelle pour tenir dans la page et centrées.`,
        ],
      },
      {
        h: `Garder un PDF léger`,
        p: [
          `Le PDF n'est pas plus léger que les images qu'on y met. S'il est trop gros pour un e-mail, compressez d'abord les images, puis réunissez-les.`,
          `Une zone transparente apparaît en blanc sur la page. Si vous préférez un PDF séparé par image plutôt qu'un seul pour toutes, utilisez l'outil Convertir des images avec PDF comme format.`,
        ],
      },
      {
        h: `Conseils pour un PDF bien rangé`,
        p: [
          `Faites d'abord pivoter les photos couchées avec l'outil Pivoter et retourner, pour que chaque page soit à l'endroit. Il est bien plus simple de corriger les images que de corriger les pages après coup.`,
          `Nommez vos fichiers pour qu'ils se classent dans l'ordre, puis vérifiez l'ordre dans la liste avant d'appuyer sur "Créer le PDF". Les pages suivent la liste de haut en bas.`,
        ],
      },
    ],
    faq: [
      { q: `Puis-je changer l'ordre des pages ?`, a: `Oui. Utilisez "Monter" et "Descendre" à côté de chaque image, et retirez celles dont vous n'avez pas besoin.` },
      { q: `Cela fonctionne-t-il avec les photos d'iPhone ?`, a: `Oui. Les photos HEIC s'ouvrent en entrée et sont placées dans le PDF.` },
      { q: `Mes images sont-elles envoyées quelque part ?`, a: `Non. Le PDF est créé dans votre navigateur et ne quitte jamais votre appareil.` },
    ],
  },
};
