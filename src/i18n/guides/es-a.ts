import type { GuideText } from './types';

/** Spanish how-to guides 1 to 8 (see `src/lib/guides-a.ts`). */
export const esGuidesA: Record<string, GuideText> = {
  'how-to-compress-an-image': {
    title: 'Cómo comprimir una imagen sin perder calidad',
    seoTitle: 'Cómo comprimir una imagen sin perder calidad (gratis)',
    description: 'Reduce archivos JPG, PNG y WebP en tu navegador. Elige la calidad, compara los tamaños antes y después y descarga. Sin subir nada ni registrarte.',
    intro:
      'Para comprimir una imagen, suéltala en la herramienta Comprimir imágenes, deja la calidad cerca de 75 y pulsa "Comprimir". Las fotos suelen reducirse mucho sin que se note ningún cambio, y la imagen nunca sale de tu dispositivo.',
    steps: [
      'Abre la herramienta Comprimir imágenes y suelta tus archivos JPG, PNG o WebP, o pégalos desde el portapapeles.',
      'Ajusta la calidad. Alrededor de 75 la foto se ve igual y el archivo pesa mucho menos.',
      'Pulsa "Comprimir" y mira el tamaño antes y después junto a cada archivo.',
      'Descarga cada archivo, o todos juntos en un ZIP.',
    ],
    sections: [
      {
        h: 'Qué cambia según el tipo de archivo',
        p: [
          'JPG y WebP se comprimen con una calidad ajustable: un número más bajo da un archivo más pequeño y un poco menos de detalle. Las fotos del móvil suelen pesar entre 3 y 8 MB, y casi todo ese peso se puede quitar sin diferencia visible.',
          'PNG es distinto. Se optimiza sin perder nada, así que la imagen queda exactamente igual, pero el ahorro es menor. Si el PNG es una foto, convertirlo a JPG o WebP ahorra mucho más.',
        ],
      },
      {
        h: 'Si necesitas un tamaño exacto',
        p: [
          'Los formularios suelen pedir que la foto pese menos de cierto número de kilobytes. Para eso, usa el cuadro "Tamaño de archivo deseado (KB, opcional)" de la herramienta Cambiar el tamaño de imágenes, o abre una página ya preparada como Comprimir imagen a 100 KB. Prueba distintos niveles de calidad y se queda con el mejor que cabe.',
          'Si un archivo no se puede hacer más pequeño, recibes el original en lugar de una versión peor.',
        ],
      },
    ],
    faq: [
      { q: '¿Comprimir una imagen reduce su calidad?', a: 'JPG y WebP pierden un poco de detalle al bajar la calidad, y alrededor de 75 el cambio apenas se nota. PNG se optimiza sin ninguna pérdida.' },
      { q: '¿Se sube mi imagen cuando la comprimo?', a: 'No. El trabajo se hace en tu navegador, en tu propio dispositivo, así que el archivo no se envía a ninguna parte.' },
      { q: '¿Puedo comprimir muchas imágenes a la vez?', a: 'Sí. Añade todas las que quieras y descárgalas juntas en un ZIP.' },
    ],
  },
  'how-to-resize-an-image': {
    title: 'Cómo cambiar el tamaño de una imagen por píxeles, porcentaje o peso',
    seoTitle: 'Cómo cambiar el tamaño de una imagen: px, % o KB (gratis)',
    description: 'Cambia una imagen a píxeles exactos, a un porcentaje o a un peso objetivo en KB, en tu navegador. Mantiene las proporciones. Sin subir nada.',
    intro:
      'Para cambiar el tamaño de una imagen, suéltala en la herramienta Cambiar el tamaño de imágenes, escribe un ancho o un alto en píxeles o elige un porcentaje, y pulsa "Cambiar tamaño". Deja un cuadro vacío y el otro se calcula para que la imagen no se deforme.',
    steps: [
      'Abre la herramienta Cambiar el tamaño de imágenes y suelta tus archivos JPG, PNG o WebP.',
      'Escribe un ancho, un alto o un porcentaje. Deja un cuadro vacío para mantener las proporciones.',
      'Si un formulario pide un peso de archivo, escribe un objetivo en KB, por ejemplo 100.',
      'Pulsa "Cambiar tamaño" y descarga el resultado, o todos los archivos en un ZIP.',
    ],
    sections: [
      {
        h: '¿Píxeles, porcentaje o kilobytes?',
        p: [
          'Los píxeles sirven cuando te piden un tamaño como 1200 por 800. Un porcentaje es más rápido si solo quieres reducirla, por ejemplo al 50 %. Un objetivo en KB es para los límites de subida, y la herramienta busca la mejor calidad que quepa.',
          'El tamaño deseado funciona con JPG y WebP. Un PNG con tamaño deseado se guarda como WebP, porque PNG es sin pérdida y no puede cambiar calidad por peso.',
        ],
      },
      {
        h: 'Cuando el objetivo es demasiado pequeño',
        p: [
          'Si no se puede alcanzar el peso que pides con el tamaño en píxeles que elegiste, verás un mensaje en lugar de un archivo equivocado. Prueba con menos píxeles y vuelve a intentar el objetivo.',
          'Agrandar una imagen no añade detalle. Se amplía, así que puede verse borrosa; por eso reducir es la dirección segura.',
        ],
      },
    ],
    faq: [
      { q: '¿Cómo cambio el tamaño sin deformar la imagen?', a: 'Rellena solo el ancho o solo el alto. El otro lado se calcula a partir de las proporciones originales.' },
      { q: '¿Puedo dejarla en exactamente 100 KB?', a: 'Sí. Escribe 100 como tamaño deseado. La herramienta elige la mayor calidad que quepa por debajo, o te avisa si no es posible.' },
      { q: '¿Se sube mi foto al cambiarle el tamaño?', a: 'No. Funciona en tu navegador y el archivo se queda en tu dispositivo.' },
    ],
  },
  'how-to-crop-an-image': {
    title: 'Cómo recortar una imagen justo por la zona que quieres',
    seoTitle: 'Cómo recortar una imagen: arrastrando, por forma o en px',
    description: 'Recorta una imagen arrastrando un recuadro, fijando una proporción como 1:1 o 16:9, o escribiendo píxeles exactos. Gratis, en tu navegador.',
    intro:
      'Para recortar una imagen, suéltala en la herramienta Recortar imágenes, arrastra el recuadro sobre la parte que quieres conservar y pulsa "Recortar". Elige una forma como 1:1 o 16:9 para fijar las proporciones, o escribe píxeles exactos.',
    steps: [
      'Abre la herramienta Recortar imágenes y suelta una imagen JPG, PNG o WebP.',
      'Arrastra el recuadro y sus controles sobre la parte que quieres. Elige una proporción como 1:1 o 16:9 si la necesitas.',
      'O escribe izquierda, arriba, ancho y alto en píxeles para un recorte exacto.',
      'Pulsa "Recortar" y descarga el resultado.',
    ],
    sections: [
      {
        h: 'Elegir una proporción',
        p: [
          'Una proporción mantiene el recuadro con una forma fija mientras lo mueves y le cambias el tamaño. Usa 1:1 para una foto de perfil cuadrada, 16:9 para miniaturas de vídeo y presentaciones, y 4:3 o 3:2 para fotos impresas.',
          'Si no sabes qué forma pide un sitio, la calculadora de relación de aspecto convierte un ancho y un alto en una proporción.',
        ],
      },
      {
        h: 'Control preciso sin ratón',
        p: [
          'Puedes mover el recuadro con las flechas del teclado y escribir valores exactos, lo que también funciona en el móvil, donde arrastrar es incómodo. La imagen recortada conserva su formato original.',
          'El recorte elimina para siempre la parte exterior en el archivo que descargas, así que guarda el original por si lo quieres de vuelta. Como la herramienta nunca toca el archivo que soltaste, siempre puedes empezar de nuevo desde él y probar otro recuadro.',
        ],
      },
    ],
    faq: [
      { q: '¿Cómo recorto en cuadrado?', a: 'Elige la forma 1:1 y mueve el recuadro sobre la parte que quieres. El recuadro sigue siendo cuadrado al cambiarle el tamaño.' },
      { q: '¿Puedo recortar en píxeles exactos?', a: 'Sí. Escribe izquierda, arriba, ancho y alto en píxeles.' },
      { q: '¿Recortar reduce la calidad?', a: 'Los píxeles que conservas no cambian. JPG y WebP se guardan de nuevo en alta calidad, y PNG sigue siendo sin pérdida.' },
    ],
  },
  'how-to-add-a-watermark-to-a-photo': {
    title: 'Cómo añadir una marca de agua de texto a una foto',
    seoTitle: 'Cómo añadir una marca de agua a una foto (gratis)',
    description: 'Pon tu nombre o una línea de copyright en tus imágenes. Elige posición, tamaño, opacidad y color, o repítela por toda la imagen. En tu navegador.',
    intro:
      'Para poner una marca de agua a una foto, suéltala en la herramienta Añadir una marca de agua, escribe tu texto, elige dónde va y pulsa "Añadir marca de agua". Puedes colocarla en una esquina o repetirla por toda la imagen.',
    steps: [
      'Abre la herramienta Añadir una marca de agua y suelta tus imágenes JPG, PNG o WebP.',
      'Escribe tu texto, por ejemplo tu nombre o una línea de copyright.',
      'Elige la posición, el tamaño, la opacidad y el color. La vista previa se actualiza a medida que los cambias.',
      'Pulsa "Añadir marca de agua" y descarga cada archivo, o todos en un ZIP.',
    ],
    sections: [
      {
        h: 'Que se lea bien sin estropear la foto',
        p: [
          'El tamaño es una parte del ancho de la imagen, así que la marca se ve igual en una foto pequeña y en una grande. Un borde suave del color contrario mantiene legible el texto blanco sobre zonas claras y el negro sobre zonas oscuras.',
          'Una opacidad de alrededor del 60 % es un buen punto de partida. Bájala si la marca compite con la imagen, y súbela si tiene que verse sí o sí.',
        ],
      },
      {
        h: 'Lo que una marca de agua puede y no puede hacer',
        p: [
          'Una marca de agua visible disuade de copiar, pero no lo impide. Alguien decidido puede recortarla o editarla para quitarla. Colocarla cerca del centro, o repetirla por toda la imagen, lo hace más difícil.',
          'La misma marca de agua se aplica a todas las imágenes que añades, y JPG y WebP se guardan de nuevo en alta calidad.',
        ],
      },
    ],
    faq: [
      { q: '¿Puedo poner marca de agua a muchas fotos a la vez?', a: 'Sí. Añádelas todas, revisa la vista previa de la primera, y cada imagen recibe la misma marca con el mismo tamaño relativo.' },
      { q: '¿Pueden quitar mi marca de agua?', a: 'Alguien decidido puede recortarla o editarla. Una marca repetida por toda la imagen es más difícil de quitar que una en una esquina.' },
      { q: '¿Puedo usar un logotipo en lugar de texto?', a: 'Sí, con la herramienta Añadir un logotipo a imágenes, que coloca una imagen PNG, JPG o WebP de la misma manera.' },
    ],
  },
  'how-to-add-a-logo-to-a-photo': {
    title: 'Cómo poner tu logotipo en una foto',
    seoTitle: 'Cómo añadir un logotipo a una foto o imagen (gratis)',
    description: 'Coloca tu logotipo en una imagen o en muchas. Elige la posición, el tamaño y la opacidad, o repítelo por toda la imagen. Funciona en tu navegador.',
    intro:
      'Para añadir un logotipo a una foto, suelta la imagen en la herramienta Añadir un logotipo a imágenes, elige el archivo de tu logotipo, indica dónde va y pulsa "Añadir logotipo". Un logotipo PNG con fondo transparente queda mejor.',
    steps: [
      'Abre la herramienta Añadir un logotipo a imágenes y suelta tus imágenes JPG, PNG o WebP.',
      'Elige el archivo de tu logotipo. Un PNG con fondo transparente da el resultado más limpio.',
      'Elige una de las nueve posiciones, o repítelo, y ajusta el tamaño y la opacidad.',
      'Pulsa "Añadir logotipo" y descarga los archivos, o todos en un ZIP.',
    ],
    sections: [
      {
        h: 'Conseguir un logotipo limpio',
        p: [
          'Un logotipo en JPG conserva su caja blanca, así que se verá como un rectángulo blanco sobre la foto. Exporta tu logotipo como PNG o WebP con fondo transparente.',
          'Los logotipos SVG todavía no son compatibles, porque el navegador no puede dibujarlos en el proceso en segundo plano. Exporta antes un PNG en tamaño grande.',
        ],
      },
      {
        h: 'Tamaño y colocación',
        p: [
          'El logotipo mantiene sus propias proporciones y su tamaño es una parte del ancho de la imagen, así que se ve igual en todas las fotos de un lote. Si fuera demasiado grande para caber, se reduce en lugar de cortarse.',
          'Usa una esquina para una marca discreta, y el centro o la opción de repetir cuando quieras que sea más difícil de quitar.',
        ],
      },
      {
        h: 'Consejos para un resultado profesional',
        p: [
          'Mantén el logotipo pequeño y coherente. Entre el 10 y el 20 % del ancho de la imagen suele bastar, y usar la misma esquina en todas las fotos hace que el conjunto se vea unificado.',
          'Mira la vista previa con una foto clara y otra oscura antes de procesar un lote grande. Si el logotipo desaparece en una de ellas, sube la opacidad o añade un contorno claro al logotipo antes de usarlo.',
        ],
      },
    ],
    faq: [
      { q: '¿Qué archivos de logotipo sirven?', a: 'PNG, JPG y WebP. Un PNG o WebP transparente queda mejor. SVG todavía no es compatible.' },
      { q: '¿Se suben mi logotipo o mi foto?', a: 'No. Ambos se combinan en tu navegador y se quedan en tu dispositivo.' },
      { q: '¿Puedo poner el logotipo en muchas fotos?', a: 'Sí. El mismo logotipo va en todas las imágenes con el mismo tamaño relativo.' },
    ],
  },
  'how-to-resize-a-photo-and-signature-for-an-exam-form': {
    title: 'Cómo redimensionar una foto y una firma para un formulario de examen',
    seoTitle: 'Foto y firma para exámenes: KB y píxeles exactos',
    description: 'Deja una foto, una firma o una huella del pulgar con los píxeles y KB exactos que pide el formulario de un examen, según avisos oficiales.',
    intro:
      'Para redimensionar una foto para un formulario de examen, elige tu examen y el documento en la herramienta Redimensionar foto y firma para exámenes, suelta tu imagen y pulsa "Make my file". Obtienes un JPG con el tamaño exacto en píxeles y dentro del rango de KB permitido.',
    steps: [
      'Abre la herramienta Redimensionar foto y firma para exámenes y elige tu examen y el documento, como "Photograph" o "Signature".',
      'Revisa los requisitos que aparecen. Cada uno tiene un enlace al aviso oficial y la fecha en que lo leímos.',
      'Suelta tu foto o tu escaneo. Las fotos HEIC de un iPhone también funcionan.',
      'Pulsa "Make my file", comprueba el tamaño en la lista y descarga el JPG.',
    ],
    sections: [
      {
        h: 'Qué exámenes están incluidos',
        p: [
          'Hoy la herramienta tiene IBPS PO/MT (fotografía, firma, huella del pulgar izquierdo y declaración manuscrita) y la firma del SSC CGL 2026. Todas las cifras proceden de un aviso oficial, y cada preajuste muestra su fuente y cuándo la leímos.',
          'Si tu examen no aparece, elige "Other exam" y escribe el ancho, el alto y los límites de KB de tu propio aviso.',
        ],
      },
      {
        h: 'Comprueba siempre tu propio aviso',
        p: [
          'Las normas de los exámenes cambian de una convocatoria a otra, así que compara las cifras con tu convocatoria actual antes de subir nada. La herramienta está tan actualizada como el aviso del que se leyó.',
          'La imagen se recorta o se rellena hasta el tamaño exacto en píxeles y luego se guarda con la mejor calidad que quepa por debajo del máximo. Si una imagen sencilla queda por debajo del mínimo, se añaden datos de relleno inofensivos al archivo para que lo alcance. La imagen en sí no cambia.',
        ],
      },
    ],
    faq: [
      { q: '¿Los tamaños son oficiales?', a: 'Sí, están copiados de avisos oficiales, y cada preajuste enlaza al documento e indica cuándo lo leímos. Comprueba también el aviso de tu propia convocatoria.' },
      { q: '¿Y si mi examen no aparece?', a: 'Elige "Other exam" e introduce el tamaño en píxeles y el rango de KB de tu aviso.' },
      { q: '¿Se sube mi foto?', a: 'No. Se redimensiona en tu navegador y nunca sale de tu dispositivo.' },
    ],
  },
  'how-to-convert-images-between-jpg-png-webp-and-heic': {
    title: 'Cómo convertir imágenes entre JPG, PNG, WebP y HEIC',
    seoTitle: 'Cómo convertir imágenes: JPG, PNG, WebP, HEIC a PDF',
    description: 'Abre fotos HEIC de iPhone, cambia entre JPG, PNG y WebP, o crea un PDF. Convierte en tu navegador, sin subir archivos ni registrarte.',
    intro:
      'Para convertir una imagen, suéltala en la herramienta Convertir imágenes, elige JPG, PNG, WebP o PDF como formato y pulsa "Convertir". Las fotos HEIC de un iPhone, y los archivos AVIF, SVG, GIF y BMP, también se abren como entrada.',
    steps: [
      'Abre la herramienta Convertir imágenes y suelta tus archivos. Puedes añadir muchos a la vez.',
      'Elige el formato de salida: JPG, PNG, WebP o PDF.',
      'Pulsa "Convertir".',
      'Descarga cada archivo, o todos en un ZIP.',
    ],
    sections: [
      {
        h: 'Qué formato elegir',
        p: [
          'JPG es la opción segura para fotos y se abre en todas partes, incluidos los formularios de subida. PNG conserva los bordes nítidos y los fondos transparentes, así que va bien para logotipos y capturas de pantalla. WebP suele ser más pequeño que los dos y funciona en todos los navegadores actuales.',
          'JPG no puede ser transparente, así que una zona transparente se rellena de blanco al convertir a JPG.',
        ],
      },
      {
        h: 'HEIC, AVIF, SVG, GIF y BMP',
        p: [
          'Los iPhone guardan las fotos como HEIC, que muchas aplicaciones y sitios no pueden abrir. Conviértelas a JPG y funcionan en todas partes. El primer archivo HEIC carga un decodificador de unos 2 MB, así que puede tardar un momento en empezar. HEIC es solo de entrada.',
          'Un GIF conserva solo su primer fotograma, un SVG se dibuja con al menos 1024 píxeles en su lado más largo, y AVIF necesita un navegador que pueda abrirlo. Primero se convierten a PNG, en tu navegador.',
        ],
      },
    ],
    faq: [
      { q: '¿Cómo convierto HEIC a JPG?', a: 'Suelta el archivo HEIC en la herramienta, deja el formato en JPG y pulsa "Convertir". Funciona en tu navegador.' },
      { q: '¿Convertir hace perder calidad?', a: 'PNG es sin pérdida. JPG y WebP son con pérdida, pero se guardan en alta calidad, así que el cambio apenas se nota en una foto.' },
      { q: '¿Puedo crear un PDF?', a: 'Sí, elige PDF para obtener un PDF por imagen. Para reunir varias imágenes en un solo PDF, usa Combinar imágenes en un PDF.' },
    ],
  },
  'how-to-combine-images-into-one-pdf': {
    title: 'Cómo combinar imágenes en un solo PDF',
    seoTitle: 'Cómo combinar imágenes en un PDF (gratis, con orden)',
    description: 'Reúne varias imágenes JPG, PNG o WebP en un solo PDF, elige el orden de las páginas y páginas A4 o del tamaño de la imagen. En tu navegador.',
    intro:
      'Para combinar imágenes en un solo PDF, suéltalas en la herramienta Combinar imágenes en un PDF, ordénalas con "Subir" y "Bajar", elige el estilo de página y pulsa "Crear PDF". Cada imagen se convierte en una página.',
    steps: [
      'Abre la herramienta Combinar imágenes en un PDF y suelta tus imágenes. Puedes añadir más en cualquier momento.',
      'Ordénalas como quieras con "Subir" y "Bajar", y quita las que no necesites.',
      'Elige A4 con márgenes, o páginas del tamaño de cada imagen.',
      'Pulsa "Crear PDF" y descarga el archivo.',
    ],
    sections: [
      {
        h: 'Páginas A4 o del tamaño de la imagen',
        p: [
          'A4 con márgenes es lo mejor si vas a imprimir el PDF o a enviarlo como documento, porque todas las páginas tienen el mismo tamaño. Las páginas del tamaño de cada imagen van mejor cuando las imágenes tienen formas distintas y no quieres espacios en blanco.',
          'Las imágenes no se deforman. Se escalan para caber en la página y se centran.',
        ],
      },
      {
        h: 'Mantener el PDF ligero',
        p: [
          'El PDF pesa tanto como las imágenes que le metes. Si es demasiado grande para enviarlo por correo, comprime primero las imágenes y combínalas después.',
          'Una zona transparente se ve blanca en la página. Si prefieres un PDF distinto por cada imagen en lugar de uno para todas, usa la herramienta Convertir imágenes con PDF como formato.',
        ],
      },
      {
        h: 'Consejos para un PDF ordenado',
        p: [
          'Gira primero las fotos que estén de lado con la herramienta Girar y voltear, para que todas las páginas queden derechas. Es mucho más fácil arreglar las imágenes que arreglar las páginas después.',
          'Pon a tus archivos nombres que se ordenen bien y revisa el orden en la lista antes de pulsar "Crear PDF". Las páginas siguen la lista de arriba abajo.',
        ],
      },
    ],
    faq: [
      { q: '¿Puedo cambiar el orden de las páginas?', a: 'Sí. Usa "Subir" y "Bajar" junto a cada imagen, y quita las que no necesites.' },
      { q: '¿Funciona con fotos de iPhone?', a: 'Sí. Las fotos HEIC se abren como entrada y se incluyen en el PDF.' },
      { q: '¿Se suben mis imágenes?', a: 'No. El PDF se crea en tu navegador y nunca sale de tu dispositivo.' },
    ],
  },
};
