---
title: Um Ethereum mais seguro
description: O Ethereum é a plataforma de contratos inteligentes mais segura e descentralizada que existe. No entanto, ainda há melhorias que podem ser feitas para que o Ethereum permaneça resiliente a qualquer nível de ataque no futuro.
lang: pt-br
image: /images/roadmap/roadmap-security.png
alt: "Roteiro do Ethereum"
template: roadmap
---

**O Ethereum já é uma plataforma de [contratos inteligentes](/glossary/#smart-contract) muito segura** e descentralizada. No entanto, ainda há melhorias que podem ser feitas para que o Ethereum permaneça resiliente a todos os tipos de ataques no futuro. Isso inclui mudanças sutis na forma como os [clientes Ethereum](/glossary/#consensus-client) lidam com [blocos](/glossary/#block) concorrentes, bem como o aumento da velocidade com que a rede considera os blocos como ["finalizados"](/developers/docs/consensus-mechanisms/pos/#finality) (o que significa que eles não podem ser alterados sem perdas econômicas extremas para um invasor).

Há também melhorias que tornam a censura de transações muito mais difícil, tornando os propositores de blocos cegos ao conteúdo real de seus blocos, e novas maneiras de identificar quando um cliente está censurando. Juntas, essas melhorias atualizarão o protocolo de [Prova de Participação (PoS)](/glossary/#pos) para que os usuários - de indivíduos a corporações - tenham confiança instantânea em seus aplicativos, dados e ativos no Ethereum.

## Saques de staking {#staking-withdrawals}

A atualização da [Prova de Trabalho (PoW)](/glossary/#pow) para a Prova de Participação (PoS) começou com os pioneiros do Ethereum fazendo "staking" de seus ETH em um contrato de depósito. Esse ETH é usado para proteger a rede. Houve uma segunda atualização em 12 de abril de 2023 para permitir que os validadores sacassem o ETH em stake. Desde então, os validadores podem fazer stake ou sacar ETH livremente.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">Leia sobre os saques</ButtonLink>

## Defesa contra ataques {#defending-against-attacks}

Há melhorias que podem ser feitas no protocolo de Prova de Participação (PoS) do Ethereum. Uma delas é conhecida como [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) - um algoritmo de escolha de [bifurcação](/glossary/#fork) mais seguro que torna certos tipos sofisticados de ataques mais difíceis.

Reduzir o tempo que o Ethereum leva para [finalizar](/glossary/#finality) blocos proporcionaria uma melhor experiência ao usuário e evitaria ataques sofisticados de "reorg", onde os invasores tentam reorganizar blocos muito recentes para extrair lucro ou censurar certas transações. A [**finalidade de slot único (SSF)**](/roadmap/single-slot-finality/) é uma **maneira de minimizar o atraso de finalização**. No momento, há 15 minutos de blocos que um invasor poderia teoricamente convencer outros validadores a reconfigurar. Com a SSF, há 0. Os usuários, desde indivíduos até aplicativos e corretoras, se beneficiam da garantia rápida de que suas transações não serão revertidas, e a rede se beneficia ao encerrar toda uma classe de ataques.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">Leia sobre a finalidade de slot único</ButtonLink>

## Defesa contra censura {#defending-against-censorship}

A descentralização impede que indivíduos ou pequenos grupos de [validadores](/glossary/#validator) se tornem muito influentes. Novas tecnologias de staking podem ajudar a garantir que os validadores do Ethereum permaneçam o mais descentralizados possível, ao mesmo tempo em que os defendem contra falhas de hardware, software e rede. Isso inclui software que compartilha as responsabilidades do validador em vários [nós](/glossary/#node). Isso é conhecido como **tecnologia de validador distribuído (DVT)**. Os [pools de staking](/glossary/#staking-pool) são incentivados a usar a DVT porque ela permite que vários computadores participem coletivamente da validação, adicionando redundância e tolerância a falhas. Ela também divide as chaves do validador em vários sistemas, em vez de ter operadores únicos executando vários validadores. Isso torna mais difícil para operadores desonestos coordenarem ataques ao Ethereum. No geral, a ideia é obter benefícios de segurança executando validadores como _comunidades_ em vez de indivíduos.

<ButtonLink variant="outline-color" href="/staking/dvt/">Leia sobre a tecnologia de validador distribuído</ButtonLink>

A implementação da **separação propositor-construtor (PBS)** melhorará drasticamente as defesas integradas do Ethereum contra a censura. A PBS permite que um validador crie um bloco e outro o transmita pela rede Ethereum. Isso garante que os ganhos dos algoritmos profissionais de construção de blocos que maximizam os lucros sejam compartilhados de forma mais justa em toda a rede, **evitando que o stake se concentre** nos stakers institucionais de melhor desempenho ao longo do tempo. O propositor de bloco pode selecionar o bloco mais lucrativo oferecido a ele por um mercado de construtores de blocos. Para censurar, um propositor de bloco frequentemente teria que escolher um bloco menos lucrativo, o que seria **economicamente irracional e também óbvio para o resto dos validadores** na rede.

Existem complementos potenciais para a PBS, como transações criptografadas e listas de inclusão, que poderiam melhorar ainda mais a resistência à censura do Ethereum. Eles tornam o construtor de blocos e o proponente cegos para as transações reais incluídas em seus blocos.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">Leia sobre a separação propositor-construtor</ButtonLink>

## Proteção de validadores {#protecting-validators}

É possível que um invasor sofisticado identifique os próximos validadores e envie spam para impedi-los de propor blocos; isso é conhecido como um ataque de **negação de serviço (DoS)**. A implementação da [**eleição secreta de líder (SLE)**](/roadmap/secret-leader-election) protegerá contra esse tipo de ataque, impedindo que os propositores de blocos sejam conhecidos com antecedência. Isso funciona embaralhando continuamente um conjunto de compromissos criptográficos que representam os propositores de blocos candidatos e usando sua ordem para determinar qual validador é selecionado de tal forma que apenas os próprios validadores conheçam sua ordem com antecedência.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">Leia sobre a eleição secreta de líder</ButtonLink>

## Progresso atual {#current-progress}

**As atualizações de segurança no roteiro estão em estágios avançados de pesquisa**, mas não se espera que sejam implementadas por algum tempo. Os próximos passos para view-merge, PBS, SSF e SLE são finalizar uma especificação e começar a construir protótipos.