---
title: Introdução técnica ao Ethereum
description: Uma introdução aos conceitos fundamentais do Ethereum para desenvolvedores de dapps.
lang: pt-br
---

## O que é uma blockchain? {#what-is-a-blockchain}

Uma blockchain é um banco de dados público que é atualizado e compartilhado entre muitos computadores em uma rede.

"Bloco" refere-se a dados e estado sendo armazenados em grupos consecutivos conhecidos como "blocos". Se você enviar ETH para outra pessoa, os dados da transação precisam ser adicionados a um bloco para que a transação seja bem-sucedida.

"Cadeia" refere-se ao fato de que cada bloco faz referência criptográfica ao seu bloco pai. Em outras palavras, os blocos são encadeados. Os dados em um bloco não podem ser alterados sem alterar todos os blocos subsequentes, o que exigiria o consenso de toda a rede.

Cada computador na rede deve concordar com cada novo bloco e com a cadeia como um todo. Esses computadores são conhecidos como "nós". Os nós garantem que todos que interagem com a blockchain tenham os mesmos dados. Para alcançar esse acordo distribuído, as blockchains precisam de um mecanismo de consenso.

[Ethereum](/) usa um [mecanismo de consenso baseado em Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos/). Qualquer pessoa que queira adicionar novos blocos à cadeia deve fazer stake de ETH - a moeda nativa do Ethereum - como colateral e executar um software validador. Esses "validadores" podem então ser selecionados aleatoriamente para propor blocos que outros validadores verificam e adicionam à blockchain. Existe um sistema de recompensas e penalidades que incentiva fortemente os participantes a serem honestos e a estarem disponíveis online o máximo possível.

Se você quiser ver como os dados da blockchain são transformados em hash e subsequentemente anexados ao histórico de referências de blocos, não deixe de conferir [esta demonstração](https://andersbrownworth.com/blockchain/blockchain) de Anders Brownworth e assista ao vídeo de acompanhamento abaixo.

Assista Anders explicar hashes em blockchains:

<VideoWatch slug="blockchain-101-visual-demo" />

## O que é o Ethereum? {#what-is-ethereum}

O Ethereum é uma blockchain com um computador embutido nela. É a base para a construção de aplicativos e organizações de forma descentralizada, não permissionada e resistente à censura.

No universo do Ethereum, existe um único computador canônico (chamado de Máquina Virtual Ethereum, ou EVM) cujo estado todos na rede Ethereum concordam. Todos que participam da rede Ethereum (cada nó Ethereum) mantêm uma cópia do estado deste computador. Além disso, qualquer participante pode transmitir uma solicitação para que este computador execute computação arbitrária. Sempre que tal solicitação é transmitida, outros participantes da rede verificam, validam e realizam ("executam") a computação. Essa execução causa uma mudança de estado na EVM, que é confirmada e propagada por toda a rede.

As solicitações de computação são chamadas de solicitações de transação; o registro de todas as transações e o estado atual da EVM são armazenados na blockchain, que por sua vez é armazenada e acordada por todos os nós.

Mecanismos criptográficos garantem que, uma vez que as transações sejam verificadas como válidas e adicionadas à blockchain, elas não possam ser adulteradas posteriormente. Os mesmos mecanismos também garantem que todas as transações sejam assinadas e executadas com as "permissões" apropriadas (ninguém deve ser capaz de enviar ativos digitais da conta da Alice, exceto a própria Alice).

## O que é ether? {#what-is-ether}

**Ether (ETH)** é a criptomoeda nativa do Ethereum. O objetivo do ETH é permitir um mercado para computação. Tal mercado fornece um incentivo econômico para que os participantes verifiquem e executem solicitações de transação e forneçam recursos computacionais para a rede.

Qualquer participante que transmita uma solicitação de transação também deve oferecer uma certa quantidade de ETH à rede como recompensa. A rede vai queimar parte da recompensa e conceder o restante a quem eventualmente fizer o trabalho de verificar a transação, executá-la, confirmá-la na blockchain e transmiti-la para a rede.

A quantidade de ETH paga corresponde aos recursos necessários para fazer a computação. Essas recompensas também evitam que participantes mal-intencionados congestionem intencionalmente a rede solicitando a execução de computação infinita ou outros scripts que consomem muitos recursos, pois esses participantes devem pagar pelos recursos de computação.

O ETH também é usado para fornecer segurança criptoeconômica à rede de três maneiras principais: 1) é usado como um meio de recompensar os validadores que propõem blocos ou denunciam o comportamento desonesto de outros validadores; 2) É feito stake pelos validadores, agindo como colateral contra comportamento desonesto — se os validadores tentarem se comportar mal, seu ETH pode ser destruído; 3) é usado para pesar 'votos' para blocos recém-propostos, alimentando a parte de escolha de bifurcação do mecanismo de consenso.

## O que são contratos inteligentes? {#what-are-smart-contracts}

Na prática, os participantes não escrevem um novo código toda vez que desejam solicitar uma computação na EVM. Em vez disso, os desenvolvedores de aplicativos fazem o upload de programas (trechos de código reutilizáveis) no estado da EVM, e os usuários fazem solicitações para executar esses trechos de código com parâmetros variados. Chamamos os programas carregados e executados pela rede de "contratos inteligentes".

Em um nível muito básico, você pode pensar em um contrato inteligente como uma espécie de máquina de venda automática: um script que, quando chamado com certos parâmetros, executa algumas ações ou computação se certas condições forem satisfeitas. Por exemplo, um contrato inteligente de vendedor simples poderia criar e atribuir a propriedade de um ativo digital se o chamador enviar ETH para um destinatário específico.

Qualquer desenvolvedor pode criar um contrato inteligente e torná-lo público na rede, usando a blockchain como sua camada de dados, mediante uma taxa paga à rede. Qualquer usuário pode então chamar o contrato inteligente para executar seu código, novamente mediante uma taxa paga à rede.

Assim, com contratos inteligentes, os desenvolvedores podem construir e implantar aplicativos e serviços voltados para o usuário arbitrariamente complexos, como: mercados, instrumentos financeiros, jogos, etc.

## Terminologia {#terminology}

### Blockchain {#blockchain}

A sequência de todos os blocos que foram confirmados na rede Ethereum na história da rede. Tem esse nome porque cada bloco contém uma referência ao bloco anterior, o que nos ajuda a manter uma ordenação sobre todos os blocos (e, portanto, sobre o histórico preciso).

### ETH {#eth}

**Ether (ETH)** é a criptomoeda nativa do Ethereum. Os usuários pagam ETH a outros usuários para que suas solicitações de execução de código sejam atendidas.

[Mais sobre ETH](/developers/docs/intro-to-ether/)

### EVM {#evm}

A Máquina Virtual Ethereum (EVM) é o computador virtual global cujo estado cada participante da rede Ethereum armazena e concorda. Qualquer participante pode solicitar a execução de código arbitrário na EVM; a execução do código altera o estado da EVM.

[Mais sobre a EVM](/developers/docs/evm/)

### Nós {#nodes}

As máquinas da vida real que estão armazenando o estado da EVM. Os nós se comunicam entre si para propagar informações sobre o estado da EVM e novas mudanças de estado. Qualquer usuário também pode solicitar a execução de código transmitindo uma solicitação de execução de código a partir de um nó. A própria rede Ethereum é o agregado de todos os nós Ethereum e suas comunicações.

[Mais sobre nós](/developers/docs/nodes-and-clients/)

### Contas {#accounts}

Onde o ETH é armazenado. Os usuários podem inicializar contas, depositar ETH nas contas e fazer a transferência de ETH de suas contas para outros usuários. As contas e os saldos das contas são armazenados em uma grande tabela na EVM; eles fazem parte do estado geral da EVM.

[Mais sobre contas](/developers/docs/accounts/)

### Transações {#transactions}

Uma "solicitação de transação" é o termo formal para uma solicitação de execução de código na EVM, e uma "transação" é uma solicitação de transação atendida e a mudança associada no estado da EVM. Qualquer usuário pode transmitir uma solicitação de transação para a rede a partir de um nó. Para que a solicitação de transação afete o estado acordado da EVM, ela deve ser validada, executada e "confirmada na rede" por outro nó. A execução de qualquer código causa uma mudança de estado na EVM; após a confirmação, essa mudança de estado é transmitida a todos os nós da rede. Alguns exemplos de transações:

- Enviar X ETH da minha conta para a conta da Alice.
- Publicar algum código de contrato inteligente no estado da EVM.
- Executar o código do contrato inteligente no endereço X na EVM, com os argumentos Y.

[Mais sobre transações](/developers/docs/transactions/)

### Blocos {#blocks}

O volume de transações é muito alto, então as transações são "confirmadas" em lotes, ou blocos. Os blocos geralmente contêm dezenas a centenas de transações.

[Mais sobre blocos](/developers/docs/blocks/)

### Contratos inteligentes {#smart-contracts}

Um trecho de código reutilizável (um programa) que um desenvolvedor publica no estado da EVM. Qualquer pessoa pode solicitar que o código do contrato inteligente seja executado fazendo uma solicitação de transação. Como os desenvolvedores podem escrever aplicativos executáveis arbitrários na EVM (jogos, mercados, instrumentos financeiros, etc.) publicando contratos inteligentes, eles também são frequentemente chamados de [aplicativos descentralizados (dapps)](/developers/docs/dapps/).

[Mais sobre contratos inteligentes](/developers/docs/smart-contracts/)

## Onde ir a seguir {#where-to-go-next}

A maioria dos leitores segue a documentação em ordem, mas o caminho mais curto depende do que você está tentando construir:

- **Dapps que interagem com o Ethereum:** [contas](/developers/docs/accounts/) e [transações](/developers/docs/transactions/), depois escolha um [framework](/developers/docs/frameworks/).
- **Desenvolvimento de contratos inteligentes:** [contratos inteligentes](/developers/docs/smart-contracts/) e [linguagens de programação](/developers/docs/programming-languages/).
- **Nós e staking:** [nós e clientes](/developers/docs/nodes-and-clients/), depois [mecanismos de consenso](/developers/docs/consensus-mechanisms/).

## Leitura adicional {#further-reading}

- [Whitepaper do Ethereum](/whitepaper/)
- [Afinal, como o Ethereum funciona?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369) - _Preethi Kasireddy_ (**Nota:** este recurso ainda é valioso, mas esteja ciente de que ele é anterior ao [The Merge](/roadmap/merge) e, portanto, ainda se refere ao mecanismo de Prova de Trabalho (PoW) do Ethereum - o Ethereum agora é protegido usando [Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos))

### Aprende melhor visualmente? {#visual-learner}

Esta série de vídeos oferece uma exploração detalhada de tópicos fundamentais:

<VideoWatch slug="ethereum-basics-intro" />

[Playlist de Fundamentos do Ethereum](https://youtube.com/playlist?list=PLqgutSGloqiJyyoL0zvLVFPS-GMD2wKa5&si=kZTf5I7PKGTXDsOZ)

_Conhece um recurso da comunidade que ajudou você? Edite esta página e adicione-o!_

## Tutoriais relacionados {#related-tutorials}

- [Um guia do desenvolvedor para o Ethereum, parte 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _– Uma exploração muito amigável para iniciantes do Ethereum usando Python e web3.py_