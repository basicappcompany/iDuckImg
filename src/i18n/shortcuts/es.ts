import type { ShortcutText } from './types';

export const es: ShortcutText = {
  chrome: {
    howToUse: `Cómo usarlo`,
    related: `Relacionado`,
    quickTools: `Herramientas rápidas`,
    community: `Comunidad`,
    alsoFrom: `También de iDuck`,
    iduckpdf: `iDuckPDF: herramientas PDF`,
    communityPages: {
      roadmap: `Hoja de ruta`,
      request: `Pedir una función`,
      feedback: `Enviar comentarios`,
      support: `Apoyar iDuckIMG`,
      settings: `Ajustes`,
      about: `Acerca de`,
    },
    groups: {
      compress: `Comprimir y cambiar tamaño`,
      convert: `Convertir un formato`,
      other: `Abrir otros formatos`,
      pdf: `Crear un PDF`,
      forms: `Fotos para formularios`,
      edit: `Ediciones rápidas`,
    },
  },
  kb: {
    name: `Comprimir imagen a {kb} KB`,
    title: `Comprimir imagen a {kb} KB gratis online`,
    description: `Reduce una foto JPG, PNG o WebP a {kb} KB o menos, gratis y en tu navegador. Sin subir archivos, sin registro, sin marca de agua.`,
    summary: `Reduce una foto a {kb} KB o menos, directamente en tu navegador.`,
    quick: `Para comprimir una imagen a {kb} KB, suéltala aquí y pulsa "{run}": el objetivo ya está en {kb} KB y la herramienta busca la mayor calidad que cabe. Funciona en tu dispositivo, así que la imagen nunca se sube.`,
    steps: [
      `Suelta tu imagen JPG, PNG o WebP, o pégala desde el portapapeles.`,
      `El tamaño deseado ya está en {kb} KB y el tamaño en píxeles se mantiene.`,
      `Pulsa "{run}". La herramienta prueba distintos niveles de calidad y se queda con el mejor que cabe.`,
      `Mira el tamaño del resultado en la lista y descárgalo.`,
    ],
    faqs: [
      {
        q: `¿Cómo consigo una foto de menos de {kb} KB sin que se vea mal?`,
        a: `Primero deja el tamaño en píxeles como está. La herramienta baja la calidad del JPG o WebP paso a paso hasta que el archivo pese {kb} KB o menos. Solo si no basta hace falta reducir también el ancho.`,
      },
      {
        q: `¿Se sube mi imagen a algún sitio?`,
        a: `No. La compresión se hace dentro de la pestaña de tu navegador. El archivo no se envía a nuestros servidores, así que sirve también para fotos y documentos privados.`,
      },
      {
        q: `El resultado pesa más de {kb} KB. ¿Qué hago?`,
        a: `La imagen tiene demasiados píxeles para {kb} KB con una calidad aceptable. Abre la herramienta de cambiar tamaño, elige un ancho menor (por ejemplo 800 píxeles), deja el objetivo en {kb} KB y vuelve a ejecutarla.`,
      },
    ],
  },
  convert: {
    name: `{from} a {to}`,
    h1: `Convertir {from} a {to}`,
    title: `{from} a {to}: conversor online gratis`,
    description: `Convierte {from} a {to} gratis en tu navegador. Sin subir archivos, sin registro, sin marca de agua. Funciona en móviles y ordenadores.`,
    summary: `Convierte archivos {from} a {to} en unos segundos.`,
    quick: `Para convertir {from} a {to}, suelta tus archivos {from}, comprueba que el formato diga {to} y pulsa "{run}". {why} Todo ocurre en tu navegador, así que no se sube nada.`,
    steps: [
      `Suelta tus archivos {from} o toca la zona para elegirlos. Puedes añadir muchos a la vez.`,
      `El formato de salida ya está en {to}.`,
      `Pulsa "{run}".`,
      `Descarga cada archivo, o todos juntos en un ZIP.`,
    ],
    faqs: [
      {
        q: `¿Es seguro convertir imágenes privadas aquí?`,
        a: `La conversión se hace dentro de tu navegador, así que las imágenes no se suben a nuestros servidores.`,
      },
      {
        q: `¿Puedo convertir muchos archivos a la vez?`,
        a: `Sí. Añade tantos como aguante tu dispositivo y descárgalos juntos en un ZIP.`,
      },
    ],
  },
  why: {
    'heic-to-jpg': `HEIC es el formato que usan los iPhone por defecto, y JPG se abre en cualquier dispositivo y sitio web.`,
    'heic-to-png': `PNG conserva cada píxel exactamente como está y se abre en todas partes.`,
    'png-to-jpg': `Los archivos JPG suelen pesar mucho menos que los PNG en fotos.`,
    'jpg-to-png': `PNG es sin pérdida, así que es un formato seguro para editar y volver a guardar.`,
    'webp-to-jpg': `JPG se abre en todos los programas, mientras que algunos editores y formularios aún rechazan WebP.`,
    'webp-to-png': `PNG conserva la transparencia y se abre en cualquier editor.`,
    'jpg-to-webp': `WebP suele pesar entre un 25 y un 35 por ciento menos que JPG con calidad similar, y así las páginas cargan más rápido.`,
    'png-to-webp': `WebP pesa mucho menos que PNG y puede conservar la transparencia.`,
    'jpg-to-pdf': `Cada imagen pasa a ser una página del PDF, con el mismo tamaño que la imagen.`,
    'png-to-pdf': `Cada imagen pasa a ser una página del PDF.`,
    'avif-to-jpg': `JPG se abre en todas partes, también en formularios, editores y móviles antiguos que no pueden mostrar AVIF.`,
    'avif-to-png': `PNG se abre en cualquier editor y conserva cualquier fondo transparente.`,
    'svg-to-png': `PNG es una imagen normal que cualquier programa, formulario o red social acepta, y conserva el fondo transparente.`,
    'svg-to-jpg': `JPG es un formato de foto pequeño y universal, y el SVG se dibuja nítido antes de guardarlo.`,
    'bmp-to-jpg': `Un BMP se guarda sin comprimir, así que el JPG suele ocupar una fracción de su tamaño.`,
    'gif-to-png': `Obtienes una imagen fija y nítida del GIF que conserva cualquier fondo transparente.`,
  },
  exam: {
    name: `{short}: tamaño de {what}`,
    title: `{short}: tamaño de {what} en px y KB`,
    description: `Cambia el tamaño de tu {what} a {req} para {short}. Según el aviso oficial. Gratis, en tu navegador, sin subir archivos.`,
    summary: `Deja tu {what} de {short} en {size}.`,
    quick: `Para cambiar el tamaño de tu {what} para {short}, suéltala aquí y pulsa "{run}": la herramienta ya está en {req}, como en el aviso oficial. Funciona en tu navegador, así que la imagen nunca se sube.`,
    steps: [
      `Suelta tu {what} o toca la zona para elegirla. También sirven las fotos HEIC de un iPhone.`,
      `Ya están elegidos {exam} y {doc}, así que el tamaño es {req}.`,
      `Pulsa "{run}".`,
      `Mira el tamaño en la lista, descarga el JPG y súbelo al formulario.`,
    ],
    faqs: [
      {
        q: `¿Qué tamaño debe tener la {what} para {short}?`,
        a: `{exam} pide {req}. Esto viene de {source} ({location}).`,
      },
      {
        q: `¿Cómo llega el archivo al tamaño correcto?`,
        a: `Se ajusta al tamaño y se guarda como JPG con la mejor calidad que se mantiene por debajo del máximo. Todo ocurre en tu navegador, así que la imagen nunca se sube.`,
      },
      {
        q: `¿Siguen vigentes estas cifras?`,
        a: `Se leyeron del documento oficial el {date}, para {cycle}. Comprueba tu propio aviso, porque los exámenes cambian sus reglas entre convocatorias.`,
      },
    ],
  },
  docs: { photo: `foto`, signature: `firma`, 'left-thumb': `huella del pulgar izquierdo`, declaration: `declaración` },
};
