---
title: Guia de estilo de tradução do ethereum.org
metaTitle: Guia para tradutores
lang: pt-br
description: Instruções e dicas para tradutores do ethereum.org
---

O guia de estilo de tradução do ethereum.org contém algumas das diretrizes, instruções e dicas mais importantes para os tradutores, ajudando-nos a localizar o site.

Este documento serve como um guia geral e não é específico para nenhum idioma.

Se você tiver alguma dúvida, sugestão ou feedback, sinta-se à vontade para entrar em contato conosco pelo e-mail translations@ethereum.org, enviar uma mensagem para @ethdotorg no Crowdin ou [entrar no nosso Discord](https://discord.gg/ethereum-org), onde você pode nos enviar uma mensagem no canal #translations ou entrar em contato com qualquer membro da equipe.

## Usando o Crowdin {#using-crowdin}

Você pode encontrar instruções básicas sobre como participar do projeto no Crowdin e como usar o editor online do Crowdin na [página do Programa de Tradução](/contributing/translation-program/#how-to-translate).

Se você quiser saber mais sobre o Crowdin e como usar alguns de seus recursos avançados, a [base de conhecimento do Crowdin](https://support.crowdin.com/online-editor/) contém muitos guias detalhados e visões gerais de todas as funcionalidades do Crowdin.

## Capturando a essência da mensagem {#capturing-the-essence}

Ao traduzir o conteúdo do ethereum.org, evite traduções literais.

É importante que as traduções capturem a essência da mensagem. Isso pode significar reformular certas frases ou usar traduções descritivas em vez de traduzir o conteúdo palavra por palavra.

Idiomas diferentes têm regras gramaticais, convenções e ordem de palavras diferentes. Ao traduzir, preste atenção em como as frases são estruturadas nos idiomas de destino e evite traduzir literalmente a fonte em inglês, pois isso pode levar a uma estrutura de frase e legibilidade ruins.

Em vez de traduzir o texto de origem palavra por palavra, é recomendável que você leia a frase inteira e a adapte para se adequar às convenções do idioma de destino.

## Formal vs. informal {#formal-vs-informal}

Usamos a forma formal de tratamento, que é sempre educada e apropriada para todos os visitantes.

O uso do tratamento formal nos permite evitar soar não oficiais ou ofensivos, e funciona independentemente da idade e do gênero do visitante.

A maioria dos idiomas indo-europeus e afro-asiáticos usa pronomes pessoais de segunda pessoa específicos de gênero, que distinguem entre masculino e feminino. Ao se dirigir ao usuário ou usar pronomes possessivos, podemos evitar presumir o gênero do visitante, pois a forma formal de tratamento é geralmente aplicável e consistente, independentemente de como ele se identifique.

## Vocabulário e significado simples e claros {#simple-vocabulary}

Nosso objetivo é tornar o conteúdo do site compreensível para o maior número possível de pessoas.

Na maioria dos casos, isso pode ser facilmente alcançado usando palavras curtas e simples que são facilmente compreensíveis. Se houver várias traduções possíveis para uma determinada palavra no seu idioma com o mesmo significado, a melhor opção é, na maioria das vezes, a palavra mais curta que reflita claramente o significado.

## Sistema de escrita {#writing-system}

O ethereum.org está disponível em vários idiomas, usando sistemas de escrita (ou scripts de escrita) alternativos ao latino.

Todo o conteúdo deve ser traduzido usando o sistema de escrita correto para o seu idioma e não deve incluir nenhuma palavra escrita com caracteres latinos.

Ao traduzir o conteúdo, você deve garantir que as traduções sejam consistentes e não incluam caracteres latinos.

Um equívoco comum é que Ethereum deve sempre ser escrito em latim. Isso é em grande parte incorreto, por favor, use a grafia de Ethereum nativa do seu idioma (por exemplo, 以太坊 em chinês, إيثيريوم em árabe, etc.).

**O que foi dito acima não se aplica a idiomas onde nomes próprios não devem ser traduzidos como regra.**

## Traduzindo metadados da página {#translating-metadata}

Algumas páginas contêm metadados na página, como 'title', 'lang', 'description', 'sidebar', etc.

Ocultamos o conteúdo que os tradutores nunca devem traduzir ao enviar novas páginas para o Crowdin, o que significa que todos os metadados visíveis para os tradutores no Crowdin devem ser traduzidos.

Por favor, tenha um cuidado especial ao traduzir quaisquer strings onde o texto de origem seja 'en'. Isso representa o idioma em que a página está disponível e deve ser traduzido para o [código de idioma ISO para o seu idioma](https://www.andiamo.co.uk/resources/iso-language-codes/). Essas strings devem sempre ser traduzidas usando caracteres latinos, não o script de escrita nativo do idioma de destino.

Se você não tiver certeza de qual código de idioma usar, pode verificar a memória de tradução no Crowdin ou encontrar o código de idioma para o seu idioma no URL da página no editor online do Crowdin.

Alguns exemplos de códigos de idioma para os idiomas mais falados:

- Árabe - ar
- Chinês Simplificado - zh
- Francês - fr
- Hindi - hi
- Espanhol - es

## Títulos de artigos externos {#external-articles}

Algumas strings contêm títulos de artigos externos. A maioria das nossas páginas de documentação para desenvolvedores contém links para artigos externos para leitura adicional. As strings que contêm títulos de artigos precisam ser traduzidas, independentemente do idioma do artigo, para garantir uma experiência de usuário mais consistente para os visitantes que visualizam a página em seu idioma.

Você pode encontrar alguns exemplos de como essas strings se parecem para os tradutores e como identificá-las abaixo (os links para os artigos podem ser encontrados principalmente na parte inferior dessas páginas, na seção 'Leitura adicional'):

![Article titles in sidebar.png](./article-titles-in-sidebar.png)
![Article titles in editor.png](./article-titles-in-editor.png)

## Avisos do Crowdin {#crowdin-warnings}

O Crowdin tem um recurso integrado que avisa os tradutores quando eles estão prestes a cometer um erro. O Crowdin avisará você automaticamente sobre isso antes de salvar sua tradução se você esquecer de incluir uma tag da fonte, traduzir elementos que não devem ser traduzidos, adicionar vários espaços consecutivos, esquecer a pontuação final, etc.
Se você vir um aviso como este, volte e verifique novamente a tradução sugerida.

**Nunca ignore esses avisos, pois eles geralmente significam que algo está errado ou que a tradução está sem uma parte fundamental do texto de origem.**

Um exemplo de um aviso do Crowdin quando você esquece de adicionar uma tag à sua tradução:
![Example of a Crowdin warning](./crowdin-warning-example.png)

## Lidando com tags e trechos de código {#dealing-with-tags}

Grande parte do conteúdo de origem contém tags e variáveis, que são destacadas em amarelo no editor do Crowdin. Elas serveem a funções diferentes e devem ser abordadas corretamente.

**Configurações do Crowdin**

Para facilitar o gerenciamento de tags e copiá-las diretamente da fonte, recomendamos alterar suas configurações no editor do Crowdin.

1. Abra as configurações
   ![How to open settings in the editor](./editor-settings.png)

2. Role para baixo até a seção 'Exibição de tags HTML' (HTML tags displaying)

3. Selecione 'Ocultar' (Hide)
   ![Please select 'Hide'](./hide-tags.png)

4. Clique em 'Salvar' (Save)

Ao selecionar esta opção, o texto completo da tag não será mais mostrado e será substituído por um número.
Ao traduzir, clicar nesta tag copiará automaticamente a tag exata para o campo de tradução.

**Links**

Você pode notar links completos para páginas no ethereum.org ou em outros sites.

Eles devem ser idênticos à fonte e não devem ser alterados ou traduzidos. Se você traduzir um link ou alterá-lo de alguma forma, mesmo que seja apenas removendo uma parte dele, como uma barra (/), isso levará a links quebrados e inutilizáveis.

A melhor maneira de lidar com links é copiá-los diretamente da fonte, clicando neles ou usando o botão 'Copiar Fonte' (Copy Source) (`Alt+C`).

![Example of link.png](./example-of-link.png)

Os links também aparecem no texto de origem na forma de tags (ou seja, `<0>` `</0>`). Se você passar o mouse sobre a tag, o editor mostrará seu conteúdo completo - às vezes, essas tags representarão links.

É muito importante copiar os links da fonte e não alterar a ordem deles.

Se a ordem das tags for alterada, o link que elas representam será quebrado.

![Example of links inside tags.png](./example-of-links-inside-tags.png)

**Tags e variáveis**

O texto de origem contém muitos tipos diferentes de tags, que devem sempre ser copiadas da fonte e nunca alteradas. De forma semelhante ao que foi dito acima, a ordem dessas tags na tradução também deve permanecer a mesma da fonte.

As tags sempre contêm uma tag de abertura e uma de fechamento. Na maioria dos casos, o texto entre as tags de abertura e fechamento deve ser traduzido.

Exemplo: `<strong x-id="1">`Descentralizado`</strong>`

`<strong x-id="1">` - _Tag de abertura que deixa o texto em negrito_

Descentralizado - _Texto traduzível_

`</strong>` - _Tag de fechamento_

![Example of 'strong' tags.png](./example-of-strong-tags.png)

Os trechos de código devem ser abordados de forma um pouco diferente das outras tags, pois contêm código que não deve ser traduzido.

Exemplo: `<code>`nonce`</code>`

`<code>` - _Tag de abertura, que contém um trecho de código_

nonce - _Texto não traduzível_

`</code>` - _Tag de fechamento_

![Example of code snippets.png](./example-of-code-snippets.png)

O texto de origem também contém tags encurtadas, que contêm apenas números, o que significa que sua função não é imediatamente óbvia. Você pode passar o mouse sobre essas tags para ver exatamente qual função elas desempenham.

No exemplo abaixo, você pode ver que passar o mouse sobre a tag `<0>` mostra que ela representa `<code>` e contém um trecho de código, portanto, o conteúdo dentro dessas tags não deve ser traduzido.

![Example of ambiguous tags.png](./example-of-ambiguous-tags.png)

## Formas curtas vs. completas/abreviações {#short-vs-full-forms}

Existem muitas abreviações usadas no site, por exemplo, dapps, NFT, DAO, DeFi, etc. Essas abreviações são comumente usadas em inglês e a maioria dos visitantes do site está familiarizada com elas.

Como elas geralmente não têm traduções estabelecidas em outros idiomas, a melhor maneira de abordar esses e outros termos semelhantes é fornecer uma tradução descritiva da forma completa e adicionar a abreviação em inglês entre parênteses.

Não traduza essas abreviações, pois a maioria das pessoas não estaria familiarizada com elas, e as versões localizadas não fariam muito sentido para a maioria dos visitantes.

Exemplo de como traduzir dapps:

- Aplicativos descentralizados (dapps) → _Forma completa traduzida (abreviação em inglês entre parênteses)_

## Termos sem traduções estabelecidas {#terms-without-established-translations}

Alguns termos podem não ter traduções estabelecidas em outros idiomas e são amplamente conhecidos pelo termo original em inglês. Esses termos incluem principalmente conceitos mais recentes, como Prova de Trabalho (PoW), Prova de Participação (PoS), Beacon Chain, staking, etc.

Embora a tradução desses termos possa soar não natural, já que a versão em inglês também é comumente usada em outros idiomas, é altamente recomendável que eles sejam traduzidos.

Ao traduzi-los, sinta-se à vontade para ser criativo, usar traduções descritivas ou simplesmente traduzi-los literalmente.

**O motivo pelo qual a maioria dos termos deve ser traduzida, em vez de deixar alguns em inglês, é o fato de que essa nova terminologia se tornará mais difundida no futuro, à medida que mais pessoas começarem a usar o Ethereum e tecnologias relacionadas. Se quisermos integrar mais pessoas de todo o mundo a este espaço, precisamos fornecer terminologia compreensível no maior número possível de idiomas, mesmo que precisemos criá-la nós mesmos.**

## Botões e CTAs {#buttons-and-ctas}

O site contém vários botões, que devem ser traduzidos de forma diferente de outros conteúdos.

O texto do botão pode ser identificado visualizando as capturas de tela de contexto, conectadas à maioria das strings, ou verificando o contexto no editor, que inclui a palavra ''button''.

As traduções para botões devem ser as mais curtas possíveis, para evitar incompatibilidades de formatação. Além disso, as traduções de botões devem ser imperativas, ou seja, apresentar um comando ou solicitação.

![How to find a button.png](./how-to-find-a-button.png)

## Traduzindo para a inclusão {#translating-for-inclusivity}

Os visitantes do ethereum.org vêm de todo o mundo e de diferentes origens. A linguagem no site deve, portanto, ser neutra, acolhedora para todos e não exclusiva.

Um aspecto importante disso é a neutralidade de gênero. Isso pode ser facilmente alcançado usando a forma formal de tratamento e evitando quaisquer palavras específicas de gênero nas traduções.

Outra forma de inclusão é tentar traduzir para um público global, não específico de nenhum país, raça ou região.

Por fim, a linguagem deve ser adequada para todos os públicos e idades.

## Traduções específicas do idioma {#language-specific-translations}

Ao traduzir, é importante seguir as regras gramaticais, convenções e formatação usadas no seu idioma, em vez de copiar da fonte. O texto de origem segue as regras e convenções gramaticais do inglês, o que não se aplica a muitos outros idiomas.

Você deve estar ciente das regras do seu idioma e traduzir de acordo. Se precisar de ajuda, entre em contato conosco e ajudaremos você a encontrar alguns recursos sobre como esses elementos devem ser usados no seu idioma.

Alguns exemplos do que ter um cuidado especial:

### Pontuação, formatação {#punctuation-and-formatting}

**Uso de maiúsculas e minúsculas**

- Existem grandes diferenças no uso de maiúsculas e minúsculas em diferentes idiomas.
- Em inglês, é comum colocar em maiúscula todas as palavras em títulos e nomes, meses e dias, nomes de idiomas, feriados, etc. Em muitos outros idiomas, isso é gramaticalmente incorreto, pois eles têm regras diferentes de uso de maiúsculas e minúsculas.
- Alguns idiomas também têm regras sobre o uso de maiúsculas em pronomes pessoais, substantivos e certos adjetivos, que não são escritos com maiúsculas em inglês.

**Espaçamento**

- As regras de ortografia definem o uso de espaços para cada idioma. Como os espaços são usados em todos os lugares, essas regras são algumas das mais distintas, e os espaços são alguns dos elementos mais traduzidos incorretamente.
- Algumas diferenças comuns no espaçamento entre o inglês e outros idiomas:
  - Espaço antes de unidades de medida e moedas (por exemplo, USD, EUR, kB, MB)
  - Espaço antes de sinais de grau (por exemplo, °C, ℉)
  - Espaço antes de alguns sinais de pontuação, especialmente as reticências (…)
  - Espaço antes e depois de barras (/)

**Listas**

- Cada idioma tem um conjunto diversificado e complexo de regras para escrever listas. Elas podem ser significativamente diferentes do inglês.
- Em alguns idiomas, a primeira palavra de cada nova linha precisa ser maiúscula, enquanto em outros, as novas linhas devem começar com letras minúsculas. Muitos idiomas também têm regras diferentes sobre o uso de maiúsculas em listas, dependendo do comprimento de cada linha.
- O mesmo se aplica à pontuação dos itens da linha. A pontuação final nas listas pode ser um ponto final (**.**), vírgula (**,**) ou ponto e vírgula (**;**), dependendo do idioma.

**Aspas**

- Os idiomas usam muitos tipos diferentes de aspas. Simplesmente copiar as aspas em inglês da fonte costuma ser incorreto.
- Alguns dos tipos mais comuns de aspas incluem:
  - „texto de exemplo“
  - ‚texto de exemplo’
  - »texto de exemplo«
  - “texto de exemplo”
  - ‘texto de exemplo’
  - «texto de exemplo»

**Hífens e travessões**

- Em inglês, um hífen (-) é usado para unir palavras ou partes diferentes de uma palavra, enquanto um travessão (–) é usado para indicar um intervalo ou uma pausa.
- Muitos idiomas têm regras diferentes para o uso de hífens e travessões que devem ser observadas.

### Formatos {#formats}

**Números**

- A principal diferença na escrita de números em diferentes idiomas é o separador usado para decimais e milhares. Para milhares, pode ser um ponto, vírgula ou espaço. Da mesma forma, alguns idiomas usam um ponto decimal, enquanto outros usam uma vírgula decimal.
  - Alguns exemplos de números grandes:
    - Inglês – **1,000.50**
    - Espanhol – **1.000,50**
    - Francês – **1 000,50**
- Outra consideração importante ao traduzir números é o sinal de porcentagem. Ele pode ser escrito de diferentes maneiras: **100%**, **100 %** ou **%100**.
- Por fim, os números negativos podem ser exibidos de forma diferente, dependendo do idioma: -100, 100-, (100) ou [100].

**Datas**

- Ao traduzir datas, há uma série de considerações e diferenças com base no idioma. Isso inclui o formato da data, separador, uso de maiúsculas e zeros à esquerda. Também há diferenças entre datas por extenso e numéricas.
  - Alguns exemplos de diferentes formatos de data:
    - Inglês do Reino Unido (dd/mm/aaaa) – 1st January, 2022
    - Inglês dos EUA (mm/dd/aaaa) – January 1st, 2022
    - Chinês (aaaa-mm-dd) – 2022 年 1 月 1 日
    - Francês (dd/mm/aaaa) – 1er janvier 2022
    - Italiano (dd/mm/aaaa) – 1º gennaio 2022
    - Alemão (dd/mm/aaaa) – 1. Januar 2022

**Moedas**

- Traduzir moedas pode ser um desafio, devido aos diferentes formatos, convenções e conversões. Como regra geral, mantenha as moedas iguais às da fonte. Você pode adicionar sua moeda local e a conversão entre parênteses, para o benefício do leitor.
- As principais diferenças na escrita de moedas em diferentes idiomas incluem o posicionamento do símbolo, vírgulas decimais vs. pontos decimais, espaçamento e abreviações vs. símbolos.
  - Posicionamento do símbolo: $100 ou 100$
  - Vírgulas decimais vs. pontos decimais: 100,50$ ou 100.50$
  - Espaçamento: 100$ ou 100 $
  - Abreviações vs. símbolos: 100 $ ou 100 USD

**Unidades de medida**

- Como regra geral, mantenha as unidades de medida conforme a fonte. Se o seu país usar um sistema diferente, você pode incluir a conversão entre parênteses.
- Além da localização das unidades de medida, também é importante observar as diferenças em como os idiomas abordam essas unidades. A principal diferença é o espaçamento entre o número e a unidade, que pode ser diferente, com base no idioma. Exemplos disso incluem 100kB vs. 100 kB ou 50ºF vs. 50 ºF.

## Conclusão {#conclusion}

Traduzir o ethereum.org é uma ótima oportunidade para aprender sobre os diferentes aspectos do Ethereum.

Ao traduzir, tente não se apressar. Vá com calma e divirta-se!

Obrigado por se envolver com o Programa de Tradução e nos ajudar a tornar o site acessível a um público mais amplo. A comunidade Ethereum é global e estamos felizes por você fazer parte dela!