import type { GuideText } from './types';

/** Portuguese (Brazil): guides 18 to 25. */
export const ptBRGuidesC: Record<string, GuideText> = {
  'how-to-calculate-an-aspect-ratio': {
    title: `Como calcular a proporção de uma imagem`,
    seoTitle: `Como calcular a proporção de tela (16:9, 4:3, 1:1)`,
    description: `Descubra a proporção de qualquer largura e altura, ou calcule a altura ou a largura correspondente a uma proporção. Calculadora grátis com proporções comuns.`,
    intro: `Para calcular uma proporção, divida a largura e a altura pelo máximo divisor comum delas. 1920 por 1080 é 16:9. A Calculadora de proporção de tela faz isso para você e também encontra o lado que falta quando você quer manter uma proporção.`,
    steps: [
      `Abra a Calculadora de proporção de tela e digite uma largura e uma altura em pixels. A proporção mais simples aparece.`,
      `Para redimensionar para uma proporção, escolha uma como 16:9, 4:3 ou 1:1, ou digite a sua.`,
      `Digite a nova largura e a altura é calculada, ou digite a altura e a largura é calculada.`,
      `Use esses números na ferramenta Redimensionar imagens ou Recortar imagens.`,
    ],
    sections: [
      {
        h: `Proporções comuns e onde são usadas`,
        p: [
          `O quadrado 1:1 é usado em fotos de perfil. 16:9 é vídeo e a maioria das telas, 4:3 são telas mais antigas e muitas câmeras, e 3:2 são câmeras SLR e fotos impressas de 4 por 6 polegadas. 9:16 é stories e vídeos curtos, e 4:5 são postagens verticais do Instagram.`,
          `A calculadora lista todas com o que cada uma é usada, para você escolher a que o site pede.`,
        ],
      },
      {
        h: `Quando um tamanho só chega perto de uma proporção`,
        p: [
          `Alguns tamanhos são quase, mas não exatamente, uma proporção comum. 1366 por 768 é 683:384, que fica a uma fração de um por cento de 16:9. A calculadora mostra as duas para você saber que é próximo, e não exato.`,
          `Alturas e larguras são arredondadas para um pixel inteiro quando você redimensiona para uma proporção.`,
        ],
      },
    ],
    faq: [
      { q: `Qual é a proporção de 1920 x 1080?`, a: `16:9. Divida os dois por 120, o máximo divisor comum deles, e você obtém 16 e 9.` },
      { q: `Como manter a proporção ao redimensionar?`, a: `Escolha a proporção e digite a nova largura. A altura é calculada como a largura vezes a altura da proporção, dividida pela largura da proporção.` },
      { q: `Isto muda a minha imagem?`, a: `Não. É uma calculadora e não usa nenhum arquivo.` },
    ],
  },
  'how-to-adjust-the-colours-of-a-photo': {
    title: `Como ajustar brilho, contraste e cores, ou deixar uma foto em preto e branco`,
    seoTitle: `Como deixar uma foto em preto e branco ou ajustar o brilho`,
    description: `Mude brilho, contraste e intensidade das cores, ou aplique preto e branco, sépia ou negativo. Prévia ao vivo, no navegador, sem envio.`,
    intro: `Para deixar uma foto em preto e branco, solte-a na ferramenta Ajustar cores e filtros, escolha o filtro "Black and white" e clique em "Apply". A mesma ferramenta muda brilho, contraste e intensidade das cores, com prévia ao vivo.`,
    steps: [
      `Abra a ferramenta Ajustar cores e filtros e solte suas imagens.`,
      `Mova os controles "Brightness", "Contrast" e "Colour strength", ou escolha um filtro como "Black and white".`,
      `Confira a prévia ao vivo e use "Reset" se quiser recomeçar.`,
      `Clique em "Apply" e baixe os arquivos, ou todos em um ZIP.`,
    ],
    sections: [
      {
        h: `O que cada controle faz`,
        p: [
          `O brilho deixa tudo mais claro ou mais escuro. O contraste afasta ou aproxima o claro e o escuro. A intensidade das cores aumenta as cores, ou as reduz até o cinza, e os filtros dão preto e branco, sépia (um marrom quente de foto antiga) ou um negativo.`,
          `Brilho e contraste são aplicados primeiro, depois a intensidade das cores, depois o filtro. Mova-os em passos pequenos, porque mudanças grandes achatam ou estouram os detalhes.`,
        ],
      },
      {
        h: `Lotes e tipos de arquivo`,
        p: [
          `As mesmas alterações são aplicadas a todas as imagens que você adicionar, então uma pasta inteira pode virar preto e branco de uma vez. A prévia mostra a primeira imagem.`,
          `As áreas transparentes de um PNG continuam transparentes. Cada imagem é salva no próprio formato, e JPG e WebP são salvos de novo em alta qualidade.`,
        ],
      },
      {
        h: `Dicas`,
        p: [
          `Mude um controle de cada vez e acompanhe a prévia. É fácil exagerar no brilho e no contraste juntos até perder detalhes nas partes mais claras e mais escuras.`,
          `Para uma foto em preto e branco com mais impacto, escolha "Black and white" e depois acrescente um pouco de contraste. Para um visual de foto antiga, sépia com o brilho um pouco mais baixo funciona bem.`,
        ],
      },
    ],
    faq: [
      { q: `Como deixar uma imagem em preto e branco?`, a: `Escolha o filtro "Black and white" e clique em "Apply". Arrastar "Colour strength" até o fim dá um resultado parecido.` },
      { q: `Como deixar uma foto escura mais clara?`, a: `Mova o controle "Brightness" para a direita e acrescente um pouco de contraste se ela parecer chapada.` },
      { q: `Minha imagem é enviada?`, a: `Não. As alterações são feitas no seu navegador.` },
    ],
  },
  'how-to-add-a-border-to-a-picture': {
    title: `Como adicionar uma borda ou moldura a uma imagem`,
    seoTitle: `Como adicionar borda ou moldura a uma imagem (qualquer cor)`,
    description: `Coloque uma borda branca, preta ou colorida ao redor de qualquer imagem, ou uma transparente. Escolha a espessura e veja a prévia. No navegador.`,
    intro: `Para adicionar uma borda a uma imagem, solte-a na ferramenta Adicionar borda ou moldura, defina a espessura, escolha uma cor e clique em "Add border". A borda fica ao redor da imagem, então nada é cortado e o resultado fica um pouco maior.`,
    steps: [
      `Abra a ferramenta Adicionar borda ou moldura e solte suas imagens.`,
      `Defina a espessura da borda.`,
      `Escolha branco, preto, amarelo, transparente, ou digite o seu próprio código de cor, como #1e90ff.`,
      `Confira a prévia, clique em "Add border" e baixe o resultado.`,
    ],
    sections: [
      {
        h: `Espessura que acompanha o tamanho`,
        p: [
          `A espessura é uma porcentagem do lado menor da imagem, então a borda fica com o mesmo aspecto numa foto pequena e numa grande do mesmo lote.`,
          `Como a borda é adicionada por fora, a imagem mantém todo o seu conteúdo. Isso é diferente de desenhar sobre a margem, o que esconderia uma parte dela.`,
        ],
      },
      {
        h: `Bordas transparentes`,
        p: [
          `Uma borda transparente precisa de um formato que aceite transparência, então um JPG vira PNG quando você a escolhe. As outras imagens mantêm o próprio formato.`,
          `Se você digitar um código de cor inválido, a página avisa em vez de adivinhar. Use as formas #1e90ff ou #fa0.`,
        ],
      },
      {
        h: `Dicas`,
        p: [
          `Uma borda branca fina, de cerca de 2 a 4 por cento, dá um visual limpo de impressão ou de galeria. Uma mais grossa em uma cor forte funciona como moldura para uma postagem em rede social.`,
          `Se você for imprimir a imagem, lembre que a borda deixa o arquivo maior que o original, então confira o tamanho final em relação ao papel ou à moldura que você tem em mente.`,
        ],
      },
    ],
    faq: [
      { q: `Como adicionar uma borda branca a uma foto?`, a: `Solte a foto, deixe a cor em "White", defina a espessura e clique em "Add border".` },
      { q: `A borda cobre a minha imagem?`, a: `Não. Ela é adicionada por fora, então a imagem fica completa e o resultado é maior.` },
      { q: `A borda pode ser transparente?`, a: `Sim. Escolha "Transparent". O resultado é um PNG, porque o JPG não pode ser transparente.` },
    ],
  },
  'how-to-get-a-hex-color-from-an-image': {
    title: `Como obter o código de cor HEX de uma imagem`,
    seoTitle: `Como obter o código de cor HEX de uma imagem (seletor)`,
    description: `Clique em qualquer imagem para obter a cor exata em HEX, RGB e HSL, com cópia em um clique. Funciona também pelo teclado. No navegador.`,
    intro: `Para obter o código HEX de uma cor de uma imagem, solte-a no Seletor de cores de uma imagem, passe o mouse sobre ela para ver a cor em prévia e clique para escolhê-la. Os códigos HEX, RGB e HSL aparecem, cada um com um botão "Copy".`,
    steps: [
      `Abra o Seletor de cores de uma imagem a partir de uma ferramenta de imagem e solte uma imagem.`,
      `Passe o mouse sobre a imagem para ver em prévia a cor sob o ponteiro.`,
      `Clique ou toque para escolhê-la e depois clique em "Copy" ao lado do código de que você precisa.`,
      `Escolha quantas cores quiser. As últimas dez ficam abaixo para você poder voltar a elas.`,
    ],
    sections: [
      {
        h: `HEX, RGB e HSL`,
        p: [
          `São três formas de escrever a mesma cor. HEX é o código curto usado em páginas da web, como #1E90FF. RGB dá as quantidades de vermelho, verde e azul de 0 a 255, e HSL dá matiz, saturação e luminosidade, que é mais fácil de ajustar à mão.`,
          `O painel mostra os três, então você pode colar o que a sua ferramenta de design ou folha de estilo quiser.`,
        ],
      },
      {
        h: `Como obter uma cor confiável`,
        p: [
          `Uma foto é feita de milhões de pixels levemente diferentes, então dois pontos que parecem iguais podem diferir em alguns passos. Clique em alguns lugares, ou use a ferramenta de paleta para achar as cores principais.`,
          `Sem mouse, clique na imagem uma vez e depois use as setas para mover e Enter para escolher. Se um pixel for transparente, a página avisa, porque o que você vê na tela também depende do que está atrás dele.`,
        ],
      },
    ],
    faq: [
      { q: `Como encontrar o código HEX de uma cor em uma imagem?`, a: `Solte a imagem, clique na cor e copie o código HEX que aparece.` },
      { q: `Por que pixels vizinhos dão códigos diferentes?`, a: `As fotos têm pequenas variações. Clique em alguns pontos ou use a ferramenta de paleta para ver as cores principais.` },
      { q: `Minha imagem é enviada?`, a: `Não. A cor é lida no seu navegador.` },
    ],
  },
  'how-to-get-a-color-palette-from-an-image': {
    title: `Como obter uma paleta de cores de uma imagem`,
    seoTitle: `Como obter uma paleta de cores de uma imagem (HEX, CSS)`,
    description: `Extraia as cores principais de uma imagem com os códigos HEX e quanto cada uma cobre. Copie como lista ou como variáveis CSS.`,
    intro: `Para obter uma paleta de cores de uma imagem, solte-a no Gerador de paleta de cores. As cores principais aparecem como amostras com seus códigos HEX e a parte da imagem que cada uma cobre, e você pode copiá-las como lista ou como CSS.`,
    steps: [
      `Abra o Gerador de paleta de cores e solte uma imagem.`,
      `As cores principais aparecem na hora. Use o controle deslizante para pedir menos ou mais, de 2 a 12.`,
      `Clique em uma amostra para copiar o código HEX dela.`,
      `Ou copie a paleta inteira como lista ou como variáveis CSS.`,
    ],
    sections: [
      {
        h: `Como as cores são escolhidas`,
        p: [
          `Pixels parecidos são agrupados e cada grupo vira uma cor pela média, então a cor que preenche a maior parte da imagem vem primeiro. A porcentagem em uma amostra é quanto da imagem aquele grupo cobre.`,
          `Pixels totalmente ou quase totalmente transparentes são ignorados, então um logotipo sobre fundo transparente dá as cores do logotipo, e não uma cor escura vazia.`,
        ],
      },
      {
        h: `Como usar a paleta`,
        p: [
          `Copiar como variáveis CSS gera propriedades personalizadas como --colour-1 que você pode colar direto em uma folha de estilo. A lista simples é útil para anotações ou para uma ferramenta de design.`,
          `Se a imagem tiver menos cores distintas do que você pediu, você recebe só as cores que ela tem. Um logotipo de três cores dá três amostras, não doze. Para uma cor exata, use o seletor de cores.`,
        ],
      },
      {
        h: `Dicas`,
        p: [
          `Use uma imagem com o clima que você quer. Uma paleta é só tão boa quanto a imagem de onde vem, e uma foto de pôr do sol dá cores bem diferentes das de uma foto de produto.`,
          `Escolha duas ou três cores da paleta em vez de todas. A maioria dos designs funciona melhor com uma cor principal, um destaque e um neutro, e as porcentagens mostram quais cores são as maiores candidatas.`,
        ],
      },
    ],
    faq: [
      { q: `Quantas cores posso obter?`, a: `De 2 a 12. Seis é um bom começo para uma paleta de marca ou de design.` },
      { q: `Posso usar a paleta no meu site?`, a: `Sim. Copie como variáveis CSS e cole o resultado na sua folha de estilo.` },
      { q: `Minha imagem é enviada?`, a: `Não. As cores são calculadas no seu navegador.` },
    ],
  },
  'how-to-convert-an-image-to-base64': {
    title: `Como converter uma imagem em Base64 (e de volta)`,
    seoTitle: `Como converter uma imagem em Base64 e decodificar de volta`,
    description: `Transforme uma imagem em um data URI Base64 para HTML ou CSS, ou cole um Base64 e receba a imagem de volta. Feito no navegador, sem envio.`,
    intro: `Para converter uma imagem em Base64, solte-a na ferramenta Imagem para Base64 e copie o resultado. O padrão é um data URI que você pode colar em HTML ou CSS. Para voltar, escolha "Base64 to image", cole o texto e baixe a imagem.`,
    steps: [
      `Abra a ferramenta Imagem para Base64 e escolha "Image to Base64".`,
      `Solte a imagem. O arquivo original é codificado como está, então um SVG continua sendo SVG.`,
      `Escolha o formato de que precisa: um data URI, Base64 puro, um fundo CSS ou uma tag de imagem HTML, e clique em "Copy".`,
      `Para decodificar, escolha "Base64 to image", cole o texto e baixe a imagem.`,
    ],
    sections: [
      {
        h: `Quando o Base64 é uma boa ideia`,
        p: [
          `O Base64 escreve os bytes de um arquivo como texto simples, então uma imagem pequena pode ficar dentro de uma página da web, de uma folha de estilo ou de um e-mail sem um arquivo separado. O texto fica cerca de um terço maior que o arquivo.`,
          `Serve para imagens pequenas, como ícones e logotipos. Numa foto grande, o texto fica enorme e um arquivo de imagem normal carrega mais rápido, por isso a ferramenta avisa acima de 100 KB.`,
        ],
      },
      {
        h: `Como colar o Base64 de volta`,
        p: [
          `Você pode colar um data URI completo ou só os caracteres Base64. A ferramenta lê o tipo da imagem a partir dos próprios dados (PNG, JPG, GIF, WebP, BMP, AVIF, SVG ou ICO) e confia neles mais do que em um rótulo errado.`,
          `Se o texto foi cortado ao ser copiado, ou não for uma imagem, você recebe uma mensagem simples dizendo isso, em vez de um download quebrado.`,
        ],
      },
    ],
    faq: [
      { q: `O que é um data URI?`, a: `Uma forma de colocar um arquivo dentro de um endereço da web. Começa com data:, o tipo do arquivo e ;base64, seguidos do texto Base64.` },
      { q: `Por que o texto Base64 é maior que o arquivo?`, a: `O Base64 usa quatro caracteres de texto para cada três bytes, então o texto fica cerca de 33 por cento maior.` },
      { q: `Minha imagem é enviada?`, a: `Não. A codificação e a decodificação acontecem no seu navegador.` },
    ],
  },
  'how-to-make-a-favicon': {
    title: `Como criar um favicon para o seu site`,
    seoTitle: `Como criar um favicon (favicon.ico, PNG, Apple Touch Icon)`,
    description: `Crie favicon.ico, PNGs de 16 e 32 pixels, um ícone Apple touch e ícones Android a partir de uma imagem, com o código para colar na sua página.`,
    intro: `Para criar um favicon, solte uma imagem no Gerador de favicon e clique em "Make favicons". Você recebe favicon.ico, PNGs de 16 e 32 pixels, um ícone Apple touch e dois ícones Android, com o código para colar na sua página.`,
    steps: [
      `Abra o Gerador de favicon e solte uma imagem. Uma imagem quadrada de 512 pixels ou mais funciona melhor.`,
      `Se ela não for quadrada, escolha cortá-la em um quadrado a partir do meio, ou manter tudo com barras transparentes.`,
      `Clique em "Make favicons" e baixe os arquivos, ou todos em um ZIP.`,
      `Coloque os arquivos na pasta raiz do seu site e cole o código mostrado no head das suas páginas.`,
    ],
    sections: [
      {
        h: `O que você recebe`,
        p: [
          `O favicon.ico reúne as versões de 16, 32 e 48 pixels em um só arquivo. favicon-16x16.png e favicon-32x32.png são para as abas do navegador, apple-touch-icon.png (180 pixels) é para iPhones e iPads, e os ícones de 192 e 512 pixels são para Android e para aplicativos web instaláveis.`,
          `A prévia mostra o seu ícone em 16, 32 e 64 pixels para você conferir antes de baixar.`,
        ],
      },
      {
        h: `Como deixá-lo bonito em tamanho pequeno`,
        p: [
          `Um favicon é minúsculo, então uma forma simples com cores fortes é mais legível. Imagens cheias de detalhes viram uma mancha em 16 pixels, então comece com um logotipo simples ou uma única letra.`,
          `Uma imagem menor que 512 pixels é ampliada para os ícones maiores e pode ficar um pouco borrada, e a página avisa quando isso acontece. Um fundo transparente é mantido.`,
        ],
      },
    ],
    faq: [
      { q: `Quais arquivos um site precisa para um favicon?`, a: `Um favicon.ico, PNGs de 16 e 32 pixels para as abas, um ícone Apple touch de 180 pixels e ícones de 192 e 512 pixels para Android. A ferramenta cria todos.` },
      { q: `Qual deve ser o tamanho da minha imagem?`, a: `Quadrada e com pelo menos 512 por 512 pixels. Imagens menores funcionam, mas os ícones grandes ficam borrados.` },
      { q: `O favicon.ico é um arquivo ICO de verdade?`, a: `Sim. Ele reúne os ícones de 16, 32 e 48 pixels em um arquivo ICO padrão.` },
    ],
  },
  'are-online-image-tools-safe': {
    title: `As ferramentas de imagem online são seguras? Como verificar a sua`,
    seoTitle: `Ferramentas de imagem online são seguras? Como verificar`,
    description: `Muitas ferramentas de imagem online enviam a sua foto a um servidor. Veja como saber, como conferir em dois minutos e o que o iDuckImg faz.`,
    intro: `Uma ferramenta de imagem online só é tão privada quanto o lugar onde faz o trabalho. Muitas enviam a sua foto a um servidor; o iDuckImg faz o trabalho no seu navegador, então o arquivo fica no seu dispositivo. Você mesmo pode conferir isso na aba Rede do navegador.`,
    steps: [
      `Abra a página da ferramenta, depois abra as ferramentas de desenvolvedor do navegador (F12) e escolha a aba Rede (Network).`,
      `Limpe a lista, depois solte uma imagem na ferramenta e execute.`,
      `Procure requisições grandes que levem a sua imagem, geralmente mostradas como POST ou PUT. Uma ferramenta que trabalha no seu dispositivo não mostra nenhuma.`,
      `Leia a política de privacidade de qualquer ferramenta que você usar e veja o que ela diz que guarda e por quanto tempo.`,
    ],
    sections: [
      {
        h: `Por que isso importa`,
        p: [
          `Uma foto pode conter rostos, documentos, o número de uma casa e detalhes escondidos, como o local exato onde foi tirada. Enviá-la entrega uma cópia a outra pessoa, e você não vê o que acontece depois.`,
          `Ferramentas que funcionam no navegador evitam isso, porque o arquivo é processado pelo seu próprio dispositivo e nunca é enviado. Elas também tendem a ser mais rápidas, já que não há envio nem download.`,
        ],
      },
      {
        h: `O que o iDuckImg faz`,
        p: [
          `Todas as ferramentas do iDuckImg funcionam no seu navegador. Suas imagens não são enviadas, não há cadastro e nenhuma marca d'água é adicionada. A página carrega o próprio código e os próprios arquivos do mesmo site e, para alguns formatos como o HEIC, um decodificador do mesmo site. Ela não faz requisições a outras empresas.`,
          `Mesmo assim, vale fazer isto: remova os dados de localização escondidos antes de compartilhar uma foto e use "Cover", em vez de um desfoque leve, para esconder qualquer coisa privada. As ferramentas Remover dados EXIF e Desfocar ou ocultar partes de uma imagem fazem esses trabalhos no seu dispositivo.`,
        ],
      },
    ],
    faq: [
      { q: `Como saber se uma ferramenta envia a minha foto?`, a: `Abra a aba Rede (Network) nas ferramentas de desenvolvedor do navegador, execute a ferramenta e procure uma requisição grande que leve a sua imagem. Se não houver nenhuma, o trabalho aconteceu no seu dispositivo.` },
      { q: `O iDuckImg envia as minhas imagens?`, a: `Não. Cada ferramenta funciona no seu navegador e os seus arquivos ficam no seu dispositivo.` },
      { q: `É seguro compartilhar uma foto depois de editá-la?`, a: `Remova antes os dados escondidos de localização e da câmera e oculte qualquer coisa privada na própria imagem com uma cobertura sólida.` },
    ],
  },
};
