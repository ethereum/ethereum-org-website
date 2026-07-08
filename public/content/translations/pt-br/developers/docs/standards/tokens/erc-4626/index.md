---
title: "Padrão de Cofre Tokenizado ERC-4626"
description: "Um padrão para cofres geradores de rendimento."
lang: pt-br
---

## Introdução {#introduction}

O ERC-4626 é um padrão para otimizar e unificar os parâmetros técnicos de cofres geradores de rendimento. Ele fornece uma API padrão para cofres geradores de rendimento tokenizados que representam cotas de um único token ERC-20 subjacente. O ERC-4626 também descreve uma extensão opcional para cofres tokenizados utilizando ERC-20, oferecendo funcionalidade básica para depositar, sacar tokens e ler saldos.

**O papel do ERC-4626 em cofres geradores de rendimento**

Mercados de empréstimo, agregadores e tokens intrinsecamente geradores de juros ajudam os usuários a encontrar o melhor rendimento em seus tokens cripto executando diferentes estratégias. Essas estratégias são feitas com pequenas variações, o que pode ser propenso a erros ou desperdiçar recursos de desenvolvimento.

O ERC-4626 em cofres geradores de rendimento reduzirá o esforço de integração e desbloqueará o acesso ao rendimento em várias aplicações com pouco esforço especializado dos desenvolvedores, criando padrões de implementação mais consistentes e robustos.

O token ERC-4626 é totalmente descrito no [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**Extensão de cofre assíncrono (ERC-7540)**

O ERC-4626 é otimizado para depósitos e resgates atômicos até um limite. Se o limite for atingido, nenhum novo depósito ou resgate poderá ser enviado. Essa limitação não funciona bem para nenhum sistema de contrato inteligente com ações assíncronas ou atrasos como pré-requisito para interagir com o Cofre (por exemplo, protocolos de ativos do mundo real, protocolos de empréstimo subcolateralizados, protocolos de empréstimo cross-chain, tokens de staking líquido ou módulos de segurança de seguros).

O ERC-7540 expande a utilidade dos Cofres ERC-4626 para casos de uso assíncronos. A interface existente do Cofre (`deposit`/`withdraw`/`mint`/`redeem`) é totalmente utilizada para reivindicar Solicitações assíncronas.

A extensão ERC-7540 é totalmente descrita no [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**Extensão de cofre de múltiplos ativos (ERC-7575)**

Um caso de uso ausente que não é suportado pelo ERC-4626 são os Cofres que possuem múltiplos ativos ou pontos de entrada, como Tokens de provedor de liquidez (LP). Estes são geralmente difíceis de manejar ou não conformes devido ao requisito do ERC-4626 de ser ele próprio um ERC-20.

O ERC-7575 adiciona suporte para Cofres com múltiplos ativos externalizando a implementação do token ERC-20 da implementação do ERC-4626.

A extensão ERC-7575 é totalmente descrita no [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575).

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, recomendamos que você leia primeiro sobre [padrões de token](/developers/docs/standards/tokens/) e [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Funções e Recursos do ERC-4626: {#body}

### Métodos {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Esta função retorna o endereço do token subjacente usado para o cofre para contabilidade, depósitos e saques.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Esta função retorna a quantidade total de ativos subjacentes mantidos pelo cofre.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Esta função retorna a quantidade de `shares` que seria trocada pelo cofre pela quantidade de `assets` fornecida.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Esta função retorna a quantidade de `assets` que seria trocada pelo cofre pela quantidade de `shares` fornecida.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Esta função retorna a quantidade máxima de ativos subjacentes que podem ser depositados em uma única chamada [`deposit`](#deposit), com as cotas cunhadas para o `receiver`.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Esta função permite aos usuários simular os efeitos de seu depósito no bloco atual.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Esta função deposita `assets` de tokens subjacentes no cofre e concede a propriedade de `shares` para `receiver`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Esta função retorna a quantidade máxima de cotas que podem ser cunhadas em uma única chamada [`mint`](#mint), com as cotas cunhadas para o `receiver`.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Esta função permite aos usuários simular os efeitos de sua cunhagem no bloco atual.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Esta função cunha exatamente `shares` cotas do cofre para `receiver` depositando `assets` de tokens subjacentes.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Esta função retorna a quantidade máxima de ativos subjacentes que podem ser sacados do saldo de `owner` com uma única chamada [`withdraw`](#withdraw).

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Esta função permite aos usuários simular os efeitos de seu saque no bloco atual.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Esta função queima `shares` de `owner` e envia exatamente `assets` token do cofre para `receiver`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Esta função retorna a quantidade máxima de cotas que podem ser resgatadas do saldo de `owner` através de uma chamada [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Esta função permite aos usuários simular os efeitos de seu resgate no bloco atual.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Esta função resgata um número específico de `shares` de `owner` e envia `assets` de token subjacente do cofre para `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Retorna o número total de cotas do cofre não resgatadas em circulação.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Retorna a quantidade total de cotas do cofre que `owner` possui atualmente.

### Mapa da interface {#mapoftheinterface}

![Map of the ERC-4626 interface](./map-of-erc-4626.png)

### Eventos {#events}

#### Evento de Depósito {#deposit-event}

**DEVE** ser emitido quando tokens são depositados no cofre através dos métodos [`mint`](#mint) e [`deposit`](#deposit).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Onde `sender` é o usuário que trocou `assets` por `shares`, e transferiu essas `shares` para `owner`.

#### Evento de Saque {#withdraw-event}

**DEVE** ser emitido quando cotas são sacadas do cofre por um depositante nos métodos [`redeem`](#redeem) ou [`withdraw`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Onde `sender` é o usuário que acionou o saque e trocou `shares`, de propriedade de `owner`, por `assets`. `receiver` é o usuário que recebeu os `assets` sacados.

## Leitura adicional {#further-reading}

- [EIP-4626: Padrão de cofre tokenizado](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: Repositório no GitHub](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)