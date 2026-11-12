import type { GuideLocale } from './types';
import { esGuidesA } from './es-a';
import { esGuidesB } from './es-b';
import { esGuidesC } from './es-c';

export const esGuides: GuideLocale = {
  chrome: {
    home: 'Inicio',
    guides: 'Guías prácticas',
    quickAnswer: 'Respuesta rápida',
    openTool: 'Abrir {tool}',
    steps: 'Pasos',
    commonQuestions: 'Preguntas frecuentes',
    writtenBy: 'Escrito por Basic App Company. Última comprobación con la herramienta el {date}. La herramienta funciona en tu navegador, así que tus imágenes no se suben.',
    relatedGuides: 'Guías relacionadas',
    allGuides: 'Todas las guías prácticas',
    hubTitle: 'Guías de imagen: comprimir, redimensionar, convertir y más',
    hubDescription:
      'Guías breves y prácticas para las tareas de imagen que más se buscan: comprimir, redimensionar, recortar, convertir, poner marca de agua, borrar datos ocultos y más. Cada una enlaza a la herramienta gratuita que hace el trabajo.',
    hubBefore: 'Guías prácticas de ',
    hubMark: 'imagen',
    hubAfter: '',
    hubIntro:
      'Explicaciones breves y prácticas para las tareas de imagen que más se buscan. Cada una da primero la respuesta, luego los pasos, y enlaza a la herramienta gratuita que hace el trabajo en tu navegador.',
    hubListName: 'Guías prácticas de imagen',
    hubListLabel: 'Guías',
  },
  guides: { ...esGuidesA, ...esGuidesB, ...esGuidesC },
};
