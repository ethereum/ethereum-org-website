---
title: Prova de participação (PoS)
description: Explicação do protocolo de consenso "Prova de participação" e seu papel no Ethereum.
lang: pt-br
incomplete: true
---

Ethereum está mudando do mecanismo de consenso de prova de trabalho (PoW) [prova de participação (PoP)](/developers/docs/consensus-mechanisms/pow/). Este sempre foi o plano, pois tal mudança forma parte da estratégia essencial da comunidade para expandir o Ethereum via [implementações](/upgrades/). No entanto, acertar na implementação da prova de participação é um grande desafio técnico e não é tão simples quanto usar PdT para atingir consenso na rede.

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, recomendamos que você primeiro leia [mecanismos de consenso](/developers/docs/consensus-mechanisms/).

## O que é prova de participação (PoS)? {#what-is-pos}

Prova de participação é um tipo de [mecanismo de consenso](/developers/docs/consensus-mechanisms/) usado pelas redes de blockchain para alcançar o consenso distribuído.

Ela requer que os usuários façam staking de seus ETH para se tornarem um validador na rede. Os validadores são responsáveis pela mesma coisa que os mineradores na [prova de trabalho](/developers/docs/consensus-mechanisms/pow/): ordenar as transações e criar novos blocos para que todos os nós possam concordar com o estado da rede.

A prova de participação vem com várias melhorias referente ao sistema de prova de trabalho:

- melhor eficiência energética: você não precisa usar muita energia minerando blocos
- menores barreiras à entrada, redução dos requisitos de hardware — você não precisa de um hardware potente para ter a chance de criar novos blocos
- maior imunidade à centralização: a prova de participação deve gerar mais nós na rede
- suporte mais forte para as [cadeias de fragmentos](/upgrades/sharding/) – uma atualização chave para dimensionamento da rede Ethereum

## Prova de participação, participação (staking) e validadores {#pos-staking-validators}

A prova de participação é o mecanismo fundamental que ativa os validadores após receber uma quantidade suficiente de stake. Para o Ethereum, os usuários precisarão fazer staking de 32 ETH para se tornar um validador. Os validadores são escolhidos aleatoriamente para criar blocos e são responsáveis por verificar e confirmar blocos que eles não criaram. A participação (stake) de um usuário também é utilizada como uma forma de incentivar o bom comportamento do validador. Por exemplo, um usuário pode perder uma porção de sua participação por coisas como ficar offline (falhando na validação), ou toda a sua participação por conspiração deliberada.

## Como funciona a prova de participação do Ethereum? {#how-does-pos-work}

Ao contrário da prova de trabalho (PoW), os validadores não precisam usar grandes quantidades de poder computacional, porque eles são selecionados aleatoriamente e não competem entre si. Eles não precisam minerar blocos, só precisam criar blocos quando escolhidos e validar blocos propostos quando não são. Esta validação é conhecida como atestante ou certificadora. Você pode pensar no atestante como aquele que diz "este bloco parece estar bem". Os validadores recebem recompensas por propor novos blocos e por atestar os que viram.

Se você atesta/certifica blocos maliciosos, perde sua participação (stake).

### A Beacon Chain {#the-beacon-chain}

Quando o Ethereum substituir a prova de trabalho para a prova de participação, existirá uma complexidade adicional devido às [cadeias de fragmentos](/upgrades/sharding/). Estas são blockchains separadas que vão precisar de validadores para processar transações e criar novos blocos. O plano é ter 64 cadeias de fragmentos e todas elas precisam de uma compreensão compartilhada do estado da rede. Como resultado, uma coordenação extra é necessária, e será feita pela chamada cadeia de referência ou [Beacon Chain](/upgrades/beacon-chain/).

A Beacon Chain recebe informações de estado de fragmentos (shards) e as disponibiliza para outros fragmentos para que a rede possa permanecer em sincronia. A Beacon Chain também gerenciará os validadores, do registro de depósito de suas participações (stakes) até a emissão de suas recompensas e penalidades.

Eis como esse processo funciona.

### Como a validação funciona {#how-does-validation-work}

Quando enviar uma transação em um fragmento, um validador será responsável por adicionar sua transação a um bloco. Os validadores são escolhidos algoritmicamente pela Beacon Chain para propor novos blocos.

#### Certificação {#attestation}

Se um validador não for escolhido para propor um novo bloco de fragmentos, ele terá que atestar a proposta de outro validador e confirmar que tudo parece estar como deveria. É o certificado (attestation) que é registrado na Beacon Chain e não a transação em si.

Pelo menos 128 validadores são obrigados a atestar cada bloco de fragmentos – isto é conhecido como "comitê".

O comitê tem um prazo no qual deve propor e validar o bloco de fragmentos. Isto é conhecido como "slot". Apenas um bloco válido é criado por slot, e há 32 slots em um "epoch". Depois de cada "epoch", o comitê é dissolvido e reformulado com participantes diferentes e aleatórios. Isso ajuda a manter os fragmentos a salvo dos comitês de maus agentes.

#### Links cruzados {#rewards-and-penalties}

Quando uma nova proposta de bloco de fragmentos tiver "certificações" suficientes, um "link cruzado" será criado para confirmar a inclusão do bloco e sua transação na Beacon Chain.

Quando houver um "link cruzado", o validador que sugeriu o bloco receberá sua recompensa.

#### Finalidade {#finality}

Em redes distribuídas, uma transação tem "finalidade" quando é parte de um bloco que não pode mudar.

Para fazer isso na prova de participação, Casper, um protocolo de finalidade, leva os validadores a concordarem com o estado de um bloco em certos pontos de verificação. O bloco será finalizado sempre e quando 2/3 dos validadores concordem. Os validadores perderão toda sua participação (stake) se tentarem reverter isso mais tarde através de um ataque de 51%.

Como disse Vlad Zamfir, isto é como um minerador participando de um ataque de 51%, fazendo com que seu equipamento de mineração colapse imediatamente.

## Prova de participação e segurança {#pos-and-security}

A ameaça de um ataque de [51%](https://www.investopedia.com/terms/1/51-attack.asp) ainda existe na prova de participação, mas é ainda mais arriscado para os atacantes. Para fazer isso, você precisaria controlar 51% dos ETH envolvidos na participação. Não só isso é muito dinheiro, como provavelmente faria com que o valor dos ETHs caísse. Não há muito incentivo para destruir o valor de uma moeda na qual você tem uma participação majoritária. Existem incentivos mais fortes para manter a rede segura e íntegra.

Cortes de stake, ejeções e outras penalidades coordenadas pela Beacon Chain existirão para prevenir outros atos de mau comportamento. Os validadores também serão responsáveis por denunciar esses incidentes.

## Prós e contras {#pros-and-cons}

| Prós                                                                                                                                                                                                                                                                                                        | Contras                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| A participação torna mais fácil para você executar um nó. Não requer enormes investimentos em hardware ou energia, e se você não tem ETH suficiente para participar, pode se unir a um pool de participação.                                                                                                | A prova de participação ainda está dando seus primeiros passos, e foi menos testada na prática do que a prova de trabalho |
| A participação é mais descentralizada, pois permite maior participação, e uma quantidade maior de nós não significa um aumento do retorno em %, como na mineração.                                                                                                                                          |                                                                                                                           |
| A participação permite uma fragmentação segura. As cadeias de fragmentos permitem que o Ethereum crie vários blocos ao mesmo tempo, aumentando a taxa de transação. A fragmentação da rede em um sistema de prova de trabalho simplesmente reduziria o poder necessário para comprometer uma parte da rede. |                                                                                                                           |

## Leitura adicional {#further-reading}

- [Perguntas frequentes sobre prova de participação](https://vitalik.ca/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [O que é prova de participação](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [O que prova de participação é por que é importante](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [A explicação sobre Beacon Chain Ethereum 2.0 que você precisa ler primeiro](https://ethos.dev/beacon-chain/) _Ethos.dev_
- [Por que a prova de participação (nov. de 2020)](https://vitalik.ca/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Prova da participação: como aprendi a amar a pouca subjetividade](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/) _Vitalik Buterin_
- [A filosofia por trás do design da prova de participação](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_

## Tópicos relacionados {#related-topics}

- [Prova de trabalho](/developers/docs/consensus-mechanisms/pow/)
