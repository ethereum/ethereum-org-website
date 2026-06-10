---
title: Como traduzir
lang: pt-br
description: Instruções para usar o Crowdin para traduzir o ethereum.org
---

## Guia visual {#visual-guide}

Para quem aprende melhor visualmente, assista ao Luka mostrar como se configurar no Crowdin. Como alternativa, você pode encontrar as mesmas etapas em formato escrito na próxima seção.

<VideoWatch slug="crowdin-translation-guide" />

## Guia escrito {#written-guide}

### Junte-se ao nosso projeto no Crowdin {#join-project}

Você precisará fazer login na sua conta do Crowdin ou se inscrever se ainda não tiver uma. Tudo o que é necessário para se inscrever é uma conta de e-mail e uma senha.

<ButtonLink href="https://crowdin.com/project/ethereum-org/">
  Participar do projeto
</ButtonLink>

### Abra o seu idioma {#open-language}

Após fazer login no Crowdin, você verá uma descrição do projeto e uma lista de todos os idiomas disponíveis.
Cada idioma também contém informações sobre a quantidade total de palavras traduzíveis e uma visão geral de quanto conteúdo foi traduzido e aprovado em um idioma específico.

Abra o idioma para o qual deseja traduzir para ver a lista de arquivos disponíveis para tradução.

![List of languages in Crowdin](./list-of-languages.png)

### Encontre um documento para trabalhar {#find-document}

O conteúdo do site é dividido em vários documentos e grupos de conteúdo (content buckets). Você pode verificar o progresso de cada documento à direita – se o progresso da tradução estiver abaixo de 100%, por favor, contribua!

Não vê o seu idioma listado? [Abra uma issue](https://github.com/ethereum/ethereum-org-website/issues/new/choose) ou pergunte no nosso [Discord](https://discord.gg/ethereum-org)

![Translated and untranslated files in Crowdin](./crowdin-files.png)

Uma observação sobre os grupos de conteúdo: usamos 'grupos de conteúdo' no Crowdin para que o conteúdo de maior prioridade seja lançado primeiro. Ao verificar um idioma, por exemplo, [Filipino](https://crowdin.com/project/ethereum-org/fil#), você verá pastas para o grupo de conteúdo ("1. Homepage", "2. Essentials", "3. Exploring", etc.).

Incentivamos você a traduzir nesta ordem numérica (1 → 2 → 3 → ⋯) para garantir que as páginas de maior impacto sejam traduzidas primeiro.

### Traduzir {#translate}

Após selecionar o arquivo que deseja traduzir, ele será aberto no editor online. Se você nunca usou o Crowdin antes, pode usar este guia rápido para repassar o básico.

![Crowdin online editor](./online-editor.png)

**_1 – Barra lateral esquerda_**

- Não traduzido (vermelho) – texto que ainda não foi trabalhado. Estas são as strings que você deve traduzir.
- Traduzido (verde) – texto que já foi traduzido, mas ainda não revisado. Você pode sugerir traduções alternativas ou votar nas existentes usando os botões "+" e "-" no editor.
- Aprovado (marca de seleção) – texto que já foi revisado e está atualmente ativo no site.

Você também pode usar os botões na parte superior para pesquisar strings específicas, filtrá-las por status ou alterar a visualização.

**_2 – Área do editor_**

A área principal de tradução – o texto de origem é exibido na parte superior, com contexto adicional e capturas de tela, se disponíveis.
Para sugerir uma nova tradução, insira sua tradução no campo "Enter translation here" (Insira a tradução aqui) e clique em Save (Salvar).

Você também pode encontrar traduções existentes da string e traduções para outros idiomas nesta seção, bem como correspondências de memória de tradução e sugestões de tradução automática.

**_3 – Barra lateral direita_**

É aqui que você pode encontrar comentários, entradas de memória de tradução e entradas de glossário. A visualização padrão mostra os comentários e permite que os tradutores se comuniquem, levantem problemas ou relatem traduções incorretas.

Usando os botões na parte superior, você também pode alternar para a Memória de Tradução (Translation Memory), onde pode pesquisar traduções existentes, ou para o Glossário (Glossary), que contém descrições e traduções padrão de termos-chave.

Quer aprender mais? Fique à vontade para conferir a [documentação sobre o uso do editor online do Crowdin](https://support.crowdin.com/online-editor/)

### Processo de revisão {#review-process}

Depois de concluir a tradução (ou seja, todos os arquivos de um grupo de conteúdo exibem 100%), nosso serviço de tradução profissional revisará (e possivelmente editará) o conteúdo. Assim que a revisão for concluída (ou seja, o progresso da revisão for de 100%), nós o adicionaremos ao site.

<Alert variant="update">
<AlertEmoji text=":warning:"/>
<AlertContent>
  Por favor, não use tradução automática para traduzir o projeto. Todas as traduções serão revisadas antes de serem adicionadas ao site. Se for descoberto que suas traduções sugeridas foram traduzidas automaticamente, elas serão descartadas e os colaboradores que usam tradução automática com frequência serão removidos do projeto.
</AlertContent>
</Alert>

### Entre em contato {#get-in-touch}

Você tem alguma dúvida? Ou quer colaborar com nossa equipe e outros tradutores? Por favor, poste no canal #translations do nosso [servidor do Discord do ethereum.org](https://discord.gg/ethereum-org)

Você também pode entrar em contato conosco pelo e-mail translations@ethereum.org

Obrigado pela sua participação no Programa de Tradução do ethereum.org!