---
title: "IPFS para interfaces de usuário descentralizadas"
description: "Este tutorial ensina o leitor a usar o IPFS para armazenar a interface do usuário para um dapp. Embora os dados e a lógica de negócios do aplicativo sejam descentralizados, sem uma interface de usuário resistente à censura, os usuários podem perder o acesso a ele de qualquer maneira."
author: |
  Ori Pomerantz
tags: [ "ipfs" ]
skill: beginner
lang: pt-br
published: 2024-06-29
---

Você escreveu um novo dapp incrível. Você até escreveu uma [interface de usuário](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) para ele. Mas agora você tem medo de que alguém tente censurá-lo, derrubando sua interface de usuário, que é apenas um servidor na nuvem. Neste tutorial, você aprende a evitar a censura colocando sua interface de usuário no **[sistema de arquivos interplanetário (IPFS)](https://ipfs.tech/developers/)** para que qualquer pessoa interessada possa fixá-lo em um servidor para acesso futuro.

Você pode usar um serviço de terceiros, como o [Fleek](https://resources.fleek.xyz/docs/), para fazer todo o trabalho. Este tutorial é para pessoas que querem fazer o suficiente para entender o que estão fazendo, mesmo que dê mais trabalho.

## Começando localmente {#getting-started-locally}

Existem vários [provedores IPFS de terceiros](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service), mas é melhor começar executando o IPFS localmente para testes.

1. Instale a [interface de usuário do IPFS](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions).

2. Crie um diretório com seu site. Se você estiver usando o [Vite](https://vite.dev/), use este comando:

   ```sh
   pnpm vite build
   ```

3. No IPFS Desktop, clique em **Importar > Pasta** e selecione o diretório que você criou na etapa anterior.

4. Selecione a pasta que você acabou de carregar e clique em **Renomear**. Dê a ele um nome mais significativo.

5. Selecione-o novamente e clique em **Compartilhar link**. Copie a URL para a área de transferência. O link será semelhante a `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`.

6. Clique em **Status**. Expanda a guia **Avançado** para ver o endereço do gateway. Por exemplo, no meu sistema, o endereço é `http://127.0.0.1:8080`.

7. Combine o caminho da etapa do link com o endereço do gateway para encontrar seu endereço. Por exemplo, para o exemplo acima, a URL é `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`. Abra essa URL em um navegador para ver seu site.

## Fazendo upload {#uploading}

Então agora você pode usar o IPFS para servir arquivos localmente, o que não é muito emocionante. O próximo passo é torná-los disponíveis para o mundo quando você estiver offline.

Existem vários [serviços de fixação](https://docs.ipfs.tech/concepts/persistence/#pinning-services) bem conhecidos. Escolha um deles. Qualquer que seja o serviço que você usar, você precisa criar uma conta e fornecer a ela o **identificador de conteúdo (CID)** no seu IPFS desktop.

Pessoalmente, achei o [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides) o mais fácil de usar. Aqui estão as instruções para isso:

1. Navegue até [o painel](https://dashboard.4everland.org/overview) e faça login com sua carteira.

2. Na barra lateral esquerda, clique em **Armazenamento > 4EVER Pin**.

3. Clique em **Carregar > CID Selecionado**. Dê um nome ao seu conteúdo e forneça o CID do IPFS desktop. Atualmente, um CID é uma string que começa com `Qm` seguida por 44 letras e dígitos que representam um hash [codificado em base-58](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524), como `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`, mas [isso provavelmente mudará](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1).

4. O status inicial é **Na fila**. Recarregue até que mude para **Fixado**.

5. Clique no seu CID para obter o link. Você pode ver meu aplicativo [aqui](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im.ipfs.dweb.link/).

6. Você pode precisar ativar sua conta para mantê-lo fixado por mais de um mês. A ativação da conta custa cerca de US$ 1. Se você fechou, saia e faça login novamente para ser solicitado a ativar novamente.

## Usando do IPFS {#using-from-ipfs}

Neste ponto, você tem um link para um gateway centralizado que serve seu conteúdo IPFS. Em resumo, sua interface de usuário pode ser um pouco mais segura, mas ainda não é resistente à censura. Para uma real resistência à censura, os usuários precisam usar o IPFS [diretamente de um navegador](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites).

Depois de instalá-lo (e com o IPFS desktop funcionando), você pode ir para [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im) em qualquer site e obterá esse conteúdo, servido de maneira descentralizada.

## Desvantagens {#drawbacks}

Você não pode excluir arquivos IPFS de forma confiável, então, enquanto estiver modificando sua interface de usuário, provavelmente é melhor deixá-la centralizada ou usar o [sistema de nomes interplanetário (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs), um sistema que fornece mutabilidade sobre o IPFS. Claro, qualquer coisa que seja mutável pode ser censurada, no caso do IPNS, pressionando a pessoa com a chave privada à qual corresponde.

Além disso, alguns pacotes têm problemas com o IPFS, então se o seu site for muito complicado, essa pode não ser uma boa solução. E, claro, qualquer coisa que dependa da integração do servidor não pode ser descentralizada apenas por ter o lado do cliente no IPFS.

## Conclusão {#conclusion}

Assim como o Ethereum permite que você descentralize o banco de dados e os aspectos da lógica de negócios do seu dapp, o IPFS permite que você descentralize a interface do usuário. Isso permite que você elimine mais um vetor de ataque contra o seu dapp.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).
