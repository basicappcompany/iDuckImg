import type { GuideText } from './types';

/** French guides 9 to 17. */
export const frGuidesB: Record<string, GuideText> = {
  'how-to-rotate-or-flip-an-image': {
    title: `Comment faire pivoter ou retourner une image`,
    seoTitle: `Pivoter ou retourner une image en ligne (gratuit)`,
    description: `Tournez une image de 90, 180 ou 270 degrés, ou retournez-la en miroir à l'horizontale ou à la verticale. Pour JPG, PNG et WebP, dans votre navigateur.`,
    intro: `Pour faire pivoter une image, déposez-la dans l'outil Pivoter et retourner, appuyez sur le bouton de rotation à gauche ou à droite jusqu'à ce que l'aperçu soit correct, puis sur "Appliquer". Les mêmes boutons retournent aussi une image en miroir, à l'horizontale ou à la verticale.`,
    steps: [
      `Ouvrez l'outil Pivoter et retourner et déposez vos fichiers JPG, PNG ou WebP.`,
      `Utilisez les boutons pour pivoter à gauche ou à droite, ou pour retourner. L'aperçu montre le résultat.`,
      `Appuyez sur "Appliquer".`,
      `Téléchargez chaque fichier, ou tous dans un ZIP.`,
    ],
    sections: [
      {
        h: `Pivoter ou retourner : que choisir ?`,
        p: [
          `Pivoter tourne toute l'image de 90, 180 ou 270 degrés, ce qui corrige une photo prise couchée ou à l'envers. Retourner crée un effet miroir, ce qui permet de corriger un texte qui s'affiche à l'envers depuis la caméra selfie.`,
          `Vous pouvez combiner les deux. Pivotez d'abord, puis retournez, en regardant l'aperçu jusqu'à ce que le résultat convienne.`,
        ],
      },
      {
        h: `Plusieurs images à la fois`,
        p: [
          `La même modification s'applique à chaque image ajoutée : tout un lot de photos couchées peut donc être corrigé d'un coup. Le PNG reste sans perte. Le JPG et le WebP sont réenregistrés en haute qualité.`,
          `Regardez d'abord l'aperçu : il ne montre que la première image, donc un lot doit être composé d'images qui demandent la même rotation.`,
        ],
      },
      {
        h: `Astuces`,
        p: [
          `Si seulement certaines de vos photos sont couchées, faites pivoter celles-là dans un lot, et les autres dans un autre. Un lot reçoit exactement une modification : des images différentes demandent donc des passages séparés.`,
          `Gardez vos fichiers d'origine. Une rotation de 90 degrés est réversible, mais réenregistrer un JPG le modifie toujours très légèrement : mieux vaut ne pas le répéter de nombreuses fois.`,
        ],
      },
    ],
    faq: [
      { q: `Comment faire pivoter une photo couchée ?`, a: `Déposez-la, appuyez sur la rotation à gauche ou à droite jusqu'à ce qu'elle soit droite, puis appuyez sur "Appliquer" et téléchargez-la.` },
      { q: `Quelle est la différence entre pivoter et retourner ?`, a: `Pivoter tourne l'image sur elle-même. Retourner la met en miroir, comme si vous la regardiez dans une glace.` },
      { q: `Pivoter fait-il baisser la qualité ?`, a: `Le PNG reste sans perte. Le JPG et le WebP sont réenregistrés en haute qualité : tout changement est donc très faible.` },
    ],
  },
  'how-to-remove-location-and-exif-data-from-a-photo': {
    title: `Comment supprimer la position et les données EXIF d'une photo`,
    seoTitle: `Supprimer les données EXIF et GPS d'une photo`,
    description: `Retirez la position, la date et les détails de l'appareil cachés dans une photo avant de la partager. Dans votre navigateur, sans recompresser l'image.`,
    intro: `Pour supprimer les données EXIF d'une photo, déposez-la dans l'outil Supprimer les données EXIF et appuyez sur "Supprimer les métadonnées". La position GPS, la date et les détails de l'appareil cachés sont retirés, et l'image elle-même n'est pas recompressée.`,
    steps: [
      `Ouvrez l'outil Supprimer les données EXIF et déposez vos photos JPG, PNG ou WebP.`,
      `Appuyez sur "Supprimer les métadonnées".`,
      `Téléchargez chaque fichier nettoyé, ou tous dans un ZIP.`,
      `Si vous le souhaitez, vérifiez le résultat : sous Windows, faites un clic droit sur le fichier, choisissez Propriétés et ouvrez l'onglet Détails.`,
    ],
    sections: [
      {
        h: `Ce qui se cache dans une photo`,
        p: [
          `Les téléphones et les appareils photo écrivent des détails supplémentaires dans le fichier : l'endroit exact où la photo a été prise, la date et l'heure, et le modèle de l'appareil. Quiconque reçoit le fichier d'origine peut les lire, même si l'image elle-même ne montre rien de privé.`,
          `Beaucoup de réseaux sociaux en retirent une partie eux-mêmes, mais pas tous, et une photo envoyée par e-mail ou par messagerie arrive en général inchangée. La nettoyer d'abord est le bon réflexe.`,
        ],
      },
      {
        h: `Ce que cela ne cache pas`,
        p: [
          `Retirer les métadonnées ne change pas ce qui est dans l'image. Un panneau de rue, un numéro de maison ou un visage restent visibles. Pour masquer une partie de l'image elle-même, utilisez l'outil Flouter ou masquer des parties d'une image.`,
          `Comme les données d'un JPG ne sont pas recompressées, l'image paraît exactement comme avant et le fichier est seulement un peu plus petit.`,
        ],
      },
      {
        h: `Astuces`,
        p: [
          `Nettoyez les photos avant de les envoyer, pas après. Une image déjà publiée ou envoyée par e-mail ne peut pas être reprise, mais la suivante peut partir propre.`,
          `Les captures d'écran ne portent en général aucune position : c'est donc une façon sûre de partager l'image d'un écran. Ce sont les photos prises avec un téléphone qui valent la peine d'être nettoyées, surtout celles prises chez vous.`,
        ],
      },
    ],
    faq: [
      { q: `Qu'est-ce que les données EXIF ?`, a: `Ce sont des informations stockées dans le fichier d'une photo : où elle a été prise, quand, et avec quel appareil et quels réglages.` },
      { q: `Supprimer les EXIF change-t-il l'image ?`, a: `Non. L'image n'est pas recompressée : elle paraît exactement pareille.` },
      { q: `Ma photo est-elle envoyée quelque part ?`, a: `Non. Les données sont retirées dans votre navigateur et le fichier ne quitte jamais votre appareil.` },
    ],
  },
  'how-to-make-a-round-profile-picture': {
    title: `Comment faire une photo de profil ronde`,
    seoTitle: `Faire une photo de profil ronde (recadrage circulaire)`,
    description: `Recadrez n'importe quelle photo en cercle, ou arrondissez seulement les coins, et enregistrez-la en PNG aux coins transparents. Gratuit, dans votre navigateur.`,
    intro: `Pour faire une photo de profil ronde, déposez une photo dans l'outil Recadrage circulaire et coins arrondis, choisissez "Circle" et appuyez sur "Make it round". Vous obtenez un PNG aux coins transparents, qui garde le carré central de votre photo.`,
    steps: [
      `Ouvrez l'outil Recadrage circulaire et coins arrondis et déposez votre image.`,
      `Choisissez "Circle", ou "Rounded corners" si vous voulez seulement des bords adoucis.`,
      `Appuyez sur "Make it round".`,
      `Téléchargez le PNG.`,
    ],
    sections: [
      {
        h: `Pourquoi le résultat est un PNG`,
        p: [
          `Une image ronde a besoin de coins transparents, et le JPG ne peut pas être transparent. Le PNG le peut : le résultat est donc toujours un PNG. Placez-le sur un fond de couleur et il garde sa forme ronde.`,
          `La plupart des cadres de photo de profil recadrent déjà en cercle pour vous. Cet outil est utile quand vous avez besoin de l'image ronde sous forme de fichier.`,
        ],
      },
      {
        h: `Cadrer le visage`,
        p: [
          `Un cercle garde le carré central de la photo. Si le visage est décalé sur un côté, recadrez d'abord l'image pour mettre le visage au milieu, puis arrondissez-la.`,
          `L'outil Recadrer des images avec la forme 1:1 le fait en une seule étape.`,
        ],
      },
      {
        h: `Astuces`,
        p: [
          `Partez d'une image d'au moins quelques centaines de pixels de large. Une image ronde est souvent affichée petite, mais des bords nets demandent assez de pixels au départ.`,
          `Laissez un peu d'espace autour du visage. Un cercle coupe les coins : un cadrage serré sur la tête peut finir par rogner les cheveux ou le menton.`,
        ],
      },
    ],
    faq: [
      { q: `Puis-je faire une image ronde à fond transparent ?`, a: `Oui. Les coins en dehors du cercle sont transparents dans le PNG que vous téléchargez.` },
      { q: `Et si ma photo n'est pas carrée ?`, a: `Le cercle utilise le carré central de l'image. Recadrez d'abord si vous voulez une autre partie.` },
      { q: `Mon image est-elle envoyée quelque part ?`, a: `Non. Elle est traitée dans votre navigateur et reste sur votre appareil.` },
    ],
  },
  'how-to-split-an-image-into-a-grid': {
    title: `Comment découper une image en grille de vignettes`,
    seoTitle: `Découper une image en grille (Instagram, puzzles)`,
    description: `Coupez une image en lignes et colonnes égales pour une publication en grille ou un puzzle, jusqu'à 10 par 10, et téléchargez les vignettes en ZIP. Dans votre navigateur.`,
    intro: `Pour découper une image en grille, déposez-la dans l'outil Découper une image en grille, choisissez le nombre de lignes et de colonnes voulu et appuyez sur le bouton. Chaque vignette est enregistrée comme une image à part, et vous pouvez toutes les télécharger dans un ZIP.`,
    steps: [
      `Ouvrez l'outil Découper une image en grille et déposez votre image.`,
      `Choisissez le nombre de lignes et de colonnes, jusqu'à 10 par 10.`,
      `Appuyez sur le bouton "Split".`,
      `Téléchargez les vignettes, ou toutes dans un seul ZIP.`,
    ],
    sections: [
      {
        h: `Grilles de réseaux sociaux et puzzles`,
        p: [
          `Pour une grille de réseau social, publiez les vignettes dans le bon ordre pour qu'elles se raccordent sur un profil. Un découpage de 3 par 1 donne un large panorama en trois publications, et 3 par 3 donne neuf carrés.`,
          `Les vignettes sont nommées d'après la ligne et la colonne, par exemple photo-r1-c2.jpg, pour savoir quel morceau va où.`,
        ],
      },
      {
        h: `Aucun pixel perdu`,
        p: [
          `Chaque pixel de l'image se retrouve dans une seule vignette : les morceaux se rassemblent donc sans rien de manquant ni de doublé. Si la taille ne se divise pas exactement, les vignettes diffèrent d'un pixel au plus.`,
          `Les vignettes gardent le format de l'image. Donnez d'abord à l'image la forme que vous voulez, car une image en hauteur donne des vignettes en hauteur.`,
        ],
      },
      {
        h: `Astuces`,
        p: [
          `Recadrez d'abord l'image à la bonne forme. Une grille de 3 par 3 est plus belle à partir d'une image carrée, et un panorama de 3 par 1 à partir d'une image large dont la largeur fait trois fois la hauteur.`,
          `Envoyez les vignettes en ordre inverse si le site affiche d'abord la publication la plus récente, pour qu'elles se raccordent correctement sur le profil. Vérifiez la mise en page sur votre téléphone avant de partager.`,
        ],
      },
    ],
    faq: [
      { q: `Comment découper une photo pour une grille Instagram ?`, a: `Choisissez les lignes et les colonnes qui correspondent à votre grille, par exemple 3 par 3, puis publiez les vignettes dans l'ordre.` },
      { q: `Combien de vignettes puis-je faire ?`, a: `Jusqu'à 10 lignes et 10 colonnes.` },
      { q: `Comment les vignettes sont-elles nommées ?`, a: `D'après la ligne et la colonne, comme nom-r1-c1.jpg, pour que vous puissiez les remettre dans l'ordre.` },
    ],
  },
  'how-to-add-text-to-a-picture': {
    title: `Comment ajouter du texte à une image`,
    seoTitle: `Ajouter du texte à une image ou une photo en ligne`,
    description: `Écrivez une légende ou un titre sur une image. Choisissez la position, la taille et la couleur, avec un bandeau facultatif derrière le texte. Dans votre navigateur.`,
    intro: `Pour ajouter du texte à une image, déposez-la dans l'outil Ajouter du texte à une image, saisissez jusqu'à cinq lignes, choisissez leur emplacement, réglez la taille et la couleur, puis appuyez sur "Ajouter le texte". Un bandeau sombre ou clair derrière le texte le garde lisible sur une photo chargée.`,
    steps: [
      `Ouvrez l'outil Ajouter du texte à une image et déposez votre image.`,
      `Saisissez votre texte, jusqu'à cinq lignes.`,
      `Choisissez l'une des neuf positions, la taille et la couleur. Ajoutez un bandeau sombre ou clair si l'arrière-plan est chargé.`,
      `Appuyez sur "Ajouter le texte" et téléchargez le résultat.`,
    ],
    sections: [
      {
        h: `Rendre le texte facile à lire`,
        p: [
          `Un texte sur une photo est difficile à lire quand l'arrière-plan mêle zones claires et sombres. Le bandeau facultatif place une bande unie derrière les mots, ce qui règle le problème sans changer l'image.`,
          `La taille est une part de la largeur de l'image : une légende a donc le même aspect sur une petite image et sur une grande.`,
        ],
      },
      {
        h: `Limites à connaître`,
        p: [
          `Vous pouvez ajouter jusqu'à cinq lignes de 60 caractères au plus. Pour un texte plus long, agrandissez l'image ou utilisez plusieurs images.`,
          `L'aperçu montre la première image, et le même texte est placé sur chaque image ajoutée.`,
        ],
      },
      {
        h: `Astuces`,
        p: [
          `Restez bref. Un texte grand et court se lit sur un téléphone, et la taille s'adapte à l'image : un titre court rend donc en général mieux qu'une longue légende.`,
          `Choisissez la couleur qui contraste le plus avec la zone derrière le texte, ou activez le bandeau. Vérifiez l'aperçu en petit, car c'est ainsi que la plupart des gens le verront.`,
        ],
      },
    ],
    faq: [
      { q: `Combien de lignes puis-je ajouter ?`, a: `Jusqu'à cinq lignes, de 60 caractères au plus chacune.` },
      { q: `Puis-je mettre du texte sur plusieurs images ?`, a: `Oui. Le même texte est placé sur chaque image, et vous pouvez toutes les télécharger ensemble.` },
      { q: `Mon image est-elle envoyée quelque part ?`, a: `Non. Le texte est dessiné dans votre navigateur.` },
    ],
  },
  'how-to-turn-a-photo-into-pixel-art': {
    title: `Comment transformer une photo en pixel art`,
    seoTitle: `Transformer une photo en pixel art (gratuit, navigateur)`,
    description: `Créez un pixel art aux gros pixels à partir de n'importe quelle photo. Choisissez la taille des pixels et le nombre de couleurs. Enregistré en PNG, sans envoi.`,
    intro: `Pour transformer une photo en pixel art, déposez-la dans le Créateur de pixel art, déplacez le curseur pour choisir combien de gros pixels tiennent en largeur et appuyez sur "Make pixel art". Moins de pixels en largeur donne un rendu plus grossier, et le résultat est un PNG.`,
    steps: [
      `Ouvrez le Créateur de pixel art et déposez vos images.`,
      `Déplacez le curseur pour régler combien de gros pixels tiennent en largeur. Moins, c'est plus grossier.`,
      `Au besoin, choisissez "Retro" ou "Very few colours" pour un look de console de jeu.`,
      `Appuyez sur "Make pixel art" et téléchargez le PNG.`,
    ],
    sections: [
      {
        h: `Trouver le bon niveau de pixellisation`,
        p: [
          `Les visages rendent mieux avec environ 32 à 64 pixels en largeur. Les paysages sont beaux avec davantage. Chaque gros pixel est la couleur moyenne d'un bloc carré de la photo.`,
          `L'aperçu utilise le même code que le fichier enregistré : ce que vous voyez est ce que vous obtenez.`,
        ],
      },
      {
        h: `Limiter les couleurs`,
        p: [
          `"Retro" garde six nuances de chaque couleur et "Very few colours" en garde trois, ce qui donne un rendu plat, façon jeu vidéo. Gardez les couleurs d'origine si vous voulez que les pixels ressemblent encore à la photo.`,
          `Le résultat est un PNG à la même taille que votre image, car le JPG adoucirait les bords nets de chaque gros pixel.`,
        ],
      },
      {
        h: `Astuces`,
        p: [
          `Commencez avec une photo simple et très contrastée. Un visage devant un fond uni supporte bien mieux les gros pixels qu'une scène de rue chargée.`,
          `Essayez quelques réglages et comparez. Passer de 48 à 32 pixels en largeur change beaucoup le rendu, et les couleurs "Retro" peuvent transformer une photo ordinaire en quelque chose qui ressemble à un écran de jeu.`,
        ],
      },
    ],
    faq: [
      { q: `Pourquoi le résultat est-il un PNG ?`, a: `Un PNG garde les bords nets de chaque gros pixel. Un JPG les adoucirait.` },
      { q: `Combien de pixels utiliser pour un visage ?`, a: `Environ 32 à 64 en largeur donnent en général de bons résultats.` },
      { q: `L'image garde-t-elle sa taille ?`, a: `Oui. Le résultat a la même taille que l'original.` },
    ],
  },
  'how-to-merge-images-side-by-side': {
    title: `Comment assembler des images côte à côte ou l'une au-dessus de l'autre`,
    seoTitle: `Assembler des images côte à côte ou empilées (gratuit)`,
    description: `Réunissez deux images ou plus en une seule, en ligne ou en colonne, avec un espace et un fond facultatifs. Enregistré en PNG, JPG ou WebP. Dans votre navigateur.`,
    intro: `Pour assembler des images, déposez-en au moins deux dans l'outil Assembler des images côte à côte, mettez-les dans l'ordre, choisissez côte à côte ou empilées, et appuyez sur "Join pictures". Elles sont mises à une hauteur ou une largeur commune, sans jamais être étirées vers le haut.`,
    steps: [
      `Ouvrez l'outil Assembler des images côte à côte et déposez deux images ou plus.`,
      `Mettez-les dans l'ordre avec "Up" et "Down", et retirez celles dont vous ne voulez pas.`,
      `Choisissez côte à côte ou empilées, l'espace entre elles et le fond.`,
      `Appuyez sur "Join pictures" et téléchargez le résultat en PNG, JPG ou WebP.`,
    ],
    sections: [
      {
        h: `Harmoniser les tailles`,
        p: [
          `Par défaut, chaque image est mise à la plus petite hauteur commune (pour une ligne) ou à la plus petite largeur commune (pour une colonne) : aucune image n'est agrandie au point de devenir floue. Si vous préférez garder chaque image à sa propre taille, choisissez cette option et elles seront centrées.`,
          `Un espace et une couleur de fond blanche, noire ou transparente complètent le rendu. Choisissez transparent avec le PNG ou le WebP.`,
        ],
      },
      {
        h: `Limites de taille`,
        p: [
          `Un résultat de plus de 100 mégapixels est refusé avec un message clair, car un téléphone ne pourrait pas le contenir. Dans ce cas, utilisez moins d'images ou des images plus petites.`,
          `Les photos avant et après fonctionnent bien en une ligne de deux. Une longue pile de captures d'écran fonctionne bien en colonne.`,
        ],
      },
      {
        h: `Astuces`,
        p: [
          `Recadrez d'abord vos images à des formes proches. Des images de même hauteur s'alignent proprement en ligne, et l'outil n'a alors rien à réduire.`,
          `Utilisez un petit espace et un fond blanc pour un avant et après net. N'utilisez aucun espace pour un panorama continu fait d'images conçues pour se raccorder.`,
        ],
      },
    ],
    faq: [
      { q: `Comment mettre deux photos côte à côte ?`, a: `Déposez les deux, choisissez côte à côte et appuyez sur "Join pictures".` },
      { q: `Mes images seront-elles étirées ?`, a: `Non. Elles sont mises à une hauteur ou une largeur commune, en gardant leurs proportions.` },
      { q: `Puis-je changer l'ordre ?`, a: `Oui. Utilisez "Up" et "Down" sur chaque image de la liste.` },
    ],
  },
  'how-to-blur-or-hide-part-of-an-image': {
    title: `Comment flouter ou masquer une partie d'une image`,
    seoTitle: `Flouter ou masquer une partie d'une image (noms, visages)`,
    description: `Faites glisser des cadres sur un nom, un numéro ou un visage, puis floutez, pixellisez ou recouvrez-les. Dans votre navigateur : l'original ne quitte pas votre appareil.`,
    intro: `Pour masquer une partie d'une image, déposez-la dans l'outil Flouter ou masquer des parties d'une image, faites glisser un cadre sur le nom, le numéro ou le visage, choisissez "Blur", "Pixelate" ou "Cover" et appuyez sur le bouton. "Cover" est le choix le plus sûr pour tout ce qui est sensible.`,
    steps: [
      `Ouvrez l'outil Flouter ou masquer des parties d'une image et déposez votre image.`,
      `Faites glisser un cadre sur chaque zone à masquer. Vous pouvez en ajouter autant qu'il en faut.`,
      `Choisissez "Blur", "Pixelate" ou "Cover" avec une couleur unie.`,
      `Appuyez sur le bouton et téléchargez la nouvelle image.`,
    ],
    sections: [
      {
        h: `Flouter, pixelliser ou recouvrir ?`,
        p: [
          `Un flou léger peut laisser un texte en partie lisible, et une personne déterminée peut parfois retrouver des chiffres derrière un flou ou une pixellisation faibles. "Cover" peint un bloc uni, qui ne laisse rien à retrouver.`,
          `Utilisez "Cover" pour les numéros de carte, les numéros de compte et tout ce qui est privé. Utilisez le flou pour les visages et les arrière-plans, quand l'apparence compte plus que la sécurité.`,
        ],
      },
      {
        h: `Cadres précis et plusieurs images`,
        p: [
          `Chaque cadre a aussi des champs numériques pour sa position en pourcentage, ce qui marche sans souris et permet de le déplacer très précisément. L'aperçu en direct utilise le même code que le fichier enregistré.`,
          `Si vous déposez plusieurs images, les mêmes cadres s'appliquent à toutes, ce qui convient à des captures d'écran de même mise en page. Vos fichiers d'origine ne sont jamais modifiés.`,
        ],
      },
      {
        h: `Astuces`,
        p: [
          `Faites le cadre un peu plus grand que ce que vous masquez. Les bords des lettres et des visages dépassent, et un cadre trop serré peut laisser une fine bande visible.`,
          `Après l'enregistrement, ouvrez la nouvelle image et zoomez. Si vous pouvez encore lire ou reconnaître quelque chose, recommencez avec "Cover". Et rappelez-vous que les données de position cachées sont distinctes de ce qui est visible : nettoyez-les aussi.`,
        ],
      },
    ],
    faq: [
      { q: `Un flou suffit-il pour cacher un numéro de carte ?`, a: `Non. Un flou léger peut rester en partie lisible. Utilisez "Cover", qui peint un bloc uni.` },
      { q: `Puis-je masquer plusieurs zones ?`, a: `Oui. Ajoutez autant de cadres qu'il en faut.` },
      { q: `Mon image est-elle envoyée quelque part ?`, a: `Non. L'effet est appliqué dans votre navigateur et l'original reste sur votre appareil.` },
    ],
  },
  'how-to-convert-pixels-to-cm-and-inches': {
    title: `Comment convertir des pixels en centimètres et en pouces`,
    seoTitle: `Convertir des pixels en cm, mm et pouces (avec DPI)`,
    description: `Calculez la taille d'une image sur papier d'après ses pixels et son DPI, ou combien de pixels il faut pour une feuille A4. Un calculateur gratuit avec les formats courants.`,
    intro: `Pour convertir des pixels en centimètres, divisez les pixels par le DPI pour obtenir des pouces, puis multipliez par 2,54. À 300 DPI, 1 cm fait environ 118 pixels, et le Convertisseur pixels, cm et pouces fait le calcul pour n'importe quelle longueur et résolution.`,
    steps: [
      `Ouvrez le Convertisseur pixels, cm et pouces et saisissez la longueur dont vous disposez.`,
      `Choisissez son unité : pixels, centimètres, millimètres ou pouces.`,
      `Choisissez la résolution en DPI. Utilisez 300 pour les photos imprimées, et 72 ou 96 pour les écrans.`,
      `Lisez la même longueur dans chaque unité, ainsi que la taille en pixels des formats de papier courants.`,
    ],
    sections: [
      {
        h: `Pourquoi le DPI compte`,
        p: [
          `Les pixels n'ont pas de taille physique par eux-mêmes. Les mêmes 1200 pixels font 4 pouces de large à 300 DPI et environ 16,7 pouces de large à 72 DPI. Le DPI indique combien de pixels tiennent dans un pouce.`,
          `Pour l'impression, 300 DPI est l'objectif habituel pour les photos. 150 DPI suffit pour des brouillons, et les écrans ne s'intéressent qu'au nombre de pixels.`,
        ],
      },
      {
        h: `Tailles courantes en pixels`,
        p: [
          `À 300 DPI, une page A4 fait 2480 par 3508 pixels, et un tirage photo de 4 par 6 pouces fait 1200 par 1800 pixels. Le tableau de la page montre A4, A5, A3, US Letter et les photos d'identité au DPI que vous choisissez.`,
          `Changer le réglage DPI d'un fichier ne change pas ses pixels. Pour changer la taille réelle d'une image, utilisez l'outil Redimensionner des images.`,
        ],
      },
    ],
    faq: [
      { q: `Combien de pixels fait 1 cm ?`, a: `À 300 DPI, environ 118 pixels, et à 96 DPI, environ 38 pixels. La formule est : pixels = cm divisé par 2,54, multiplié par le DPI.` },
      { q: `Combien de pixels fait une page A4 ?`, a: `À 300 DPI, l'A4 fait 2480 par 3508 pixels. À 150 DPI, il fait 1240 par 1754.` },
      { q: `Cela change-t-il mon image ?`, a: `Non. C'est seulement un calculateur et il n'utilise aucun fichier.` },
    ],
  },
};
