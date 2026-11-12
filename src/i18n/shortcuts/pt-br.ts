import type { ShortcutText } from './types';

export const ptBR: ShortcutText = {
  chrome: {
    howToUse: `Como usar`,
    related: `Relacionados`,
    quickTools: `Ferramentas rápidas`,
    community: `Comunidade`,
    alsoFrom: `Também da iDuck`,
    iduckpdf: `iDuckPDF: ferramentas de PDF`,
    communityPages: {
      roadmap: `Roteiro`,
      request: `Pedir um recurso`,
      feedback: `Enviar feedback`,
      support: `Apoiar o iDuckImg`,
      settings: `Configurações`,
      about: `Sobre`,
    },
    groups: {
      compress: `Comprimir e redimensionar`,
      convert: `Converter um formato`,
      other: `Abrir outros formatos`,
      pdf: `Criar um PDF`,
      forms: `Fotos para formulários`,
      edit: `Edições rápidas`,
    },
  },
  kb: {
    name: `Comprimir imagem para {kb} KB`,
    title: `Comprimir imagem para {kb} KB online grátis`,
    description: `Reduza uma foto JPG, PNG ou WebP para {kb} KB ou menos, grátis, no navegador. Sem envio de arquivos, sem cadastro, sem marca d’água.`,
    summary: `Reduza uma foto para {kb} KB ou menos, direto no navegador.`,
    quick: `Para comprimir uma imagem para {kb} KB, solte-a aqui e clique em "{run}": o tamanho desejado já está em {kb} KB e a ferramenta encontra a maior qualidade que cabe. Tudo roda no seu dispositivo, então a imagem nunca é enviada.`,
    steps: [
      `Solte sua imagem JPG, PNG ou WebP, ou cole da área de transferência.`,
      `O tamanho desejado já está em {kb} KB e o tamanho em pixels é mantido.`,
      `Clique em "{run}". A ferramenta testa vários níveis de qualidade e fica com o melhor que cabe.`,
      `Confira o tamanho do resultado na lista e baixe o arquivo.`,
    ],
    faqs: [
      {
        q: `Como deixar uma foto abaixo de {kb} KB sem que ela fique ruim?`,
        a: `Primeiro deixe o tamanho em pixels como está. A ferramenta reduz a qualidade do JPG ou WebP aos poucos até o arquivo ter {kb} KB ou menos. Só se isso não bastar é preciso reduzir também a largura.`,
      },
      {
        q: `Minha imagem é enviada para algum lugar?`,
        a: `Não. A compressão acontece dentro da aba do seu navegador. O arquivo não é enviado aos nossos servidores, então também serve para fotos e documentos privados.`,
      },
      {
        q: `O resultado ficou maior que {kb} KB. E agora?`,
        a: `A imagem tem pixels demais para {kb} KB com qualidade aceitável. Abra a ferramenta de redimensionar, escolha uma largura menor (por exemplo, 800 pixels), mantenha o tamanho desejado em {kb} KB e execute de novo.`,
      },
    ],
  },
  convert: {
    name: `{from} para {to}`,
    h1: `Conversor de {from} para {to}`,
    title: `{from} para {to}: conversor online grátis`,
    description: `Converta {from} para {to} grátis no navegador. Sem envio de arquivos, sem cadastro, sem marca d’água. Funciona no celular e no computador.`,
    summary: `Transforme arquivos {from} em {to} em poucos segundos.`,
    quick: `Para converter {from} em {to}, solte seus arquivos {from}, confira se o formato é {to} e clique em "{run}". {why} Tudo acontece no seu navegador, então nada é enviado.`,
    steps: [
      `Solte seus arquivos {from} ou toque na área para escolhê-los. Você pode adicionar vários de uma vez.`,
      `O formato de saída já está em {to}.`,
      `Clique em "{run}".`,
      `Baixe cada arquivo ou todos juntos em um ZIP.`,
    ],
    faqs: [
      {
        q: `É seguro converter imagens privadas aqui?`,
        a: `A conversão acontece dentro do seu navegador, então as imagens não são enviadas aos nossos servidores.`,
      },
      {
        q: `Posso converter vários arquivos de uma vez?`,
        a: `Sim. Adicione quantos o seu dispositivo aguentar e baixe tudo junto em um ZIP.`,
      },
    ],
  },
  why: {
    'heic-to-jpg': `HEIC é o formato que o iPhone usa por padrão, e o JPG abre em qualquer dispositivo e site.`,
    'heic-to-png': `O PNG mantém cada pixel exatamente como está e abre em qualquer lugar.`,
    'png-to-jpg': `Arquivos JPG costumam ser bem menores que PNG em fotos.`,
    'jpg-to-png': `O PNG é sem perdas, então é um formato seguro para editar e salvar de novo.`,
    'webp-to-jpg': `O JPG abre em todos os programas, enquanto alguns editores e formulários ainda rejeitam WebP.`,
    'webp-to-png': `O PNG mantém a transparência e abre em qualquer editor.`,
    'jpg-to-webp': `O WebP costuma ser de 25 a 35 por cento menor que o JPG com qualidade parecida, o que faz as páginas carregarem mais rápido.`,
    'png-to-webp': `O WebP é muito menor que o PNG e pode manter a transparência.`,
    'jpg-to-pdf': `Cada imagem vira uma página do PDF, com o mesmo tamanho da imagem.`,
    'png-to-pdf': `Cada imagem vira uma página do PDF.`,
    'avif-to-jpg': `O JPG abre em qualquer lugar, inclusive em formulários, editores e celulares antigos que não exibem AVIF.`,
    'avif-to-png': `O PNG abre em qualquer editor e mantém qualquer fundo transparente.`,
    'svg-to-png': `O PNG é uma imagem comum que qualquer programa, formulário ou rede social aceita, e mantém o fundo transparente.`,
    'svg-to-jpg': `O JPG é um formato de foto pequeno e universal, e o SVG é desenhado nítido antes de ser salvo.`,
    'bmp-to-jpg': `Um BMP é guardado sem compressão, então o JPG costuma ocupar uma pequena fração do tamanho.`,
    'gif-to-png': `Você recebe uma imagem estática nítida do GIF, que mantém qualquer fundo transparente.`,
  },
  exam: {
    name: `{short}: tamanho de {what}`,
    title: `{short}: tamanho de {what} em px e KB`,
    description: `Redimensione sua {what} para {req} para o {short}, conforme o edital oficial. Grátis, no navegador, sem envio de arquivos.`,
    summary: `Deixe sua {what} do {short} em {size}.`,
    quick: `Para redimensionar sua {what} para o {short}, solte-a aqui e clique em "{run}": a ferramenta já está em {req}, como no edital oficial. Tudo roda no seu navegador, então a imagem nunca é enviada.`,
    steps: [
      `Solte sua {what} ou toque na área para escolhê-la. Fotos HEIC de iPhone também funcionam.`,
      `{exam} e {doc} já estão escolhidos, então o tamanho está em {req}.`,
      `Clique em "{run}".`,
      `Confira o tamanho na lista, baixe o JPG e envie no formulário.`,
    ],
    faqs: [
      {
        q: `Qual deve ser o tamanho da {what} para o {short}?`,
        a: `{exam} pede {req}. Isso vem de {source} ({location}).`,
      },
      {
        q: `Como o arquivo chega ao tamanho certo?`,
        a: `Ele é ajustado ao tamanho e salvo como JPG na melhor qualidade que fica abaixo do máximo. Tudo acontece no seu navegador, então a imagem nunca é enviada.`,
      },
      {
        q: `Esses números ainda valem?`,
        a: `Eles foram lidos do documento oficial em {date}, para {cycle}. Confira o seu próprio edital, porque as provas mudam as regras entre uma edição e outra.`,
      },
    ],
  },
  docs: { photo: `foto`, signature: `assinatura`, 'left-thumb': `impressão do polegar esquerdo`, declaration: `declaração` },
};
