---
title: "Perguntas frequentes sobre o Programa de tradução"
lang: pt-br
description: "Perguntas frequentes sobre o Programa de tradução da ethereum.org"
---

# Guia de tradução do ethereum.org {#translating-ethereum-guide}

Se você é novo no Programa de tradução e está hesitante em participar, aqui estão algumas perguntas frequentes que podem ajudá-lo a começar. Use este guia para encontrar respostas para as consultas mais comuns.

## Posso ser compensado por traduzir o ethereum.org? {#compensation}

O Ethereum.org é um site de código aberto, o que significa que qualquer pessoa pode se envolver e contribuir com ele.

O Programa de Tradução do ethereum.org segue com esse objetivo e é organizado com base em uma filosofia semelhante.

O objetivo do Programa de Tradução é tornar o conteúdo do Ethereum acessível para todos, independentemente dos idiomas que eles falam. Ele também permite que qualquer pessoa bilíngue se envolva com o ecossistema do Ethereum e contribua com ele de forma acessível.

Por essa razão, o Programa de Tradução é aberto e voluntário, e a participação não está sujeita a compensações. Se fôssemos compensar os tradutores pelo número de palavras traduzidas, só poderíamos convidar aqueles com experiência de tradução suficiente (tradutores profissionais) para participar do Programa de Tradução. Isso tornaria o Programa de Tradução exclusivo e nos impediria de alcançar os objetivos delineados, especificamente, permitindo que todos participem e se envolvam com o ecossistema.

Fazemos todos os esforços para permitir que nossos contribuidores tenham sucesso no ecossistema Ethereum; muitos incentivos não monetários estão em vigor, como: [oferecer POAPs](/contributing/translation-program/acknowledgements/#poap) e um [certificado de tradutor](/contributing/translation-program/acknowledgements/#certificate), bem como organizar os [Placares de Líderes de Tradução](/contributing/translation-program/acknowledgements/) e [listar todos os nossos tradutores no site](/contributing/translation-program/contributors/).

## Como traduzo strings com `<tags HTML>`? {#tags}

Nem toda cadeia de caracteres é escrita na forma de texto puro. Existem algumas strings que consistem em scripts mistos, como tags HTML (`<0>`, `</0>`). Isso geralmente é para hyperlinks ou estilo alternativo no meio de uma frase.

- Traduza o texto dentro das tags, mas não as tags em si. Qualquer coisa entre `<` e `>` não deve ser traduzida ou removida.
- Para manter a string íntegra recomendamos que você clique no botão "Copiar origem" no canto inferior esquerdo. Isso vai copiar a string original e colá-la na caixa de texto. Isto permite que você ponha em evidência onde estão as tags e ajude a evitar erros.

![Interface do Crowdin com o botão de copiar origem destacado](./html-tag-strings.png)

Você pode mover a posição das tags dentro da cadeia de caracteres para torná-la mais natural em seu idioma — apenas se certifique de mover a tag inteira.

Para obter informações mais detalhadas sobre como lidar com tags e trechos de código, consulte o [Guia de Estilo de Tradução do ethereum.org](/contributing/translation-program/translators-guide/#dealing-with-tags).

## Onde encontrar as cadeias de caracteres? {#strings}

Geralmente, as cadeias de caracteres de origem podem não ser suficientes para que você forneça uma tradução exata.

- Dê uma olhada em "capturas de tela" e "contexto" para obter mais informações. Na seção da string de origem, você verá a imagem de captura de tela anexada que mostrará como estamos usando a sequência de caracteres no contexto.
- Se você ainda não tiver certeza, coloque uma observação na "seção de comentários". [Não sabe como deixar um comentário?](#comment)

![Mostrando como o contexto pode ser fornecido para uma string com uma captura de tela](./source-string.png)

![Um exemplo de captura de tela adicionada para contexto](./source-string-2.png)

## Como posso deixar comentários ou fazer perguntas? Gostaria de relatar um problema ou erro de digitação... {#comment}

Se você quiser reportar um erro em uma determinada cadeia de caracteres que precisa ser revista, não hesite em nos enviar um comentário.

- Clique no segundo botão da barra superior direita. A aba oculta aparecerá à sua direita. Deixe um novo comentário e clique na caixa de seleção "Problema" na parte inferior. Você pode especificar o tipo de problema, escolhendo uma das opções do menu suspenso.
- Uma vez enviado, será reportado à nossa equipe. Vamos corrigir o problema e informar você respondendo ao seu comentário e encerrando a requisição.
- Se você informar uma tradução incorreta, sua tradução e sugestão serão revisadas por um nativo na próxima revisão.

![Mostrando como fazer comentários e relatar problemas](./comment-issue.png)

## O que é Memória de Tradução (MT)? {#translation-memory}

Memória de Tradução (MT) é uma funcionalidade do Crowdin que armazena todas as frases traduzidas anteriormente no ethereum.org. Quando uma cadeia de caracteres é traduzida, ela é automaticamente salva em nosso projeto de MT. Ela pode ser uma ferramenta útil para você economizar tempo!

- Veja na seção "Sugestões de MT " como outros tradutores traduziram a mesma string, ou similar. Se você encontrar uma sugestão com uma alta correspondência, sinta-se livre para se referir à tradução clicando nela.
- Se não houver nada na lista, você poderá procurar na MT traduções feitas anteriormente e reutilizá-las para consistência.

![Uma captura de tela da memória de tradução](./translation-memory.png)

## Como posso usar o glossário do Crowdin? {#glossary}

A terminologia do Ethereum é outra parte crucial do nosso trabalho de tradução, uma vez que novos termos tecnológicos ainda não estão localizados em muitos idiomas. Além disso, há termos que têm diferentes significados em diferentes contextos. [Mais sobre a tradução da terminologia do Ethereum](#terminology)

O glossário do Crowdin é o melhor lugar para esclarecer termos e definições. Há duas maneiras de se consultar o glossário.

- Primeiro, quando você encontrar um termo sublinhado na string de origem, você pode passar o mouse por cima e ver uma breve definição dela.

![Uma definição de exemplo do glossário](./glossary-definition.png)

- Segundo, se você ver um termo não familiar que não está sublinhado, você pode procurar na guia do glossário (o terceiro botão da coluna da direita). Você encontrará explicações de termos específicos e outros frequentemente utilizados no projeto.

![Uma captura de tela mostrando onde encontrar a guia do glossário no Crowdin](./glossary-tab.png)

- Se ainda não conseguiu encontrá-lo, é sua chance de adicionar um novo termo! Nós encorajamos você a procurar em um mecanismo de busca e adicionar a descrição ao glossário. Será de grande ajuda para outros tradutores compreender melhor o termo.

![Uma captura de tela mostrando como adicionar um termo ao glossário do Crowdin](./add-glossary-term.png)

### Política de tradução de terminologia {#terminology}

_Para nomes (marcas, empresas, pessoas) e novos termos tecnológicos (Beacon Chain, cadeia de fragmentos, etc.)_

O Ethereum apresenta muitos termos novos que foram cunhados recentemente. Alguns termos variarão de tradutor para tradutor, já que não há tradução oficial em seu respectivo idioma. Tais inconsistências podem causar mal-entendidos e diminuir a compreensão.

Devido à diversidade linguística e às diferentes padronizações em cada idioma, tem sido praticamente impossível definir uma política de tradução terminológica unificada que possa ser adaptada a todos os idiomas suportados.

Após cuidadosa reflexão, tomamos a decisão de deixar para os tradutores a escolha da terminologia mais usada.

Quando você encontrar um termo que não é familiar para você, sugerimos o seguinte:

- Consulte o [Glossário de termos](#glossary), você poderá encontrar como outros tradutores o traduziram anteriormente. Se você acha que o termo previamente traduzido não é apropriado, reverta a tradução adicionando um novo termo ao glossário do Crowdin.
- Se tal tradução anterior não existir no Glossário, o encorajamos a procurá-lo em um mecanismo de busca ou artigo de mídia que mostre como o termo é realmente utilizado na sua comunidade.
- Se você não encontrar nenhuma referência, sugira uma nova tradução para o seu idioma!
- Se você se sentir menos confiante para fazê-lo, deixe o termo não traduzido. Às vezes, os termos em inglês são mais do que adequados para fornecer definições precisas.

Recomendamos que deixe nomes de marcas, empresas e pessoas sem tradução, visto que uma tradução pode causar confusão desnecessária e dificuldades no SEO.

## Como funciona o processo de revisão? {#review-process}

Para garantir um certo nível de qualidade e consistência em nossas traduções, trabalhamos com a [Acolad](https://www.acolad.com/), um dos maiores provedores de serviços linguísticos do mundo. A Acolad conta com 20.000 linguistas profissionais, o que significa que ela pode fornecer revisores profissionais para cada idioma e tipo de conteúdo de que precisamos.

O processo de revisão é simples; uma vez que um conjunto de conteúdo esteja 100% traduzido, solicitamos uma revisão para esse lote de conteúdo. O processo de revisão ocorre diretamente no Crowdin. Uma vez que a revisão é concluída, atualizamos o site com o conteúdo traduzido.

## Como faço para adicionar conteúdo no meu idioma? {#adding-foreign-language-content}

Atualmente, todo o conteúdo que não está na língua inglesa é traduzido diretamente do conteúdo em inglês, e qualquer conteúdo que não esteja nesse idioma não pode ser adicionado a outros idiomas.

Para sugerir novo conteúdo para o ethereum.org, você pode [criar um problema](https://github.com/ethereum/ethereum-org-website/issues) no GitHub. Se adicionado, o conteúdo será escrito em inglês e traduzido para outros idiomas usando o Crowdin.

Planejamos adicionar suporte para adições de conteúdos que não estejam em inglês em um futuro próximo.

## Entre em contato {#contact}

Agradecemos por ter lido todas estas informações. Esperamos que elas tenham incentivado você a participar de nosso programa. Sinta-se à vontade para entrar em nosso [canal de tradução do Discord](https://discord.gg/ethereum-org) para fazer perguntas e colaborar com outros tradutores, ou entre em contato conosco em translations@ethereum.org!
