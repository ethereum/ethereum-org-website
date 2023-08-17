---
title: Dovezile Merkle pentru integritatea datelor off-line
description: Asigurarea integrității datelor pe lanț pentru datele stocate în majoritate în afara lanțului
author: Ori Pomerantz
tags:
  - "merkle"
  - "integritate"
  - "stocare"
skill: advanced
lang: ro
published: 2021-12-30
---

## Introducere {#introduction}

Ideal ar fi să stocăm totul în memoria Ethereum, stocată pe mii de computere, cu o mare accesibilitate (adică datele nu pot fi cenzurate) și integritate (adică datele nu pot fi modificate într-un mod neautorizat), dar stocarea unui cuvânt de 32 de octeți costă de obicei 20.000 de gaz. Acum, când scriu aceste rânduri, acest cost este echivalentul a 6,60 dolari. La 21 de cenți pe octet, acest preț este prea mare pentru mulți utilizatori.

To solve this problem the Ethereum ecosystem developed [many alternative ways to store data in a decentralized fashion](/developers/docs/storage/). Acestea implică de obicei un compromis între disponibilitate și preț. Cu toate acestea, este asigurată de obicei integritatea.

În acest articol veți învăța **cum** să asigurați integritatea datelor fără a stoca datele pe blockchain, folosind [dovezile Merkle](https://computersciencewiki.org/index.php/Merkle_proof).

## Cum funcționează? {#how-does-it-work}

În teorie, am putea stoca hash-ul datelor pe lanț și trimite toate datele în tranzacțiile care le solicită. Totuși, și acest lucru rămâne prea scump. Un octet de date la o tranzacție costă aproape 16 gaz, actualmente cam jumătate de cent, sau circa 5 dolari pe kilooctet. La 5.000 de dolari pe megaoctet, acest lucru este tot prea scump pentru mulți utilizatori, chiar și fără costul suplimentar al hashing-ului de date.

Soluția este de a genera în mod repetat hash-uri pentru diferite subseturi de date, deci pentru datele pe care nu este nevoie să le trimiteți, puteți trimite doar hash-ul lor. Aceasta se poate face utilizând un arbore Merkle, o structură de date arborescentă în care fiecare nod este hash-ul nodurilor de sub el:

![Arborele Merkle](tree.png)

Hash-ul rădăcină este singura parte care trebuie să fie stocată în lanț. Pentru a dovedi o anumită valoare, furnizați toate hash-urile care trebuie combinate cu aceasta pentru a obține rădăcina. De exemplu, pentru a dovedi `C` furnizați `D`, `H(A-B)` și `H(E-H)`.

![Dovada valorii lui C](proof-c.png)

## Implementarea {#implementation}

[Exemplul de cod este furnizat aici](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### Codul off-chain {#off-chain-code}

În acest articol folosim JavaScript pentru calculele off-chain. Majoritatea aplicațiilor descentralizate îşi au componenta off-chain în JavaScript.

#### Crearea rădăcinii Merkle {#creating-the-merkle-root}

Mai întâi trebuie să furnizăm rădăcina Merkle lanțului.

```javascript
const ethers = require("ethers")
```

[Vom utiliza funcția hash din pachetul ethers](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// The raw data whose integrity we have to verify. The first two bytes a
// are a user identifier, and the last two bytes the amount of tokens the
// user owns at present.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

Codificarea fiecărui set de date introduse într-o valoare întreagă de 256 de biți conduce la un cod mai puțin lizibil decât utilizând JSON, de exemplu. Dar aceasta înseamnă semnificativ mai puține procesări pentru preluarea datelor din contract, deci costuri de gaz mai mici. [Puteți citi JSON on chain](https://github.com/chrisdotn/jsmnSol), însă nu este o idee bună, evitați-o dacă se poate.

```javascript
// The array of hash values, as BigInts
const hashArray = dataArray
```

În acest caz, datele noastre inițiale sunt constituite de valori pe 256 de biți, deci nu este nevoie de nicio procesare. Dar dacă folosim o structură de date mai complexă, cum ar fi șirurile de caractere, trebuie să generăm mai întâi hash-ul datelor pentru a obține o matrice de hash-uri. Rețineți că lucrul acesta se datorează și faptului că nu ne pasă dacă utilizatorii cunosc informațiile altor utilizatori. Altfel, ar trebui să generăm un hash astfel încât utilizatorul 1 să nu cunoască valoarea utilizatorului 0, utilizatorul 2 să nu cunoască valoarea utilizatorului 3 etc.

```javascript
const pairHash = (a, b) =>
  BigInt(ethers.utils.keccak256("0x" + (a ^ b).toString(16).padStart(64, 0)))
```

Funcția hash a pachetului ethers așteaptă să primească un șir JavaScript cu un număr hexazecimal, cum ar fi `0x60A7`, și răspunde cu un alt șir cu aceeași structură. Totuși, pentru restul codului este mai ușor să folosim `BigInt`, așa că facem conversia la un șir hexazecimal și înapoi.

Această funcție este simetrică (hash de a [xor](https://en.wikipedia.org/wiki/Exclusive_or) b). Prin urmare, atunci când verificăm dovada Merkle, nu este nevoie să ne preocupăm dacă valoarea din dovadă trebuie pusă înainte sau după valoarea calculată. Verificarea dovezii Merkle se face în lanț, de aceea, cu cât avem treabă mai puţin acolo, cu atât mai bine.

```javascript
// The value to denote that a certain branch is empty, doesn't
// have a value
const empty = 0n
```

Când numărul de valori nu este o putere întreagă a lui doi, trebuie să ne ocupăm de ramurile goale. Modul în care o face programul este de a pune zero ca substituent.

![Arborele Merkle cu ramuri lipsă](merkle-empty-hash.png)

```javascript
// Calculate one level up the tree of a hash array by taking the hash of
// each pair in sequence
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // To avoid over writing the input

  // Add an empty value if necessary (we need all the leaves to be
  // paired)
  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

Această funcție „urcă” un nivel în arborele Merkle prin hash-ul perechilor de valori de la nivelul curent. Trebuie remarcat că nu este cea mai eficientă implementare, am fi putut evita să copiem intrarea și doar să adăugăm `hashEmpty` în buclă atunci când era cazul, dar acest cod este optimizat pentru lizibilitate.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray]

  // Climb up the tree until there is only one value, that is the
  // root.
  //
  // If a layer has an odd number of entries the
  // code in oneLevelUp adds an empty value, so if we have, for example,
  // 10 leaves we'll have 5 branches in the second layer, 3
  // branches in the third, 2 in the fourth and the root is the fifth
  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

Pentru a obține rădăcina, urcați până când rămâne doar o singură valoare.

#### Crearea unei dovezi Merkle {#creating-a-merkle-proof}

O dovadă Merkle reprezintă valorile de la care împreună se va genera un hash și valoarea care trebuie dovedită pentru a obține înapoi rădăcina Merkle. Valoarea de dovedit este adesea disponibilă din alte date, așa că prefer să o furnizez separat decât făcând parte din cod.

```javascript
// A merkle proof consists of the value of the list of entries to
// hash with. Because we use a symmetrical hash function, we don't
// need the item's location to verify the proof, only to create it
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // Until we reach the top
    while (currentLayer.length > 1) {
        // No odd length layers
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // If currentN is odd, add with the value before it to the proof
            ? currentLayer[currentN-1]
               // If it is even, add the value after it
            : currentLayer[currentN+1])

```

Obținem hash-ul valorilor `(v[0],v[1])`, `(v[2],v[3]) etc. Deci, pentru valorile pare avem nevoie de următoarea, iar pentru valorile impare de cea anterioară.

```javascript
        // Move to the next layer up
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### Codul on-chain {#off-chain-code}

În sfârșit, avem codul care verifică dovada. Codul on-chain este scris în [Solidity](https://docs.soliditylang.org/en/v0.8.11/). Optimizarea este mult mai importantă aici, deoarece gazul este relativ scump.

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

Am scris codul folosind [mediul de dezvoltare Hardhat](https://hardhat.org/), care ne permite să avem o [ieșire de consolă din Solidity](https://hardhat.org/tutorial/debugging-with-hardhat-network.html) în timp ce dezvoltăm.

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // Extremely insecure, in production code access to
    // this function MUST BE strictly limited, probably to an
    // owner
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

Funcțiile „set” și „get” pentru rădăcina Merkle. Letting everybody update the Merkle root is an _extremely bad idea_ in a production system. Am făcut-o aici de dragul simplității, pentru a da doar un exemplu de cod. **Nu trebuie să o faceți într-un sistem în care integritatea datelor contează cu adevărat**.

```solidity
    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a ^ _b)));
    }
```

Această funcție generează o pereche de hash-uri. Este doar traducerea în Solidity a codului JavaScript pentru `pairHash`.

**Observaţie:** Acesta este un alt caz de optimizare pentru lizibilitate. În baza [definiției funcției](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm), ar fi posibilă stocarea datelor ca o valoare [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) și evitarea conversiilor.

```solidity
    // Verify a Merkle proof
    function verifyProof(uint _value, uint[] calldata _proof)
        public view returns (bool) {
      uint temp = _value;
      uint i;

      for(i=0; i<_proof.length; i++) {
        temp = pairHash(temp, _proof[i]);
      }

      return temp == merkleRoot;
    }

}  // MarkleProof
```

În limbaj matematic, verificarea dovezilor Merkle arată astfel: `H(proof_n, H(proof_n-1, H(proof_n-2, ... H(proof_1, H(proof_0, value))...)))`. Acest cod îl pune în aplicare.

## Dovezile Merkle și rollup-urile nu se potrivesc {#merkle-proofs-and-rollups}

Merkle proofs don't work well with [rollups](/developers/docs/scaling/#rollups). Motivul este că rollup-urile scriu toate datele tranzacției pe L1, dar le procesează pe L2. Prețul trimiterii unei dovezi Merkle cu o tranzacție este în medie de 638 de gaz pe nivel (în prezent, un octet în datele de apel costă 16 gaz dacă nu este zero și 4 dacă este zero). Presupunând că avem 1024 de cuvinte de date, o dovadă Merkle necesită zece niveluri, adică un total de 6380 de gaz.

Privind, de exemplu, la [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m), scrierea gazului L1 costă în jur de 100 gwei, iar gazul L2 costă 0,001 gwei (acesta este prețul normal și poate crește odată cu congestia). Așadar, pentru costul unui gaz L1 putem cheltui o sută de mii de gaz pentru procesarea L2. Considerând că nu suprascriem stocarea, putem scrie aproximativ cinci cuvinte în L2 pentru prețul unui gaz L1. Pentru o singură dovadă Merkle, putem scrie toate cele 1024 de cuvinte în memorie (presupunând că acestea pot fi calculate în lanț pentru început, și nu furnizate într-o tranzacție) și ne rămâne încă cea mai mare parte din gaz.

## Concluzie {#conclusion}

În lumea reală, probabil că nu veți implementa niciodată arbori Merkle pe cont propriu. Pot fi folosite biblioteci binecunoscute și auditate și este în general preferabil să nu implementați primitive criptografice pe cont propriu. Acum sper că înțelegeți mai bine dovezile Merkle și puteți decide când merită să fie folosite.

Note that while Merkle proofs preserve _integrity_, they do not preserve _availability_. Știind că nimeni nu vă poate lua bunurile vă consolează prea puţin dacă depozitul de date decide să interzică accesul la ele și nici nu puteți construi un arbore Merkle pentru a le accesa. De aceea, arborii Merkle sunt cel mai bine utilizați cu un fel de stocare descentralizată, precum IPFS.
