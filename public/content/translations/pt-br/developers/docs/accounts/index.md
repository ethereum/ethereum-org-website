---
title: Contas Ethereum
description: Uma explicação das contas Ethereum – suas estruturas de dados e sua relação com a criptografia de pares de chaves.
lang: pt-br
---

Uma conta Ethereum é uma entidade com um saldo de ether (ETH) que pode enviar transações no Ethereum. As contas podem ser controladas pelo usuário ou implementadas como contratos inteligentes.

## Pré-requisitos {#prerequisites}

Para ajudá-lo a entender melhor esta página, recomendamos que você primeiro leia nossa [introdução ao Ethereum](/developers/docs/intro-to-ethereum/).

## Tipos de conta {#types-of-account}

Ethereum tem dois tipos de contas:

- Conta de propriedade externa (EOA) — controlada por qualquer pessoa com as chaves privadas
- Conta de contrato — um contrato inteligente implantado na rede, controlado por código. Saiba mais sobre [contratos inteligentes](/developers/docs/smart-contracts/)

Ambos os tipos de conta têm capacidade para:

- Receber, guardar e enviar ETH e tokens
- Interagir com contratos inteligentes implementados

### Principais diferenças {#key-differences}

**Propriedade externa**

- Não há custo para criar uma conta
- Pode iniciar transações
- Transações entre contas de propriedade externa só podem ser transferências de ETH/token
- Composto por um par de chaves criptográficas: chaves públicas e privadas que controlam as atividades da conta

**Contrato**

- Criar um contrato tem um custo porque você está usando o armazenamento de rede
- Só pode enviar transações em resposta ao recebimento de transação
- Transações de uma conta externa para uma conta contrato podem acionar um código que pode executar muitas ações diferentes, como transferir tokens ou até mesmo criar um contrato
- As contas de contrato não têm chaves privadas. Em vez disso, eles são controlados pela lógica do código do contrato inteligente

## Uma conta analisada {#an-account-examined}

As contas Ethereum têm quatro campos:

- `nonce` – Um contador que indica o número de transações enviadas de uma conta de propriedade externa ou o número de contratos criados por uma conta de contrato. Apenas uma transação com um dado nonce pode ser executada para cada conta, protegendo contra ataques de repetição em que as transações assinadas são repetidamente transmitidas e reexecutadas.
- `balance` – o número de Wei pertencentes a este endereço. Wei é uma denominação de ETH e existem 1e + 18 Wei por ETH.
- `codeHash` - este hash se refere ao _código_ de uma conta na máquina virtual Ethereum (EVM). Contas contratuais têm fragmentos de código programados que podem executar diferentes operações. Este código EVM é executado se a conta receber uma chamada de mensagem. Diferentemente dos outros campos da conta, ele não pode ser alterado. Todos esses fragmentos de código estão contidos na base de dados de estados sob suas hashes correspondentes para recuperação posterior. Este valor de hash é conhecido como codeHash. Para contas de propriedade externa, o campo codeHash é o hash de uma “string” vazia.
- `storageRoot` – Às vezes conhecido como um hash de armazenamento. Um hash de 256 bits do nó raiz de uma árvore de Merkle que codifica o conteúdo de armazenamento da conta (um mapeamento entre valores inteiros de 256 bits), codificado para o mapeamento a partir do hash Keccak de 256 bits das chaves inteiras de 256 bits para os valores inteiros codificados no RLP-256 bits. Esta árvore codifica o hash do conteúdo de armazenamento desta conta e está vazia por padrão.

![Um diagrama mostrando a criação de uma conta](./accounts.png) _Diagrama adaptado do [Ethereum EVM ilustrado](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Contas de propriedade externa e pares de chaves {#externally-owned-accounts-and-key-pairs}

Uma conta é composta de um par de chaves criptográficas: pública e privada. Eles ajudam a provar que uma transação foi realmente assinada pelo remetente e evitam falsificações. Sua chave privada é o que você usa para assinar transações, portanto, concede a você a custódia dos fundos associados à sua conta. Você nunca tem criptomoeda, você tem chaves privadas - os fundos estão sempre no livro-razão do Ethereum.

Isso evita que agentes mal-intencionados transmitam transações falsas, porque você sempre pode verificar o remetente de uma transação.

Se Alice quer enviar ether da sua própria conta para a conta do Bob, Alice precisa criar um pedido de transação e enviá-lo para a rede para verificação. O uso da criptografia de chave pública na Ethereum, garante que a Alice possa provar que foi ela quem iniciou originalmente o pedido de transação. Sem mecanismos criptográficos, um adversário malicioso "Eve" poderia simplesmente transmitir publicamente uma solicitação como “enviar 5 ETH da conta de Alice para a conta de Eve", e ninguém poderia verificar que a transmissão não veio da Alice.

## Criação de conta {#account-creation}

Quando você quiser criar uma conta, a maioria das bibliotecas vai gerar uma chave privada aleatória.

Uma chave privada é composta por 64 caracteres hexadecimais e pode ser criptografada com uma senha.

Exemplo:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

A chave pública é gerada a partir da chave privada usando o [Algoritmo de assinatura digital da curva elíptica](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). Você recebe um endereço público para sua conta a partir dos últimos 20 “bytes” do hash Keccak-256 da chave pública e adiciona `0x` no início.

Isso significa que uma Conta de Propriedade Externa (EOA) possui um endereço de 42 caracteres (um segmento de 20 bytes, que corresponde a 40 caracteres hexadecimais mais o prefixo `0x`).

Exemplo:

`0x5e97870f263700f46aa00d967821199b9bc5a120`

O exemplo a seguir mostra como usar uma ferramenta de assinatura chamada [Clef](https://geth.ethereum.org/docs/tools/clef/introduction) para gerar uma nova conta. Clef é uma ferramenta de assinatura e gerenciamento de contas que vem com o cliente Ethereum, [Geth](https://geth.ethereum.org). O comando `clef newaccount` cria um novo par de chaves e os salva em um repositório de chaves criptografado.

```
> clef newaccount --keystore <path>

Please enter a password for the new account to be created:
> <password>

------------
INFO [10-28|16:19:09.156] Your new key was generated       address=0x5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please backup your key file      path=/home/user/go-ethereum/data/keystore/UTC--2022-10-28T15-19-08.000825927Z--5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please remember your password!
Generated account 0x5e97870f263700f46aa00d967821199b9bc5a120
```

[Documentação do Geth](https://geth.ethereum.org/docs)

É possível obter novas chaves públicas de sua chave privada, mas você não pode obter uma chave privada de chaves públicas. É fundamental manter suas chaves privadas seguras e, como o nome sugere, **PRIVADAS**.

Você precisa de uma chave privada para assinar mensagens e transações que resultam em uma assinatura. Outros podem então pegar a assinatura derivada da sua chave pública, provando a autoria da mensagem. Em seu aplicativo, é possível usar uma biblioteca JavaScript para enviar transações para a rede.

## Contas de contrato {#contract-accounts}

As contas contratuais também têm um endereço hexadecimal de 42 caracteres:

Exemplo:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

O endereço do contrato é geralmente dado quando um contrato é implantado na Blockchain do Ethereum. O endereço vem do endereço do criador e do número de transações enviadas desse endereço (o “nonce”).

## Chaves de validação {#validators-keys}

Há também outro tipo de chave no Ethereum, introduzida quando o Ethereum mudou de prova de trabalho para prova de participação baseado no consenso. Essas chaves são "BLS" e são usadas para identificar validadores. Essas chaves podem ser agregadas de forma eficiente para reduzir a largura de banda necessária para que a rede chegue a um consenso. Sem essa agregação de chaves, a participação mínima para um validador seria muito maior.

[Mais sobre chaves de validação](/developers/docs/consensus-mechanisms/pos/keys/).

## Observação sobre carteiras {#a-note-on-wallets}

Uma conta não é uma carteira. Uma carteira é uma interface ou aplicativo que permite interagir com sua conta Ethereum, seja uma conta de propriedade externa ou uma conta de contrato.

## Uma demonstração visual {#a-visual-demo}

Assista a Austin mostrando passo a passo as funções de hash e os pares de chaves.

<YouTube id="QJ010l-pBpE" />

<YouTube id="9LtBDy67Tho" />

## Leitura adicional {#further-reading}

- [Entendendo Contas Ethereum](https://info.etherscan.com/understanding-ethereum-accounts/) - etherscan

_Conhece algum recurso da comunidade que o ajudou? Edite essa página e adicione-a!_

## Tópicos relacionados {#related-topics}

- [Contratos inteligentes](/developers/docs/smart-contracts/)
- [Transações](/developers/docs/transactions/)
