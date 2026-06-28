---
title: Perguntas frequentes
description: "Perguntas frequentes sobre a Prova de Participação (PoS) do Ethereum."
lang: pt-br
---

## O que é a Prova de Participação (PoS) {#what-is-proof-of-stake}

A Prova de Participação (PoS) é uma classe de algoritmo que pode fornecer segurança às blockchains, garantindo que ativos de valor sejam perdidos por invasores que agem de forma desonesta. Os sistemas de Prova de Participação exigem que um conjunto de validadores disponibilize algum ativo que possa ser destruído se o validador se envolver em algum comportamento comprovadamente desonesto. O Ethereum usa um mecanismo de consenso de Prova de Participação para proteger a blockchain.

## Como a Prova de Participação se compara à Prova de Trabalho? {#comparison-to-proof-of-work}

Tanto a Prova de Trabalho (PoW) quanto a Prova de Participação (PoS) são mecanismos que desincentivam economicamente atores mal-intencionados de enviar spam ou fraudar a rede. Em ambos os casos, os nós que participam ativamente do consenso colocam algum ativo "na rede" que perderão se se comportarem mal.

Na Prova de Trabalho, esse ativo é a energia. O nó, conhecido como minerador, executa um algoritmo que visa computar um valor mais rápido do que qualquer outro nó. O nó mais rápido tem o direito de propor um bloco para a cadeia. Para alterar o histórico da cadeia ou dominar a proposta de bloco, um minerador teria que ter tanto poder de computação que sempre venceria a corrida. Isso é proibitivamente caro e difícil de executar, protegendo a cadeia de ataques. A energia exigida para a "mineração" usando a Prova de Trabalho é um ativo do mundo real pelo qual os mineradores pagam.

A Prova de Participação exige que os nós, conhecidos como validadores, enviem explicitamente um ativo cripto para um contrato inteligente. Se um validador se comportar mal, essa cripto pode ser destruída porque eles estão fazendo "staking" de seus ativos diretamente na cadeia, em vez de indiretamente por meio do gasto de energia.

A Prova de Trabalho consome muito mais energia porque a eletricidade é queimada no processo de mineração. A Prova de Participação, por outro lado, exige apenas uma quantidade muito pequena de energia - os validadores do Ethereum podem até ser executados em um dispositivo de baixa potência, como um Raspberry Pi. Acredita-se que o mecanismo de consenso de Prova de Participação do Ethereum seja mais seguro do que a Prova de Trabalho porque o custo para atacar é maior e as consequências para um invasor são mais severas.

Prova de Trabalho versus Prova de Participação é um tópico controverso. O [blog de Vitalik Buterin](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-are-the-benefits-of-proof-of-stake-as-opposed-to-proof-of-work) e o debate entre Justin Drake e Lyn Alden fornecem um bom resumo dos argumentos.

<VideoWatch slug="pow-vs-pos" />

## A Prova de Participação é eficiente em termos de energia? {#is-pos-energy-efficient}

Sim. Os nós em uma rede de Prova de Participação usam uma quantidade minúscula de energia. Um estudo de terceiros concluiu que toda a rede Ethereum de Prova de Participação consome cerca de 0,0026 TWh/ano - cerca de 13.000 vezes menos do que os jogos apenas nos EUA.

[Mais sobre o consumo de energia do Ethereum](/energy-consumption/).

## A Prova de Participação é segura? {#is-pos-secure}

A Prova de Participação do Ethereum é muito segura. O mecanismo foi pesquisado, desenvolvido e testado rigorosamente por oito anos antes de entrar no ar. As garantias de segurança são diferentes das blockchains de Prova de Trabalho. Na Prova de Participação, validadores mal-intencionados podem ser ativamente punidos (sofrer "slashing") e ejetados do conjunto de validadores, custando uma quantia substancial de ETH. Sob a Prova de Trabalho, um invasor pode continuar repetindo seu ataque enquanto tiver poder de hash suficiente. Também é mais caro montar ataques equivalentes no Ethereum de Prova de Participação do que sob a Prova de Trabalho. Para afetar a vivacidade (liveness) da cadeia, é necessário pelo menos 33% do total de ether em staking na rede (exceto em casos de ataques muito sofisticados com uma probabilidade extremamente baixa de sucesso). Para controlar o conteúdo de blocos futuros, é necessário pelo menos 51% do total de ETH em staking e, para reescrever o histórico, é necessário mais de 66% do total de stake. O protocolo Ethereum destruiria esses ativos nos cenários de ataque de 33% ou 51% e por consenso social no cenário de ataque de 66%.

- [Mais sobre a defesa da Prova de Participação do Ethereum contra invasores](/developers/docs/consensus-mechanisms/pos/attack-and-defense)
- [Mais sobre o design da Prova de Participação](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)

## A Prova de Participação torna o Ethereum mais barato? {#does-pos-make-ethereum-cheaper}

Não. O custo para enviar uma transação (taxa de gas) é determinado por um mercado de taxas dinâmico que aumenta com mais demanda da rede. O mecanismo de consenso não influencia isso diretamente.

[Mais sobre gas](/developers/docs/gas).

## O que são nós, clientes e validadores? {#what-are-nodes-clients-and-validators}

Nós são computadores conectados à rede Ethereum. Clientes são os softwares que eles executam que transformam o computador em um nó. Existem dois tipos de clientes: clientes de execução e clientes de consenso. Ambos são necessários para criar um nó. Um validador é um complemento opcional para um cliente de consenso que permite que o nó participe do consenso de Prova de Participação. Isso significa criar e propor blocos quando selecionado e atestar os blocos sobre os quais eles ouvem na rede. Para executar um validador, o operador do nó deve depositar 32 ETH no contrato de depósito.

- [Mais sobre nós e clientes](/developers/docs/nodes-and-clients)
- [Mais sobre staking](/staking)

## A Prova de Participação é uma ideia nova? {#is-pos-new}

Não. Um usuário no BitcoinTalk [propôs a ideia básica da Prova de Participação](https://bitcointalk.org/index.php?topic=27787.0) como uma atualização para o Bitcoin em 2011. Passaram-se onze anos antes que estivesse pronta para ser implementada na Rede Principal do Ethereum. Algumas outras cadeias implementaram a Prova de Participação antes do Ethereum, mas não o mecanismo específico do Ethereum (conhecido como Gasper).

## O que há de especial na Prova de Participação do Ethereum? {#why-is-ethereum-pos-special}

O mecanismo de consenso de Prova de Participação do Ethereum é único em seu design. Não foi o primeiro mecanismo de Prova de Participação a ser projetado e implementado, mas é o mais robusto. O mecanismo de Prova de Participação é conhecido como "Casper". O Casper define como os validadores são selecionados para propor blocos, como e quando os atestados são feitos, como os atestados são contados, as recompensas e penalidades dadas aos validadores, as condições de penalização (slashing), os mecanismos de segurança, como o vazamento por inatividade, e as condições para a "finalidade". A finalidade é a condição de que, para que um bloco seja considerado uma parte permanente da cadeia canônica, ele deve ter sido votado por pelo menos 66% do total de ETH em staking na rede. Os pesquisadores desenvolveram o Casper especificamente para o Ethereum, e o Ethereum é a primeira e única blockchain a tê-lo implementado.

Além do Casper, a Prova de Participação do Ethereum usa um algoritmo de escolha de fork chamado LMD-GHOST. Isso é exigido caso surja uma condição em que existam dois blocos para o mesmo slot. Isso cria duas bifurcações (forks) da blockchain. O LMD-GHOST escolhe aquele que tem o maior "peso" de atestados. O peso é o número de atestados ponderado pelo saldo efetivo dos validadores. O LMD-GHOST é exclusivo do Ethereum.

A combinação do Casper e do LMD_GHOST é conhecida como Gasper.

[Mais sobre o Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)

## O que é slashing? {#what-is-slashing}

Slashing (penalização) é o termo dado à destruição de parte do stake de um validador e à ejeção do validador da rede. A quantidade de ETH perdida em um slashing aumenta proporcionalmente com o número de validadores sendo penalizados - isso significa que validadores em conluio são punidos mais severamente do que indivíduos.

[Mais sobre slashing](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties#slashing)

## Por que os validadores precisam de 32 ETH? {#why-32-eth}

Os validadores precisam fazer staking de ETH para que tenham algo a perder se se comportarem mal. O motivo pelo qual eles precisam fazer staking de 32 ETH especificamente é para permitir que os nós sejam executados em hardware modesto. Se o mínimo de ETH por validador fosse menor, o número de validadores e, portanto, o número de mensagens que devem ser processadas em cada slot aumentaria, o que significa que um hardware mais poderoso seria exigido para executar um nó.

## Como os validadores são selecionados? {#how-are-validators-selected}

Um único validador é escolhido de forma pseudoaleatória para propor um bloco em cada slot usando um algoritmo chamado RANDAO, que mistura um hash do propositor de bloco com uma semente que é atualizada a cada bloco. Esse valor é usado para selecionar um validador específico do conjunto total de validadores. A seleção do validador é fixada com duas épocas de antecedência.

[Mais sobre a seleção de validadores](/developers/docs/consensus-mechanisms/pos/block-proposal)

## O que é manipulação de stake (stake grinding)? {#what-is-stake-grinding}

A manipulação de stake (stake grinding) é uma categoria de ataque em redes de Prova de Participação onde o invasor tenta influenciar o algoritmo de seleção de validadores a favor de seus próprios validadores. Os ataques de manipulação de stake no RANDAO exigem cerca de metade do total de ETH em staking.

[Mais sobre manipulação de stake](https://eth2book.info/altair/part2/building_blocks/randomness/#randao-biasability)

## O que é slashing social? {#what-is-social-slashing}

O slashing social é a capacidade da comunidade de coordenar uma bifurcação (fork) da blockchain em resposta a um ataque. Ele permite que a comunidade se recupere de um invasor que finaliza uma cadeia desonesta. O slashing social também pode ser usado contra ataques de censura.

- [Mais sobre slashing social](https://ercwl.medium.com/the-case-for-social-slashing-59277ff4d9c7)
- [Vitalik Buterin sobre slashing social](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)

## Eu sofrerei slashing? {#will-i-get-slashed}

Como um validador, é muito difícil sofrer slashing, a menos que você se envolva deliberadamente em comportamento malicioso. O slashing é implementado apenas em cenários muito específicos onde os validadores propõem vários blocos para o mesmo slot ou se contradizem com seus atestados - é muito improvável que isso ocorra acidentalmente.

[Mais sobre as condições de slashing](https://eth2book.info/altair/part2/incentives/slashing)

## O que é o problema de nada a perder? {#what-is-nothing-at-stake-problem}

O problema de nada a perder (nothing-at-stake problem) é uma questão conceitual com alguns mecanismos de Prova de Participação onde existem apenas recompensas e nenhuma penalidade. Se não há nada a perder, um validador pragmático fica igualmente feliz em atestar qualquer, ou até mesmo várias, bifurcações da blockchain, pois isso aumenta suas recompensas. O Ethereum contorna isso usando condições de finalidade e slashing para garantir uma cadeia canônica.

[Mais sobre o problema de nada a perder](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed)

## O que é um algoritmo de escolha de fork? {#what-is-a-fork-choice-algorithm}

Um algoritmo de escolha de fork implementa regras que determinam qual cadeia é a canônica. Sob condições ideais, não há necessidade de uma regra de escolha de fork porque há apenas um propositor de bloco por slot e um bloco para escolher. Ocasionalmente, no entanto, vários blocos para o mesmo slot ou informações que chegam tarde levam a várias opções de como os blocos próximos ao topo da cadeia são organizados. Nesses casos, todos os clientes devem implementar algumas regras de forma idêntica para garantir que todos escolham a sequência correta de blocos. O algoritmo de escolha de fork codifica essas regras.

O algoritmo de escolha de fork do Ethereum é chamado LMD-GHOST. Ele escolhe o fork com o maior peso de atestados, o que significa aquele em que a maior parte do ETH em staking votou.

[Mais sobre o LMD-GHOST](/developers/docs/consensus-mechanisms/pos/gasper/#fork-choice)

## O que é finalidade na Prova de Participação? {#what-is-finality}

A finalidade na Prova de Participação é a garantia de que um determinado bloco é uma parte permanente da cadeia canônica e não pode ser revertido, a menos que haja uma falha de consenso na qual um invasor queime 33% do total de ether em staking. Esta é a finalidade "criptoeconômica", em oposição à "finalidade probabilística", que é relevante para blockchains de Prova de Trabalho. Na finalidade probabilística, não há estados explícitos de finalizado/não finalizado para blocos - simplesmente se torna cada vez menos provável que um bloco possa ser removido da cadeia à medida que envelhece, e os usuários determinam por si mesmos quando estão suficientemente confiantes de que um bloco é "seguro". Com a finalidade criptoeconômica, pares de blocos de ponto de verificação (checkpoint) devem ser votados por 66% do ether em staking. Se essa condição for satisfeita, os blocos entre esses pontos de verificação são explicitamente "finalizados".

[Mais sobre finalidade](/developers/docs/consensus-mechanisms/pos/#finality)

## O que é "subjetividade fraca"? {#what-is-weak-subjectivity}

A subjetividade fraca é um recurso das redes de Prova de Participação onde informações sociais são usadas para confirmar o estado atual da blockchain. Novos nós ou nós que retornam à rede após ficarem offline por um longo tempo podem receber um estado recente para que o nó possa ver imediatamente se eles estão na cadeia correta. Esses estados são conhecidos como "pontos de verificação de subjetividade fraca" e podem ser obtidos de outros operadores de nós fora da banda (out-of-band), de exploradores de blocos ou de vários endpoints públicos.

[Mais sobre subjetividade fraca](/developers/docs/consensus-mechanisms/pos/weak-subjectivity)

## A Prova de Participação é resistente à censura? {#is-pos-censorship-resistant}

A resistência à censura é atualmente difícil de provar. No entanto, ao contrário da Prova de Trabalho, a Prova de Participação oferece a opção de coordenar slashings para punir validadores censores. Há mudanças futuras no protocolo que separam os construtores de blocos dos propositores de blocos e implementam listas de transações que os construtores devem incluir em cada bloco. Esta proposta é conhecida como separação propositor-construtor (PBS) e ajuda a evitar que os validadores censurem transações.

[Mais sobre a separação propositor-construtor](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Original-basic-scheme)

## O sistema de Prova de Participação do Ethereum pode sofrer um ataque de 51%? {#pos-51-attack}

Sim. A Prova de Participação é vulnerável a ataques de 51%, assim como a Prova de Trabalho. Em vez de o invasor exigir 51% do poder de hash da rede, o invasor exige 51% do total de ETH em staking. Um invasor que acumula 51% do total de stake passa a controlar o algoritmo de escolha de fork. Isso permite que o invasor censure certas transações, faça reorganizações de curto alcance e extraia MEV reordenando os blocos a seu favor.

[Mais sobre ataques à Prova de Participação](/developers/docs/consensus-mechanisms/pos/attack-and-defense)

## O que é coordenação social e por que ela é necessária? {#what-is-social-coordination}

A coordenação social é uma última linha de defesa para o Ethereum que permitiria que uma cadeia honesta fosse recuperada de um ataque que finalizou blocos desonestos. Nesse caso, a comunidade Ethereum teria que se coordenar "fora da banda" (out-of-band) e concordar em usar um fork minoritário honesto, aplicando slashing aos validadores do invasor no processo. Isso exigiria que os aplicativos e as exchanges também reconhecessem o fork honesto.

[Leia mais sobre coordenação social](/developers/docs/consensus-mechanisms/pos/attack-and-defense#people-the-last-line-of-defense)

## Os ricos ficam mais ricos na Prova de Participação? {#do-rich-get-richer}

Quanto mais ETH alguém tem para fazer staking, mais validadores pode executar e mais recompensas pode acumular. As recompensas aumentam linearmente com a quantidade de ETH em staking, e todos recebem a mesma porcentagem de retorno. A Prova de Trabalho enriquece os ricos mais do que a Prova de Participação porque os mineradores mais ricos que compram hardware em escala se beneficiam de economias de escala, o que significa que a relação entre riqueza e recompensa não é linear.

## A Prova de Participação é mais centralizada do que a Prova de Trabalho? {#is-pos-decentralized}

Não, a Prova de Trabalho tende à centralização porque os custos de mineração aumentam e excluem indivíduos, depois excluem pequenas empresas e assim por diante. O problema atual com a Prova de Participação é a influência dos derivativos de staking líquido (LSDs). Estes são tokens que representam ETH em staking por algum provedor que qualquer um pode trocar (swap) em mercados secundários sem que o ETH real seja retirado do staking. Os LSDs permitem que os usuários façam staking com menos de 32 ETH, mas também criam um risco de centralização onde algumas grandes organizações podem acabar controlando grande parte do stake. É por isso que o [staking solo](/staking/solo) é a melhor opção para o Ethereum.

[Mais sobre a centralização de stake em LSDs](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Por que só posso fazer staking de ETH? {#why-can-i-only-stake-eth}

O ETH é a moeda nativa do Ethereum. É essencial ter uma única moeda na qual todos os stakes sejam denominados, tanto para contabilizar os saldos efetivos para ponderar os votos quanto para a segurança. O próprio ETH é um componente fundamental do Ethereum, em vez de um contrato inteligente. A incorporação de outras moedas aumentaria significativamente a complexidade e diminuiria a segurança do staking.

## O Ethereum é a única blockchain de Prova de Participação? {#is-ethereum-the-only-pos-blockchain}

Não, existem várias blockchains de Prova de Participação. Nenhuma é idêntica ao Ethereum; o mecanismo de consenso de Prova de Participação do Ethereum é único.

## O que é The Merge? {#what-is-the-merge}

The Merge foi o momento em que o Ethereum desligou seu mecanismo de consenso baseado em Prova de Trabalho e ativou seu mecanismo de consenso baseado em Prova de Participação. The Merge aconteceu em 15 de setembro de 2022.

[Mais sobre The Merge](/roadmap/merge)

## O que são vivacidade (liveness) e segurança (safety)? {#what-are-liveness-and-safety}

Vivacidade (liveness) e segurança (safety) são as duas preocupações fundamentais de segurança para uma blockchain. A vivacidade é a disponibilidade de uma cadeia em finalização. Se a cadeia parar de finalizar ou os usuários não conseguirem acessá-la facilmente, essas são falhas de vivacidade. O custo de acesso extremamente alto também pode ser considerado uma falha de vivacidade. A segurança refere-se a quão difícil é atacar a cadeia - ou seja, finalizar pontos de verificação conflitantes.

[Leia mais no artigo do Casper](https://arxiv.org/pdf/1710.09437.pdf)