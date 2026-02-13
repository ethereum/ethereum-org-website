---
title: "Zkrácené ABI pro optimalizaci calldata"
description: "Optimalizace chytrých kontraktů pro optimistické rollupy"
author: Ori Pomerantz
lang: cs
tags: [ "vrstva 2" ]
skill: intermediate
published: 2022-04-01
---

## Úvod {#introduction}

V tomto článku se dozvíte o [optimistických rollupech](/developers/docs/scaling/optimistic-rollups), nákladech na transakce na nich a o tom, jak tato odlišná struktura nákladů vyžaduje, abychom optimalizovali jiné věci než na hlavní síti Etherea.
Také se dozvíte, jak tuto optimalizaci implementovat.

### Úplné zveřejnění {#full-disclosure}

Jsem zaměstnancem společnosti [Optimism](https://www.optimism.io/) na plný úvazek, takže příklady v tomto článku poběží na Optimismu.
Zde vysvětlená technika by však měla fungovat stejně dobře i pro ostatní rollupy.

### Terminologie {#terminology}

Při diskusi o rollupech se termín „vrstva 1“ (L1) používá pro hlavní síť (Mainnet), produkční síť Etherea.
Termín „vrstva 2“ (L2) se používá pro rollup nebo jakýkoli jiný systém, který se spoléhá na L1 kvůli bezpečnosti, ale většinu zpracování provádí mimo řetězec (offchain).

## Jak můžeme dále snížit náklady na transakce L2? {#how-can-we-further-reduce-the-cost-of-L2-transactions}

[Optimistické rollupy](/developers/docs/scaling/optimistic-rollups) musí uchovávat záznam o každé historické transakci, aby si je kdokoli mohl projít a ověřit, že aktuální stav je správný.
Nejlevnější způsob, jak dostat data do hlavní sítě Etherea, je zapsat je jako calldata.
Toto řešení si zvolily jak [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-), tak [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups).

### Náklady na transakce L2 {#cost-of-l2-transactions}

Náklady na transakce L2 se skládají ze dvou složek:

1. Zpracování na L2, které je obvykle extrémně levné
2. Úložiště na L1, které je vázáno na náklady na palivo na hlavní síti

V době, kdy toto píšu, je na Optimismu cena paliva L2 0,001 [Gwei](/developers/docs/gas/#pre-london).
Cena paliva L1 je naopak přibližně 40 gwei.
[Aktuální ceny si můžete prohlédnout zde](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

Jeden bajt calldata stojí buď 4 jednotky paliva (pokud je nulový), nebo 16 jednotek paliva (pokud má jakoukoli jinou hodnotu).
Jednou z nejdražších operací na EVM je zápis do úložiště.
Maximální cena zápisu 32bajtového slova do úložiště na L2 je 22 100 jednotek paliva. V současnosti je to 22,1 gwei.
Takže pokud ušetříme jediný nulový bajt calldata, budeme moci zapsat do úložiště asi 200 bajtů a stále na tom vyděláme.

### ABI {#the-abi}

Většina transakcí putuje do kontraktu z externě vlastněného účtu.
Většina kontraktů je napsána v jazyce Solidity a interpretuje své datové pole podle [aplikačního binárního rozhraní (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

ABI však bylo navrženo pro L1, kde bajt calldata stojí přibližně stejně jako čtyři aritmetické operace, nikoliv pro L2, kde bajt calldata stojí více než tisíc aritmetických operací.
Calldata jsou rozdělena takto:

| Sekce           | Délka | Bajty | Zbytečné bajty | Zbytečné palivo | Nezbytné bajty | Nezbytné palivo |
| --------------- | ----: | ----: | -------------: | --------------: | -------------: | --------------: |
| Selektor funkce |     4 |   0-3 |              3 |              48 |              1 |              16 |
| Nuly            |    12 |  4-15 |             12 |              48 |              0 |               0 |
| Cílová adresa   |    20 | 16-35 |              0 |               0 |             20 |             320 |
| Částka          |    32 | 36-67 |             17 |              64 |             15 |             240 |
| Celkem          |    68 |       |                |             160 |                |             576 |

Vysvětlení:

- **Selektor funkce**: Kontrakt má méně než 256 funkcí, takže je můžeme rozlišit jediným bajtem.
  Tyto bajty jsou obvykle nenulové, a proto [stojí šestnáct jednotek paliva](https://eips.ethereum.org/EIPS/eip-2028).
- **Nuly**: Tyto bajty jsou vždy nulové, protože dvacetibajtová adresa nevyžaduje k uložení třicetidvoubajtové slovo.
  Bajty, které obsahují nulu, stojí čtyři jednotky paliva ([viz Yellow paper](https://ethereum.github.io/yellowpaper/paper.pdf), Dodatek G,
  str. 27, hodnota pro `G`<sub>`txdatazero`</sub>).
- **Částka**: Pokud předpokládáme, že v tomto kontraktu je `decimals` osmnáct (normální hodnota) a maximální množství tokenů, které převedeme, bude 10<sup>18</sup>, dostaneme maximální částku 10<sup>36</sup>.
  256<sup>15</sup> &gt; 10<sup>36</sup>, takže patnáct bajtů stačí.

Ztráta 160 jednotek paliva na L1 je obvykle zanedbatelná. Transakce stojí nejméně [21 000 jednotek paliva](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), takže na 0,8 % navíc nezáleží.
Na L2 je to však jinak. Téměř celé náklady na transakci tvoří její zápis na L1.
Kromě calldata transakce existuje 109 bajtů záhlaví transakce (cílová adresa, podpis atd.).
Celkové náklady jsou tedy `109*16+576+160=2480` a my z toho plýtváme asi 6,5 %.

## Snížení nákladů, když nemáte kontrolu nad cílem {#reducing-costs-when-you-dont-control-the-destination}

Za předpokladu, že nemáte kontrolu nad cílovým kontraktem, můžete stále použít řešení podobné [tomuto](https://github.com/qbzzt/ethereum.org-20220330-shortABI).
Pojďme si projít příslušné soubory.

### Token.sol {#token-sol}

[Toto je cílový kontrakt](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
Jedná se o standardní kontrakt ERC-20 s jednou další funkcí.
Tato funkce `faucet` umožňuje každému uživateli získat tokeny k použití.
U produkčního kontraktu ERC-20 by byla k ničemu, ale usnadňuje život, když kontrakt ERC-20 existuje pouze pro usnadnění testování.

```solidity
    /**
     * @dev Dává volajícímu 1000 tokenů na hraní
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Toto je kontrakt, který mají transakce volat s kratšími calldata](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
Pojďme si ho projít řádek po řádku.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Potřebujeme funkci tokenu, abychom věděli, jak ji volat.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

Adresa tokenu, pro který jsme proxy.

```solidity

    /**
     * @dev Určete adresu tokenu
     * @param tokenAddr_ Adresa kontraktu ERC-20
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

Adresa tokenu je jediný parametr, který musíme zadat.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Přečtěte hodnotu z calldata.

```solidity
        uint _retVal;

        require(length < 0x21,
            "limit délky calldataVal je 32 bajtů");

        require(length + startByte <= msg.data.length,
            "calldataVal se pokouší číst za velikostí calldata");
```

Chystáme se načíst jedno 32bajtové (256bitové) slovo do paměti a odstranit bajty, které nejsou součástí požadovaného pole.
Tento algoritmus nefunguje pro hodnoty delší než 32 bajtů a samozřejmě nemůžeme číst za koncem calldata.
Na L1 může být nutné tyto testy přeskočit, abychom ušetřili palivo, ale na L2 je palivo extrémně levné, což umožňuje jakékoli kontroly správnosti, na které si vzpomeneme.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Mohli jsme zkopírovat data z volání do `fallback()` (viz níže), ale je jednodušší použít [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), assembler EVM.

Zde používáme [operační kód CALLDATALOAD](https://www.evm.codes/#35) ke čtení bajtů `startByte` až `startByte+31` do zásobníku.
Obecně je syntaxe operačního kódu v Yul `<název operačního kódu>(<první hodnota zásobníku, pokud existuje>, <druhá hodnota zásobníku, pokud existuje>...).`

```solidity

        _retVal = _retVal >> (256-length*8);
```

Součástí pole jsou pouze nejvýznamnější bajty `length`, takže provedeme [posun doprava](https://en.wikipedia.org/wiki/Logical_shift), abychom se zbavili ostatních hodnot.
To má další výhodu v tom, že se hodnota přesune napravo od pole, takže se jedná o hodnotu samotnou, nikoli o hodnotu vynásobenou 256<sup>něčím</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Když volání kontraktu v Solidity neodpovídá žádnému z podpisů funkcí, zavolá se [funkce `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (pokud existuje).
V případě `CalldataInterpreter` se sem dostane _jakékoli_ volání, protože neexistují žádné jiné `externí` nebo `veřejné` funkce.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Přečtěte první bajt calldata, který nám sdělí funkci.
Existují dva důvody, proč by zde funkce nebyla dostupná:

1. Funkce, které jsou `pure` nebo `view`, nemění stav a nestojí palivo (při volání mimo řetězec).
   Nemá smysl se snažit snižovat jejich náklady na palivo.
2. Funkce, které se spoléhají na [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties).
   Hodnota `msg.sender` bude adresa kontraktu `CalldataInterpreter`, nikoli volajícího.

Bohužel [při pohledu na specifikace ERC-20](https://eips.ethereum.org/EIPS/eip-20), zbývá pouze jedna funkce, `transfer`.
To nám ponechává pouze dvě funkce: `transfer` (protože můžeme volat `transferFrom`) a `faucet` (protože můžeme převést tokeny zpět tomu, kdo nás volal).

```solidity

        // Volání metod tokenu měnících stav pomocí
        // informací z calldata

        // faucet
        if (_func == 1) {
```

Volání funkce `faucet()`, která nemá žádné parametry.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

Po zavolání `token.faucet()` získáme tokeny. Jako proxy kontrakt však tokeny **nepotřebujeme**.
Potřebuje je EOA (externě vlastněný účet) nebo kontrakt, který nás volal.
Takže převedeme všechny naše tokeny tomu, kdo nás volal.

```solidity
        // transfer (předpokládejme, že na něj máme povolenku)
        if (_func == 2) {
```

Převod tokenů vyžaduje dva parametry: cílovou adresu a částku.

```solidity
            token.transferFrom(
                msg.sender,
```

Volajícím povolujeme převádět pouze tokeny, které vlastní

```solidity
                address(uint160(calldataVal(1, 20))),
```

Cílová adresa začíná na bajtu č. 1 (bajt č. 0 je funkce).
Jako adresa je dlouhá 20 bajtů.

```solidity
                calldataVal(21, 2)
```

U tohoto konkrétního kontraktu předpokládáme, že maximální počet tokenů, které by kdokoli chtěl převést, se vejde do dvou bajtů (méně než 65 536).

```solidity
            );
        }
```

Celkově převod zabere 35 bajtů calldata:

| Sekce           | Délka | Bajty |
| --------------- | ----: | ----: |
| Selektor funkce |     1 |     0 |
| Cílová adresa   |    32 |  1-32 |
| Částka          |     2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[Tento jednotkový test v JavaScriptu](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) nám ukazuje, jak tento mechanismus používat (a jak ověřit, že funguje správně).
Budu předpokládat, že rozumíte [chai](https://www.chaijs.com/) a [ethers](https://docs.ethers.io/v5/) a vysvětlím pouze části, které se týkají konkrétně tohoto kontraktu.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Mělo by nám umožnit používat tokeny", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Adresa tokenu:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("Adresa CalldataInterpreter:", cdi.address)

    const signer = await ethers.getSigner()
```

Začneme nasazením obou kontraktů.

```javascript
    // Získat tokeny na hraní
    const faucetTx = {
```

Nemůžeme k vytváření transakcí použít funkce na vysoké úrovni, které bychom normálně používali (například `token.faucet()`), protože nedodržujeme ABI.
Místo toho musíme transakci sestavit sami a poté ji odeslat.

```javascript
      to: cdi.address,
      data: "0x01"
```

Pro transakci musíme zadat dva parametry:

1. `to`, cílová adresa.
   Toto je kontrakt interpretu calldata.
2. `data`, calldata k odeslání.
   V případě volání faucet jsou data tvořena jediným bajtem, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Voláme [metodu `sendTransaction` podepisujícího](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction), protože jsme již zadali cíl (`faucetTx.to`) a potřebujeme, aby byla transakce podepsána.

```javascript
// Zkontrolujte, zda faucet poskytuje tokeny správně
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Zde ověříme zůstatek.
Není třeba šetřit palivo na funkcích `view`, takže je prostě spouštíme normálně.

```javascript
// Dejte CDI povolenku (schválení nelze provést přes proxy)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Dejte interpretu calldata povolenku, aby mohl provádět převody.

```javascript
// Převod tokenů
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Vytvořte transakci převodu. První bajt je „0x02“, následuje cílová adresa a nakonec částka (0x0100, což je 256 v desítkové soustavě).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Zkontrolujte, že máme o 256 tokenů méně
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // A že je náš cíl dostal
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## Snížení nákladů, když máte kontrolu nad cílovým kontraktem {#reducing-the-cost-when-you-do-control-the-destination-contract}

Pokud máte kontrolu nad cílovým kontraktem, můžete vytvořit funkce, které obcházejí kontroly `msg.sender`, protože důvěřují interpretu calldata.
[Příklad, jak to funguje, si můžete prohlédnout zde, ve větvi `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

Pokud by kontrakt reagoval pouze na externí transakce, vystačili bychom si s jedním kontraktem.
To by však narušilo [složitelnost](/developers/docs/smart-contracts/composability/).
Je mnohem lepší mít kontrakt, který reaguje na běžná volání ERC-20, a další kontrakt, který reaguje na transakce s krátkými calldata.

### Token.sol {#token-sol-2}

V tomto příkladu můžeme upravit `Token.sol`.
To nám umožňuje mít řadu funkcí, které může volat pouze proxy.
Zde jsou nové části:

```solidity
    // Jediná adresa, která může zadat adresu CalldataInterpreter
    address owner;

    // Adresa CalldataInterpreter
    address proxy = address(0);
```

Kontrakt ERC-20 musí znát identitu autorizovaného proxy.
Tuto proměnnou však nemůžeme nastavit v konstruktoru, protože její hodnotu ještě neznáme.
Tento kontrakt je instanciován jako první, protože proxy očekává adresu tokenu ve svém konstruktoru.

```solidity
    /**
     * @dev Volá konstruktor ERC20.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

Adresa tvůrce (nazývaná `owner`) je zde uložena, protože je to jediná adresa, která smí nastavit proxy.

```solidity
    /**
     * @dev nastaví adresu pro proxy (CalldataInterpreter).
     * Může být zavolána pouze jednou vlastníkem
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Může být voláno pouze vlastníkem");
        require(proxy == address(0), "Proxy je již nastaveno");

        proxy = _proxy;
    }    // function setProxy
```

Proxy má privilegovaný přístup, protože může obcházet bezpečnostní kontroly.
Abychom se ujistili, že můžeme proxy důvěřovat, necháme tuto funkci volat pouze `vlastníka`, a to pouze jednou.
Jakmile má `proxy` skutečnou hodnotu (nenulovou), nelze tuto hodnotu změnit, takže i kdyby se vlastník rozhodl stát se nepoctivým, nebo by byla odhalena jeho mnemotechnická pomůcka, jsme stále v bezpečí.

```solidity
    /**
     * @dev Některé funkce mohou být volány pouze proxy.
     */
    modifier onlyProxy {
```

Toto je [`modifikátorová` funkce](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), která upravuje způsob fungování ostatních funkcí.

```solidity
      require(msg.sender == proxy);
```

Nejprve ověřte, že nás volal proxy a nikdo jiný.
Pokud ne, `revert`.

```solidity
      _;
    }
```

Pokud ano, spusťte funkci, kterou upravujeme.

```solidity
   /* Funkce, které umožňují proxy skutečně zastupovat účty */

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

Jedná se o tři operace, které obvykle vyžadují, aby zpráva přišla přímo od subjektu, který převádí tokeny nebo schvaluje povolenku.
Zde máme proxy verzi těchto operací, která:

1. Je upravena `onlyProxy()`, takže je nikdo jiný nesmí ovládat.
2. Získá adresu, která by normálně byla `msg.sender` jako další parametr.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

Interpret calldata je téměř totožný s výše uvedeným, s výjimkou toho, že funkce proxy dostávají parametr `msg.sender` a není potřeba povolenka pro `transfer`.

```solidity
        // transfer (není potřeba povolenka)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // schválit
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

Musíme kontraktu ERC-20 sdělit, kterému proxy má důvěřovat.

```js
console.log("Adresa CalldataInterpreter:", cdi.address)

// K ověření povolenek potřebujeme dva podepisující
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Ke kontrole `approve()` a `transferFrom()` potřebujeme druhého podepisujícího.
Říkáme mu `poorSigner` (chudý podepisující), protože nedostane žádný z našich tokenů (samozřejmě ale musí mít ETH).

```js
// Převod tokenů
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Protože kontrakt ERC-20 důvěřuje proxy (`cdi`), nepotřebujeme povolenku k předávání převodů.

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

// Zkontrolujte, zda byla kombinace approve / transferFrom provedena správně
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Otestujte dvě nové funkce.
Všimněte si, že `transferFromTx` vyžaduje dva parametry adresy: dárce povolenky a příjemce.

## Závěr {#conclusion}

Jak [Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92), tak [Arbitrum](https://developer.offchainlabs.com/docs/special_features) hledají způsoby, jak zmenšit velikost calldata zapisovaných na L1, a tím i náklady na transakce.
Jako poskytovatelé infrastruktury, kteří hledají obecná řešení, jsou však naše schopnosti omezené.
Jako vývojář dapp máte znalosti specifické pro danou aplikaci, což vám umožňuje optimalizovat calldata mnohem lépe, než bychom mohli v obecném řešení.
Doufejme, že vám tento článek pomůže najít ideální řešení pro vaše potřeby.

[Více z mé práce najdete zde](https://cryptodocguy.pro/).

