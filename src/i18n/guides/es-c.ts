import type { GuideText } from './types';

/** Spanish how-to guides 18 to 25 (see `src/lib/guides-c.ts`). */
export const esGuidesC: Record<string, GuideText> = {
  'how-to-calculate-an-aspect-ratio': {
    title: 'Cómo calcular una relación de aspecto',
    seoTitle: 'Cómo calcular una relación de aspecto (16:9, 4:3, 1:1)',
    description: 'Halla la relación de aspecto de cualquier ancho y alto, o calcula el alto o el ancho que corresponde a una proporción. Calculadora gratis.',
    intro:
      'Para calcular una relación de aspecto, divide el ancho y el alto entre su máximo común divisor. 1920 por 1080 es 16:9. La Calculadora de relación de aspecto lo hace por ti, y además halla el lado que falta cuando quieres mantener una proporción.',
    steps: [
      'Abre la Calculadora de relación de aspecto y escribe un ancho y un alto en píxeles. Aparece la proporción más simple.',
      'Para cambiar el tamaño según una proporción, elige una como 16:9, 4:3 o 1:1, o escribe la tuya.',
      'Escribe el nuevo ancho y el alto se calcula solo, o escribe el alto y se calcula el ancho.',
      'Usa esos números en la herramienta Cambiar el tamaño de imágenes o Recortar imágenes.',
    ],
    sections: [
      {
        h: 'Proporciones comunes y para qué se usan',
        p: [
          'El cuadrado 1:1 se usa para fotos de perfil. 16:9 es el de los vídeos y la mayoría de las pantallas, 4:3 el de las pantallas antiguas y muchas cámaras, y 3:2 el de las cámaras réflex y las fotos impresas de 4 por 6 pulgadas. 9:16 es para historias y vídeos cortos, y 4:5 para las publicaciones verticales de Instagram.',
          'La calculadora las enumera con su uso, para que elijas la que pide cada sitio.',
        ],
      },
      {
        h: 'Cuando un tamaño solo se parece a una proporción',
        p: [
          'Algunos tamaños se acercan, pero no son exactamente, una proporción común. 1366 por 768 es 683:384, que está a una fracción de punto porcentual de 16:9. La calculadora muestra ambas para que sepas que se parece mucho pero no es exacta.',
          'Los altos y anchos se redondean al píxel entero cuando cambias el tamaño según una proporción.',
        ],
      },
    ],
    faq: [
      { q: '¿Cuál es la relación de aspecto de 1920 x 1080?', a: '16:9. Divide ambos entre 120, su máximo común divisor, y obtienes 16 y 9.' },
      { q: '¿Cómo mantengo la proporción al cambiar el tamaño?', a: 'Elige la proporción y escribe el nuevo ancho. El alto se calcula como el ancho por el alto de la proporción, dividido entre el ancho de la proporción.' },
      { q: '¿Esto cambia mi imagen?', a: 'No. Es una calculadora y no usa ningún archivo.' },
    ],
  },
  'how-to-adjust-the-colours-of-a-photo': {
    title: 'Cómo ajustar el brillo, el contraste y los colores, o pasar una foto a blanco y negro',
    seoTitle: 'Cómo pasar una foto a blanco y negro o ajustar el brillo',
    description: 'Cambia el brillo, el contraste y la intensidad del color, o aplica blanco y negro, sepia o negativo. Vista previa en vivo, en tu navegador.',
    intro:
      'Para pasar una foto a blanco y negro, suéltala en la herramienta Ajustar colores y filtros, elige el filtro "Black and white" y pulsa "Apply". La misma herramienta cambia el brillo, el contraste y la intensidad del color, con vista previa en vivo.',
    steps: [
      'Abre la herramienta Ajustar colores y filtros y suelta tus imágenes.',
      'Mueve los controles "Brightness", "Contrast" y "Colour strength", o elige un filtro como "Black and white".',
      'Mira la vista previa en vivo y usa "Reset" si quieres empezar de nuevo.',
      'Pulsa "Apply" y descarga los archivos, o todos en un ZIP.',
    ],
    sections: [
      {
        h: 'Qué hace cada control',
        p: [
          'El brillo aclara u oscurece todo. El contraste separa más o menos las zonas claras y oscuras. La intensidad del color sube los colores, o los baja hasta el gris, y los filtros dan blanco y negro, sepia (un marrón cálido de foto antigua) o un negativo.',
          'Primero se aplican el brillo y el contraste, luego la intensidad del color y por último el filtro. Muévelos en pasos pequeños, porque los cambios grandes aplanan o queman el detalle.',
        ],
      },
      {
        h: 'Lotes y tipos de archivo',
        p: [
          'Los mismos cambios se aplican a todas las imágenes que añades, así que una carpeta entera puede pasarse a blanco y negro de una vez. La vista previa muestra la primera imagen.',
          'Las zonas transparentes de un PNG siguen siendo transparentes. Cada imagen se guarda en su propio formato, y JPG y WebP se guardan de nuevo en alta calidad.',
        ],
      },
      {
        h: 'Consejos',
        p: [
          'Cambia un control cada vez y mira la vista previa. Es fácil subir el brillo y el contraste a la vez hasta perder el detalle en las zonas más claras y más oscuras.',
          'Para una foto en blanco y negro con más fuerza, elige "Black and white" y añade un poco de contraste. Para un aspecto de foto antigua, el sepia con el brillo algo más bajo funciona bien.',
        ],
      },
    ],
    faq: [
      { q: '¿Cómo paso una imagen a blanco y negro?', a: 'Elige el filtro "Black and white" y pulsa "Apply". Bajar "Colour strength" del todo da un resultado parecido.' },
      { q: '¿Cómo aclaro una foto oscura?', a: 'Mueve el control "Brightness" hacia la derecha, y añade un poco de contraste si se ve plana.' },
      { q: '¿Se sube mi imagen?', a: 'No. Los cambios se hacen en tu navegador.' },
    ],
  },
  'how-to-add-a-border-to-a-picture': {
    title: 'Cómo añadir un borde o marco a una imagen',
    seoTitle: 'Cómo añadir un borde o marco a una imagen (cualquier color)',
    description: 'Pon un borde blanco, negro o de color alrededor de cualquier imagen, o uno transparente. Elige el grosor y mira la vista previa. En tu navegador.',
    intro:
      'Para añadir un borde a una imagen, suéltala en la herramienta Añadir un borde o marco, indica el grosor, elige un color y pulsa "Add border". El borde va alrededor de la imagen, así que no se corta nada y el resultado es un poco más grande.',
    steps: [
      'Abre la herramienta Añadir un borde o marco y suelta tus imágenes.',
      'Indica el grosor del borde.',
      'Elige blanco, negro, amarillo, transparente, o escribe tu propio código de color, como #1e90ff.',
      'Mira la vista previa, pulsa "Add border" y descarga el resultado.',
    ],
    sections: [
      {
        h: 'Un grosor que se adapta',
        p: [
          'El grosor es una parte del lado más corto de la imagen, así que el borde se ve igual en una foto pequeña y en una grande del mismo lote.',
          'Como el borde se añade por fuera, la imagen conserva todo su contenido. Es distinto de dibujar sobre el borde, que taparía parte de ella.',
        ],
      },
      {
        h: 'Bordes transparentes',
        p: [
          'Un borde transparente necesita un formato que admita transparencia, así que un JPG pasa a ser un PNG cuando lo eliges. Las demás imágenes conservan su propio formato.',
          'Si escribes un código de color que no es válido, la página te lo dice en lugar de adivinar. Usa formas como #1e90ff o #fa0.',
        ],
      },
      {
        h: 'Consejos',
        p: [
          'Un borde blanco fino, de entre el 2 y el 4 %, da un aspecto limpio de copia impresa o de galería. Uno más grueso en un color llamativo sirve de marco para una publicación en redes sociales.',
          'Si vas a imprimir la imagen, recuerda que un borde hace el archivo más grande que el original, así que comprueba el tamaño final con el papel o el marco que tengas pensado.',
        ],
      },
    ],
    faq: [
      { q: '¿Cómo añado un borde blanco a una foto?', a: 'Suelta la foto, deja el color en "White", indica el grosor y pulsa "Add border".' },
      { q: '¿El borde tapa mi imagen?', a: 'No. Se añade por fuera, así que la imagen queda completa y el resultado es más grande.' },
      { q: '¿El borde puede ser transparente?', a: 'Sí. Elige "Transparent". El resultado es un PNG, porque JPG no puede ser transparente.' },
    ],
  },
  'how-to-get-a-hex-color-from-an-image': {
    title: 'Cómo obtener el código de color HEX de una imagen',
    seoTitle: 'Cómo obtener el código de color HEX de una imagen',
    description: 'Haz clic en cualquier imagen para obtener el color exacto en HEX, RGB y HSL, con copia en un clic. También funciona con el teclado. En tu navegador.',
    intro:
      'Para obtener el código HEX de un color de una imagen, suéltala en el Selector de color de una imagen, pasa el puntero por encima para ver el color y haz clic para elegirlo. Aparecen los códigos HEX, RGB y HSL, cada uno con un botón "Copy".',
    steps: [
      'Abre el Selector de color de una imagen y suelta una imagen.',
      'Pasa el puntero por la imagen para ver el color que hay debajo.',
      'Haz clic o toca para elegirlo y pulsa "Copy" junto al código que necesites.',
      'Elige tantos colores como quieras. Los últimos diez se quedan debajo para que puedas volver a ellos.',
    ],
    sections: [
      {
        h: 'HEX, RGB y HSL',
        p: [
          'Son tres formas de escribir el mismo color. HEX es el código corto que se usa en las páginas web, como #1E90FF. RGB da las cantidades de rojo, verde y azul de 0 a 255, y HSL da el matiz, la saturación y la luminosidad, que es más fácil de ajustar a mano.',
          'El panel muestra los tres, para que pegues el que pida tu herramienta de diseño o tu hoja de estilos.',
        ],
      },
      {
        h: 'Conseguir un color fiable',
        p: [
          'Una foto está hecha de millones de píxeles ligeramente distintos, así que dos puntos que parecen iguales pueden diferir en unos pocos pasos. Haz clic en varios sitios, o usa la herramienta de paleta para encontrar los colores principales.',
          'Sin ratón, haz clic una vez en la imagen, y luego usa las flechas para moverte y Intro para elegir. Si un píxel es transparente, la página lo indica, porque lo que ves en pantalla también depende de lo que haya detrás.',
        ],
      },
    ],
    faq: [
      { q: '¿Cómo encuentro el código HEX de un color de una imagen?', a: 'Suelta la imagen, haz clic en el color y copia el código HEX que aparece.' },
      { q: '¿Por qué píxeles cercanos dan códigos distintos?', a: 'Las fotos contienen pequeñas variaciones. Haz clic en varios puntos o usa la herramienta de paleta para ver los colores principales.' },
      { q: '¿Se sube mi imagen?', a: 'No. El color se lee en tu navegador.' },
    ],
  },
  'how-to-get-a-color-palette-from-an-image': {
    title: 'Cómo obtener una paleta de colores de una imagen',
    seoTitle: 'Cómo obtener una paleta de colores de una imagen (HEX, CSS)',
    description: 'Extrae los colores principales de una imagen con sus códigos HEX y cuánto cubre cada uno. Copia la lista o las variables CSS.',
    intro:
      'Para obtener una paleta de colores de una imagen, suéltala en el Generador de paleta de colores. Los colores principales aparecen como muestras con sus códigos HEX y la parte de la imagen que cubre cada uno, y puedes copiarlos como lista o como CSS.',
    steps: [
      'Abre el Generador de paleta de colores y suelta una imagen.',
      'Los colores principales aparecen al instante. Usa el control deslizante para pedir menos o más, de 2 a 12.',
      'Haz clic en una muestra para copiar su código HEX.',
      'O copia toda la paleta como lista o como variables CSS.',
    ],
    sections: [
      {
        h: 'Cómo se eligen los colores',
        p: [
          'Los píxeles parecidos se agrupan y cada grupo se promedia en un solo color, así que el color que ocupa la mayor parte de la imagen va primero. El porcentaje de una muestra es cuánto de la imagen cubre ese grupo.',
          'Los píxeles totalmente o casi transparentes se ignoran, así que un logotipo sobre fondo transparente da los colores del logotipo, no un oscuro vacío.',
        ],
      },
      {
        h: 'Usar la paleta',
        p: [
          'Copiar como variables CSS da propiedades personalizadas como --colour-1 que puedes pegar directamente en una hoja de estilos. La lista simple es práctica para notas o para una herramienta de diseño.',
          'Si la imagen tiene menos colores distintos que los que pediste, solo obtienes los que tiene. Un logotipo de tres colores da tres muestras, no doce. Para un color exacto, usa mejor el selector de color.',
        ],
      },
      {
        h: 'Consejos',
        p: [
          'Usa una imagen con el ambiente que quieres. Una paleta es tan buena como la imagen de la que sale, y una foto de un atardecer da colores muy distintos de los de una foto de producto.',
          'Elige dos o tres colores de la paleta en lugar de todos. La mayoría de los diseños funcionan mejor con un color principal, un acento y un neutro, y los porcentajes indican cuáles son los mejores candidatos.',
        ],
      },
    ],
    faq: [
      { q: '¿Cuántos colores puedo obtener?', a: 'De 2 a 12. Seis es un buen punto de partida para una paleta de marca o de diseño.' },
      { q: '¿Puedo usar la paleta en mi sitio web?', a: 'Sí. Copia como variables CSS y pega el resultado en tu hoja de estilos.' },
      { q: '¿Se sube mi imagen?', a: 'No. Los colores se calculan en tu navegador.' },
    ],
  },
  'how-to-convert-an-image-to-base64': {
    title: 'Cómo convertir una imagen a Base64 (y a la inversa)',
    seoTitle: 'Cómo convertir una imagen a Base64 y decodificarla',
    description: 'Convierte una imagen en un data URI Base64 para HTML o CSS, o pega Base64 y recupera la imagen. En tu navegador, sin subir nada.',
    intro:
      'Para convertir una imagen a Base64, suéltala en la herramienta Imagen a Base64 y copia el resultado. Lo predeterminado es un data URI que puedes pegar en HTML o CSS. Para volver atrás, elige "Base64 to image", pega el texto y descarga la imagen.',
    steps: [
      'Abre la herramienta Imagen a Base64 y elige "Image to Base64".',
      'Suelta la imagen. El archivo original se codifica tal cual, así que un SVG sigue siendo un SVG.',
      'Elige el formato que necesitas: un data URI, Base64 simple, un fondo CSS o una etiqueta de imagen HTML, y pulsa "Copy".',
      'Para decodificar, elige "Base64 to image", pega el texto y descarga la imagen.',
    ],
    sections: [
      {
        h: 'Cuándo conviene usar Base64',
        p: [
          'Base64 escribe los bytes de un archivo como texto plano, así que una imagen pequeña puede ir dentro de una página web, una hoja de estilos o un correo sin un archivo aparte. El texto es aproximadamente un tercio más largo que el archivo.',
          'Va bien para imágenes pequeñas como iconos y logotipos. Con una foto grande el texto se vuelve larguísimo y un archivo de imagen normal carga más rápido, por eso la herramienta te avisa por encima de 100 KB.',
        ],
      },
      {
        h: 'Volver a pegar Base64',
        p: [
          'Puedes pegar un data URI completo o solo los caracteres Base64. La herramienta lee el tipo de imagen de los propios datos (PNG, JPG, GIF, WebP, BMP, AVIF, SVG o ICO) y se fía de ellos antes que de una etiqueta equivocada.',
          'Si el texto se cortó al copiarlo, o no es una imagen, recibes un mensaje claro que lo dice en lugar de una descarga rota.',
        ],
      },
    ],
    faq: [
      { q: '¿Qué es un data URI?', a: 'Una forma de meter un archivo dentro de una dirección web. Empieza con data:, el tipo de archivo y ;base64, seguidos del texto Base64.' },
      { q: '¿Por qué el texto Base64 es más grande que el archivo?', a: 'Base64 usa cuatro caracteres de texto por cada tres bytes, así que el texto es aproximadamente un 33 % más largo.' },
      { q: '¿Se sube mi imagen?', a: 'No. La codificación y la decodificación ocurren en tu navegador.' },
    ],
  },
  'how-to-make-a-favicon': {
    title: 'Cómo crear un favicon para tu sitio web',
    seoTitle: 'Cómo crear un favicon (favicon.ico, PNG, Apple Touch Icon)',
    description: 'Crea favicon.ico, PNG de 16 y 32 píxeles, un icono Apple touch e iconos de Android a partir de una imagen, con el código para pegar en tu página.',
    intro:
      'Para crear un favicon, suelta una imagen en el Generador de favicon y pulsa "Make favicons". Obtienes favicon.ico, PNG de 16 y 32 píxeles, un icono Apple touch y dos iconos de Android, con el código para pegar en tu página.',
    steps: [
      'Abre el Generador de favicon y suelta una imagen. Una imagen cuadrada de 512 píxeles o más da el mejor resultado.',
      'Si no es cuadrada, elige recortarla a un cuadrado desde el centro, o conservarla entera con barras transparentes.',
      'Pulsa "Make favicons" y descarga los archivos, o todos en un ZIP.',
      'Pon los archivos en la carpeta raíz de tu sitio y pega el código que se muestra en el head de tus páginas.',
    ],
    sections: [
      {
        h: 'Lo que obtienes',
        p: [
          'favicon.ico contiene las versiones de 16, 32 y 48 píxeles en un solo archivo. favicon-16x16.png y favicon-32x32.png son para las pestañas del navegador, apple-touch-icon.png (180 píxeles) es para iPhone y iPad, y los iconos de 192 y 512 píxeles son para Android y las aplicaciones web instalables.',
          'La vista previa muestra tu icono a 16, 32 y 64 píxeles para que lo compruebes antes de descargar.',
        ],
      },
      {
        h: 'Que se vea bien en pequeño',
        p: [
          'Un favicon es diminuto, así que una forma simple con colores fuertes se lee mejor. Las imágenes con mucho detalle se vuelven una mancha a 16 píxeles, así que parte de un logotipo sencillo o de una sola letra.',
          'Una imagen de menos de 512 píxeles se amplía para los iconos más grandes y puede verse borrosa, y la página te avisa cuando ocurre. Un fondo transparente se conserva.',
        ],
      },
    ],
    faq: [
      { q: '¿Qué archivos necesita un sitio web para el favicon?', a: 'Un favicon.ico, PNG de 16 y 32 píxeles para las pestañas, un icono Apple touch de 180 píxeles e iconos de 192 y 512 píxeles para Android. La herramienta crea todos.' },
      { q: '¿Qué tamaño debe tener mi imagen?', a: 'Cuadrada y de al menos 512 por 512 píxeles. Las más pequeñas sirven, pero los iconos grandes se ven borrosos.' },
      { q: '¿El favicon.ico es un archivo ICO de verdad?', a: 'Sí. Contiene los iconos de 16, 32 y 48 píxeles en un archivo ICO estándar.' },
    ],
  },
  'are-online-image-tools-safe': {
    title: '¿Son seguras las herramientas de imagen en línea? Cómo comprobar la tuya',
    seoTitle: '¿Son seguras las herramientas de imagen en línea?',
    description: 'Muchas herramientas de imagen en línea suben tu foto a un servidor. Cómo saberlo, cómo comprobarlo en dos minutos y qué hace iDuckImg en cambio.',
    intro:
      'Una herramienta de imagen en línea es tan privada como el lugar donde hace su trabajo. Muchas envían tu foto a un servidor; iDuckImg trabaja en tu navegador, así que el archivo se queda en tu dispositivo. Puedes comprobarlo tú mismo en la pestaña Red del navegador.',
    steps: [
      'Abre la página de la herramienta, luego abre las herramientas para desarrolladores de tu navegador (F12) y elige la pestaña Red.',
      'Vacía la lista, suelta una imagen en la herramienta y ejecútala.',
      'Busca peticiones grandes que lleven tu imagen, normalmente mostradas como POST o PUT. Una herramienta que trabaja en tu dispositivo no muestra ninguna.',
      'Lee la política de privacidad de cualquier herramienta que uses y comprueba qué dice que conserva y durante cuánto tiempo.',
    ],
    sections: [
      {
        h: 'Por qué importa',
        p: [
          'Una foto puede contener caras, documentos, el número de una casa y datos ocultos como el lugar exacto donde se tomó. Subirla entrega una copia a otra persona, y no puedes ver qué ocurre después.',
          'Las herramientas que funcionan en tu navegador evitan eso, porque tu propio dispositivo procesa el archivo y nunca se envía. Además suelen ser más rápidas, porque no hay subida ni descarga.',
        ],
      },
      {
        h: 'Qué hace iDuckImg',
        p: [
          'Todas las herramientas de iDuckImg funcionan en tu navegador. Tus imágenes no se suben, no hay registro y no se añade ninguna marca de agua. La página carga su propio código y sus archivos desde el mismo sitio, y para algunos formatos, como HEIC, un decodificador del mismo sitio. No hace peticiones a otras empresas.',
          'Aun así conviene hacer esto: elimina los datos de ubicación ocultos antes de compartir una foto, y usa "Cover" en lugar de un desenfoque ligero para ocultar cualquier cosa privada. Las herramientas Eliminar datos EXIF y Desenfocar u ocultar partes de una imagen hacen esos trabajos en tu dispositivo.',
        ],
      },
    ],
    faq: [
      { q: '¿Cómo sé si una herramienta sube mi foto?', a: 'Abre la pestaña Red en las herramientas para desarrolladores de tu navegador, ejecuta la herramienta y busca una petición grande que lleve tu imagen. Si no hay ninguna, el trabajo se hizo en tu dispositivo.' },
      { q: '¿iDuckImg sube mis imágenes?', a: 'No. Cada herramienta funciona en tu navegador y tus archivos se quedan en tu dispositivo.' },
      { q: '¿Es seguro compartir una foto después de editarla?', a: 'Elimina primero los datos ocultos de ubicación y de la cámara, y oculta cualquier cosa privada de la propia imagen con una tapa sólida.' },
    ],
  },
};
