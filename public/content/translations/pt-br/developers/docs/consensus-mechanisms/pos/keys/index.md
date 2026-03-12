---
title: "Chaves na prova de participação do Ethereum"
description: "Uma explicação das chaves usadas no mecanismo de consenso da prova de participação do Ethereum"
lang: pt-br
---

O Ethereum protege os ativos do usuário usando a criptografia de chave pública-privada. A chave pública é usada como base para um endereço Ethereum — ou seja, é visível para o público em geral e utilizada como um identificador único. A chave privada (ou “secret”) deve sempre ser acessível apenas ao proprietário da conta. A chave privada é usada para “assinar” as transações e os dados para que a criptografia possa provar que o proprietário aprova alguma ação de uma chave privada específica.

As chaves do Ethereum são geradas usando [criptografia de curva elíptica](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

No entanto, quando o Ethereum mudou de [prova de trabalho](/developers/docs/consensus-mechanisms/pow) para [prova de participação](/developers/docs/consensus-mechanisms/pos), um novo tipo de chave foi adicionado ao Ethereum. As chaves originais ainda funcionam exatamente como antes — não houve alterações nas chaves baseadas em curva elíptica que protegem as contas. No entanto, os usuários precisavam de um novo tipo de chave para participar da prova de participação colocando ETH em stake e executando validadores. Essa necessidade surgiu dos desafios de escalabilidade associados a muitas mensagens trocadas entre inúmeros validadores que exigiam um método criptográfico que pudesse ser agregado facilmente para reduzir a quantidade de comunicação necessária para a rede chegar a consenso.

Este novo tipo de chave usa o esquema de assinatura [**Boneh-Lynn-Shacham (BLS)**](https://wikipedia.org/wiki/BLS_digital_signature). O BLS permite uma agregação de assinaturas muito eficiente, mas também permite a engenharia reversa de chaves agregadas de validadores individuais e é ideal para gerenciar ações entre validadores.

## Os dois tipos de chaves de validador {#two-types-of-keys}

Antes da mudança para prova de participação, os usuários do Ethereum tinham uma única chave privada baseada em curva elíptica para acessar seus fundos. Com a introdução da prova de participação, os usuários que desejavam ser stakers solo também precisavam de uma **chave de validador** e uma **chave de saque**.

### A chave do validador {#validator-key}

A chave de assinatura de validação consiste em dois elementos:

- Chave **privada** do validador
- Chave **pública** do validador

O objetivo da chave de validação privada é assinar operações em cadeia, como propostas de bloco e atestações. Por causa disso, essas chaves devem estar guardadas numa carteira quente.

Essa flexibilidade tem a vantagem de mover as chaves de assinatura do validador muito rapidamente de um dispositivo para outro, no entanto, se elas forem perdidas ou roubadas, um ladrão pode **agir maliciosamente** de algumas maneiras:

- Remover o validador por:
  - Ser um proponente e assinar dois blocos diferentes da beacon para o mesmo slot
  - Ser um atestador e assinar uma atestação que "envolve" outra
  - Ser um atestador e assinar duas atestações diferentes com o mesmo destino
- Forçar uma saída voluntária, que interrompe o validador de fazer stake, e conceder acesso ao seu saldo de ETH para o proprietário da chave de saque

A **chave pública do validador** é incluída nos dados da transação quando um usuário deposita ETH no contrato de depósito de staking. Isso é conhecido como _dados de depósito_ e permite que o Ethereum identifique o validador.

### Credenciais de saque {#withdrawal-credentials}

Todo validador tem uma propriedade conhecida como _credenciais de saque_. Este campo de 32 bytes começa com `0x00`, representando as credenciais de saque BLS, ou `0x01`, representando as credenciais que apontam para um endereço de execução.

Os validadores com chaves `0x00` BLS devem atualizar essas credenciais para apontar para um endereço de execução, a fim de ativar pagamentos de saldo excedente ou saque total do staking. Isso pode ser feito fornecendo um endereço de execução nos dados de depósito durante a geração inicial da chave, _OU_ usando a chave de saque posteriormente para assinar e transmitir uma mensagem `BLSToExecutionChange`.

### A chave de saque {#withdrawal-key}

A chave de saque será necessária para atualizar as credenciais de saque para apontar para um endereço de execução, se não for definido durante o depósito inicial. Isso permitirá que os pagamentos do saldo em excesso comecem a ser processados e também permitirá que os usuários saquem totalmente seus ETH em participação (stake).

Assim como as chaves de validador, as chaves de saque também consistem em dois componentes:

- Chave **privada** de saque
- Chave **pública** de saque

Perder essa chave antes de atualizar as credenciais de saque para o tipo `0x01` significa perder o acesso ao saldo do validador. O validador pode ainda assinar atestações e bloqueios, pois essas ações exigem a chave privada do validador, no entanto, há pouco ou nenhum incentivo se as chaves de saque forem perdidas.

Separar as chaves de validação das chaves da conta Ethereum permite que vários validadores sejam executados por um único usuário.

![esquema de chave de validador](validator-key-schematic.png)

**Observação**: Sair das tarefas de staking e sacar o saldo de um validador atualmente exige a assinatura de uma [mensagem de saída voluntária (VEM)](https://mirror.xyz/ladislaus.eth/wmoBbUBes2Wp1_6DvP6slPabkyujSU7MZOFOC3QpErs&1) com a chave do validador. No entanto, o [EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) é uma proposta que permitirá a um usuário acionar a saída de um validador e sacar seu saldo, assinando mensagens de saída com a chave de saque no futuro. Isso reduzirá as premissas de confiança, permitindo que stakers que delegam ETH a [provedores de staking como serviço](/staking/saas/#what-is-staking-as-a-service) permaneçam no controle de seus fundos.

## Derivando chaves de uma frase semente {#deriving-keys-from-seed}

Se cada 32 ETH em stake precisavam de um novo conjunto de 2 chaves completamente independentes, o gerenciamento de chaves se tornaria rapidamente complicado, especialmente para usuários que executam vários validadores. Em vez disso, várias chaves de validação podem ser obtidas de um único segredo comum e armazenar esse segredo único permite acesso a várias chaves de validação.

[Mnemônicos](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) e caminhos são recursos proeminentes que os usuários costumam encontrar quando [acessam](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0) suas carteiras. Mnemônico é uma sequência de palavras que atuam como uma semente inicial para uma chave privada. Quando combinado com dados adicionais, o mnemônico gera um hash conhecido como “chave mestra”. Isso pode ser considerado como a raiz de uma árvore. Os galhos dessa raiz podem ser obtidos usando um caminho hierárquico de forma que os nós filhos possam existir como combinações de hash do nó pai e de seus índices na árvore. Leia sobre os padrões [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) e [BIP-19](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) para geração de chaves baseada em mnemônicos.

Esses caminhos possuem a seguinte estrutura, que será familiar para usuários que já interagiram com carteiras de hardware:

```
m/44'/60'/0'/0`
```

As barras nesse caminho separam os componentes da chave privada da seguinte forma:

```
master_key / purpose / coin_type / account / change / address_index
```

Essa lógica permite que os usuários anexem o maior número possível de validadores a uma única **frase mnemônica**, pois a raiz da árvore pode ser comum e a diferenciação pode ocorrer nos ramos. O usuário pode **derivar qualquer número de chaves** da frase mnemônica.

```
      [m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

Cada ramo é separado por `/`, então `m/2` significa começar com a chave mestra e seguir o ramo 2. No esquema abaixo, uma única frase mnemônica é usada para armazenar três chaves de saque, cada uma com dois validadores associados.

![lógica da chave do validador](multiple-keys.png)

## Leitura adicional {#further-reading}

- [Postagem no blog da Ethereum Foundation por Carl Beekhuizen](https://blog.ethereum.org/2020/05/21/keys/)
- [EIP-2333 Geração de chave BLS12-381](https://eips.ethereum.org/EIPS/eip-2333)
- [EIP-7002: Saídas acionadas pela Camada de Execução](https://web.archive.org/web/20250125035123/https://research.2077.xyz/eip-7002-unpacking-improvements-to-staking-ux-post-merge)
- [Gerenciamento de chaves em escala](https://docs.ethstaker.cc/ethstaker-knowledge-base/scaled-node-operators/key-management-at-scale)
