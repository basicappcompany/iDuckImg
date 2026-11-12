import type { GuideText } from './types';

/** Portuguese (Brazil): guides 1 to 8. */
export const ptBRGuidesA: Record<string, GuideText> = {
  'how-to-compress-an-image': {
    title: `Como comprimir uma imagem sem perder qualidade`,
    seoTitle: `Como comprimir uma imagem sem perder qualidade (grátis)`,
    description: `Reduza arquivos JPG, PNG e WebP no navegador. Escolha a qualidade, compare os tamanhos antes e depois e baixe. Sem envio e sem cadastro.`,
    intro: `Para comprimir uma imagem, solte-a na ferramenta Comprimir imagens, deixe a qualidade perto de 75 e clique em "Comprimir". As fotos costumam ficar bem menores sem nenhuma mudança visível, e a imagem nunca sai do seu dispositivo.`,
    steps: [
      `Abra a ferramenta Comprimir imagens e solte seus arquivos JPG, PNG ou WebP, ou cole-os da área de transferência.`,
      `Defina a qualidade. Em torno de 75, a foto continua com a mesma aparência e o arquivo fica muito menor.`,
      `Clique em "Comprimir" e veja o tamanho antes e depois ao lado de cada arquivo.`,
      `Baixe cada arquivo ou todos de uma vez em um ZIP.`,
    ],
    sections: [
      {
        h: `O que muda em cada tipo de arquivo`,
        p: [
          `JPG e WebP são comprimidos com uma qualidade ajustável: quanto menor o número, menor o arquivo e um pouco menos de detalhe. Fotos de celular costumam ter de 3 a 8 MB, e quase tudo isso pode sair sem diferença visível.`,
          `O PNG é diferente. Ele é otimizado sem nenhuma perda, então a imagem fica exatamente igual, mas a economia é menor. Se o PNG for uma foto, converter para JPG ou WebP economiza muito mais.`,
        ],
      },
      {
        h: `Se você precisa de um tamanho exato`,
        p: [
          `Formulários costumam exigir que a foto tenha menos de certo número de quilobytes. Nesse caso, use o campo de tamanho desejado do arquivo na ferramenta Redimensionar imagens, ou abra uma página pronta como Comprimir imagem para 100 KB. Ela testa vários níveis de qualidade e fica com o melhor que cabe.`,
          `Se não der para deixar o arquivo menor, você recebe o original de volta, em vez de uma versão pior.`,
        ],
      },
    ],
    faq: [
      { q: `Comprimir uma imagem reduz a qualidade?`, a: `JPG e WebP perdem um pouco de detalhe conforme a qualidade diminui, e em torno de 75 a mudança é difícil de notar. O PNG é otimizado sem nenhuma perda.` },
      { q: `Minha imagem é enviada quando eu a comprimo?`, a: `Não. O trabalho acontece no seu navegador, no seu próprio dispositivo, então o arquivo não é enviado para lugar nenhum.` },
      { q: `Posso comprimir várias imagens de uma vez?`, a: `Sim. Adicione quantas quiser e baixe todas juntas em um ZIP.` },
    ],
  },
  'how-to-resize-an-image': {
    title: `Como redimensionar uma imagem por pixels, porcentagem ou tamanho do arquivo`,
    seoTitle: `Como redimensionar uma imagem: pixels, % ou KB (grátis)`,
    description: `Mude uma imagem para pixels exatos, uma porcentagem ou um tamanho de arquivo em KB, no navegador. Mantém as proporções. Sem envio.`,
    intro: `Para redimensionar uma imagem, solte-a na ferramenta Redimensionar imagens, digite uma largura ou altura em pixels ou escolha uma porcentagem e clique em "Redimensionar". Deixe um campo vazio e o outro é calculado para a imagem não ficar esticada.`,
    steps: [
      `Abra a ferramenta Redimensionar imagens e solte seus arquivos JPG, PNG ou WebP.`,
      `Digite uma largura, uma altura ou uma porcentagem. Deixe um campo vazio para manter as proporções.`,
      `Se um formulário exige um tamanho de arquivo, digite um valor desejado em KB, por exemplo 100.`,
      `Clique em "Redimensionar" e baixe o resultado, ou todos os arquivos em um ZIP.`,
    ],
    sections: [
      {
        h: `Pixels, porcentagem ou quilobytes?`,
        p: [
          `Pixels servem para quando o site pede um tamanho como 1200 por 800. Uma porcentagem é mais rápida quando você só quer a imagem menor, por exemplo 50 por cento. Um valor em KB é para limites de envio, e a ferramenta encontra a melhor qualidade que cabe.`,
          `O tamanho desejado funciona para JPG e WebP. Um PNG com tamanho desejado é salvo como WebP, porque o PNG é sem perdas e não consegue trocar qualidade por tamanho.`,
        ],
      },
      {
        h: `Quando o tamanho desejado é pequeno demais`,
        p: [
          `Se não for possível chegar ao tamanho pedido com os pixels que você escolheu, aparece uma mensagem em vez de um arquivo errado. Tente menos pixels e depois repita o tamanho desejado.`,
          `Aumentar uma imagem não acrescenta detalhe. Ela é ampliada e pode ficar um pouco borrada, e por isso reduzir é o caminho seguro.`,
        ],
      },
    ],
    faq: [
      { q: `Como redimensionar sem esticar a imagem?`, a: `Preencha só a largura ou só a altura. O outro lado é calculado a partir das proporções originais.` },
      { q: `Posso redimensionar para exatamente 100 KB?`, a: `Sim. Digite 100 como tamanho desejado. A ferramenta escolhe a maior qualidade que fica abaixo disso, ou avisa se não conseguir.` },
      { q: `Redimensionar envia a minha foto?`, a: `Não. Tudo acontece no seu navegador e o arquivo fica no seu dispositivo.` },
    ],
  },
  'how-to-crop-an-image': {
    title: `Como recortar uma imagem na área exata que você quer`,
    seoTitle: `Como recortar uma imagem: arrastar, proporção ou pixels`,
    description: `Recorte uma imagem arrastando uma caixa, travando uma proporção como 1:1 ou 16:9, ou digitando pixels exatos. Grátis, no navegador, sem envio.`,
    intro: `Para recortar uma imagem, solte-a na ferramenta Recortar imagens, arraste a caixa sobre a parte que você quer manter e clique em "Recortar". Escolha um formato como 1:1 ou 16:9 para travar as proporções, ou digite pixels exatos.`,
    steps: [
      `Abra a ferramenta Recortar imagens e solte uma imagem JPG, PNG ou WebP.`,
      `Arraste a caixa e as alças sobre a parte que você quer. Escolha uma proporção como 1:1 ou 16:9, se precisar.`,
      `Ou digite Esquerda, Topo, Largura e Altura em pixels para um recorte exato.`,
      `Clique em "Recortar" e baixe o resultado.`,
    ],
    sections: [
      {
        h: `Como escolher uma proporção`,
        p: [
          `Uma proporção mantém a caixa em um formato fixo enquanto você a move e redimensiona. Use 1:1 para uma foto de perfil quadrada, 16:9 para miniaturas de vídeo e slides, e 4:3 ou 3:2 para fotos impressas.`,
          `Se você não sabe que formato um site quer, a Calculadora de proporção de tela transforma uma largura e uma altura em uma proporção.`,
        ],
      },
      {
        h: `Controle fino sem mouse`,
        p: [
          `Você pode mover a caixa com as setas do teclado e digitar valores exatos, o que também funciona no celular, onde arrastar é chato. A imagem recortada mantém o formato original.`,
          `O recorte remove a área de fora de vez no arquivo que você baixa, então guarde o original se puder querer a imagem de volta. Como a ferramenta nunca mexe no arquivo que você soltou, dá sempre para recomeçar a partir dele e tentar outra caixa.`,
        ],
      },
    ],
    faq: [
      { q: `Como recortar em formato quadrado?`, a: `Escolha o formato "Quadrado (1:1)" e mova a caixa sobre a parte que você quer. A caixa continua quadrada quando você a redimensiona.` },
      { q: `Posso recortar em pixels exatos?`, a: `Sim. Digite Esquerda, Topo, Largura e Altura em pixels.` },
      { q: `Recortar reduz a qualidade?`, a: `Os pixels que você mantém não mudam. JPG e WebP são salvos de novo em alta qualidade, e o PNG continua sem perdas.` },
    ],
  },
  'how-to-add-a-watermark-to-a-photo': {
    title: `Como adicionar uma marca d'água de texto em uma foto`,
    seoTitle: `Como adicionar marca d'água de texto em foto (sem envio)`,
    description: `Coloque seu nome ou uma linha de direitos autorais nas imagens. Escolha posição, tamanho, opacidade e cor, ou repita pela imagem. No navegador.`,
    intro: `Para colocar uma marca d'água em uma foto, solte-a na ferramenta Adicionar marca d'água, digite o texto, escolha onde ele fica e clique em "Adicionar marca d’água". Você pode colocá-la num canto ou repeti-la pela imagem toda.`,
    steps: [
      `Abra a ferramenta Adicionar marca d'água e solte suas imagens JPG, PNG ou WebP.`,
      `Digite o texto, por exemplo seu nome ou uma linha de direitos autorais.`,
      `Escolha posição, tamanho, opacidade e cor. A prévia se atualiza conforme você muda.`,
      `Clique em "Adicionar marca d’água" e baixe cada arquivo, ou todos em um ZIP.`,
    ],
    sections: [
      {
        h: `Legível sem ficar feia`,
        p: [
          `O tamanho é uma porcentagem da largura da imagem, então a marca fica com o mesmo aspecto numa foto pequena e numa grande. Uma borda suave na cor oposta mantém o texto branco legível em áreas claras e o texto preto legível em áreas escuras.`,
          `Cerca de 60 por cento de opacidade é um bom começo. Diminua se a marca competir com a imagem e aumente se ela precisar ser vista.`,
        ],
      },
      {
        h: `O que uma marca d'água pode e não pode fazer`,
        p: [
          `Uma marca d'água visível desencoraja a cópia, mas não a impede. Alguém determinado pode cortá-la ou editá-la. Colocá-la perto do meio, ou repeti-la pela imagem, dificulta isso.`,
          `A mesma marca d'água é aplicada a todas as imagens que você adicionar, e JPG e WebP são salvos de novo em alta qualidade.`,
        ],
      },
    ],
    faq: [
      { q: `Posso colocar marca d'água em várias fotos de uma vez?`, a: `Sim. Adicione todas, confira a prévia da primeira e cada imagem recebe a mesma marca, no mesmo tamanho relativo.` },
      { q: `Alguém consegue remover a minha marca d'água?`, a: `Uma pessoa determinada pode cortá-la ou editá-la. Uma marca repetida pela imagem toda é mais difícil de remover do que uma em um canto.` },
      { q: `Posso usar um logotipo em vez de texto?`, a: `Sim, com a ferramenta Adicionar logotipo a imagens, que coloca uma imagem PNG, JPG ou WebP da mesma forma.` },
    ],
  },
  'how-to-add-a-logo-to-a-photo': {
    title: `Como colocar o seu logotipo em uma foto`,
    seoTitle: `Como adicionar um logotipo a uma foto ou imagem (grátis)`,
    description: `Coloque seu logotipo em uma imagem ou em várias. Escolha posição, tamanho e opacidade, ou repita pela imagem. Funciona no navegador.`,
    intro: `Para adicionar um logotipo a uma foto, solte a imagem na ferramenta Adicionar logotipo a imagens, escolha o arquivo do logotipo, defina onde ele fica e clique em "Adicionar logotipo". Um logotipo em PNG com fundo transparente fica melhor.`,
    steps: [
      `Abra a ferramenta Adicionar logotipo a imagens e solte suas imagens JPG, PNG ou WebP.`,
      `Escolha o arquivo do seu logotipo. Um PNG com fundo transparente dá o resultado mais limpo.`,
      `Escolha uma das nove posições, ou "Repetir pela imagem", e depois defina o tamanho e a opacidade.`,
      `Clique em "Adicionar logotipo" e baixe os arquivos, ou todos em um ZIP.`,
    ],
    sections: [
      {
        h: `Como ter um logotipo limpo`,
        p: [
          `Um logotipo em JPG mantém o quadrado branco, então vai aparecer como um retângulo branco sobre a foto. Exporte o logotipo como PNG ou WebP com fundo transparente.`,
          `Logotipos em SVG ainda não são aceitos, porque o navegador não consegue desenhá-los no processo em segundo plano. Exporte antes um PNG em tamanho grande.`,
        ],
      },
      {
        h: `Tamanho e posição`,
        p: [
          `O logotipo mantém as próprias proporções e o tamanho dele é uma porcentagem da largura da imagem, então fica com o mesmo aspecto em todas as fotos de um lote. Se ele ficar grande demais para caber, é reduzido em vez de cortado.`,
          `Use um canto para uma marca discreta, e o meio ou a opção de repetir quando quiser que seja mais difícil de remover.`,
        ],
      },
      {
        h: `Dicas para um resultado profissional`,
        p: [
          `Mantenha o logotipo pequeno e consistente. Cerca de 10 a 20 por cento da largura da imagem costuma bastar, e usar o mesmo canto em todas as fotos faz o conjunto parecer uma coisa só.`,
          `Confira a prévia numa foto clara e numa escura antes de rodar um lote grande. Se o logotipo sumir em uma delas, aumente a opacidade ou adicione um contorno claro ao logotipo antes de usá-lo.`,
        ],
      },
    ],
    faq: [
      { q: `Quais arquivos de logotipo funcionam?`, a: `PNG, JPG e WebP. Um PNG ou WebP transparente fica melhor. SVG ainda não é aceito.` },
      { q: `Meu logotipo ou minha foto são enviados?`, a: `Não. Os dois são combinados no seu navegador e ficam no seu dispositivo.` },
      { q: `Posso colocar o logotipo em várias fotos?`, a: `Sim. O mesmo logotipo vai em todas as imagens, no mesmo tamanho relativo.` },
    ],
  },
  'how-to-resize-a-photo-and-signature-for-an-exam-form': {
    title: `Como redimensionar foto e assinatura para um formulário de prova`,
    seoTitle: `Redimensionar foto e assinatura para provas (KB e px)`,
    description: `Deixe a foto, a assinatura ou a impressão digital nos pixels e KB exatos que o formulário de prova pede, com requisitos de editais oficiais.`,
    intro: `Para redimensionar uma foto para um formulário de prova, escolha a prova e o documento na ferramenta Redimensionar foto e assinatura para provas, solte a imagem e clique em "Make my file". Você recebe um JPG com o tamanho exato em pixels e dentro da faixa de KB permitida.`,
    steps: [
      `Abra a ferramenta Redimensionar foto e assinatura para provas e escolha a prova e o documento, como "Photograph" ou "Signature".`,
      `Confira os requisitos mostrados. Cada um tem um link para o edital oficial e a data em que o lemos.`,
      `Solte a sua foto ou digitalização. Fotos HEIC do iPhone também funcionam.`,
      `Clique em "Make my file", confira o tamanho na lista e baixe o JPG.`,
    ],
    sections: [
      {
        h: `Quais provas estão incluídas`,
        p: [
          `Hoje a ferramenta tem o IBPS PO/MT (fotografia, assinatura, impressão do polegar esquerdo e declaração manuscrita) e a assinatura do SSC CGL 2026. Todos os números vêm de um edital oficial, e cada predefinição mostra a fonte e quando a lemos.`,
          `Se a sua prova não estiver na lista, escolha "Other exam" e digite os limites de largura, altura e KB do seu próprio edital.`,
        ],
      },
      {
        h: `Confira sempre o seu edital`,
        p: [
          `As regras das provas mudam de uma edição para outra, então compare os números com o seu edital atual antes de enviar. A ferramenta está tão atualizada quanto o edital em que foi baseada.`,
          `A imagem é cortada ou preenchida até o tamanho exato em pixels e depois salva com a melhor qualidade que cabe no máximo. Se uma imagem simples ficar abaixo do mínimo, são acrescentados ao arquivo dados de preenchimento inofensivos para que ele o alcance. A imagem em si não muda.`,
        ],
      },
    ],
    faq: [
      { q: `Os tamanhos são oficiais?`, a: `Sim, eles são copiados de editais oficiais, e cada predefinição tem o link do documento e informa quando o lemos. Confira também o edital da sua própria edição.` },
      { q: `E se a minha prova não estiver na lista?`, a: `Escolha "Other exam" e digite o tamanho em pixels e a faixa de KB do seu edital.` },
      { q: `Minha foto é enviada?`, a: `Não. Ela é redimensionada no seu navegador e nunca sai do seu dispositivo.` },
    ],
  },
  'how-to-convert-images-between-jpg-png-webp-and-heic': {
    title: `Como converter imagens entre JPG, PNG, WebP e HEIC`,
    seoTitle: `Como converter imagens: JPG, PNG, WebP, HEIC para PDF`,
    description: `Abra fotos HEIC do iPhone, alterne entre JPG, PNG e WebP ou crie um PDF. Converte no navegador, sem envio e sem cadastro.`,
    intro: `Para converter uma imagem, solte-a na ferramenta Converter imagens, escolha JPG, PNG, WebP ou PDF como formato e clique em "Converter". Fotos HEIC do iPhone e arquivos AVIF, SVG, GIF e BMP também abrem como entrada.`,
    steps: [
      `Abra a ferramenta Converter imagens e solte seus arquivos. Você pode adicionar vários de uma vez.`,
      `Escolha o formato de saída: JPG, PNG, WebP ou PDF.`,
      `Clique em "Converter".`,
      `Baixe cada arquivo ou todos em um único ZIP.`,
    ],
    sections: [
      {
        h: `Qual formato escolher`,
        p: [
          `O JPG é a escolha segura para fotos e abre em qualquer lugar, inclusive em formulários de envio. O PNG mantém bordas nítidas e fundos transparentes, então serve para logotipos e capturas de tela. O WebP costuma ser menor que os dois e funciona em todos os navegadores atuais.`,
          `O JPG não pode ser transparente, então uma área transparente é preenchida de branco quando você converte para JPG.`,
        ],
      },
      {
        h: `HEIC, AVIF, SVG, GIF e BMP`,
        p: [
          `Os iPhones salvam fotos em HEIC, que muitos aplicativos e sites não abrem. Converta para JPG e funciona em qualquer lugar. O primeiro arquivo HEIC carrega um decodificador de cerca de 2 MB, então pode demorar um pouco para começar. O HEIC serve só como entrada.`,
          `Um GIF mantém apenas o primeiro quadro, um SVG é desenhado com pelo menos 1024 pixels no lado maior, e o AVIF exige um navegador que consiga abri-lo. Esses arquivos são transformados antes em PNG, no seu navegador.`,
        ],
      },
    ],
    faq: [
      { q: `Como converter HEIC para JPG?`, a: `Solte o arquivo HEIC na ferramenta, deixe o formato em JPG e clique em "Converter". Funciona no seu navegador.` },
      { q: `Converter perde qualidade?`, a: `O PNG é sem perdas. JPG e WebP têm perdas, mas são salvos em alta qualidade, então a mudança é difícil de ver numa foto.` },
      { q: `Posso criar um PDF?`, a: `Sim, escolha PDF para ter um PDF por imagem. Para colocar várias imagens em um único PDF, use Juntar imagens em um PDF.` },
    ],
  },
  'how-to-combine-images-into-one-pdf': {
    title: `Como juntar imagens em um único PDF`,
    seoTitle: `Como juntar imagens em um único PDF (grátis, reordene)`,
    description: `Coloque várias imagens JPG, PNG ou WebP em um único PDF, escolha a ordem das páginas e páginas A4 ou do tamanho da imagem. No navegador.`,
    intro: `Para juntar imagens em um único PDF, solte-as na ferramenta Juntar imagens em um PDF, coloque na ordem com "Subir" e "Descer", escolha o estilo da página e clique em "Criar PDF". Cada imagem vira uma página.`,
    steps: [
      `Abra a ferramenta Juntar imagens em um PDF e solte suas imagens. Você pode adicionar mais a qualquer momento.`,
      `Coloque-as na ordem que quiser com "Subir" e "Descer" e remova as que não precisar.`,
      `Escolha "A4 com margens" ou "Cada página do tamanho da sua imagem".`,
      `Clique em "Criar PDF" e baixe o arquivo.`,
    ],
    sections: [
      {
        h: `Páginas A4 ou do tamanho da imagem`,
        p: [
          `A4 com margens é o melhor quando você vai imprimir o PDF ou enviá-lo como documento, porque todas as páginas têm o mesmo tamanho. Páginas do tamanho de cada imagem são melhores quando as imagens têm formatos diferentes e você não quer espaço em branco.`,
          `As imagens não são esticadas. Elas são ajustadas para caber na página e centralizadas.`,
        ],
      },
      {
        h: `Como manter o PDF pequeno`,
        p: [
          `O PDF só fica pequeno se as imagens colocadas nele forem pequenas. Se ele ficar grande demais para mandar por e-mail, comprima as imagens primeiro e só depois junte.`,
          `Uma área transparente aparece branca na página. Se você quiser um PDF separado para cada imagem, em vez de um só para todas, use a ferramenta Converter imagens com PDF como formato.`,
        ],
      },
      {
        h: `Dicas para um PDF organizado`,
        p: [
          `Gire antes as fotos deitadas com a ferramenta Girar e inverter, para que todas as páginas fiquem na posição certa. É bem mais fácil corrigir as imagens do que corrigir as páginas depois.`,
          `Dê nomes aos arquivos que os coloquem em ordem e confira a ordem na lista antes de clicar em "Criar PDF". As páginas seguem a lista de cima para baixo.`,
        ],
      },
    ],
    faq: [
      { q: `Posso mudar a ordem das páginas?`, a: `Sim. Use "Subir" e "Descer" ao lado de cada imagem e remova as que não precisar.` },
      { q: `Funciona com fotos do iPhone?`, a: `Sim. Fotos HEIC abrem como entrada e são colocadas no PDF.` },
      { q: `Minhas imagens são enviadas?`, a: `Não. O PDF é feito no seu navegador e nunca sai do seu dispositivo.` },
    ],
  },
};
