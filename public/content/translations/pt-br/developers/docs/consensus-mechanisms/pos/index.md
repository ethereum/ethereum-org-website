---
title: Prova de Participação (PoS)
description: Uma explicação do protocolo de consenso de Prova de Participação (PoS) e seu papel no Ethereum.
lang: pt-br
---

A Prova de Participação (PoS) é a base do [mecanismo de consenso](/developers/docs/consensus-mechanisms/) do Ethereum. O Ethereum ativou seu mecanismo de Prova de Participação (PoS) em 2022 porque ele é mais seguro, consome menos energia e é melhor para implementar novas soluções de escalabilidade em comparação com a arquitetura anterior de [Prova de Trabalho (PoW)](/developers/docs/consensus-mechanisms/pow).

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, recomendamos que você leia primeiro sobre [mecanismos de consenso](/developers/docs/consensus-mechanisms/).

## O que é Prova de Participação (PoS)? {#what-is-pos}

A Prova de Participação (PoS) é uma maneira de provar que os validadores colocaram algo de valor na rede que pode ser destruído se agirem de forma desonesta. Na Prova de Participação (PoS) do [Ethereum](/), os validadores fazem stake explícito de capital na forma de ETH em um contrato inteligente no Ethereum. O validador é então responsável por verificar se os novos blocos propagados pela rede são válidos e, ocasionalmente, criar e propagar novos blocos por conta própria. Se eles tentarem fraudar a rede (por exemplo, propondo vários blocos quando deveriam enviar um ou enviando atestações conflitantes), parte ou todo o seu ETH em stake pode ser destruído.

## Validadores {#validators}

Para participar como um validador, um usuário deve depositar 32 ETH no contrato de depósito e executar três softwares separados: um cliente de execução, um cliente de consenso e um cliente validador. Ao depositar seu ETH, o usuário entra em uma fila de ativação que limita a taxa de novos validadores ingressando na rede. Uma vez ativados, os validadores recebem novos blocos de pares na rede Ethereum. As transações entregues no bloco são reexecutadas para verificar se as alterações propostas no estado do Ethereum são válidas, e a assinatura do bloco é verificada. O validador então envia um voto (chamado de atestação) a favor desse bloco por toda a rede.

Enquanto na Prova de Trabalho (PoW), o tempo dos blocos é determinado pela dificuldade de mineração, na Prova de Participação (PoS), o ritmo é fixo. O tempo no Ethereum com Prova de Participação (PoS) é dividido em slots (12 segundos) e épocas (32 slots). Um validador é selecionado aleatoriamente para ser um propositor de bloco em cada slot. Este validador é responsável por criar um novo bloco e enviá-lo para outros nós na rede. Também em cada slot, um comitê de validadores é escolhido aleatoriamente, cujos votos são usados para determinar a validade do bloco que está sendo proposto. Dividir o conjunto de validadores em comitês é importante para manter a carga da rede gerenciável. Os comitês dividem o conjunto de validadores para que todo validador ativo ateste em cada época, mas não em cada slot.

## Como uma transação é executada na PoS do Ethereum {#transaction-execution-ethereum-pos}

A seguir, é apresentada uma explicação de ponta a ponta de como uma transação é executada na Prova de Participação (PoS) do Ethereum.

1. Um usuário cria e assina uma [transação](/developers/docs/transactions/) com sua chave privada. Isso geralmente é feito por uma carteira ou uma biblioteca como [Ethers.js](https://docs.ethers.org/v6/), [web3js](https://docs.web3js.org/), [web3py](https://web3py.readthedocs.io/en/v5/) etc., mas internamente o usuário está fazendo uma solicitação a um nó usando a [API JSON-RPC](/developers/docs/apis/json-rpc/) do Ethereum. O usuário define a quantidade de gás que está disposto a pagar como uma taxa de prioridade a um validador para incentivá-lo a incluir a transação em um bloco. As [taxas de prioridade](/developers/docs/gas/#priority-fee) são pagas ao validador, enquanto a [taxa básica](/developers/docs/gas/#base-fee) é queimada.
2. A transação é enviada a um [cliente de execução](/developers/docs/nodes-and-clients/#execution-client) do Ethereum, que verifica sua validade. Isso significa garantir que o remetente tenha ETH suficiente para concluir a transação e que a tenha assinado com a chave correta.
3. Se a transação for válida, o cliente de execução a adiciona à sua mempool local (lista de transações pendentes) e também a transmite para outros nós pela rede de fofoca (gossip network) da camada de execução. Quando outros nós ficam sabendo da transação, eles também a adicionam à sua mempool local. Usuários avançados podem evitar transmitir sua transação e, em vez disso, encaminhá-la para construtores de blocos especializados, como o [Flashbots Auction](https://docs.flashbots.net/flashbots-auction/overview). Isso permite que eles organizem as transações nos próximos blocos para obter o máximo de lucro ([MEV](/developers/docs/mev/#mev-extraction)).
4. Um dos nós validadores na rede é o propositor de bloco para o slot atual, tendo sido previamente selecionado de forma pseudoaleatória usando RANDAO. Este nó é responsável por construir e transmitir o próximo bloco a ser adicionado à blockchain do Ethereum e atualizar o estado global. O nó é composto por três partes: um cliente de execução, um cliente de consenso e um cliente validador. O cliente de execução agrupa as transações da mempool local em uma "carga de execução" e as executa localmente para gerar uma mudança de estado. Esta informação é passada para o cliente de consenso, onde a carga de execução é encapsulada como parte de um "bloco beacon" que também contém informações sobre recompensas, penalidades, penalizações (slashings), atestações etc., que permitem que a rede concorde com a sequência de blocos no topo da cadeia. A comunicação entre os clientes de execução e de consenso é descrita com mais detalhes em [Conectando os Clientes de Consenso e de Execução](/developers/docs/networking-layer/#connecting-clients).
5. Outros nós recebem o novo bloco beacon na rede de fofoca da camada de consenso. Eles o passam para seu cliente de execução, onde as transações são reexecutadas localmente para garantir que a mudança de estado proposta seja válida. O cliente validador então atesta que o bloco é válido e é o próximo bloco lógico em sua visão da cadeia (o que significa que ele se baseia na cadeia com o maior peso de atestações, conforme definido nas [regras de escolha de bifurcação](/developers/docs/consensus-mechanisms/pos/#fork-choice)). O bloco é adicionado ao banco de dados local em cada nó que o atesta.
6. A transação pode ser considerada "finalizada" se tiver se tornado parte de uma cadeia com um "link de supermaioria" entre dois pontos de verificação. Os pontos de verificação ocorrem no início de cada época e existem para levar em conta o fato de que apenas um subconjunto de validadores ativos atesta em cada slot, mas todos os validadores ativos atestam ao longo de cada época. Portanto, é apenas entre as épocas que um 'link de supermaioria' pode ser demonstrado (é aqui que 66% do total de ETH em stake na rede concorda com dois pontos de verificação).

Mais detalhes sobre a finalidade podem ser encontrados abaixo.

## Finalidade {#finality}

Uma transação tem "finalidade" em redes distribuídas quando faz parte de um bloco que não pode mudar sem que uma grande quantidade de ETH seja queimada. No Ethereum com Prova de Participação (PoS), isso é gerenciado usando blocos de "ponto de verificação". O primeiro bloco em cada época é um ponto de verificação. Os validadores votam em pares de pontos de verificação que consideram válidos. Se um par de pontos de verificação atrair votos representando pelo menos dois terços do total de ETH em stake, os pontos de verificação são atualizados. O mais recente dos dois (alvo) torna-se "justificado". O anterior dos dois já está justificado porque era o "alvo" na época anterior. Agora ele é atualizado para "finalizado". Este processo de atualização dos pontos de verificação é gerenciado pelo **[Casper FFG (Casper the Friendly Finality Gadget)](https://arxiv.org/pdf/1710.09437)**. O Casper FFG é uma ferramenta de finalidade de bloco para consenso. Uma vez que um bloco é finalizado, ele não pode ser revertido ou alterado sem uma penalização majoritária dos stakers, tornando-o economicamente inviável.

Para reverter um bloco finalizado, um invasor se comprometeria a perder pelo menos um terço do suprimento total de ETH em stake. O motivo exato para isso é explicado nesta [postagem do blog da Fundação Ethereum](https://blog.ethereum.org/2016/05/09/on-settlement-finality). Como a finalidade exige uma maioria de dois terços, um invasor poderia impedir a rede de alcançar a finalidade votando com um terço do stake total. Existe um mecanismo para se defender contra isso: o [vazamento por inatividade](https://eth2book.info/bellatrix/part2/incentives/inactivity). Isso é ativado sempre que a cadeia não consegue finalizar por mais de quatro épocas. O vazamento por inatividade drena o ETH em stake dos validadores que votam contra a maioria, permitindo que a maioria recupere uma maioria de dois terços e finalize a cadeia.

## Segurança criptoeconômica {#crypto-economic-security}

Executar um validador é um compromisso. Espera-se que o validador mantenha hardware e conectividade suficientes para participar da validação de bloco e da proposta. Em troca, o validador é pago em ETH (seu saldo em stake aumenta). Por outro lado, participar como um validador também abre novos caminhos para os usuários atacarem a rede para ganho pessoal ou sabotagem. Para evitar isso, os validadores perdem recompensas em ETH se não participarem quando chamados, e seu stake existente pode ser destruído se eles se comportarem de forma desonesta. Dois comportamentos principais podem ser considerados desonestos: propor vários blocos em um único slot (equivocação) e enviar atestações contraditórias.

A quantidade de ETH penalizada depende de quantos validadores também estão sendo penalizados quase ao mesmo tempo. Isso é conhecido como a ["penalidade de correlação"](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty), e pode ser pequena (~1% do stake para um único validador penalizado sozinho) ou pode resultar na destruição de 100% do stake do validador (evento de penalização em massa). Ela é imposta na metade de um período de saída forçada que começa com uma penalidade imediata (até 1 ETH) no Dia 1, a penalidade de correlação no Dia 18 e, finalmente, a ejeção da rede no Dia 36. Eles recebem pequenas penalidades de atestação todos os dias porque estão presentes na rede, mas não estão enviando votos. Tudo isso significa que um ataque coordenado seria muito caro para o invasor.

## Escolha de bifurcação {#fork-choice}

Quando a rede funciona de forma ideal e honesta, há apenas um novo bloco no topo da cadeia, e todos os validadores o atestam. No entanto, é possível que os validadores tenham visões diferentes do topo da cadeia devido à latência da rede ou porque um propositor de bloco se equivocou. Portanto, os clientes de consenso exigem um algoritmo para decidir qual deles favorecer. O algoritmo usado na Prova de Participação (PoS) do Ethereum é chamado [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf), e funciona identificando a bifurcação que tem o maior peso de atestações em sua história.

## Prova de Participação (PoS) e segurança {#pos-and-security}

A ameaça de um [ataque de 51%](https://www.investopedia.com/terms/1/51-attack.asp) ainda existe na Prova de Participação (PoS) assim como na Prova de Trabalho (PoW), mas é ainda mais arriscada para os invasores. Um invasor precisaria de 51% do ETH em stake. Eles poderiam então usar suas próprias atestações para garantir que sua bifurcação preferida fosse a que tivesse mais atestações acumuladas. O 'peso' das atestações acumuladas é o que os clientes de consenso usam para determinar a cadeia correta, então esse invasor seria capaz de tornar sua bifurcação a canônica. No entanto, um ponto forte da Prova de Participação (PoS) sobre a Prova de Trabalho (PoW) é que a comunidade tem flexibilidade para montar um contra-ataque. Por exemplo, os validadores honestos poderiam decidir continuar construindo na cadeia minoritária e ignorar a bifurcação do invasor, enquanto incentivam aplicativos, exchanges e pools a fazerem o mesmo. Eles também poderiam decidir remover o invasor da rede à força e destruir seu ETH em stake. Estas são fortes defesas econômicas contra um ataque de 51%.

Além dos ataques de 51%, agentes mal-intencionados também podem tentar outros tipos de atividades maliciosas, como:

- ataques de longo alcance (embora a ferramenta de finalidade neutralize esse vetor de ataque)
- 'reorganizações' de curto alcance (embora o impulsionamento do proponente e os prazos de atestação mitiguem isso)
- ataques de salto e balanceamento (também mitigados pelo impulsionamento do proponente, e esses ataques, de qualquer forma, só foram demonstrados sob condições de rede idealizadas)
- ataques de avalanche (neutralizados pela regra dos algoritmos de escolha de bifurcação de considerar apenas a mensagem mais recente)

No geral, a Prova de Participação (PoS), conforme implementada no Ethereum, demonstrou ser economicamente mais segura do que a Prova de Trabalho (PoW).

## Prós e contras {#pros-and-cons}

| Prós                                                                                                                                                                                                                | Contras                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| O staking torna mais fácil para os indivíduos participarem da segurança da rede, promovendo a descentralização. Um nó validador pode ser executado em um laptop normal. As pools de staking permitem que os usuários façam stake sem ter 32 ETH. | A Prova de Participação (PoS) é mais recente e menos testada em batalha em comparação com a Prova de Trabalho (PoW)              |
| O staking é mais descentralizado. As economias de escala não se aplicam da mesma forma que na mineração de PoW.                                                                                                         | A Prova de Participação (PoS) é mais complexa de implementar do que a Prova de Trabalho (PoW)                          |
| A Prova de Participação (PoS) oferece maior segurança criptoeconômica do que a Prova de Trabalho (PoW)                                                                                                                                           | Os usuários precisam executar três softwares para participar da Prova de Participação (PoS) do Ethereum. |
| Menos emissão de novos ETH é necessária para incentivar os participantes da rede                                                                                                                                            |                                                                                         |

### Comparação com a Prova de Trabalho (PoW) {#comparison-to-proof-of-work}

O Ethereum usava originalmente a Prova de Trabalho (PoW), mas mudou para a Prova de Participação (PoS) em setembro de 2022. A PoS oferece várias vantagens sobre a PoW, como:

- melhor eficiência energética – não há necessidade de usar muita energia em cálculos de Prova de Trabalho (PoW)
- menores barreiras de entrada, requisitos de hardware reduzidos – não há necessidade de hardware de elite para ter a chance de criar novos blocos
- risco de centralização reduzido – a Prova de Participação (PoS) deve levar a mais nós protegendo a rede
- devido ao baixo requisito de energia, menos emissão de ETH é necessária para incentivar a participação
- penalidades econômicas por mau comportamento tornam os ataques do tipo 51% mais caros para um invasor em comparação com a Prova de Trabalho (PoW)
- a comunidade pode recorrer à recuperação social de uma cadeia honesta se um ataque de 51% superar as defesas criptoeconômicas.

## Leitura adicional {#further-reading}

- [Perguntas frequentes sobre a Prova de Participação (PoS)](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [O que é Prova de Participação (PoS)](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [O que é a Prova de Participação (PoS) e por que ela é importante](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Por que a Prova de Participação (PoS) (Nov 2020)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Prova de Participação (PoS): Como aprendi a amar a subjetividade fraca](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity) _Vitalik Buterin_
- [Ataque e defesa do Ethereum com Prova de Participação (PoS)](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [Uma filosofia de design de Prova de Participação (PoS)](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_
- [Vídeo: Vitalik Buterin explica a Prova de Participação (PoS) para Lex Fridman](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## Tópicos relacionados {#related-topics}

- [Prova de Trabalho (PoW)](/developers/docs/consensus-mechanisms/pow/)
- [Prova de autoridade (PoA)](/developers/docs/consensus-mechanisms/poa/)