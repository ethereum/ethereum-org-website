---
title: Perguntas Frequentes
description: Perguntas frequentes sobre a prova de participação do Ethereum.
lang: pt-br
---

## O que é prova de participação {#what-is-proof-of-stake}

A prova de participação (PoS) é uma classe de algoritmo capaz de fornecer segurança às blockchains, garantindo que os ativos de valor sejam perdidos por invasores que atuam de forma desonesta. Sistemas de prova de participação demandam um conjunto de validadores para disponibilizar alguns ativos, que podem ser destruídos se o validador se envolver em um provável comportamento desonesto. Por esses motivos, o Ethereum usa um mecanismo prova de participação para assegurar a blockchain.

## De que maneira a prova de participação se compara à prova de trabalho? {#comparison-to-proof-of-work}

Tanto a prova de trabalho quanto a prova de participação são mecanismos que desincentivam economicamente agentes maliciosos de enviar spam ou a defraudar a rede. Em ambos os casos, nós que participam ativamente do consenso colocam ativos “na rede”, que poderão ser perdidos se eles não se comportarem corretamente.

Na prova de trabalho, esse ativo é a energia. O nó, conhecido como um minerador, executa um algoritmo que visa calcular um valor mais rápido do que qualquer outro nó. O nó mais rápido tem o direito de propor um bloco à cadeia. Para mudar a história da cadeia ou dominar a proposta do bloco, um minerador teria que ter muita potência computacional para vencer a corrida. Isso é proibitivamente caro e difícil de executar, mas protege a cadeia contra ataques. A energia necessária para “minerar” usando a prova de trabalho é um ativo do mundo real, pago pelos mineradores.

A prova de participação requer nós, conhecidos como validadores, para enviar explicitamente um ativo cripto para um contrato inteligente. Se um validador se comportar mal, esse criptoativo pode ser destruído porque eles estão colocando em participação (staking) seus ativos diretamente na cadeia, em vez de indiretamente por meio do gasto de energia.

A prova de trabalho consome muito mais energia porque a eletricidade é consumida no processo de mineração. Por outro lado, a prova de participação requer apenas uma quantidade muito pequena de energia: os validadores do Ethereum podem até ser executados em um dispositivo de baixa potência, como o Raspberry Pi. O mecanismo de prova de participação do Ethereum é considerado mais seguro do que a prova de trabalho, porque o custo do ataque é maior e as consequências para um invasor são mais severas.

A comparação entre prova de trabalho e prova de participação é um tópico controverso. [O blog do Vitalik Buterin](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-are-the-benefits-of-proof-of-stake-as-opposed-to-proof-of-work) e o debate entre Justin Drake e Lyn Alden fornecem um bom resumo dos argumentos.

<YouTube id="1m12zgJ42dI" />

## A prova de participação é energeticamente eficiente? {#is-pos-energy-efficient}

Sim. Os nós em uma rede com prova de participação usam uma pequena quantidade de energia. Um estudo de terceiros concluiu que toda a rede Ethereum com prova de participação consome em torno de 0,0026 TWh/ano, cerca de 13.000 vezes menos do que jogos só nos EUA.

[Mais sobre o consumo de energia do Ethereum](/energy-consumption/).

## A prova de participação é segura? {#is-pos-secure}

A prova de participação do Ethereum é muito segura. O mecanismo foi pesquisado, desenvolvido e testado rigorosamente ao longo de oito anos de atividade antes de entrar em produção. As garantias de segurança são diferentes de blockchains com prova de trabalho. Na prova de participação, os validadores maliciosos podem ser punidos ativamente (“removidos”) e expulsos do conjunto de validadores, custando uma quantia substancial de ETH. Na prova de trabalho, um invasor pode continuar repetindo seu ataque enquanto ele tem poder de hash suficiente. Também é mais caro organizar ataques equivalentes na prova de participação do Ethereum do que na prova de trabalho. Para afetar a vitalidade da cadeia, é necessário pelo menos 33% do total de ether em participação (stake) na rede (exceto nos casos de ataques muito sofisticados com uma probabilidade de sucesso extremamente baixa). Para controlar o conteúdo de futuros blocos, é necessário pelo menos 51% do total de ETH em participação (stake) e, para reescrever o histórico, é necessário mais de 66% do total em participação (stake). O protocolo Ethereum destruiria esses ativos nos cenários de ataque de 33% ou 51% e por consenso social no cenário de ataque de 66%.

- [Saiba mais sobre como defender a prova de participação do Ethereum contra invasores](/developers/docs/consensus-mechanisms/pos/attack-and-defense)
- [Mais sobre o design da prova de participação](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)

## A prova de participação torna o Ethereum mais barato? {#does-pos-make-ethereum-cheaper}

Não. O custo para enviar uma transação (taxa de gás) é determinado por um mercado dinâmico de taxas que aumenta com o aumento da demanda de rede. O mecanismo de consenso não influencia isso diretamente.

[Mais sobre gás](/developers/docs/gas).

## O que são nós, clientes e validadores? {#what-are-nodes-clients-and-validators}

Nós são computadores conectados à rede Ethereum. Clientes são o software que eles executam que transforma o computador em um nó. Existem dois tipos de clientes: clientes de execução e clientes de consenso. Ambos são necessários para criar um nó. Um validador é um complemento opcional para um cliente de consenso que permite que o nó participe do consenso de prova de participação. Isso significa criar e propor blocos quando selecionados e atestar os blocos que eles ouvem na rede. Para executar um validador, o operador do nó deve depositar 32 ETH no contrato de depósito.

- [Mais sobre nós e clientes](/developers/docs/nodes-and-clients)
- [Mais sobre participação](/staking)

## A prova de participação é uma nova ideia? {#is-pos-new}

Não. Um usuário do BitcoinTalk [propôs a ideia básica de prova de participação](https://bitcointalk.org/index.php?topic=27787.0) como uma atualização para o Bitcoin em 2011. Passaram-se onze anos antes de estar pronto para ser implementado na Rede principal (Mainnet) do Ethereum. Algumas outras cadeias implementaram a prova de participação antes do Ethereum, mas não o mecanismo específico do Ethereum (conhecido como Gasper).

## O que tem de especial na prova de participação do Ethereum? {#why-is-ethereum-pos-special}

O mecanismo de prova de participação do Ethereum possui um design único. Esse mecanismo não foi o primeiro a ser planejado ou implementado, mas é o mais robusto. O mecanismo de prova de participação é conhecido como “Casper”. O Casper é definido a partir de como os validadores são selecionados para propor blocos, como e quando os certificados são feitos, como os certificados são contados, as recompensas e penalidades dadas aos validadores, condições de redução, mecanismos seguros, assim como a fuga de inatividade e as condições de “finalidade”. Enquanto isso, “finalidade” é a condição de que, para que um bloco seja considerado uma parte permanente da cadeia padronizada, ele deve ter sido votado pelo menos por 66% do ETH total em participação na rede. Os pesquisadores desenvolveram o Casper especificamente para o Ethereum, que é a primeira e única blockchain a ter implementado tal mecanismo.

Além do Casper, a prova de participação do Ethereum usa um algoritmo de escolha de bifurcação (fork) chamado LMD-GHOST. Isso é necessário no caso de surgir uma condição em que há dois blocos para o mesmo slot. Isso cria duas bifurcações (forks) na blockchain. O LMD-GHOST escolhe a que tem o maior “peso” de atestações. O peso é o número de atestações ponderado pelo saldo efetivo dos validadores. O LMD-GHOST é de exclusividade do Ethereum.

A combinação do Casper com o LMD_GHOST é conhecida como Gasper.

[Mais sobre o Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)

## O que é remoção (slashing)? {#what-is-slashing}

Remoção (slashing) é o termo dado à destruição de parte da participação do validador e à expulsão do validador da rede. A quantidade de ETH perdida em escalas de remoção com o número de validadores sendo reduzidos — isso significa que os validadores cúmplices são punidos com mais severidade do que indivíduos.

[Mais sobre remoção (slashing)](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties#slashing)

## Por que os validadores precisam de 32 ETH? {#why-32-eth}

Os validadores têm que colocar ETH em participação (stake) para que tenham algo a perder caso se comportem indevidamente. A razão pela qual eles têm que colocar 32 ETH em participação (stake) especificamente é para permitir que os nós executem em hardware modestos. Se o mínimo de ETH por validador fosse menor, então o número de validadores e, portanto, o número de mensagens que devem ser processadas em cada slot aumentaria, o que significa que seria necessário um hardware mais potente para executar um nó.

## Como os validadores são selecionados? {#how-are-validators-selected}

Um único validador é pseudo-aleatoriamente escolhido para propor um bloco em cada slot usando um algoritmo chamado RANDAO, que mistura um hash do proponente do bloco com uma semente que é atualizada em cada bloco. Esse valor é usado para selecionar um validador específico do conjunto total de validadores. A seleção do validador é fixada com duas épocas de antecedência.

[Mais sobre a seleção do validador](/developers/docs/consensus-mechanisms/pos/block-proposal)

## O que significa ataque forçado de participação (stake grinding)? {#what-is-stake-grinding}

O ataque forçado de participação é uma categoria de ataque em redes de prova de participação na qual o invasor tenta influenciar o algoritmo de seleção do validador para beneficiar seus próprios validadores. Os ataques forçados de participação (grinding attacks) em RANDAO exigem cerca de metade do total de ETH em participação (stake).

[Mais sobre forçar participação (stake grinding)](https://eth2book.info/altair/part2/building_blocks/randomness/#randao-biasability)

## O que é a remoção social? {#what-is-social-slashing}

A remoção social consiste na capacidade de uma comunidade em coordenar uma bifurcação (fork) da blockchain em resposta a um ataque. Ela permite à comunidade se recuperar do ataque de um invasor, finalizando uma cadeia desonesta. O corte social também pode ser utilizado contra ataques de censura.

- [Mais a respeito de remoção social](https://ercwl.medium.com/the-case-for-social-slashing-59277ff4d9c7)
- [Vitalik Buterin sobre remoção social](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)

## Eu serei removido? {#will-i-get-slashed}

Como validador, é muito difícil ser removido, a menos que você se envolva deliberadamente em um comportamento malicioso. A remoção só é implementada em cenários muito específicos, nos quais os validadores propõem vários blocos para o mesmo slot ou se contradizem com suas atestações, o que é muito improvável acontecer acidentalmente.

[Mais sobre condições de remoção](https://eth2book.info/altair/part2/incentives/slashing)

## Qual é o problema do “nada em participação” (nothing-at-stake)? {#what-is-nothing-at-stake-problem}

O problema do nada em participação (stake) é uma questão conceitual com alguns mecanismos de prova de participação, nos quais há apenas recompensas e nenhuma penalidade. Se não há nada em participação (stake), um validador pragmático poderá sem problemas atestar qualquer uma, ou mesmo várias, bifurcações (forks) da blockchain, pois isso aumenta suas recompensas. O Ethereum contorna isso usando condições de finalidade e remoções para garantir uma cadeia padronizada.

[Mais sobre o problema do “nada em participação”](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed)

## O que é um algoritmo de escolha de bifurcação (fork)? {#what-is-a-fork-choice-algorithm}

Um algoritmo de escolha de bifurcação (fork) implementa regras que determinam qual cadeia é a padronizada. Em condições ideais, não há necessidade de uma regra de escolha de bifurcação (fork), pois há apenas um proponente de bloco por slot e um bloco para escolher. Ocasionalmente, porém, vários blocos para o mesmo slot ou informações que chegam com atraso levam a várias opções de como os blocos próximos ao topo da cadeia são organizados. Nesses casos, todos os clientes devem implementar algumas regras de forma idêntica para garantir que todos escolham a sequência correta de blocos. O algoritmo de escolha da bifurcação (fork) codifica essas regras.

O algoritmo de escolha da bifurcação (fork) do Ethereum é chamado LMD-GHOST. Ele escolhe a bifurcação (fork) com o maior peso de atestações, ou seja, aquele que tem votado mais ETH em participação (stake).

[Mais sobre LMD-GHOST](/developers/docs/consensus-mechanisms/pos/gasper/#fork-choice)

## Qual a finalidade da prova de participação? {#what-is-finality}

A finalidade da prova de participação é a garantia de que um determinado bloco é uma parte permanente da cadeia padronizada e não pode ser revertido, a menos que haja uma falha de consenso, na qual um invasor consome 33% do total de ether em participação (stake). Essa é a finalidade “criptoeconômica”, em oposição à “finalidade probabilística”, relevante para blockchains de prova de trabalho. Na finalidade probabilística, não há estados explícitos finalizados/não finalizados para blocos; simplesmente, torna-se cada vez menos provável que um bloco possa ser removido da cadeia à medida que envelhece, e os usuários determinam por conta própria quando estão suficientemente confiantes de que um bloco é “seguro”. Com finalidade criptoeconômica, pares de blocos de pontos de verificação têm que ser votados por 66% do ether em participação (stake). Se essa condição for satisfeita, os blocos entre esses pontos de verificação são explicitamente “finalizados”.

[Mais sobre finalidade](/developers/docs/consensus-mechanisms/pos/#finality)

## O que é “subjetividade fraca”? {#what-is-weak-subjectivity}

A subjetividade fraca é um recurso de redes de prova de participação, em que informações sociais são usadas para confirmar o estado atual da blockchain. Novos nós ou nós que se juntam à rede após ficarem offline por um longo período podem ter recebido um estado recente para o nó poder ver imediatamente se eles estão na cadeia correta. Esses estados são conhecidos como “pontos de verificação de subjetividade fraca” e eles podem ser obtidos de outros operadores de nó fora de banda, ou de exploradores de bloco, ou de vários terminais públicos.

[Mais sobre subjetividade fraca](/developers/docs/consensus-mechanisms/pos/weak-subjectivity)

## A censura da prova de participação é resistente? {#is-pos-censorship-resistant}

No momento, é difícil provar resistência à censura. No entanto, ao contrário da prova de trabalho, a prova de participação oferece a opção de coordenar remoções para punir os validadores que censuram. Há mudanças futuras no protocolo que separam os construtores de blocos dos proponentes de blocos e implementam listas de transações que os construtores devem incluir em cada bloco. Essa proposta é conhecida como separação apropriada do construtor e ajuda a evitar que os validadores censurem as transações.

[Mais sobre separação apropriada do construtor](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Original-basic-scheme)

## O sistema de prova de participação do Ethereum pode ser atacado em 51%? {#pos-51-attack}

Sim. A prova de participação é vulnerável a 51% dos ataques, bem como a prova de trabalho. Ao invés do atacante precisar de 51% do poder de hash da rede, o atacante requer 51% do total de ETH em stake. Um invasor que acumula 51% do total em participação (stake) consegue controlar o algoritmo de escolha da bifurcação (fork). Isso permite que o invasor censure certas transações, faça reorganizações de curto alcance e extraia MEV reordenando blocos a seu favor.

[Leia mais sobre ataques na prova de participação](/developers/docs/consensus-mechanisms/pos/attack-and-defense)

## O que é coordenação social e por que ela é necessária? {#what-is-social-coordination}

A coordenação social é a última linha de defesa do Ethereum que permitiria uma cadeia honesta ser recuperada de um ataque que finalizou blocos desonestos. Nesse caso, a comunidade do Ethereum teria que se coordenar “fora de banda” e concordar em usar uma bifurcação (fork) minoritária honesta, removendo os validadores mal-intencionados no processo. Isso exigiria aplicativos e corretoras para reconhecer também a bifurcação (fork) honesta.

[Leia mais a respeito da coordenação social](/developers/docs/consensus-mechanisms/pos/attack-and-defense#people-the-last-line-of-defense)

## O rico fica mais rico na prova de participação? {#do-rich-get-richer}

Quanto mais ETH alguém tiver para colocar em participação (stake), mais os validadores podem operar e mais recompensas podem acumular. As recompensas escalam linearmente com a quantidade de ETH em participação (stake) e todos recebem a mesma porcentagem de retorno. A prova de trabalho enriquece mais os ricos do que a prova de participação, pois os mineradores mais ricos que compram hardware em escala se beneficiam de economias de escala, o que significa que a relação entre riqueza e recompensa não é linear.

## A prova de participação é mais centralizada do que a prova de trabalho? {#is-pos-decentralized}

Não, a prova de trabalho tende à centralização, porque os custos de mineração aumentam e tiram indivíduos do mercado, depois tiram pequenas empresas do mercado, e assim por diante. O problema atual com prova de participação é a influência dos derivados líquidos de participação (LSDs). Eles são tokens que representam o ETH em participação (stake) por algum provedor, com o qual qualquer pessoa pode fazer swap cambial em mercados secundários sem que o ETH real seja retirado da participação (stake). Os LSDs permitem que usuários coloquem em participação (stake) menos de 32 ETH, mas também criam um risco de centralização, permitindo que algumas organizações importantes acabem controlando grande parte da participação (stake). É por isso que a [participação individual](/staking/solo) (solo staking) é a melhor opção para o Ethereum.

[Mais sobre a centralização de participação (stake) em LSDs](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Por que eu só posso colocar ETH em participação (stake)? {#why-can-i-only-stake-eth}

O ETH é a moeda nativa da Ethereum. É essencial ter uma moeda única em que todas as participações (stakes) sejam denominadas, tanto para contabilizar saldos efetivos, quanto para ponderar votos e segurança. Por si só, o ETH é um componente fundamental do Ethereum, em vez de um contrato inteligente. A incorporação de outras moedas aumentaria significativamente a complexidade e diminuiria a segurança da participação (stake).

## O Ethereum é a única blockchain com prova de participação? {#is-ethereum-the-only-pos-blockchain}

Não, há várias blockchains que possuem prova de participação. No entanto, nenhuma é idêntica à do Ethereum, o que torna o mecanismo de prova de participação único.

## O que é A Fusão (The Merge)? {#what-is-the-merge}

A Fusão (The Merge) foi o momento em que o Ethereum desligou o seu mecanismo de consenso baseado em prova de trabalho e ativou o seu mecanismo de consenso baseado em prova de participação. A Fusão (The Merge) ocorreu em 15 de setembro de 2022.

[Mais sobre a integração](/roadmap/merge)

## O que é atividade e segurança? {#what-are-liveness-and-safety}

Atividade e segurança são as duas preocupações fundamentais relativas à segurança de uma blockchain. Atividade é a disponibilidade de uma cadeia de finalização. São consideradas falhas de atividade se a cadeia parar de finalizar ou se os usuários não conseguirem acessá-la facilmente. Custos de acesso extremamente elevados também poderiam ser considerados como falha de atividade. Já a segurança se refere ao quão difícil é atacar a cadeia, ou seja, finalizar os pontos de verificação conflitantes.

[Leia mais no artigo do Casper](https://arxiv.org/pdf/1710.09437.pdf)
