---
title: "Krátká ABI pro optimalizaci dat volání"
description: "Optimalizace chytrých kontraktů pro optimistické rollupy"
author: Ori Pomerantz
lang: cs
tags: ["vrstva 2 (l2)"]
skill: intermediate
breadcrumb: "Krátká ABI"
published: 2022-04-01
---

## Úvod {#introduction}

V tomto článku se dozvíte o [optimistických rollupech](/developers/docs/scaling/optimistic-rollups), nákladech na transakce na nich a o tom, jak tato odlišná struktura nákladů vyžaduje, abychom optimalizovali jiné věci než na Ethereum Mainnetu.
Také se naučíte, jak tuto optimalizaci implementovat.

### Plné odhalení {#full-disclosure}

Jsem zaměstnancem [Optimism](https://www.optimism.io/) na plný úvazek, takže příklady v tomto článku poběží na síti Optimism.
Zde vysvětlená technika by však měla fungovat stejně dobře i pro jiné rollupy.

### Terminologie {#terminology}

Při diskuzi o rollupech se termín „vrstva 1 (l1)“ používá pro Mainnet, produkční síť Ethereum.
Termín „vrstva 2 (l2)“ se používá pro rollup nebo jakýkoli jiný systém, který spoléhá na l1 z hlediska bezpečnosti, ale většinu svého zpracování provádí offchain.

## Jak můžeme dále snížit náklady na transakce na l2? {#how-can-we-further-reduce-the-cost-of-l2-transactions}

[Optimistické rollupy](/developers/docs/scaling/optimistic-rollups) musí uchovávat záznam o každé historické transakci, aby si je kdokoli mohl projít a ověřit, že je aktuální stav správný.
Nejlevnější způsob, jak dostat data do Ethereum Mainnetu, je zapsat je jako data volání.
Toto řešení zvolily sítě [Optimism](https://docs.optimism.io/op-stack/protocol/overview) i [Arbitrum](https://docs.arbitrum.io/welcome/arbitrum-gentle-introduction).

### Náklady na transakce na l2 {#cost-of-l2-transactions}

Náklady na transakce na l2 se skládají ze dvou složek:

1. Zpracování na l2, které je obvykle extrémně levné
2. Úložiště na l1, které je vázáno na náklady na gas na Mainnetu

V době psaní tohoto článku je na síti Optimism cena l2 gasu 0,001 [Gwei](/developers/docs/gas/#pre-london).
Cena l1 gasu je naproti tomu přibližně 40 Gwei.
[Aktuální ceny můžete vidět zde](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

Bajt dat volání stojí buď 4 gas (pokud je nulový), nebo 16 gas (pokud má jakoukoli jinou hodnotu).
Jednou z nejdražších operací v EVM je zápis do úložiště.
Maximální cena zápisu 32bajtového slova do úložiště na l2 je 22 100 gas. V současnosti to je 22,1 Gwei.
Takže pokud dokážeme ušetřit jediný nulový bajt dat volání, budeme moci zapsat asi 200 bajtů do úložiště a stále na tom budeme lépe.

### ABI {#the-abi}

Drtivá většina transakcí přistupuje ke kontraktu z externě vlastněného účtu.
Většina kontraktů je napsána v jazyce Solidity a interpretuje své datové pole podle [aplikačního binárního rozhraní (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Nicméně ABI bylo navrženo pro l1, kde bajt dat volání stojí přibližně stejně jako čtyři aritmetické operace, a ne pro l2, kde bajt dat volání stojí více než tisíc aritmetických operací.
Data volání jsou rozdělena takto:

| Sekce | Délka | Bajty | Promarněné bajty | Promarněný gas | Nezbytné bajty | Nezbytný gas |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| Selektor funkce |      4 |   0-3 |            3 |         48 |               1 |            16 |
| Nuly |     12 |  4-15 |           12 |         48 |               0 |             0 |
| Cílová adresa |     20 | 16-35 |            0 |          0 |              20 |           320 |
| Částka |     32 | 36-67 |           17 |         64 |              15 |           240 |
| Celkem |     68 |       |              |        160 |                 |           576 |

Vysvětlení:

- **Selektor funkce**: Kontrakt má méně než 256 funkcí, takže je můžeme rozlišit jediným bajtem.
  Tyto bajty jsou obvykle nenulové, a proto [stojí šestnáct gas](https://eips.ethereum.org/EIPS/eip-2028).
- **Nuly**: Tyto bajty jsou vždy nulové, protože dvacetibajtová adresa nevyžaduje k uložení dvaatřicetibajtové slovo.
  Bajty, které obsahují nulu, stojí čtyři gas ([viz yellow paper](https://ethereum.github.io/yellowpaper/paper.pdf), dodatek G,
  str. 27, hodnota pro `G`<sub>`txdatazero`</sub>).
- **Částka**: Pokud budeme předpokládat, že v tomto kontraktu je `decimals` osmnáct (běžná hodnota) a maximální množství tokenů, které převedeme, bude 10<sup>18</sup>, dostaneme maximální částku 10<sup>36</sup>.
  256<sup>15</sup> &gt; 10<sup>36</sup>, takže patnáct bajtů stačí.

Ztráta 160 gas na l1 je normálně zanedbatelná. Transakce stojí minimálně [21 000 gas](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), takže dalších 0,8 % nehraje roli.
Na l2 je to však jiné. Téměř celé náklady na transakci tvoří její zápis na l1.
Kromě dat volání transakce je zde 109 bajtů hlavičky transakce (cílová adresa, podpis atd.).
Celkové náklady jsou tedy `109*16+576+160=2480` a my z nich plýtváme asi 6,5 %.

## Snižování nákladů, když nemáte pod kontrolou cíl {#reducing-costs-when-you-dont-control-the-destination}

Za předpokladu, že nemáte kontrolu nad cílovým kontraktem, můžete stále použít řešení podobné [tomuto](https://github.com/qbzzt/ethereum.org-20220330-shortABI).
Pojďme si projít příslušné soubory.

### Token.sol {#token-sol}

[Toto je cílový kontrakt](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
Jedná se o standardní ERC-20 kontrakt s jednou další funkcí.
Tato funkce `faucet` umožňuje kterémukoli uživateli získat nějaký token k použití.
Produkční ERC-20 kontrakt by to učinilo nepoužitelným, ale usnadňuje to život, když ERC-20 existuje pouze pro usnadnění testování.

```solidity
    /**
     * @dev Dává volajícímu 1000 tokenů na hraní
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Toto je kontrakt, který by měly transakce volat s kratšími daty volání](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
Pojďme si ho projít řádek po řádku.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Potřebujeme funkci tokenu, abychom věděli, jak ji zavolat.

```solidity
contract CalldataInterpreter {
    OrisUselessToken public immutable token;
```

Adresa tokenu, pro který jsme proxy kontraktem.

```solidity

    /**
     * @dev Určuje adresu tokenu
     * @param tokenAddr_ adresa kontraktu ERC-20
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

Adresa tokenu je jediný parametr, který musíme specifikovat.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Přečtení hodnoty z dat volání.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

Načteme do paměti jedno 32bajtové (256bitové) slovo a odstraníme bajty, které nejsou součástí požadovaného pole.
Tento algoritmus nefunguje pro hodnoty delší než 32 bajtů a samozřejmě nemůžeme číst za koncem dat volání.
Na l1 by mohlo být nutné tyto testy přeskočit, aby se ušetřil gas, ale na l2 je gas extrémně levný, což umožňuje jakékoli kontroly správnosti, na které si vzpomeneme.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Mohli jsme zkopírovat data z volání do `fallback()` (viz níže), ale je snazší použít [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), jazyk symbolických adres (assembly) pro EVM.

Zde používáme [operační kód CALLDATALOAD](https://www.evm.codes/#35) k načtení bajtů `startByte` až `startByte+31` do zásobníku.
Obecně je syntaxe operačního kódu v jazyce Yul `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Pouze nejvýznamnější bajty `length` jsou součástí pole, takže provedeme [posun vpravo](https://en.wikipedia.org/wiki/Logical_shift), abychom se zbavili ostatních hodnot.
To má další výhodu v tom, že se hodnota přesune napravo od pole, takže je to samotná hodnota, a ne hodnota krát 256<sup>něco</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Když volání Solidity kontraktu neodpovídá žádnému z podpisů funkcí, zavolá [funkci `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (za předpokladu, že existuje).
V případě `CalldataInterpreter` se sem dostane _jakékoli_ volání, protože neexistují žádné jiné funkce `external` nebo `public`.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Přečtení prvního bajtu dat volání, který nám říká, o jakou funkci jde.
Existují dva důvody, proč by zde funkce nebyla dostupná:

1. Funkce, které jsou `pure` nebo `view`, nemění stav a nestojí žádný gas (když jsou volány offchain).
   Nemá smysl se snažit snížit jejich náklady na gas.
2. Funkce, které spoléhají na [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties).
   Hodnota `msg.sender` bude adresa `CalldataInterpreter`, nikoli volajícího.

Bohužel, [při pohledu na specifikace ERC-20](https://eips.ethereum.org/EIPS/eip-20) nám zbývá pouze jedna funkce, `transfer`.
To nám ponechává pouze dvě funkce: `transfer` (protože můžeme zavolat `transferFrom`) a `faucet` (protože můžeme převést tokeny zpět tomu, kdo nás zavolal).

```solidity

        // Volat metody tokenu měnící stav pomocí
        // informací z dat volání

        // faucet
        if (_func == 1) {
```

Volání `faucet()`, které nemá parametry.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

Po zavolání `token.faucet()` získáme tokeny. Nicméně jako proxy kontrakt tokeny **nepotřebujeme**.
EOA (externě vlastněný účet) nebo kontrakt, který nás zavolal, ano.
Takže převedeme všechny naše tokeny tomu, kdo nás zavolal.

```solidity
        // převod (předpokládáme, že pro něj máme povolený limit)
        if (_func == 2) {
```

Převod tokenů vyžaduje dva parametry: cílovou adresu a částku.

```solidity
            token.transferFrom(
                msg.sender,
```

Volajícím umožňujeme převádět pouze tokeny, které vlastní

```solidity
                address(uint160(calldataVal(1, 20))),
```

Cílová adresa začíná na bajtu č. 1 (bajt č. 0 je funkce). Jako adresa je dlouhá 20 bajtů.

```solidity
                calldataVal(21, 2)
```

Pro tento konkrétní kontrakt předpokládáme, že maximální počet tokenů, které by kdokoli chtěl převést, se vejde do dvou bajtů (méně než 65536).

```solidity
            );
        }
```

Celkově převod zabere 35 bajtů dat volání:

| Sekce | Délka | Bajty |
| ------------------- | -----: | ----: |
| Selektor funkce |      1 |     0 |
| Cílová adresa |     32 |  1-32 |
| Částka |      2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[Tento JavaScriptový jednotkový test (unit test)](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) nám ukazuje, jak tento mechanismus používat (a jak ověřit, že funguje správně).
Budu předpokládat, že rozumíte knihovnám [chai](https://www.chaijs.com/) a [ethers](https://docs.ethers.io/v5/), a vysvětlím pouze části, které se konkrétně týkají kontraktu.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Should let us use tokens", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Token addr:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("CalldataInterpreter addr:", cdi.address)

    const signer = await ethers.getSigner()
```

Začneme nasazením obou kontraktů.

```javascript
    // Získat tokeny na hraní
    const faucetTx = {
```

K vytváření transakcí nemůžeme použít funkce na vysoké úrovni, které bychom normálně použili (jako je `token.faucet()`), protože nedodržujeme ABI.
Místo toho musíme transakci sestavit sami a poté ji odeslat.

```javascript
      to: cdi.address,
      data: "0x01"
```

Pro transakci musíme poskytnout dva parametry:

1. `to`, cílová adresa.
   Toto je kontrakt interpretu dat volání.
2. `data`, data volání k odeslání.
   V případě volání faucetu jsou data tvořena jediným bajtem, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Voláme [metodu `sendTransaction` podepisujícího (signer)](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction), protože jsme již specifikovali cíl (`faucetTx.to`) a potřebujeme, aby byla transakce podepsána.

```javascript
// Zkontrolovat, zda faucet poskytuje tokeny správně
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Zde ověříme zůstatek.
U funkcí `view` není potřeba šetřit gas, takže je prostě spustíme normálně.

```javascript
// Poskytnout CDI povolený limit (schválení nelze provádět přes proxy)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Poskytnutí povoleného limitu (allowance) interpretu dat volání, aby mohl provádět převody.

```javascript
// Převést tokeny
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Vytvoření transakce převodu. První bajt je „0x02“, následovaný cílovou adresou a nakonec částkou (0x0100, což je 256 v desítkové soustavě).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Zkontrolovat, že máme o 256 tokenů méně
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // A že je náš cíl obdržel
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## Snižování nákladů, když máte pod kontrolou cílový kontrakt {#reducing-the-cost-when-you-do-control-the-destination-contract}

Pokud máte kontrolu nad cílovým kontraktem, můžete vytvořit funkce, které obcházejí kontroly `msg.sender`, protože důvěřují interpretu dat volání.
[Příklad toho, jak to funguje, můžete vidět zde, ve větvi `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

Pokud by kontrakt reagoval pouze na externí transakce, vystačili bychom si s jedním kontraktem.
To by však narušilo [skládatelnost](/developers/docs/smart-contracts/composability/).
Je mnohem lepší mít kontrakt, který reaguje na normální volání ERC-20, a další kontrakt, který reaguje na transakce s krátkými daty volání.

### Token.sol {#token-sol-2}

V tomto příkladu můžeme upravit `Token.sol`.
To nám umožňuje mít řadu funkcí, které smí volat pouze proxy kontrakt.
Zde jsou nové části:

```solidity
    // Jediná adresa s oprávněním určit adresu CalldataInterpreter
    address owner;

    // Adresa CalldataInterpreter
    address proxy = address(0);
```

Kontrakt ERC-20 potřebuje znát identitu autorizovaného proxy kontraktu.
Tuto proměnnou však nemůžeme nastavit v konstruktoru, protože její hodnotu ještě neznáme.
Tento kontrakt je instanciován jako první, protože proxy kontrakt očekává adresu tokenu ve svém konstruktoru.

```solidity
    /**
     * @dev Volá konstruktor ERC-20.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

Adresa tvůrce (nazývaná `owner`) je uložena zde, protože to je jediná adresa, která má povoleno nastavit proxy kontrakt.

```solidity
    /**
     * @dev nastaví adresu pro proxy (CalldataInterpreter).
     * Může být voláno pouze jednou vlastníkem
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

Proxy kontrakt má privilegovaný přístup, protože může obejít bezpečnostní kontroly.
Abychom se ujistili, že můžeme proxy kontraktu důvěřovat, necháme tuto funkci zavolat pouze `owner`, a to pouze jednou.
Jakmile má `proxy` skutečnou hodnotu (nenulovou), tato hodnota se nemůže změnit, takže i když se vlastník rozhodne jednat nepoctivě nebo je odhalena jeho mnemotechnická fráze, jsme stále v bezpečí.

```solidity
    /**
     * @dev Některé funkce mohou být volány pouze přes proxy.
     */
    modifier onlyProxy {
```

Toto je [funkce `modifier`](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), upravuje způsob, jakým fungují ostatní funkce.

```solidity
      require(msg.sender == proxy);
```

Nejprve ověříme, že nás zavolal proxy kontrakt a nikdo jiný.
Pokud ne, `revert`.

```solidity
      _;
    }
```

Pokud ano, spustíme funkci, kterou upravujeme.

```solidity
   /* Funkce, které umožňují proxy skutečně fungovat jako proxy pro účty */

    function transferProxy(address from, address to, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _transfer(from, to, amount);
        return true;
    }

    function approveProxy(address from, address spender, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _approve(from, spender, amount);
        return true;
    }

    function transferFromProxy(
        address spender,
        address from,
        address to,
        uint256 amount
    ) public virtual onlyProxy() returns (bool)
    {
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
```

Toto jsou tři operace, které normálně vyžadují, aby zpráva pocházela přímo od subjektu převádějícího tokeny nebo schvalujícího povolený limit.
Zde máme proxy verzi těchto operací, která:

1. Je upravena pomocí `onlyProxy()`, takže je nikdo jiný nesmí ovládat.
2. Získá adresu, která by normálně byla `msg.sender`, jako další parametr.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

Interpret dat volání je téměř identický s tím výše, s tím rozdílem, že proxy funkce přijímají parametr `msg.sender` a není potřeba povolený limit pro `transfer`.

```solidity
        // převod (není potřeba povolený limit)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // approve
        if (_func == 3) {
            token.approveProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // transferFrom
        if (_func == 4) {
            token.transferFromProxy(
                msg.sender,
                address(uint160(calldataVal( 1, 20))),
                address(uint160(calldataVal(21, 20))),
                calldataVal(41, 2)
            );
        }
```

### Test.js {#test-js-2}

Mezi předchozím testovacím kódem a tímto je několik změn.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

Musíme kontraktu ERC-20 říct, kterému proxy kontraktu má důvěřovat

```js
console.log("CalldataInterpreter addr:", cdi.address)

// K ověření povolených limitů jsou potřeba dva podepisující
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Ke kontrole `approve()` a `transferFrom()` potřebujeme druhého podepisujícího.
Nazýváme ho `poorSigner`, protože nedostane žádné z našich tokenů (samozřejmě ale musí mít ETH).

```js
// Převést tokeny
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Protože kontrakt ERC-20 důvěřuje proxy kontraktu (`cdi`), nepotřebujeme povolený limit k předávání převodů.

```js
// schválení a transferFrom
const approveTx = {
  to: cdi.address,
  data: "0x03" + poorSigner.address.slice(2, 42) + "00FF",
}
await (await signer.sendTransaction(approveTx)).wait()

const destAddr2 = "0xE1165C689C0c3e9642cA7606F5287e708d846206"

const transferFromTx = {
  to: cdi.address,
  data: "0x04" + signer.address.slice(2, 42) + destAddr2.slice(2, 42) + "00FF",
}
await (await poorSigner.sendTransaction(transferFromTx)).wait()

// Zkontrolovat, zda byla kombinace approve / transferFrom provedena správně
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Otestování dvou nových funkcí.
Všimněte si, že `transferFromTx` vyžaduje dva parametry adresy: poskytovatele povoleného limitu a příjemce.

## Závěr {#conclusion}

Sítě [Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) i [Arbitrum](https://developer.offchainlabs.com/docs/special_features) hledají způsoby, jak snížit velikost dat volání zapisovaných na l1, a tím i náklady na transakce.
Nicméně jako poskytovatelé infrastruktury hledající obecná řešení jsou naše možnosti omezené.
Jako vývojář decentralizované aplikace (dapp) máte znalosti specifické pro danou aplikaci, což vám umožňuje optimalizovat vaše data volání mnohem lépe, než bychom to dokázali my v obecném řešení.
Doufejme, že vám tento článek pomůže najít ideální řešení pro vaše potřeby.

[Zde najdete další mou práci](https://cryptodocguy.pro/).
