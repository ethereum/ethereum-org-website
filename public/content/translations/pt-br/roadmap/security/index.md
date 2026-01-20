---
title: Um Ethereum mais seguro
description: O Ethereum é a plataforma de contrato inteligente mais segura e descentralizada que existe. Entretanto, ainda existem melhorias que podem ser feitas para que o Ethereum permaneça resiliente a qualquer nível de ataque no futuro.
lang: pt-br
image: /images/roadmap/roadmap-security.png
alt: "Planejamento Ethereum"
template: roadmap
---

**O Ethereum já é uma plataforma de [smart-contract](/glossary/#smart-contract) muito segura** e descentralizada. Entretanto, ainda há melhorias que podem ser feitas para que o Ethereum permaneça resiliente a todos os tipos de ataque no futuro. Isso inclui alterações sutis na maneira como os [clientes Ethereum](/glossary/#consensus-client) lidam com [blocos](/glossary/#block) concorrentes, bem como o aumento da velocidade com que a rede considera os blocos como ["finalizados"](/developers/docs/consensus-mechanisms/pos/#finality) (o que significa que não podem ser alterados sem perdas econômicas extremas para um invasor).

Há também melhorias que tornam as transações de censura muito mais difíceis, fazendo com que os proponentes de blocos não consigam ver o conteúdo real de seus blocos e novas maneiras de identificar quando um cliente está censurando. Juntas, essas melhorias atualizarão o protocolo de [prova de participação](/glossary/#pos) para que os usuários — de indivíduos a corporações — tenham confiança instantânea em seus aplicativos, dados e ativos no Ethereum.

## Saques de staking {#staking-withdrawals}

A atualização de [prova de trabalho](/glossary/#pow) para prova de participação começou com os pioneiros do Ethereum fazendo “staking” de seus ETH em um contrato de depósito. Esse ETH é utilizado para proteger a rede. Houve uma segunda atualização em 12 de abril de 2023 para permitir que os validadores sacassem o ETH em staking. Desde então, os validadores podem apostar ou retirar ETH livremente.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Leia sobre saques</ButtonLink>

## Defesa contra ataques {#defending-against-attacks}

Há aperfeiçoamentos que podem ser feitos no protocolo de prova de participação do Ethereum. Uma é conhecida como [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) — um algoritmo de escolha de [bifurcação](/glossary/#fork) mais seguro que torna mais difíceis certos tipos sofisticados de ataques.

Reduzir o tempo que o Ethereum leva para [finalizar](/glossary/#finality) os blocos proporcionaria uma melhor experiência do usuário e evitaria ataques sofisticados de "reorg", em que os invasores tentam reorganizar blocos muito recentes para extrair lucro ou censurar certas transações. [**Finalidade de slot único (SSF)**](/roadmap/single-slot-finality/) é uma **forma de minimizar o atraso da finalização**. No momento, há 15 minutos de blocos que um invasor poderia, teoricamente, convencer outros validadores a reconfigurar. Com a SSF, há 0. Os usuários, de indivíduos a aplicativos e corretoras, beneficiam-se da garantia rápida de que as transações não serão revertidas, e a rede se beneficia ao desativar toda uma classe de ataques.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Leia sobre a finalidade de slot único</ButtonLink>

## Defesa contra a censura {#defending-against-censorship}

A descentralização impede que indivíduos ou pequenos grupos de [validadores](/glossary/#validator) se tornem influentes demais. Novas tecnologias de participação podem ajudar a garantir que os validadores do Ethereum permaneçam o mais descentralizados possível e, ao mesmo tempo, defendê-los contra falhas de hardware, software e rede. Isso inclui software que compartilha as responsabilidades de validador entre vários [nós](/glossary/#node). Isso é conhecido como **tecnologia de validador distribuído (DVT)**. Os [pools de staking](/glossary/#staking-pool) são incentivados a usar a DVT, pois ela permite que vários computadores participem coletivamente da validação, adicionando redundância e tolerância a falhas. Ela também divide as chaves do validador entre diversos sistemas, em vez de ter um único operador executando vários validadores. Isso torna mais difícil para os operadores desonestos coordenarem ataques ao Ethereum. No geral, a ideia é obter benefícios de segurança executando validadores como _comunidades_, e não como indivíduos.

<ButtonLink variant="outline-color" href="/staking/dvt/">Leia sobre a tecnologia de validador distribuído</ButtonLink>

A implementação da **separação proponente-construtor (PBS)** melhorará drasticamente as defesas integradas do Ethereum contra a censura. A PBS permite que um validador crie um bloco e outro o transmita pela rede Ethereum. Isso garante que os ganhos de algoritmos profissionais de construção de blocos que maximizam o lucro sejam compartilhados de forma mais justa em toda a rede, **impedindo que o stake se concentre** nos stakers institucionais de melhor desempenho ao longo do tempo. O proponente do bloco pode selecionar o bloco mais lucrativo oferecido por um mercado de construtores de blocos. Para censurar, um proponente de bloco muitas vezes teria que escolher um bloco menos lucrativo, o que seria **economicamente irracional e também óbvio para o resto dos validadores** na rede.

Há potenciais complementos para a PBS, como transações criptografadas e listas de inclusão, que poderiam melhorar ainda mais a resistência do Ethereum à censura. Isso faz com que o construtor e o proponente do bloco não saibam quais são as transações reais incluídas nos respectivos blocos.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Leia sobre a separação proponente-construtor</ButtonLink>

## Proteção de validadores {#protecting-validators}

É possível que um invasor sofisticado consiga identificar os próximos validadores e bombardeá-los com spam para impedi-los de propor blocos; isso é conhecido como um ataque de **negação de serviço (DoS)**. A implementação da [**eleição de líder secreto (SLE)**](/roadmap/secret-leader-election) protegerá contra esse tipo de ataque, impedindo que os proponentes de blocos sejam conhecidos com antecedência. Isso funciona ao embaralhar continuamente um conjunto de compromissos criptográficos que representam os proponentes de blocos candidatos e utilizar a ordem deles para determinar qual validador é selecionado, de forma que apenas os validadores saibam a ordem com antecedência.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Leia sobre a eleição de líder secreto</ButtonLink>

## Progresso atual {#current-progress}

**As atualizações de segurança no roteiro estão em estágios avançados de pesquisa**, mas não se espera que sejam implementadas por algum tempo. Os próximos passos para view-merge, PBS, SSF e SLE são finalizar uma especificação e começar a construir protótipos.
