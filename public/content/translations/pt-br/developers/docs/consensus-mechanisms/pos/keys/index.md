---
title: "Chaves no Ethereum de Prova de Participação (PoS)"
description: "Uma explicação das chaves usadas no mecanismo de consenso de Prova de Participação (PoS) do Ethereum"
lang: pt-br
---

O Ethereum protege os ativos dos usuários usando criptografia de chave pública e privada. A chave pública é usada como base para um endereço Ethereum — ou seja, é visível para o público em geral e usada como um identificador exclusivo. A chave privada (ou 'secreta') deve ser acessível apenas ao proprietário da conta. A chave privada é usada para 'assinar' transações e dados para que a criptografia possa provar que o titular aprova alguma ação de uma chave privada específica.

As chaves do Ethereum são geradas usando [criptografia de curva elíptica](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

No entanto, quando o Ethereum mudou da [Prova de Trabalho (PoW)](/developers/docs/consensus-mechanisms/pow) para a [Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos), um novo tipo de chave foi adicionado ao Ethereum. As chaves originais ainda funcionam exatamente da mesma forma que antes — não houve alterações nas chaves baseadas em curva elíptica que protegem as contas. No entanto, os usuários precisavam de um novo tipo de chave para participar da Prova de Participação (PoS) fazendo staking de ETH e executando validadores. Essa necessidade surgiu de desafios de escalabilidade associados a muitas mensagens passando entre um grande número de validadores, o que exigia um método criptográfico que pudesse ser facilmente agregado para reduzir a quantidade de comunicação necessária para que a rede chegasse a um consenso.

Esse novo tipo de chave usa o [esquema de assinatura **Boneh-Lynn-Shacham (BLS)**](https://wikipedia.org/wiki/BLS_digital_signature). As assinaturas BLS de muitos validadores podem ser agregadas em uma única assinatura que é verificada em uma única verificação, o que mantém as mensagens de consenso pequenas. O BLS não é seguro contra computadores quânticos, portanto, o [roteiro pós-quântico](/roadmap/security/quantum-resistance/) planeja substituir as chaves BLS do validador por chaves baseadas em hash.

## Os dois tipos de chaves de validador {#two-types-of-keys}

Antes da mudança para a Prova de Participação (PoS), os usuários do Ethereum tinham apenas uma única chave privada baseada em curva elíptica para acessar seus fundos. Com a introdução da Prova de Participação (PoS), os usuários que desejavam ser stakers solo também passaram a exigir uma **chave de validador** e uma **chave de saque**.

### A chave de validador {#validator-key}

A chave de assinatura do validador consiste em dois elementos:

- Chave **privada** do validador
- Chave **pública** do validador

O objetivo da chave privada do validador é assinar operações onchain, como propostas de blocos e atestações. Por causa disso, essas chaves devem ser mantidas em uma carteira quente.

Essa flexibilidade tem a vantagem de mover as chaves de assinatura do validador muito rapidamente de um dispositivo para outro, no entanto, se elas forem perdidas ou roubadas, um ladrão pode ser capaz de **agir maliciosamente** de algumas maneiras:

- Fazer com que o validador sofra uma penalização ao:
  - Ser um proponente e assinar dois blocos beacon diferentes para o mesmo slot
  - Ser um atestador e assinar uma atestação que "envolve" outra
  - Ser um atestador e assinar duas atestações diferentes com o mesmo alvo
- Forçar uma saída voluntária, o que impede o validador de fazer staking e concede acesso ao seu saldo de ETH ao proprietário da chave de saque

A **chave pública do validador** é incluída nos dados da transação quando um usuário deposita ETH no contrato de depósito de staking. Isso é conhecido como _dados de depósito_ e permite que o Ethereum identifique o validador.

### Credenciais de saque {#withdrawal-credentials}

Todo validador tem uma propriedade conhecida como _credenciais de saque_. O primeiro byte deste campo de 32 bytes identifica o tipo de conta: `0x00` representa credenciais BLS legadas (pré-Shapella, não sacáveis), `0x01` representa credenciais legadas que apontam para um endereço de execução e `0x02` representa o tipo moderno de credencial de composição.

Validadores com chaves BLS `0x00` devem atualizar essas credenciais para apontar para um endereço de execução a fim de ativar pagamentos de saldo excedente ou o saque total do staking. Isso pode ser feito fornecendo um endereço de execução nos dados de depósito durante a geração inicial da chave, _OU_ usando a chave de saque posteriormente para assinar e transmitir uma mensagem `BLSToExecutionChange`. Propostas para eliminar gradualmente as credenciais `0x00` antes da transição pós-quântica estão em discussão, portanto, os validadores que ainda usam `0x00` devem fazer a conversão agora.

[Mais sobre credenciais de saque do validador](/developers/docs/consensus-mechanisms/pos/withdrawal-credentials/)

### A chave de saque {#withdrawal-key}

A chave de saque será exigida para atualizar as credenciais de saque para apontar para um endereço de execução, caso não tenha sido definida durante o depósito inicial. Isso permitirá que os pagamentos de saldo excedente comecem a ser processados e também permitirá que os usuários saquem totalmente seu ETH em staking.

Assim como as chaves de validador, as chaves de saque também consistem em dois componentes:

- Chave **privada** de saque
- Chave **pública** de saque

Perder essa chave antes de atualizar as credenciais de saque para o tipo `0x01` significa perder o acesso ao saldo do validador. O validador ainda pode assinar atestações e blocos, pois essas ações exigem a chave privada do validador, no entanto, há pouco ou nenhum incentivo se as chaves de saque forem perdidas.

Separar as chaves de validador das chaves da conta Ethereum permite que vários validadores sejam executados por um único usuário. Com credenciais `0x02`, um validador pode reter até 2.048 ETH, de modo que um stake maior não precisa mais ser dividido entre muitos validadores.

<ValidatorKeysDiagram />

**Nota**: Um validador pode sair assinando uma [mensagem de saída voluntária (VEM)](https://mirror.xyz/ladislaus.eth/wmoBbUBes2Wp1_6DvP6slPabkyujSU7MZOFOC3QpErs&1) com a chave de validador. Desde a atualização Pectra, a [EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) também permite que o endereço de saque acione a saída de um validador e saques parciais para validadores `0x02`. Isso reduz as premissas de confiança ao permitir que os stakers que delegam ETH para [provedores de staking como serviço](/staking/saas/#what-is-staking-as-a-service) permaneçam no controle de seus fundos.

## Derivando chaves de uma frase semente {#deriving-keys-from-seed}

Se cada 32 ETH em staking exigisse um novo conjunto de 2 chaves completamente independentes, o gerenciamento de chaves rapidamente se tornaria inviável, especialmente para usuários que executam vários validadores. Em vez disso, várias chaves de validador podem ser derivadas de um único segredo comum e o armazenamento desse único segredo permite o acesso a várias chaves de validador.

[Mnemônicos](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) e caminhos são recursos proeminentes que os usuários frequentemente encontram quando [acessam](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0) suas carteiras. O mnemônico é uma sequência de palavras que atua como uma semente inicial para uma chave privada. Quando combinado com dados adicionais, o mnemônico gera um hash conhecido como 'chave mestra'. Isso pode ser pensado como a raiz de uma árvore. Os ramos dessa raiz podem então ser derivados usando um caminho hierárquico para que os nós filhos possam existir como combinações do hash de seu nó pai e seu índice na árvore. Leia sobre os padrões [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) e [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) para geração de chaves baseadas em mnemônicos.

Esses caminhos têm a seguinte estrutura, que será familiar para usuários que interagiram com carteiras de hardware:

```
m/44'/60'/0'/0
```

As barras neste caminho separam os componentes da chave privada da seguinte forma:

```
master_key / purpose / coin_type / account / change / address_index
```

Essa lógica permite que os usuários anexem o maior número possível de validadores a uma única **frase mnemônica** porque a raiz da árvore pode ser comum e a diferenciação pode acontecer nos ramos. O usuário pode **derivar qualquer número de chaves** da frase mnemônica.

```
      [m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

Cada ramo é separado por um `/`, então `m/2` significa começar com a chave mestra e seguir o ramo 2. As chaves de validador seguem a [EIP-2334](https://eips.ethereum.org/EIPS/eip-2334): o validador `i` obtém sua chave de saque em `m/12381/3600/i/0` e sua chave de assinatura em `m/12381/3600/i/0/0` (12381 identifica a curva BLS12-381, 3600 o tipo de moeda para chaves da camada de consenso).

<KeyDerivationDiagram />

## Leitura adicional {#further-reading}

- [Postagem no blog da Fundação Ethereum por Carl Beekhuizen](https://blog.ethereum.org/2020/05/21/keys)
- [Geração de chaves BLS12-381 da EIP-2333](https://eips.ethereum.org/EIPS/eip-2333)
- [EIP-7002: Saídas Acionadas pela Camada de Execução](https://web.archive.org/web/20250125035123/https://research.2077.xyz/eip-7002-unpacking-improvements-to-staking-ux-post-merge)
- [Gerenciamento de chaves em escala](https://docs.ethstaker.cc/ethstaker-knowledge-base/scaled-node-operators/key-management-at-scale)
