---
title: Guia para tradutores
lang: pt-br
description: Instruções e dicas para os tradutores do ethereum.org
---

# Guia de Estilo de Tradução do Ethereum.org {#style-guide}

O Guia de Estilo de Tradução do ethereum.org contém algumas das diretrizes, instruções e dicas mais importantes para os tradutores, que nos ajudam a traduzir o site.

Este documento serve como um guia geral e não é específico para nenhum idioma.

Se você tiver alguma dúvida, sugestão ou feedback, envie um e-mail para translations@ethereum.org, uma mensagem para @ethdotorg no Crowdin ou [inscreva-se no Discord](https://discord.gg/ethereum-org), para nos mandar mensagens no canal #translations ou entrar em contato com qualquer um dos membros da equipe.

## Como usar o Crowdin {#using-crowdin}

Você pode encontrar instruções básicas sobre como participar do projeto no Crowdin e como usar o editor online do Crowdin na [página do Programa de Tradução](/contributing/translation-program/#how-to-translate).

Se você quiser saber mais sobre o Crowdin e usar alguns dos seus recursos avançados, a [Base de conhecimento do Crowdin](https://support.crowdin.com/online-editor/) contém vários de guias detalhados e resumos de todas as funcionalidades do Crowdin.

## Entendendo a essência da mensagem {#capturing-the-essence}

Ao traduzir o conteúdo do ethereum.org, evite traduções literais.

É importante que as traduções captem a essência da mensagem. Isso pode significar reformular certas frases ou usar traduções descritivas em vez de traduzir o conteúdo palavra por palavra.

Idiomas diferentes têm diferentes regras gramaticais, convenções e ordem de palavras. Ao traduzir, tenha em mente como as frases são estruturadas no idioma de destino e evite traduzir literalmente do inglês, pois isso pode resultar em um texto mal estruturado e difícil de compreender.

Em vez de traduzir o texto de origem palavra por palavra, é recomendado ler toda a frase e adaptá-la para que ela se adapte às convenções do idioma de destino.

## Formal ou informal {#formal-vs-informal}

Utilizamos linguagem formal, que é sempre mais educada e apropriada a todos os visitantes.

O uso do estilo formal nos permite evitar soarmos ofensivos ou inapropriados, e funciona independentemente da idade e sexo do visitante.

A maioria dos idiomas indo-europeus e afro-asiáticos utiliza pronomes pessoais em segunda pessoa específicos de gênero, que fazem a distinção entre masculino e feminino. Quando nos dirigimos ao usuário ou usamos pronomes possessivos, podemos evitar supor o sexo do visitante, uma vez que a maneira formal de tratamento é geralmente aplicável e consistente, independentemente da forma como se identificam.

## Vocabulário simples e claro {#simple-vocabulary}

Nosso objetivo é tornar o conteúdo do site compreensível para o maior número de pessoas possível.

Na maioria dos casos, isso pode ser facilmente alcançado através da utilização de palavras curtas e simples, que sejam facilmente compreensíveis. Se existirem várias traduções possíveis para uma determinada palavra no seu idioma com o mesmo significado, a melhor opção é, na maioria das vezes, a palavra mais curta que reflita claramente o significado.

## Sistema de escrita {#writing-system}

O ethereum.org está disponível em vários idiomas, utilizando sistemas de escrita (ou scripts de escrita) diferentes do sistema latino.

Todo o conteúdo deve ser traduzido usando a norma padrão de seu idioma, e não deve incluir nenhuma palavra em caracteres latinos.

Ao traduzir o conteúdo, você deve garantir que a tradução está correta.

Um engano comum é o de que Ethereum deve ser escrito sempre em caracteres latinos. Essa é uma ideia incorreta, por isso, use a grafia do Ethereum de acordo com seu idioma nativo (por exemplo, 以太坊 em chinês, إيثيريوم em árabe, etc.).

**O mencionado acima não se aplica a idiomas em que nomes próprios não devem ser traduzidos como regra geral.**

## Traduzindo metadados da página {#translating-metadata}

Algumas páginas contêm metadados, como "title", "lang", "description", "sidebar", etc.

Ocultamos o conteúdo que os tradutores nunca devem traduzir ao carregar novas páginas no Crowdin, ou seja, todos os metadados visíveis aos tradutores no Crowdin devem ser traduzidos.

Esteja atento ao traduzir quaisquer frases em que o texto de origem seja "en". Isso representa o idioma no qual a página está disponível e deve ser traduzida para o [código de idioma ISO para o seu idioma.](https://www.andiamo.co.uk/resources/iso-language-codes/). Essas frases devem sempre ser traduzidas usando caracteres latinos, e não o script de escrita nativo do idioma de destino.

Se você não tem certeza de qual código de idioma usar, você pode verificar a memória de tradução no Crowdin ou encontrar o código de idioma para o seu idioma na URL da página no editor online do Crowdin.

Alguns exemplos de códigos para os idiomas mais falados:

- Árabe - ar
- Chinês Simplificado - zh
- Francês - fr
- Híndi - hi
- Espanhol - es

## Títulos de artigos externos {#external-articles}

Algumas frases contêm títulos de artigos externos. A maioria das nossas páginas de desenvolvedor contém links para artigos externos para uma leitura mais aprofundada. As frases que contêm títulos de artigos precisam ser traduzidas, independentemente do idioma do artigo, para garantir uma experiência de usuário mais eficiente para quem quiser acessar a página em seu idioma.

Você pode encontrar alguns exemplos de como essas frases aparecem para os tradutores e como identificá-las abaixo (os links para artigos podem ser encontrados na parte inferior destas páginas, na seção "Leitura adicional"):

![Títulos de artigos no sidebar.png](./article-titles-in-sidebar.png) ![Títulos de artigos no editor.png](./article-titles-in-editor.png)

## Alertas do Crowdin {#crowdin-warnings}

O Crowdin tem um recurso integrado que alerta os tradutores quando eles estão prestes a cometer um erro. O Crowdin avisará automaticamente antes de salvar sua tradução, caso você se esqueça de incluir uma tag da fonte, traduzir elementos que não devem ser traduzidos, adicionar espaços adicionais ou se esqueça da pontuação final, etc. Se você vir um aviso como este, verifique novamente a tradução sugerida.

**Nunca ignore esses avisos, pois significa que algo está errado, ou está faltando uma parte importante do texto original.**

Um exemplo de alerta do Crowdin quando você se esquece de adicionar uma tag à sua tradução: ![Exemplo de um aviso do Crowdin](./crowdin-warning-example.png)

## Lidando com tags e trechos de código {#dealing-with-tags}

Grande parte do conteúdo fonte contém tags e variáveis, que são destacadas em amarelo no editor do Crowdin. Elas desempenham funções diferentes e devem ser abordadas corretamente.

**Configurações do Crowdin**

Para tornar mais fácil gerenciar tags e copiá-las diretamente da fonte, recomendamos alterar as suas configurações no editor do Crowdin.

1. Abra as configurações ![Como abrir as configurações no editor](./editor-settings.png)

2. Role para baixo até a seção "Exibição de tags HTML"

3. Selecione "Ocultar" ![Selecione "Ocultar"](./hide-tags.png)

4. Clique em "Salvar"

Ao selecionar esta opção, o texto completo da tag não será mais exibido e será substituído por um número. Ao traduzir, clicar nesta tag copiará automaticamente a tag exata para o campo de tradução.

**Links**

Você verá os links completos para páginas no ethereum.org ou em outros sites.

Eles devem ser idênticos ao texto de origem e não devem ser alterados ou traduzidos. Se você traduzir um link ou mudá-lo de alguma forma, mesmo removendo apenas uma parte dele, como uma barra (/), isso corromperá os links e os inutilizará.

A melhor maneira de lidar com links é copiá-los diretamente da fonte, clicando sobre eles ou usando o botão "Copiar texto" (Alt+C).

![Exemplo de link.png](./example-of-link.png)

Links também aparecem no texto fonte na forma de tags (ou seja, <0> </0>). Se você passar o mouse por cima da tag, o editor exibirá seu conteúdo completo. Às vezes, essas tags representarão links.

É muito importante copiar os links da origem e não mudar a sua ordem.

Se a ordem das tags for alterada, o link que elas representam será desfeito.

![Exemplo de links dentro de tags.png](./example-of-links-inside-tags.png)

**Tags e variáveis**

O texto original contém diversos tipos de tags, que devem sempre ser copiadas da fonte e nunca alteradas. Como explicado acima, a ordem dessas tags na tradução também deve permanecer a mesma da origem.

As tags sempre contêm uma identificação de abertura e fechamento. Geralmente, o texto entre as tags de abertura e fechamento deve ser traduzido.

Exemplo: `<strong x-id="1">`Descentralizado`</strong>`

`<strong x-id="1">` — _Tag de abertura que deixa o texto em negrito_

Descentralizado — _Texto traduzível_

`</strong>` — _Tag de fechamento_

![Exemplo de tags.png ''fortes"](./example-of-strong-tags.png)

Os trechos de código (snippets) devem ser abordados de maneira ligeiramente diferente das outras tags por conterem código que não deveria ser traduzido.

Exemplo: `<code>`nonce`</code>`

`<code>` — _Tag de abertura, que contém um trecho de código_

nonce — _Texto não traduzível_

`</code>` — _Tag de fechamento_

![Exemplo de código snippets.png](./example-of-code-snippets.png)

O texto original também contém tags abreviadas, que contêm apenas números, o que significa que sua função não é imediatamente óbvia. Você pode passar o mouse sobre essas tags para ver exatamente para qual função elas servem.

No exemplo abaixo, ao passar o mouse sobre a <0> tag mostra que ela representa `<code>` e contém um trecho de código. Portanto, o conteúdo dentro dessas tags não deve ser traduzido.

![Exemplo de tags.png ambíguas](./example-of-ambiguous-tags.png)

## Formas/abreviaturas curtas vs. completas {#short-vs-full-forms}

Existem muitas abreviações usadas no site, por exemplo, dapps, NFT, DAO, DeFi, etc. Essas abreviações são comumente usadas em inglês e a maioria dos visitantes do site estão familiarizados com elas.

Como elas geralmente não têm traduções estabelecidas em outros idiomas, a melhor maneira de abordar esses e outros termos semelhantes é fornecer uma tradução descritiva do formulário completo e adicionar a abreviação inglesa em parênteses.

Não traduza essas abreviaturas, já que a maioria das pessoas não estaria familiarizada com elas e as versões localizadas não fariam muito sentido para a maioria dos visitantes.

Exemplo de como traduzir dapps:

- Aplicativos descentralizados (dapps) → _Formulário completo traduzido (abreviação em inglês entre parênteses)_

## Termos sem traduções estabelecidas {#terms-without-established-translations}

Alguns termos podem não ter traduções estabelecidas em outros idiomas e são mais conhecidos pelo termo original em inglês. Esses termos incluem principalmente conceitos novos, como proof-of-work, proof-of-stake, Beacon Chain, staking, etc.

Embora traduzir esses termos possa parecer não natural, já que a versão em inglês é comumente usada também em outros idiomas, é altamente recomendado que eles sejam traduzidos.

Ao traduzi-los, sinta-se livre para ser criativo, use traduções descritivas ou simplesmente traduza-os literalmente.

**A razão pela qual a maioria dos termos deveria ser traduzida, em vez ser deixada em inglês, é que essa nova terminologia se tornará mais difundida no futuro, à medida que mais pessoas começarem a usar o Ethereum e tecnologias relacionadas. Se queremos envolver mais pessoas de todo o mundo nesse espaço, precisamos fornecer uma terminologia compreensível no maior número possível de idiomas, mesmo que precisemos criá-la nós mesmos.**

## Botões e chamadas para a ação (CTAs) {#buttons-and-ctas}

O site contém vários botões, que devem ser traduzidos de forma diferente dos outros tipos de conteúdo.

O texto do botão pode ser identificado visualizando o contexto das telas capturadas, conectadas com a maioria das frases, ou verificando o contexto no editor, que inclui a frase 'botão'.

As traduções dos botões devem ser o mais curtas possível, para evitar incompatibilidade de formatação. Além disso, as traduções dos botões devem ter o verbo no imperativo, ou seja, apresentar um comando ou solicitação.

![Como encontrar um botão.png](./how-to-find-a-button.png)

## Traduzindo de forma inclusiva {#translating-for-inclusivity}

Os visitantes do ethereum.org vêm de todo o mundo e de diferentes origens. Por conseguinte, a linguagem utilizada no site deve ser neutra, acolhedora para todos e inclusiva.

Um aspecto importante dessa questão é a neutralidade de gênero. Isso é fácil de se obter com o uso de linguagem de tratamento formal e evitando quaisquer palavras específicas de gênero nas traduções.

Outra forma de inclusão é tentar traduzir para um público global, sem especificidades de país, raça ou região.

Por último, a língua deve ser adequada para todos os públicos e todas as idades.

## Traduções específicas de um idioma {#language-specific-translations}

Ao traduzir, é importante seguir as regras gramaticais, convenções e formatação usadas em seu idioma, em vez de copiá-las do idioma de origem. O texto de origem segue as regras e convenções gramaticais do inglês, o que não é aplicável a muitos outros idiomas.

Você deve estar ciente das regras do seu idioma e traduzir de acordo com elas. Se precisar de ajuda, entre em contato conosco e ajudaremos você a encontrar alguns recursos sobre como esses elementos devem ser utilizados no seu idioma.

Aqui estão alguns exemplos a que você deve ter atenção:

### Pontuação, formatação {#punctuation-and-formatting}

**Regras de uso de maiúsculas e minúsculas**

- Há grandes diferenças de uso de maiúsculas e minúsculas em diferentes idiomas.
- Em inglês, é comum colocar a primeira letra de todas as palavras em títulos e nomes, meses e dias, nomes de idiomas, feriados, etc. em maiúsculas. Em muitas outras línguas, isso é gramaticalmente incorreto, já que elas têm diferentes regras de uso de maiúsculas e minúsculas.
- Alguns idiomas também têm regras de uso de maiúsculas de pronomes pessoais, substantivos e alguns adjetivos, diferentes do inglês.

**Espaçamento**

- As regras da ortografia definem o uso de espaços para cada língua. Como os espaços são usados em toda a parte, essas regras são frequentemente bem específicas e estão entre os elementos mais mal traduzidos.
- Algumas diferenças comuns de espaçamento entre inglês e outras línguas:
  - Espaço antes das unidades de medida e moedas (por exemplo: USD, EUR, kB, MB)
  - Espaço antes dos sinais de graus (ex.: °C, °F)
  - Espaço antes de algumas marcas de pontuação, especialmente as reticências (…)
  - Espaço antes e após barras (/)

**Listas**

- Toda língua tem um conjunto diversificado e complexo de regras para escrever listas. Elas podem ser significativamente diferentes do inglês.
- Em algumas línguas, a primeira palavra de cada nova linha precisa ser colocada em maiúscula, enquanto em outras, novas linhas devem começar com letras minúsculas. Muitas línguas também têm regras diferentes sobre o uso de maiúsculas em listas, dependendo do tamanho de cada linha.
- O mesmo se aplica à pontuação de itens de linha. A pontuação final em listas pode ser um ponto (**.**), vírgula (**,**), ou ponto e vírgula (**;**), dependendo do idioma.

**Aspas**

- Os idiomas usam muitas aspas diferentes. Frequentemente, é incorreto simplesmente copiar as aspas do inglês.
- Alguns dos tipos mais comuns de aspas são:
  - „texto de exemplo“
  - ‚texto de exemplo’
  - »texto de exemplo«
  - “texto de exemplo”
  - ‘texto de exemplo’
  - «texto de exemplo»

**Hifens e traços**

- Em inglês, um hífen (-) é usado para juntar palavras ou diferentes partes de uma palavra, enquanto um traço (–) é usado para indicar intervalo ou pausa.
- Muitas línguas têm regras diferentes para o uso de hifens e traços que devem ser respeitadas.

### Formatos {#formats}

**Números**

- A principal diferença entre is idiomas em relação à escrita de números é o separador usado para números decimais e milhares. Para milhares, isso pode ser um ponto, vírgula ou espaço. Da mesma forma, alguns idiomas usam um ponto decimal, enquanto outros usam uma vírgula decimal.
  - Alguns exemplos de números grandes:
    - Inglês — **1,000.50**
    - Espanhol — **1.000,50**
    - Francês — **1 000,50**
- Outra consideração importante ao traduzir números é o sinal de percentagem. Ele pode ser escrito de diferentes formas: **100%**, **100 %** ou **%100**.
- Por fim, números negativos podem ser exibidos de formas diferentes, dependendo do idioma: -100, 100-, (100) ou [100].

**Datas**

- Ao traduzir datas, há várias considerações e diferenças dependendo do idioma. Eles incluem o formato de data, separador, uso de maiúsculas e minúsculas e zeros à esquerda. Também existem diferenças entre datas completas e datas numéricas.
  - Alguns exemplos de diferentes formatos de data:
    - Inglês britânico (dd/mm/yyyy) — 1st January, 2022
    - Inglês americano (dd/mm/yyyy) — January 1st, 2022
    - Chinês (yyyy-mm-dd) — 2022 年 1 月 1 日
    - Francês (dd/mm/yyyy) — 1er janvier 2022
    - Italiano (dd/mm/yyyy) — 1º gennaio 2022
    - Alemão (dd/mm/yyyy) — 1. Januar 2022

**Moedas**

- A tradução de moedas pode ser desafiadora, devido aos diferentes formatos, convenções e conversões. Como regra geral, mantenha as moedas iguais à fonte. Você pode adicionar sua moeda local e conversão entre colchetes, para ajudar a compreensão do leitor.
- As principais diferenças na escrita das moedas em diferentes idiomas incluem posicionamento de símbolos, vírgulas decimais versus pontos decimais, espaçamento e abreviações versus símbolos.
  - Posicionamento do símbolo: $100 ou 100$
  - Vírgulas decimais versus pontos decimais: 100,50$ ou 100.50$
  - Espaçamento: 100$ ou 100 $
  - Abreviações versus símbolos: 100 $ ou 100 USD

**Unidades de medida**

- Como regra geral, mantenha as unidades de medida iguais ao texto original. Se o seu país usa um sistema diferente, você pode incluir a conversão entre parênteses.
- Além da localização das unidades de medida, também é importante observar as diferenças na forma como as línguas abordam essas unidades. A principal diferença é o espaçamento entre o número e a unidade, que pode diferir dependendo da língua. Por exemplo: 100kB versus 100 kB ou 50ºF versus 50 ºF.

## Conclusão {#conclusion}

A tradução do ethereum.org é uma ótima oportunidade para aprender sobre os diferentes aspectos do Ethereum.

Procure não ter pressa ao traduzir. Vá com calma e divirta-se!

Agradecemos sua participação no Programa de Tradução e sua ajuda para tornar o site acessível a um público maior. A comunidade Ethereum é global e estamos felizes por você fazer parte dela!
