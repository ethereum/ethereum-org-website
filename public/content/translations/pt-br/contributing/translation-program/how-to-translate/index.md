---
title: Como traduzir
lang: pt-br
description: Instruções de uso do Crowdin para traduzir o ethereum.org
---

# Como traduzir {#how-to-translate}

## Guia visual {#visual-guide}

Para as pessoas que aprendem melhor de forma visual, assistam ao vídeo do Luka sobre as configurações do Crowdin. Como alternativa, você pode encontrar as mesmas etapas por escrito na próxima seção.

<YouTube id="Ii7bYhanLs4" />

## Guia escrito {#written-guide}

### Junte-se ao nosso projeto no Crowdin {#join-project}

Você precisará fazer login na sua conta do Crowdin ou criar uma conta, caso ainda não tenha. Você só precisa de uma conta de e-mail e senha para se cadastrar.

<ButtonLink href="https://crowdin.com/project/ethereum-org/">
  Junte-se ao projeto
</ButtonLink>

### Selecione seu idioma {#open-language}

Depois de fazer login no Crowdin, você verá uma descrição do projeto e uma lista de todos os idiomas disponíveis. Cada idioma também contém informações sobre a quantidade total de palavras traduzíveis e uma visão geral de quanto conteúdo foi traduzido e aprovado em um idioma específico.

Escolha o idioma para o qual deseja traduzir para ver a lista de arquivos disponíveis para tradução.

![Lista de idiomas no Crowdin](./list-of-languages.png)

### Encontre um documento para trabalhar {#find-document}

O conteúdo do site é dividido em vários documentos e grupos de conteúdo. Você pode verificar o progresso de cada documento à direita. Se o progresso da tradução estiver abaixo de 100%, contribua!

Não vê seu idioma na lista? [Abra um tíquete](https://github.com/ethereum/ethereum-org-website/issues/new/choose) ou faça uma pergunta no [Discord](/discord/)

![Arquivos traduzidos e não traduzidos no Crowdin](./crowdin-files.png)

Uma nota sobre recipientes de conteúdo: utilizamos “recipientes de conteúdos” dentro do Crowdin para ter o conteúdo de prioridade mais alta lançado primeiro. Ao verificar um idioma, por exemplo, [Filipino](https://crowdin.com/project/ethereum-org/fil#) você verá pastas por categoria de conteúdo (“1. Página inicial", "2. Essenciais", "3. Explorando”, etc.).

Recomendamos que você traduza nesta ordem numérica (1 → 2 → 3 → ⋯) para assegurar que as páginas de maior impacto sejam traduzidas primeiro.

[Saiba mais sobre os recipientes de conteúdo do ethereum.org](/contributing/translation-program/content-buckets/)

### Traduzir {#translate}

Após selecionar o arquivo que você deseja traduzir, ele será aberto no editor online. Se você nunca usou o Crowdin antes, você pode usar este guia rápido para conferir as noções básicas.

![Editor online do Crowdin](./online-editor.png)

**_1 – Barra lateral esquerda_**

- Não traduzido (vermelho) — texto que ainda não foi trabalhado. Esses são os segmentos que você deve traduzir.
- Traduzido (verde) — texto que já foi traduzido, mas ainda não revisado. Você pode sugerir traduções alternativas, ou votar nas já existentes usando os botões “+” e “-” no editor.
- Aprovado (marca de seleção) — texto que já foi revisado e está publicado no site.

Você também pode usar os botões no topo para pesquisar segmentos específicos, filtrá-los por status ou alterar o modo de exibição.

**_2 – Área do editor_**

A área de tradução principal — o texto de origem é exibido no topo, com contexto adicional e capturas de tela, se disponíveis. Para sugerir uma nova tradução, insira sua sugestão no campo “Insira sua tradução aqui” e clique em Salvar.

Você também pode encontrar traduções existentes do texto e traduções para outros idiomas nesta seção, além das correspondências de memória de tradução e sugestões de tradução automática.

**_3 – Barra lateral direita_**

Aqui você pode encontrar comentários, assim como entradas da memória de tradução e do glossário. A visualização padrão mostra os comentários e permite aos tradutores se comunicarem, registrar problemas ou relatar traduções incorretas.

Usando os botões na parte superior, você também pode alternar para a memória de tradução, na qual você pode procurar traduções existentes, ou para o Glossário, que contém descrições e traduções padrão de termos-chave.

Quer saber mais? Confira a [documentação sobre como usar o editor online do Crowdin](https://support.crowdin.com/online-editor/)

### Processo de revisão {#review-process}

Quando tiver concluído a tradução (ou seja, todos os arquivos de um grupo de conteúdo que exibem 100%), nosso serviço de tradução profissional revisará (e possivelmente editará) o conteúdo. Assim que a revisão estiver completa (ou seja, o progresso de revisão atingir 100%), o adicionaremos ao site.

<InfoBanner shouldCenter emoji=":warning:">
  Não utilize tradução automatizada para traduzir o projeto. Todas as traduções serão revisadas antes de serem adicionadas ao site. Caso suas sugestões de tradução sejam traduções automatizadas, elas serão desconsideradas e colaboradores que usam tradução automatizada serão periodicamente removidos do projeto.
</InfoBanner>

### Entre em contato conosco {#get-in-touch}

Você tem alguma dúvida? Ou quer colaborar com nossa equipe e outros tradutores? Publique no canal #translations do nosso [servidor Discord no ethereum.org](/discord/)

Você também pode entrar em contato conosco por meio do e-mail translations@ethereum.org

Agradecemos sua participação no Programa de Tradução do ethereum.org!
