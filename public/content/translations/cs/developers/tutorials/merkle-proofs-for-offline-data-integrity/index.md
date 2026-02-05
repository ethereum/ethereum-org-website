---
title: Merkleho důkazy pro integritu dat mimo blockchain
description: Zajištění integrity dat na blockchainu pro data, která jsou většinou uložena mimo blockchain
author: Ori Pomerantz
tags: [ "úložiště" ]
skill: advanced
lang: cs
published: 2021-12-30
---

## Úvod {#introduction}

V ideálním případě bychom chtěli vše ukládat do úložiště Etherea, které je uloženo na tisících počítačů a má
extrémně vysokou dostupnost (data nelze cenzurovat) a integritu (data nelze neoprávněně upravovat), ale uložení 32bajtového slova obvykle stojí 20 000 gas. V době psaní tohoto článku se tato cena rovná 6,60 USD. Při 21 centech za bajt je to pro mnoho využití příliš drahé.

K vyřešení tohoto problému vyvinul ekosystém Etherea mnoho alternativních způsobů, jak ukládat data decentralizovaným
způsobem. Obvykle zahrnují kompromis mezi dostupností
a cenou. Integrita je však obvykle zajištěna.

V tomto článku se dozvíte, **jak** zajistit integritu dat bez jejich ukládání na blockchain pomocí
[Merkleho důkazů](https://computersciencewiki.org/index.php/Merkle_proof).

## Jak to funguje? {#how-does-it-work}

Teoreticky bychom mohli pouze uložit haš dat na blockchainu a odeslat všechna data v transakcích, které je vyžadují. To je však stále příliš drahé. Jeden bajt dat v transakci stojí asi 16 gas, což je v současnosti asi půl centu, neboli asi 5 USD za kilobajt. Při ceně 5 000 USD za megabajt je to pro mnoho použití stále příliš drahé, a to i bez dodatečných nákladů na hašování dat.

Řešením je opakovaně hašovat různé podmnožiny dat, takže pro data, která nemusíte odesílat, můžete odeslat pouze haš. To se provádí pomocí Merkleho stromu, stromové datové struktury, kde každý uzel je hašem uzlů pod ním:

![Merkleho strom](tree.png)

Kořenový haš je jedinou částí, která musí být uložena na blockchainu. K prokázání určité hodnoty poskytnete všechny haše, které je třeba s ní zkombinovat, abyste získali kořen. Například k prokázání `C` poskytnete `D`, `H(A-B)` a `H(E-H)`.

![Důkaz hodnoty C](proof-c.png)

## Implementace {#implementation}

[Ukázkový kód je k dispozici zde](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### Kód mimo blockchain {#offchain-code}

V tomto článku používáme pro výpočty mimo blockchain JavaScript. Většina decentralizovaných aplikací má svou komponentu mimo blockchain v JavaScriptu.

#### Vytvoření Merkleho kořene {#creating-the-merkle-root}

Nejprve musíme poskytnout Merkleho kořen do řetězce.

```javascript
const ethers = require("ethers")
```

[Používáme hašovací funkci z balíčku ethers](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// Hrubá data, jejichž integritu musíme ověřit. První dva bajty
// jsou identifikátor uživatele a poslední dva bajty jsou množství tokenů, které
// uživatel v současnosti vlastní.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

Kódování každé položky do jediného 256bitového celého čísla vede k méně čitelnému kódu než například použití JSON. To však znamená výrazně menší zpracování pro načtení dat ve smart kontraktu, tedy mnohem nižší náklady na gas. [Můžete číst JSON na blockchainu](https://github.com/chrisdotn/jsmnSol), ale je to špatný nápad, pokud je to možné se mu vyhnout.

```javascript
// Pole hašovacích hodnot jako BigInts
const hashArray = dataArray
```

V tomto případě jsou naše data na začátku 256bitové hodnoty, takže není nutné žádné zpracování. Pokud použijeme složitější datovou strukturu, například řetězce, musíme se ujistit, že data nejprve hašujeme, abychom získali pole hašů. Všimněte si, že je to také proto, že nám nevadí, když uživatelé znají informace ostatních uživatelů. Jinak bychom museli hašovat, aby uživatel 1 neznal hodnotu pro uživatele 0, uživatel 2 neznal hodnotu pro uživatele 3 atd.

```javascript
// Převod mezi řetězcem, který očekává hašovací funkce, a
// BigInt, který používáme všude jinde.
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

Hašovací funkce ethers očekává, že dostane řetězec JavaScriptu s hexadecimálním číslem, například `0x60A7`, a odpoví jiným řetězcem se stejnou strukturou. Pro zbytek kódu je však snazší použít `BigInt`, takže převádíme na hexadecimální řetězec a zase zpět.

```javascript
// Symetrický haš páru, takže nám nebude vadit, pokud bude pořadí obrácené.
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

Tato funkce je symetrická (haš a [xor](https://en.wikipedia.org/wiki/Exclusive_or) b). To znamená, že při kontrole Merkleho důkazu se nemusíme starat o to, zda hodnotu z důkazu umístit před nebo za vypočtenou hodnotu. Kontrola Merkleho důkazu se provádí na blockchainu, takže čím méně toho tam musíme dělat, tím lépe.

Upozornění:
Kryptografie je složitější, než se zdá.
Původní verze tohoto článku měla hašovací funkci `hash(a^b)`.
To byl **špatný** nápad, protože to znamenalo, že pokud jste znali legitimní hodnoty `a` a `b`, mohli jste použít `b' = a^b^a'` k prokázání jakékoli požadované hodnoty `a'`.
S touto funkcí byste museli vypočítat `b'` tak, aby `haš(a') ^ haš(b')` byl roven známé hodnotě (další větev na cestě ke kořeni), což je mnohem těžší.

```javascript
// Hodnota pro označení, že určitá větev je prázdná, nemá
// žádnou hodnotu
const empty = 0n
```

Když počet hodnot není celočíselnou mocninou dvou, musíme řešit prázdné větve. Tento program to řeší tak, že jako zástupný symbol vloží nulu.

![Merkleho strom s chybějícími větvemi](merkle-empty-hash.png)

```javascript
// Vypočítá o jednu úroveň výše strom hašovacího pole tím, že vezme haš
// každého páru v pořadí.
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // Aby se zabránilo přepsání vstupních dat // V případě potřeby přidejte prázdnou hodnotu (potřebujeme, aby všechny listy byly spárovány)

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

Tato funkce „vystoupá“ o jednu úroveň v Merkleho stromu hašováním párů hodnot na aktuální vrstvě. Všimněte si, že se nejedná o nejefektivnější implementaci, mohli jsme se vyhnout kopírování vstupu a pouze přidat `hashEmpty` v příslušném místě cyklu, ale tento kód je optimalizován pro čitelnost.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // Stoupejte stromem, dokud nezbude jen jedna hodnota, což je // kořen. // // Pokud má vrstva lichý počet položek, // kód v oneLevelUp přidá prázdnou hodnotu, takže pokud máme například // 10 listů, budeme mít 5 větví ve druhé vrstvě, 3 // větve ve třetí, 2 ve čtvrté a kořen je pátý

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

Chcete-li získat kořen, stoupejte, dokud nezbude pouze jedna hodnota.

#### Vytvoření Merkleho důkazu {#creating-a-merkle-proof}

Merkleho důkaz jsou hodnoty, které se mají hašovat spolu s prokazovanou hodnotou, aby se vrátil Merkleho kořen. Hodnota, která se má prokázat, je často k dispozici z jiných dat, takže ji raději poskytuji samostatně než jako součást kódu.

```javascript
// Merkleho důkaz se skládá z hodnoty seznamu položek, se kterými
// se má hašovat. Protože používáme symetrickou hašovací funkci, nepotřebujeme
// polohu položky k ověření důkazu, pouze k jeho vytvoření.
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // Dokud nedosáhneme vrcholu
    while (currentLayer.length > 1) {
        // Žádné vrstvy s lichou délkou
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // Pokud je currentN liché, přidejte k důkazu hodnotu před ním
            ? currentLayer[currentN-1]
               // Pokud je sudé, přidejte hodnotu za ním
            : currentLayer[currentN+1])

```

Hašujeme `(v[0],v[1])`, `(v[2],v[3])` atd. Takže pro sudé hodnoty potřebujeme následující, pro liché hodnoty předchozí.

```javascript
        // Přesun na další vyšší vrstvu
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### Kód na blockchainu {#onchain-code}

Nakonec máme kód, který kontroluje důkaz. Kód na blockchainu je napsán v [jazyce Solidity](https://docs.soliditylang.org/en/v0.8.11/). Optimalizace je zde mnohem důležitější, protože gas je relativně drahý.

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

Napsal jsem to pomocí [vývojového prostředí Hardhat](https://hardhat.org/), které nám umožňuje mít [výstup z konzole ze Solidity](https://hardhat.org/docs/cookbook/debug-logs) během vývoje.

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // Extrémně nezabezpečené, v produkčním kódu MUSÍ BÝT přístup k
    // této funkci přísně omezen, pravděpodobně pouze na
    // vlastníka
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

Funkce Set a get pro Merkleho kořen. Povolit každému aktualizovat Merkleho kořen je v produkčním systému _extrémně špatný nápad_. Dělám to zde pro zjednodušení ukázkového kódu. **Nedělejte to v systému, kde na integritě dat skutečně záleží**.

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

Tato funkce generuje párový haš. Je to jen překlad JavaScriptového kódu pro `hash` a `pairHash` do jazyka Solidity.

**Poznámka:** Toto je další případ optimalizace pro čitelnost. Na základě [definice funkce](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm) by bylo možné ukládat data jako hodnotu [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) a vyhnout se převodům.

```solidity
    // Ověřit Merkleho důkaz
    function verifyProof(uint _value, uint[] calldata _proof)
        public view returns (bool) {
      uint temp = _value;
      uint i;

      for(i=0; i<_proof.length; i++) {
        temp = pairHash(temp, _proof[i]);
      }

      return temp == merkleRoot;
    }

}  // MarkleProof
```

V matematické notaci vypadá ověření Merkleho důkazu takto: `H(proof_n, H(proof_n-1, H(proof_n-2, ...` H(proof_1, H(proof_0, value))...)))\`. Tento kód to implementuje.

## Merkleho důkazy a rollupy se nemíchají {#merkle-proofs-and-rollups}

Merkleho důkazy nefungují dobře s [rollupy](/developers/docs/scaling/#rollups). Důvodem je, že rollupy zapisují všechna transakční data na L1, ale zpracovávají je na L2. Náklady na odeslání Merkleho důkazu s transakcí činí v průměru 638 gas za vrstvu (v současnosti stojí bajt v datech volání 16 gas, pokud není nulový, a 4, pokud je nulový). Pokud máme 1024 slov dat, Merkleho důkaz vyžaduje deset vrstev, neboli celkem 6380 gas.

Když se podíváme například na [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m), zápis gas na L1 stojí asi 100 gwei a gas na L2 stojí 0,001 gwei (to je normální cena, při přetížení se může zvýšit). Takže za cenu jednoho L1 gas můžeme utratit sto tisíc gas za zpracování na L2. Za předpokladu, že nepřepisujeme úložiště, znamená to, že za cenu jednoho L1 gas můžeme na L2 zapsat do úložiště asi pět slov. Pro jediný Merkleho důkaz můžeme zapsat celých 1024 slov do úložiště (za předpokladu, že mohou být vypočtena na blockchainu, nikoli poskytnuta v transakci) a stále nám zbude většina gas.

## Závěr {#conclusion}

V reálném životě možná nikdy nebudete sami implementovat Merkleho stromy. Existují známé a auditované knihovny, které můžete použít, a obecně platí, že je nejlepší neimplementovat kryptografické primitivy sami. Ale doufám, že nyní lépe rozumíte Merkleho důkazům a můžete se rozhodnout, kdy se vyplatí je použít.

Všimněte si, že zatímco Merkleho důkazy zachovávají _integritu_, nezachovávají _dostupnost_. Vědět, že nikdo jiný nemůže vzít vaše aktiva, je malou útěchou, pokud se úložiště dat rozhodne zakázat přístup a vy nemůžete sestavit Merkleho strom, abyste k nim měli přístup. Merkleho stromy se tedy nejlépe používají s nějakým druhem decentralizovaného úložiště, jako je IPFS.

[Více z mé práce najdete zde](https://cryptodocguy.pro/).
