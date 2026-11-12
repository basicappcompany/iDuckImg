import type { GuideLocale } from './types';
import { ptBRGuidesA } from './pt-br-a';
import { ptBRGuidesB } from './pt-br-b';
import { ptBRGuidesC } from './pt-br-c';

/** Portuguese (Brazil): the words on the guide pages and the text of every guide. */
export const ptBRGuides: GuideLocale = {
  chrome: {
    home: `Início`,
    guides: `Guias práticos`,
    quickAnswer: `Resposta rápida`,
    openTool: `Abrir {tool}`,
    steps: `Passo a passo`,
    commonQuestions: `Perguntas frequentes`,
    writtenBy: `Escrito pela Basic App Company. Última conferência com a ferramenta em {date}. A ferramenta funciona no seu navegador, então suas imagens não são enviadas.`,
    relatedGuides: `Guias relacionados`,
    allGuides: `Todos os guias práticos`,
    hubTitle: `Guias práticos de imagem: comprimir, redimensionar, converter e mais`,
    hubDescription: `Guias curtos e práticos para as tarefas de imagem mais procuradas: comprimir, redimensionar, recortar, converter, marca d'água, remover dados ocultos e mais. Cada um leva à ferramenta gratuita.`,
    hubBefore: `Guias `,
    hubMark: `práticos`,
    hubAfter: ` de imagem`,
    hubIntro: `Passo a passo curtos para as tarefas de imagem mais procuradas. Cada um dá a resposta primeiro, depois os passos, e leva à ferramenta gratuita que faz o trabalho no seu navegador.`,
    hubListName: `Guias práticos de imagem`,
    hubListLabel: `Guias`,
  },
  guides: { ...ptBRGuidesA, ...ptBRGuidesB, ...ptBRGuidesC },
};
