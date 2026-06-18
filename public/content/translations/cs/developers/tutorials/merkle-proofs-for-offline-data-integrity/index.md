---
title: "Merkleovy důkazy pro integritu offline dat"
description: "Zajištění onchain integrity dat pro data, která jsou uložena převážně offchain"
author: Ori Pomerantz
tags: ["úložiště"]
skill: advanced
breadcrumb: "Merkleovy důkazy"
lang: cs
published: 2021-12-30
---

## Úvod {#introduction}

Ideálně bychom chtěli ukládat vše do úložiště Etherea, které je uloženo na tisících počítačích a má extrémně vysokou dostupnost (data nelze cenzurovat) a integritu (data nelze neoprávněně upravovat), ale uložení 32bajtového slova obvykle stojí 20 000 gasu. V době psaní tohoto článku odpovídá tento náklad 6,60 $. Při ceně 21 centů za bajt je to pro mnoho případů použití příliš drahé.

K vyřešení tohoto problému vyvinul ekosystém Etherea [mnoho alternativních způsobů, jak ukládat data decentralizovaným způsobem](/developers/docs/storage/). Obvykle zahrnují kompromis mezi dostupností a cenou. Integrita je však většinou zajištěna.

V tomto článku se dozvíte, **jak** zajistit integritu dat bez ukládání dat na blockchain pomocí [Merkleových důkazů](https://computersciencewiki.org/index.php/Merkle_proof).

## Jak to funguje? {#how-does-it-work}

Teoreticky bychom mohli onchain uložit pouze hash dat a všechna data posílat v transakcích, které to vyžadují. To je však stále příliš drahé. Bajt dat v transakci stojí asi 16 gasu, což je v současnosti asi půl centu, neboli zhruba 5 $ za kilobajt. Při ceně 5 000 $ za megabajt je to pro mnoho případů použití stále příliš drahé, a to i bez dodatečných nákladů na hashování dat.

Řešením je opakovaně hashovat různé podmnožiny dat, takže pro data, která nepotřebujete posílat, můžete poslat pouze hash. K tomu se používá Merkleův strom, stromová datová struktura, kde každý uzel je hashem uzlů pod ním:

![Merkle Tree](tree.png)

Kořenový hash (root hash) je jedinou částí, kterou je třeba uložit onchain. K prokázání určité hodnoty poskytnete všechny hashe, které je s ní třeba zkombinovat, abyste získali kořen. Například k prokázání `C` poskytnete `D`, `H(A-B)` a `H(E-H)`.

![Proof of the value of C](proof-c.png)

## Implementace {#implementation}

[Ukázkový kód je k dispozici zde](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### Offchain kód {#offchain-code}

V tomto článku používáme pro offchain výpočty JavaScript. Většina decentralizovaných aplikací má svou offchain komponentu v JavaScriptu.

#### Vytvoření Merkleho kořene {#creating-the-merkle-root}

Nejprve musíme řetězci poskytnout Merkleho kořen.

```javascript
const ethers = require("ethers")
```

[Používáme hashovací funkci z balíčku ethers](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// Hrubá data, jejichž integritu musíme ověřit. První dva bajty j
// sou identifikátor uživatele a poslední dva bajty množství tokenů, které
// uživatel v současnosti vlastní.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

Kódování každého záznamu do jediného 256bitového celého čísla vede k méně čitelnému kódu než například při použití JSON. Znamená to však podstatně méně zpracování při získávání dat v kontraktu, a tedy mnohem nižší náklady na gas. [JSON můžete číst onchain](https://github.com/chrisdotn/jsmnSol), ale je to špatný nápad, pokud se tomu lze vyhnout.

```javascript
// Pole hodnot hashů jako BigInty
const hashArray = dataArray
```

V tomto případě jsou naše data od začátku 256bitové hodnoty, takže není potřeba žádné zpracování. Pokud použijeme složitější datovou strukturu, jako jsou řetězce, musíme se ujistit, že data nejprve zahashujeme, abychom získali pole hashů. Všimněte si, že je to také proto, že nám nevadí, když uživatelé znají informace ostatních uživatelů. Jinak bychom museli hashovat tak, aby uživatel 1 neznal hodnotu pro uživatele 0, uživatel 2 neznal hodnotu pro uživatele 3 atd.

```javascript
// Převod mezi řetězcem, který očekává hashovací funkce, a
// BigIntem, který používáme všude jinde.
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

Hashovací funkce ethers očekává, že dostane JavaScriptový řetězec s hexadecimálním číslem, jako je `0x60A7`, a odpoví dalším řetězcem se stejnou strukturou. Pro zbytek kódu je však snazší použít `BigInt`, takže převádíme na hexadecimální řetězec a zase zpět.

```javascript
// Symetrický hash páru, takže nám nebude vadit, když bude pořadí obrácené.
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

Tato funkce je symetrická (hash a [xor](https://en.wikipedia.org/wiki/Exclusive_or) b). To znamená, že když kontrolujeme Merkleův důkaz, nemusíme se starat o to, zda hodnotu z důkazu vložit před nebo za vypočítanou hodnotu. Kontrola Merkleova důkazu se provádí onchain, takže čím méně toho tam musíme dělat, tím lépe.

Varování:
Kryptografie je těžší, než se zdá.
Původní verze tohoto článku měla hashovací funkci `hash(a^b)`.
To byl **špatný** nápad, protože to znamenalo, že pokud byste znali legitimní hodnoty `a` a `b`, mohli byste použít `b' = a^b^a'` k prokázání jakékoli požadované hodnoty `a'`.
S touto funkcí byste museli vypočítat `b'` tak, aby se `hash(a') ^ hash(b')` rovnalo známé hodnotě (další větvi na cestě ke kořeni), což je mnohem těžší.

```javascript
// Hodnota označující, že určitá větev je prázdná, nemá
// hodnotu
const empty = 0n
```

Když počet hodnot není celočíselnou mocninou dvou, musíme ošetřit prázdné větve. Tento program to dělá tak, že jako zástupný symbol vloží nulu.

![Merkle tree with branches missing](merkle-empty-hash.png)

```javascript
// Výpočet o jednu úroveň výše ve stromu pole hashů získáním hashe
// každého páru v pořadí
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // Abychom se vyhnuli přepsání vstupu // V případě potřeby přidejte prázdnou hodnotu (potřebujeme, aby všechny listy byly // spárované)

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

Tato funkce „vystoupá“ o jednu úroveň v Merkleově stromu tím, že zahashuje páry hodnot v aktuální vrstvě. Všimněte si, že to není nejefektivnější implementace, mohli jsme se vyhnout kopírování vstupu a jen přidat `hashEmpty`, když to bylo ve smyčce vhodné, ale tento kód je optimalizován pro čitelnost.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // Stoupejte stromem nahoru, dokud nezůstane pouze jedna hodnota, a to je // kořen. // // Pokud má vrstva lichý počet položek, // kód v oneLevelUp přidá prázdnou hodnotu, takže pokud máme například // 10 listů, budeme mít 5 větví ve druhé vrstvě, 3 // větve ve třetí, 2 ve čtvrté a kořen je pátý

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

Chcete-li získat kořen, stoupejte, dokud nezbude pouze jedna hodnota.

#### Vytvoření Merkleova důkazu {#creating-a-merkle-proof}

Merkleův důkaz jsou hodnoty, které se mají zahashovat společně s prokazovanou hodnotou, abychom získali zpět Merkleho kořen. Hodnota, kterou je třeba prokázat, je často dostupná z jiných dat, takže ji raději poskytuji samostatně, než jako součást kódu.

```javascript
// Merkleův důkaz se skládá z hodnoty seznamu položek k
// hashování. Protože používáme symetrickou hashovací funkci, ne
// potřebujeme umístění položky k ověření důkazu, pouze k jeho vytvoření
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // Dokud nedosáhneme vrcholu
    while (currentLayer.length > 1) {
        // Žádné vrstvy s lichou délkou
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // Pokud je currentN liché, přidejte do důkazu hodnotu před ním
            ? currentLayer[currentN-1]
               // Pokud je sudé, přidejte hodnotu za ním
            : currentLayer[currentN+1])

```

Hashujeme `(v[0],v[1])`, `(v[2],v[3])` atd. Takže pro sudé hodnoty potřebujeme tu následující, pro liché hodnoty tu předchozí.

```javascript
        // Přesun do další vrstvy nahoru
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### Onchain kód {#onchain-code}

Nakonec tu máme kód, který kontroluje důkaz. Onchain kód je napsán v [Solidity](https://docs.soliditylang.org/en/v0.8.11/). Optimalizace je zde mnohem důležitější, protože gas je poměrně drahý.

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

Napsal jsem to pomocí [vývojového prostředí Hardhat](https://hardhat.org/), které nám umožňuje mít během vývoje [výstup do konzole ze Solidity](https://hardhat.org/docs/cookbook/debug-logs).

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // Extrémně nezabezpečené, v produkčním kódu přístup k
    // této funkci MUSÍ BÝT přísně omezen, pravděpodobně na
    // vlastníka
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

Funkce set a get pro Merkleho kořen. Nechat kohokoli aktualizovat Merkleho kořen je v produkčním systému _extrémně špatný nápad_. Dělám to zde kvůli jednoduchosti ukázkového kódu. **Nedělejte to v systému, kde na integritě dat skutečně záleží**.

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

Tato funkce generuje hash páru. Je to jen překlad JavaScriptového kódu pro `hash` a `pairHash` do Solidity.

**Poznámka:** Toto je další případ optimalizace pro čitelnost. Na základě [definice funkce](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm) by mohlo být možné uložit data jako hodnotu [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) a vyhnout se převodům.

```solidity
    // Ověření Merkleova důkazu
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

V matematickém zápisu vypadá ověření Merkleova důkazu takto: `H(proof_n, H(proof_n-1, H(proof_n-2, ... H(proof_1, H(proof_0, value))...)))`. Tento kód to implementuje.

## Merkleovy důkazy a rollupy se k sobě nehodí {#merkle-proofs-and-rollups}

Merkleovy důkazy nefungují dobře s [rollupy](/developers/docs/scaling/#rollups). Důvodem je, že rollupy zapisují všechna transakční data na vrstvu 1 (l1), ale zpracovávají je na vrstvě 2 (l2). Náklady na odeslání Merkleova důkazu s transakcí činí v průměru 638 gasu na vrstvu (v současnosti stojí bajt v datech volání 16 gasu, pokud není nula, a 4, pokud je nula). Pokud máme 1024 slov dat, Merkleův důkaz vyžaduje deset vrstev, tedy celkem 6380 gasu.

Podíváme-li se například na [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m), zápis l1 gasu stojí asi 100 Gwei a l2 gas stojí 0,001 Gwei (to je běžná cena, při přetížení může stoupnout). Takže za cenu jednoho l1 gasu můžeme utratit sto tisíc gasu za zpracování na l2. Za předpokladu, že nepřepisujeme úložiště, to znamená, že můžeme zapsat asi pět slov do úložiště na l2 za cenu jednoho l1 gasu. Za jediný Merkleův důkaz můžeme zapsat celých 1024 slov do úložiště (za předpokladu, že je lze od začátku vypočítat onchain, a ne poskytnout v transakci) a stále nám zbude většina gasu.

## Závěr {#conclusion}

V reálném životě možná nikdy nebudete implementovat Merkleovy stromy sami. Existují dobře známé a auditované knihovny, které můžete použít, a obecně řečeno je nejlepší neimplementovat kryptografická primitiva na vlastní pěst. Doufám ale, že nyní lépe rozumíte Merkleovým důkazům a dokážete se rozhodnout, kdy se je vyplatí použít.

Všimněte si, že ačkoli Merkleovy důkazy zachovávají _integritu_, nezachovávají _dostupnost_. Vědomí, že vám nikdo jiný nemůže vzít vaše aktiva, je malou útěchou, pokud se datové úložiště rozhodne zakázat přístup a vy nemůžete zkonstruovat Merkleův strom, abyste k nim získali přístup. Proto je nejlepší používat Merkleovy stromy s nějakým druhem decentralizovaného úložiště, jako je IPFS.

[Zde najdete další mou práci](https://cryptodocguy.pro/).