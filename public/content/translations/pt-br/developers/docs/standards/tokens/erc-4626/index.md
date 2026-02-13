---
title: "Padrão de cofre tokenizado ERC-4626"
description: "Um padrão para os cofres de rendimento."
lang: pt-br
---

## Introdução {#introduction}

O ERC-4626 é um padrão para otimizar e unificar os parâmetros técnicos dos cofres de rendimento. Ele fornece uma API padrão para cofres com rendimentos tokenizados que representam partes de um único token ERC-20 subjacente. O ERC-4626 também delineia uma extensão opcional para cofres tokenizados que utilizam ERC-20, oferecendo funcionalidade básica para depósito, retirada de tokens e leitura de saldos.

**O papel do ERC-4626 nos cofres de rendimento**

Mercados de empréstimo, agregadores e tokens intrinsecamente de rendimento ajudam os usuários a encontrar o melhor rendimento em seus tokens de cripto executando diferentes estratégias. Estas estratégias são realizadas com ligeiras variações, que podem ser propensas a erros ou desperdiçar recursos de desenvolvimento.

O ERC-4626 nos cofres de rendimento reduzirá o esforço de integração e desbloqueará o acesso a rendimentos em várias aplicações, com pouco esforço especializado dos desenvolvedores, criando padrões de implementação mais consistentes e robustos.

O token ERC-4626 é descrito por completo em [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**Extensão assíncrona de cofre (ERC-7540)**

O ERC-4626 é otimizado para depósitos e resgates atômicos até um limite. Se o limite for atingido, nenhum novo depósito ou resgate poderá ser enviado. Essa limitação não funciona bem para qualquer sistema de contrato inteligente com ações assíncronas ou atrasos como pré-requisito para interagir com o Cofre (por exemplo, protocolos de ativos do mundo real, protocolos de empréstimos subcolateralizados, protocolos de empréstimos cross-chain, tokens de staking líquido ou módulos de segurança de seguro).

O ERC-7540 amplia a utilidade dos cofres ERC-4626 para casos de uso assíncronos. A interface de Cofre existente (`deposit`/`withdraw`/`mint`/`redeem`) é totalmente utilizada para reivindicar Solicitações assíncronas.

A extensão ERC-7540 é descrita por completo em [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**Extensão de cofre multiativo (ERC-7575)**

Um caso de uso ausente que não é suportado pelo ERC-4626 são cofres que possuem múltiplos ativos ou pontos de entrada, como tokens de provedor de liquidez (LP tokens). Esses casos geralmente são difíceis de manejar ou não compatíveis devido ao requisito de que o ERC-4626 seja, por si só, um ERC-20.

O ERC-7575 adiciona suporte a cofres com múltiplos ativos ao externalizar a implementação do token ERC-20 da implementação do ERC-4626.

A extensão ERC-7575 é descrita por completo em [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575).

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, recomendamos que você leia primeiro sobre [padrões de token](/developers/docs/standards/tokens/) e [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Funções e recursos do ERC-4626: {#body}

### Métodos {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Esta função retorna o endereço do token subjacente usado para o cofre para contabilidade, depósito, retirada.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Esta função retorna a quantidade total de ativos subjacentes mantidos pelo cofre.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Esta função retorna a quantidade de `shares` que seriam trocadas pelo cofre pela quantidade de `assets` fornecida.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Esta função retorna a quantidade de `assets` que seriam trocados pelo cofre pela quantidade de `shares` fornecida.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Esta função retorna a quantidade máxima de ativos subjacentes que podem ser depositados em uma única chamada de [`deposit`](#deposit), com as shares mintadas para o `receiver`.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Esta função permite aos usuários simular os efeitos de seu depósito no bloco atual.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Esta função deposita `assets` de tokens subjacentes no cofre e concede a propriedade de `shares` ao `receiver`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Esta função retorna a quantidade máxima de shares que podem ser mintadas em uma única chamada de [`mint`](#mint), com as shares mintadas para o `receiver`.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Esta função permite aos usuários simular os efeitos de seu mint no bloco atual.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Esta função minta exatamente `shares` de cofre para o `receiver`, depositando `assets` de tokens subjacentes.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Esta função retorna a quantidade máxima de ativos subjacentes que podem ser sacados do saldo do `owner` com uma única chamada de [`withdraw`](#withdraw).

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Esta função permite aos usuários simular os efeitos da sua retirada no bloco atual.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Esta função queima `shares` do `owner` e envia exatamente `assets` de token do cofre para o `receiver`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Esta função retorna a quantidade máxima de shares que podem ser resgatadas do saldo do `owner` por meio de uma chamada de [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Essa função permite aos usuários simular os efeitos de seu resgate no bloco atual.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Esta função resgata um número específico de `shares` do `owner` e envia `assets` do token subjacente do cofre para o `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Retorna o número total de shares não resgatadas do cofre em circulação.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Retorna a quantidade total de shares do cofre que o `owner` possui atualmente.

### Mapa da interface {#mapOfTheInterface}

![Mapa da interface ERC-4626](./map-of-erc-4626.png)

### Eventos {#events}

#### Evento de depósito

**DEVE** ser emitido quando tokens são depositados no cofre através dos métodos [`mint`](#mint) e [`deposit`](#deposit).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Onde `sender` é o usuário que trocou `assets` por `shares` e transferiu essas `shares` para o `owner`.

#### Evento de retirada

**DEVE** ser emitido quando shares são sacadas do cofre por um depositante nos métodos [`redeem`](#redeem) ou [`withdraw`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Onde `sender` é o usuário que acionou o saque e trocou `shares`, de propriedade do `owner`, por `assets`. `receiver` é o usuário que recebeu os `assets` sacados.

## Leitura adicional {#further-reading}

- [EIP-4626: Padrão de Cofre Tokenizado](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: Repositório no GitHub](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
