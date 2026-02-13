---
title: "Alguns truques usados por tokens fraudulentos e como detectá-los"
description: "Neste tutorial, dissecamos um token fraudulento para ver alguns dos truques que os golpistas usam, como eles os implementam e como podemos detectá-los."
author: Ori Pomerantz
  Ori Pomerantz
tags:
  [
    "fraude",
    "solidity",
    "erc-20",
    "javascript",
    "typescript"
  ]
skill: intermediate
published: 2023-09-15
lang: pt-br
---

Neste tutorial, dissecamos [um token fraudulento](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) para ver alguns dos truques que os golpistas usam e como eles os implementam. Ao final do tutorial, você terá uma visão mais abrangente dos contratos de token ERC-20, suas capacidades e por que o ceticismo é necessário. Então, olhamos para os eventos emitidos por esse token fraudulento e vemos como podemos identificar que ele não é legítimo automaticamente.

## Tokens fraudulentos - o que são, por que as pessoas os criam e como evitá-los {#scam-tokens}

Um dos usos mais comuns do Ethereum é a criação por um grupo de pessoas de um token negociável que, de certa forma, criam sua própria moeda. Entretanto, sempre onde há casos de uso legítimos que agregam valor, também haverá criminosos que tentam roubar esse valor.

Você pode ler mais sobre este assunto [em outro lugar em ethereum.org](/guides/how-to-id-scam-tokens/) da perspectiva do usuário. Este tutorial foca em dissecar um token fraudulento para ver como é feito e como ele pode ser detectado.

### Como eu sei que o wARB é uma fraude? {#warb-scam}

O token que dissecamos é o [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), que finge ser equivalente ao [token ARB](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) legítimo.

A maneira mais fácil de saber qual é o token legítimo é olhar para a organização de origem, a [Arbitrum](https://arbitrum.foundation/). Os endereços legítimos são especificados [na documentação deles](https://docs.arbitrum.foundation/deployment-addresses#token).

### Por que o código-fonte está disponível? {#why-source}

Normalmente, esperaríamos que pessoas que tentam enganar outras fossem sigilosas e, de fato, muitos tokens fraudulentos não têm seu código disponível (por exemplo, [este](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) e [este](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

No entanto, os tokens legítimos geralmente publicam seu código-fonte, então, para parecerem legítimos, os autores de tokens fraudulentos às vezes fazem o mesmo. O [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) é um desses tokens com código-fonte disponível, o que facilita o seu entendimento.

Embora os implantadores de contratos possam escolher publicar ou não o código-fonte, eles _não podem_ publicar o código-fonte errado. O explorador de blocos compila o código-fonte fornecido de forma independente e, se não obtiver o mesmo bytecode exato, ele rejeita esse código-fonte. [Você pode ler mais sobre isso no site do Etherscan](https://etherscan.io/verifyContract).

## Comparação com tokens ERC-20 legítimos {#compare-legit-erc20}

Vamos comparar este token com tokens ERC-20 legítimos. Se você não está familiarizado com a forma como os tokens ERC-20 legítimos são normalmente escritos, [veja este tutorial](/developers/tutorials/erc20-annotated-code/).

### Constantes para endereços privilegiados {#constants-for-privileged-addresses}

Os contratos às vezes precisam de endereços privilegiados. Contratos projetados para uso a longo prazo permitem que alguns endereços privilegiados alterem esses endereços, por exemplo, para permitir o uso de um novo contrato multisig. Existem várias maneiras de fazer isso.

O [contrato do token `HOP`](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) usa o padrão [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable). O endereço privilegiado é mantido no armazenamento, em um campo chamado `_owner` (veja o terceiro arquivo, `Ownable.sol`).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

O [contrato do token `ARB`](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) não tem um endereço privilegiado diretamente. No entanto, ele não precisa de um. Ele está por trás de um [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) no [endereço `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code). Esse contrato tem um endereço privilegiado (veja o quarto arquivo, `ERC1967Upgrade.sol`) que pode ser usado para atualizações.

```solidity
    /**
     * @dev Armazena um novo endereço no slot de administrador do EIP1967.
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

Em contraste, o contrato `wARB` tem um `contract_owner` codificado permanentemente.

```solidity
contract WrappedArbitrum is Context, IERC20 {
    .
    .
    .
    address deployer = 0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1;
    address public contract_owner = 0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33;
    .
    .
    .
}
```

[Este proprietário do contrato](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) não é um contrato que poderia ser controlado por contas diferentes em momentos diferentes, mas uma [conta de propriedade externa](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs). Isso significa que ele provavelmente foi projetado para uso a curto prazo por um indivíduo, em vez de uma solução de longo prazo para controlar um ERC-20 que permanecerá valioso.

E, de fato, se olharmos no Etherscan, vemos que o golpista usou este contrato por apenas 12 horas ([primeira transação](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) até a [última transação](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)) durante o dia 19 de maio de 2023.

### A função `_transfer` falsa {#the-fake-transfer-function}

É padrão que as transferências reais aconteçam usando [uma função `_transfer` interna](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer).

No `wARB`, esta função parece quase legítima:

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

A parte suspeita é:

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

Se o proprietário do contrato envia tokens, por que o evento `Transfer` mostra que eles vêm do `deployer`?

No entanto, há um problema mais importante. Quem chama esta função `_transfer`? Não pode ser chamada de fora, ela está marcada como `internal`. E o código que temos não inclui nenhuma chamada para `_transfer`. Claramente, está aqui como uma isca.

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

Quando olhamos para as funções que são chamadas para transferir tokens, `transfer` e `transferFrom`, vemos que elas chamam uma função completamente diferente, `_f_`.

### A função `_f_` real {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

Há duas bandeiras vermelhas em potencial nesta função.

- O uso do [modificador de função](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`. No entanto, quando olhamos o código-fonte, vemos que `_mod_` é na verdade inofensivo.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- O mesmo problema que vimos em `_transfer`, que é quando o `contract_owner` envia tokens, eles parecem vir do `deployer`.

### A função de eventos falsos `dropNewTokens` {#the-fake-events-function-dropNewTokens}

Agora chegamos a algo que parece uma fraude real. Editei um pouco a função para facilitar a leitura, mas é funcionalmente equivalente.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

Esta função tem o modificador `auth()`, o que significa que só pode ser chamada pelo proprietário do contrato.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

Essa restrição faz todo o sentido, porque não queremos que contas aleatórias distribuam tokens. No entanto, o resto da função é suspeito.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

Uma função para transferir de uma conta de pool para uma matriz de receptores e uma matriz de valores faz todo o sentido. Existem muitos casos de uso em que você desejará distribuir tokens de uma única fonte para vários destinos, como folha de pagamento, airdrops, etc. É mais barato (em gás) fazer em uma única transação em vez de emitir várias transações, ou até mesmo chamar o ERC-20 várias vezes de um contrato diferente como parte da mesma transação.

No entanto, `dropNewTokens` não faz isso. Ele emite [eventos `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1), mas na verdade não transfere nenhum token. Não há razão legítima para confundir aplicações off-chain informando-as de uma transferência que não aconteceu de verdade.

### A função de queima `Approve` {#the-burning-approve-function}

Contratos ERC-20 devem ter [uma função `approve`](/developers/tutorials/erc20-annotated-code/#approve) para permissões e, de fato, nosso token fraudulento tem essa função, e ela está até correta. No entanto, como o Solidity descende do C, ele diferencia maiúsculas de minúsculas. "Approve" e "approve" são strings diferentes.

Além disso, a funcionalidade não está relacionada a `approve`.

```solidity
    function Approve(
        address[] memory holders)
```

Esta função é chamada com uma matriz de endereços para detentores do token.

```solidity
    public approver() {
```

O modificador `approver()` garante que apenas o `contract_owner` tenha permissão para chamar esta função (veja abaixo).

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: burn amount exceeds balance");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

Para cada endereço de detentor, a função move todo o saldo do detentor para o endereço `0x00...01`, efetivamente queimando-o (o `burn` real no padrão também altera o fornecimento total e transfere os tokens para `0x00...00`). Isso significa que o `contract_owner` pode remover os ativos de qualquer usuário. Isso não parece um recurso que você gostaria em um token de governança.

### Problemas de qualidade do código {#code-quality-issues}

Esses problemas de qualidade do código não _provam_ que este código é uma fraude, mas o tornam suspeito. Empresas organizadas como a Arbitrum geralmente não lançam códigos tão ruins.

#### A função `mount` {#the-mount-function}

Embora não seja especificado no [padrão](https://eips.ethereum.org/EIPS/eip-20), geralmente, a função que cria novos tokens é chamada de [`mint`](https://ethereum.org/el/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).

Se olharmos no construtor do `wARB`, vemos que a função de cunhagem foi renomeada para `mount` por algum motivo e é chamada cinco vezes com um quinto do fornecimento inicial, em vez de uma vez para o valor total por eficiência.

```solidity
    constructor () public {

        _name = "Wrapped Arbitrum";
        _symbol = "wARB";
        _decimals = 18;
        uint256 initialSupply = 1000000000000;

        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
    }
```

A própria função `mount` também é suspeita.

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

Olhando para o `require`, vemos que apenas o proprietário do contrato tem permissão para cunhar. Isso é legítimo. Mas a mensagem de erro deveria ser _apenas o proprietário tem permissão para cunhar_ ou algo parecido. Em vez disso, é o irrelevante _ERC20: cunhar para o endereço zero_. O teste correto para cunhagem para o endereço zero é `require(account != address(0), "<mensagem de erro>")`, que o contrato nunca se preocupa em verificar.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Existem mais dois fatos suspeitos, diretamente relacionados à cunhagem:

- Existe um parâmetro `account`, que é presumivelmente a conta que deve receber o valor cunhado. Mas o saldo que aumenta é na verdade o do `contract_owner`.

- Embora o saldo aumentado pertença ao `contract_owner`, o evento emitido mostra uma transferência para `account`.

### Por que tanto `auth` quanto `approver`? Por que o `mod` que não faz nada? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

Este contrato contém três modificadores: `_mod_`, `auth` e `approver`.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` recebe três parâmetros e não faz nada com eles. Por que tê-lo?

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }
```

`auth` e `approver` fazem mais sentido, porque verificam se o contrato foi chamado pelo `contract_owner`. Esperaríamos que certas ações privilegiadas, como a cunhagem, fossem limitadas a essa conta. No entanto, qual é o sentido de ter duas funções separadas que fazem _precisamente a mesma coisa_?

## O que podemos detectar automaticamente? {#what-can-we-detect-automatically}

Podemos ver que o `wARB` é um token fraudulento olhando no Etherscan. No entanto, essa é uma solução centralizada. Em teoria, o Etherscan poderia ser subvertido ou hackeado. É melhor ser capaz de descobrir independentemente se um token é legítimo ou não.

Existem alguns truques que podemos usar para identificar que um token ERC-20 é suspeito (seja uma fraude ou muito mal escrito), olhando para os eventos que eles emitem.

## Eventos `Approval` suspeitos {#suspicious-approval-events}

[Eventos de `Approval`](https://eips.ethereum.org/EIPS/eip-20#approval) devem ocorrer apenas com uma solicitação direta (em contraste com os [eventos de `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1), que podem ocorrer como resultado de uma permissão). [Veja a documentação do Solidity](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin) para uma explicação detalhada sobre este problema e por que as solicitações precisam ser diretas, em vez de mediadas por um contrato.

Isso significa que os eventos `Approval` que aprovam o gasto de uma [conta de propriedade externa](/developers/docs/accounts/#types-of-account) devem vir de transações que se originam nessa conta e cujo destino é o contrato ERC-20. Qualquer outro tipo de aprovação de uma conta de propriedade externa é suspeito.

Aqui está [um programa que identifica esse tipo de evento](https://github.com/qbzzt/20230915-scam-token-detection), usando [viem](https://viem.sh/) e [TypeScript](https://www.typescriptlang.org/docs/), uma variante do JavaScript com segurança de tipo. Para executá-lo:

1. Copie `.env.example` para `.env`.
2. Edite `.env` para fornecer o URL para um nó da rede principal do Ethereum.
3. Execute `pnpm install` para instalar os pacotes necessários.
4. Execute `pnpm susApproval` para procurar aprovações suspeitas.

Aqui está uma explicação linha por linha:

```typescript
import {
  Address,
  TransactionReceipt,
  createPublicClient,
  http,
  parseAbiItem,
} from "viem"
import { mainnet } from "viem/chains"
```

Importe definições de tipo, funções e a definição da cadeia de `viem`.

```typescript
import { config } from "dotenv"
config()
```

Leia `.env` para obter o URL.

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

Crie um cliente Viem. Só precisamos ler da blockchain, então este cliente não precisa de uma chave privada.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

O endereço do contrato ERC-20 suspeito e os blocos dentro dos quais procuraremos por eventos. Os provedores de nó normalmente limitam nossa capacidade de ler eventos porque a largura de banda pode ficar cara. Felizmente, o `wARB` não foi usado por um período de dezoito horas, então podemos procurar por todos os eventos (havia apenas 13 no total).

```typescript
const approvalEvents = await client.getLogs({
  address: testedAddress,
  fromBlock,
  toBlock,
  event: parseAbiItem(
    "event Approval(address indexed _owner, address indexed _spender, uint256 _value)"
  ),
})
```

Esta é a maneira de solicitar informações de eventos ao Viem. Quando fornecemos a assinatura exata do evento, incluindo os nomes dos campos, ele analisa o evento para nós.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

Nosso algoritmo é aplicável apenas a contas de propriedade externa. Se houver algum bytecode retornado por `client.getBytecode`, isso significa que se trata de um contrato e devemos simplesmente pulá-lo.

Se você nunca usou o TypeScript antes, a definição da função pode parecer um pouco estranha. Não apenas dizemos que o primeiro (e único) parâmetro é chamado `addr`, mas também que ele é do tipo `Address`. Da mesma forma, a parte `: boolean` diz ao TypeScript que o valor de retorno da função é um booleano.

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

Esta função obtém o recibo da transação de um evento. Precisamos do recibo para garantir que sabemos qual foi o destino da transação.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

Esta é a função mais importante, a que realmente decide se um evento é suspeito ou não. O tipo de retorno, `(Event | null)`, informa ao TypeScript que esta função pode retornar um `Event` ou `null`. Retornamos `null` se o evento não for suspeito.

```typescript
const owner = ev.args._owner
```

O Viem tem os nomes dos campos, então ele analisou o evento para nós. `_owner` é o proprietário dos tokens a serem gastos.

```typescript
// Aprovações por contratos não são suspeitas
if (await isContract(owner)) return null
```

Se o proprietário for um contrato, presuma que essa aprovação não é suspeita. Para verificar se a aprovação de um contrato é suspeita ou não, precisaremos rastrear a execução completa da transação para ver se ela chegou ao contrato do proprietário e se esse contrato chamou o contrato ERC-20 diretamente. Isso consome muito mais recursos do que gostaríamos.

```typescript
const txn = await getEventTxn(ev)
```

Se a aprovação vier de uma conta de propriedade externa, obtenha a transação que a causou.

```typescript
// A aprovação é suspeita se vier de um proprietário de EOA que não é o `from` da transação
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

Não podemos simplesmente verificar a igualdade de strings porque os endereços são hexadecimais, então eles contêm letras. Às vezes, por exemplo em `txn.from`, essas letras são todas minúsculas. Em outros casos, como `ev.args._owner`, o endereço está em [maiúsculas e minúsculas misturadas para identificação de erros](https://eips.ethereum.org/EIPS/eip-55).

Mas se a transação não for do proprietário, e esse proprietário for de propriedade externa, então temos uma transação suspeita.

```typescript
// Também é suspeito se o destino da transação não for o contrato ERC-20 que estamos
// investigando
if (txn.to.toLowerCase() != testedAddress) return ev
```

Da mesma forma, se o endereço `to` da transação, o primeiro contrato chamado, não for o contrato ERC-20 sob investigação, então é suspeito.

```typescript
    // Se não houver motivo para suspeitar, retorne nulo.
    return null
}
```

Se nenhuma das condições for verdadeira, o evento `Approval` não é suspeito.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[Uma função `async`](https://www.w3schools.com/js/js_async.asp) retorna um objeto `Promise`. Com a sintaxe comum, `await x()`, esperamos que essa `Promise` seja cumprida antes de continuarmos o processamento. Isso é simples de programar e seguir, mas também é ineficiente. Enquanto esperamos que a `Promise` de um evento específico seja cumprida, já podemos começar a trabalhar no próximo evento.

Aqui usamos [`map`](https://www.w3schools.com/jsref/jsref_map.asp) para criar uma matriz de objetos `Promise`. Em seguida, usamos [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) para esperar que todas essas promessas sejam resolvidas. Em seguida, [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) esses resultados para remover os eventos não suspeitos.

### Eventos `Transfer` suspeitos {#suspicious-transfer-events}

Outra maneira possível de identificar tokens fraudulentos é ver se eles têm alguma transferência suspeita. Por exemplo, transferências de contas que não têm tantos tokens. Você pode ver [como implementar este teste](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts), mas o `wARB` não tem este problema.

## Conclusão {#conclusion}

A detecção automatizada de fraudes ERC-20 sofre de [falsos negativos](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error), porque uma fraude pode usar um contrato de token ERC-20 perfeitamente normal que simplesmente não representa nada real. Portanto, você deve sempre tentar _obter o endereço do token de uma fonte confiável_.

A detecção automatizada pode ajudar em certos casos, como peças de DeFi, onde há muitos tokens e eles precisam ser tratados automaticamente. Mas como sempre [caveat emptor](https://www.investopedia.com/terms/c/caveatemptor.asp), faça sua própria pesquisa e incentive seus usuários a fazerem o mesmo.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).
