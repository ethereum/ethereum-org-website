---
title: "Reducerea dimensiunii contractelor pentru a evita depășirea limitei de mărime a contractelor"
description: Ce puteți face ca să nu devină contractele prea mari?
author: Markus Waas
lang: ro
tags:
  - "solidity"
  - "contracte inteligente"
  - "stocare"
skill: intermediate
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## De ce există o limită? {#why-is-there-a-limit}

Pe [22 noiembrie 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/) hard-fork-ul Spurious Dragon a introdus [EIP-170](https://eips.ethereum.org/EIPS/eip-170), care a adăugat o limită pentru dimensiunea contractelor inteligente de 24,576 kB. Pentru dvs. în calitate de dezvoltator Solidity, acest lucru înseamnă că atunci când adăugați din ce în ce mai multe funcționalități la contractul dvs., veți ajunge la un moment dat la limită și la implementare veți vedea eroarea:

`Atenție: dimensiunea codului contractului depășește 24576 de octeți (o limită introdusă în Spurious Dragon). This contract may not be deployable on Mainnet. Gândiți-vă să activați funcția de optimizare „optimizer” (cu o valoare „runs” scăzută!), să dezactivați stringurile inversate sau să utilizați bibliotecile.`

Această limită a fost introdusă pentru a preveni atacurile prin refuzul-serviciului (DOS). Orice apel la un contract este relativ ieftin din punct de vedere al gazului. Cu toate acestea, impactul unui apel de contract pentru nodurile Ethereum crește în mod disproporționat în funcție de dimensiunea codului contractului apelat (citirea codului de pe disc, preprocesarea codului, adăugarea de date la dovada Merkle). De fiecare dată când aveți o astfel de situație în care atacatorul are nevoie de puține resurse pentru a le da mult de lucru celorlalți, există posibilitatea unor atacuri DOS.

Inițial aceasta era o problemă mai puțin serioasă, pentru că o limită naturală a mărimii contractului este limita de gaz pe bloc. În mod evident, un contract trebuie să fie implementat în cadrul unei tranzacții care conține tot bytecode-ul contractului. Dar dacă includeți doar acea tranzacție într-un bloc, puteți utiliza tot gazul, care însă nu este infinit. Problema în acest caz este însă că limita de gaz pe bloc se modifică în timp și este teoretic nemărginită. În momentul introducerii EIP-170, limita de gaz pe bloc era de numai 4,7 milioane. Acum limita de gaz pe bloc tocmai [a crescut din nou](https://etherscan.io/chart/gaslimit) luna trecută la 11,9 milioane.

În cele ce urmează vom examina câteva metode în ordinea impactului lor potențial. Considerați-le din perspectiva pierderii în greutate. Strategia cea mai bună pentru ca cineva să-și atingă greutatea propusă (în cazul nostru 24kB) este să se axeze întâi pe metodele cu impact mare. În cele mai multe cazuri va fi suficient să vă modificați regimul alimentar ca să vă atingeți scopul, dar uneori mai este necesar și altceva. Apoi ați mai putea face niște exerciții fizice (impact mediu) sau chiar lua suplimente (impact mic).

## Impact mare {#big-impact}

### Separați-vă contractele {#separate-your-contracts}

Aceasta ar trebui să fie întotdeauna prima abordare. Cum să separați contractul în mai multe contracte mai mici? În general, aceasta vă obligă să vă clădiți bine contractele. Contractele mai mici sunt întotdeauna preferate din perspectiva lizibilității codului. Pentru divizarea contractelor, întrebați-vă:

- Care funcții merg bine împreună? Fiecare set de funcții ar merge cel mai bine în propriul contract.
- Care funcții nu necesită citirea stării contractului sau numai un subset specific al stării?
- Puteți împărți stocarea și funcționalitatea?

### Biblioteci {#libraries}

O manieră simplă de a elimina codul de funcționalitate din stocare este utilizând o [bibliotecă](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). Nu declarați funcțiile bibliotecilor ca interne, deoarece acestea vor fi [adăugate la contract](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) direct în timpul compilării. Dar dacă folosiți funcții publice, atunci acestea vor fi de fapt într-un contract separat al bibliotecii. Aveți în vedere utilizarea [using for>](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for)pentru a folosi mai comod bibliotecile.

### Proxy-urile {#proxies}

O strategie mai avansată ar fi sistemul proxy. Bibliotecile folosesc `DELEGATECALL` în spate, care pur și simplu execută funcția unui alt contract folosind starea contractului apelant. Consultați [acest articol de blog](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2) pentru a afla mai multe despre sistemele proxy. Acestea vă oferă mai multe funcționalități, de exemplu, permit actualizările, dar și implică o complexitate mult mai mare. Nu aș adăuga aceste sisteme doar pentru a reduce dimensiunile contractelor decât dacă este singura dvs. opțiune din vreun motiv anume.

## Impact mediu {#medium-impact}

### Eliminați din funcții {#remove-functions}

Acest lucru ar trebui să fie evident. Funcțiile măresc considerabil dimensiunea unui contract.

- **Externe**: De multe ori adăugăm o mulțime de vizualizare funcții de vizualizare din motive de comoditate. Acest lucru nu afectează cu nimic până când nu atingeți mărimea limită. Atunci ar trebui să vă gândiți serios să le eliminați pe toate, cu excepția celor absolut esențiale.
- **Interne**: Puteți și să eliminați funcțiile interne/private și doar să introduceți codul în linie, atâta timp cât funcția este apelată o singură dată.

### Evitați variabilele suplimentare {#avoid-additional-variables}

O simplă modificare ca aceasta:

```solidity
function get(uint id) returns (address,address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns (address,address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

generează o diferență de **0,28kB**. Este foarte probabil să vă confruntați cu situații similare în contractele dvs., care însumate pot duce la creșteri semnificative ale dimensiunii.

### Scurtați mesajele de eroare {#shorten-error-message}

Mesajele lungi de inversare (revert messages) și mai ales multe diferite astfel de mesaje incluse într-un contract îi pot amplifica dimensiunea. Utilizați în schimb coduri de eroare scurte și decodificați-le în contract. Un mesaj lung s-ar putea scurta mult:

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");

```

```solidity
require(msg.sender == owner, "OW1");
```

### Luați o valoare „run” scăzută în optimizator {#consider-a-low-run-value-in-the-optimizer}

De asemenea, puteți modifica setările optimizatorului. Valoarea implicită de 200 înseamnă că se încearcă optimizarea bytecode-ului ca și cum o funcție ar fi apelată de 200 de ori. Dacă o modificați la 1, practic spuneți optimizatorului să optimizeze pentru cazul când se execută fiecare funcție numai o dată. Înseamnă că o funcție optimizată pentru a executa o singură dată este optimizată pentru implementarea în sine. Rețineți că **aceasta crește [costurile de gaz](/developers/docs/gas/) pentru executarea funcțiilor**, așa că poate nu doriți să faceți acest lucru.

## Impact mic {#small-impact}

### Evitați să introduceți parametrul „struct” în funcții {#avoid-passing-structs-to-functions}

Dacă utilizați [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2), este bine să nu introduceți parametrul „struct” într-o funcție. În loc să introduceți parametrul ca „struct”...

```solidity
function get(uint id) returns (address,address) {
    return _get(myStruct);
}

function _get(MyStruct memory myStruct) private view returns(address,address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns(address,address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private view returns(address,address) {
    return (addr1, addr2);
}
```

... introduceți direct parametrii necesari. În acest exemplu, am mai economisit **0,1kb**.

### Declarați vizibilitatea corectă a funcțiilor și variabilelor {#declare-correct-visibility-for-functions-and-variables}

- Aveți funcții sau variabile apelate doar din exterior? Declarați-le ca `externe` în loc de `publice`.
- Aveți funcții sau variabile apelate doar din interiorul contractului? Declarați-le ca `private` sau `interne` în loc de `publice`.

### Eliminați modificatorii {#remove-modifiers}

Modificatorii, mai ales când sunt folosiți intens, pot avea un impact semnificativ asupra dimensiunii contractului. Luați în calcul eliminarea lor și utilizați în schimb funcții.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

Aceste sugestii ar trebui să vă ajute să reduceți semnificativ dimensiunea contractului. Repet cât se poate de des, axați-vă pe cât posibil pe divizarea contractelor pentru a obține cel mai bun impact.

## Viitorul privind limitele dimensiunii contractelor {#the-future-for-the-contract-size-limits}

Există o [propunere deschisă](https://eips.ethereum.org/EIPS/eip-1662) de eliminare a limitelor dimensiunii contractelor. Ideea de bază este de a scumpi apelurile de contract pentru contractele mari. Nu ar fi prea greu de implementat, însă are o compatibilitate retroactivă simplă (pune toate contractele implementate anterior în cea mai ieftină categorie), dar [nu toată lumea este convinsă](https://ethereum-magicians.org/t/removing-or-increasing-the-contract-size-limit/3045/24).

Doar timpul va spune dacă aceste limite se vor schimba în viitor, reacțiile (priviți imaginea din dreapta) arată absolut clar această necesitate pentru noi ca dezvoltatori. Din nefericire, nu vă puteți aștepta să se întâmple prea curând.
