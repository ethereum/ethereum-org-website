---
title: Padrão de cofre tokenizado ERC-4626
description: Um padrão para os cofres de rendimento.
lang: pt-br
---

## Introdução {#introduction}

O ERC-4626 é um padrão para otimizar e unificar os parâmetros técnicos dos cofres de rendimento. Ele fornece uma API padrão para cofres com rendimentos tokenizados que representam partes de um único token ERC-20 subjacente. O ERC-4626 também delineia uma extensão opcional para cofres tokenizados que utilizam ERC-20, oferecendo funcionalidade básica para depósito, retirada de tokens e leitura de saldos.

**O papel do ERC-4626 nos cofres de rendimento**

Mercados de empréstimo, agregadores e tokens intrinsecamente de rendimento ajudam os usuários a encontrar o melhor rendimento em seus tokens de cripto executando diferentes estratégias. Estas estratégias são realizadas com ligeiras variações, que podem ser propensas a erros ou desperdiçar recursos de desenvolvimento.

O ERC-4626 nos cofres de rendimento reduzirá o esforço de integração e desbloqueará o acesso a rendimentos em várias aplicações, com pouco esforço especializado dos desenvolvedores, criando padrões de implementação mais consistentes e robustos.

O token ERC-4626 é descrito em mais detalhes em [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, recomendamos que você leia primeiro sobre [padrões de tokens](/developers/docs/standards/tokens/) e [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Funções e características do ERC-4626: {#body}

### Métodos {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address)
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

Esta função retorna a quantidade de `shares` que seriam intercambiadas pelo cofre pela quantidade de `assets` fornecidos.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Esta função retorna a quantidade de `assets` que seriam intercambiadas pelo cofre pela quantidade de `shares` fornecidos.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256)
```

Esta função retorna a quantidade máxima de ativos subjacentes que podem ser depositados em um único [`deposit`](#deposit) chamado pelo `receiver`.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256)
```

Esta função permite aos usuários simular os efeitos de seu depósito no bloco atual.

#### depositar {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Esta função deposita `assets` de tokens subjacentes no cofre e concede a propriedade de `shares` para o `receiver`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256)
```

Esta função retorna a quantidade máxima de ativos subjacentes que podem ser mintados em um único [`mint`](#mint) chamado pelo `receiver`.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256)
```

Esta função permite aos usuários simular os efeitos de seu mint no bloco atual.

#### cunhar {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Esta função minta exatamente `shares` no cofre para o `receiver` depositando `assets` dos tokens subjacentes.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256)
```

Esta função retorna a quantidade máxima de ativos subjacentes que podem ser retirados do saldo do `owner` com uma única chamada [`withdraw`](#withdraw).

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256)
```

Esta função permite aos usuários simular os efeitos da sua retirada no bloco atual.

#### sacar {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Esta função queima `shares` do `owner` e envia exatamente tokens `assets` do cofre para o `receiver`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256)
```

Essa função retorna a quantidade máxima de ações que podem ser resgatadas do saldo do `owner` com uma chamada de [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256)
```

Essa função permite aos usuários simular os efeitos de seu resgate no bloco atual.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Essa função resgata um número específico de `shares` do `owner` e envia `assets` do token subjacente do cofre para o `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Retorna o número total de shares não resgatadas do cofre em circulação.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Retorna a quantidade total de shares do cofre que o `owner` tem atualmente.

### Eventos {#events}

#### Evento de depósito

**PRECISA** ser emitido quando os tokens são depositados no cofre por meio dos métodos [`mint`](#mint) e [`deposit`](#deposit)

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Em que `sender` é o usuário que trocou `assets` por `shares` e transferiu aquelas `shares` para o `owner`.

#### Evento de retirada

**PRECISA** ser emitido quando as shares são retiradas do cofre por um depositante nos métodos de [`redeem`](#redeem) ou [`withdraw`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 share
)
```

Em que `sender` é o usuário que acionou a retirada e trocou `shares`, de propriedade do `owner`, por `assets`. `receiver` é o usuário que recebeu os `assets ` retirados.

## Leitura adicional {#further-reading}

- [EIP-4626: Padrão do cofre tokenizado](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub Repo](https://github.com/Rari-Capital/solmate/blob/main/src/mixins/ERC4626.sol)
