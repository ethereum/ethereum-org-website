---
title: "Como construir aplicativos de privacidade no Ethereum com provas de conhecimento zero"
description: "Um padrão reutilizável impulsiona votações anônimas, mixers, airdrops e sistemas de associação no Ethereum. Aprenda o ciclo compromisso-anulador-prova e como as ferramentas de conhecimento zero tornam sua construção prática hoje."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "provas de conhecimento zero"
  - "privacidade"
published: 2026-05-12
image: /images/developers/blog/latest-post-header-2.png
breadcrumb: Aplicativos de privacidade no Ethereum
lang: pt-br
---

O Ethereum é radicalmente público por design. Cada endereço, saldo, transação, chamada de contrato e evento é visível para qualquer pessoa com um explorador de blocos. Essa transparência é útil quando você deseja verificabilidade. É um problema quando os usuários precisam votar, reivindicar, fazer saques ou provar associação sem vincular cada ação de volta à mesma carteira.

A associação anônima é o padrão reutilizável que impulsiona uma grande classe de aplicativos de privacidade no Ethereum. As pessoas se registram primeiro e, mais tarde, provam que pertencem ao grupo sem revelar qual membro elas são. Uma prova de conhecimento zero é a ponte entre a carteira de registro e a carteira de atuação, e a ponte não revela quem a atravessou.

O produto ao redor muda, mas o esqueleto de privacidade permanece o mesmo.

## O padrão, explicado através da votação anônima {#the-pattern-explained-through-anonymous-voting}

O padrão tem três partes. Um compromisso registra cada membro. Uma árvore de Merkle transforma esses compromissos em uma multidão. Uma prova e um anulador (nullifier) permitem que um membro atue uma vez sem revelar qual membro atuou.

### Passo um: registrando {#step-one-registering}

Cada eleitor cria dois valores privados offchain, o segredo e o anulador. O eleitor faz o hash desses valores em um compromisso público e, em seguida, registra esse compromisso onchain.

O compromisso é o registro público. O segredo e o anulador são a nota privada que o eleitor precisará mais tarde. Perca a nota e o eleitor não poderá provar a associação. Vaze-a e outra pessoa poderá votar no lugar do usuário.

Como o compromisso é um hash, os observadores não podem recuperar os valores privados dentro dele. O compromisso diz "alguém se registrou" sem revelar quem usará esse registro mais tarde.

### Passo dois: construindo a multidão {#step-two-building-the-crowd}

À medida que mais eleitores se registram, o aplicativo coleta seus compromissos em uma árvore de Merkle. Uma árvore de Merkle comprime uma longa lista de valores em um único hash, chamado de raiz. Altere qualquer valor na lista e o hash muda, de modo que a raiz atua como um resumo à prova de adulteração de todo o conjunto.

Essa árvore é o seu conjunto de anonimato. Se dez usuários estiverem na árvore, um observador pode restringir uma ação posterior a um desses dez. Se dez mil usuários estiverem na árvore, a ação é muito mais difícil de vincular a uma pessoa. Um aplicativo privado com um conjunto de anonimato minúsculo geralmente não é muito privado, mesmo que a criptografia esteja correta.

### Passo três: atuando anonimamente {#step-three-acting-anonymously}

Quando a votação abre, o eleitor não deve votar a partir da mesma carteira que registrou o compromisso. Votar a partir da carteira de registro vincularia o voto diretamente ao registrante e desfaria o trabalho de privacidade. Em vez disso, o eleitor cria uma prova de conhecimento zero. A declaração é codificada como um circuito que diz: "Eu conheço valores privados que produzem um compromisso registrado e estou revelando o hash do anulador correto para esta votação."

A prova convence o contrato verificador de que a declaração é verdadeira. Ela não revela o segredo, o anulador ou qual compromisso foi usado.

O anulador é o que impede a votação dupla. Junto com a prova, o eleitor publica um hash do anulador. O contrato de votação armazena esse hash após aceitar o voto. Se a mesma nota privada for usada novamente para a mesma votação, ela produzirá o mesmo hash do anulador, e o contrato rejeitará o segundo voto. Combinado com a prova, isso deixa o contrato sabendo apenas que algum eleitor registrado atuou uma vez, não qual deles.

## O portão reutilizável {#the-reusable-gate}

Esse mesmo par de prova e anulador funciona além da votação. Remova a história da votação e o que você tem é um portão de privacidade para funções de contrato inteligente.

Antes que a função seja executada, o contrato verifica a raiz de Merkle, verifica a prova, confirma que o hash do anulador não foi usado e vincula as entradas públicas ao aplicativo, cadeia, votação, reivindicação ou saque corretos. Se essas verificações passarem, ele marca o anulador como usado e executa o restante da função.

Coloque esse portão na frente de um voto e você terá uma votação anônima. Coloque-o na frente de uma reivindicação de airdrop e você terá reivindicações anônimas. Coloque-o na frente de uma função de saque e você terá o núcleo de um fluxo de saque no estilo mixer. Mesma árvore de compromisso, mesma ideia de anulador, mesmo padrão de prova. O que muda é o corpo da função e a lógica do aplicativo ao redor.

## O que roda onde {#what-runs-where}

O trabalho privado geralmente acontece offchain. O usuário armazena a nota, e um aplicativo cliente constrói a testemunha e executa o provador para produzir a prova. Um indexador rastreia compromissos e raízes de Merkle. Um empacotador propaga a operação de usuário (UserOperation) onchain e um pagador ERC-4337 patrocina o gás, para que uma carteira nova não precise de ETH de uma carteira conhecida do usuário primeiro.

A aplicação pública acontece onchain. O contrato verificador verifica a prova. O contrato do aplicativo verifica raízes válidas e anuladores não usados, armazena o hash do anulador e executa a ação pública.

A experiência do usuário (UX) sensível é o manuseio de notas. Trate o segredo e o anulador como chaves. Não os coloque em análises, logs, URLs, relatórios de erros ou telemetria normal do lado do servidor. Uma vez que a nota vaza, a privacidade se perde, não importa quão forte seja a prova.

## As ferramentas acompanharam {#the-tooling-caught-up}

Você não precisa codificar manualmente a criptografia subjacente. Um caminho comum é escrever o circuito em uma linguagem de conhecimento zero de alto nível, gerar um verificador Solidity e chamar esse verificador a partir do contrato do aplicativo.

A pilha de tecnologia certa depende do trabalho. Circom com snarkjs é um caminho estabelecido há muito tempo para circuitos em nível de aplicativo. Noir com Barretenberg é um caminho mais recente e amigável para desenvolvedores. Halo2 e gnark são bibliotecas de circuitos de nível mais baixo. zkVMs como RISC Zero ou SP1 provam programas normais, mas podem ser mais caros para provar do que um pequeno circuito personalizado.

Para associação anônima, busque um protocolo existente antes de escrever seu próprio circuito. O Semaphore empacota a associação de grupo e a prevenção de uso duplo baseada em anulador em contratos e bibliotecas JavaScript. Para votação privada e governança, o MACI é o caminho especializado porque adiciona propriedades anticolusão. Protocolos maduros costumam ser mais seguros do que novos circuitos.

## A prova não é suficiente {#the-proof-is-not-enough}

Mesmo uma prova perfeita falha se o fluxo da carteira vazar o vínculo. Registre-se a partir da carteira A e, mais tarde, atue a partir da carteira A, e qualquer pessoa observando poderá conectar as transações. Financie a carteira B a partir da carteira A logo antes de atuar, e essa transação de financiamento criará o mesmo problema.

É por isso que empacotadores e pagadores são importantes. A carteira de atuação deve ser nova e não deve precisar receber ETH de uma carteira que o usuário está tentando separar da ação.

O mesmo problema existe offchain. Enviar transações de registro e ação a partir do mesmo endereço IP, provedor de RPC ou sessão pode enfraquecer a privacidade que o circuito fornece. Frontends podem vazar por meio de análises, armazenamento local e logs de suporte. Uma prova de conhecimento zero oculta os valores dentro da prova. Ela não oculta tudo ao redor da transação.

Entradas públicas são outro lugar onde os aplicativos de privacidade falham. Qualquer coisa marcada como pública no circuito, emitida como um evento, incluída em dados de chamada (calldata) ou armazenada pelo contrato é visível. Revise as entradas públicas com o mesmo cuidado que o controle de acesso em um contrato Solidity.

## O que isso muda para os construtores {#what-this-changes-for-builders}

A privacidade no Ethereum é viável para lançamento. Os construtores podem compor as peças em aplicativos reais. A pilha de tecnologia é um circuito para a declaração privada, um verificador para checagem de provas, um contrato de aplicativo para regras públicas, um indexador para dados de Merkle e um empacotador mais um pagador para envio não vinculável e patrocínio de gás.

As partes difíceis são o design do produto, o gerenciamento de chaves, a higiene de metadados, as auditorias e o crescimento do conjunto de anonimato. Erre em qualquer um deles e a privacidade que a prova proporcionou desaparecerá.

## Leitura adicional {#further-reading}

1. [Provas de conhecimento zero (ethereum.org)](https://ethereum.org/zero-knowledge-proofs/)
2. [Documentação do Semaphore](https://docs.semaphore.pse.dev/)
3. [Documentação do MACI](https://maci.pse.dev/)
4. [Documentação do Circom](https://docs.circom.io/)
5. [Documentação do Noir](https://noir-lang.org/)
6. [Livro do Halo2](https://zcash.github.io/halo2/)
7. [Documentação do gnark](https://docs.gnark.consensys.io/)
8. [Documentação do RISC Zero](https://dev.risczero.com/api/)
9. [Documentação do SP1](https://docs.succinct.xyz/docs/sp1/introduction)
10. [EIP-4337: Abstração de conta via contrato EntryPoint](https://eips.ethereum.org/EIPS/eip-4337)