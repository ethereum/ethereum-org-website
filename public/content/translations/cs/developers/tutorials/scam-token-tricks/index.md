---
title: "Některé triky používané podvodnými tokeny a jak je odhalit"
description: V tomto tutoriálu rozebereme podvodný token, abychom se podívali na některé triky, které podvodníci používají, jak je implementují a jak je můžeme odhalit.
author: Ori Pomerantz
tags:
  [
    "podvod",
    "solidity",
    "erc-20",
    "javascript",
    "typescript"
  ]
skill: intermediate
published: 2023-09-15
lang: cs
---

V tomto tutoriálu rozebereme [podvodný token](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), abychom se podívali na některé triky, které podvodníci používají a jak je implementují. Na konci tohoto tutoriálu získáte komplexnější pohled na smlouvy o tokenech ERC-20, jejich možnosti a důvody, proč je nutná skepse. Poté se podíváme na události emitované tímto podvodným tokenem a zjistíme, jak můžeme automaticky identifikovat, že není legitimní.

## Podvodné tokeny – co jsou, proč je lidé vytvářejí a jak se jim vyhnout {#scam-tokens}

Jedním z nejčastějších způsobů využití Etherea je vytvoření obchodovatelného tokenu pro skupinu, v podstatě jejich vlastní měny. Kdekoliv, kde existují legitimní případy použití, které přinášejí hodnotu, se také objevují i zločinci, kteří se snaží tuto hodnotu ukrást pro sebe.

Více si o tomto tématu můžete přečíst [jinde na ethereum.org](/guides/how-to-id-scam-tokens/) z pohledu uživatele. Tento tutoriál se zaměřuje na rozebrání podvodného tokenu, abychom zjistili, jak je vytvořen a jak jej lze odhalit.

### Jak poznám, že wARB je podvod? {#warb-scam}

Token, který rozebíráme, je [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), který se tváří jako ekvivalent legitimního [tokenu ARB](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

Nejjednodušší způsob, jak zjistit, který token je legitimní, je podívat se na původní organizaci, [Arbitrum](https://arbitrum.foundation/). Legitimní adresy jsou uvedeny [v jejich dokumentaci](https://docs.arbitrum.foundation/deployment-addresses#token).

### Proč je zdrojový kód dostupný? {#why-source}

Obvykle bychom očekávali, že lidé, kteří se snaží ostatní podvést, budou tajnůstkářští, a skutečně mnoho podvodných tokenů nemá svůj kód k dispozici (například [tento](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) a [tento](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

Legitimní tokeny však obvykle svůj zdrojový kód zveřejňují, takže aby působili legitimně, autoři podvodných tokenů někdy dělají totéž. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) je jedním z těch tokenů s dostupným zdrojovým kódem, což usnadňuje jeho pochopení.

I když si tvůrci smluv mohou vybrat, zda zdrojový kód zveřejní, či nikoli, _nemohou_ zveřejnit nesprávný zdrojový kód. Průzkumník bloků nezávisle zkompiluje poskytnutý zdrojový kód, a pokud neobdrží přesně stejný bajtkód, tento zdrojový kód odmítne. [Více si o tom můžete přečíst na stránkách Etherscanu](https://etherscan.io/verifyContract).

## Srovnání s legitimními tokeny ERC-20 {#compare-legit-erc20}

Tento token porovnáme s legitimními tokeny ERC-20. Pokud nevíte, jak se obvykle píší legitimní tokeny ERC-20, [podívejte se na tento tutoriál](/developers/tutorials/erc20-annotated-code/).

### Konstanty pro privilegované adresy {#constants-for-privileged-addresses}

Smlouvy někdy potřebují privilegované adresy. Smlouvy, které jsou navrženy pro dlouhodobé použití, umožňují některé privilegované adrese změnit tyto adresy, například aby bylo možné použít novou smlouvu multisig. Existuje několik způsobů, jak to udělat.

[Smlouva tokenu `HOP`](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) používá vzor [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable). Privilegovaná adresa je uložena v úložišti, v poli nazvaném `_owner` (viz třetí soubor, `Ownable.sol`).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

Smlouva o [tokenu `ARB`](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) nemá přímo privilegovanou adresu. Nepotřebuje ji však. Nachází se za [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) na [adrese `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code). Tato smlouva má privilegovanou adresu (viz čtvrtý soubor, `ERC1967Upgrade.sol`), kterou lze použít pro upgrady.

```solidity
    /**
     * @dev Uloží novou adresu do slotu správce EIP1967.
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: nový správce je nulová adresa");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

Naproti tomu smlouva `wARB` má napevno zakódovaného `contract_owner`.

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

[Tento vlastník smlouvy](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) není smlouva, kterou by mohly v různých časech ovládat různé účty, ale [externě vlastněný účet](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs). To znamená, že je pravděpodobně navržen pro krátkodobé použití jednotlivcem, spíše než jako dlouhodobé řešení pro ovládání ERC-20, které si udrží hodnotu.

A skutečně, když se podíváme na Etherscan, vidíme, že podvodník tuto smlouvu používal pouze 12 hodin ([první transakce](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) po [poslední transakci](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)) dne 19. května 2023.

### Falešná funkce `_transfer` {#the-fake-transfer-function}

Je standardní, že skutečné převody probíhají pomocí [interní funkce `_transfer`](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer).

Ve `wARB` tato funkce vypadá téměř legitimně:

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: převod z nulové adresy");
        require(recipient != address(0), "ERC20: převod na nulovou adresu");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: částka převodu překračuje zůstatek");
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

Pokud vlastník smlouvy posílá tokeny, proč událost `Transfer` ukazuje, že pocházejí od `deployer`?

Je zde však důležitější problém. Kdo volá tuto funkci `_transfer`? Nelze ji volat zvenčí, je označena jako `internal`. A kód, který máme, neobsahuje žádná volání `_transfer`. Je zřejmé, že je zde jako návnada.

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: částka převodu překračuje povolenou částku"));
        return true;
    }
```

Když se podíváme na funkce, které se volají pro převod tokenů, `transfer` a `transferFrom`, vidíme, že volají úplně jinou funkci, `_f_`.

### Skutečná funkce `_f_` {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: převod z nulové adresy");
        require(recipient != address(0), "ERC20: převod na nulovou adresu");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: částka převodu překračuje zůstatek");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

V této funkci jsou dva potenciální varovné signály.

- Použití [modifikátoru funkce](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`. Když se však podíváme do zdrojového kódu, vidíme, že `_mod_` je ve skutečnosti neškodný.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- Stejný problém, který jsme viděli v `_transfer`, což je, když `contract_owner` posílá tokeny, které se zdají pocházet od `deployer`.

### Falešná funkce událostí `dropNewTokens` {#the-fake-events-function-dropNewTokens}

Nyní se dostáváme k něčemu, co vypadá jako skutečný podvod. Funkci jsem pro lepší čitelnost trochu upravil, ale je funkčně ekvivalentní.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

Tato funkce má modifikátor `auth()`, což znamená, že ji může volat pouze vlastník smlouvy.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Interakce není povolena");
    _;
}
```

Toto omezení dává dokonalý smysl, protože bychom nechtěli, aby náhodné účty distribuovaly tokeny. Zbytek funkce je však podezřelý.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

Funkce pro převod z účtu fondu na pole příjemců pole částek dává dokonalý smysl. Existuje mnoho případů použití, kdy budete chtít distribuovat tokeny z jednoho zdroje do více cílů, jako jsou výplaty, airdropy atd. Je levnější (z hlediska paliva) provést to v jedné transakci namísto vydávání více transakcí, nebo dokonce volat ERC-20 vícekrát z jiné smlouvy jako součást stejné transakce.

`dropNewTokens` to však nedělá. Emituje [události `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1), ale ve skutečnosti žádné tokeny nepřevádí. Neexistuje žádný legitimní důvod k matení offchainových aplikací tím, že jim řeknete o převodu, který se ve skutečnosti nestal.

### Pálící funkce `Approve` {#the-burning-approve-function}

Smlouvy ERC-20 mají mít [funkci `approve`](/developers/tutorials/erc20-annotated-code/#approve) pro povolené částky, a náš podvodný token skutečně takovou funkci má, a je dokonce správná. Protože však Solidity vychází z jazyka C, rozlišuje velikost písmen. "Approve" a "approve" jsou různé řetězce.

Funkčnost také nesouvisí s `approve`.

```solidity
    function Approve(
        address[] memory holders)
```

Tato funkce je volána s polem adres držitelů tokenu.

```solidity
    public approver() {
```

Modifikátor `approver()` zajišťuje, že tuto funkci může volat pouze `contract_owner` (viz níže).

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: pálená částka překračuje zůstatek");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

Pro každou adresu držitele funkce přesune celý zůstatek držitele na adresu `0x00...01` a tím ho efektivně spálí (skutečné `pálení` ve standardu také mění celkovou zásobu a převádí tokeny na `0x00...00`). To znamená, že `contract_owner` může odebrat majetek jakéhokoli uživatele. To se nezdá jako funkce, kterou byste chtěli ve správcovském tokenu.

### Problémy s kvalitou kódu {#code-quality-issues}

Tyto problémy s kvalitou kódu _nedokazují_, že tento kód je podvod, ale způsobují, že působí podezřele. Organizované společnosti jako Arbitrum obvykle takto špatný kód nevydávají.

#### Funkce `mount` {#the-mount-function}

Ačkoli to není uvedeno ve [standardu](https://eips.ethereum.org/EIPS/eip-20), obecně se funkce, která vytváří nové tokeny, nazývá [`mint`](https://ethereum.org/el/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).

Když se podíváme do konstruktoru `wARB`, vidíme, že funkce mint byla z nějakého důvodu přejmenována na `mount` a je volána pětkrát s pětinou počáteční zásoby, místo jednou pro celou částku z důvodu efektivity.

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
        require(msg.sender == contract_owner, "ERC20: ražba na nulovou adresu");
```

Při pohledu na `require` vidíme, že pouze vlastník smlouvy má povoleno razit. To je legitimní. Ale chybová zpráva by měla být _pouze vlastník má povoleno razit_ nebo něco podobného. Místo toho je to irelevantní _ERC20: ražba na nulovou adresu_. Správný test pro ražbu na nulovou adresu je `require(account != address(0), "<chybová zpráva>")`, což se smlouva nikdy neobtěžuje zkontrolovat.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Existují dvě další podezřelé skutečnosti, přímo související s ražbou:

- Existuje parametr `account`, což je pravděpodobně účet, který by měl obdržet vyraženou částku. Ale zůstatek, který se zvyšuje, je ve skutečnosti `contract_owner`a.

- Zatímco zvýšený zůstatek patří `contract_owner`ovi, emitovaná událost ukazuje převod na `account`.

### Proč `auth` i `approver`? Proč `mod`, který nic nedělá? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

Tato smlouva obsahuje tři modifikátory: `_mod_`, `auth` a `approver`.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` přijímá tři parametry a nic s nimi nedělá. Proč ho mít?

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Interakce není povolena");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "Interakce není povolena");
        _;
    }
```

`auth` a `approver` dávají větší smysl, protože kontrolují, že smlouva byla volána `contract_owner`. Očekávali bychom, že určité privilegované akce, jako je ražba, budou omezeny na tento účet. Jaký je však smysl mít dvě samostatné funkce, které dělají _přesně to samé_?

## Co můžeme detekovat automaticky? {#what-can-we-detect-automatically}

Při pohledu na Etherscan vidíme, že `wARB` je podvodný token. Jedná se však o centralizované řešení. Teoreticky by mohl být Etherscan podvržen nebo napaden. Je lepší být schopen nezávisle zjistit, zda je token legitimní, nebo ne.

Existují některé triky, které můžeme použít k identifikaci, že token ERC-20 je podezřelý (buď podvod, nebo velmi špatně napsaný), a to pohledem na události, které emitují.

## Podezřelé události `Approval` {#suspicious-approval-events}

[Události `Approval`](https://eips.ethereum.org/EIPS/eip-20#approval) by se měly dít pouze na přímou žádost (na rozdíl od [událostí `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1), které se mohou stát v důsledku povolené částky). [Viz dokumentaci Solidity](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin) pro podrobné vysvětlení tohoto problému a proč musí být žádosti přímé, nikoli zprostředkované smlouvou.

To znamená, že události `Approval`, které schvalují útratu z [externě vlastněného účtu](/developers/docs/accounts/#types-of-account), musí pocházet z transakcí, které vznikly na tomto účtu a jejichž cílem je smlouva ERC-20. Jakýkoli jiný druh schválení z externě vlastněného účtu je podezřelý.

Zde je [program, který identifikuje tento druh události](https://github.com/qbzzt/20230915-scam-token-detection), pomocí [viem](https://viem.sh/) a [TypeScript](https://www.typescriptlang.org/docs/), varianty JavaScriptu s typovou bezpečností. Spustíte ho takto:

1. Zkopírujte `.env.example` do `.env`.
2. Upravte `.env` a zadejte URL k uzlu hlavní sítě Ethereum.
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

Importujte definice typů, funkce a definici řetězce z `viem`.

```typescript
import { config } from "dotenv"
config()
```

Přečtěte si `.env` pro získání URL.

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

Vytvořte klienta Viem. Potřebujeme pouze číst z blockchainu, takže tento klient nepotřebuje soukromý klíč.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

Adresa podezřelé smlouvy ERC-20 a bloky, ve kterých budeme hledat události. Poskytovatelé uzlů obvykle omezují naši schopnost číst události, protože šířka pásma může být drahá. Naštěstí `wARB` nebyl používán po dobu osmnácti hodin, takže se můžeme podívat na všechny události (bylo jich celkem jen 13).

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

Tímto způsobem požádáte Viem o informace o události. Když mu poskytneme přesný podpis události, včetně názvů polí, událost pro nás analyzuje.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

Náš algoritmus je použitelný pouze na externě vlastněné účty. Pokud `client.getBytecode` vrátí jakýkoli bajtkód, znamená to, že se jedná o smlouvu a měli bychom ji přeskočit.

Pokud jste TypeScript ještě nepoužívali, definice funkce může vypadat trochu divně. Neříkáme mu jen, že se první (a jediný) parametr jmenuje `addr`, ale také, že je typu `Address`. Podobně část `: boolean` říká TypeScriptu, že návratová hodnota funkce je boolean.

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

Tato funkce získá potvrzení o transakci z události. Potvrzení potřebujeme, abychom se ujistili, že známe cíl transakce.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

Toto je nejdůležitější funkce, která skutečně rozhoduje, zda je událost podezřelá, nebo ne. Návratový typ, `(Event | null)`, říká TypeScriptu, že tato funkce může vrátit buď `Event`, nebo `null`. Vrátíme `null`, pokud událost není podezřelá.

```typescript
const owner = ev.args._owner
```

Viem má názvy polí, takže pro nás analyzoval událost. `_owner` je vlastníkem tokenů, které mají být utraceny.

```typescript
// Schválení smlouvami nejsou podezřelá
if (await isContract(owner)) return null
```

Pokud je vlastníkem smlouva, předpokládejme, že toto schválení není podezřelé. Abychom zkontrolovali, zda je schválení smlouvy podezřelé, nebo ne, budeme muset sledovat celé provedení transakce, abychom zjistili, zda se někdy dostala k vlastnické smlouvě a zda tato smlouva volala smlouvu ERC-20 přímo. To je mnohem náročnější na zdroje, než bychom chtěli dělat.

```typescript
const txn = await getEventTxn(ev)
```

Pokud schválení pochází z externě vlastněného účtu, získejte transakci, která ho způsobila.

```typescript
// Schválení je podezřelé, pokud pochází od vlastníka EOA, který není `from` transakce
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

Nemůžeme jen zkontrolovat rovnost řetězců, protože adresy jsou hexadecimální, takže obsahují písmena. Někdy, například v `txn.from`, jsou všechna tato písmena malá. V jiných případech, jako je `ev.args._owner`, je adresa v [různých velikostech písmen pro identifikaci chyby](https://eips.ethereum.org/EIPS/eip-55).

Ale pokud transakce nepochází od vlastníka a tento vlastník je externě vlastněn, pak máme podezřelou transakci.

```typescript
// Je také podezřelé, pokud cíl transakce není smlouva ERC-20, kterou
// zkoumáme
if (txn.to.toLowerCase() != testedAddress) return ev
```

Podobně, pokud adresa `to` transakce, první volaná smlouva, není zkoumaná smlouva ERC-20, pak je to podezřelé.

```typescript
    // Pokud není důvod k podezření, vrátíme null.
    return null
}
```

Pokud žádná z podmínek není pravdivá, pak událost `Approval` není podezřelá.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[Funkce `async`](https://www.w3schools.com/js/js_async.asp) vrací objekt `Promise`. S běžnou syntaxí `await x()` čekáme, až se tento `Promise` splní, než budeme pokračovat ve zpracování. To se jednoduše programuje a sleduje, ale je to také neefektivní. Zatímco čekáme na splnění `Promise` pro konkrétní událost, můžeme již začít pracovat na další události.

Zde používáme [`map`](https://www.w3schools.com/jsref/jsref_map.asp) k vytvoření pole objektů `Promise`. Poté použijeme [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) k čekání, až se všechny tyto sliby vyřeší. Poté tyto výsledky [`filtrujeme`](https://www.w3schools.com/jsref/jsref_filter.asp), abychom odstranili nepodezřelé události.

### Podezřelé události `Transfer` {#suspicious-transfer-events}

Dalším možným způsobem, jak identifikovat podvodné tokeny, je zjistit, zda mají nějaké podezřelé převody. Například převody z účtů, které nemají tolik tokenů. Můžete se podívat, [jak implementovat tento test](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts), ale `wARB` tento problém nemá.

## Závěr {#conclusion}

Automatická detekce podvodů ERC-20 trpí [falešně negativními výsledky](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error), protože podvod může použít naprosto normální smlouvu o tokenu ERC-20, která jen nepředstavuje nic skutečného. Proto byste se měli vždy pokusit _získat adresu tokenu z důvěryhodného zdroje_.

Automatická detekce může pomoci v určitých případech, jako jsou součásti DeFi, kde je mnoho tokenů a je třeba s nimi zacházet automaticky. Ale jako vždy [caveat emptor](https://www.investopedia.com/terms/c/caveatemptor.asp), proveďte si vlastní průzkum a povzbuďte své uživatele, aby dělali totéž.

[Více z mé práce najdete zde](https://cryptodocguy.pro/).
