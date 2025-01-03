---
title: Introdução à Ethereum
description: Uma introdução do desenvolvedor de dapps aos conceitos principais do Ethereum.
lang: pt-br
---

## O que é uma blockchain? {#what-is-a-blockchain}

Uma blockchain é melhor descrita como um banco de dados público atualizado e compartilhado entre muitos computadores em uma rede.

"Block" refere-se ao fato de que os dados e o estado são armazenados em lotes sequenciais ou "blocos". Se você envia ETH para outra pessoa, os dados da transação precisam ser adicionados a um bloco para que ela seja bem-sucedida.

"Chain" refere-se ao fato de cada bloco referenciar, criptograficamente, seu bloco-pai. Em outras palavras, os blocos são encadeados juntos. Os dados de um bloco não podem ser alterados sem mudar todos os blocos subsequentes, o que exigiria o consenso de toda a rede.

Todos os computadores da rede têm de chegar a um acordo sobre cada novo bloco e sobre a cadeia como um todo. Estes computadores são conhecidos como "nós". Os nós garantem que todos interagindo com a blockchain tenham os mesmos dados. Para cumprir este acordo distribuído, as blockchains precisam de um mecanismo de consenso.

O Ethereum utiliza um mecanismo de consenso baseado em [prova de participação](/developers/docs/consensus-mechanisms/pos/). Qualquer um que queira adicionar novos blocos à cadeia deve colocar ETH – a moeda nativa no Ethereum – como garantia e executar um software validador. Esses “validadores” podem então ser selecionados aleatoriamente para propor blocos que outros validadores verificam e adicionam à blockchain. Há um sistema de recompensas e penalidades que fortemente incentiva os participantes a serem honestos e estarem disponíveis online o máximo possível.

Se você quiser ver como a cadeia de blocos faz hash dos dados e, subsequentemente, ao histórico de referência aos blocos, confira [esta demonstração](https://andersbrownworth.com/blockchain/blockchain) de Anders Brownworth e assista ao vídeo abaixo.

Assista a Anders explicando hashes em cadeias de blocos:

<YouTube id="_160oMzblY8" />

## O que é o Ethereum? {#what-is-ethereum}

O Ethereum é uma cadeia de blocos com um computador embutido nela. Ele é a base para criar aplicativos e organizações de maneira descentralizada, sem permissão e resistente à censura.

No universo Ethereum, existe um único computador canônico (chamado de Máquina virtual Ethereum, ou EVM) cujo estado todos na rede Ethereum concordam. Todos os que participam da rede Ethereum (todos os nós do Ethereum) mantêm uma cópia do estado deste computador. Além disso, qualquer participante pode transmitir uma solicitação para que esse computador execute um cálculo arbitrário. Sempre que tal solicitação é transmitida, outros participantes da rede verificam, validam e realizam ("executam") o cálculo. Isso provoca uma mudança de estado na EVM, que é incorporada e propagada em toda a rede.

Os pedidos de cálculo são chamados de solicitações de transação; o registro de todas as transações, bem como o estado atual da EVM, é armazenado na cadeia de blocos que, por sua vez, é armazenada e aceita por todos os nós.

Os mecanismos criptográficos garantem que, uma vez que as transações são verificadas como válidas e adicionadas à cadeia de blocos, elas não podem ser manipuladas mais tarde. Os mesmos mecanismos também garantem que todas as transações sejam assinadas e executadas com "permissões" apropriadas (ninguém mais além de Alice pode enviar ativos digitais da conta dela).

## O que é ether? {#what-is-ether}

**Ether (ETH)** é a criptomoeda nativa do Ethereum. O objetivo do ETH é possibilitar um mercado para cálculo. Tal mercado fornece um incentivo econômico para os participantes verificarem ou executarem solicitações de transação e fornecerem recursos computacionais para a rede.

Qualquer participante que transmita uma solicitação de transação também deve oferecer alguma quantidade de ETH à rede como recompensa. A rede queimará parte da recompensa e concederá o restante a quem eventualmente fizer o trabalho de verificar a transação, executá-la, confirmá-la na blockchain e transmiti-la para a rede.

O valor de ETH pago corresponde aos recursos necessários para fazer o cálculo. Essas recompensas também impedem que participantes mal-intencionados entupam intencionalmente a rede, ao solicitar a execução de computação infinita ou outros scripts com uso intensivo de recursos, pois esses participantes devem pagar pelos recursos de cálculo.

O ETH também é usado para fornecer segurança criptoeconômica à rede de três maneiras principais: 1) é usado como meio de recompensar validadores que propõem bloqueios ou denunciam comportamento desonesto de outros validadores; 2) é envolvido pelos validadores, atuando como garantia contra comportamento desonesto – se os validadores tentarem se comportar mal, seu ETH pode ser destruído; 3) é usado para ponderar o peso dos "votos" para novos blocos propostos, alimentando a parte de escolha da bifurcação do mecanismo de consenso.

## O que são contratos inteligentes? {#what-are-smart-contracts}

Na prática, os participantes não escrevem um novo código toda vez que querem solicitar um cálculo da EVM. Em vez disso, os desenvolvedores de aplicativos carregam os programas (trechos de código reutilizáveis) para serem armazenados na EVM, para que os usuários solicitem a execução desses trechos de código com parâmetros variáveis. Precisamente, chamamos de contratos inteligentes a todos esses programas que são enviados e executados na rede.

Em um nível muito básico, você pode pensar em um contrato inteligente como uma espécie de máquina de venda automática: um script que, quando chamado com determinados parâmetros, executa algumas ações ou cálculos se certas condições forem satisfeitas. Por exemplo, um simples contrato inteligente do fornecedor poderia criar e atribuir a propriedade de um ativo digital se o chamador enviar ETH para um destinatário específico.

Qualquer desenvolvedor pode criar um contrato inteligente e torná-lo público na rede, usando a cadeia de blocos como sua camada de dados, por uma taxa paga à rede. Qualquer usuário pode chamar um contrato inteligente para executar seu código, sendo necessário pagar uma nova taxa à rede.

Assim, com contratos inteligentes, os desenvolvedores podem criar e implantar arbitrariamente aplicativos e serviços voltados para usuários: mercados, instrumentos financeiros, jogos, etc.

## Terminologia {#terminology}

### Blockchain {#blockchain}

A sequência de todos os blocos que foram registrados na rede Ethereum no histórico da rede. Assim chamado porque cada bloco contém uma referência ao bloco anterior, o que nos ajuda a manter uma ordenação sobre todos os blocos (e, portanto, sobre o histórico preciso).

### ETH {#eth}

**Ether (ETH)** é a criptomoeda nativa do Ethereum. Os usuários pagam ETH a outros usuários para que suas solicitações de execução de código sejam atendidas.

[Mais sobre ETH](/developers/docs/intro-to-ether/)

### EVM {#evm}

A Máquina Virtual Ethereum é o computador virtual global em que o estado de cada participante da rede Ethereum é armazenado e aceito. Qualquer participante pode solicitar a execução do código arbitrário na EVM; a execução do código altera o estado da EVM.

[Mais sobre a EVM](/developers/docs/evm/)

### Nós {#nodes}

Máquinas da vida real que estão armazenando o estado da EVM. Os nós se comunicam entre eles para propagar informações sobre o estado da EVM e novas mudanças de estado. Qualquer usuário também pode solicitar execução do código através da solicitação de execução do código de um nó. A própria rede Ethereum é a agregação de todos os nós do Ethereum e suas comunicações.

[Mais sobre nós](/developers/docs/nodes-and-clients/)

### Contas {#accounts}

Onde o ETH é armazenado. Os usuários podem inicializar contas, depositar ETH nas contas e transferir ETH de suas contas para outros usuários. Contas e saldos de conta são armazenados em uma tabela grande na EVM, fazendo parte do estado geral da EVM.

[Mais sobre contas](/developers/docs/accounts/)

### Transações {#transactions}

Um "pedido de transação" é o termo formal para um pedido de execução de código na EVM, e uma "transação" é uma solicitação de transação cumprida e a mudança associada no estado da EVM. Qualquer usuário pode transmitir um pedido de transação para a rede a partir de um nó. Para que a solicitação de transação afete realmente o estado da EVM acordado, ela deve ser validada, executada e "comprometida com a rede" por algum outro nó. A execução de qualquer código causa uma mudança de estado na EVM; após a aprovação, essa alteração de estado é transmitida para todos os nós da rede. Alguns exemplos de transações:

- Envie X ETH da minha conta para a conta da Alice.
- Publicar algum código de contrato inteligente no estado da EVM.
- Executar o código do contrato inteligente no endereço X da EVM, com argumentos Y.

[Mais sobre transações](/developers/docs/transactions/)

### Blocos {#blocks}

O volume de transações é muito alto, portanto, as transações são "autorizadas" em lotes ou blocos. Os blocos geralmente contêm dezenas de centenas de transações.

[Mais sobre blocos](/developers/docs/blocks/)

### Smart Contracts {#smart-contracts}

Um trecho de código reutilizável (um programa) que um desenvolvedor publica no estado da EVM. Qualquer um pode solicitar que o código de contrato inteligente seja executado fazendo uma solicitação de transação. Como desenvolvedores podem escrever aplicativos executáveis arbitrários na EVM (jogos, mercados, instrumentos financeiros, etc.) ao publicar contratos inteligentes, esses geralmente também são chamados de [dapps, ou apps descentralizados](/developers/docs/dapps/).

[Mais sobre contratos inteligentes](/developers/docs/smart-contracts/)

## Leitura adicional {#further-reading}

- [Whitepaper do Ethereum](/whitepaper/)
- [Afinal, como funciona o Ethereum?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369) - _Preethi Kasireddy_ (**NB** este recurso ainda é valioso, mas esteja ciente de que é anterior à [Fusão](/roadmap/merge) (The Merge) e, portanto, ainda se refere ao mecanismo de prova de trabalho do Ethereum, que agora é protegido pelo uso da [prova de participação](/developers/docs/consensus-mechanisms/pos))

_Conhece um recurso da comunidade que ajudou você? Edite essa página e adicione-o!_

## Tutoriais relacionados {#related-tutorials}

- [Um guia do desenvolvedor para Ethereum, parte 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _– uma exploração muito simples para iniciantes do Ethereum usando Python e web3.py_
