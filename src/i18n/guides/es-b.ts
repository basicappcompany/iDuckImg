import type { GuideText } from './types';

/** Spanish how-to guides 9 to 17 (see `src/lib/guides-b.ts`). */
export const esGuidesB: Record<string, GuideText> = {
  'how-to-rotate-or-flip-an-image': {
    title: 'Cómo girar o voltear una imagen',
    seoTitle: 'Cómo girar o voltear una imagen en línea (gratis)',
    description: 'Gira una imagen 90, 180 o 270 grados, o hazla en espejo en horizontal o en vertical. Funciona con JPG, PNG y WebP, en tu navegador.',
    intro:
      'Para girar una imagen, suéltala en la herramienta Girar y voltear, pulsa el botón de girar a la izquierda o a la derecha hasta que la vista previa sea correcta y pulsa "Aplicar". Los mismos botones también la reflejan en horizontal o en vertical.',
    steps: [
      'Abre la herramienta Girar y voltear y suelta tus archivos JPG, PNG o WebP.',
      'Usa los botones para girar a la izquierda o a la derecha, o para voltear. La vista previa muestra el resultado.',
      'Pulsa "Aplicar".',
      'Descarga cada archivo, o todos en un ZIP.',
    ],
    sections: [
      {
        h: 'Girar o voltear: ¿cuál usar?',
        p: [
          'Girar da la vuelta a toda la imagen 90, 180 o 270 grados, y así se arregla una foto que salió de lado o boca abajo. Voltear la refleja como en un espejo, y es lo que corrige un texto que se lee al revés en la cámara frontal.',
          'Puedes combinar ambas cosas. Gira primero, voltea después y mira la vista previa hasta que quede bien.',
        ],
      },
      {
        h: 'Muchas imágenes a la vez',
        p: [
          'El mismo cambio se aplica a todas las imágenes que añades, así que un lote entero de fotos de lado se arregla de una vez. PNG sigue siendo sin pérdida. JPG y WebP se guardan de nuevo en alta calidad.',
          'Mira primero la vista previa: solo muestra la primera imagen, así que en un lote deben ir imágenes que necesiten el mismo giro.',
        ],
      },
      {
        h: 'Consejos',
        p: [
          'Si solo algunas de tus fotos están de lado, gira esas en un lote y el resto en otro. Cada lote recibe exactamente un cambio, así que las imágenes mezcladas necesitan tandas separadas.',
          'Conserva tus archivos originales. Girar 90 grados es reversible, pero guardar de nuevo un JPG siempre lo cambia un poquito, así que mejor no repetirlo muchas veces.',
        ],
      },
    ],
    faq: [
      { q: '¿Cómo giro una foto que está de lado?', a: 'Suéltala, pulsa girar a la izquierda o a la derecha hasta que quede derecha, pulsa "Aplicar" y descárgala.' },
      { q: '¿Qué diferencia hay entre girar y voltear?', a: 'Girar da la vuelta a la imagen. Voltear la refleja, como si la miraras en un espejo.' },
      { q: '¿Girar reduce la calidad?', a: 'PNG sigue siendo sin pérdida. JPG y WebP se guardan de nuevo en alta calidad, así que cualquier cambio es muy pequeño.' },
    ],
  },
  'how-to-remove-location-and-exif-data-from-a-photo': {
    title: 'Cómo eliminar la ubicación y los datos EXIF de una foto',
    seoTitle: 'Cómo quitar los datos EXIF y GPS de una foto',
    description: 'Borra la ubicación, la fecha y los datos de la cámara ocultos en una foto antes de compartirla. En tu navegador y sin recomprimir la imagen.',
    intro:
      'Para eliminar los datos EXIF de una foto, suéltala en la herramienta Eliminar datos EXIF y pulsa "Quitar metadatos". Se borran la ubicación GPS, la fecha y los datos de la cámara ocultos, y la imagen en sí no se vuelve a comprimir.',
    steps: [
      'Abre la herramienta Eliminar datos EXIF y suelta tus fotos JPG, PNG o WebP.',
      'Pulsa "Quitar metadatos".',
      'Descarga cada archivo limpio, o todos en un ZIP.',
      'Si quieres, comprueba el resultado: en Windows, haz clic derecho en el archivo, elige Propiedades y abre la pestaña Detalles.',
    ],
    sections: [
      {
        h: 'Qué se esconde en una foto',
        p: [
          'Los móviles y las cámaras escriben datos extra en el archivo: el lugar exacto donde se tomó, la fecha y la hora, y el modelo del dispositivo. Cualquiera que reciba el archivo original puede leerlos, aunque la imagen no muestre nada privado.',
          'Muchas redes sociales eliminan parte de estos datos por su cuenta, pero no todas, y una foto enviada por correo o por chat suele llegar sin cambios. Limpiarla antes es el hábito seguro.',
        ],
      },
      {
        h: 'Lo que esto no oculta',
        p: [
          'Quitar los metadatos no cambia lo que hay en la imagen. Un cartel de calle, el número de una casa o una cara siguen siendo visibles. Para ocultar parte de la propia imagen, usa la herramienta Desenfocar u ocultar partes de una imagen.',
          'Como los datos de un JPG no se vuelven a comprimir, la imagen se ve exactamente igual que antes y el archivo solo pesa un poco menos.',
        ],
      },
      {
        h: 'Consejos',
        p: [
          'Limpia las fotos antes de enviarlas, no después. Una imagen que ya publicaste o enviaste por correo no se puede recuperar, pero la siguiente sí puede salir limpia.',
          'Las capturas de pantalla normalmente no llevan ubicación, así que son una forma segura de compartir lo que se ve en una pantalla. Las fotos de la cámara del móvil son las que vale la pena limpiar, sobre todo las tomadas en casa.',
        ],
      },
    ],
    faq: [
      { q: '¿Qué son los datos EXIF?', a: 'Es información guardada dentro del archivo de una foto: dónde se tomó, cuándo, y con qué dispositivo y ajustes.' },
      { q: '¿Quitar los datos EXIF cambia la imagen?', a: 'No. La imagen no se vuelve a comprimir, así que se ve exactamente igual.' },
      { q: '¿Se sube mi foto?', a: 'No. Los datos se eliminan en tu navegador y el archivo nunca sale de tu dispositivo.' },
    ],
  },
  'how-to-make-a-round-profile-picture': {
    title: 'Cómo hacer una foto de perfil redonda',
    seoTitle: 'Cómo hacer una foto de perfil redonda (recorte circular)',
    description: 'Recorta cualquier foto en círculo, o solo redondea las esquinas, y guárdala como PNG con esquinas transparentes. Gratis, en tu navegador.',
    intro:
      'Para hacer una foto de perfil redonda, suelta una foto en la herramienta Recorte circular y esquinas redondeadas, elige "Circle" y pulsa "Make it round". Obtienes un PNG con esquinas transparentes, que conserva el cuadrado central de tu foto.',
    steps: [
      'Abre la herramienta Recorte circular y esquinas redondeadas y suelta tu imagen.',
      'Elige "Circle", o "Rounded corners" si solo quieres bordes suaves.',
      'Pulsa "Make it round".',
      'Descarga el PNG.',
    ],
    sections: [
      {
        h: 'Por qué el resultado es un PNG',
        p: [
          'Una imagen redonda necesita esquinas transparentes, y JPG no puede ser transparente. PNG sí, así que el resultado siempre es un PNG. Ponlo sobre un fondo de color y conserva su forma redonda.',
          'La mayoría de los cuadros de foto de perfil recortan en círculo por ti. Esta herramienta es útil cuando necesitas la imagen redonda como archivo.',
        ],
      },
      {
        h: 'Encuadrar la cara',
        p: [
          'Un círculo conserva el cuadrado central de la foto. Si la cara queda a un lado, recorta primero la imagen para que la cara esté en el centro y después hazla redonda.',
          'La herramienta Recortar imágenes con la forma 1:1 lo hace en un solo paso.',
        ],
      },
      {
        h: 'Consejos',
        p: [
          'Parte de una imagen de al menos unos cientos de píxeles de ancho. Una imagen redonda suele mostrarse pequeña, pero para que los bordes se vean nítidos hacen falta suficientes píxeles desde el principio.',
          'Deja algo de espacio alrededor de la cara. Un círculo corta las esquinas, así que un recorte muy ajustado a la cabeza puede acabar cortando el pelo o la barbilla.',
        ],
      },
    ],
    faq: [
      { q: '¿Puedo hacer una imagen circular con fondo transparente?', a: 'Sí. Las esquinas fuera del círculo son transparentes en el PNG que descargas.' },
      { q: '¿Y si mi foto no es cuadrada?', a: 'El círculo usa el cuadrado central de la imagen. Recorta antes si quieres otra parte.' },
      { q: '¿Se sube mi imagen?', a: 'No. Se procesa en tu navegador y se queda en tu dispositivo.' },
    ],
  },
  'how-to-split-an-image-into-a-grid': {
    title: 'Cómo dividir una imagen en una cuadrícula de teselas',
    seoTitle: 'Cómo dividir una imagen en cuadrícula (Instagram, puzles)',
    description: 'Corta una imagen en filas y columnas iguales para una publicación en cuadrícula o un puzle, hasta 10 por 10, y descarga las teselas en un ZIP.',
    intro:
      'Para dividir una imagen en una cuadrícula, suéltala en la herramienta Dividir una imagen en cuadrícula, elige cuántas filas y columnas quieres y pulsa el botón "Split". Cada tesela se guarda como una imagen aparte, y puedes descargarlas todas en un ZIP.',
    steps: [
      'Abre la herramienta Dividir una imagen en cuadrícula y suelta tu imagen.',
      'Elige el número de filas y columnas, hasta 10 por 10.',
      'Pulsa el botón "Split".',
      'Descarga las teselas, o todas en un ZIP.',
    ],
    sections: [
      {
        h: 'Publicaciones en cuadrícula y puzles',
        p: [
          'Para una cuadrícula en redes sociales, publica las teselas en el orden correcto para que encajen en el perfil. Una división de 3 por 1 da un panorama ancho en tres publicaciones, y 3 por 3 da nueve cuadrados.',
          'Las teselas se nombran por fila y columna, por ejemplo photo-r1-c2.jpg, así sabes qué pieza va en cada sitio.',
        ],
      },
      {
        h: 'Sin perder ni un píxel',
        p: [
          'Cada píxel de la imagen acaba en una sola tesela, así que las piezas encajan de nuevo sin que falte nada ni se repita nada. Si el tamaño no se divide de forma exacta, las teselas difieren como máximo en un píxel.',
          'Las teselas conservan el formato de la imagen. Dale primero a la imagen la forma que quieres, porque una imagen alta da teselas altas.',
        ],
      },
      {
        h: 'Consejos',
        p: [
          'Recorta antes la imagen con la forma adecuada. Una cuadrícula de 3 por 3 queda mejor con una imagen cuadrada, y un panorama de 3 por 1 con una imagen ancha cuyo ancho sea tres veces su alto.',
          'Sube las teselas en orden inverso si el sitio muestra primero la publicación más reciente, para que encajen bien en el perfil. Comprueba el diseño en tu móvil antes de compartirlo.',
        ],
      },
    ],
    faq: [
      { q: '¿Cómo divido una foto para una cuadrícula de Instagram?', a: 'Elige las filas y columnas que correspondan a tu cuadrícula, por ejemplo 3 por 3, y publica las teselas en orden.' },
      { q: '¿Cuántas teselas puedo hacer?', a: 'Hasta 10 filas y 10 columnas.' },
      { q: '¿Cómo se nombran las teselas?', a: 'Por fila y columna, como nombre-r1-c1.jpg, para que puedas volver a ponerlas en orden.' },
    ],
  },
  'how-to-add-text-to-a-picture': {
    title: 'Cómo añadir texto a una imagen',
    seoTitle: 'Cómo añadir texto a una imagen o foto en línea (gratis)',
    description: 'Escribe un pie o un título sobre una imagen. Elige la posición, el tamaño y el color, con un panel opcional detrás del texto. En tu navegador.',
    intro:
      'Para añadir texto a una imagen, suéltala en la herramienta Añadir texto a una imagen, escribe hasta cinco líneas, elige dónde van, ajusta el tamaño y el color y pulsa "Añadir texto". Un panel oscuro o claro detrás del texto lo mantiene legible sobre una foto muy cargada.',
    steps: [
      'Abre la herramienta Añadir texto a una imagen y suelta tu imagen.',
      'Escribe tu texto, hasta cinco líneas.',
      'Elige una de las nueve posiciones, el tamaño y el color. Añade un panel oscuro o claro si el fondo está muy cargado.',
      'Pulsa "Añadir texto" y descarga el resultado.',
    ],
    sections: [
      {
        h: 'Cómo hacer que el texto se lea bien',
        p: [
          'El texto sobre una foto cuesta de leer cuando el fondo tiene zonas claras y oscuras. El panel opcional pone una banda sólida detrás de las palabras, lo que lo soluciona sin cambiar la imagen.',
          'El tamaño es una parte del ancho de la imagen, así que un pie de foto se ve igual en una imagen pequeña y en una grande.',
        ],
      },
      {
        h: 'Límites que conviene conocer',
        p: [
          'Puedes añadir hasta cinco líneas de hasta 60 caracteres. Para un texto más largo, haz la imagen más grande o usa varias imágenes.',
          'La vista previa muestra la primera imagen, y el mismo texto va en todas las imágenes que añades.',
        ],
      },
      {
        h: 'Consejos',
        p: [
          'Sé breve. Un texto grande y corto se lee bien en el móvil, y el tamaño se escala con la imagen, así que un título corto suele quedar mejor que un pie largo.',
          'Elige el color que más contraste tenga con la zona que hay detrás del texto, o activa el panel. Mira la vista previa en tamaño pequeño, porque así es como la verá la mayoría de la gente.',
        ],
      },
    ],
    faq: [
      { q: '¿Cuántas líneas puedo añadir?', a: 'Hasta cinco líneas, cada una de hasta 60 caracteres.' },
      { q: '¿Puedo poner texto en muchas imágenes?', a: 'Sí. El mismo texto va en todas las imágenes, y puedes descargarlas todas juntas.' },
      { q: '¿Se sube mi imagen?', a: 'No. El texto se dibuja en tu navegador.' },
    ],
  },
  'how-to-turn-a-photo-into-pixel-art': {
    title: 'Cómo convertir una foto en pixel art',
    seoTitle: 'Cómo convertir una foto en pixel art (gratis, en tu navegador)',
    description: 'Crea pixel art de píxeles grandes a partir de cualquier foto. Elige el tamaño de los píxeles y cuántos colores conservar. PNG, sin subir nada.',
    intro:
      'Para convertir una foto en pixel art, suéltala en el Creador de pixel art, mueve el control deslizante para elegir cuántos píxeles grandes caben a lo ancho y pulsa "Make pixel art". Cuantos menos píxeles a lo ancho, más grueso el resultado, que es un PNG.',
    steps: [
      'Abre el Creador de pixel art y suelta tus imágenes.',
      'Mueve el control deslizante para fijar cuántos píxeles grandes caben a lo ancho. Menos píxeles dan un resultado más grueso.',
      'Si quieres, elige "Retro" o "Very few colours" para un aspecto de consola de videojuegos.',
      'Pulsa "Make pixel art" y descarga el PNG.',
    ],
    sections: [
      {
        h: 'Encontrar el grosor adecuado',
        p: [
          'Las caras quedan mejor con unos 32 a 64 píxeles a lo ancho. Los paisajes se ven bien con más. Cada píxel grande es el color medio de un bloque cuadrado de la foto.',
          'La vista previa usa el mismo código que el archivo guardado, así que lo que ves es lo que obtienes.',
        ],
      },
      {
        h: 'Limitar los colores',
        p: [
          '"Retro" conserva seis tonos de cada color y "Very few colours" conserva tres, lo que da un aspecto plano, de videojuego. Conserva los colores originales si quieres que los píxeles sigan pareciéndose a la foto.',
          'El resultado es un PNG del mismo tamaño que tu imagen, porque un JPG difuminaría los bordes nítidos de cada píxel grande.',
        ],
      },
      {
        h: 'Consejos',
        p: [
          'Empieza con una foto sencilla y de alto contraste. Una cara sobre un fondo liso aguanta mucho mejor los píxeles gruesos que una escena de calle muy cargada.',
          'Prueba varios ajustes y compara. Pasar de 48 a 32 píxeles a lo ancho cambia mucho el aspecto, y los colores "Retro" pueden convertir una foto normal en algo que parece una pantalla de videojuego.',
        ],
      },
    ],
    faq: [
      { q: '¿Por qué el resultado es un PNG?', a: 'Un PNG conserva los bordes nítidos de cada píxel grande. Un JPG los difuminaría.' },
      { q: '¿Cuántos píxeles debo usar para una cara?', a: 'Entre 32 y 64 a lo ancho suele funcionar bien.' },
      { q: '¿La imagen conserva su tamaño?', a: 'Sí. El resultado tiene el mismo tamaño que el original.' },
    ],
  },
  'how-to-merge-images-side-by-side': {
    title: 'Cómo unir imágenes lado a lado o una encima de otra',
    seoTitle: 'Cómo unir imágenes lado a lado o apiladas (gratis)',
    description: 'Une dos o más imágenes en una, en fila o en columna, con un espacio y un fondo opcionales. Se guarda como PNG, JPG o WebP. En tu navegador.',
    intro:
      'Para unir imágenes, suelta dos o más en la herramienta Unir imágenes lado a lado, ordénalas, elige lado a lado o apiladas y pulsa "Join pictures". Se escalan a una altura o un ancho común para que ninguna se estire.',
    steps: [
      'Abre la herramienta Unir imágenes lado a lado y suelta dos o más imágenes.',
      'Ordénalas con "Up" y "Down", y quita las que no quieras.',
      'Elige lado a lado o apiladas, el espacio entre ellas y el fondo.',
      'Pulsa "Join pictures" y descarga el resultado como PNG, JPG o WebP.',
    ],
    sections: [
      {
        h: 'Igualar los tamaños',
        p: [
          'De forma predeterminada, cada imagen se escala a la menor altura común (en una fila) o al menor ancho común (en una columna), de modo que ninguna se agranda y se vuelve borrosa. Si prefieres que cada imagen conserve su propio tamaño, elige esa opción y se centran.',
          'Un espacio entre imágenes y un fondo blanco, negro o transparente completan el resultado. Elige transparente con PNG o WebP.',
        ],
      },
      {
        h: 'Límites de tamaño',
        p: [
          'Un resultado de más de 100 megapíxeles se rechaza con un mensaje claro, porque un móvil no podría manejarlo. En ese caso usa menos imágenes o más pequeñas.',
          'Las fotos de antes y después quedan bien como una fila de dos. Una pila alta de capturas de pantalla queda bien como columna.',
        ],
      },
      {
        h: 'Consejos',
        p: [
          'Recorta antes tus imágenes con formas parecidas. Las imágenes con la misma altura se alinean bien en una fila, y así la herramienta no tiene nada que reducir.',
          'Usa un espacio pequeño y un fondo blanco para un antes y después limpio. No dejes espacio para un panorama continuo hecho con imágenes pensadas para encajar.',
        ],
      },
    ],
    faq: [
      { q: '¿Cómo pongo dos fotos lado a lado?', a: 'Suelta las dos, elige lado a lado y pulsa "Join pictures".' },
      { q: '¿Se estirarán mis imágenes?', a: 'No. Se escalan a una altura o un ancho común, manteniendo sus proporciones.' },
      { q: '¿Puedo cambiar el orden?', a: 'Sí. Usa "Up" y "Down" en cada imagen de la lista.' },
    ],
  },
  'how-to-blur-or-hide-part-of-an-image': {
    title: 'Cómo desenfocar u ocultar parte de una imagen',
    seoTitle: 'Cómo desenfocar u ocultar partes de una imagen',
    description: 'Arrastra recuadros sobre un nombre, un número o una cara y desenfócalos, pixélalos o tápalos. En tu navegador: el original no sale de tu dispositivo.',
    intro:
      'Para ocultar parte de una imagen, suéltala en la herramienta Desenfocar u ocultar partes de una imagen, arrastra un recuadro sobre el nombre, el número o la cara, elige "Blur", "Pixelate" o "Cover" y pulsa el botón. "Cover" es la opción más segura para cualquier dato sensible.',
    steps: [
      'Abre la herramienta Desenfocar u ocultar partes de una imagen y suelta tu imagen.',
      'Arrastra un recuadro sobre cada zona que quieras ocultar. Puedes añadir tantos como necesites.',
      'Elige "Blur", "Pixelate" o "Cover" con un color sólido.',
      'Pulsa el botón y descarga la nueva imagen.',
    ],
    sections: [
      {
        h: '¿Desenfocar, pixelar o tapar?',
        p: [
          'Un desenfoque ligero puede dejar el texto parcialmente legible, y alguien decidido a veces puede recuperar dígitos de un desenfoque o pixelado débil. "Cover" pinta un bloque sólido, así que no queda nada que recuperar.',
          'Usa "Cover" para números de tarjeta, números de cuenta y cualquier cosa privada. Usa el desenfoque para caras y fondos donde importa más el aspecto que la seguridad.',
        ],
      },
      {
        h: 'Recuadros precisos y muchas imágenes',
        p: [
          'Cada recuadro también tiene casillas numéricas para su posición en porcentaje, que funcionan sin ratón y te permiten ajustarlo con exactitud. La vista previa en vivo usa el mismo código que el archivo guardado.',
          'Si sueltas varias imágenes, los mismos recuadros se aplican a todas, lo que va bien para capturas de pantalla con el mismo diseño. Tus archivos originales nunca se modifican.',
        ],
      },
      {
        h: 'Consejos',
        p: [
          'Haz el recuadro un poco más grande que lo que quieres ocultar. Los bordes de las letras y las caras sobresalen, y un recuadro muy justo puede dejar una franja visible.',
          'Después de guardar, abre la nueva imagen y haz zoom. Si aún puedes leer o reconocer algo, vuelve a hacerlo con "Cover". Y recuerda que los datos de ubicación ocultos son aparte de lo que se ve, así que límpialos también.',
        ],
      },
    ],
    faq: [
      { q: '¿Basta un desenfoque para ocultar un número de tarjeta?', a: 'No. Un desenfoque ligero puede quedar parcialmente legible. Usa "Cover", que pinta un bloque sólido.' },
      { q: '¿Puedo ocultar varias zonas?', a: 'Sí. Añade tantos recuadros como necesites.' },
      { q: '¿Se sube mi imagen?', a: 'No. El efecto se aplica en tu navegador y el original se queda en tu dispositivo.' },
    ],
  },
  'how-to-convert-pixels-to-cm-and-inches': {
    title: 'Cómo convertir píxeles a centímetros y pulgadas',
    seoTitle: 'Cómo convertir píxeles a cm, mm y pulgadas (con DPI)',
    description: 'Calcula qué tamaño tiene una imagen en papel a partir de sus píxeles y DPI, o cuántos píxeles necesita un A4. Calculadora gratis con tamaños de papel.',
    intro:
      'Para convertir píxeles a centímetros, divide los píxeles entre los DPI para obtener pulgadas y multiplica por 2,54. A 300 DPI, 1 cm son unos 118 píxeles, y el Conversor de píxeles, cm y pulgadas hace la cuenta para cualquier longitud y resolución.',
    steps: [
      'Abre el Conversor de píxeles, cm y pulgadas y escribe la longitud que tienes.',
      'Elige su unidad: píxeles, centímetros, milímetros o pulgadas.',
      'Elige la resolución en DPI. Usa 300 para fotos impresas y 72 o 96 para pantallas.',
      'Lee la misma longitud en todas las unidades, y el tamaño en píxeles de los papeles más comunes.',
    ],
    sections: [
      {
        h: 'Por qué importan los DPI',
        p: [
          'Los píxeles por sí solos no tienen tamaño físico. Los mismos 1200 píxeles miden 4 pulgadas de ancho a 300 DPI y unas 16,7 pulgadas a 72 DPI. Los DPI indican cuántos píxeles caben en una pulgada.',
          'Para imprimir, 300 DPI es el objetivo habitual para fotos. 150 DPI sirve para borradores, y las pantallas solo cuentan los píxeles.',
        ],
      },
      {
        h: 'Tamaños comunes en píxeles',
        p: [
          'A 300 DPI, una página A4 mide 2480 por 3508 píxeles, y una foto impresa de 4 por 6 pulgadas mide 1200 por 1800 píxeles. La tabla de la página muestra A4, A5, A3, US Letter y fotos de pasaporte con los DPI que elijas.',
          'Cambiar el ajuste de DPI de un archivo no cambia sus píxeles. Para cambiar el tamaño real de una imagen, usa la herramienta Cambiar el tamaño de imágenes.',
        ],
      },
    ],
    faq: [
      { q: '¿Cuántos píxeles son 1 cm?', a: 'A 300 DPI son unos 118 píxeles, y a 96 DPI unos 38 píxeles. La fórmula es píxeles = cm divididos entre 2,54, por los DPI.' },
      { q: '¿Cuántos píxeles tiene una página A4?', a: 'A 300 DPI, A4 mide 2480 por 3508 píxeles. A 150 DPI mide 1240 por 1754.' },
      { q: '¿Esto cambia mi imagen?', a: 'No. Es solo una calculadora y no usa ningún archivo.' },
    ],
  },
};
