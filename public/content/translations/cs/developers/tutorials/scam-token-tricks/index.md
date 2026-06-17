---
title: "Některé triky používané podvodnými tokeny a jak je odhalit"
description: V tomto tutoriálu rozebereme podvodný token, abychom viděli některé triky, které podvodníci používají, jak je implementují a jak je můžeme odhalit.
author: Ori Pomerantz
tags: ["podvod", "Solidity", "ERC-20", "JavaScript", "TypeScript"]
skill: intermediate
breadcrumb: Triky podvodných tokenů
published: 2023-09-15
lang: cs
---

V tomto tutoriálu rozebereme [podvodný token](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), abychom viděli některé triky, které podvodníci používají, a jak je implementují. Na konci tutoriálu budete mít ucelenější pohled na kontrakty tokenů ERC-20, jejich možnosti a proč je nutná skepse. Poté se podíváme na události, které tento podvodný token vysílá, a uvidíme, jak můžeme automaticky identifikovat, že není legitimní.

## Podvodné tokeny – co to je, proč je lidé vytvářejí a jak se jim vyhnout {#scam-tokens}

Jedním z nejčastějších způsobů využití Etherea je vytvoření obchodovatelného tokenu určitou skupinou, v jistém smyslu jejich vlastní měny. Nicméně všude tam, kde existují legitimní případy užití přinášející hodnotu, se najdou i zločinci, kteří se tuto hodnotu snaží ukrást pro sebe.

Více si o tomto tématu z pohledu uživatele můžete přečíst [jinde na ethereum.org](/guides/how-to-id-scam-tokens/). Tento tutoriál se zaměřuje na rozebrání podvodného tokenu, abychom viděli, jak to funguje uvnitř a jak jej lze odhalit.

### Jak poznám, že je wARB podvod? {#warb-scam}

Token, který budeme rozebírat, je [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), jenž předstírá, že je ekvivalentem legitimního [tokenu ARB](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

Nejjednodušší způsob, jak poznat, který token je legitimní, je podívat se na původní organizaci, [Arbitrum](https://arbitrum.foundation/). Legitimní adresy jsou uvedeny [v jejich dokumentaci](https://docs.arbitrum.foundation/deployment-addresses#token).

### Proč je zdrojový kód dostupný? {#why-source}

Normálně bychom očekávali, že lidé, kteří se snaží podvést ostatní, budou tajnůstkářští, a skutečně mnoho podvodných tokenů svůj kód nezveřejňuje (například [tento](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) a [tento](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

Legitimní tokeny však obvykle svůj zdrojový kód zveřejňují, takže aby autoři podvodných tokenů působili legitimně, někdy dělají totéž. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) je jedním z těch tokenů, které mají zdrojový kód dostupný, což usnadňuje jeho pochopení.

Ačkoli si ti, kdo nasazují kontrakt, mohou vybrat, zda zdrojový kód zveřejní, nebo ne, _nemohou_ zveřejnit nesprávný zdrojový kód. Prohlížeč bloků nezávisle zkompiluje poskytnutý zdrojový kód, a pokud nezíská naprosto stejný bajtkód, tento zdrojový kód odmítne. [Více si o tom můžete přečíst na webu Etherscan](https://etherscan.io/verifyContract).

## Srovnání s legitimními tokeny ERC-20 {#compare-legit-erc20}

Tento token porovnáme s legitimními tokeny ERC-20. Pokud nejste obeznámeni s tím, jak se legitimní tokeny ERC-20 obvykle píší, [podívejte se na tento tutoriál](/developers/tutorials/erc20-annotated-code/).

### Konstanty pro privilegované adresy {#constants-for-privileged-addresses}

Kontrakty někdy potřebují privilegované adresy. Kontrakty, které jsou navrženy pro dlouhodobé používání, umožňují nějaké privilegované adrese tyto adresy změnit, například pro umožnění použití nového kontraktu multisig. Existuje několik způsobů, jak to udělat.

Kontrakt tokenu [`HOP`](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) používá vzor [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable). Privilegovaná adresa je uchovávána v úložišti, v poli zvaném `_owner` (viz třetí soubor, `Ownable.sol`).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

Kontrakt tokenu [`ARB`](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) nemá privilegovanou adresu přímo. Nicméně ji ani nepotřebuje. Nachází se za [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) na [adrese `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code). Tento kontrakt má privilegovanou adresu (viz čtvrtý soubor, `ERC1967Upgrade.sol`), kterou lze použít pro upgrady.

```solidity
    /**
     * @dev Ukládá novou adresu do EIP1967 admin slotu.
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

Naproti tomu kontrakt `wARB` má pevně zakódovanou adresu `contract_owner`.

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

[Tento vlastník kontraktu](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) není kontrakt, který by mohl být v různých časech ovládán různými účty, ale [externě vlastněný účet](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs). To znamená, že je pravděpodobně navržen pro krátkodobé použití jednotlivcem, spíše než jako dlouhodobé řešení pro kontrolu tokenu ERC-20, který si udrží svou hodnotu.

A skutečně, pokud se podíváme na Etherscan, uvidíme, že podvodník tento kontrakt používal pouze 12 hodin (od [první transakce](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) po [poslední transakci](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)) během 19. května 2023.

### Falešná funkce `_transfer` {#the-fake-transfer-function}

Je standardní, že skutečné převody probíhají pomocí [interní funkce `_transfer`](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer).

V `wARB` vypadá tato funkce téměř legitimně:

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

Podezřelá část je:

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

Pokud vlastník kontraktu odesílá tokeny, proč událost `Transfer` ukazuje, že pocházejí z `deployer`?

Je tu však důležitější problém. Kdo volá tuto funkci `_transfer`? Nemůže být volána zvenčí, je označena jako `internal`. A kód, který máme, neobsahuje žádná volání `_transfer`. Je zřejmé, že je zde jako volavka.

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

Když se podíváme na funkce, které jsou volány pro převod tokenů, `transfer` a `transferFrom`, vidíme, že volají úplně jinou funkci, `_f_`.

### Skutečná funkce `_f_` {#the-real-f-function}

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

V této funkci jsou dva potenciální varovné signály.

- Použití [modifikátoru funkce](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`. Když se však podíváme do zdrojového kódu, zjistíme, že `_mod_` je ve skutečnosti neškodný.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- Stejný problém, jaký jsme viděli u `_transfer`, a to ten, že když `contract_owner` odesílá tokeny, zdá se, že pocházejí z `deployer`.

### Funkce falešných událostí `dropNewTokens` {#the-fake-events-function-dropnewtokens}

Nyní se dostáváme k něčemu, co vypadá jako skutečný podvod. Funkci jsem trochu upravil pro lepší čitelnost, ale funkčně je ekvivalentní.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

Tato funkce má modifikátor `auth()`, což znamená, že ji může volat pouze vlastník kontraktu.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

Toto omezení dává naprostý smysl, protože bychom nechtěli, aby tokeny distribuovaly náhodné účty. Zbytek funkce je však podezřelý.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

Funkce pro převod z účtu fondu na pole příjemců s polem částek dává naprostý smysl. Existuje mnoho případů užití, kdy budete chtít distribuovat tokeny z jednoho zdroje do více cílů, jako jsou výplaty, airdropy atd. Je levnější (na gas) to provést v jediné transakci namísto vydávání více transakcí, nebo dokonce vícenásobného volání ERC-20 z jiného kontraktu v rámci stejné transakce.

Nicméně `dropNewTokens` to nedělá. Vysílá [události `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1), ale ve skutečnosti žádné tokeny nepřevádí. Neexistuje žádný legitimní důvod mást offchain aplikace tím, že jim budeme hlásit převod, ke kterému ve skutečnosti nedošlo.

### Spalovací funkce `Approve` {#the-burning-approve-function}

Kontrakty ERC-20 by měly mít [funkci `approve`](/developers/tutorials/erc20-annotated-code/#approve) pro povolené limity, a náš podvodný token takovou funkci skutečně má, a je dokonce správná. Protože však Solidity vychází z jazyka C, rozlišuje velká a malá písmena. „Approve“ a „approve“ jsou různé řetězce.

Navíc tato funkcionalita nesouvisí s `approve`.

```solidity
    function Approve(
        address[] memory holders)
```

Tato funkce je volána s polem adres držitelů tokenu.

```solidity
    public approver() {
```

Modifikátor `approver()` zajišťuje, že tuto funkci smí volat pouze `contract_owner` (viz níže).

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

Pro každou adresu držitele funkce přesune celý jeho zůstatek na adresu `0x00...01`, čímž jej efektivně spálí (skutečný `burn` ve standardu také mění celkovou zásobu a převádí tokeny na `0x00...00`). To znamená, že `contract_owner` může odstranit aktiva jakéhokoli uživatele. To nevypadá jako funkce, kterou byste chtěli u tokenu správy.

### Problémy s kvalitou kódu {#code-quality-issues}

Tyto problémy s kvalitou kódu _nedokazují_, že je tento kód podvod, ale působí kvůli nim podezřele. Organizované společnosti jako Arbitrum obvykle nevydávají takto špatný kód.

#### Funkce `mount` {#the-mount-function}

Ačkoli to není specifikováno ve [standardu](https://eips.ethereum.org/EIPS/eip-20), obecně se funkce, která vytváří nové tokeny, nazývá [`mint`](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).

Pokud se podíváme do konstruktoru `wARB`, uvidíme, že funkce pro ražení byla z nějakého důvodu přejmenována na `mount` a je volána pětkrát s pětinou počáteční zásoby, namísto toho, aby byla pro vyšší efektivitu zavolána jednou pro celou částku.

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

Samotná funkce `mount` je také podezřelá.

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

Při pohledu na `require` vidíme, že razit smí pouze vlastník kontraktu. To je legitimní. Chybová zpráva by však měla znít _only owner is allowed to mint_ (razit smí pouze vlastník) nebo něco podobného. Místo toho je tam irelevantní _ERC20: mint to the zero address_ (ERC20: ražení na nulovou adresu). Správný test pro ražení na nulovou adresu je `require(account != address(0), "<error message>")`, což se kontrakt vůbec neobtěžuje kontrolovat.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Existují další dvě podezřelá fakta, která přímo souvisejí s ražením:

- Je zde parametr `account`, což je pravděpodobně účet, který by měl obdržet vyraženou částku. Zůstatek, který se zvyšuje, však ve skutečnosti patří `contract_owner`.

- Ačkoli zvýšený zůstatek patří `contract_owner`, vyslaná událost ukazuje převod na `account`.

### Proč jak `auth`, tak `approver`? Proč `mod`, který nic nedělá? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

Tento kontrakt obsahuje tři modifikátory: `_mod_`, `auth` a `approver`.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` přijímá tři parametry a nic s nimi nedělá. Proč ho tam mít?

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

`auth` a `approver` dávají větší smysl, protože kontrolují, zda byl kontrakt zavolán z `contract_owner`. Očekávali bychom, že určité privilegované akce, jako je ražení, budou omezeny na tento účet. Jaký má ale smysl mít dvě samostatné funkce, které dělají _přesně to samé_?

## Co můžeme odhalit automaticky? {#what-can-we-detect-automatically}

Že je `wARB` podvodný token, můžeme zjistit pohledem na Etherscan. To je však centralizované řešení. Teoreticky by mohl být Etherscan kompromitován nebo hacknut. Je lepší umět nezávisle zjistit, zda je token legitimní, či nikoli.

Existují určité triky, které můžeme použít k identifikaci, že je token ERC-20 podezřelý (buď jde o podvod, nebo je velmi špatně napsaný), a to sledováním událostí, které vysílá.

## Podezřelé události `Approval` {#suspicious-approval-events}

[Události `Approval`](https://eips.ethereum.org/EIPS/eip-20#approval) by měly nastat pouze při přímém požadavku (na rozdíl od [událostí `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1), které mohou nastat v důsledku povoleného limitu). [Podívejte se do dokumentace Solidity](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin) pro podrobné vysvětlení tohoto problému a proč musí být požadavky přímé, a nikoli zprostředkované kontraktem.

To znamená, že události `Approval`, které schvalují útratu z [externě vlastněného účtu](/developers/docs/accounts/#types-of-account), musí pocházet z transakcí, které z tohoto účtu vycházejí a jejichž cílem je kontrakt ERC-20. Jakýkoli jiný druh schválení z externě vlastněného účtu je podezřelý.

Zde je [program, který tento druh události identifikuje](https://github.com/qbzzt/20230915-scam-token-detection), s využitím [Viem](https://viem.sh/) a [TypeScript](https://www.typescriptlang.org/docs/), varianty JavaScript s typovou bezpečností. Pro jeho spuštění:

1. Zkopírujte `.env.example` do `.env`.
2. Upravte `.env` tak, aby poskytoval URL k uzlu Ethereum Mainnet.
3. Spusťte `pnpm install` pro instalaci potřebných balíčků.
4. Spusťte `pnpm susApproval` pro vyhledání podezřelých schválení.

Zde je vysvětlení řádek po řádku:

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

Import definic typů, funkcí a definice řetězce z `viem`.

```typescript
import { config } from "dotenv"
config()
```

Přečtení `.env` pro získání URL.

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

Vytvoření klienta Viem. Potřebujeme pouze číst z blockchainu, takže tento klient nepotřebuje soukromý klíč.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

Adresa podezřelého kontraktu ERC-20 a bloky, ve kterých budeme hledat události. Poskytovatelé uzlů obvykle omezují naši schopnost číst události, protože šířka pásma může být drahá. Naštěstí `wARB` nebyl používán po dobu osmnácti hodin, takže můžeme vyhledat všechny události (celkem jich bylo pouze 13).

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

Toto je způsob, jak požádat Viem o informace o události. Když mu poskytneme přesný podpis události, včetně názvů polí, událost pro nás analyzuje.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

Náš algoritmus je použitelný pouze pro externě vlastněné účty. Pokud `client.getBytecode` vrátí nějaký bajtkód, znamená to, že se jedná o kontrakt a měli bychom jej jednoduše přeskočit.

Pokud jste TypeScript ještě nepoužívali, definice funkce může vypadat trochu zvláštně. Neříkáme mu jen to, že první (a jediný) parametr se jmenuje `addr`, ale také to, že je typu `Address`. Podobně část `: boolean` říká TypeScriptu, že návratová hodnota funkce je boolean.

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

Tato funkce získá stvrzenku transakce z události. Stvrzenku potřebujeme, abychom měli jistotu, že víme, jaký byl cíl transakce.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

Toto je nejdůležitější funkce, ta, která ve skutečnosti rozhoduje, zda je událost podezřelá, či nikoli. Návratový typ, `(Event | null)`, říká TypeScriptu, že tato funkce může vrátit buď `Event`, nebo `null`. Pokud událost není podezřelá, vrátíme `null`.

```typescript
const owner = ev.args._owner
```

Viem má názvy polí, takže událost pro nás analyzoval. `_owner` je vlastník tokenů, které mají být utraceny.

```typescript
// Schválení kontrakty nejsou podezřelá
if (await isContract(owner)) return null
```

Pokud je vlastníkem kontrakt, předpokládáme, že toto schválení není podezřelé. Abychom zkontrolovali, zda je schválení kontraktu podezřelé, či nikoli, museli bychom sledovat celé provedení transakce, abychom zjistili, zda se vůbec dostala ke kontraktu vlastníka a zda tento kontrakt zavolal kontrakt ERC-20 přímo. To je mnohem náročnější na zdroje, než bychom chtěli.

```typescript
const txn = await getEventTxn(ev)
```

Pokud schválení pochází z externě vlastněného účtu, získáme transakci, která jej způsobila.

```typescript
// Schválení je podezřelé, pokud pochází od vlastníka EOA, který není `from` transakce
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

Nemůžeme jednoduše kontrolovat shodu řetězců, protože adresy jsou hexadecimální, takže obsahují písmena. Někdy, například v `txn.from`, jsou tato písmena všechna malá. V jiných případech, jako je `ev.args._owner`, je adresa ve [smíšené velikosti písmen pro identifikaci chyb](https://eips.ethereum.org/EIPS/eip-55).

Pokud ale transakce nepochází od vlastníka a tento vlastník je externě vlastněný, pak máme podezřelou transakci.

```typescript
// Je také podezřelé, pokud cíl transakce není ERC-20 kontrakt, který
// zkoumáme
if (txn.to.toLowerCase() != testedAddress) return ev
```

Podobně, pokud adresa `to` transakce, tedy první volaný kontrakt, není vyšetřovaný kontrakt ERC-20, pak je to podezřelé.

```typescript
    // Pokud není důvod k podezření, vraťte null.
    return null
}
```

Pokud není splněna ani jedna z podmínek, pak událost `Approval` není podezřelá.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[Funkce `async`](https://www.w3schools.com/js/js_async.asp) vrací objekt `Promise`. S běžnou syntaxí, `await x()`, čekáme na splnění tohoto `Promise`, než budeme pokračovat ve zpracování. To je jednoduché na naprogramování a sledování, ale je to také neefektivní. Zatímco čekáme na splnění `Promise` pro konkrétní událost, můžeme už začít pracovat na další události.

Zde používáme [`map`](https://www.w3schools.com/jsref/jsref_map.asp) k vytvoření pole objektů `Promise`. Poté použijeme [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/), abychom počkali na vyřešení všech těchto příslibů (promises). Následně tyto výsledky [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) (vyfiltrujeme), abychom odstranili nepodezřelé události.

### Podezřelé události `Transfer` {#suspicious-transfer-events}

Dalším možným způsobem, jak identifikovat podvodné tokeny, je zjistit, zda nemají nějaké podezřelé převody. Například převody z účtů, které nemají tolik tokenů. Můžete se podívat, [jak tento test implementovat](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts), ale `wARB` tento problém nemá.

## Závěr {#conclusion}

Automatická detekce podvodů ERC-20 trpí [falešně negativními výsledky](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error), protože podvod může používat naprosto normální kontrakt tokenu ERC-20, který jen nepředstavuje nic skutečného. Proto byste se měli vždy snažit _získat adresu tokenu z důvěryhodného zdroje_.

Automatická detekce může pomoci v určitých případech, jako jsou součásti decentralizovaných financí (DeFi), kde je mnoho tokenů a je třeba s nimi zacházet automaticky. Ale jako vždy platí [caveat emptor](https://www.investopedia.com/terms/c/caveatemptor.asp) (kupující, měj se na pozoru), udělejte si vlastní průzkum a povzbuďte své uživatele, aby udělali totéž.

[Zde najdete více z mé práce](https://cryptodocguy.pro/).