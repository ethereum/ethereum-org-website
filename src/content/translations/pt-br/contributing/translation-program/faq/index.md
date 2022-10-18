---
title: Perguntas frequentes sobre o Programa de tradução
lang: pt-br
description: Perguntas frequentes sobre o Programa de tradução da ethereum.org
---

# Traduzindo o guia ethereum.org {#translating-ethereum-guide}

Se você é novo no Programa de tradução e está hesitante em participar, aqui estão algumas perguntas frequentes que podem ajudá-lo a começar. Use este guia para encontrar respostas para as consultas mais comuns.

## Como traduzo strings com `<HTML tags>`? {#tags}

Nem toda string (cadeia de caracteres) é escrita na forma de texto puro. Há algumas strings que consistem em scripts mistos, por exemplo as tags HTML (`<0>`, `</0>`). Isto é geralmente usado para hiperlinks ou estilos alternativos no meio de uma frase.

- Traduza o texto dentro das tags, mas não as tags em si. Nada entre `<` e `>` deve ser traduzido nem removido.
- Para manter a string íntegra recomendamos que você clique no botão "Copiar origem" no canto inferior esquerdo. Isso vai copiar a string original e colá-la na caixa de texto. Isto permite que você ponha em evidência onde estão as tags e ajude a evitar erros.

![Interface Crowdin com botão "copiar origem" destacado](./html-tag-strings.png)

Você pode mover a posição das tags dentro da string para torná-la mais natural em seu idioma – apenas se certifique de mover a tag inteira.

## Onde achar as strings? {#strings}

Geralmente, as strings de origem podem não ser suficientes para que você forneça uma tradução exata.

- Dê uma olhada em "capturas de tela" e "contexto" para obter mais informações. Na seção da string de origem, você verá a imagem de captura de tela anexada que mostrará como estamos usando a sequência de caracteres no contexto.
- Se você ainda não tiver certeza, coloque uma observação na "seção de comentários". [Em dúvida sobre como deixar um comentário?](#comment)

![Exibindo como o contexto pode ser fornecido para uma string com uma captura de tela](./source-string.png)

![Um exemplo de captura de tela adicionada para o contexto](./source-string-2.png)

## Como posso deixar comentários ou fazer perguntas? Gostaria de relatar um problema ou erro de digitação... {#comment}

Se você quiser reportar um erro em uma determinada string que precisa ser revista, sinta-se livre para enviar um comentário.

- Clique no segundo botão da barra superior direita. A aba oculta aparecerá à sua direita. Deixe um novo comentário e clique na caixa de seleção "Problema" na parte inferior. Você pode especificar o tipo de problema, escolhendo uma das opções do menu suspenso.
- Uma vez enviado, será reportado à nossa equipe. Vamos corrigir o problema e informar você respondendo ao seu comentário e encerrando a requisição.
- Se você informar uma tradução incorreta, sua tradução e sugestão serão revisadas por um nativo na próxima revisão.

![Exibindo como fazer comentários e relatar problemas](./comment-issue.png)

## O que é Memória de Tradução (MT)? {#translation-memory}

Memória de Tradução (MT) é uma funcionalidade do Crowdin que armazena todas as frases traduzidas anteriormente em [ethereum.org](http://ethereum.org/). Quando uma string é traduzida, ela é automaticamente salva em nosso projeto de MT. Esta pode ser uma ferramenta útil para você economizar seu tempo!

- Veja na seção "Sugestões de MT " como outros tradutores traduziram a mesma string, ou similar. Se você encontrar uma sugestão com uma alta correspondência, sinta-se livre para se referir à tradução clicando nela.
- Se não houver nada na lista, você poderá procurar na MT traduções feitas anteriormente e reutilizá-las para consistência.

![Uma captura de tela da memória de tradução](./translation-memory.png)

## Como posso usar o glossário do Crowdin? {#glossary}

A terminologia Ethereum é outra parte crucial do nosso trabalho de tradução, uma vez que os novos termos tecnológicos ainda não terão sido localizados em muitos idiomas. Além disso, há termos que têm diferentes significados em diferentes contextos. [Mais sobre a tradução da terminologia Ethereum](#terminology)

O glossário do Crowdin é o melhor lugar para esclarecer termos e definições. Há duas maneiras de se consultar o glossário.

- Primeiro, quando você encontrar um termo sublinhado na string de origem, você pode passar o mouse por cima e ver uma breve definição dela.

![Um exemplo de definição de glossário](./glossary-definition.png)

- Segundo, se você ver um termo não familiar que não está sublinhado, você pode procurar na guia do glossário (o terceiro botão da coluna da direita). Você encontrará explicações de termos específicos e outros frequentemente utilizados no projeto.

![Uma captura de tela mostrando onde encontrar a guia do glossário no Crowdin](./glossary-tab.png)

- Se ainda não conseguiu encontrá-lo, é sua chance de adicionar um novo termo! Nós encorajamos você a procurar em um mecanismo de busca e adicionar a descrição ao glossário. Será de grande ajuda para outros tradutores compreender melhor o termo.

![Uma captura de tela mostrando como adicionar um termo do glossário ao Crowdin](./add-glossary-term.png)

### Política de tradução de terminologias {#terminology}

_Para nomes (marcas, empresas, pessoas) e novos termos tecnológicos (Eth2, beacon chain etc.)_

O Ethereum apresenta muitos novos termos que foram criados recentemente. Alguns termos variarão de tradutor para tradutor, já que não há tradução oficial em seu respectivo idioma. Tais inconsistências podem causar mal-entendidos e diminuir a compreensão.

Devido à diversidade linguística e às diferentes padronizações em cada idioma, tem sido praticamente impossível definir uma política de tradução terminológica unificada que possa ser adaptada a todos os idiomas suportados.

Após cuidadosa reflexão, tomamos a decisão de deixar para os tradutores a escolha da terminologia mais usada.

Aqui está o que sugerimos, quando você encontrar um termo que não é familiar a você:

- Consulte o [Glossário de termos](#glossary), onde você pode ver como outros tradutores o traduziram anteriormente. Se você acha que o termo previamente traduzido não é apropriado, reverta a tradução adicionando um novo termo ao glossário do Crowdin.
- Se tal tradução anterior não existir no Glossário, o encorajamos a procurá-lo em um mecanismo de busca ou artigo de mídia que mostre como o termo é realmente utilizado na sua comunidade.
- Se você não encontrar nenhuma referência, sugira uma nova tradução para o seu idioma!
- Se você se sentir menos confiante para fazê-lo, deixe o termo não traduzido. Às vezes, os termos em inglês são mais do que adequados para fornecer definições precisas.

Recomendamos que deixe nomes de marcas, empresas e pessoas sem tradução visto que uma tradução pode causar confusão desnecessária e dificuldades no SEO.

## Como eu faço para adicionar conteúdo no meu idioma? {#adding-foreign-language-content}

Atualmente, todo o conteúdo que não está na língua inglesa é traduzido diretamente do conteúdo em inglês, e qualquer conteúdo que não esteja neste idioma não pode ser adicionado a outros idiomas.

Para sugerir um novo conteúdo para ethereum.org, é possível [registrar uma contribuição](https://github.com/ethereum/ethereum-org-website/issues) no GitHub. Se adicionado, o conteúdo será escrito em inglês e traduzido para outros idiomas usando o Crowdin.

Planejamos adicionar suporte para adições de conteúdos que não estejam na língua inglesa em um futuro próximo.

## Envolva-se {#contact}

Agradecemos à leitura de todo o conteúdo. Esperamos que isso o incentive a participar em nosso programa. Sinta-se à vontade para se unir ao nosso [canal de tradução do Discord](https://discord.gg/XVepFu7sqR), para fazer perguntas e colaborar com outros tradutores!
