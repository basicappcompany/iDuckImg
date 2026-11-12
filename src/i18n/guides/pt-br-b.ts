import type { GuideText } from './types';

/** Portuguese (Brazil): guides 9 to 17. */
export const ptBRGuidesB: Record<string, GuideText> = {
  'how-to-rotate-or-flip-an-image': {
    title: `Como girar ou inverter uma imagem`,
    seoTitle: `Como girar ou inverter uma imagem online (grátis)`,
    description: `Gire uma imagem em 90, 180 ou 270 graus, ou espelhe-a na horizontal ou na vertical. Funciona com JPG, PNG e WebP, no navegador.`,
    intro: `Para girar uma imagem, solte-a na ferramenta Girar e inverter, clique no botão de girar à esquerda ou à direita até a prévia ficar certa e clique em "Aplicar". Os mesmos botões espelham a imagem na horizontal ou na vertical.`,
    steps: [
      `Abra a ferramenta Girar e inverter e solte seus arquivos JPG, PNG ou WebP.`,
      `Use os botões para girar à esquerda ou à direita, ou para espelhar. A prévia mostra o resultado.`,
      `Clique em "Aplicar".`,
      `Baixe cada arquivo ou todos em um ZIP.`,
    ],
    sections: [
      {
        h: `Girar ou espelhar: qual usar?`,
        p: [
          `Girar vira a imagem inteira em 90, 180 ou 270 graus, o que resolve uma foto que saiu de lado ou de cabeça para baixo. Espelhar inverte a imagem como num espelho, que é como você corrige um texto que aparece ao contrário na câmera frontal.`,
          `Você pode combinar os dois. Gire primeiro, depois espelhe, e acompanhe a prévia até ficar certo.`,
        ],
      },
      {
        h: `Várias imagens de uma vez`,
        p: [
          `A mesma alteração é aplicada a todas as imagens que você adicionar, então um lote inteiro de fotos deitadas pode ser corrigido de uma vez. O PNG continua sem perdas. JPG e WebP são salvos de novo em alta qualidade.`,
          `Confira primeiro a prévia: ela mostra só a primeira imagem, então um lote deve reunir imagens que precisam do mesmo giro.`,
        ],
      },
      {
        h: `Dicas`,
        p: [
          `Se só algumas das suas fotos estiverem deitadas, gire essas em um lote e as demais em outro. Cada lote recebe exatamente uma alteração, então imagens misturadas precisam de execuções separadas.`,
          `Guarde seus arquivos originais. Girar em 90 graus é reversível, mas salvar um JPG de novo sempre o altera muito levemente, então é melhor não repetir isso muitas vezes.`,
        ],
      },
    ],
    faq: [
      { q: `Como girar uma foto que está de lado?`, a: `Solte-a na ferramenta, clique em girar à esquerda ou à direita até ela ficar na posição certa, depois clique em "Aplicar" e baixe.` },
      { q: `Qual é a diferença entre girar e espelhar?`, a: `Girar faz a imagem dar uma volta. Espelhar a inverte, como se você a visse num espelho.` },
      { q: `Girar reduz a qualidade?`, a: `O PNG continua sem perdas. JPG e WebP são salvos de novo em alta qualidade, então qualquer mudança é muito pequena.` },
    ],
  },
  'how-to-remove-location-and-exif-data-from-a-photo': {
    title: `Como remover a localização e os dados EXIF de uma foto`,
    seoTitle: `Como remover dados EXIF e localização GPS de uma foto`,
    description: `Retire localização, data e dados da câmera escondidos em uma foto antes de compartilhar. Feito no navegador, sem recomprimir a imagem.`,
    intro: `Para remover os dados EXIF de uma foto, solte-a na ferramenta Remover dados EXIF e clique em "Remover metadados". A localização GPS, a data e os dados da câmera escondidos são retirados, e a imagem em si não é recomprimida.`,
    steps: [
      `Abra a ferramenta Remover dados EXIF e solte suas fotos JPG, PNG ou WebP.`,
      `Clique em "Remover metadados".`,
      `Baixe cada arquivo limpo ou todos em um ZIP.`,
      `Se quiser, confira o resultado: no Windows, clique com o botão direito no arquivo, escolha Propriedades e abra a guia Detalhes.`,
    ],
    sections: [
      {
        h: `O que fica escondido em uma foto`,
        p: [
          `Celulares e câmeras gravam detalhes extras no arquivo: o local exato onde a foto foi tirada, a data e a hora e o modelo do aparelho. Qualquer pessoa que receba o arquivo original pode ler isso, mesmo que a imagem em si não mostre nada de privado.`,
          `Muitas redes sociais removem parte disso sozinhas, mas nem todas, e uma foto enviada por e-mail ou chat costuma chegar sem alteração. Limpá-la antes é o hábito mais seguro.`,
        ],
      },
      {
        h: `O que isto não esconde`,
        p: [
          `Remover metadados não muda o que está na imagem. Uma placa de rua, o número de uma casa ou um rosto continuam visíveis. Para esconder parte da própria imagem, use a ferramenta Desfocar ou ocultar partes de uma imagem.`,
          `Como os dados do JPG não são recomprimidos, a imagem fica exatamente como antes e o arquivo só fica um pouco menor.`,
        ],
      },
      {
        h: `Dicas`,
        p: [
          `Limpe as fotos antes de enviar, não depois. Uma imagem que você já publicou ou mandou por e-mail não pode ser desfeita, mas a próxima pode ser enviada limpa.`,
          `Capturas de tela geralmente não trazem localização, então são uma forma segura de compartilhar a imagem de uma tela. As fotos da câmera do celular são as que vale a pena limpar, principalmente as tiradas em casa.`,
        ],
      },
    ],
    faq: [
      { q: `O que são dados EXIF?`, a: `São informações guardadas dentro do arquivo da foto: onde ela foi tirada, quando, e com qual aparelho e quais configurações.` },
      { q: `Remover o EXIF muda a imagem?`, a: `Não. A imagem não é recomprimida, então fica exatamente igual.` },
      { q: `Minha foto é enviada?`, a: `Não. Os dados são removidos no seu navegador e o arquivo nunca sai do seu dispositivo.` },
    ],
  },
  'how-to-make-a-round-profile-picture': {
    title: `Como fazer uma foto de perfil redonda`,
    seoTitle: `Como fazer uma foto de perfil redonda (recorte circular)`,
    description: `Recorte qualquer foto em círculo, ou só arredonde os cantos, e salve como PNG com cantos transparentes. Grátis, no seu navegador.`,
    intro: `Para fazer uma foto de perfil redonda, solte a foto na ferramenta Recorte circular e cantos arredondados, escolha "Circle" e clique em "Make it round". Você recebe um PNG com cantos transparentes, que mantém o quadrado central da sua foto.`,
    steps: [
      `Abra a ferramenta Recorte circular e cantos arredondados e solte sua imagem.`,
      `Escolha "Circle", ou "Rounded corners" se você quiser só bordas suaves.`,
      `Clique em "Make it round".`,
      `Baixe o PNG.`,
    ],
    sections: [
      {
        h: `Por que o resultado é um PNG`,
        p: [
          `Uma imagem redonda precisa de cantos transparentes, e o JPG não pode ser transparente. O PNG pode, então o resultado é sempre um PNG. Coloque-o sobre um fundo colorido e ele mantém o formato redondo.`,
          `A maioria dos campos de foto de perfil já recorta em círculo para você. Esta ferramenta é útil quando você precisa da imagem redonda como um arquivo.`,
        ],
      },
      {
        h: `Como enquadrar o rosto`,
        p: [
          `Um círculo mantém o quadrado central da foto. Se o rosto estiver de lado, recorte a imagem antes para o rosto ficar no meio e só depois deixe-a redonda.`,
          `A ferramenta Recortar imagens com o formato 1:1 faz isso em uma etapa.`,
        ],
      },
      {
        h: `Dicas`,
        p: [
          `Comece com uma imagem de pelo menos algumas centenas de pixels de largura. Uma imagem redonda costuma ser exibida pequena, mas bordas nítidas pedem pixels suficientes desde o início.`,
          `Deixe um pouco de espaço ao redor do rosto. Um círculo corta os cantos, então um recorte muito justo na cabeça pode acabar cortando o cabelo ou o queixo.`,
        ],
      },
    ],
    faq: [
      { q: `Posso fazer uma imagem circular com fundo transparente?`, a: `Sim. Os cantos fora do círculo ficam transparentes no PNG que você baixa.` },
      { q: `E se a minha foto não for quadrada?`, a: `O círculo usa o quadrado central da imagem. Recorte antes se quiser outra parte.` },
      { q: `Minha imagem é enviada?`, a: `Não. Ela é processada no seu navegador e fica no seu dispositivo.` },
    ],
  },
  'how-to-split-an-image-into-a-grid': {
    title: `Como dividir uma imagem em uma grade de blocos`,
    seoTitle: `Como dividir uma imagem em grade (Instagram, quebra-cabeça)`,
    description: `Corte uma imagem em linhas e colunas iguais para uma postagem em grade ou um quebra-cabeça, até 10 por 10, e baixe os blocos em um ZIP.`,
    intro: `Para dividir uma imagem em grade, solte-a na ferramenta Dividir uma imagem em grade, escolha quantas linhas e colunas você quer e clique no botão "Split". Cada bloco é salvo como uma imagem própria, e você pode baixar todos em um ZIP.`,
    steps: [
      `Abra a ferramenta Dividir uma imagem em grade e solte sua imagem.`,
      `Escolha o número de linhas e colunas, até 10 por 10.`,
      `Clique no botão "Split".`,
      `Baixe os blocos, ou todos em um único ZIP.`,
    ],
    sections: [
      {
        h: `Postagens em grade e quebra-cabeças`,
        p: [
          `Para uma grade de rede social, publique os blocos na ordem certa para que se juntem no perfil. Uma divisão de 3 por 1 dá um panorama largo em três postagens, e 3 por 3 dá nove quadrados.`,
          `Os blocos são nomeados por linha e coluna, por exemplo photo-r1-c2.jpg, para você saber qual peça vai onde.`,
        ],
      },
      {
        h: `Nenhum pixel perdido`,
        p: [
          `Cada pixel da imagem vai parar em exatamente um bloco, então as peças se encaixam de novo sem faltar nem sobrar nada. Se o tamanho não for divisível por igual, os blocos diferem em no máximo um pixel.`,
          `Os blocos mantêm o formato da imagem. Deixe a imagem no formato que você quer antes, porque uma imagem alta gera blocos altos.`,
        ],
      },
      {
        h: `Dicas`,
        p: [
          `Recorte antes a imagem no formato certo. Uma grade de 3 por 3 fica melhor com uma imagem quadrada, e um panorama de 3 por 1 com uma imagem larga, de largura três vezes maior que a altura.`,
          `Publique os blocos em ordem inversa se o site mostrar primeiro a postagem mais recente, para que eles se juntem corretamente no perfil. Confira o layout no celular antes de compartilhar.`,
        ],
      },
    ],
    faq: [
      { q: `Como dividir uma foto para uma grade do Instagram?`, a: `Escolha as linhas e colunas que combinam com a sua grade, por exemplo 3 por 3, e publique os blocos em ordem.` },
      { q: `Quantos blocos posso criar?`, a: `Até 10 linhas e 10 colunas.` },
      { q: `Como os blocos são nomeados?`, a: `Por linha e coluna, como nome-r1-c1.jpg, para você poder colocá-los de volta na ordem.` },
    ],
  },
  'how-to-add-text-to-a-picture': {
    title: `Como adicionar texto a uma imagem`,
    seoTitle: `Como adicionar texto a uma imagem ou foto online (grátis)`,
    description: `Escreva uma legenda ou um título sobre uma imagem. Escolha posição, tamanho e cor, com um painel opcional atrás do texto. Feito no navegador.`,
    intro: `Para adicionar texto a uma imagem, solte-a na ferramenta Adicionar texto a uma imagem, digite até cinco linhas, escolha onde ficam, defina o tamanho e a cor e clique em "Adicionar texto". Um painel escuro ou claro atrás do texto o mantém legível numa foto cheia de detalhes.`,
    steps: [
      `Abra a ferramenta Adicionar texto a uma imagem e solte sua imagem.`,
      `Digite o seu texto, até cinco linhas.`,
      `Escolha uma das nove posições, o tamanho e a cor. Adicione um "Painel escuro" ou "Painel claro" se o fundo for movimentado.`,
      `Clique em "Adicionar texto" e baixe o resultado.`,
    ],
    sections: [
      {
        h: `Como deixar o texto fácil de ler`,
        p: [
          `Texto sobre uma foto é difícil de ler quando o fundo tem áreas claras e escuras. O painel opcional coloca uma faixa sólida atrás das palavras, o que resolve isso sem mudar a imagem.`,
          `O tamanho é uma porcentagem da largura da imagem, então uma legenda fica com o mesmo aspecto numa imagem pequena e numa grande.`,
        ],
      },
      {
        h: `Limites que vale conhecer`,
        p: [
          `Você pode adicionar até cinco linhas de até 60 caracteres. Para um texto mais longo, aumente a imagem ou use várias imagens.`,
          `A prévia mostra a primeira imagem, e o mesmo texto vai em todas as imagens que você adicionar.`,
        ],
      },
      {
        h: `Dicas`,
        p: [
          `Seja breve. Um texto grande e curto é legível no celular, e o tamanho acompanha a imagem, então um título curto costuma ficar melhor do que uma legenda longa.`,
          `Escolha a cor que mais contrasta com a área atrás do texto, ou ative o painel. Confira a prévia em tamanho pequeno, porque é assim que a maioria das pessoas vai ver.`,
        ],
      },
    ],
    faq: [
      { q: `Quantas linhas posso adicionar?`, a: `Até cinco linhas, cada uma com até 60 caracteres.` },
      { q: `Posso colocar texto em várias imagens?`, a: `Sim. O mesmo texto vai em todas as imagens, e você pode baixar todas juntas.` },
      { q: `Minha imagem é enviada?`, a: `Não. O texto é desenhado no seu navegador.` },
    ],
  },
  'how-to-turn-a-photo-into-pixel-art': {
    title: `Como transformar uma foto em pixel art`,
    seoTitle: `Como transformar uma foto em pixel art (grátis, no navegador)`,
    description: `Faça pixel art com pixels grandes a partir de qualquer foto. Escolha o tamanho dos pixels e quantas cores manter. Salvo em PNG, sem envio.`,
    intro: `Para transformar uma foto em pixel art, solte-a no Criador de pixel art, mova o controle deslizante para escolher quantos pixels grandes cabem na largura e clique em "Make pixel art". Menos pixels na largura dá uma arte mais grossa, e o resultado é um PNG.`,
    steps: [
      `Abra o Criador de pixel art e solte suas imagens.`,
      `Mova o controle deslizante para definir quantos pixels grandes cabem na largura. Menos significa mais grosso.`,
      `Se quiser, escolha "Retro" ou "Very few colours" para um visual de console de videogame.`,
      `Clique em "Make pixel art" e baixe o PNG.`,
    ],
    sections: [
      {
        h: `Como achar a granulação certa`,
        p: [
          `Rostos funcionam melhor com cerca de 32 a 64 pixels na largura. Paisagens ficam boas com mais. Cada pixel grande é a cor média de um bloco quadrado da foto.`,
          `A prévia usa o mesmo código do arquivo salvo, então o que você vê é o que você recebe.`,
        ],
      },
      {
        h: `Como limitar as cores`,
        p: [
          `"Retro" mantém seis tons de cada cor e "Very few colours" mantém três, o que dá um visual chapado, de videogame. Mantenha as cores originais se quiser que os pixels ainda se pareçam com a foto.`,
          `O resultado é um PNG do mesmo tamanho da sua imagem, porque o JPG borraria as bordas nítidas de cada pixel grande.`,
        ],
      },
      {
        h: `Dicas`,
        p: [
          `Comece com uma foto simples e de alto contraste. Um rosto sobre um fundo liso aguenta pixels grandes muito melhor do que uma cena de rua movimentada.`,
          `Teste algumas configurações e compare. Passar de 48 para 32 pixels na largura muda muito o visual, e as cores Retro podem transformar uma foto comum em algo que parece uma tela de jogo.`,
        ],
      },
    ],
    faq: [
      { q: `Por que o resultado é um PNG?`, a: `Um PNG mantém as bordas nítidas de cada pixel grande. Um JPG as borraria.` },
      { q: `Quantos pixels devo usar para um rosto?`, a: `Cerca de 32 a 64 na largura costuma funcionar bem.` },
      { q: `A imagem mantém o tamanho?`, a: `Sim. O resultado tem o mesmo tamanho do original.` },
    ],
  },
  'how-to-merge-images-side-by-side': {
    title: `Como unir imagens lado a lado ou uma sobre a outra`,
    seoTitle: `Como unir imagens lado a lado ou empilhadas (grátis)`,
    description: `Junte duas ou mais imagens em uma só, em linha ou em coluna, com espaço e fundo opcionais. Salve em PNG, JPG ou WebP. No navegador.`,
    intro: `Para unir imagens, solte duas ou mais na ferramenta Unir imagens lado a lado, coloque na ordem, escolha lado a lado ou empilhadas e clique em "Join pictures". Elas são ajustadas a uma altura ou largura comum para que nada seja esticado.`,
    steps: [
      `Abra a ferramenta Unir imagens lado a lado e solte duas ou mais imagens.`,
      `Coloque-as na ordem com "Up" e "Down" e remova as que não quiser.`,
      `Escolha lado a lado ou empilhadas, o espaço entre elas e o fundo.`,
      `Clique em "Join pictures" e baixe o resultado em PNG, JPG ou WebP.`,
    ],
    sections: [
      {
        h: `Como igualar os tamanhos`,
        p: [
          `Por padrão, cada imagem é ajustada à menor altura comum (para uma linha) ou à menor largura comum (para uma coluna), então nenhuma imagem é ampliada e fica borrada. Se você preferir manter cada imagem no seu próprio tamanho, escolha essa opção e elas ficam centralizadas.`,
          `Um espaço entre as imagens e um fundo branco, preto ou transparente completam o visual. Escolha transparente com PNG ou WebP.`,
        ],
      },
      {
        h: `Limites de tamanho`,
        p: [
          `Um resultado com mais de 100 megapixels é recusado com uma mensagem clara, porque um celular não aguentaria. Nesse caso, use menos imagens ou imagens menores.`,
          `Fotos de antes e depois funcionam bem em uma linha de duas. Uma pilha alta de capturas de tela funciona bem como coluna.`,
        ],
      },
      {
        h: `Dicas`,
        p: [
          `Recorte antes as imagens em formatos parecidos. Imagens com a mesma altura se alinham direitinho em uma linha, e a ferramenta não precisa reduzir nada.`,
          `Use um espaço pequeno e fundo branco para um antes e depois limpo. Use nenhum espaço para um panorama contínuo feito de imagens que foram feitas para se juntar.`,
        ],
      },
    ],
    faq: [
      { q: `Como colocar duas fotos lado a lado?`, a: `Solte as duas, escolha lado a lado e clique em "Join pictures".` },
      { q: `Minhas imagens ficam esticadas?`, a: `Não. Elas são ajustadas a uma altura ou largura comum, mantendo as proporções.` },
      { q: `Posso mudar a ordem?`, a: `Sim. Use "Up" e "Down" em cada imagem da lista.` },
    ],
  },
  'how-to-blur-or-hide-part-of-an-image': {
    title: `Como desfocar ou ocultar parte de uma imagem`,
    seoTitle: `Como desfocar ou ocultar parte de uma imagem (nomes, rostos)`,
    description: `Arraste caixas sobre um nome, número ou rosto e desfoque, pixelize ou cubra. Funciona no navegador, então o original nunca sai do seu dispositivo.`,
    intro: `Para ocultar parte de uma imagem, solte-a na ferramenta Desfocar ou ocultar partes de uma imagem, arraste uma caixa sobre o nome, o número ou o rosto, escolha "Blur", "Pixelate" ou "Cover" e clique no botão. "Cover" é a escolha mais segura para qualquer coisa sensível.`,
    steps: [
      `Abra a ferramenta Desfocar ou ocultar partes de uma imagem e solte sua imagem.`,
      `Arraste uma caixa sobre cada área a ocultar. Você pode adicionar quantas precisar.`,
      `Escolha "Blur", "Pixelate" ou "Cover" com uma cor sólida.`,
      `Clique no botão e baixe a nova imagem.`,
    ],
    sections: [
      {
        h: `Blur, Pixelate ou Cover?`,
        p: [
          `Um desfoque leve pode deixar o texto parcialmente legível, e uma pessoa determinada às vezes consegue recuperar dígitos de um desfoque ou de uma pixelização fraca. "Cover" pinta um bloco sólido, que não deixa nada para recuperar.`,
          `Use "Cover" para números de cartão, números de conta e qualquer coisa privada. Use desfoque para rostos e fundos em que a aparência importa mais do que a segurança.`,
        ],
      },
      {
        h: `Caixas precisas e várias imagens`,
        p: [
          `Cada caixa também tem campos numéricos para a posição em porcentagem, o que funciona sem mouse e permite ajustá-la com exatidão. A prévia ao vivo usa o mesmo código do arquivo salvo.`,
          `Se você soltar várias imagens, as mesmas caixas valem para todas, o que serve para capturas de tela com o mesmo layout. Seus arquivos originais nunca são alterados.`,
        ],
      },
      {
        h: `Dicas`,
        p: [
          `Faça a caixa um pouco maior que o que você está escondendo. As bordas de letras e rostos aparecem, e uma caixa justa pode deixar uma faixa visível.`,
          `Depois de salvar, abra a nova imagem e dê zoom. Se ainda der para ler ou reconhecer algo, rode de novo com "Cover". E lembre que os dados de localização escondidos são separados do que está visível, então limpe isso também.`,
        ],
      },
    ],
    faq: [
      { q: `Um desfoque basta para esconder um número de cartão?`, a: `Não. Um desfoque leve pode ficar parcialmente legível. Use "Cover", que pinta um bloco sólido.` },
      { q: `Posso ocultar várias áreas?`, a: `Sim. Adicione quantas caixas precisar.` },
      { q: `Minha imagem é enviada?`, a: `Não. O efeito é aplicado no seu navegador e o original fica no seu dispositivo.` },
    ],
  },
  'how-to-convert-pixels-to-cm-and-inches': {
    title: `Como converter pixels em centímetros e polegadas`,
    seoTitle: `Como converter pixels em cm, mm e polegadas (com DPI)`,
    description: `Descubra o tamanho de uma imagem no papel a partir dos pixels e do DPI, ou quantos pixels uma folha A4 pede. Calculadora grátis com papéis comuns.`,
    intro: `Para converter pixels em centímetros, divida os pixels pelo DPI para obter polegadas e multiplique por 2,54. A 300 DPI, 1 cm tem cerca de 118 pixels, e o Conversor de pixels, cm e polegadas faz a conta para qualquer comprimento e resolução.`,
    steps: [
      `Abra o Conversor de pixels, cm e polegadas e digite o comprimento que você tem.`,
      `Escolha a unidade dele: pixels, centímetros, milímetros ou polegadas.`,
      `Escolha a resolução em DPI. Use 300 para fotos impressas e 72 ou 96 para telas.`,
      `Veja o mesmo comprimento em todas as unidades e o tamanho em pixels dos papéis mais comuns.`,
    ],
    sections: [
      {
        h: `Por que o DPI importa`,
        p: [
          `Os pixels não têm tamanho físico por si sós. Os mesmos 1200 pixels têm 4 polegadas de largura a 300 DPI e cerca de 16,7 polegadas a 72 DPI. O DPI diz quantos pixels cabem em uma polegada.`,
          `Para impressão, 300 DPI é a meta usual para fotos. 150 DPI serve para rascunhos, e as telas só se importam com a quantidade de pixels.`,
        ],
      },
      {
        h: `Tamanhos comuns em pixels`,
        p: [
          `A 300 DPI, uma folha A4 tem 2480 por 3508 pixels, e uma foto impressa de 4 por 6 polegadas tem 1200 por 1800 pixels. A tabela da página mostra A4, A5, A3, US Letter e fotos de passaporte no DPI que você escolher.`,
          `Mudar a configuração de DPI de um arquivo não muda os pixels dele. Para mudar o tamanho real de uma imagem, use a ferramenta Redimensionar imagens.`,
        ],
      },
    ],
    faq: [
      { q: `Quantos pixels tem 1 cm?`, a: `A 300 DPI são cerca de 118 pixels, e a 96 DPI cerca de 38 pixels. A fórmula é pixels = cm dividido por 2,54, vezes o DPI.` },
      { q: `Quantos pixels tem uma folha A4?`, a: `A 300 DPI, a A4 tem 2480 por 3508 pixels. A 150 DPI são 1240 por 1754.` },
      { q: `Isto muda a minha imagem?`, a: `Não. É só uma calculadora e não usa nenhum arquivo.` },
    ],
  },
};
