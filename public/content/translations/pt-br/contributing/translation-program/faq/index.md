---
title: Guia de tradução do ethereum.org
metaTitle: Perguntas frequentes (FAQ) do Programa de Tradução
lang: pt-br
description: Perguntas frequentes sobre o Programa de Tradução do ethereum.org
---

Se você é novo no Programa de Tradução e está hesitando em começar, aqui estão algumas perguntas frequentes (FAQs) que podem ajudá-lo a iniciar. Use este guia para encontrar respostas para as dúvidas mais comuns.

## Posso ser remunerado por traduzir o ethereum.org? {#compensation}

O ethereum.org é um site de código aberto, o que significa que qualquer pessoa pode se envolver e contribuir.

O Programa de Tradução do ethereum.org é uma extensão disso e é organizado com uma filosofia semelhante em mente.

O objetivo do Programa de Tradução é tornar o conteúdo da Ethereum acessível a todos, independentemente dos idiomas que falam. Ele também permite que qualquer pessoa bilíngue se envolva com o ecossistema da Ethereum e contribua de forma acessível.

Por esse motivo, o Programa de Tradução é aberto e voluntário, e a participação não está sujeita a remuneração. Se fôssemos remunerar os tradutores pelo número de palavras que traduzem, só poderíamos convidar aqueles com experiência suficiente em tradução (tradutores profissionais) para participar do Programa de Tradução. Isso tornaria o Programa de Tradução excludente e nos impediria de alcançar os objetivos traçados, especificamente: permitir que todos participem e se envolvam com o ecossistema.

Fazemos todos os esforços para permitir que nossos colaboradores tenham sucesso no ecossistema da Ethereum; muitos incentivos não monetários estão em vigor, como: [oferecer POAPs](/contributing/translation-program/acknowledgements/#poap) e um [certificado de tradutor](/contributing/translation-program/acknowledgements/#certificate), além de organizar as [Tabelas de Classificação de Tradução](/contributing/translation-program/acknowledgements/) e [listar todos os nossos tradutores no site](/contributing/translation-program/contributors/).

## Como traduzo strings com `<HTML tags>`? {#tags}

Nem toda string é escrita em formato de texto puro. Existem algumas strings que consistem em scripts mistos, como tags HTML (`<0>`, `</0>`). Isso geralmente é para hiperlinks ou estilos alternativos no meio de uma frase.

- Traduza o texto dentro das tags, mas não as próprias tags. Qualquer coisa em `<` e `>` não deve ser traduzida ou removida.
- Para manter a string segura, recomendamos que você clique no botão "Copy Source" (Copiar Fonte) no canto inferior esquerdo. Isso copiará a string original e a colará na caixa de texto. Isso permite que você esclareça onde as tags estão e ajuda a evitar erros.

![Crowdin interface with copy source button highlighted](./html-tag-strings.png)

Você pode mover a posição das tags dentro da string para torná-la mais natural no seu idioma – apenas certifique-se de mover a tag inteira.

Para obter informações mais detalhadas sobre como lidar com tags e trechos de código, consulte o [Guia de Estilo de Tradução do ethereum.org](/contributing/translation-program/translators-guide/#dealing-with-tags).

## Onde as strings ficam? {#strings}

Muitas vezes, apenas as strings de origem podem não ser suficientes para você fornecer uma tradução precisa.

- Dê uma olhada em "screenshots" (capturas de tela) e "context" (contexto) para obter mais informações. Na seção da string de origem, você verá a imagem da captura de tela anexada, que mostrará como estamos usando a string no contexto.
- Se você ainda não tiver certeza, sinalize na "seção de comentários". [Não sabe como deixar um comentário?](#comment)

![Showing how context can be provided for a string with a screenshot](./source-string.png)

![An example screenshot added for context](./source-string-2.png)

## Como posso deixar comentários ou fazer perguntas? Gostaria de sinalizar um problema ou erros de digitação... {#comment}

Se você quiser sinalizar uma string específica que precisa de atenção, sinta-se à vontade para enviar um comentário.

- Clique no segundo botão da barra superior direita. A guia oculta aparecerá à sua direita. Deixe um novo comentário e marque a caixa de seleção "Issue" (Problema) na parte inferior. Você pode especificar o tipo de problema escolhendo uma das opções no menu suspenso.
- Uma vez enviado, ele será relatado à nossa equipe. Corrigiremos o problema e avisaremos você respondendo ao seu comentário e fechando o problema.
- Se você relatar uma tradução incorreta, a tradução e a alternativa sugerida serão revisadas por um falante nativo durante a próxima revisão.

![Showing how to make comments and issues](./comment-issue.png)

## O que é Memória de Tradução (TM)? {#translation-memory}

A Memória de Tradução (TM) é um recurso do Crowdin que armazena todas as strings traduzidas anteriormente em todo o ethereum.org. Quando uma string é traduzida, ela é salva automaticamente na TM do nosso projeto. Esta pode ser uma ferramenta útil para ajudar você a economizar seu tempo!

- Observe a seção "TM and MT Suggestions" (Sugestões de TM e MT) e você verá como outros tradutores traduziram a mesma string ou uma semelhante. Se você encontrar uma sugestão com uma alta taxa de correspondência, sinta-se à vontade para consultar a tradução clicando nela.
- Se não houver nada na lista, você pode pesquisar na TM por traduções feitas anteriormente e reutilizá-las para manter a consistência.

![A screenshot of the translation memory](./translation-memory.png)

## Como uso o glossário do Crowdin? {#glossary}

A terminologia da Ethereum é outra parte crucial do nosso trabalho de tradução, pois muitas vezes novos termos técnicos ainda não estarão localizados em muitos idiomas. Além disso, existem termos que têm significados diferentes em contextos diferentes. [Mais sobre a tradução da terminologia da Ethereum](#terminology)

O glossário do Crowdin é o melhor lugar para esclarecimento de termos e definições. Existem duas maneiras de consultar o glossário.

- Primeiro, quando você encontrar um termo sublinhado na string de origem, você pode passar o mouse sobre ele e ver uma breve definição.

![An example glossary definition](./glossary-definition.png)

- Segundo, se você vir um termo que não lhe é familiar, mas não está sublinhado, você pode pesquisar na guia do glossário (o terceiro botão da coluna da direita). Você encontrará explicações de termos específicos e daqueles frequentemente usados no projeto.

![A screenshot showing where to find the glossary tab in Crowdin](./glossary-tab.png)

- Se você ainda não conseguir encontrá-lo, é a sua chance de adicionar um novo termo! Incentivamos você a procurá-lo em um mecanismo de busca e adicionar a descrição ao glossário. Será de grande ajuda para outros tradutores entenderem melhor o termo.

![A screenshot showing how to add a glossary term to Crowdin](./add-glossary-term.png)

### Política de tradução de terminologia {#terminology}

_Para nomes (marcas, empresas, pessoas) e novos termos técnicos (Beacon Chain, cadeias de fragmentos, etc.)_

A Ethereum apresenta muitos termos novos que foram cunhados recentemente. Alguns termos variam de tradutor para tradutor, pois não há tradução oficial em seus respectivos idiomas. Tais inconsistências podem causar mal-entendidos e diminuir a legibilidade.

Devido à diversidade linguística e às diferentes padronizações em cada idioma, tem sido quase impossível criar uma política unificada de tradução de terminologia que possa ser adaptada em todos os idiomas suportados.

Após cuidadosa consideração, chegamos à decisão de deixar a terminologia mais frequentemente usada a critério de vocês, os tradutores.

Aqui está o que sugerimos, quando você encontrar um termo que não lhe é familiar:

- Consulte o [Glossário de termos](#glossary), você pode descobrir como outros tradutores o traduziram anteriormente. Se você achar que o termo traduzido anteriormente não é apropriado, sinta-se à vontade para restaurar sua tradução adicionando um novo termo ao Glossário do Crowdin.
- Se essa tradução anterior não existir no Glossário, incentivamos você a procurá-la em um mecanismo de busca ou artigo de mídia que mostre como o termo é realmente usado em sua comunidade.
- Se você não encontrar nenhuma referência, sinta-se à vontade para confiar em sua intuição e sugerir uma nova tradução para o seu idioma!
- Se você se sentir menos confiante para fazer isso, deixe o termo sem tradução. Às vezes, os termos em inglês são mais do que adequados para fornecer definições precisas.

Recomendamos que você deixe nomes de marcas, empresas e pessoas sem tradução, pois uma tradução pode causar confusão desnecessária e dificuldades de SEO.

## Como funciona o processo de revisão? {#review-process}

Para garantir um certo nível de qualidade e consistência em nossas traduções, trabalhamos com a [Acolad](https://www.acolad.com/), uma das maiores provedoras de serviços linguísticos do mundo. A Acolad tem 20.000 linguistas profissionais, o que significa que eles podem fornecer revisores profissionais para cada idioma e tipo de conteúdo que precisamos.

O processo de revisão é direto; uma vez que um conjunto de conteúdo é 100% traduzido, solicitamos uma revisão para esse lote de conteúdo. O processo de revisão ocorre diretamente no Crowdin. Assim que a revisão for concluída, atualizamos o site com o conteúdo traduzido.

## Como adiciono conteúdo no meu idioma? {#adding-foreign-language-content}

Atualmente, todo o conteúdo que não está em inglês é traduzido diretamente do conteúdo de origem em inglês, e qualquer conteúdo que não exista em inglês não pode ser adicionado a outros idiomas.

Para sugerir um novo conteúdo para o ethereum.org, você pode [criar uma issue](https://github.com/ethereum/ethereum-org-website/issues) no GitHub. Se adicionado, o conteúdo será escrito em inglês e traduzido para outros idiomas usando o Crowdin.

Planejamos adicionar suporte para adições de conteúdo em outros idiomas em um futuro próximo.

## Entre em contato {#contact}

Obrigado por ler tudo isso. Esperamos que isso ajude você a ingressar em nosso programa. Sinta-se à vontade para participar do nosso [canal de tradução no Discord](https://discord.gg/ethereum-org) para fazer perguntas e colaborar com outros tradutores, ou entre em contato conosco pelo e-mail translations@ethereum.org!