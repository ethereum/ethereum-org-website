---
title: "Zmenšení kontraktů v boji proti limitu velikosti kontraktů"
description: Co můžete udělat, abyste zabránili přílišnému zvětšení vašich chytrých kontraktů?
author: Markus Waas
lang: cs
tags: [ "solidity", "smart kontrakt účty", "úložiště" ]
skill: intermediate
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Proč existuje limit? {#why-is-there-a-limit}

Dne [22. listopadu 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/) hard fork Spurious Dragon představil [EIP-170](https://eips.ethereum.org/EIPS/eip-170), který přidal limit velikosti chytrého kontraktu 24,576 kb. Pro vás jako pro vývojáře v jazyce Solidity to znamená, že když budete do svého kontraktu přidávat další a další funkce, v určitém okamžiku narazíte na limit a při nasazování se vám zobrazí chyba:

`Warning: Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

Tento limit byl zaveden, aby se zabránilo útokům typu denial-of-service (DoS). Každé volání kontraktu je z hlediska spotřeby paliva relativně levné. Dopad volání kontraktu na uzly Etherea se však neúměrně zvyšuje v závislosti na velikosti kódu volaného kontraktu (čtení kódu z disku, předzpracování kódu, přidávání dat do Merkle proofu). Kdykoli nastane situace, kdy útočník potřebuje málo zdrojů, aby ostatním způsobil spoustu práce, vzniká potenciál pro útoky DoS.

Původně to byl menší problém, protože jedním přirozeným limitem velikosti kontraktu je palivový limit bloku. Kontrakt musí být samozřejmě nasazen v rámci transakce, která obsahuje veškerý bytecode kontraktu. Pokud do bloku zahrnete pouze tuto jednu transakci, můžete spotřebovat všechno palivo, ale není ho nekonečně. Od [vylepšení London](/ethereum-forks/#london) se palivový limit bloku může měnit mezi 15 a 30 miliony jednotek v závislosti na poptávce sítě.

V následujícím textu se podíváme na některé metody seřazené podle jejich potenciálního dopadu. Přemýšlejte o tom jako o hubnutí. Nejlepší strategií, jak dosáhnout cílové hmotnosti (v našem případě 24 kb), je zaměřit se nejprve na metody s velkým dopadem. Ve většině případů vás tam dostane pouhá úprava jídelníčku, ale někdy je potřeba trochu víc. Pak můžete přidat nějaké cvičení (střední dopad) nebo dokonce doplňky stravy (malý dopad).

## Velký dopad {#big-impact}

### Rozdělte své kontrakty {#separate-your-contracts}

To by měl být vždy váš první přístup. Jak můžete kontrakt rozdělit na více menších? Obecně vás to donutí vymyslet pro své kontrakty dobrou architekturu. Z hlediska čitelnosti kódu jsou vždy upřednostňovány menší kontrakty. Při rozdělování kontraktů si položte následující otázky:

- Které funkce patří k sobě? Každá sada funkcí může být nejlepší ve svém vlastním kontraktu.
- Které funkce nevyžadují čtení stavu kontraktu nebo jen jeho specifické podmnožiny?
- Můžete rozdělit úložiště a funkcionalitu?

### Knihovny {#libraries}

Jedním z jednoduchých způsobů, jak přesunout kód funkcionality mimo úložiště, je použití [knihovny](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). Funkce knihovny nedeklarujte jako interní (internal), protože ty budou během kompilace přímo [přidány do kontraktu](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking). Pokud však použijete veřejné (public) funkce, budou se ve skutečnosti nacházet v samostatném kontraktu knihovny. Zvažte použití [using for](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for), aby bylo používání knihoven pohodlnější.

### Proxy {#proxies}

Pokročilejší strategií by byl systém proxy. Knihovny na pozadí používají `DELEGATECALL`, který jednoduše provede funkci jiného kontraktu se stavem volajícího kontraktu. Více informací o proxy systémech se dozvíte v [tomto příspěvku na blogu](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2). Poskytují vám více funkcí, např. umožňují upgradovatelnost, ale také přidávají velkou složitost. Nepřidával bych je jen kvůli zmenšení velikosti kontraktu, pokud to z jakéhokoli důvodu není vaše jediná možnost.

## Střední dopad {#medium-impact}

### Odstraňte funkce {#remove-functions}

Tohle by mělo být zřejmé. Funkce poměrně značně zvětšují velikost kontraktu.

- **Externí (external)**: Často přidáváme mnoho view funkcí z důvodu pohodlí. To je naprosto v pořádku, dokud nenarazíte na limit velikosti. Pak byste se mohli opravdu zamyslet nad odstraněním všech funkcí kromě těch naprosto nezbytných.
- **Interní (internal)**: Můžete také odstranit interní/privátní (internal/private) funkce a jednoduše vložit kód přímo, pokud je funkce volána pouze jednou.

### Vyhněte se dalším proměnným {#avoid-additional-variables}

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

Takováto jednoduchá změna představuje rozdíl **0,28 kb**. Je pravděpodobné, že ve svých kontraktech najdete mnoho podobných situací, a ty se mohou opravdu nasčítat do významných hodnot.

### Zkraťte chybové zprávy {#shorten-error-message}

Dlouhé revertovací zprávy a zejména mnoho různých revertovacích zpráv může kontrakt nafouknout. Místo toho používejte krátké chybové kódy a dekódujte je ve svém kontraktu. Dlouhá zpráva by mohla být mnohem kratší:

```solidity
require(msg.sender == owner, "Tuto funkci může volat pouze vlastník tohoto kontraktu");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Používejte vlastní chyby namísto chybových zpráv

Vlastní chyby byly zavedeny v [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Jsou skvělým způsobem, jak zmenšit velikost vašich kontraktů, protože jsou kódovány v ABI jako selektory (stejně jako funkce).

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### Zvažte nízkou hodnotu runs v optimalizátoru {#consider-a-low-run-value-in-the-optimizer}

Můžete také změnit nastavení optimalizátoru. Výchozí hodnota 200 znamená, že se snaží optimalizovat bytecode tak, jako by byla funkce volána 200krát. Pokud ji změníte na 1, v podstatě říkáte optimalizátoru, aby optimalizoval pro případ, že každá funkce bude spuštěna pouze jednou. Optimalizovaná funkce pro jednorázové spuštění znamená, že je optimalizována pro samotné nasazení. Mějte na paměti, že **to zvyšuje [náklady na palivo](/developers/docs/gas/) za spuštění funkcí**, takže to možná nebudete chtít udělat.

## Malý dopad {#small-impact}

### Vyhněte se předávání struktur (structs) funkcím {#avoid-passing-structs-to-functions}

Pokud používáte [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2), může pomoci nepředávat struktury funkci. Namísto předávání parametru jako struktury předejte požadované parametry přímo. V tomto příkladu jsme ušetřili dalších **0,1 kb**.

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

### Deklarujte správnou viditelnost pro funkce a proměnné {#declare-correct-visibility-for-functions-and-variables}

- Funkce nebo proměnné, které jsou volány pouze zvenčí? Deklarujte je jako `external` namísto `public`.
- Funkce nebo proměnné volané pouze v rámci kontraktu? Deklarujte je jako `private` nebo `internal` namísto `public`.

### Odstraňte modifikátory {#remove-modifiers}

Modifikátory, zejména při intenzivním používání, mohou mít významný dopad na velikost kontraktu. Zvažte jejich odstranění a místo nich použijte funkce.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

Tyto tipy by vám měly pomoci výrazně zmenšit velikost kontraktu. Ještě jednou zdůrazňuji, že pro co největší dopad se vždy zaměřte na rozdělení kontraktů, pokud je to možné.
